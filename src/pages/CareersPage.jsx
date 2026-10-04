import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { saveSubmission } from '../services/adminStorage'
import './CareersPage.css'

const META_BADGES = [
  'Development Division',
  'Full-Cycle (Prospecting to Close)',
  '100% Commission (Uncapped)',
  'Remote — North America & Europe Only',
  'Contract'
]

const RESPONSIBILITIES = [
  {
    num: '01',
    title: 'Prospect List Development',
    desc: "Research and build a targeted, continuously refreshed prospect list aligned to Flo Studios' ICP - venture-backed startups and ambitious companies with a validated product idea. This includes identifying the right decision-makers within each organization (founders, product leads, or technical stakeholders) and prioritizing outreach based on fit, timing, and likelihood to convert."
  },
  {
    num: '02',
    title: 'Outbound Strategy & Execution',
    desc: 'Design, test, and execute outbound outreach sequences across relevant channels (email, LinkedIn, and others as appropriate), tailoring messaging to each segment of the ICP. This includes iterating on subject lines, opening hooks, and follow-up cadences based on response rates, and knowing when to personalize versus when to scale.'
  },
  {
    num: '03',
    title: 'Discovery & Qualification',
    desc: "Book, prepare for, and lead discovery calls that go beyond surface-level qualification - understanding a prospect's business goals, technical constraints, budget realism, and timeline, in order to determine genuine fit before investing further sales cycle time."
  },
  {
    num: '04',
    title: 'Solution Scoping & Positioning',
    desc: "Translate what you learn in discovery into the right project tier - MVP, full-scale build, or lighter-scope project - and present Flo Studios' Development Division offering in a way that speaks directly to the client's specific goals, rather than a generic pitch."
  },
  {
    num: '05',
    title: 'Negotiation & Closing',
    desc: 'Own the full negotiation process end-to-end, including handling objections around price, timeline, and scope, structuring proposals, and driving the deal to a signed contract without requiring escalation to a separate closer.'
  },
  {
    num: '06',
    title: 'Pipeline Management',
    desc: 'Maintain accurate, up-to-date records of every deal in your pipeline - including stage, next steps, deal notes, and realistic close-date forecasting - so that pipeline health is visible and predictable at any given time, not just at the point of closing.'
  },
  {
    num: '07',
    title: 'Performance Reporting',
    desc: "Report on key sales metrics - including outreach volume, response and conversion rates, and closed revenue - on a regular cadence, using this data to identify what's working and where the pipeline needs adjustment."
  },
  {
    num: '08',
    title: 'Messaging Refinement',
    desc: 'Continuously test and refine outbound messaging, targeting criteria, and qualification questions based on real response data and patterns observed in closed-won versus closed-lost deals, treating your own pipeline as a feedback loop for improving conversion over time.'
  },
  {
    num: '09',
    title: 'Delivery Handoff',
    desc: "Collaborate closely with the Development Division's delivery team once a deal is signed, ensuring all context, expectations, and scope details are clearly transferred so the project kicks off smoothly and client expectations set during the sales process are honored during execution."
  }
]

const COMPENSATION_LEAD = 'This is a 100% commission-based contract position, with no fixed salary and no cap on earnings.'

const COMPENSATION_ITEMS = [
  {
    label: 'Commission Structure',
    text: '12-15% of total contract value per closed deal, determined by project scope and complexity'
  },
  {
    label: 'Deal Size',
    text: 'Project pricing is scoped individually based on client requirements and varies accordingly - recent engagements have ranged from approximately $5,000 for smaller-scope projects to $100,000+ for full-scale product builds, with a substantial share of deals falling in the $35,000-$40,000 range for standard MVP work'
  },
  {
    label: 'Illustrative Example',
    text: 'A closed deal valued at $35,000 would yield approximately $4,200-$5,250 in commission at the stated rate; a closed deal valued at $100,000 would yield $12,000-$15,000'
  }
]

const COMPENSATION_TERMS = 'Final commission percentage and payment terms are confirmed during onboarding'

