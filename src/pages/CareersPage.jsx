import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { saveSubmission } from '../services/adminStorage'
import './CareersPage.css'

const OPEN_ROLES = [
  {
    id: 'role-3d',
    title: 'Senior 3D & Procedural Artist',
    department: '3D & CGI',
    type: 'Full-time · Portland or Remote',
    experience: '5+ years',
    desc: 'Lead procedural look development, dynamic simulations, and photoreal cinematic shading for global brand campaigns.',
    skills: ['Houdini', 'Octane / Redshift', 'Cinema 4D', 'Substance Painter']
  },
  {
    id: 'role-motion',
    title: 'Motion Art Director',
    department: 'Motion Design',
    type: 'Full-time · Hybrid',
    experience: '6+ years',
    desc: 'Direct end-to-end motion narratives, kinetic typography systems, and high-energy product launch films.',
    skills: ['Creative Direction', 'After Effects', 'Framer Motion', 'Cinema 4D']
  },
  {
    id: 'role-tech',
    title: 'Creative Technologist / WebGL',
    department: 'Interactive & Tech',
    type: 'Contract or Full-time · Remote',
    experience: '4+ years',
    desc: 'Architect fluid web experiences, GLSL compute shaders, 3D web environments, and low-latency interaction mechanics.',
    skills: ['Three.js', 'WebGL / WebGPU', 'React', 'GLSL Shaders']
  },
  {
    id: 'role-brand',
    title: 'Brand & Visual Identity Designer',
    department: 'Brand Design',
    type: 'Full-time · Portland, OR',
    experience: '3+ years',
    desc: 'Craft bespoke typographic systems, visual identities, editorial brand guidelines, and spatial packaging.',
    skills: ['Typography', 'Figma', 'Art Direction', 'Visual Systems']
  }
]

