import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  getSubmissions,
  loadSubmissionsFromCloud,
  updateSubmissionStatus,
  toggleStar,
  deleteSubmission,
  exportToCSV,
  exportToJSON,
  seedSampleData,
  logout,
  getJobs,
  loadJobsFromCloud,
  saveJob,
  deleteJob,
  isSupabaseConfigured,
  getResumeSignedUrl
} from '../services/adminStorage'
import {
  signInAdmin,
  signOutAdmin,
  getAdminSession,
  onAuthChange,
  isAuthorizedAdminUser
} from '../services/supabaseService'
import SEO from '../components/SEO'
import './AdminPage.css'

function getSafeExternalUrl(url) {
  if (!url || typeof url !== 'string') return null
  const clean = url.trim()
  if (/^(javascript|data|vbscript|file):/i.test(clean)) return null
  if (/^https?:\/\//i.test(clean)) return clean
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i.test(clean)) return `https://${clean}`
  return null
}

// ── Crisp SVG Line Icons (No Emojis) ──
function IconRefresh() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  )
}

function IconDownload() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  )
}

function IconTrash() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

function IconLock() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconList() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

function IconEdit() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function IconStar({ filled }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#f59e0b' : 'none'} stroke={filled ? '#f59e0b' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function IconFile() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function IconGrid() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

function IconTable() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  )
}