const MINIMUM_QUALIFICATIONS = [
  '2-3 years of experience in sales (strict range - candidates outside this window will not be considered)',
  'Demonstrated experience selling into the tech industry',
  'Proven full-cycle sales experience: prospecting, discovery, negotiation, and closing - not outreach-only or closing-only experience',
  'Exceptional written and verbal communication skills',
  'Based in North America or Europe (non-negotiable; applications from outside these regions will not be reviewed)',
  'Reliable access to a laptop, stable internet, and availability to work independently on a remote, self-directed basis'
]

const PREFERRED_QUALIFICATIONS = [
  'Experience selling services or custom builds in a digital agency, software studio, or dev-shop environment',
  'Experience navigating consultative, multi-stakeholder sales cycles for high-consideration, high-ticket purchases',
  'Familiarity with CRM tools (e.g., HubSpot, Pipedrive, or similar) for pipeline tracking',
  'A track record of exceeding quota in a commission-driven or performance-based compensation structure',
  'Prior experience selling to startup founders or technical decision-makers (e.g., CTOs, product leads)'
]

const THRIVE_POINTS = [
  "A genuine preference for ownership over structure - you'd rather build your own pipeline and be judged on outcomes than follow someone else's playbook",
  'A high tolerance for rejection and an ability to stay consistent through slow weeks, without needing external motivation to keep prospecting',
  "A competitive drive toward uncapped upside - you're energized, not intimidated, by compensation tied directly to performance",
  "Strong instincts for reading people and situations quickly, especially in early conversations where fit isn't yet obvious",
  'The discipline to manage your own time, priorities, and pipeline without day-to-day oversight',
  "A genuine interest in the technical and startup world - you enjoy understanding what founders are building, not just closing what's in front of you"
]

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

