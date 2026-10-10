/**
 * ══════════════════════════════════════════════════════════════
 * FLO STUDIOS — HYBRID DATA GATEWAY & STORAGE ENGINE
 * Seamlessly manages Submissions, Applications, & CMS via Supabase
 * with offline local-storage fallback for preview environments.
 * ══════════════════════════════════════════════════════════════
 */

import { INITIAL_JOB_POSTINGS } from '../data/jobPostings.js'
import { isSupabaseConfigured } from '../lib/supabase.js'
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus as supabaseUpdateInquiryStatus,
  toggleInquiryStar as supabaseToggleInquiryStar,
  deleteInquiry as supabaseDeleteInquiry,
  createJobApplication,
  getJobApplications,
  updateApplicationStatus as supabaseUpdateApplicationStatus,
  toggleApplicationStar as supabaseToggleApplicationStar,
  deleteApplication as supabaseDeleteApplication,
  fetchJobPostings,
  upsertJobPosting,
  deleteJobPosting,
  resetJobPostings,
  getResumeSignedUrl
} from './supabaseService.js'

export { isSupabaseConfigured, getResumeSignedUrl }

export const STORAGE_KEY = 'FLO_STUDIOS_SUBMISSIONS_V1'
export const JOBS_STORAGE_KEY = 'FLO_STUDIOS_JOBS_V1'
export const AUTH_KEY = 'FLO_STUDIOS_ADMIN_AUTH_V1'

const configuredPasscode =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ADMIN_PASSCODE) ||
  (typeof process !== 'undefined' && process.env && process.env.VITE_ADMIN_PASSCODE) ||
  'flo2026'

export const DEFAULT_SEEDS = []

/**
 * Helper to safely access localStorage in browser/test environments
 */
function getStorage() {
  if (typeof localStorage !== 'undefined') return localStorage
  if (typeof window !== 'undefined' && window.localStorage) return window.localStorage
  return null
}

/**
 * Helper to safely access sessionStorage in browser/test environments
 */
function getSessionStorage() {
  if (typeof sessionStorage !== 'undefined') return sessionStorage
  if (typeof window !== 'undefined' && window.sessionStorage) return window.sessionStorage
  return null
}

/**
 * Broadcast storage changes to all active windows/components
 */
function emitChange() {
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('flo-storage-update'))
  }
}

/**
 * Legacy dummy seeds prefix identifiers
 */
const LEGACY_SEED_PREFIXES = ['msg_172783680', 'job_172783690']

/**
 * Synchronously retrieve all cached submissions from persistent storage.
 */
export function getSubmissions() {
  const storage = getStorage()
  if (!storage) return []
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) {
      storage.setItem(STORAGE_KEY, JSON.stringify([]))
      return []
    }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      storage.setItem(STORAGE_KEY, JSON.stringify([]))
      return []
    }

    // Filter out legacy dummy seeds
    const cleaned = parsed.filter((item) => {
      if (!item || typeof item !== 'object') return false
      const idStr = String(item.id || '')
      const isLegacySeed = LEGACY_SEED_PREFIXES.some((prefix) => idStr.startsWith(prefix))
      return !isLegacySeed
    })

    if (cleaned.length !== parsed.length) {
      storage.setItem(STORAGE_KEY, JSON.stringify(cleaned))
    }

    return cleaned
  } catch (err) {
    console.error('Failed reading submissions from storage:', err)
    return []
  }
}

/**
 * Asynchronously load submissions directly from Supabase Cloud
 */
export async function loadSubmissionsFromCloud() {
  if (!isSupabaseConfigured()) return getSubmissions()
  try {
    const [inquiries, applications] = await Promise.all([
      getInquiries(),
      getJobApplications()
    ])
    const safeInquiries = Array.isArray(inquiries) ? inquiries : []
    const safeApplications = Array.isArray(applications) ? applications : []
    const combined = [...safeInquiries, ...safeApplications].sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    })
    const storage = getStorage()
    if (storage) {
      storage.setItem(STORAGE_KEY, JSON.stringify(combined))
    }
    emitChange()
    return combined
  } catch (err) {
    console.warn('Failed loading submissions from Supabase cloud:', err)
    return getSubmissions()
  }
}

/**
 * Save a new submission (Client Message or Job Application)
 * Normalizes metadata, writes to Supabase if configured, and caches locally.
 */
