import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { DIVISIONS, getDivisionById } from '../data/divisionsData'
import SlotText3D from './SlotText3D'
import './ServicesSection.css'

function RollingNumber({ value }) {
  const chars = String(value).split('')
  return (
    <span className="rolling-number" aria-hidden="true">
      {chars.map((char, cIdx) => {
        const num = parseInt(char, 10)
        if (isNaN(num)) {
          return (
            <span key={cIdx} className="rolling-number__char">
              {char}
            </span>
          )
        }
        return (
          <span key={cIdx} className="rolling-number__slot">
            <motion.span
              className="rolling-number__column"
              initial={false}
              animate={{ y: `-${num * 10}%` }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <span key={digit} className="rolling-number__digit">
                  {digit}
                </span>
              ))}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}

export default function ServicesSection({
  defaultDivision = 'development',
  id = 'services'
}) {
  const [userSelectedTab, setUserSelectedTab] = useState(null)
  const [prevDefaultDivision, setPrevDefaultDivision] = useState(defaultDivision)

  if (defaultDivision !== prevDefaultDivision) {
    setPrevDefaultDivision(defaultDivision)
    setUserSelectedTab(null)
  }

  const activeTab = userSelectedTab ?? defaultDivision ?? 'development'
  const setActiveTab = setUserSelectedTab

  const activeDivision = getDivisionById(activeTab) || DIVISIONS[0]

  const [activeStageIndex, setActiveStageIndex] = useState(0)
  const [hoveredRowIdx, setHoveredRowIdx] = useState(null)
  const rosterRef = useRef(null)

  const handleSelectDivision = (divisionId) => {
    setActiveTab(divisionId)
    setActiveStageIndex(0)
    setHoveredRowIdx(null)
  }

  const stages = activeDivision.stages || []
  const safeStageIndex = Math.min(activeStageIndex, Math.max(0, stages.length - 1))
  const currentStage = stages[safeStageIndex] || stages[0]

  // Smooth scroll active row into view when navigating via prev/next, keys, or buttons
  useEffect(() => {
    const itemEl = document.getElementById(`${id}-stage-item-${safeStageIndex}`)
    const rosterEl = rosterRef.current
    if (itemEl && rosterEl) {
      const rosterRect = rosterEl.getBoundingClientRect()
      const itemRect = itemEl.getBoundingClientRect()
      if (itemRect.top < rosterRect.top || itemRect.bottom > rosterRect.bottom) {
        itemEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [safeStageIndex, id])

  const handleStageSelect = (sIdx, shouldScrollMobile = false) => {
    setActiveStageIndex(sIdx)
    if (shouldScrollMobile && typeof window !== 'undefined' && window.innerWidth < 1024) {
      const showcaseEl = document.getElementById(`${id}-stage-panel`)
      if (showcaseEl) {
        showcaseEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }

  const handlePrevStage = () => {
    if (stages.length === 0) return
    setActiveStageIndex((prev) => (prev - 1 + stages.length) % stages.length)
  }

  const handleNextStage = () => {
    if (stages.length === 0) return
    setActiveStageIndex((prev) => (prev + 1) % stages.length)
  }

  const handleStageKeyDown = (e, sIdx) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIdx = (sIdx + 1) % stages.length
      setActiveStageIndex(nextIdx)
      document.getElementById(`${id}-stage-btn-${nextIdx}`)?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIdx = (sIdx - 1 + stages.length) % stages.length
      setActiveStageIndex(prevIdx)
      document.getElementById(`${id}-stage-btn-${prevIdx}`)?.focus()
    }
  }

  const tabPills = [
    {
      id: 'development',
      label: 'Development Division'
    },
    {
      id: 'creator',
      label: 'Creator Division'
    }
  ]

  const handleTabKeyDown = (e, index) => {
    let targetIdx = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      targetIdx = (index + 1) % tabPills.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      targetIdx = (index - 1 + tabPills.length) % tabPills.length
    }
    if (targetIdx !== null) {
      const nextId = tabPills[targetIdx].id
      handleSelectDivision(nextId)
      document.getElementById(`${id}-tab-${nextId}`)?.focus()
    }
  }

  return (
    <section className="services-section" id={id} aria-label="Services & Divisions">
      <div className="container services-section__container">
        {/* Section Header */}
        <header className="services-section__header">
          <h2 className="services-section__heading">
            TWO SPECIALIZED DIVISIONS. ZERO BROKEN HANDOFFS.
          </h2>
          <p className="services-section__subtitle">
            Flo Studios is a progressive dual-engine media and development hub operating at the intersection
            of creative storytelling and digital infrastructure. Our primary focus is our Development Division—partnering
            with venture-backed founders from ideation to production scale—paired with our Creator Division to transform
            digital exposure into enduring business assets without single-stage handoffs.
          </p>
        </header>

        {/* Interactive Segmented Switcher */}
        <div className="services-switcher-wrap">
          <div
            className="services-switcher"
            role="tablist"
            aria-label="Flo Studios Divisions"
          >
            {tabPills.map((pill, idx) => {
              const isActive = activeTab === pill.id
              return (
                <button
                  key={pill.id}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${pill.id}`}
                  aria-selected={isActive}
                  aria-controls={`${id}-panel-${pill.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`services-switcher__tab ${isActive ? 'services-switcher__tab--active' : ''}`}
                  onClick={() => handleSelectDivision(pill.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`division-active-pill-${id}`}
                      className="services-switcher__indicator"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="services-switcher__label">{pill.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Division Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDivision.id}
            id={`${id}-panel-${activeDivision.id}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${activeDivision.id}`}
            className="division-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Division Overview / Architectural Manifest */}
            <div className="division-overview">
              <div className="division-overview__header-bar">
                <div className="division-overview__meta-tag">
                  <span className="division-overview__status-dot" aria-hidden="true" />
                  <span className="division-overview__meta-text">
                    {activeDivision.id === 'development'
                      ? '01 // ARCHITECTURAL MANIFESTO'
                      : '02 // CALIBRATED EXECUTION'}
                  </span>
                </div>
                <div className="division-overview__badges">
                  <span className="division-badge division-badge--primary">
                    {activeDivision.badge}
                  </span>
                  {activeDivision.subBadge && (
                    <span className="division-badge division-badge--sub">
                      {activeDivision.subBadge}
                    </span>
                  )}
                </div>
              </div>

              <div className="division-overview__grid">
                <div className="division-overview__col-thesis">
                  <h3 className="division-overview__thesis">
                    {activeDivision.coreDifferentiator.quote.replace(/^[“"]|[”"]$/g, '')}
                  </h3>
                  <div className="division-overview__caption">
                    <span className="division-overview__caption-line" aria-hidden="true" />
                    <span className="division-overview__caption-text">
                      {activeDivision.id === 'development'
                        ? 'Single-Point Accountability · Ideation to Production Scale'
                        : 'Custom Media Infrastructure · Calibrated Per Growth Stage'}
                    </span>
                  </div>
                </div>

                <div className="division-overview__col-breakdown">
                  {Array.isArray(activeDivision.coreDifferentiator.body) ? (
                    activeDivision.coreDifferentiator.body.map((paragraph, pIdx) => {
                      const labels = activeDivision.id === 'development'
                        ? ['01 / THE FRACTURE', '02 / THE FLO STANDARD']
                        : ['01 / STAGE DIAGNOSIS', '02 / SCALED SYSTEM']
                      return (
                        <div key={pIdx} className="division-overview__insight-card">
                          <span className="division-overview__insight-num">
                            {labels[pIdx] || `0${pIdx + 1} / INSIGHT`}
                          </span>
                          <p className="division-overview__insight-text">
                            {paragraph}
                          </p>
                        </div>
                      )
                    })
                  ) : (
                    <div className="division-overview__insight-card">
                      <p className="division-overview__insight-text">
                        {activeDivision.coreDifferentiator.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* "What We Do" Comparison Cards */}
            <div className="division-what-we-do">
              <div className="division-card division-card--problem">
                <div className="division-card__tag">THE PROBLEM</div>
                <h3 className="division-card__title">The Fragmented Multi-Vendor Model</h3>
                <p className="division-card__text">{activeDivision.whatWeDo.problem}</p>
              </div>

              <div className="division-card division-card--solution">
                <div className="division-card__tag">THE INTEGRATED SOLUTION</div>
                <h3 className="division-card__title">The Flo Studios Integrated Model</h3>
                <p className="division-card__text">{activeDivision.whatWeDo.solution}</p>
                {activeDivision.whatWeDo.philosophy && (
                  <div className="division-card__philosophy">
                    <span className="division-card__philosophy-label">Core Philosophy</span>
                    <p className="division-card__philosophy-quote">
                      “{activeDivision.whatWeDo.philosophy}”
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* The Stage-by-Stage Lifecycle Pipeline — Teamwall Interactive Architecture */}
            <div className="division-pipeline teamwall-container" aria-label={activeDivision.pipelineTitle}>
              <div className="teamwall-header">
                <div className="teamwall-header__left">
                  <span className="teamwall-header__eyebrow">
                    {activeDivision.id === 'development'
                      ? 'FULL BUILD LIFECYCLE · STAGE BY STAGE'
                      : 'CALIBRATED MEDIA ENGINE PIPELINE'}
                  </span>
                  <h3 className="teamwall-header__title">
                    {activeDivision.pipelineTitle}
                  </h3>
                </div>
                <div className="teamwall-header__count">
                  <span className="teamwall-header__count-num">
                    {stages.length}
                  </span>
                  <span className="teamwall-header__count-label">
                    Stages
                  </span>
                </div>
              </div>

              <div className="teamwall-layout">
                {/* Left Column: Architectural Numbered Roster matching Image 2 */}
                <div className="teamwall-roster" ref={rosterRef}>
                  <ul
                    className="teamwall-list"
                    role="tablist"
                    aria-label={`${activeDivision.name} stages`}
                  >
                    {stages.map((stage, sIdx) => {
                      const isActive = sIdx === safeStageIndex
                      const stageNum = stage.number || String(sIdx + 1).padStart(2, '0')
                      return (
                        <li
                          key={stage.id || sIdx}
                          id={`${id}-stage-item-${sIdx}`}
                          className={`teamwall-list__item ${isActive ? 'teamwall-list__item--active' : ''}`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId={`teamwall-active-line-${id}-${activeDivision.id}`}
                              className="teamwall-list__active-line"
                              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                              aria-hidden="true"
                            />
                          )}
                          <button
                            type="button"
                            role="tab"
                            id={`${id}-stage-btn-${sIdx}`}
                            aria-selected={isActive}
                            aria-controls={`${id}-stage-panel`}
                            tabIndex={isActive ? 0 : -1}
                            className={`teamwall-row ${isActive ? 'teamwall-row--active' : ''}`}
                            onClick={() => handleStageSelect(sIdx, true)}
                            onMouseEnter={() => {
                              handleStageSelect(sIdx, false)
                              setHoveredRowIdx(sIdx)
                            }}
                            onMouseLeave={() => setHoveredRowIdx(null)}
                            onKeyDown={(e) => handleStageKeyDown(e, sIdx)}
                          >
                            <span className="teamwall-row__idx">{stageNum}</span>
                            <div className="teamwall-row__title-wrap">
                              <AnimatePresence initial={false}>
                                {isActive && (
                                  <motion.span
                                    className="teamwall-row__arrow"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                    aria-hidden="true"
                                  >
                                    →
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              <SlotText3D
                                text={stage.title}
                                isActive={isActive}
                                isHovered={hoveredRowIdx === sIdx}
                                className="teamwall-row__title"
                              />
                            </div>
                            <span className="teamwall-row__pill">
                              STAGE {stageNum}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Right Column: Sticky Detail Showcase Card */}
                <aside
                  className="teamwall-showcase"
                  id={`${id}-stage-panel`}
                  role="tabpanel"
                  aria-labelledby={`${id}-stage-btn-${safeStageIndex}`}
                >
                  <div className="teamwall-card">
                    {/* Animated Progress Track */}
                    <div className="teamwall-card__progress-track" aria-hidden="true">
                      <motion.div
                        className="teamwall-card__progress-bar"
                        initial={false}
                        animate={{ width: `${((safeStageIndex + 1) / stages.length) * 100}%` }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    </div>

                    <div className="teamwall-card__top">
                      <div className="teamwall-card__status">
                        <span className="teamwall-card__dot" aria-hidden="true" />
                        <span className="teamwall-card__stage-tag">
                          STAGE <RollingNumber value={currentStage.number} /> // {String(stages.length).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="teamwall-card__no">
                        No. <RollingNumber value={currentStage.number} />
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${activeDivision.id}-${currentStage.id || safeStageIndex}`}
                        initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="teamwall-card__body"
                      >
                        <div className="teamwall-card__watermark" aria-hidden="true">
                          {currentStage.number}
                        </div>
                        <h4 className="teamwall-card__title">{currentStage.title}</h4>
                        <p className="teamwall-card__desc">{currentStage.description}</p>

                        {currentStage.focus && (
                          <motion.div
                            className="teamwall-card__focus-block"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <span className="teamwall-card__focus-label">
                              Core Outcome & Strategic Deliverable
                            </span>
                            <p className="teamwall-card__focus-text">
                              {currentStage.focus}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    <div className="teamwall-card__footer">
                      <div className="teamwall-card__counter">
                        <span className="teamwall-card__counter-curr">
                          <span className="sr-only">{currentStage.number}</span>
                          <RollingNumber value={currentStage.number} />
                        </span>
                        <span className="teamwall-card__counter-sep">/</span>
                        <span className="teamwall-card__counter-total">
                          {String(stages.length).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="teamwall-card__nav-group">
                        <button
                          type="button"
                          onClick={handlePrevStage}
                          className="teamwall-nav-btn"
                          aria-label="Previous stage"
                        >
                          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M14 9H4M8 5L4 9l4 4" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStage}
                          className="teamwall-nav-btn"
                          aria-label="Next stage"
                        >
                          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M4 9h10M10 5l4 4-4 4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            {/* The One-Line Summary & Contact CTA */}
            <div className="division-summary">
              <div className="division-summary__content">
                <span className="division-summary__tag">THE ONE-LINE SUMMARY</span>
                <p className="division-summary__text">
                  {activeDivision.oneLineSummary}
                </p>
              </div>
              <div className="division-summary__action">
                <Link
                  to={`/contact?division=${activeDivision.id}`}
                  className="division-cta-button"
                  aria-label={`Start a Project with ${activeDivision.shortName}`}
                >
                  <span>Start a Project with {activeDivision.shortName} →</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
