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
  getResumeSignedUrl,
  INQUIRY_STATUSES,
  JOB_APPLICATION_STATUSES,
  isValidStatusForType,
  ensureUuid
} from './supabaseService.js'

export {
  isSupabaseConfigured,
  getResumeSignedUrl,
  INQUIRY_STATUSES,
  JOB_APPLICATION_STATUSES,
  isValidStatusForType
}

export const STORAGE_KEY = 'FLO_STUDIOS_SUBMISSIONS_V1'
export const JOBS_STORAGE_KEY = 'FLO_STUDIOS_JOBS_V1'
export const AUTH_KEY = 'FLO_STUDIOS_ADMIN_AUTH_V1'

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
 * Strip binary/Base64 payload fields so localStorage only ever stores compact metadata
 */
function stripBinaryResumeFields(record) {
  if (!record || typeof record !== 'object') return record
  const metadataOnly = { ...record }
  delete metadataOnly.rawFile
  delete metadataOnly.resumeData
  return metadataOnly
}

/**
 * Write submissions array to localStorage with QuotaExceededError eviction fallback
 */
function writeSubmissionsToStorage(storage, items) {
  if (!storage) return false
  const sanitized = (Array.isArray(items) ? items : []).map(stripBinaryResumeFields)
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(sanitized))
    return true
  } catch (err) {
    // QuotaExceededError fallback: keep most recent half, or just the newest item
    try {
      const trimmed = sanitized.slice(0, Math.max(1, Math.floor(sanitized.length / 2)))
      storage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
      return true
    } catch {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(sanitized.slice(0, 1)))
        return true
      } catch (finalErr) {
        console.warn('Local storage quota exceeded and unable to persist cache:', finalErr || err)
        return false
      }
    }
  }
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

    let modified = false
    // Filter out legacy dummy seeds and strip any legacy Base64 resumeData
    const cleaned = parsed
      .filter((item) => {
        if (!item || typeof item !== 'object') {
          modified = true
          return false
        }
        const idStr = String(item.id || '')
        const isLegacySeed = LEGACY_SEED_PREFIXES.some((prefix) => idStr.startsWith(prefix))
        if (isLegacySeed) modified = true
        return !isLegacySeed
      })
      .map((item) => {
        if ('resumeData' in item || 'rawFile' in item) {
          modified = true
          return stripBinaryResumeFields(item)
        }
        return item
      })

    if (modified || cleaned.length !== parsed.length) {
      writeSubmissionsToStorage(storage, cleaned)
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
    const cloudCombined = [...safeInquiries, ...safeApplications].sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    })

    // Merge cloud submissions with locally stored submissions to prevent accidental wipeout
    const local = getSubmissions()
    const mergedMap = new Map()
    local.forEach((item) => {
      if (item && item.id) mergedMap.set(String(item.id), stripBinaryResumeFields(item))
    })
    cloudCombined.forEach((item) => {
      if (item && item.id) mergedMap.set(String(item.id), stripBinaryResumeFields(item))
    })
    const combined = Array.from(mergedMap.values()).sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    })

    const storage = getStorage()
    if (storage) {
      writeSubmissionsToStorage(storage, combined)
    }
    emitChange()
    return combined
  } catch (err) {
    console.warn('Failed loading submissions from Supabase cloud:', err)
    return getSubmissions()
  }
}

/**
 * Save a new submission (Client Message or Job Application).
 * Never writes Base64 resumeData or rawFile to localStorage.
 * Propagates cloud errors when Supabase is configured so forms do not report false success.
 */
export async function saveSubmission(entry = {}) {
  const rawFile = entry?.rawFile
  const cleanEntry = stripBinaryResumeFields(entry || {})
  const isJob = cleanEntry.type === 'job'
  const submissionId = ensureUuid(cleanEntry.id)

  const newSubmission = {
    ...cleanEntry,
    id: submissionId,
    type: cleanEntry.type || (isJob ? 'job' : 'message'),
    status: 'new',
    starred: Boolean(cleanEntry.starred),
    createdAt: cleanEntry.createdAt || new Date().toISOString(),
    region: cleanEntry.region || '',
    division: cleanEntry.division || '',
    resumeName: cleanEntry.resumeName || (rawFile && rawFile.name) || null,
    resumeSize: cleanEntry.resumeSize || null,
    resumeType: cleanEntry.resumeType || (rawFile && rawFile.type) || null,
    resumePath: cleanEntry.resumePath || null,
    resumeNote: cleanEntry.resumeNote || null,
    termsConfirmed: Boolean(cleanEntry.termsConfirmed)
  }

  // Dispatch to Supabase Cloud first when configured so network/upload errors propagate
  if (isSupabaseConfigured()) {
    if (isJob) {
      const cloudRecord = await createJobApplication(
        { ...cleanEntry, id: submissionId },
        rawFile || null
      )
      if (cloudRecord) {
        newSubmission.id = cloudRecord.id || submissionId
        newSubmission.resumePath = cloudRecord.resume_path || newSubmission.resumePath
      }
    } else {
      const cloudRecord = await createInquiry({ ...cleanEntry, id: submissionId })
      if (cloudRecord) {
        newSubmission.id = cloudRecord.id || submissionId
      }
    }

    const current = getSubmissions().filter((s) => s.id !== newSubmission.id)
    const storage = getStorage()
    if (storage) {
      writeSubmissionsToStorage(storage, [newSubmission, ...current])
    }
    emitChange()
    return newSubmission
  }

  // Offline / unconfigured preview mode: persist metadata-only record to localStorage
  const current = getSubmissions().filter((s) => s.id !== newSubmission.id)
  const storage = getStorage()
  if (storage) {
    const wrote = writeSubmissionsToStorage(storage, [newSubmission, ...current])
    if (!wrote) {
      throw new Error('Local storage quota exceeded. Unable to save submission.')
    }
  }
  emitChange()
  return newSubmission
}

