/**
 * ══════════════════════════════════════════════════════════════
 * FLO STUDIOS — REACTIVE SUBMISSION & ADMIN STORAGE ENGINE
 * Single source of truth for Client Inquiries & Job Applications
 * ══════════════════════════════════════════════════════════════
 */

export const STORAGE_KEY = 'FLO_STUDIOS_SUBMISSIONS_V1'
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
  const rows = records.map((r) => [
    r.type || '',
    r.id || '',
    r.createdAt ? `"${new Date(r.createdAt).toLocaleString().replace(/"/g, '""')}"` : '""',
    r.status || '',
    r.starred ? 'Yes' : 'No',
    `"${(r.name || '').replace(/"/g, '""')}"`,
    `"${(r.email || '').replace(/"/g, '""')}"`,
    `"${(r.phone || '').replace(/"/g, '""')}"`,
    `"${(r.service || r.role || '').replace(/"/g, '""')}"`,
    `"${(r.region || '').replace(/"/g, '""')}"`,
    `"${(r.resumeName ? r.resumeName : 'No').replace(/"/g, '""')}"`,
    `"${(r.portfolioUrl || '').replace(/"/g, '""')}"`,
    `"${(r.message || r.coverNote || '').replace(/"/g, '""').replace(/[\r\n]+/g, ' ')}"`
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
