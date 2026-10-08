import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { getJobs, saveSubmission } from '../services/adminStorage'
import './CareersPage.css'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

const DEFAULT_REGION_OPTIONS = [
  { value: '', label: 'Select Region' },
  { value: 'North America', label: 'North America' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Other region / Global Remote', label: 'Other region / Global Remote' }
]

const DEFAULT_EXPERIENCE_OPTIONS = [
  { value: '', label: 'Select Experience Level' },
  { value: 'Meets qualification', label: 'Meets qualification requirements' },
  { value: 'Senior / Lead', label: 'Senior / Lead level' }
]

export default function CareersPage() {
  const [allJobs, setAllJobs] = useState(() => getJobs())

  // Listen to live storage mutations from Admin CMS
  useEffect(() => {
    const handleStorageUpdate = () => {
      setAllJobs(getJobs())
    }
    window.addEventListener('flo-storage-update', handleStorageUpdate)
    return () => window.removeEventListener('flo-storage-update', handleStorageUpdate)
  }, [])

  // Filter to active jobs only (fallback to all if none marked active)
  const activeJobs = allJobs.filter((j) => j.status === 'active')
  const availableJobs = activeJobs.length > 0 ? activeJobs : allJobs

  const [activeJobId, setActiveJobId] = useState(() => availableJobs[0]?.id || 'sdr')

  // Find currently active job or fallback to first
  const activeJob = availableJobs.find((j) => j.id === activeJobId) || availableJobs[0] || {}

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [region, setRegion] = useState('')
  const [experience, setExperience] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [resumeName, setResumeName] = useState('')
  const [resumeSize, setResumeSize] = useState('')
  const [resumeType, setResumeType] = useState('')
  const [resumeData, setResumeData] = useState('')
  const [isReadingFile, setIsReadingFile] = useState(false)
  const [termsConfirmed, setTermsConfirmed] = useState(false)
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success'
  const [errorMessage, setErrorMessage] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [honeypot, setHoneypot] = useState('')

  const heroRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.careers-header__title-word',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'power3.out', delay: 0.1 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [activeJob?.id])

  const handleRoleChange = (newJobId) => {
    if (newJobId === activeJob?.id) return
    setActiveJobId(newJobId)
    setStatus('idle')
    setErrorMessage('')
    setRegion('')
    setExperience('')
    setResumeName('')
    setResumeSize('')
    setResumeType('')
    setResumeData('')
    setTermsConfirmed(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleApplyScroll = (e) => {
    e.preventDefault()
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
  }

  const handleProcessFile = (file) => {
    if (!file) return
    setErrorMessage('')
    if (status === 'success') {
      setStatus('idle')
    }

    // Validate non-empty file
    if (file.size === 0) {
      setErrorMessage('Uploaded file is empty. Please select a valid document.')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    // Validate size: 5MB max (5 * 1024 * 1024)
    const maxBytes = 5 * 1024 * 1024
    if (file.size > maxBytes) {
      setErrorMessage('Resume file exceeds 5MB limit. Please upload a file under 5MB.')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    // Validate extension (.pdf, .doc, .docx)
    const validExtensions = ['.pdf', '.doc', '.docx']
    const lowerName = file.name.toLowerCase()
    const isValidExtension = validExtensions.some((ext) => lowerName.endsWith(ext))
    if (!isValidExtension) {
      setErrorMessage('Invalid file format. Please upload a PDF, DOC, or DOCX document.')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    // Validate MIME type if reported by browser
    const validMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/octet-stream'
    ]
    if (file.type && !validMimeTypes.includes(file.type)) {
      setErrorMessage('Invalid document type. Please upload a PDF, DOC, or DOCX document.')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    setIsReadingFile(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      setResumeName(file.name)
      setResumeSize(formatFileSize(file.size))
      setResumeType(file.type || 'application/pdf')
      setResumeData(e.target?.result || '')
      setIsReadingFile(false)
    }
    reader.onerror = () => {
      setResumeName('')
      setResumeSize('')
      setResumeType('')
      setResumeData('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setIsReadingFile(false)
      setErrorMessage('Failed to read file. Please try another file.')
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleProcessFile(file)
    }
  }

  const handleClearResume = (e) => {
    if (e) e.stopPropagation()
    if (status === 'success') {
      setStatus('idle')
    }
    setResumeName('')
    setResumeSize('')
    setResumeType('')
    setResumeData('')
    setIsReadingFile(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleProcessFile(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    // Honeypot check
    if (honeypot && honeypot.trim() !== '') {
      setStatus('success')
      return
    }

    // Required Field Validations
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    if (!region) {
      setErrorMessage('Please select your location / region.')
      return
    }

    if (!experience) {
      setErrorMessage('Please select your experience level.')
      return
    }

    // URL validation for LinkedIn
    let cleanLinkedinUrl = linkedinUrl.trim()
    if (cleanLinkedinUrl) {
      try {
        const parsed = new URL(cleanLinkedinUrl)
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          setErrorMessage('Please enter a valid LinkedIn URL starting with http:// or https://')
          return
        }
      } catch {
        setErrorMessage('Please enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/username)')
        return
      }
    }

    // Mandatory Resume Validation
    if (!resumeData && !resumeName) {
      setErrorMessage('Resume upload is mandatory. Please upload a PDF, DOC, or DOCX document.')
      return
    }

    if (isReadingFile) {
      setErrorMessage('Your resume is still being processed. Please wait a moment and submit again.')
      return
    }

    if (!notes.trim()) {
      setErrorMessage('Please provide a brief summary of your background and experience.')
      return
    }

    if (!termsConfirmed) {
      setErrorMessage('You must confirm that all details and credentials provided are accurate and truthful.')
      return
    }

    setStatus('submitting')

    try {
      const saved = saveSubmission({
        type: 'job',
        role: activeJob.title,
        division: activeJob.division || 'Development Division',
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        region,
        experience,
        portfolioUrl: cleanLinkedinUrl,
        resumeName,
        resumeSize,
        resumeType,
        resumeData,
        coverNote: notes.trim(),
        termsConfirmed: true
      })

      if (!saved) {
        setErrorMessage('Unable to save application to storage. Please try again or reach out to us directly.')
        setStatus('idle')
        return
      }

      setStatus('success')
      setName('')
      setEmail('')
      setPhone('')
      setRegion('')
      setExperience('')
      setLinkedinUrl('')
      setNotes('')
      setResumeName('')
      setResumeSize('')
      setResumeType('')
      setResumeData('')
      setTermsConfirmed(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      console.error('Failed to submit application:', err)
      setErrorMessage('An unexpected error occurred while submitting. Please try again.')
      setStatus('idle')
    }
  }

  const regionOptions = activeJob.formConfig?.regionOptions || DEFAULT_REGION_OPTIONS
  const experienceOptions = activeJob.formConfig?.experienceOptions || DEFAULT_EXPERIENCE_OPTIONS
  const experienceLabel = activeJob.formConfig?.experienceLabel || 'Experience Level *'

  return (
    <motion.main
      className="careers-page"
      variants={pageV}
      initial="initial"
      animate="animate"
      exit="exit"
      ref={heroRef}
    >
      <div className="container careers-container">
        {/* ── Top Bar: Breadcrumb & Role Switcher ── */}
        <div className="careers-top-bar">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Careers</span>
          </div>

          <div className="careers-role-nav" role="tablist" aria-label="Open Positions">
            {availableJobs.map((job) => {
              const isActive = job.id === activeJob.id
              return (
                <button
                  key={job.id}
                  type="button"
                  role="tab"
                  id={`tab-${job.id}`}
                  aria-selected={isActive}
                  className={`careers-role-tab ${isActive ? 'careers-role-tab--active' : ''}`}
                  onClick={() => handleRoleChange(job.id)}
                >
                  <span className="careers-role-tab__index">{job.tabNumber}</span>
                  <span className="careers-role-tab__label">{job.tabLabel || job.title}</span>
                  <span className="careers-role-tab__badge">
                    {isActive ? 'Active Opening' : 'Select Role'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Header ── */}
        <header className="careers-header">
          <h1 className="careers-header__title" aria-label={activeJob.title || 'Career Opening'}>
            {(activeJob.title || 'Career Opening').split(' ').map((word, idx) => (
              <span key={idx} className="careers-header__title-word">
                {word}{' '}
              </span>
            ))}
          </h1>

          <div className="careers-meta-badges">
            {(activeJob.badges || []).map((badge, idx) => (
              <span key={idx} className="careers-meta-badge">
                {badge}
              </span>
            ))}
          </div>

          <a href="#application-form" onClick={handleApplyScroll} className="page-cta-btn careers-header__cta">
            Apply for this role ↓
          </a>
        </header>

        {/* ── Full-Width Editorial Body ── */}
        <article className="careers-editorial">
          {/* Section: About Flo Studios */}
          <section className="careers-editorial__section">
            <h2 className="careers-editorial__title">About Flo Studios</h2>
            <div className="careers-editorial__prose">
              <p>{activeJob.aboutCompany}</p>
            </div>
          </section>

          {/* Section: About the Job */}
          <section className="careers-editorial__section">
            <h2 className="careers-editorial__title">About the Job</h2>
            <div className="careers-editorial__prose">
              {(activeJob.aboutJob || []).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Section: Responsibilities */}
          {(activeJob.responsibilities || []).length > 0 && (
            <section className="careers-editorial__section">
              <h2 className="careers-editorial__title">Responsibilities</h2>
              <div className="careers-responsibilities-list">
                {activeJob.responsibilities.map((item, idx) => (
                  <div key={item.num || idx} className="careers-responsibility-card">
                    <div className="careers-responsibility-card__index">{item.num || String(idx + 1).padStart(2, '0')}</div>
                    <div className="careers-responsibility-card__content">
                      <h3 className="careers-responsibility-card__title">{item.title}</h3>
                      <p className="careers-responsibility-card__desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Compensation */}
          {(activeJob.compensationLead || (activeJob.compensationItems || []).length > 0) && (
            <section className="careers-editorial__section">
              <h2 className="careers-editorial__title">Compensation</h2>
              {activeJob.compensationLead && (
                <div className="careers-editorial__prose">
                  <p className="careers-lead-highlight">{activeJob.compensationLead}</p>
                </div>
              )}
              {(activeJob.compensationItems || []).length > 0 && (
                <div className="careers-compensation-grid">
                  {activeJob.compensationItems.map((item, idx) => (
                    <div key={idx} className="careers-info-box">
                      <span className="careers-info-box__label">{item.label}</span>
                      <p className="careers-info-box__text">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeJob.compensationTerms && (
                <p className="careers-compensation-terms">{activeJob.compensationTerms}</p>
              )}
            </section>
          )}

          {/* Section: Qualifications Split */}
          {((activeJob.minimumQualifications || []).length > 0 || (activeJob.preferredQualifications || []).length > 0) && (
            <div className="careers-editorial__grid-pair">
              {/* Minimum Qualifications */}
              {(activeJob.minimumQualifications || []).length > 0 && (
                <section className="careers-editorial__section careers-editorial__section--boxed">
                  <h2 className="careers-editorial__title">Minimum Qualifications</h2>
                  <ul className="careers-checklist">
                    {activeJob.minimumQualifications.map((item, idx) => (
                      <li key={idx} className="careers-checklist__item">
                        <span className="careers-checklist__bullet" aria-hidden="true">—</span>
                        <span className="careers-checklist__text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Preferred Qualifications */}
              {(activeJob.preferredQualifications || []).length > 0 && (
                <section className="careers-editorial__section careers-editorial__section--boxed">
                  <h2 className="careers-editorial__title">Preferred Qualifications</h2>
                  <ul className="careers-checklist">
                    {activeJob.preferredQualifications.map((item, idx) => (
                      <li key={idx} className="careers-checklist__item">
                        <span className="careers-checklist__bullet" aria-hidden="true">—</span>
                        <span className="careers-checklist__text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}

          {/* Section: What Success Looks Like */}
          {activeJob.whatSuccessLooksLike && (
            <section className="careers-editorial__section">
              <h2 className="careers-editorial__title">What Success Looks Like</h2>
              <div className="careers-editorial__prose">
                <p>{activeJob.whatSuccessLooksLike}</p>
              </div>
            </section>
          )}

          {/* Section: You Might Thrive in this Role */}
          {(activeJob.thrivePoints || []).length > 0 && (
            <section className="careers-editorial__section">
              <h2 className="careers-editorial__title">You Might Thrive in this Role</h2>
              <ul className="careers-checklist">
                {activeJob.thrivePoints.map((item, idx) => (
                  <li key={idx} className="careers-checklist__item">
                    <span className="careers-checklist__bullet" aria-hidden="true">—</span>
                    <span className="careers-checklist__text">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Section: Flo Studios' Mission & Diversity */}
          {activeJob.companyMission && (
            <section className="careers-editorial__section">
              <h2 className="careers-editorial__title">Flo Studios' Mission & Diversity</h2>
              <div className="careers-editorial__prose">
                <p>{activeJob.companyMission}</p>
              </div>
            </section>
          )}

          {/* Section: Equal Opportunity Employer */}
          {activeJob.equalOpportunity && (
            <section className="careers-editorial__section">
              <h2 className="careers-editorial__title">Equal Opportunity Employer</h2>
              <div className="careers-editorial__prose">
                <p>{activeJob.equalOpportunity}</p>
              </div>
            </section>
          )}
        </article>

        {/* ── 3. Application Form ── */}
        <section className="careers-form-section" id="application-form">
          <div className="careers-form-card">
            <div className="careers-form-card__header">
              <span className="careers-form-card__badge">Apply for this Role</span>
              <h2 className="careers-form-card__title">{activeJob.title}</h2>
            </div>

            <form className="careers-form" onSubmit={handleSubmit} noValidate>
              {/* Anti-Bot Honeypot */}
              <div className="sr-only" aria-hidden="true" style={{ display: 'none' }}>
                <label htmlFor="careers_org_url">Do not fill this field</label>
                <input
                  id="careers_org_url"
                  type="text"
                  name="careers_org_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Row 1: Name & Email */}
              <div className="careers-form__row">
                <div className="careers-form__group">
                  <label htmlFor="careers-name" className="careers-form__label">
                    Full Name *
                  </label>
                  <input
                    id="careers-name"
                    type="text"
                    className="careers-form__input"
                    value={name}
                    onChange={(e) => {
                      if (status === 'success') setStatus('idle')
                      setName(e.target.value)
                    }}
                    required
                  />
                </div>
                <div className="careers-form__group">
                  <label htmlFor="careers-email" className="careers-form__label">
                    Email Address *
                  </label>
                  <input
                    id="careers-email"
                    type="email"
                    className="careers-form__input"
                    value={email}
                    onChange={(e) => {
                      if (status === 'success') setStatus('idle')
                      setEmail(e.target.value)
                    }}
                    required
                  />
                </div>
              </div>

              {/* Row 2: Phone & LinkedIn */}
              <div className="careers-form__row">
                <div className="careers-form__group">
                  <label htmlFor="careers-phone" className="careers-form__label">
                    Phone Number
                  </label>
                  <input
                    id="careers-phone"
                    type="tel"
                    className="careers-form__input"
                    value={phone}
                    onChange={(e) => {
                      if (status === 'success') setStatus('idle')
                      setPhone(e.target.value)
                    }}
                  />
                </div>
                <div className="careers-form__group">
                  <label htmlFor="careers-linkedin" className="careers-form__label">
                    LinkedIn / Profile URL
                  </label>
                  <input
                    id="careers-linkedin"
                    type="url"
                    className="careers-form__input"
                    value={linkedinUrl}
                    onChange={(e) => {
                      if (status === 'success') setStatus('idle')
                      setLinkedinUrl(e.target.value)
                    }}
                  />
                </div>
              </div>

              {/* Row 3: Location / Region & Experience */}
              <div className="careers-form__row">
                <div className="careers-form__group">
                  <label htmlFor="careers-region" className="careers-form__label">
                    Location / Region *
                  </label>
                  <select
                    id="careers-region"
                    className="careers-form__select"
                    value={region}
                    onChange={(e) => {
                      if (status === 'success') setStatus('idle')
                      setRegion(e.target.value)
                    }}
                    required
                  >
                    {regionOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="careers-form__group">
                  <label htmlFor="careers-experience" className="careers-form__label">
                    {experienceLabel}
                  </label>
                  <select
                    id="careers-experience"
                    className="careers-form__select"
                    value={experience}
                    onChange={(e) => {
                      if (status === 'success') setStatus('idle')
                      setExperience(e.target.value)
                    }}
                    required
                  >
                    {experienceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Resume Upload */}
              <div className="careers-form__group">
                <label htmlFor="careers-resume" className="careers-form__label">
                  Resume (PDF, DOC, DOCX - Max 5MB) *
                </label>
                <input
                  type="file"
                  id="careers-resume"
                  ref={fileInputRef}
                  className="sr-only careers-file-input-sr"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />

                <div
                  className={`careers-file-dropzone ${isDragging ? 'careers-file-dropzone--dragging' : ''} ${
                    resumeName ? 'careers-file-dropzone--has-file' : ''
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      fileInputRef.current?.click()
                    }
                  }}
                  aria-label="Upload resume file dropzone"
                >
                  {resumeName ? (
                    <div className="careers-file-card">
                      <div className="careers-file-card__icon" aria-hidden="true">
                        📄
                      </div>
                      <div className="careers-file-card__info">
                        <span className="careers-file-card__name">{resumeName}</span>
                        <span className="careers-file-card__meta">
                          {resumeSize} • {resumeType || 'Document'}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="careers-file-card__remove"
                        onClick={handleClearResume}
                        title="Remove file"
                        aria-label="Remove uploaded resume"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="careers-file-placeholder">
                      <span className="careers-file-placeholder__icon" aria-hidden="true">
                        📎
                      </span>
                      <span className="careers-file-placeholder__text">
                        {isReadingFile ? (
                          'Reading document…'
                        ) : (
                          <>
                            <strong>Click to upload resume</strong> or drag and drop
                          </>
                        )}
                      </span>
                      <span className="careers-file-placeholder__hint">
                        PDF, DOC, DOCX (Max 5MB)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 5: Background & Notes */}
              <div className="careers-form__group">
                <label htmlFor="careers-notes" className="careers-form__label">
                  Background Summary & Experience *
                </label>
                <textarea
                  id="careers-notes"
                  className="careers-form__textarea"
                  rows={5}
                  value={notes}
                  onChange={(e) => {
                    if (status === 'success') setStatus('idle')
                    setNotes(e.target.value)
                  }}
                  required
                />
              </div>

              {/* Row 6: Mandatory Certification Checkbox */}
              <div className="careers-form__checkbox-wrap">
                <input
                  id="careers-terms"
                  type="checkbox"
                  className="careers-form__checkbox"
                  checked={termsConfirmed}
                  onChange={(e) => {
                    if (status === 'success') setStatus('idle')
                    setTermsConfirmed(e.target.checked)
                  }}
                  required
                />
                <label htmlFor="careers-terms" className="careers-form__checkbox-label">
                  {activeJob.legalDisclaimer ||
                    'By applying for this role, you confirm that all information and details provided to Flo Studios are accurate and truthful, and that all certifications and credentials submitted belong to you.'}
                </label>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="careers-form__alert careers-form__alert--error" role="alert">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'submitting' || status === 'success' || isReadingFile}
                className={`careers-submit-btn ${status === 'success' ? 'careers-submit-btn--success' : ''}`}
                whileTap={{ scale: 0.99 }}
              >
                {status === 'submitting'
                  ? 'Submitting Application…'
                  : status === 'success'
                  ? '✓ Application Received'
                  : isReadingFile
                  ? 'Processing Resume…'
                  : 'Submit Application →'}
              </motion.button>

              {/* Success Notification */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    className="careers-form__alert careers-form__alert--success"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    ✓ Thank you! Your application for {activeJob.title} has been
                    received. Our team will review your qualifications and reach out if there is a match.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </section>
      </div>
    </motion.main>
  )
}