/**
 * Update the review / workflow status of a submission (validates against DB CHECK constraints)
 */
export async function updateSubmissionStatus(id, newStatus) {
  const current = getSubmissions()
  const target = current.find((item) => item.id === id)
  const recordType = target?.type || 'message'

  if (!isValidStatusForType(recordType, newStatus)) {
    console.warn(`Rejected invalid status "${newStatus}" for submission type "${recordType}"`)
    return false
  }

  if (target) {
    const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    const storage = getStorage()
    if (storage) {
      writeSubmissionsToStorage(storage, updated)
    }
    emitChange()
  }

  if (isSupabaseConfigured()) {
    try {
      if (recordType === 'job') {
        return await supabaseUpdateApplicationStatus(id, newStatus)
      }
      return await supabaseUpdateInquiryStatus(id, newStatus)
    } catch (err) {
      console.warn('Failed cloud status update:', err)
      return false
    }
  }

  return Boolean(target)
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
    writeSubmissionsToStorage(storage, updated)
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
    writeSubmissionsToStorage(storage, updated)
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
 * Client-side passcode / localStorage auth fallbacks are disabled for security.
 * Admin authentication strictly requires a valid, authorized Supabase Auth session.
 */
export function checkPasscode() {
  logout()
  return false
}

export function isAuthenticated() {
  logout()
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
 * Save (create or update) a job posting while preserving existing fields not present in jobData.
 */
export async function saveJob(jobData = {}) {
  const storage = getStorage()
  if (!storage) return false
  try {
    const currentJobs = getJobs()
    const id = jobData.id || `job_${Date.now()}`
    const existingIndex = currentJobs.findIndex((j) => j.id === id)
    const existingJob = existingIndex >= 0 ? currentJobs[existingIndex] : null
    const defaultTemplate = INITIAL_JOB_POSTINGS[0] || {}

    const resolvedTitle = jobData.title ?? existingJob?.title ?? 'Role'
    const slug =
      jobData.slug ||
      existingJob?.slug ||
      resolvedTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

    const resolvedDivision =
      jobData.division || existingJob?.division || 'Development Division'

    const resolvedBadges = Array.isArray(jobData.badges)
      ? jobData.badges
      : typeof jobData.badges === 'string'
      ? jobData.badges
          .split(',')
          .map((b) => b.trim())
          .filter(Boolean)
      : existingJob?.badges || []

    const resolvedAboutJob = Array.isArray(jobData.aboutJob)
      ? jobData.aboutJob
      : typeof jobData.aboutJob === 'string'
      ? [jobData.aboutJob]
      : existingJob?.aboutJob || []

    const updatedJob = {
      ...(existingJob || {}),
      ...jobData,
      id,
      slug,
      title: resolvedTitle,
      tabLabel: jobData.tabLabel || resolvedTitle,
      status: jobData.status || existingJob?.status || 'active',
      division: resolvedDivision,
      badges: resolvedBadges,
      aboutCompany:
        jobData.aboutCompany ?? existingJob?.aboutCompany ?? defaultTemplate.aboutCompany ?? '',
      aboutJob: resolvedAboutJob,
      responsibilities: Array.isArray(jobData.responsibilities)
        ? jobData.responsibilities
        : existingJob?.responsibilities || [],
      compensationLead:
        jobData.compensationLead ?? existingJob?.compensationLead ?? '',
      compensationItems: Array.isArray(jobData.compensationItems)
        ? jobData.compensationItems
        : existingJob?.compensationItems || [],
      compensationTerms:
        jobData.compensationTerms ?? existingJob?.compensationTerms ?? '',
      minimumQualifications: Array.isArray(jobData.minimumQualifications)
        ? jobData.minimumQualifications
        : existingJob?.minimumQualifications || [],
      preferredQualifications: Array.isArray(jobData.preferredQualifications)
        ? jobData.preferredQualifications
        : existingJob?.preferredQualifications || [],
      whatSuccessLooksLike:
        jobData.whatSuccessLooksLike ?? existingJob?.whatSuccessLooksLike ?? '',
      thrivePoints: Array.isArray(jobData.thrivePoints)
        ? jobData.thrivePoints
        : existingJob?.thrivePoints || [],
      companyMission:
        jobData.companyMission ?? existingJob?.companyMission ?? defaultTemplate.companyMission ?? '',
      equalOpportunity:
        jobData.equalOpportunity ??
        existingJob?.equalOpportunity ??
        defaultTemplate.equalOpportunity ??
        '',
      legalDisclaimer:
        jobData.legalDisclaimer ??
        existingJob?.legalDisclaimer ??
        defaultTemplate.legalDisclaimer ??
        '',
      formConfig: jobData.formConfig || existingJob?.formConfig || {
        roleTitle: resolvedTitle,
        division: resolvedDivision,
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
      nextJobs[existingIndex] = updatedJob
    } else {
      nextJobs = [...currentJobs, updatedJob]
    }

    // Renumber tab numbers
    nextJobs = nextJobs.map((j, idx) => ({
      ...j,
      tabNumber: String(idx + 1).padStart(2, '0')
    }))

    const savedJob = nextJobs.find((j) => j.id === id) || updatedJob

    storage.setItem(JOBS_STORAGE_KEY, JSON.stringify(nextJobs))
    emitChange()

    // Sync full preserved job object to Supabase
    if (isSupabaseConfigured()) {
      await upsertJobPosting(savedJob)
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