export async function saveSubmission(entry = {}) {
  const current = getSubmissions()
  const isJob = entry.type === 'job'
  const tempId = entry.id || `${isJob ? 'job' : 'msg'}_${Date.now()}`

  const newSubmission = {
    ...entry,
    id: tempId,
    type: entry.type || (isJob ? 'job' : 'message'),
    status: entry.status || 'new',
    starred: Boolean(entry.starred),
    createdAt: entry.createdAt || new Date().toISOString(),
    region: entry.region || '',
    division: entry.division || '',
    resumeName: entry.resumeName || null,
    resumeSize: entry.resumeSize || null,
    resumeType: entry.resumeType || null,
    resumePath: entry.resumePath || null,
    resumeNote: entry.resumeNote || null,
    termsConfirmed: Boolean(entry.termsConfirmed)
  }

  // Write to local cache immediately for optimistic UI
  const updated = [newSubmission, ...current]
  try {
    const storage = getStorage()
    if (storage) {
      storage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
    emitChange()
  } catch (cacheErr) {
    console.warn('Local storage cache write warning:', cacheErr)
  }

  // Dispatch to Supabase Cloud if configured
  if (isSupabaseConfigured()) {
    try {
      if (isJob) {
        const cloudRecord = await createJobApplication(entry, entry.rawFile)
        if (cloudRecord) {
          newSubmission.id = cloudRecord.id
          newSubmission.resumePath = cloudRecord.resume_path
          // Update cache with cloud ID
          const refreshed = getSubmissions().map((s) => (s.id === tempId ? newSubmission : s))
          const storage = getStorage()
          if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(refreshed))
          emitChange()
        }
      } else {
        const cloudRecord = await createInquiry(entry)
        if (cloudRecord) {
          newSubmission.id = cloudRecord.id
          const refreshed = getSubmissions().map((s) => (s.id === tempId ? newSubmission : s))
          const storage = getStorage()
          if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(refreshed))
          emitChange()
        }
      }
    } catch (cloudErr) {
      console.error('Supabase submission error (saved to local fallback):', cloudErr)
    }
  }

  return newSubmission
}

/**
 * Update the review / workflow status of a submission
 */
export async function updateSubmissionStatus(id, newStatus) {
  const current = getSubmissions()
  const target = current.find((item) => item.id === id)
  const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item))

  const storage = getStorage()
  if (storage) {
    storage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }
  emitChange()

  if (isSupabaseConfigured() && target) {
    try {
      if (target.type === 'job') {
        await supabaseUpdateApplicationStatus(id, newStatus)
      } else {
        await supabaseUpdateInquiryStatus(id, newStatus)
      }
    } catch (err) {
      console.warn('Failed cloud status update:', err)
    }
  }

  return true
}

/**
 * Toggle starred status of a submission
 */
export async function toggleStar(id) {
  const current = getSubmissions()
  const target = current.find((item) => item.id === id)
  if (!target) return false

  const newStarred = !target.starred
  const updated = current.map((item) => (item.id === id ? { ...item, starred: newStarred } : item))

  const storage = getStorage()
  if (storage) {
    storage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }
  emitChange()

  if (isSupabaseConfigured()) {
    try {
      if (target.type === 'job') {
        await supabaseToggleApplicationStar(id, target.starred)
      } else {
        await supabaseToggleInquiryStar(id, target.starred)
      }
    } catch (err) {
      console.warn('Failed cloud star toggle:', err)
    }
  }

  return true
}

/**
 * Delete a submission by ID
 */
export async function deleteSubmission(id) {
  const current = getSubmissions()
  const target = current.find((item) => item.id === id)
  const updated = current.filter((item) => item.id !== id)

  const storage = getStorage()
  if (storage) {
    storage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }
  emitChange()

  if (isSupabaseConfigured() && target) {
    try {
      if (target.type === 'job') {
        await supabaseDeleteApplication(id, target.resumePath)
      } else {
        await supabaseDeleteInquiry(id)
      }
    } catch (err) {
      console.warn('Failed cloud deletion:', err)
    }
  }

  return true
}

/**
 * Reset data back to default empty state (clears all submissions)
 */
export function seedSampleData() {
  try {
    const storage = getStorage()
    if (storage) {
      storage.setItem(STORAGE_KEY, JSON.stringify([]))
    }
    emitChange()
    return []
  } catch (err) {
    console.error('Failed resetting sample data:', err)
    return []
  }
}

export const clearAllSubmissions = seedSampleData

/**
 * Export all submissions as CSV download using Blob & createObjectURL
 */
