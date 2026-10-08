/**
 * ══════════════════════════════════════════════════════════════
 * FLO STUDIOS — REACTIVE SUBMISSION & ADMIN STORAGE ENGINE
 * Single source of truth for Client Inquiries & Job Applications
 * ══════════════════════════════════════════════════════════════
 */

import { INITIAL_JOB_POSTINGS } from '../data/jobPostings.js'

export const STORAGE_KEY = 'FLO_STUDIOS_SUBMISSIONS_V1'
export const JOBS_STORAGE_KEY = 'FLO_STUDIOS_JOBS_V1'
export const AUTH_KEY = 'FLO_STUDIOS_ADMIN_AUTH_V1'
export const DEFAULT_PASSCODE = 'flo2026'

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
 * Retrieve all submissions from persistent storage.
 * - Initializes with [] if empty
 * - Automatically purges any legacy demo seeds by ID prefix
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
 * Save a new submission (Client Message or Job Application)
 * Normalizes all resume metadata and application fields
 */
export function saveSubmission(entry = {}) {
  const current = getSubmissions()
  const isJob = entry.type === 'job'
  const newSubmission = {
    ...entry,
    id: entry.id || `${isJob ? 'job' : 'msg'}_${Date.now()}`,
    type: entry.type || (isJob ? 'job' : 'message'),
    status: entry.status || 'new',
    starred: Boolean(entry.starred),
    createdAt: entry.createdAt || new Date().toISOString(),
    region: entry.region || '',
    division: entry.division || '',
    resumeName: entry.resumeName || null,
    resumeSize: entry.resumeSize || null,
    resumeType: entry.resumeType || null,
    resumeData: entry.resumeData || null,
    resumeNote: entry.resumeNote || null,
    termsConfirmed: Boolean(entry.termsConfirmed)
  }

  const updated = [newSubmission, ...current]
  try {
    const storage = getStorage()
    if (storage) {
      storage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
    emitChange()
    return newSubmission
  } catch (err) {
    console.warn('Storage quota exceeded with resumeData, retrying without base64 payload...')
    try {
      const fallbackEntry = {
        ...newSubmission,
        resumeData: null,
        resumeNote: 'File exceeds local storage quota. Metadata preserved: ' + (entry.resumeName || '')
      }
      const fallbackUpdated = [fallbackEntry, ...current]
      const storage = getStorage()
      if (storage) {
        storage.setItem(STORAGE_KEY, JSON.stringify(fallbackUpdated))
      }
      emitChange()
      return fallbackEntry
    } catch (fallbackErr) {
      console.error('Failed saving submission:', fallbackErr)
      return null
    }
  }
}

/**
 * Update the review / workflow status of a submission
 */
export function updateSubmissionStatus(id, newStatus) {
  const current = getSubmissions()
  const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
  try {
    const storage = getStorage()
    if (storage) {
      storage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
    emitChange()
    return true
  } catch (err) {
    console.error('Failed updating submission status:', err)
    return false
  }
}

/**
 * Toggle starred status of a submission
 */
export function toggleStar(id) {
  const current = getSubmissions()
  const updated = current.map((item) => (item.id === id ? { ...item, starred: !item.starred } : item))
  try {
    const storage = getStorage()
    if (storage) {
      storage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
    emitChange()
    return true
  } catch (err) {
    console.error('Failed toggling star:', err)
    return false
  }
}

/**
 * Delete a submission by ID
 */
export function deleteSubmission(id) {
  const current = getSubmissions()
  const updated = current.filter((item) => item.id !== id)
  try {
    const storage = getStorage()
    if (storage) {
      storage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
    emitChange()
    return true
  } catch (err) {
    console.error('Failed deleting submission:', err)
    return false
  }
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
 * Includes Region, Resume Attached, and detailed profile columns
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
 * Export all submissions as formatted JSON download using Blob & createObjectURL
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
 * Passcode Authentication Helpers
 */
export function checkPasscode(pin) {
  const clean = (pin || '').trim().toLowerCase()
  if (clean === DEFAULT_PASSCODE || clean === 'flo') {
    const session = getSessionStorage()
    if (session) {
      session.setItem(AUTH_KEY, 'true')
    }
    return true
  }
  return false
}

export function isAuthenticated() {
  const session = getSessionStorage()
  if (session) {
    return session.getItem(AUTH_KEY) === 'true'
  }
  return false
}

export function logout() {
  const session = getSessionStorage()
  if (session) {
    session.removeItem(AUTH_KEY)
  }
}

/**
 * ══════════════════════════════════════════════════════════════
 * JOB OPENINGS CMS STORAGE (Add, Edit, Delete, Reorder)
 * ══════════════════════════════════════════════════════════════
 */

/**
 * Retrieve all job postings from persistent storage.
 * Initializes with INITIAL_JOB_POSTINGS if storage is empty.
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
    if (!Array.isArray(parsed) || parsed.length === 0) {
      storage.setItem(JOBS_STORAGE_KEY, JSON.stringify(INITIAL_JOB_POSTINGS))
      return INITIAL_JOB_POSTINGS
    }
    return parsed
  } catch (err) {
    console.error('Failed reading jobs from storage:', err)
    return INITIAL_JOB_POSTINGS
  }
}

/**
 * Save (create or update) a job posting.
 */
export function saveJob(jobData = {}) {
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
      badges: Array.isArray(jobData.badges) ? jobData.badges : (jobData.badges || '').split(',').map((b) => b.trim()).filter(Boolean),
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
    return true
  } catch (err) {
    console.error('Failed saving job to storage:', err)
    return false
  }
}

/**
 * Delete a job posting by ID.
 */
export function deleteJob(id) {
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
    return true
  } catch (err) {
    console.error('Failed deleting job from storage:', err)
    return false
  }
}

/**
 * Reset job listings back to factory defaults.
 */
export function resetJobs() {
  const storage = getStorage()
  if (!storage) return false
  try {
    storage.setItem(JOBS_STORAGE_KEY, JSON.stringify(INITIAL_JOB_POSTINGS))
    emitChange()
    return true
  } catch (err) {
    console.error('Failed resetting jobs in storage:', err)
    return false
  }
}