const PERKS = [
  {
    num: '01',
    title: 'Distributed Collective',
    desc: 'Portland studio base with seamless remote setups across the US, Europe, and Asia.'
  },
  {
    num: '02',
    title: 'Visionary Tier Clients',
    desc: 'Work directly with industry pioneers across tech, automotive, sound, and culture.'
  },
  {
    num: '03',
    title: 'Studio R&D Hours',
    desc: 'Dedicated 20% innovation sprints for proprietary shaders, generative tools, and experiments.'
  },
  {
    num: '04',
    title: 'End-to-End Ownership',
    desc: 'Competitive compensation, equipment stipend, health & wellness, and studio profit sharing.'
  }
]

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState(OPEN_ROLES[0].title)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [portfolioUrl, setPortfolioUrl] = useState('')
  const [experience, setExperience] = useState('5+ years')
  const [coverNote, setCoverNote] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success'
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.careers-page__hero-word',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: 'power3.out', delay: 0.2 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const handleRoleSelect = (roleTitle) => {
    setSelectedRole(roleTitle)
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const finalName = name.trim() || 'Alex Mercer'
    const finalEmail = email.trim() || 'alex.mercer@cgi-lab.io'
    const finalPortfolio = portfolioUrl.trim() || 'https://artstation.com/alexmercer'
    const finalCover = coverNote.trim() || 'Passionate about procedural CGI, liquid glass, and cinematic motion design.'

    setStatus('submitting')

    saveSubmission({
      type: 'job',
      name: finalName,
      email: finalEmail,
      phone: phone.trim() || '',
      role: selectedRole,
      portfolioUrl: finalPortfolio,
      experience,
      coverNote: finalCover
    })

    setTimeout(() => {
      setStatus('success')
      setName('')
      setEmail('')
      setPhone('')
      setPortfolioUrl('')
      setCoverNote('')

      setTimeout(() => {
        setStatus('idle')
      }, 7000)
    }, 850)
  }

  return (
    <motion.main className="careers-page" variants={pageV} initial="initial" animate="animate" exit="exit" ref={heroRef}>
      {/* ── 1. Hero Section ── */}
      <section className="careers-hero">
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Careers</span>
          </div>

          <h1 className="careers-page__title">
            {'Shape the future of motion, systems, and form.'.split(' ').map((w, i) => (
              <span key={i} className="careers-page__hero-word">{w}</span>
            ))}
          </h1>

          <p className="careers-page__intro">
            A studio collective of directors, procedural artists, and creative technologists building high-caliber motion design and digital systems.
          </p>

          <a href="#open-roles" className="page-cta-btn">View open roles ↓</a>

          {/* Perks Grid */}
          <div className="careers-perks">
            {PERKS.map((perk, i) => (
              <div key={i} className="careers-perk-card">
                <span className="careers-perk-card__num">{perk.num}</span>
                <h3 className="careers-perk-card__title">{perk.title}</h3>
                <p className="careers-perk-card__desc">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Open Roles & Application Form Split ── */}
      <section className="careers-roles-section" id="open-roles">
        <div className="container">
          <div className="careers-split">
            {/* Left: Role Directory */}
            <div className="careers-split__left">
              <div className="careers-section-header">
                <span className="careers-section-label">OPPORTUNITIES</span>
                <h2 className="careers-section-title">Open Positions</h2>
                <p className="careers-section-sub">
                  Active roles across our 3D, Motion, and Creative Technology teams.
                </p>
              </div>

              <div className="careers-roles-list">
                {OPEN_ROLES.map((role) => (
                  <div key={role.id} className="careers-role-item">
                    <div className="careers-role-item__header">
                      <div>
                        <span className="careers-role-item__dept">{role.department}</span>
                        <h3 className="careers-role-item__title">{role.title}</h3>
                      </div>
                      <button
                        type="button"
                        className={`careers-role-item__btn ${selectedRole === role.title ? 'careers-role-item__btn--active' : ''}`}
                        onClick={() => handleRoleSelect(role.title)}
                      >
                        {selectedRole === role.title ? 'Selected ✓' : 'Apply →'}
                      </button>
                    </div>

                    <p className="careers-role-item__desc">{role.desc}</p>

                    <div className="careers-role-item__meta">
                      <span className="careers-role-pill">{role.type}</span>
                      <span className="careers-role-pill">{role.experience}</span>
                      {role.skills.map((s) => (
                        <span key={s} className="careers-role-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Application Form Card */}
            <div className="careers-split__right" id="application-form">
              <div className="careers-form-card">
                <div className="careers-form-card__header">
                  <span className="careers-form-card__badge">APPLICATION</span>
                  <h3 className="careers-form-card__title">Submit Your Portfolio</h3>
                  <p className="careers-form-card__desc">
                    Applying for: <strong>{selectedRole}</strong>
                  </p>
                </div>

                <form className="careers-form" onSubmit={handleSubmit}>
                  <div className="careers-form__group">
                    <label className="careers-form__label">Applying For Role *</label>
                    <select
                      className="careers-form__select"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      {OPEN_ROLES.map((r) => (
                        <option key={r.id} value={r.title}>
                          {r.title} ({r.department})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="careers-form__row">
                    <div className="careers-form__group">
                      <label className="careers-form__label">Full Name *</label>
                      <input
                        type="text"
                        className="careers-form__input"
                        placeholder="Alex Mercer"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="careers-form__group">
                      <label className="careers-form__label">Email Address *</label>
                      <input
                        type="email"
                        className="careers-form__input"
                        placeholder="alex@cgi-lab.io"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="careers-form__row">
                    <div className="careers-form__group">
                      <label className="careers-form__label">Portfolio / Showreel URL *</label>
                      <input
                        type="url"
                        className="careers-form__input"
                        placeholder="https://artstation.com/your-name"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        required
                      />
                    </div>
                    <div className="careers-form__group">
                      <label className="careers-form__label">Experience Level *</label>
                      <select
                        className="careers-form__select"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      >
                        <option value="1-3 years">1 - 3 years</option>
                        <option value="4-6 years">4 - 6 years</option>
                        <option value="7+ years">7+ years (Senior / Lead)</option>
                      </select>
                    </div>
                  </div>

                  <div className="careers-form__group">
                    <label className="careers-form__label">Phone (Optional)</label>
                    <input
                      type="tel"
                      className="careers-form__input"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="careers-form__group">
                    <label className="careers-form__label">What Drives Your Work? *</label>
                    <textarea
                      className="careers-form__textarea"
                      placeholder="Share notable projects, software mastery, or why you want to build with Flo Studios..."
                      rows={4}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`careers-submit-btn ${status === 'success' ? 'careers-submit-btn--success' : ''}`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === 'submitting' && 'Submitting Application…'}
                    {status === 'success' && '✓ Application Received!'}
                    {status === 'idle' && 'Submit Application →'}
                  </motion.button>

                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div
                        className="careers-form__feedback"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        ✓ Thank you! Your application has been logged into our studio talent pool. Our directors will review your portfolio.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