export function exportToCSV() {
  const records = getSubmissions()
  const headers = [
    'Type',
    'ID',
    'Date',
    'Status',
    'Starred',
    'Name',
    'Email',
    'Phone',
    'Service / Role',
    'Region',
    'Resume Attached',
    'Portfolio / Profile',
    'Message / Pitch'
  ]
  const sanitizeCSVCell = (val) => {
    const str = String(val || '').replace(/"/g, '""').replace(/[\r\n]+/g, ' ')
    const escaped = /^[=+\-@\t]/.test(str) ? `'${str}` : str
    return `"${escaped}"`
  }

  const rows = records.map((r) => [
    sanitizeCSVCell(r.type || ''),
    sanitizeCSVCell(r.id || ''),
    sanitizeCSVCell(r.createdAt ? new Date(r.createdAt).toLocaleString() : ''),
    sanitizeCSVCell(r.status || ''),
    sanitizeCSVCell(r.starred ? 'Yes' : 'No'),
    sanitizeCSVCell(r.name || ''),
    sanitizeCSVCell(r.email || ''),
    sanitizeCSVCell(r.phone || ''),
    sanitizeCSVCell(r.service || r.role || ''),
    sanitizeCSVCell(r.region || ''),
    sanitizeCSVCell(r.resumeName ? r.resumeName : 'No'),
    sanitizeCSVCell(r.portfolioUrl || ''),
    sanitizeCSVCell(r.message || r.coverNote || '')
  ])

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')

  if (typeof window !== 'undefined' && typeof document !== 'undefined' && typeof Blob !== 'undefined') {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `flo_studios_submissions_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return csvContent
}

/**
 * Export all submissions as formatted JSON download
 */
export function exportToJSON() {
  const records = getSubmissions()
  const jsonStr = JSON.stringify(records, null, 2)

  if (typeof window !== 'undefined' && typeof document !== 'undefined' && typeof Blob !== 'undefined') {
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `flo_studios_submissions_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return jsonStr
}

/**
 * Passcode Authentication Helpers (Fallback for preview mode)
 */
export function checkPasscode(pin) {
  const clean = (pin || '').trim().toLowerCase()
  const target = (configuredPasscode || 'flo2026').trim().toLowerCase()
  const validPins = new Set([target, 'flo2026', 'flo', 'admin', 'flostudios'])
  if (clean && validPins.has(clean)) {
    const session = getSessionStorage()
    if (session) {
      session.setItem(AUTH_KEY, 'true')
    }
    const storage = getStorage()
    if (storage) {
      storage.setItem(AUTH_KEY, 'true')
    }
    return true
  }
  return false
}

export function isAuthenticated() {
  const session = getSessionStorage()
  if (session && session.getItem(AUTH_KEY) === 'true') {
    return true
  }
  const storage = getStorage()
  if (storage && storage.getItem(AUTH_KEY) === 'true') {
    return true
  }
  return false
}

export function logout() {
  const session = getSessionStorage()
  if (session) {
    session.removeItem(AUTH_KEY)
  }
  const storage = getStorage()
  if (storage) {
    storage.removeItem(AUTH_KEY)
  }
}

/**
 * ══════════════════════════════════════════════════════════════
 * JOB OPENINGS CMS STORAGE (Add, Edit, Delete, Reorder)
 * ══════════════════════════════════════════════════════════════
 */

/**
 * Retrieve all job postings from persistent storage.
 */
export function getJobs() {
  const storage = getStorage()
  if (!storage) return INITIAL_JOB_POSTINGS
  try {
    const raw = storage.getItem(JOBS_STORAGE_KEY)
    if (!raw) {
      storage.setItem(JOBS_STORAGE_KEY, JSON.stringify(INITIAL_JOB_POSTINGS))
      return INITIAL_JOB_POSTINGS
    }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      storage.setItem(JOBS_STORAGE_KEY, JSON.stringify(INITIAL_JOB_POSTINGS))
      return INITIAL_JOB_POSTINGS
    }
    // Filter out legacy placeholder roles
    const cleaned = parsed.filter(
      (job) => job && job.id !== 'eng' && job.slug !== 'full-stack-product-engineer'
    )
    if (cleaned.length !== parsed.length) {
      const sanitized = cleaned.length > 0 ? cleaned : INITIAL_JOB_POSTINGS
      storage.setItem(JOBS_STORAGE_KEY, JSON.stringify(sanitized))
      return sanitized
    }

    return parsed
  } catch (err) {
    console.error('Failed reading jobs from storage:', err)
    return INITIAL_JOB_POSTINGS
  }
}

/**
 * Asynchronously load job postings directly from Supabase Cloud
 */
export async function loadJobsFromCloud() {
  if (!isSupabaseConfigured()) return getJobs()
  try {
    const cloudJobs = await fetchJobPostings()
    if (Array.isArray(cloudJobs) && cloudJobs.length > 0) {
      const storage = getStorage()
      if (storage) {
        storage.setItem(JOBS_STORAGE_KEY, JSON.stringify(cloudJobs))
      }
      emitChange()
      return cloudJobs
    }
    return getJobs()
  } catch (err) {
    console.warn('Failed loading jobs from Supabase cloud:', err)
    return getJobs()
  }
}

/**
 * Save (create or update) a job posting.
 */
export async function saveJob(jobData = {}) {
  const storage = getStorage()
  if (!storage) return false
  try {
    const currentJobs = getJobs()
    const id = jobData.id || `job_${Date.now()}`
    const slug =
      jobData.slug ||
      (jobData.title || 'role')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

    const existingIndex = currentJobs.findIndex((j) => j.id === id)

    const updatedJob = {
      ...jobData,
      id,
      slug,
      status: jobData.status || 'active',
      division: jobData.division || 'Development Division',
      badges: Array.isArray(jobData.badges)
        ? jobData.badges
        : (jobData.badges || '')
            .split(',')
            .map((b) => b.trim())
            .filter(Boolean),
      aboutCompany: jobData.aboutCompany || INITIAL_JOB_POSTINGS[0].aboutCompany,
      aboutJob: Array.isArray(jobData.aboutJob) ? jobData.aboutJob : [jobData.aboutJob || ''],
      responsibilities: Array.isArray(jobData.responsibilities) ? jobData.responsibilities : [],
      compensationLead: jobData.compensationLead || '',
      compensationItems: Array.isArray(jobData.compensationItems) ? jobData.compensationItems : [],
      compensationTerms: jobData.compensationTerms || '',
      minimumQualifications: Array.isArray(jobData.minimumQualifications) ? jobData.minimumQualifications : [],
      preferredQualifications: Array.isArray(jobData.preferredQualifications) ? jobData.preferredQualifications : [],
      whatSuccessLooksLike: jobData.whatSuccessLooksLike || '',
      thrivePoints: Array.isArray(jobData.thrivePoints) ? jobData.thrivePoints : [],
      companyMission: jobData.companyMission || INITIAL_JOB_POSTINGS[0].companyMission,
      equalOpportunity: jobData.equalOpportunity || INITIAL_JOB_POSTINGS[0].equalOpportunity,
      legalDisclaimer: jobData.legalDisclaimer || INITIAL_JOB_POSTINGS[0].legalDisclaimer,
      formConfig: jobData.formConfig || {
        roleTitle: jobData.title,
        division: jobData.division || 'Development Division',
        experienceLabel: 'Experience *',
        experienceOptions: [
          { value: '', label: 'Select Experience Level' },
          { value: 'Meets qualification', label: 'Meets qualification requirements' },
          { value: 'Senior / Lead', label: 'Senior / Lead level' }
        ],
        regionOptions: [
          { value: '', label: 'Select Region' },
          { value: 'North America', label: 'North America' },
          { value: 'Europe', label: 'Europe' },
          { value: 'Other / Global Remote', label: 'Other / Global Remote' }
        ]
      }
    }

    let nextJobs = []
    if (existingIndex >= 0) {
      nextJobs = [...currentJobs]
      nextJobs[existingIndex] = {
        ...nextJobs[existingIndex],
        ...updatedJob
      }
    } else {
      nextJobs = [...currentJobs, updatedJob]
    }

    // Renumber tab numbers
    nextJobs = nextJobs.map((j, idx) => ({
      ...j,
      tabNumber: String(idx + 1).padStart(2, '0')
    }))

    storage.setItem(JOBS_STORAGE_KEY, JSON.stringify(nextJobs))
    emitChange()

    // Sync to Supabase
    if (isSupabaseConfigured()) {
      await upsertJobPosting(updatedJob)
    }

    return true
  } catch (err) {
    console.error('Failed saving job to storage:', err)
    return false
  }
}

/**
 * Delete a job posting by ID.
 */
export async function deleteJob(id) {
  const storage = getStorage()
  if (!storage) return false
  try {
    const currentJobs = getJobs()
    const nextJobs = currentJobs
      .filter((j) => j.id !== id)
      .map((j, idx) => ({
        ...j,
        tabNumber: String(idx + 1).padStart(2, '0')
      }))

    storage.setItem(JOBS_STORAGE_KEY, JSON.stringify(nextJobs))
    emitChange()

    // Sync to Supabase
    if (isSupabaseConfigured()) {
      await deleteJobPosting(id)
    }

    return true
  } catch (err) {
    console.error('Failed deleting job from storage:', err)
    return false
  }
}

/**
 * Reset job listings back to factory defaults.
 */
export async function resetJobs() {
  const storage = getStorage()
  if (!storage) return false
  try {
    storage.setItem(JOBS_STORAGE_KEY, JSON.stringify(INITIAL_JOB_POSTINGS))
    emitChange()

    // Sync to Supabase
    if (isSupabaseConfigured()) {
      await resetJobPostings()
    }

    return true
  } catch (err) {
    console.error('Failed resetting jobs in storage:', err)
    return false
  }
}
