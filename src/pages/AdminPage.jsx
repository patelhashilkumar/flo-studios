import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  getSubmissions,
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
  saveJob,
  deleteJob,
  resetJobs
} from '../services/adminStorage'
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
  const [passcode, setPasscode] = useState('')
  const [authError, setAuthError] = useState(false)

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
    setUnlocked(isAuthenticated())
    setSubmissions(getSubmissions())
    setJobs(getJobs())
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

  const handleUnlock = (e) => {
    if (e) e.preventDefault()
    if (checkPasscode(passcode)) {
      setUnlocked(true)
      setAuthError(false)
      setSubmissions(getSubmissions())
      setJobs(getJobs())
    } else {
      setAuthError(true)
    }
  }

  const handleLock = () => {
    logout()
    setUnlocked(false)
    setPasscode('')
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

  const handleSaveJob = (e) => {
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

    const success = saveJob(jobPayload)
    if (success) {
      setIsJobModalOpen(false)
      setJobs(getJobs())
      setCmsNotice(editingJobId ? '✓ Job updated successfully' : '✓ New job created and published')
      setTimeout(() => setCmsNotice(''), 4000)
    }
  }

  const handleDeleteJob = (id, title) => {
    if (window.confirm(`Are you sure you want to delete the job listing "${title}"? This will remove it from the Careers page.`)) {
      deleteJob(id)
      setJobs(getJobs())
      setCmsNotice(`✓ Deleted job "${title}"`)
      setTimeout(() => setCmsNotice(''), 4000)
    }
  }

  const handleResetJobs = () => {
    if (window.confirm('Reset job postings back to the verified default opening (Sales Development Representative)?')) {
      resetJobs()
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
     VIEW 1: PASSCODE LOCK SCREEN
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
            Please enter your studio passcode to access client inquiries, talent applications, and exports.
          </p>

          <form onSubmit={handleUnlock} className="admin-lock-form">
            <div className="admin-lock-input-wrap">
              <input
                type="password"
                placeholder="Enter studio passcode"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value)
                  if (authError) setAuthError(false)
                }}
                className={`admin-lock-input ${authError ? 'admin-lock-input--error' : ''}`}
                autoFocus
                required
              />
              <button type="submit" className="admin-lock-submit">
                Unlock →
              </button>
            </div>

            {authError && (
              <p className="admin-lock-error">
                Incorrect passcode. Access restricted to authorized Flo Studios team members.
              </p>
            )}
          </form>
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
            <span className="admin-header__status">● LIVE LOCAL SYNC</span>
          </div>

          <div className="admin-header__actions">
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
              className="admin-action-pill admin-action-pill--subtle"
              title={totalCount === 0 ? 'No submissions to clear' : 'Clear all submissions'}
            >
              <span aria-hidden="true">🗑️</span> Clear Submissions
            </button>
            <button type="button" onClick={handleLock} className="admin-action-pill admin-action-pill--danger">
              🔒 Lock
            </button>
          </div>
        </header>

        {/* CMS Notification Banner */}
        {cmsNotice && (
          <div className="admin-alert-banner" role="status">
            {cmsNotice}
          </div>
        )}

        {/* KPI Metrics Summary */}
        <section className="admin-kpis">
          <div className="admin-kpi-card" onClick={() => setActiveTab('all')} style={{ cursor: 'pointer' }}>
            <span className="admin-kpi-card__label">Total Inquiries</span>
            <span className="admin-kpi-card__value">{totalCount}</span>
            <span className="admin-kpi-card__meta">Across all channels</span>
          </div>
          <div className="admin-kpi-card" onClick={() => setActiveTab('message')} style={{ cursor: 'pointer' }}>
            <span className="admin-kpi-card__label">Client Messages</span>
            <span className="admin-kpi-card__value">{messageCount}</span>
            <span className="admin-kpi-card__meta">Project commissions</span>
          </div>
          <div className="admin-kpi-card" onClick={() => setActiveTab('job')} style={{ cursor: 'pointer' }}>
            <span className="admin-kpi-card__label">Job Applications</span>
            <span className="admin-kpi-card__value">{jobCount}</span>
            <span className="admin-kpi-card__meta">Talent & resumes</span>
          </div>
          <div className="admin-kpi-card admin-kpi-card--accent" onClick={() => setActiveTab('cms')} style={{ cursor: 'pointer' }}>
            <span className="admin-kpi-card__label">Job Openings (CMS)</span>
            <span className="admin-kpi-card__value">{activeJobsCount} Active</span>
            <span className="admin-kpi-card__meta">Manage listings →</span>
          </div>
        </section>

        {/* Navigation Tabs & Search Controls */}
        <section className="admin-controls">
          <div className="admin-tabs" role="tablist">
            <button
              type="button"
              className={`admin-tab ${activeTab === 'all' ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Inquiries ({totalCount})
            </button>
            <button
              type="button"
              className={`admin-tab ${activeTab === 'message' ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab('message')}
            >
              Client Messages ({messageCount})
            </button>
            <button
              type="button"
              className={`admin-tab ${activeTab === 'job' ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab('job')}
            >
              Job Applications ({jobCount})
            </button>
            <button
              type="button"
              className={`admin-tab ${activeTab === 'starred' ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab('starred')}
            >
              ★ Starred ({starredCount})
            </button>
            <button
              type="button"
              className={`admin-tab admin-tab--cms ${activeTab === 'cms' ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab('cms')}
            >
              💼 Manage Jobs ({jobs.length})
            </button>
          </div>

          {activeTab !== 'cms' && (
            <div className="admin-search-wrap">
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search by name, email, role, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <select
                className="admin-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="in-review">In Review / Reviewing</option>
                <option value="interview">Interview Scheduled</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          )}
        </section>

        {/* ── VIEW A: JOB MANAGEMENT CMS ── */}
        {activeTab === 'cms' ? (
          <section className="admin-cms-section">
            <div className="admin-cms-header">
              <div className="admin-cms-header__meta">
                <h2 className="admin-cms-title">Careers Job Openings</h2>
                <p className="admin-cms-subtitle">
                  Create, edit, or remove job listings published to <code>/careers</code> in real-time.
                </p>
              </div>
              <div className="admin-cms-header__actions">
                <button
                  type="button"
                  onClick={handleResetJobs}
                  className="admin-action-pill admin-action-pill--subtle"
                  title="Reset to 2 default openings"
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

            <div className="admin-cms-grid">
              {jobs.map((job) => {
                const applicantCount = submissions.filter(
                  (s) => s.type === 'job' && s.role?.toLowerCase() === job.title?.toLowerCase()
                ).length

                return (
                  <div key={job.id} className="admin-cms-card">
                    <div className="admin-cms-card__top">
                      <div className="admin-cms-card__badge-row">
                        <span className="admin-cms-card__num">{job.tabNumber}</span>
                        <span className="admin-service-pill">{job.division}</span>
                        <span
                          className={`admin-cms-status-badge ${
                            job.status === 'active' ? 'admin-cms-status-badge--active' : ''
                          }`}
                        >
                          ● {job.status === 'active' ? 'Active' : 'Draft'}
                        </span>
                      </div>
                      <span className="admin-cms-card__applicant-count">
                        👥 {applicantCount} applicant{applicantCount === 1 ? '' : 's'}
                      </span>
                    </div>

                    <h3 className="admin-cms-card__title">{job.title}</h3>
                    {job.compensationLead && (
                      <p className="admin-cms-card__comp">{job.compensationLead}</p>
                    )}

                    <div className="admin-cms-card__tags">
                      {(job.badges || []).map((badge, idx) => (
                        <span key={idx} className="admin-card__region-badge">
                          {badge}
                        </span>
                      ))}
                    </div>

                    <div className="admin-cms-card__actions">
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
                          className={`admin-type-badge ${
                            item.type === 'job' ? 'admin-type-badge--job' : 'admin-type-badge--message'
                          }`}
                        >
                          {item.type === 'job' ? 'JOB APPLICATION' : 'CLIENT INQUIRY'}
                        </span>

                        <span className="admin-service-pill">
                          {item.type === 'job' ? item.role : item.service}
                        </span>
                      </div>

                      <div className="admin-card__top-right">
                        <span className="admin-card__time">
                          {new Date(item.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>

                        {/* Status Selector */}
                        <select
                          className={`admin-status-badge admin-status-badge--${item.status}`}
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        >
                          <option value="new">● New</option>
                          <option value="in-review">● In Review</option>
                          <option value="interview">● Interview</option>
                          <option value="replied">● Replied</option>
                          <option value="archived">● Archived</option>
                        </select>
                      </div>
                    </div>

                    {/* Candidate / Client Details */}
                    <div className="admin-card__body">
                      <div className="admin-card__info-row">
                        <h3 className="admin-card__name">{item.name}</h3>
                        <a href={`mailto:${item.email}`} className="admin-card__contact-link">
                          {item.email}
                        </a>
                        {item.phone && <span className="admin-card__phone">{item.phone}</span>}
                        {item.region && (
                          <span className="admin-card__region-badge">
                            <span aria-hidden="true">📍</span> {item.region}
                          </span>
                        )}
                        {item.experience && (
                          <span className="admin-card__exp-badge">Exp: {item.experience}</span>
                        )}
                      </div>

                      {/* Portfolio Link if Job Application */}
                      {item.portfolioUrl && (
                        <div className="admin-card__portfolio">
                          <span className="admin-card__portfolio-label">Portfolio / Showreel:</span>
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
                      {item.resumeData && (
                        <a
                          href={item.resumeData}
                          download={item.resumeName || `${item.name.replace(/\s+/g, '_')}_resume.pdf`}
                          className="admin-resume-download-btn"
                          title="Download submitted candidate document"
                        >
                          <span aria-hidden="true">📥</span> View / Download Resume (
                          {item.resumeName || 'Attachment'})
                        </a>
                      )}

                      {item.resumeName && !item.resumeData && (
                        <span className="admin-resume-warning" title="Document metadata saved, base64 payload omitted to save storage">
                          ⚠️ {item.resumeName} (File quota exceeded)
                        </span>
                      )}

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
                  className="admin-modal-close"
                  onClick={() => setIsJobModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveJob} className="admin-modal-form">
                <div className="admin-modal-row">
                  <div className="admin-modal-group">
                    <label className="admin-modal-label">Job Title *</label>
                    <input
                      type="text"
                      className="admin-modal-input"
                      value={jobFormTitle}
                      onChange={(e) => setJobFormTitle(e.target.value)}
                      placeholder="e.g. Sales Development Representative"
                      required
                    />
                  </div>
                  <div className="admin-modal-group">
                    <label className="admin-modal-label">Division *</label>
                    <select
                      className="admin-modal-select"
                      value={jobFormDivision}
                      onChange={(e) => setJobFormDivision(e.target.value)}
                    >
                      <option value="Development Division">Development Division</option>
                      <option value="Creator Division">Creator Division</option>
                      <option value="Executive / Operations">Executive / Operations</option>
                    </select>
                  </div>
                </div>

                <div className="admin-modal-row">
                  <div className="admin-modal-group">
                    <label className="admin-modal-label">Status</label>
                    <select
                      className="admin-modal-select"
                      value={jobFormStatus}
                      onChange={(e) => setJobFormStatus(e.target.value)}
                    >
                      <option value="active">Active (Visible on Careers)</option>
                      <option value="draft">Draft (Hidden)</option>
                    </select>
                  </div>
                  <div className="admin-modal-group">
                    <label className="admin-modal-label">Meta Badges (comma separated)</label>
                    <input
                      type="text"
                      className="admin-modal-input"
                      value={jobFormBadges}
                      onChange={(e) => setJobFormBadges(e.target.value)}
                      placeholder="e.g. Development Division, Remote, Full-Cycle"
                    />
                  </div>
                </div>

                <div className="admin-modal-group">
                  <label className="admin-modal-label">Compensation Headline</label>
                  <input
                    type="text"
                    className="admin-modal-input"
                    value={jobFormCompLead}
                    onChange={(e) => setJobFormCompLead(e.target.value)}
                    placeholder="e.g. 100% commission-based contract position, with no cap on earnings."
                  />
                </div>

                <div className="admin-modal-group">
                  <label className="admin-modal-label">About the Job (Paragraphs)</label>
                  <textarea
                    className="admin-modal-textarea"
                    rows={3}
                    value={jobFormAboutJob}
                    onChange={(e) => setJobFormAboutJob(e.target.value)}
                    placeholder="Overview of the role responsibilities and mission..."
                  />
                </div>

                <div className="admin-modal-group">
                  <label className="admin-modal-label">
                    Responsibilities (One per line, formatted as <code>Title: Description</code>)
                  </label>
                  <textarea
                    className="admin-modal-textarea"
                    rows={4}
                    value={jobFormResponsibilities}
                    onChange={(e) => setJobFormResponsibilities(e.target.value)}
                    placeholder="Prospect List Development: Research and build targeted prospect lists..."
                  />
                </div>

                <div className="admin-modal-row">
                  <div className="admin-modal-group">
                    <label className="admin-modal-label">Minimum Qualifications (One per line)</label>
                    <textarea
                      className="admin-modal-textarea"
                      rows={3}
                      value={jobFormMinQuals}
                      onChange={(e) => setJobFormMinQuals(e.target.value)}
                      placeholder="2-3 years sales experience&#10;Tech industry background"
                    />
                  </div>
                  <div className="admin-modal-group">
                    <label className="admin-modal-label">Preferred Qualifications (One per line)</label>
                    <textarea
                      className="admin-modal-textarea"
                      rows={3}
                      value={jobFormPrefQuals}
                      onChange={(e) => setJobFormPrefQuals(e.target.value)}
                      placeholder="Experience in software agency&#10;Consultative sales track record"
                    />
                  </div>
                </div>

                <div className="admin-modal-actions">
                  <button
                    type="button"
                    className="admin-action-pill"
                    onClick={() => setIsJobModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-action-pill admin-action-pill--primary">
                    {editingJobId ? 'Save Changes' : 'Publish Job Opening'}
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