export default function CareersPage() {
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

  const heroRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.careers-header__title-word',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out', delay: 0.15 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

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
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer?.files?.[0]) {
      handleProcessFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (isReadingFile) {
      setErrorMessage('Please wait for the resume to finish uploading.')
      return
    }
    if (!name.trim()) {
      setErrorMessage('Full Name is required.')
      return
    }
    if (!email.trim()) {
      setErrorMessage('Email Address is required.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.')
      return
    }
    if (!region) {
      setErrorMessage('Please select your Location / Region.')
      return
    }
    if (!experience) {
      setErrorMessage('Please select your Sales Experience.')
      return
    }
    if (!resumeName || !resumeData) {
      setErrorMessage('Resume (PDF, DOC, DOCX - Max 5MB) is required.')
      return
    }
    if (!notes.trim()) {
      setErrorMessage('Sales Background & Notes are required.')
      return
    }
    if (!termsConfirmed) {
      setErrorMessage('Please confirm the mandatory certification checkbox to submit.')
      return
    }

    let cleanLinkedinUrl = linkedinUrl.trim()
    if (cleanLinkedinUrl) {
      if (/^(javascript|data|vbscript|file):/i.test(cleanLinkedinUrl)) {
        setErrorMessage('Please enter a valid profile or website URL.')
        return
      }
      if (!/^https?:\/\//i.test(cleanLinkedinUrl)) {
        cleanLinkedinUrl = `https://${cleanLinkedinUrl}`
      }
    }

    setStatus('submitting')

    try {
      const saved = saveSubmission({
        type: 'job',
        role: 'Sales Development Representative',
        division: 'Development Division',
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
        {/* ── Breadcrumb & Header ── */}
        <header className="careers-header">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Careers</span>
          </div>

          <h1 className="careers-header__title" aria-label="Sales Development Representative">
            {'Sales Development Representative'.split(' ').map((word, idx) => (
              <span key={idx} className="careers-header__title-word">
                {word}{' '}
              </span>
            ))}
          </h1>

          <div className="careers-meta-badges">
            {META_BADGES.map((badge, idx) => (
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
              <p>
                Flo Studios is a dual-engine media and development hub for established creators and
                ambitious companies. Our Development Division owns the full product pipeline -
                Idea & Design, Full-Stack Development, Deployment, and Customer Acquisition -
                delivered as one complete, packaged engagement rather than a menu of standalone
                services. We work with venture-backed startups and ambitious companies building
                products worth building right.
              </p>
            </div>
          </section>

          {/* Section: About the Job */}
          <section className="careers-editorial__section">
            <h2 className="careers-editorial__title">About the Job</h2>
            <div className="careers-editorial__prose">
              <p>
                Flo Studios is hiring a Sales Development Representative to own the entire sales
                cycle for our Development Division - from prospecting to close. This is a
                full-cycle, individual-contributor role: you will not hand off qualified leads to a
                separate closer, and you will not inherit inbound leads you didn't source yourself.
                You will build your own pipeline, run your own discovery process, and close your own
                deals.
              </p>
              <p>
                This role suits a sales professional who wants full ownership of outcomes and
                compensation with no ceiling, and who has the discipline to operate independently in
                a remote, contract-based structure.
              </p>
            </div>
          </section>

          {/* Section: Responsibilities */}
          <section className="careers-editorial__section">
            <h2 className="careers-editorial__title">Responsibilities</h2>
            <div className="careers-responsibilities-list">
              {RESPONSIBILITIES.map((item) => (
                <div key={item.num} className="careers-responsibility-card">
                  <div className="careers-responsibility-card__index">{item.num}</div>
                  <div className="careers-responsibility-card__content">
                    <h3 className="careers-responsibility-card__title">{item.title}</h3>
                    <p className="careers-responsibility-card__desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Compensation */}
          <section className="careers-editorial__section">
            <h2 className="careers-editorial__title">Compensation</h2>
            <div className="careers-editorial__prose">
              <p className="careers-lead-highlight">{COMPENSATION_LEAD}</p>
            </div>
            <div className="careers-compensation-grid">
              {COMPENSATION_ITEMS.map((item, idx) => (
                <div key={idx} className="careers-info-box">
                  <span className="careers-info-box__label">{item.label}</span>
                  <p className="careers-info-box__text">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="careers-compensation-terms">{COMPENSATION_TERMS}</p>
          </section>

          {/* Section: Qualifications Split */}
          <div className="careers-editorial__grid-pair">
            {/* Minimum Qualifications */}
            <section className="careers-editorial__section careers-editorial__section--boxed">
              <h2 className="careers-editorial__title">Minimum Qualifications</h2>
              <ul className="careers-checklist">
                {MINIMUM_QUALIFICATIONS.map((item, idx) => (
                  <li key={idx} className="careers-checklist__item">
                    <span className="careers-checklist__bullet" aria-hidden="true">—</span>
                    <span className="careers-checklist__text">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Preferred Qualifications */}
            <section className="careers-editorial__section careers-editorial__section--boxed">
              <h2 className="careers-editorial__title">Preferred Qualifications</h2>
              <ul className="careers-checklist">
                {PREFERRED_QUALIFICATIONS.map((item, idx) => (
                  <li key={idx} className="careers-checklist__item">
                    <span className="careers-checklist__bullet" aria-hidden="true">—</span>
                    <span className="careers-checklist__text">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Section: What Success Looks Like */}
          <section className="careers-editorial__section">
            <h2 className="careers-editorial__title">What Success Looks Like</h2>
            <div className="careers-editorial__prose">
              <p>
                Success in this role looks like a consistent, self-generated pipeline that reflects
                genuine ICP fit rather than volume for its own sake. Within the first 60-90 days, we'd
                expect a rep to be fully ramped and closing 2-4 deals per quarter, with a CRM that
                reflects real-time, accurate deal status rather than optimistic guesswork. Just as
                importantly, success shows up in how clients describe the experience of working with
                you - a sales process that felt consultative and professional from the first
                outreach message through contract signature, setting the right expectations for the
                delivery team to build on.
              </p>
            </div>
          </section>

          {/* Section: You Might Thrive in this Role */}
          <section className="careers-editorial__section">
            <h2 className="careers-editorial__title">You Might Thrive in this Role</h2>
            <ul className="careers-checklist">
              {THRIVE_POINTS.map((item, idx) => (
                <li key={idx} className="careers-checklist__item">
                  <span className="careers-checklist__bullet" aria-hidden="true">—</span>
                  <span className="careers-checklist__text">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Flo Studios' Mission & Diversity */}
          <section className="careers-editorial__section">
            <h2 className="careers-editorial__title">Flo Studios' Mission & Diversity</h2>
            <div className="careers-editorial__prose">
              <p>
                Flo Studios' mission is to give ambitious companies and established creators the
                infrastructure to build and grow at the highest level. We believe the best work comes
                from teams that bring genuinely different perspectives, backgrounds, and ways of
                thinking to the table - and we build our team, in both our Creator and Development
                Divisions, with that in mind.
              </p>
            </div>
          </section>

          {/* Section: Equal Opportunity Employer */}
          <section className="careers-editorial__section">
            <h2 className="careers-editorial__title">Equal Opportunity Employer</h2>
            <div className="careers-editorial__prose">
              <p>
                We are an equal opportunity employer. We do not discriminate based on race, religion,
                color, national origin, sex, sexual orientation, age, disability, veteran status, or
                any other legally protected characteristic. All applicants are evaluated solely on
                their qualifications, experience, and fit for the role.
              </p>
            </div>
          </section>
        </article>

        {/* ── 3. Application Form ── */}
        <section className="careers-form-section" id="application-form">
          <div className="careers-form-card">
            <div className="careers-form-card__header">
              <span className="careers-form-card__badge">Apply for this Role</span>
              <h2 className="careers-form-card__title">Sales Development Representative</h2>
            </div>

            <form className="careers-form" onSubmit={handleSubmit} noValidate>
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

              {/* Row 3: Location / Region & Sales Experience */}
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
                    <option value="">Select Region</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Other region (Note: strictly not reviewed per qualifications)">
                      Other region (Note: strictly not reviewed per qualifications)
                    </option>
                  </select>
                </div>
                <div className="careers-form__group">
                  <label htmlFor="careers-experience" className="careers-form__label">
                    Sales Experience *
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
                    <option value="">Select Experience</option>
                    <option value="2-3 years (Meets qualification)">
                      2-3 years (Meets qualification)
                    </option>
                    <option value="Less than 2 years">Less than 2 years</option>
                    <option value="More than 3 years">More than 3 years</option>
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

                {!resumeName ? (
                  <div
                    className={`careers-dropzone careers-file-dropzone ${isDragging ? 'careers-dropzone--dragging' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload Resume (PDF, DOC, or DOCX up to 5MB)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        fileInputRef.current?.click()
                      }
                    }}
                  >
                    <div className="careers-dropzone__icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div className="careers-dropzone__text">
                      <span className="careers-dropzone__prompt">Click to upload</span> or drag and drop your file here
                    </div>
                    <div className="careers-dropzone__hint">PDF, DOC, DOCX (Max 5MB)</div>
                  </div>
                ) : (
                  <div className="careers-file-selected">
                    <div className="careers-file-selected__info">
                      <span className="careers-file-selected__icon" aria-hidden="true">📄</span>
                      <div className="careers-file-selected__meta">
                        <span className="careers-file-selected__name">{resumeName}</span>
                        <span className="careers-file-selected__size">{resumeSize}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="careers-file-selected__remove"
                      onClick={handleClearResume}
                      title="Remove file"
                    >
                      Remove ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Row 5: Sales Background & Notes */}
              <div className="careers-form__group">
                <label htmlFor="careers-notes" className="careers-form__label">
                  Sales Background & Notes *
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
                  By applying for this role, you confirm that all information and details provided to
                  Flo Studios are accurate and truthful, and that all certifications and credentials
                  submitted belong to you. Any misrepresentation, falsification, or discrepancy
                  discovered may result in immediate termination of employment and may lead to legal
                  action.
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
                    ✓ Thank you! Your application for Sales Development Representative has been
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