function IconInbox() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  )
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false)
  const [adminUser, setAdminUser] = useState(null)
  const [resumeLoadingId, setResumeLoadingId] = useState(null)

  const [submissions, setSubmissions] = useState([])
  const [jobs, setJobs] = useState([])
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'message' | 'job' | 'starred' | 'cms'
  const [viewMode, setViewMode] = useState('cards') // 'cards' | 'table'
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Job CMS Modal State
  const [isJobModalOpen, setIsJobModalOpen] = useState(false)
  const [editingJobId, setEditingJobId] = useState(null)
  const [jobFormTitle, setJobFormTitle] = useState('')
  const [jobFormDivision, setJobFormDivision] = useState('Development Division')
  const [jobFormStatus, setJobFormStatus] = useState('active')
  const [jobFormBadges, setJobFormBadges] = useState('')
  const [jobFormCompLead, setJobFormCompLead] = useState('')
  const [jobFormAboutJob, setJobFormAboutJob] = useState('')
  const [jobFormResponsibilities, setJobFormResponsibilities] = useState('')
  const [jobFormMinQuals, setJobFormMinQuals] = useState('')
  const [jobFormPrefQuals, setJobFormPrefQuals] = useState('')
  const [cmsNotice, setCmsNotice] = useState('')

  // Initialize auth check & data (strictly requires an authorized Supabase Auth session)
  useEffect(() => {
    logout() // Purge any legacy localStorage auth tokens

    const initAuthAndData = async () => {
      if (!isSupabaseConfigured()) {
        setUnlocked(false)
        setAdminUser(null)
        return
      }
      const { session, user } = await getAdminSession()
      if (session && user && isAuthorizedAdminUser(user)) {
        setUnlocked(true)
        setAdminUser(user)
        const [cloudSubs, cloudJobs] = await Promise.all([
          loadSubmissionsFromCloud(),
          loadJobsFromCloud()
        ])
        setSubmissions(Array.isArray(cloudSubs) ? cloudSubs : [])
        setJobs(Array.isArray(cloudJobs) ? cloudJobs : [])
      } else {
        setUnlocked(false)
        setAdminUser(null)
      }
    }

    initAuthAndData()

    // Listen to Supabase Auth state transitions
    const { data: authListener } = onAuthChange((event, session) => {
      if (session?.user && isAuthorizedAdminUser(session.user)) {
        setUnlocked(true)
        setAdminUser(session.user)
        loadSubmissionsFromCloud().then((res) => setSubmissions(Array.isArray(res) ? res : []))
        loadJobsFromCloud().then((res) => setJobs(Array.isArray(res) ? res : []))
      } else if (event === 'SIGNED_OUT' || !session) {
        setUnlocked(false)
        setAdminUser(null)
        setSubmissions([])
      }
    })

    return () => {
      if (authListener?.subscription?.unsubscribe) {
        authListener.subscription.unsubscribe()
      }
    }
  }, [])

  // Listen to live storage mutations only while unlocked
  useEffect(() => {
    if (!unlocked) return
    const handleStorageUpdate = () => {
      setSubmissions(getSubmissions())
      setJobs(getJobs())
    }
    window.addEventListener('flo-storage-update', handleStorageUpdate)
    return () => window.removeEventListener('flo-storage-update', handleStorageUpdate)
  }, [unlocked])

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isJobModalOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isJobModalOpen])

  const handleAdminSignIn = async (e) => {
    if (e) e.preventDefault()
    setAuthError('')
    setIsSubmittingAuth(true)

    const cleanEmail = (adminEmail || '').trim().toLowerCase()
    const cleanPassword = (adminPassword || '').trim()

    if (!cleanEmail || !cleanPassword) {
      setAuthError('Please enter both Admin Email and password.')
      setIsSubmittingAuth(false)
      return
    }

    if (!isSupabaseConfigured()) {
      setAuthError('Supabase authentication is not configured for this environment.')
      setIsSubmittingAuth(false)
      return
    }

    try {
      const { data, error } = await signInAdmin(cleanEmail, cleanPassword)
      const user = data?.session?.user || null
      if (!error && data?.session && isAuthorizedAdminUser(user)) {
        setUnlocked(true)
        setAdminUser(user)
        const [cloudSubs, cloudJobs] = await Promise.all([
          loadSubmissionsFromCloud(),
          loadJobsFromCloud()
        ])
        setSubmissions(Array.isArray(cloudSubs) ? cloudSubs : [])
        setJobs(Array.isArray(cloudJobs) ? cloudJobs : [])
        setIsSubmittingAuth(false)
        return
      }
      if (error) {
        if (error.message === 'Failed to fetch') {
          setAuthError(
            'Network error: Unable to reach Supabase. If using Brave or an ad blocker, disable Shields for this site; or enable Secure DNS (Cloudflare 1.1.1.1 / Google) if your ISP blocks supabase.co.'
          )
        } else {
          setAuthError(error.message)
        }
      } else {
        setAuthError('Invalid administrator credentials or unauthorized account.')
      }
    } catch (err) {
      console.warn('Supabase auth attempt failed:', err)
      const isFetchErr = err?.message === 'Failed to fetch' || err?.name === 'TypeError'
      setAuthError(
        isFetchErr
          ? 'Network error: Unable to reach Supabase. Check your internet connection or disable ad blockers / Brave Shields.'
          : 'Unable to verify administrator credentials. Please try again.'
      )
    }

    setIsSubmittingAuth(false)
  }

  const handleLock = async () => {
    await signOutAdmin()
    logout()
    setUnlocked(false)
    setAdminUser(null)
    setAdminPassword('')
    setSubmissions([])
  }


  const handleStatusChange = (id, newStatus) => {
    updateSubmissionStatus(id, newStatus)
    setSubmissions(getSubmissions())
  }

  const handleToggleStar = (id) => {
    toggleStar(id)
    setSubmissions(getSubmissions())
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the submission from ${name}?`)) {
      deleteSubmission(id)
      setSubmissions(getSubmissions())
    }
  }

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to clear all submissions from storage?')) {
      seedSampleData()
      setSubmissions(getSubmissions())
    }
  }

  const handleViewResume = async (resumePath, resumeName, id) => {
    if (!resumePath) return
    setResumeLoadingId(id)
    try {
      const signedUrl = await getResumeSignedUrl(resumePath, 3600)
      if (signedUrl) {
        window.open(signedUrl, '_blank', 'noopener,noreferrer')
      } else {
        alert('Could not generate private signed download link. Verify you are logged into Supabase.')
      }
    } catch (err) {
      console.error('Failed opening signed resume link:', err)
      alert('Error accessing private resume document.')
    } finally {
      setResumeLoadingId(null)
    }
  }

  // ── Job CMS Handlers ──
  const handleOpenAddJob = () => {
    setEditingJobId(null)
    setJobFormTitle('')
    setJobFormDivision('Development Division')
    setJobFormStatus('active')
    setJobFormBadges('Development Division, Remote, Contract')
    setJobFormCompLead('')
    setJobFormAboutJob('')
    setJobFormResponsibilities('')
    setJobFormMinQuals('')
    setJobFormPrefQuals('')
    setIsJobModalOpen(true)
  }

  const handleOpenEditJob = (job) => {
    setEditingJobId(job.id)
    setJobFormTitle(job.title || '')
    setJobFormDivision(job.division || 'Development Division')
    setJobFormStatus(job.status || 'active')
    setJobFormBadges((job.badges || []).join(', '))
    setJobFormCompLead(job.compensationLead || '')
    setJobFormAboutJob((job.aboutJob || []).join('\n\n'))
    setJobFormResponsibilities(
      (job.responsibilities || [])
        .map((r) => `${r.title}: ${r.desc}`)
        .join('\n')
    )
    setJobFormMinQuals((job.minimumQualifications || []).join('\n'))
    setJobFormPrefQuals((job.preferredQualifications || []).join('\n'))
    setIsJobModalOpen(true)
  }

  const handleSaveJob = async (e) => {
    e.preventDefault()
    const safeTitle = (jobFormTitle || '').trim()
    if (!safeTitle) return

    // Parse responsibilities
    const rawRespLines = (jobFormResponsibilities || '').split('\n').filter((l) => l.trim().length > 0)
    const responsibilities = rawRespLines.map((line, idx) => {
      const colonIdx = line.indexOf(':')
      if (colonIdx > 0) {
        return {
          num: String(idx + 1).padStart(2, '0'),
          title: line.slice(0, colonIdx).trim(),
          desc: line.slice(colonIdx + 1).trim()
        }
      }
      return {
        num: String(idx + 1).padStart(2, '0'),
        title: `Core Responsibility ${idx + 1}`,
        desc: line.trim()
      }
    })

    const minimumQualifications = (jobFormMinQuals || '').split('\n').map((l) => l.trim()).filter(Boolean)
    const preferredQualifications = (jobFormPrefQuals || '').split('\n').map((l) => l.trim()).filter(Boolean)
    const aboutJob = (jobFormAboutJob || '').split('\n\n').map((p) => p.trim()).filter(Boolean)
    const badges = (jobFormBadges || '').split(',').map((b) => b.trim()).filter(Boolean)

    const jobPayload = {
      id: editingJobId || `job_${Date.now()}`,
      title: safeTitle,
      tabLabel: safeTitle,
      division: jobFormDivision || 'Studio',
      status: jobFormStatus || 'active',
      badges: badges.length > 0 ? badges : [jobFormDivision || 'Studio', 'Remote'],
      aboutJob: aboutJob.length > 0 ? aboutJob : [safeTitle],
      responsibilities,
      compensationLead: (jobFormCompLead || '').trim(),
      minimumQualifications,
      preferredQualifications
    }

    const success = await saveJob(jobPayload)
    if (success) {
      setIsJobModalOpen(false)
      setJobs(getJobs())
      setCmsNotice(editingJobId ? 'Job updated in Supabase cloud' : 'New job created and published')
      setTimeout(() => setCmsNotice(''), 4000)
    }
  }

  const handleDeleteJob = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the job listing "${title}"? This will remove it from the database and Careers page.`)) {
      await deleteJob(id)
      setJobs(getJobs())
      setCmsNotice(`Deleted job "${title}"`)
      setTimeout(() => setCmsNotice(''), 4000)
    }
  }

  // Filtered dataset for Inquiries
  const filteredSubmissions = submissions.filter((item) => {
    // Tab filter
    if (activeTab === 'message' && item.type !== 'message') return false
    if (activeTab === 'job' && item.type !== 'job') return false
    if (activeTab === 'starred' && !item.starred) return false

    // Status dropdown filter
    if (statusFilter !== 'all' && item.status !== statusFilter) return false

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchName = item.name?.toLowerCase().includes(q)
      const matchEmail = item.email?.toLowerCase().includes(q)
      const matchRole = item.role?.toLowerCase().includes(q)
      const matchService = item.service?.toLowerCase().includes(q)
      const matchContent = (item.message || item.coverNote || '').toLowerCase().includes(q)
      return matchName || matchEmail || matchRole || matchService || matchContent
    }

    return true
  })

  // KPI Calculations
  const safeSubmissions = Array.isArray(submissions) ? submissions : []
  const safeJobs = Array.isArray(jobs) ? jobs : []
  const totalCount = safeSubmissions.length
  const messageCount = safeSubmissions.filter((s) => s?.type === 'message').length
  const jobCount = safeSubmissions.filter((s) => s?.type === 'job').length
  const newCount = safeSubmissions.filter((s) => s?.status === 'new').length
  const starredCount = safeSubmissions.filter((s) => s?.starred).length
  const activeJobsCount = safeJobs.filter((j) => j?.status === 'active').length

  /* ═══════════════════════════════════════════════════
     VIEW 1: AUTHENTICATION LOCK SCREEN
     ═══════════════════════════════════════════════════ */
  if (!unlocked) {
    return (
      <main className="admin-lock-page">
        <SEO title="Studio Portal, Flo Studios" description="Restricted studio administrative portal." noindex={true} />
        <div className="admin-lock-card">
          <h1 className="admin-lock-title">Flo Studios Admin</h1>
          <p className="admin-lock-sub">
            Authenticate with your studio administrator account to access client leads, applications, and job management.
          </p>

          <form onSubmit={handleAdminSignIn} className="admin-lock-form">
            <div className="admin-lock-field">
              <label className="admin-lock-label">Admin ID / Email</label>
              <input
                type="text"
                placeholder=""
                value={adminEmail}
                onChange={(e) => {
                  setAdminEmail(e.target.value)
                  if (authError) setAuthError('')
                }}
                className="admin-lock-input admin-lock-input--left"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                required
                autoFocus
              />
            </div>

            <div className="admin-lock-field">
              <label className="admin-lock-label">Password</label>
              <div className="admin-lock-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value)
                    if (authError) setAuthError('')
                  }}
                  className="admin-lock-input admin-lock-input--left admin-lock-input--password"
                  required
                />
                <button
                  type="button"
                  className="admin-lock-eye-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="admin-lock-buttons">
              <button type="submit" className="admin-lock-btn" disabled={isSubmittingAuth}>
                {isSubmittingAuth ? 'Verifying Credentials...' : 'Sign In to Studio Portal →'}
              </button>
            </div>

            {authError && <p className="admin-lock-err-msg">{authError}</p>}
          </form>

          <div className="admin-lock-footer">
            <Link to="/" className="admin-lock-back">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </main>
    )
  }

  /* ═══════════════════════════════════════════════════
     VIEW 2: UNLOCKED ADMIN DASHBOARD
     ═══════════════════════════════════════════════════ */
  return (
    <main className="admin-page">
      <SEO title="Studio Admin, Flo Studios" description="Restricted studio administrative portal." noindex={true} />
      <div className="container">
        {/* Top Header Bar */}
        <header className="admin-header">
          <div className="admin-header__brand">
            <div className="admin-header__logo">
              <span className="admin-header__dot" />
              <span className="admin-header__title">FLO STUDIOS INTAKE</span>
            </div>
            <span
              className={`admin-header__status ${
                isSupabaseConfigured() ? 'admin-header__status--cloud' : 'admin-header__status--local'
              }`}
            >
              {isSupabaseConfigured() ? '● SUPABASE CLOUD SYNC' : '● LOCAL PREVIEW MODE'}
            </span>
          </div>

          <div className="admin-header__actions">
            <button
              type="button"
              onClick={async () => {
                const [s, j] = await Promise.all([loadSubmissionsFromCloud(), loadJobsFromCloud()])
                setSubmissions(s)
                setJobs(j)
                setCmsNotice(`Cloud sync complete: ${s.length} submission${s.length === 1 ? '' : 's'}, ${j.length} job opening${j.length === 1 ? '' : 's'}`)
                setTimeout(() => setCmsNotice(''), 4000)
              }}
              className="admin-action-pill"
              title="Refresh latest data from Supabase Cloud"
            >
              <IconRefresh />
              <span>Refresh Cloud</span>
            </button>
            <button type="button" onClick={exportToCSV} className="admin-action-pill" title="Export as CSV">
              <IconDownload />
              <span>Export CSV</span>
            </button>
            <button type="button" onClick={exportToJSON} className="admin-action-pill" title="Export as JSON">
              <IconDownload />
              <span>Export JSON</span>
            </button>
            <button
              type="button"
              onClick={handleResetData}
              disabled={totalCount === 0}
              className="admin-action-pill admin-action-pill--danger"
              title="Clear all stored submissions"
            >
              <IconTrash />
              <span>Clear Data</span>
            </button>
            <button
              type="button"
              onClick={handleLock}
              className="admin-action-pill admin-action-pill--subtle"
              title="Lock Admin Portal"
            >
              <IconLock />
              <span>Sign Out {adminUser?.email ? `(${adminUser.email})` : ''}</span>
            </button>
          </div>
        </header>

        {/* Global Notice Toast */}
        {cmsNotice && (
          <div className="admin-notice-toast">
            <span>{cmsNotice}</span>
          </div>
        )}

        {/* KPI Metric Summary Strip */}
        <section className="admin-kpis">
          <div className="admin-kpi-card">
            <span className="admin-kpi-card__label">Total Inquiries</span>
            <span className="admin-kpi-card__val">{totalCount}</span>
          </div>
          <div className="admin-kpi-card">
            <span className="admin-kpi-card__label">Client Messages</span>
            <span className="admin-kpi-card__val">{messageCount}</span>
          </div>
          <div className="admin-kpi-card">
            <span className="admin-kpi-card__label">Job Candidates</span>
            <span className="admin-kpi-card__val">{jobCount}</span>
          </div>
          <div className="admin-kpi-card">
            <span className="admin-kpi-card__label">Active Job Openings</span>
            <span className="admin-kpi-card__val admin-kpi-card__val--accent">{activeJobsCount}</span>
          </div>
          <div className="admin-kpi-card">
            <span className="admin-kpi-card__label">Unreviewed (New)</span>
            <span className="admin-kpi-card__val admin-kpi-card__val--new">{newCount}</span>
          </div>
          <div className="admin-kpi-card">
            <span className="admin-kpi-card__label">Starred for Follow-Up</span>
            <span className="admin-kpi-card__val admin-kpi-card__val--starred">{starredCount}</span>
          </div>
        </section>

        {/* Controls Toolbar: Tabs, Search, & Status Filters */}
        <section className="admin-controls">
          <div className="admin-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'all'}
              className={`admin-tab ${activeTab === 'all' ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Inquiries <span className="admin-tab__count">{totalCount}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'message'}
              className={`admin-tab ${activeTab === 'message' ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab('message')}
            >
              Client Messages <span className="admin-tab__count">{messageCount}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'job'}
              className={`admin-tab ${activeTab === 'job' ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab('job')}
            >
              Job Applications <span className="admin-tab__count">{jobCount}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'starred'}
              className={`admin-tab ${activeTab === 'starred' ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab('starred')}
            >
              Starred <span className="admin-tab__count">{starredCount}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'cms'}
              className={`admin-tab admin-tab--cms ${activeTab === 'cms' ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab('cms')}
            >
              <IconBriefcase />
              <span>Manage Jobs</span> <span className="admin-tab__count">{jobs.length}</span>
            </button>
          </div>

          {activeTab !== 'cms' && (
            <div className="admin-filters">
              <div className="admin-search-wrap">
                <input
                  type="text"
                  placeholder="Search by name, email, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="admin-search-clear"
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="admin-status-select"
              >
                <option value="all">All Workflow Statuses</option>
                <option value="new">New / Unread</option>
                {activeTab !== 'job' && (
                  <>
                    <option value="reviewed">Reviewed (Inquiries)</option>
                    <option value="contacted">Contacted (Inquiries)</option>
                  </>
                )}
                {activeTab !== 'message' && (
                  <>
                    <option value="reviewing">Reviewing (Candidates)</option>
                    <option value="interviewing">Interviewing (Candidates)</option>
                    <option value="offer">Offer (Candidates)</option>
                    <option value="rejected">Rejected (Candidates)</option>
                  </>
                )}
                <option value="archived">Archived</option>
              </select>

              <div className="admin-view-toggle" role="group" aria-label="View format">
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`admin-view-toggle__btn ${viewMode === 'cards' ? 'admin-view-toggle__btn--active' : ''}`}
                  title="Detailed cards view"
                  aria-pressed={viewMode === 'cards'}
                >
                  <IconGrid />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`admin-view-toggle__btn ${viewMode === 'table' ? 'admin-view-toggle__btn--active' : ''}`}
                  title="Dense table view"
                  aria-pressed={viewMode === 'table'}
                >
                  <IconTable />
                  <span>Table</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* ── VIEW A: MANAGE JOBS (CMS) ── */}
        {activeTab === 'cms' ? (
          <section className="admin-cms-section">
            <div className="admin-cms-header">
              <div>
                <h2 className="admin-cms-title">Career Openings Management (Cloud CMS)</h2>
                <p className="admin-cms-subtitle">
                  Add, edit, or delete live positions stored in the <code>job_postings</code> database table.
                </p>
              </div>
              <div className="admin-cms-header-actions">
                <button
                  type="button"
                  onClick={handleOpenAddJob}
                  className="admin-action-pill admin-action-pill--primary"
                >
                  + Add New Job Opening
                </button>
              </div>
            </div>

            <div className="admin-jobs-grid">
              {safeJobs.map((job) => {
                const jobCandidateCount = safeSubmissions.filter(
                  (s) => s?.type === 'job' && (s?.jobId === job?.id || s?.role === job?.title)
                ).length
                return (
                  <div key={job.id} className="admin-job-card">
                    <div className="admin-job-card__top">
                      <div className="admin-job-card__meta">
                        <span className="admin-job-card__index">{job.tabNumber || '01'}</span>
                        <span className="admin-job-card__division">{job.division || 'Development Division'}</span>
                      </div>
                      <span
                        className={`admin-job-card__status admin-job-card__status--${job.status || 'active'}`}
                      >
                        {job.status || 'active'}
                      </span>
                    </div>

                    <h3 className="admin-job-card__title">{job.title}</h3>

                    <div className="admin-job-card__badges">
                      {(job.badges || []).slice(0, 3).map((b, idx) => (
                        <span key={idx} className="admin-job-card__badge-pill">
                          {b}
                        </span>
                      ))}
                      {(job.badges || []).length > 3 && (
                        <span className="admin-job-card__badge-more">
                          +{(job.badges || []).length - 3} more
                        </span>
                      )}
                    </div>

                    <p className="admin-job-card__comp">
                      <strong>Comp:</strong> {job.compensationLead || 'Commission / Retainer'}
                    </p>

                    <div className="admin-job-card__kpi">
                      <span><IconUsers /> {jobCandidateCount} Applicant{jobCandidateCount === 1 ? '' : 's'}</span>
                      <span><IconList /> {(job.responsibilities || []).length} Responsibilities</span>
                    </div>

                    <div className="admin-job-card__actions">
                      <button
                        type="button"
                        onClick={() => handleOpenEditJob(job)}
                        className="admin-action-pill"
                      >
                        <IconEdit />
                        <span>Edit Job</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteJob(job.id, job.title)}
                        className="admin-action-pill admin-action-pill--danger"
                      >
                        <IconTrash />
                        <span>Delete</span>
                      </button>
                      <Link
                        to="/careers"
                        target="_blank"
                        className="admin-action-pill admin-action-pill--subtle"
                      >
                        <span>View Live ↗</span>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ) : (
          /* ── VIEW B: SUBMISSIONS FEED ── */
          <section className="admin-feed">
            {filteredSubmissions.length === 0 ? (
              <div className="admin-empty">
                <span className="admin-empty__icon"><IconInbox /></span>
                <h3 className="admin-empty__title">No Submissions Found</h3>
                <p className="admin-empty__desc">
                  {searchQuery
                    ? `No inquiries match "${searchQuery}". Try clearing search filters.`
                    : 'No submissions in this category yet. Inquiries from /contact and applications from /careers will appear here.'}
                </p>
                {(searchQuery || statusFilter !== 'all' || activeTab !== 'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('')
                      setStatusFilter('all')
                      setActiveTab('all')
                    }}
                    className="admin-empty__btn"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            ) : viewMode === 'table' ? (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: 44 }} aria-label="Starred status"></th>
                      <th style={{ width: 140 }}>Type</th>
                      <th>Sender</th>
                      <th>Role / Scope</th>
                      <th style={{ width: 130 }}>Date</th>
                      <th style={{ width: 140 }}>Status</th>
                      <th style={{ width: 110, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleToggleStar(item.id)}
                            className={`admin-card__star ${item.starred ? 'admin-card__star--active' : ''}`}
                            title={item.starred ? 'Unstar' : 'Star for follow up'}
                            aria-label={item.starred ? 'Unstar' : 'Star'}
                          >
                            <IconStar filled={item.starred} />
                          </button>
                        </td>
                        <td>
                          <span
                            className={`admin-card__type-pill ${
                              item.type === 'job'
                                ? 'admin-card__type-pill--job'
                                : 'admin-card__type-pill--message'
                            }`}
                          >
                            {item.type === 'job' ? <IconBriefcase /> : <IconMail />}
                            <span>{item.type === 'job' ? 'Application' : 'Inquiry'}</span>
                          </span>
                        </td>
                        <td>
                          <div className="admin-table__name">{item.name}</div>
                          <div className="admin-table__meta">
                            <a href={`mailto:${item.email}`}>{item.email}</a>
                            {item.phone && <span> • {item.phone}</span>}
                          </div>
                        </td>
                        <td>
                          <div className="admin-table__name">
                            {item.type === 'job' ? (item.role || 'Career Opening') : (item.service || 'Client Scope')}
                          </div>
                          {item.resumePath ? (
                            <button
                              type="button"
                              onClick={() => handleViewResume(item.resumePath, item.resumeName, item.id)}
                              className="admin-table__resume-btn"
                              title="Open candidate resume"
                              disabled={resumeLoadingId === item.id}
                            >
                              <IconLock />
                              <span>{resumeLoadingId === item.id ? 'Loading...' : (item.resumeName || 'View Resume')}</span>
                            </button>
                          ) : item.portfolioUrl ? (
                            <div className="admin-table__meta">
                              <a href={getSafeExternalUrl(item.portfolioUrl) || '#'} target="_blank" rel="noopener noreferrer">
                                Portfolio ↗
                              </a>
                            </div>
                          ) : null}
                        </td>
                        <td className="admin-table__meta">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                        </td>
                        <td>
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            className={`admin-card__status-pill admin-card__status-pill--${item.status}`}
                          >
                            {item.type === 'job' ? (
                              <>
                                <option value="new">New</option>
                                <option value="reviewing">Reviewing</option>
                                <option value="interviewing">Interviewing</option>
                                <option value="offer">Offer</option>
                                <option value="rejected">Rejected</option>
                                <option value="archived">Archived</option>
                              </>
                            ) : (
                              <>
                                <option value="new">New</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="contacted">Contacted</option>
                                <option value="archived">Archived</option>
                              </>
                            )}
                          </select>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="admin-table__actions">
                            <a
                              href={`mailto:${encodeURIComponent(item.email)}?subject=${encodeURIComponent(
                                item.type === 'job'
                                  ? `Flo Studios Application - ${item.role}`
                                  : `Flo Studios Inquiry - Project Scope`
                              )}`}
                              className="admin-action-pill admin-action-pill--subtle"
                              title="Reply via email"
                              aria-label="Reply via email"
                            >
                              <IconMail />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id, item.name)}
                              className="admin-action-pill admin-action-pill--danger"
                              title="Delete submission"
                              aria-label="Delete submission"
                            >
                              <IconTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="admin-list">
                {filteredSubmissions.map((item) => (
                  <div
                    key={item.id}
                    className={`admin-card ${item.status === 'new' ? 'admin-card--new' : ''} ${
                      item.starred ? 'admin-card--starred' : ''
                    }`}
                  >
                    {/* Card Header */}
                    <div className="admin-card__top">
                      <div className="admin-card__identifiers">
                        <button
                          type="button"
                          onClick={() => handleToggleStar(item.id)}
                          className={`admin-card__star ${item.starred ? 'admin-card__star--active' : ''}`}
                          title={item.starred ? 'Unstar' : 'Star for follow up'}
                          aria-label={item.starred ? 'Unstar' : 'Star for follow up'}
                        >
                          <IconStar filled={item.starred} />
                        </button>

                        <span
                          className={`admin-card__type-pill ${
                            item.type === 'job'
                              ? 'admin-card__type-pill--job'
                              : 'admin-card__type-pill--message'
                          }`}
                        >
                          {item.type === 'job' ? <IconBriefcase /> : <IconMail />}
                          <span>{item.type === 'job' ? 'Job Application' : 'Client Inquiry'}</span>
                        </span>

                        <span className="admin-card__date">
                          {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Recent'}
                        </span>
                      </div>

                      <div className="admin-card__status-ctrl">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`admin-card__status-pill admin-card__status-pill--${item.status}`}
                        >
                          {item.type === 'job' ? (
                            <>
                              <option value="new">New</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="interviewing">Interviewing</option>
                              <option value="offer">Offer</option>
                              <option value="rejected">Rejected</option>
                              <option value="archived">Archived</option>
                            </>
                          ) : (
                            <>
                              <option value="new">New</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="contacted">Contacted</option>
                              <option value="archived">Archived</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Sender Details */}
                    <div className="admin-card__body">
                      <div className="admin-card__profile">
                        <h4 className="admin-card__name">{item.name}</h4>
                        <div className="admin-card__contacts">
                          <a href={`mailto:${item.email}`} className="admin-card__link">
                            {item.email}
                          </a>
                          {item.phone && <span className="admin-card__dot-sep">•</span>}
                          {item.phone && (
                            <a href={`tel:${item.phone}`} className="admin-card__link">
                              {item.phone}
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Metadata Badges */}
                      <div className="admin-card__details">
                        {item.type === 'job' ? (
                          <>
                            <span className="admin-card__tag">Role: {item.role || 'SDR'}</span>
                            {item.region && <span className="admin-card__tag">Region: {item.region}</span>}
                            {item.experience && (
                              <span className="admin-card__tag">Exp: {item.experience}</span>
                            )}
                          </>
                        ) : (
                          <>
                            {item.service && (
                              <span className="admin-card__tag">Service: {item.service}</span>
                            )}
                            {item.budget && (
                              <span className="admin-card__tag">Budget: {item.budget}</span>
                            )}
                          </>
                        )}
                      </div>

                      {/* Portfolio / LinkedIn Link */}
                      {item.portfolioUrl && (
                        <div className="admin-card__portfolio">
                          <span className="admin-card__portfolio-label">Profile / Portfolio:</span>
                          {getSafeExternalUrl(item.portfolioUrl) ? (
                            <a
                              href={getSafeExternalUrl(item.portfolioUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="admin-card__portfolio-link"
                            >
                              {item.portfolioUrl} ↗
                            </a>
                          ) : (
                            <span className="admin-card__portfolio-link" style={{ opacity: 0.65 }}>
                              {item.portfolioUrl} (Unsafe link protocol blocked)
                            </span>
                          )}
                        </div>
                      )}

                      {/* Message or Cover Note */}
                      <p className="admin-card__text">
                        {item.type === 'job' ? item.coverNote : item.message}
                      </p>
                    </div>

                    {/* Actions Footer */}
                    <div className="admin-card__footer">
                      {/* Secure Resume Download via Private Supabase Storage */}
                      {item.resumePath ? (
                        <button
                          type="button"
                          onClick={() => handleViewResume(item.resumePath, item.resumeName, item.id)}
                          className="admin-resume-download-btn"
                          title="Open private candidate resume from Supabase Storage"
                          disabled={resumeLoadingId === item.id}
                        >
                          <IconLock />
                          <span>
                            {resumeLoadingId === item.id ? 'Generating Secure Link...' : `View Private Resume (${item.resumeName || 'Document'})`}
                          </span>
                        </button>
                      ) : item.resumeName ? (
                        <span className="admin-resume-warning" title="Document metadata saved">
                          <IconFile />
                          <span>{item.resumeName}</span>
                        </span>
                      ) : null}

                      <div className="admin-card__footer-actions">
                        <a
                          href={`mailto:${encodeURIComponent(item.email)}?subject=${encodeURIComponent(
                            item.type === 'job'
                              ? `Flo Studios Application - ${item.role}`
                              : `Flo Studios Inquiry - Project Scope`
                          )}`}
                          className="admin-card__action-btn"
                        >
                          <IconMail />
                          <span>Reply</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.name)}
                          className="admin-card__action-btn admin-card__action-btn--delete"
                        >
                          <IconTrash />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── MODAL: ADD / EDIT JOB OPENING ── */}
        {isJobModalOpen && (
          <div
            className="admin-modal-backdrop"
            data-lenis-prevent="true"
            onClick={() => setIsJobModalOpen(false)}
          >
            <div
              className="admin-modal-card"
              data-lenis-prevent="true"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="admin-modal-header">
                <h3 className="admin-modal-title">
                  {editingJobId ? 'Edit Job Opening' : 'Add New Job Opening'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="admin-modal-close"
                  aria-label="Close dialog"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSaveJob} className="admin-modal-form">
                <div className="admin-modal-group">
                  <label className="admin-modal-label">Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Product Designer"
                    value={jobFormTitle}
                    onChange={(e) => setJobFormTitle(e.target.value)}
                    className="admin-modal-input"
                  />
                </div>

                <div className="admin-modal-row">
                  <div className="admin-modal-group">
                    <label className="admin-modal-label">Division</label>
                    <input
                      type="text"
                      placeholder="e.g. Development Division"
                      value={jobFormDivision}
                      onChange={(e) => setJobFormDivision(e.target.value)}
                      className="admin-modal-input"
                    />
                  </div>

                  <div className="admin-modal-group">
                    <label className="admin-modal-label">Status</label>
                    <select
                      value={jobFormStatus}
                      onChange={(e) => setJobFormStatus(e.target.value)}
                      className="admin-modal-select"
                    >
                      <option value="active">Active (Published on /careers)</option>
                      <option value="draft">Draft (Hidden)</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="admin-modal-group">
                  <label className="admin-modal-label">Badges (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Development Division, Full-Cycle, Remote, Contract"
                    value={jobFormBadges}
                    onChange={(e) => setJobFormBadges(e.target.value)}
                    className="admin-modal-input"
                  />
                </div>

                <div className="admin-modal-group">
                  <label className="admin-modal-label">Compensation Summary</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% commission-based contract position / Monthly Retainer"
                    value={jobFormCompLead}
                    onChange={(e) => setJobFormCompLead(e.target.value)}
                    className="admin-modal-input"
                  />
                </div>

                <div className="admin-modal-group">
                  <label className="admin-modal-label">About the Job (Paragraphs separated by blank line)</label>
                  <textarea
                    rows={4}
                    placeholder="Describe role mission and focus..."
                    value={jobFormAboutJob}
                    onChange={(e) => setJobFormAboutJob(e.target.value)}
                    className="admin-modal-textarea"
                  />
                </div>

                <div className="admin-modal-group">
                  <label className="admin-modal-label">Responsibilities (One per line, 'Title: Description')</label>
                  <textarea
                    rows={5}
                    placeholder="Prospect List Development: Research and build targeted prospect list..."
                    value={jobFormResponsibilities}
                    onChange={(e) => setJobFormResponsibilities(e.target.value)}
                    className="admin-modal-textarea"
                  />
                </div>

                <div className="admin-modal-group">
                  <label className="admin-modal-label">Minimum Qualifications (One per line)</label>
                  <textarea
                    rows={4}
                    placeholder="2-3 years sales experience&#10;Based in North America or Europe"
                    value={jobFormMinQuals}
                    onChange={(e) => setJobFormMinQuals(e.target.value)}
                    className="admin-modal-textarea"
                  />
                </div>

                <div className="admin-modal-group">
                  <label className="admin-modal-label">Preferred Qualifications (One per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Agency experience&#10;CRM proficiency"
                    value={jobFormPrefQuals}
                    onChange={(e) => setJobFormPrefQuals(e.target.value)}
                    className="admin-modal-textarea"
                  />
                </div>

                <div className="admin-modal-actions">
                  <button
                    type="button"
                    onClick={() => setIsJobModalOpen(false)}
                    className="admin-action-pill admin-action-pill--subtle"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-action-pill admin-action-pill--primary">
                    {editingJobId ? 'Save Changes to Cloud' : 'Publish Job Opening'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
