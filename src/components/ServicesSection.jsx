import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { DIVISIONS, getDivisionById } from '../data/divisionsData'
import './ServicesSection.css'

export default function ServicesSection({
  defaultDivision = 'development',
  showHeaderLabel = true,
  showHeaderBadge,
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

  const showLabel = showHeaderBadge !== undefined ? showHeaderBadge : showHeaderLabel
  const activeDivision = getDivisionById(activeTab) || DIVISIONS[0]

  const tabPills = [
    {
      id: 'development',
      label: '01 / DEVELOPMENT DIVISION (PRIMARY)'
    },
    {
      id: 'creator',
      label: '02 / CREATOR & CONTENT DIVISION'
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
      setActiveTab(nextId)
      document.getElementById(`${id}-tab-${nextId}`)?.focus()
    }
  }

  return (
    <section className="services-section" id={id} aria-label="Services & Divisions">
      <div className="container services-section__container">
        {/* Section Header */}
        <header className="services-section__header">
          {showLabel && (
            <span className="services-section__eyebrow">SERVICES & DIVISIONS</span>
          )}
          <h2 className="services-section__heading">
            TWO SPECIALIZED DIVISIONS. ZERO BROKEN HANDOFFS.
          </h2>
          <p className="services-section__subtitle">
            Flo Studios operates across two dedicated divisions designed to eliminate the fragmentation
            of multi-vendor execution. Whether engineering high-performance digital products or producing
            stage-calibrated creator media, one accountable team carries the vision from concept to market.
          </p>
        </header>

        {/* Interactive Segmented Switcher */}
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
                onClick={() => setActiveTab(pill.id)}
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
            {/* Division Overview Banner */}
            <div className="division-overview">
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

              <blockquote className="division-overview__quote">
                {activeDivision.coreDifferentiator.quote}
              </blockquote>

              <div className="division-overview__body">
                {Array.isArray(activeDivision.coreDifferentiator.body) ? (
                  activeDivision.coreDifferentiator.body.map((paragraph, pIdx) => (
                    <p key={pIdx} className="division-overview__paragraph">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="division-overview__paragraph">
                    {activeDivision.coreDifferentiator.text}
                  </p>
                )}
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

            {/* The Stage-by-Stage Lifecycle Pipeline */}
            <div className="division-pipeline">
              <div className="division-pipeline__header">
                <div className="division-pipeline__meta">
                  <span className="division-pipeline__eyebrow">STAGE-BY-STAGE EXECUTION</span>
                  <h3 className="division-pipeline__title">
                    {activeDivision.pipelineTitle}
                  </h3>
                </div>
                <div className="division-pipeline__count">
                  <span className="division-pipeline__count-num">
                    {activeDivision.stages.length}
                  </span>
                  <span className="division-pipeline__count-label">
                    Stages
                  </span>
                </div>
              </div>

              <div className="division-pipeline__grid">
                {activeDivision.stages.map((stage, sIdx) => {
                  const stageNum = stage.number || stage.step || String(sIdx + 1).padStart(2, '0')
                  const stageDesc = stage.description || stage.desc
                  return (
                    <div key={stage.id || sIdx} className="stage-card">
                      <div className="stage-card__header">
                        <span className="stage-card__number">{stageNum}</span>
                        <span className="stage-card__step-pill">STAGE {stageNum}</span>
                      </div>
                      <h4 className="stage-card__title">{stage.title}</h4>
                      <p className="stage-card__desc">{stageDesc}</p>
                    </div>
                  )
                })}
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
