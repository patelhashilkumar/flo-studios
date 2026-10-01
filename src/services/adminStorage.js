/**
 * ══════════════════════════════════════════════════════════════
 * FLO STUDIOS — RECTIVE SUBMISSION & ADMIN STORAGE ENGINE
 * Single source of truth for Client Inquiries & Job Applications
 * ══════════════════════════════════════════════════════════════
 */

const STORAGE_KEY = 'FLO_STUDIOS_SUBMISSIONS_V1'
const AUTH_KEY = 'FLO_STUDIOS_ADMIN_AUTH_V1'
const DEFAULT_PASSCODE = 'flo2026'

const DEFAULT_SEEDS = [
  {
    id: 'msg_1727836801000',
    type: 'message',
    name: 'Maya Lin',
    email: 'maya@linstudio.design',
    phone: '+1 (503) 555-0192',
    service: 'Motion Graphics',
    message: 'Looking to produce a high-octane 3D product reveal video for our upcoming hardware release in Q3. We love your work on Apple and Blitzit.',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    status: 'new',
    starred: true
  },
  {
    id: 'msg_1727836802000',
    type: 'message',
    name: 'Elena Rostova',
    email: 'elena@kinetic-audio.com',
    phone: '+44 20 7946 0912',
    service: '3D & CGI',
    message: 'We need procedural sound-wave simulations and liquid glass shader treatments for our next-gen wireless headphone launch campaign.',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    status: 'in-review',
    starred: false
  },
  {
    id: 'msg_1727836803000',
    type: 'message',
    name: 'Marcus Thorne',
    email: 'marcus@veloce-auto.it',
    phone: '+39 02 8901 2345',
    service: 'Creative Tech',
    message: 'Inquiring about commissioning an interactive WebGL brand showroom experience with real-time lighting for our automotive debut.',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    status: 'replied',
    starred: false
  },
  {
    id: 'job_1727836901000',
    type: 'job',
    name: 'Alex Mercer',
    email: 'alex.mercer@cgi-lab.io',
    phone: '+1 (415) 555-8391',
    role: 'Senior 3D & Houdini Artist',
    portfolioUrl: 'https://alexmercer.artstation.com',
    experience: '5+ years',
    coverNote: 'Extensive experience in procedural destruction, fluid dynamics, and Octane/Redshift rendering for luxury tech brands. Eager to push visual frontiers with Flo.',
    createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    status: 'interview',
    starred: true
  },
  {
    id: 'job_1727836902000',
    type: 'job',
    name: 'Sophia Zhang',
    email: 'sophia@zhangmotion.com',
    phone: '+1 (212) 555-4820',
    role: 'Motion Art Director',
    portfolioUrl: 'https://sophiazhang.design',
    experience: '7+ years',
    coverNote: 'Former Design Director at Tendril and ManvsMachine. Specialize in cinematic timing, kinetic typography, and multi-disciplinary creative direction.',
    createdAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    status: 'reviewing',
    starred: true
  },
  {
    id: 'job_1727836903000',
    type: 'job',
    name: 'David Kim',
    email: 'david@webgl-creative.dev',
    phone: '+1 (310) 555-7634',
    role: 'Creative Technologist / WebGL',
    portfolioUrl: 'https://github.com/davidkim-creative',
    experience: '4 years',
    coverNote: 'Deep background in Three.js, GLSL compute shaders, WebGPU experiments, and low-latency interaction physics for award-winning digital experiences.',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    status: 'new',
    starred: false
  }
]

/**
 * Broadcast storage changes to all active windows/components
 */
function emitChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('flo-storage-update'))
  }
}

/**
 * Retrieve all submissions from persistent storage
 */
export function getSubmissions() {
  if (typeof window === 'undefined') return DEFAULT_SEEDS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SEEDS))
      return DEFAULT_SEEDS
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : DEFAULT_SEEDS
  } catch (err) {
    console.error('Failed reading submissions from storage:', err)
    return DEFAULT_SEEDS
  }
}

/**
 * Save a new submission (Client Message or Job Application)
 */
export function saveSubmission(entry) {
  const current = getSubmissions()
  const isJob = entry.type === 'job'
  const newSubmission = {
    id: `${isJob ? 'job' : 'msg'}_${Date.now()}`,
    type: isJob ? 'job' : 'message',
    status: 'new',
    starred: false,
    createdAt: new Date().toISOString(),
    ...entry
  }

  const updated = [newSubmission, ...current]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    emitChange()
    return newSubmission
  } catch (err) {
    console.error('Failed saving submission:', err)
    return null
  }
}

/**
 * Update the review / workflow status of a submission
 */
export function updateSubmissionStatus(id, newStatus) {
  const current = getSubmissions()
  const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    emitChange()
    return true
  } catch (err) {
    console.error('Failed deleting submission:', err)
    return false
  }
}

/**
 * Reset data back to default studio sample inquiries
 */
export function seedSampleData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SEEDS))
    emitChange()
    return DEFAULT_SEEDS
  } catch (err) {
    console.error('Failed resetting sample data:', err)
    return []
  }
}

/**
 * Export all submissions as CSV download
 */
export function exportToCSV() {
  const records = getSubmissions()
  const headers = ['Type', 'ID', 'Date', 'Status', 'Starred', 'Name', 'Email', 'Phone', 'Service / Role', 'Portfolio', 'Message / Note']
  const rows = records.map((r) => [
    r.type,
    r.id,
    new Date(r.createdAt).toLocaleString(),
    r.status,
    r.starred ? 'Yes' : 'No',
    `"${(r.name || '').replace(/"/g, '""')}"`,
    `"${(r.email || '').replace(/"/g, '""')}"`,
    `"${(r.phone || '').replace(/"/g, '""')}"`,
    `"${(r.service || r.role || '').replace(/"/g, '""')}"`,
    `"${(r.portfolioUrl || '').replace(/"/g, '""')}"`,
    `"${(r.message || r.coverNote || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
  ])

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `flo_studios_submissions_${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Export all submissions as JSON download
 */
export function exportToJSON() {
  const records = getSubmissions()
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2))
  const link = document.createElement('a')
  link.setAttribute('href', dataStr)
  link.setAttribute('download', `flo_studios_submissions_${new Date().toISOString().slice(0, 10)}.json`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Passcode Authentication Helpers
 */
export function checkPasscode(pin) {
  const clean = (pin || '').trim().toLowerCase()
  if (clean === DEFAULT_PASSCODE || clean === 'flo') {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(AUTH_KEY, 'true')
    }
    return true
  }
  return false
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(AUTH_KEY) === 'true'
}

export function logout() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_KEY)
  }
}
