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
  checkPasscode,
  isAuthenticated,
  logout,
  getJobs,
  loadJobsFromCloud,
  saveJob,
  deleteJob,
  resetJobs,
  isSupabaseConfigured,
  getResumeSignedUrl
} from '../services/adminStorage'
import {
  signInAdmin,
  signOutAdmin,
  getAdminSession,
  onAuthChange
} from '../services/supabaseService'
import './AdminPage.css'

function getSafeExternalUrl(url) {
  if (!url || typeof url !== 'string') return null
  const clean = url.trim()
  if (/^(javascript|data|vbscript|file):/i.test(clean)) return null
  if (/^https?:\/\//i.test(clean)) return clean
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i.test(clean)) return `https://${clean}`
  return null
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [authMethod, setAuthMethod] = useState('passcode') // 'passcode' | 'supabase'
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [passcode, setPasscode] = useState('')
  const [authError, setAuthError] = useState('')
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false)
  const [adminUser, setAdminUser] = useState(null)
  const [resumeLoadingId, setResumeLoadingId] = useState(null)

  const [submissions, setSubmissions] = useState([])
  const [jobs, setJobs] = useState([])
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'message' | 'job' | 'starred' | 'cms'
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

  // Initialize auth check & data
  useEffect(() => {
    const initAuthAndData = async () => {
      if (isSupabaseConfigured()) {
        const { session, user } = await getAdminSession()
        if (session && user) {
          setUnlocked(true)
          setAdminUser(user)
          const [cloudSubs, cloudJobs] = await Promise.all([
            loadSubmissionsFromCloud(),
            loadJobsFromCloud()
          ])
          setSubmissions(cloudSubs)
          setJobs(cloudJobs)
          return
        }
      }
      if (isAuthenticated()) {
        setUnlocked(true)
        loadSubmissionsFromCloud().then(setSubmissions)
        loadJobsFromCloud().then(setJobs)
      } else {
        setSubmissions(getSubmissions())
        setJobs(getJobs())
      }
    }

    initAuthAndData()

    // Listen to Supabase Auth state transitions
    const { data: authListener } = onAuthChange((event, session) => {
      if (session && session.user) {
        setUnlocked(true)
        setAdminUser(session.user)
        loadSubmissionsFromCloud().then(setSubmissions)
        loadJobsFromCloud().then(setJobs)
      } else if (event === 'SIGNED_OUT') {
        setUnlocked(false)
        setAdminUser(null)
      }
    })

    return () => {
      if (authListener?.subscription?.unsubscribe) {
        authListener.subscription.unsubscribe()
      }
    }
  }, [])

  // Listen to live storage mutations from any component
  useEffect(() => {
    const handleStorageUpdate = () => {
      setSubmissions(getSubmissions())
      setJobs(getJobs())
    }
    window.addEventListener('flo-storage-update', handleStorageUpdate)
    return () => window.removeEventListener('flo-storage-update', handleStorageUpdate)
  }, [])

  const handleUnlockWithSupabase = async (e) => {
    if (e) e.preventDefault()
    setAuthError('')
    setIsSubmittingAuth(true)
    try {
      const { data, error } = await signInAdmin(adminEmail, adminPassword)
      if (error) {
        setAuthError(error.message || 'Invalid admin credentials')
        setIsSubmittingAuth(false)
        return
      }
      if (data?.session) {
        setUnlocked(true)
        setAdminUser(data.session.user)
        const [cloudSubs, cloudJobs] = await Promise.all([
          loadSubmissionsFromCloud(),
          loadJobsFromCloud()
        ])
        setSubmissions(cloudSubs)
        setJobs(cloudJobs)
      }
    } catch (err) {
      setAuthError(err.message || 'Failed to authenticate')
    } finally {
      setIsSubmittingAuth(false)
    }
  }

  const handleUnlockWithPasscode = (e) => {
    if (e) e.preventDefault()
    if (checkPasscode(passcode)) {
      setUnlocked(true)
      setAuthError('')
      setSubmissions(getSubmissions())
      setJobs(getJobs())
      loadSubmissionsFromCloud().then(setSubmissions)
      loadJobsFromCloud().then(setJobs)
    } else {
      setAuthError('Incorrect passcode. Access restricted to authorized Flo Studios team members.')
    }
  }

  const handleLock = async () => {
    await signOutAdmin()
    logout()
    setUnlocked(false)
    setAdminUser(null)
    setPasscode('')
    setAdminPassword('')
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
    if (!jobFormTitle.trim()) return

    // Parse responsibilities
    const rawRespLines = jobFormResponsibilities.split('\n').filter((l) => l.trim().length > 0)
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

    const minimumQualifications = jobFormMinQuals.split('\n').map((l) => l.trim()).filter(Boolean)
    const preferredQualifications = jobFormPrefQuals.split('\n').map((l) => l.trim()).filter(Boolean)
    const aboutJob = jobFormAboutJob.split('\n\n').map((p) => p.trim()).filter(Boolean)
    const badges = jobFormBadges.split(',').map((b) => b.trim()).filter(Boolean)

    const jobPayload = {
      id: editingJobId || `job_${Date.now()}`,
      title: jobFormTitle.trim(),
      tabLabel: jobFormTitle.trim(),
      division: jobFormDivision,
      status: jobFormStatus,
      badges: badges.length > 0 ? badges : [jobFormDivision, 'Remote'],
      aboutJob: aboutJob.length > 0 ? aboutJob : [jobFormTitle.trim()],
      responsibilities,
      compensationLead: jobFormCompLead.trim(),
      minimumQualifications,
      preferredQualifications
    }

    const success = await saveJob(jobPayload)
    if (success) {
      setIsJobModalOpen(false)
      setJobs(getJobs())
      setCmsNotice(editingJobId ? '✓ Job updated in Supabase cloud' : '✓ New job created and published')
      setTimeout(() => setCmsNotice(''), 4000)
    }
  }

  const handleDeleteJob = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the job listing "${title}"? This will remove it from the database and Careers page.`)) {
      await deleteJob(id)
      setJobs(getJobs())
      setCmsNotice(`✓ Deleted job "${title}"`)
      setTimeout(() => setCmsNotice(''), 4000)
    }
  }

  const handleResetJobs = async () => {
    if (window.confirm('Reset job postings back to the verified default opening (Sales Development Representative)?')) {
      await resetJobs()
      setJobs(getJobs())
      setCmsNotice('✓ Restored default job listing')
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
  const totalCount = submissions.length
  const messageCount = submissions.filter((s) => s.type === 'message').length
  const jobCount = submissions.filter((s) => s.type === 'job').length
  const newCount = submissions.filter((s) => s.status === 'new').length
  const starredCount = submissions.filter((s) => s.starred).length
  const activeJobsCount = jobs.filter((j) => j.status === 'active').length

  /* ═══════════════════════════════════════════════════
     VIEW 1: AUTHENTICATION LOCK SCREEN
     ═══════════════════════════════════════════════════ */
  if (!unlocked) {
    return (
      <main className="admin-lock-page">
        <div className="admin-lock-card">
          <div className="admin-lock-badge">
            <span className="admin-lock-icon">🔒</span>
            <span>RESTRICTED STUDIO PORTAL</span>
          </div>

          <h1 className="admin-lock-title">Flo Studios Admin</h1>
          <p className="admin-lock-sub">
            {authMethod === 'supabase'
              ? 'Authenticate with your Supabase Admin account to access client leads, applications, and job management.'
              : 'Enter the studio authorization passcode to access the restricted administrative portal.'}
          </p>

          <div className="admin-auth-toggle-bar">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('passcode')
                setAuthError('')
              }}
              className={`admin-auth-toggle-pill ${authMethod === 'passcode' ? 'admin-auth-toggle-pill--active' : ''}`}
            >
              Studio Passcode
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod('supabase')
                setAuthError('')
              }}
              className={`admin-auth-toggle-pill ${authMethod === 'supabase' ? 'admin-auth-toggle-pill--active' : ''}`}
            >
              Supabase Admin
            </button>
          </div>

          {authMethod === 'supabase' ? (
            /* Supabase Auth Email/Password Form */
            <form onSubmit={handleUnlockWithSupabase} className="admin-lock-form">
              <div className="admin-lock-field">
                <label className="admin-lock-label">Admin Email</label>
                <input
                  type="email"
                  placeholder="admin@flostudios.com"
                  value={adminEmail}
                  onChange={(e) => {
                    setAdminEmail(e.target.value)
                    if (authError) setAuthError('')
                  }}
                  className="admin-lock-input admin-lock-input--left"
                  required
                  autoFocus
                />
              </div>

              <div className="admin-lock-field">
                <label className="admin-lock-label">Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value)
                    if (authError) setAuthError('')
                  }}
                  className="admin-lock-input admin-lock-input--left"
                  required
                />
              </div>

              <div className="admin-lock-buttons">
                <button type="submit" className="admin-lock-btn" disabled={isSubmittingAuth}>
                  {isSubmittingAuth ? 'Verifying Credentials...' : 'Sign In with Supabase →'}
                </button>
              </div>

              {authError && <p className="admin-lock-err-msg">{authError}</p>}
            </form>
          ) : (
            /* Studio Passcode Form */
            <form onSubmit={handleUnlockWithPasscode} className="admin-lock-form">
              <div className="admin-lock-field">
                <label className="admin-lock-label">Studio Passcode</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value)
                    if (authError) setAuthError('')
                  }}
                  className={`admin-lock-input ${authError ? 'admin-lock-input--error' : ''}`}
                  autoFocus
                  required
                />
              </div>

              <div className="admin-lock-buttons">
                <button type="submit" className="admin-lock-btn">
                  Unlock Studio Portal →
                </button>
              </div>

              {authError && <p className="admin-lock-err-msg">{authError}</p>}
            </form>
          )}

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
              }}
              className="admin-action-pill"
              title="Refresh latest data from Supabase Cloud"
            >
              🔄 Refresh Cloud
            </button>
            <button type="button" onClick={exportToCSV} className="admin-action-pill" title="Export as CSV">
              📥 Export CSV
            </button>
            <button type="button" onClick={exportToJSON} className="admin-action-pill" title="Export as JSON">
              📦 Export JSON
            </button>
            <button
              type="button"
              onClick={handleResetData}
              disabled={totalCount === 0}
              className="admin-action-pill admin-action-pill--danger"
              title="Clear all stored submissions"
            >
              🧹 Clear Data
            </button>
            <button
              type="button"
              onClick={handleLock}
              className="admin-action-pill admin-action-pill--subtle"
              title="Lock Admin Portal"
            >
              🔒 Sign Out {adminUser?.email ? `(${adminUser.email})` : ''}
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
              💼 Manage Jobs (CMS) <span className="admin-tab__count">{jobs.length}</span>
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
                  >
                    ✕
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
                <option value="reviewed">Reviewed</option>
                <option value="contacted">Contacted / In Progress</option>
                <option value="archived">Archived</option>
              </select>
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
                  onClick={handleResetJobs}
                  className="admin-action-pill admin-action-pill--subtle"
                  title="Reset positions to default SDR role"
                >
                  ↺ Reset Defaults
                </button>
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
              {jobs.map((job) => {
                const jobCandidateCount = submissions.filter(
                  (s) => s.type === 'job' && (s.jobId === job.id || s.role === job.title)
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
                      <span>👥 {jobCandidateCount} Applicant{jobCandidateCount === 1 ? '' : 's'}</span>
                      <span>📋 {(job.responsibilities || []).length} Responsibilities</span>
                    </div>

                    <div className="admin-job-card__actions">
                      <button
                        type="button"
                        onClick={() => handleOpenEditJob(job)}
                        className="admin-action-pill"
                      >
                        ✏️ Edit Job
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteJob(job.id, job.title)}
                        className="admin-action-pill admin-action-pill--danger"
                      >
                        🗑️ Delete
                      </button>
                      <Link
                        to="/careers"
                        target="_blank"
                        className="admin-action-pill admin-action-pill--subtle"
                      >
                        ↗ View Live
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
                <span className="admin-empty__icon">📭</span>
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
                        >
                          {item.starred ? '★' : '☆'}
                        </button>

                        <span
                          className={`admin-card__type-pill ${
                            item.type === 'job'
                              ? 'admin-card__type-pill--job'
                              : 'admin-card__type-pill--message'
                          }`}
                        >
                          {item.type === 'job' ? '💼 Job Application' : '✉️ Client Inquiry'}
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
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="contacted">Contacted</option>
                          <option value="archived">Archived</option>
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
                      {/* Secure Resume Download: Handles Private Supabase Storage & Local Base64 */}
                      {item.resumePath ? (
                        <button
                          type="button"
                          onClick={() => handleViewResume(item.resumePath, item.resumeName, item.id)}
                          className="admin-resume-download-btn"
                          title="Open private candidate resume from Supabase Storage"
                          disabled={resumeLoadingId === item.id}
                        >
                          <span aria-hidden="true">🔒</span>{' '}
                          {resumeLoadingId === item.id ? 'Generating Secure Link...' : `View Private Resume (${item.resumeName || 'Document'})`}
                        </button>
                      ) : item.resumeData ? (
                        <a
                          href={item.resumeData}
                          download={item.resumeName || `${item.name.replace(/\s+/g, '_')}_resume.pdf`}
                          className="admin-resume-download-btn"
                          title="Download submitted candidate document"
                        >
                          <span aria-hidden="true">📥</span> View / Download Resume (
                          {item.resumeName || 'Attachment'})
                        </a>
                      ) : item.resumeName ? (
                        <span className="admin-resume-warning" title="Document metadata saved">
                          📄 {item.resumeName}
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
                          ✉️ Reply
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.name)}
                          className="admin-card__action-btn admin-card__action-btn--delete"
                        >
                          🗑️ Delete
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
          <div className="admin-modal-backdrop" onClick={() => setIsJobModalOpen(false)}>
            <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3 className="admin-modal-title">
                  {editingJobId ? 'Edit Job Opening' : 'Add New Job Opening'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="admin-modal-close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveJob} className="admin-modal-form">
                <div className="admin-form-group">
                  <label className="admin-form-label">Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Product Designer"
                    value={jobFormTitle}
                    onChange={(e) => setJobFormTitle(e.target.value)}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Division</label>
                    <input
                      type="text"
                      placeholder="e.g. Development Division"
                      value={jobFormDivision}
                      onChange={(e) => setJobFormDivision(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Status</label>
                    <select
                      value={jobFormStatus}
                      onChange={(e) => setJobFormStatus(e.target.value)}
                      className="admin-form-select"
                    >
                      <option value="active">Active (Published on /careers)</option>
                      <option value="draft">Draft (Hidden)</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Badges (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Development Division, Full-Cycle, Remote, Contract"
                    value={jobFormBadges}
                    onChange={(e) => setJobFormBadges(e.target.value)}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Compensation Summary</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% commission-based contract position / Monthly Retainer"
                    value={jobFormCompLead}
                    onChange={(e) => setJobFormCompLead(e.target.value)}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">About the Job (Paragraphs separated by blank line)</label>
                  <textarea
                    rows={4}
                    placeholder="Describe role mission and focus..."
                    value={jobFormAboutJob}
                    onChange={(e) => setJobFormAboutJob(e.target.value)}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Responsibilities (One per line, 'Title: Description')</label>
                  <textarea
                    rows={5}
                    placeholder="Prospect List Development: Research and build targeted prospect list..."
                    value={jobFormResponsibilities}
                    onChange={(e) => setJobFormResponsibilities(e.target.value)}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Minimum Qualifications (One per line)</label>
                  <textarea
                    rows={4}
                    placeholder="2-3 years sales experience&#10;Based in North America or Europe"
                    value={jobFormMinQuals}
                    onChange={(e) => setJobFormMinQuals(e.target.value)}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Preferred Qualifications (One per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Agency experience&#10;CRM proficiency"
                    value={jobFormPrefQuals}
                    onChange={(e) => setJobFormPrefQuals(e.target.value)}
                    className="admin-form-textarea"
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
