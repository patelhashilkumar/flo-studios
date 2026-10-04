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
  logout
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
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'message' | 'job' | 'starred'
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Initialize auth check
  useEffect(() => {
    setUnlocked(isAuthenticated())
    setSubmissions(getSubmissions())
  }, [])

  // Listen to live storage mutations from any component
  useEffect(() => {
    const handleStorageUpdate = () => {
      setSubmissions(getSubmissions())
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

  // Filtered dataset
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
              />
              {authError && <span className="admin-lock-err-msg">Incorrect passcode. Please try again.</span>}
            </div>

            <div className="admin-lock-buttons">
              <button type="submit" className="admin-lock-btn">
                Unlock Dashboard →
              </button>
            </div>
          </form>

          <div className="admin-lock-footer">
            <Link to="/" className="admin-lock-back">← Back to Flo Studios site</Link>
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

        {/* KPI Metrics Summary */}
        <section className="admin-kpis">
          <div className="admin-kpi-card">
            <span className="admin-kpi-card__label">Total Inquiries</span>
            <span className="admin-kpi-card__value">{totalCount}</span>
            <span className="admin-kpi-card__meta">Across all channels</span>
          </div>
          <div className="admin-kpi-card">
            <span className="admin-kpi-card__label">Client Messages</span>
            <span className="admin-kpi-card__value">{messageCount}</span>
            <span className="admin-kpi-card__meta">Project commissions</span>
          </div>
          <div className="admin-kpi-card">
            <span className="admin-kpi-card__label">Job Applications</span>
            <span className="admin-kpi-card__value">{jobCount}</span>
            <span className="admin-kpi-card__meta">Talent & reels</span>
          </div>
          <div className="admin-kpi-card admin-kpi-card--accent">
            <span className="admin-kpi-card__label">Needs Review</span>
            <span className="admin-kpi-card__value">{newCount}</span>
            <span className="admin-kpi-card__meta">New unhandled items</span>
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
          </div>

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
        </section>

        {/* Submissions Feed */}
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
                        title={item.starred ? 'Unstar' : 'Star as priority'}
                      >
                        ★
                      </button>

                      <span
                        className={`admin-type-pill ${
                          item.type === 'job' ? 'admin-type-pill--job' : 'admin-type-pill--message'
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
                        <span className="admin-card__region-badge"><span aria-hidden="true">📍</span> {item.region}</span>
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
                        download={item.resumeName || 'Resume.pdf'}
                        className="admin-btn admin-btn--resume"
                      >
                        <span aria-hidden="true">📄</span> View / Download Resume ({item.resumeName || 'Resume.pdf'})
                      </a>
                    )}

                    {!item.resumeData && item.resumeName && (
                      <span
                        tabIndex={0}
                        className="admin-badge admin-badge--warning"
                        title={item.resumeNote || 'Resume file exceeded local browser storage limit'}
                        aria-label={`Resume attached: ${item.resumeName}. Local browser storage limit reached.`}
                      >
                        <span aria-hidden="true">⚠️</span> {item.resumeName} (File quota exceeded)
                      </span>
                    )}

                    <a
                      href={`mailto:${encodeURIComponent((item.email || '').trim())}?subject=${encodeURIComponent(
                        item.type === 'job'
                          ? `Flo Studios · Regarding your application for ${item.role}`
                          : `Flo Studios · Regarding your ${item.service} inquiry`
                      )}`}
                      className="admin-btn admin-btn--reply"
                    >
                      <span aria-hidden="true">✉️</span> Reply via Email
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.name)}
                      className="admin-btn admin-btn--delete"
                      title="Delete record"
                    >
                      <span aria-hidden="true">🗑️</span> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
