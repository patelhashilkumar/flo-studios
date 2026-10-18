import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { DIVISIONS, getDivisionById } from '../data/divisionsData'
import SlotText3D from './SlotText3D'
import LifecycleMotionGraphic from './LifecycleMotionGraphic'
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
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [overviewMode, setOverviewMode] = useState('unified')
  const rosterRef = useRef(null)
  const shouldScrollRosterRef = useRef(false)

  const handleSelectDivision = (divisionId) => {
    setActiveTab(divisionId)
    setActiveStageIndex(0)
    setHoveredRowIdx(null)
    setSelectedCategory('All')
    setOverviewMode('unified')
  }

  const stages = activeDivision.stages || []
  const categories = [
    'All',
    ...Array.from(new Set(stages.map((s) => s.category).filter(Boolean)))
  ]
  const visibleStages = selectedCategory === 'All'
    ? stages
    : stages.filter((s) => s.category === selectedCategory)

  const safeStageIndex = Math.min(activeStageIndex, Math.max(0, visibleStages.length - 1))
  const currentStage = visibleStages[safeStageIndex] || stages[0]

  // Smooth scroll active row into view only when explicitly requested (prev/next or keyboard nav)
  useEffect(() => {
    if (!shouldScrollRosterRef.current) return
    shouldScrollRosterRef.current = false
    const itemEl = document.getElementById(`${id}-stage-item-${safeStageIndex}`)
    const rosterEl = rosterRef.current
    if (itemEl && rosterEl) {
      if (rosterEl.scrollHeight > rosterEl.clientHeight && rosterEl.clientHeight > 0) {
        const targetY = itemEl.offsetTop - rosterEl.clientHeight / 2 + itemEl.offsetHeight / 2
        rosterEl.scrollTo({ top: targetY, behavior: 'smooth' })
      } else {
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
    if (visibleStages.length === 0) return
    shouldScrollRosterRef.current = true
    setActiveStageIndex((prev) => (prev - 1 + visibleStages.length) % visibleStages.length)
  }

  const handleNextStage = () => {
    if (visibleStages.length === 0) return
    shouldScrollRosterRef.current = true
    setActiveStageIndex((prev) => (prev + 1) % visibleStages.length)
  }

  const handleStageKeyDown = (e, sIdx) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      shouldScrollRosterRef.current = true
      const nextIdx = (sIdx + 1) % visibleStages.length
      setActiveStageIndex(nextIdx)
      document.getElementById(`${id}-stage-btn-${nextIdx}`)?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      shouldScrollRosterRef.current = true
      const prevIdx = (sIdx - 1 + visibleStages.length) % visibleStages.length
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
      {/* Services Hero Header, 4 Cards & Manifesto (Specification from User Mockup) */}
      <div className="services-hero">
        <div className="container services-hero__container">
          <div className="services-hero__stage">
            <p className="services-hero__eyebrow">Bringing Ideas to Life</p>
            <h1 className="services-hero__title">
              <span className="services-hero__title-line services-hero__title-line--nowrap">
                From idea to design to deployment to distribution,
              </span>
              <span className="services-hero__title-line">
                we take your vision all the way to market.
              </span>
            </h1>
            <div className="services-hero__cta-wrap">
              <Link to="/contact" className="services-hero__btn">
                Get in touch
              </Link>
            </div>
          </div>


          {/* Horizontal Divider Line */}
          <div className="services-hero__divider" aria-hidden="true" />

          {/* Editorial Manifesto */}
          <div className="services-hero__manifesto">
            <p className="services-hero__manifesto-text">
              We operate across two dedicated divisions designed to<br className="services-hero__br" />
              eliminate the decentralized execution of the project.<br className="services-hero__br" />
              Whether engineering industry level digital products or crafting<br className="services-hero__br" />
              stage-calibrated creator media.<br className="services-hero__br" />
              One single team through out the life-cycle of the project,<br className="services-hero__br" />
              from concept to market.
            </p>
          </div>

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

          {/* Active Division Intro Statement (From User Mockup) */}
          <div className="services-hero__intro">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDivision.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="services-hero__intro-body"
              >
                {activeDivision.introStatement?.map((para, pIdx) => (
                  <p key={pIdx} className="services-hero__intro-text">
                    {para}
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
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
          {/* Unified Architectural Master Schematic (Thesis + Full-Width Pipeline Line Art + Problem vs Solution) */}
          <div className="container services-section__container">
            <div className="division-schematic-card">
              {/* Corner Registration Crosshairs for Architectural Blueprint Aesthetic */}
              <span className="schematic-corner schematic-corner--tl" aria-hidden="true" />
              <span className="schematic-corner schematic-corner--tr" aria-hidden="true" />
              <span className="schematic-corner schematic-corner--bl" aria-hidden="true" />
              <span className="schematic-corner schematic-corner--br" aria-hidden="true" />

              {/* Master Header */}
              <div className="schematic-header">
                <div className="schematic-meta-tag">
                  <span className="schematic-meta-dot" aria-hidden="true" />
                  <span>CORE DIFFERENTIATOR · ARCHITECTURAL PROOF</span>
                </div>
                <h3 className="schematic-thesis">
                  {activeDivision.coreDifferentiator.quote.replace(/^[“"]|[”"]$/g, '')}
                </h3>
                <div className="schematic-subtitle">
                  <span className="schematic-subtitle-line" aria-hidden="true" />
                  <span className="schematic-subtitle-text">
                    {activeDivision.id === 'development'
                      ? 'Single-Point Accountability · Ideation to Production Scale'
                      : 'Custom Media Infrastructure · Calibrated Per Growth Stage'}
                  </span>
                </div>
              </div>

              {/* Central Full-Width Line-Art Motion Graphic Pipeline */}
              <div className="schematic-pipeline-zone">
                <LifecycleMotionGraphic
                  divisionId={activeDivision.id}
                  stages={activeDivision.stages}
                  mode={overviewMode}
                  onModeChange={setOverviewMode}
                />
              </div>

              {/* Architectural Circuit Bus / Conduit Lines connecting to panels */}
              <div className="schematic-connector-bar" aria-hidden="true">
                <div className="schematic-connector-line" />
                <div className="schematic-connector-junctions">
                  <div className="schematic-junction schematic-junction--left">
                    <span className="schematic-junction-dot" />
                    <span className="schematic-junction-text">01 // THE FRACTURE POINT</span>
                  </div>
                  <div className="schematic-junction schematic-junction--right">
                    <span className="schematic-junction-dot schematic-junction-dot--dark" />
                    <span className="schematic-junction-text">02 // THE FLO STANDARD</span>
                  </div>
                </div>
              </div>

              {/* Bottom Comparison Grid: The Problem vs The Integrated Solution (Framer Feature Card Style) */}
              <div className="schematic-panels-grid">
                {/* Card 1: THE PROBLEM */}
                <div
                  className={`schematic-panel schematic-panel--problem division-overview__insight-card ${
                    overviewMode === 'fracture'
                      ? 'schematic-panel--active-fracture division-overview__insight-card--active division-overview__insight-card--fracture'
                      : ''
                  }`}
                  onMouseEnter={() => setOverviewMode('fracture')}
                  onClick={() => setOverviewMode('fracture')}
                  tabIndex={0}
                  role="button"
                  aria-label="View Problem: The Fragmented Multi-Vendor Model"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setOverviewMode('fracture')
                    }
                  }}
                >
                  {/* Top Category Header Row */}
                  <div className="schematic-panel__header">
                    <span className="schematic-panel__category">The Problem</span>
                    <span className="schematic-panel__status-tag schematic-panel__status-tag--problem">
                      3+ Disconnected Vendors
                    </span>
                  </div>

                  {/* Center Visual Illustrator */}
                  <div className="schematic-panel__illustrator" aria-hidden="true">
                    <svg
                      viewBox="0 0 380 170"
                      className="schematic-panel__svg"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Subtle Grid Guidelines */}
                      <line x1="30" y1="40" x2="350" y2="40" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="30" y1="130" x2="350" y2="130" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="3 3" />

                      {/* Severed Connection Paths */}
                      <path d="M 115 65 C 135 65, 142 85, 148 105" stroke="#dc2626" strokeWidth="1.8" strokeDasharray="4 3" />
                      <path d="M 232 105 C 238 85, 245 65, 265 65" stroke="#dc2626" strokeWidth="1.8" strokeDasharray="4 3" />

                      {/* Break Warning Badges */}
                      <g transform="translate(108, 76)">
                        <rect x="0" y="0" width="62" height="18" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
                        <text x="31" y="12" textAnchor="middle" fill="#dc2626" fontSize="7" fontWeight="800" fontFamily="var(--font-manrope), sans-serif">
                          LOST CONTEXT
                        </text>
                      </g>

                      <g transform="translate(210, 76)">
                        <rect x="0" y="0" width="64" height="18" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
                        <text x="32" y="12" textAnchor="middle" fill="#dc2626" fontSize="7" fontWeight="800" fontFamily="var(--font-manrope), sans-serif">
                          HANDOFF GAP
                        </text>
                      </g>

                      {/* Vendor Node 1 */}
                      <g transform="translate(30, 40)">
                        <rect width="85" height="50" rx="8" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
                        <circle cx="16" cy="18" r="3.5" fill="#ef4444" />
                        <text x="26" y="21" fontSize="9" fontWeight="800" fill="#0e0e12" fontFamily="var(--font-manrope), sans-serif">Vendor 01</text>
                        <text x="12" y="38" fontSize="8" fontWeight="600" fill="#64748b" fontFamily="var(--font-manrope), sans-serif">Strategy Agency</text>
                      </g>

                      {/* Vendor Node 2 */}
                      <g transform="translate(148, 85)">
                        <rect width="85" height="50" rx="8" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
                        <circle cx="16" cy="18" r="3.5" fill="#ef4444" />
                        <text x="26" y="21" fontSize="9" fontWeight="800" fill="#0e0e12" fontFamily="var(--font-manrope), sans-serif">Vendor 02</text>
                        <text x="12" y="38" fontSize="8" fontWeight="600" fill="#64748b" fontFamily="var(--font-manrope), sans-serif">Design Freelancer</text>
                      </g>

                      {/* Vendor Node 3 */}
                      <g transform="translate(265, 40)">
                        <rect width="85" height="50" rx="8" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
                        <circle cx="16" cy="18" r="3.5" fill="#ef4444" />
                        <text x="26" y="21" fontSize="9" fontWeight="800" fill="#0e0e12" fontFamily="var(--font-manrope), sans-serif">Vendor 03</text>
                        <text x="12" y="38" fontSize="8" fontWeight="600" fill="#64748b" fontFamily="var(--font-manrope), sans-serif">Offshore Dev</text>
                      </g>
                    </svg>
                  </div>

                  {/* Bottom Text Content Area */}
                  <div className="schematic-panel__content">
                    <h4 className="schematic-panel__title">The Fragmented Multi-Vendor Model</h4>
                    <div className="schematic-panel__divider" aria-hidden="true" />
                    <p className="schematic-panel__desc">{activeDivision.whatWeDo.problem}</p>
                    <p className="schematic-panel__takeaway">
                      “{Array.isArray(activeDivision.coreDifferentiator.body)
                        ? activeDivision.coreDifferentiator.body[0]
                        : activeDivision.coreDifferentiator.text}”
                    </p>
                  </div>
                </div>

                {/* Card 2: THE INTEGRATED SOLUTION */}
                <div
                  className={`schematic-panel schematic-panel--solution division-overview__insight-card ${
                    overviewMode === 'unified'
                      ? 'schematic-panel--active-unified division-overview__insight-card--active division-overview__insight-card--unified'
                      : ''
                  }`}
                  onMouseEnter={() => setOverviewMode('unified')}
                  onClick={() => setOverviewMode('unified')}
                  tabIndex={0}
                  role="button"
                  aria-label="View Solution: The Flo Studios Integrated Model"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setOverviewMode('unified')
                    }
                  }}
                >
                  {/* Top Category Header Row */}
                  <div className="schematic-panel__header">
                    <span className="schematic-panel__category">The Integrated Solution</span>
                    <span className="schematic-panel__status-tag schematic-panel__status-tag--solution">
                      One Accountable Studio
                    </span>
                  </div>

                  {/* Center Visual Illustrator */}
                  <div className="schematic-panel__illustrator" aria-hidden="true">
                    <svg
                      viewBox="0 0 380 170"
                      className="schematic-panel__svg"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Top Status Pill */}
                      <g transform="translate(130, 18)">
                        <rect width="120" height="20" rx="10" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
                        <circle cx="12" cy="10" r="3" fill="#16a34a" />
                        <text x="65" y="13.5" textAnchor="middle" fill="#15803d" fontSize="7.5" fontWeight="800" fontFamily="var(--font-manrope), sans-serif">
                          UNBROKEN PIPELINE
                        </text>
                      </g>

                      {/* Continuous Smooth Backbone Line */}
                      <path
                        d="M 40 95 C 100 95, 120 62, 190 62 C 260 62, 280 95, 340 95"
                        stroke="#0e0e12"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Traveling Laser Pulse Signal */}
                      <path
                        d="M 40 95 C 100 95, 120 62, 190 62 C 260 62, 280 95, 340 95"
                        className="schematic-panel__laser"
                        stroke="#16a34a"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Station 01 */}
                      <g transform="translate(55, 95)">
                        <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#0e0e12" strokeWidth="2" />
                        <circle cx="0" cy="0" r="4.5" fill="#0e0e12" />
                        <text x="0" y="24" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0e0e12" fontFamily="var(--font-manrope), sans-serif">PRD</text>
                      </g>

                      {/* Station 02 */}
                      <g transform="translate(145, 68)">
                        <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#0e0e12" strokeWidth="2" />
                        <circle cx="0" cy="0" r="4.5" fill="#0e0e12" />
                        <text x="0" y="24" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0e0e12" fontFamily="var(--font-manrope), sans-serif">UI/UX</text>
                      </g>

                      {/* Station 03 */}
                      <g transform="translate(235, 68)">
                        <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#0e0e12" strokeWidth="2" />
                        <circle cx="0" cy="0" r="4.5" fill="#0e0e12" />
                        <text x="0" y="24" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0e0e12" fontFamily="var(--font-manrope), sans-serif">Build</text>
                      </g>

                      {/* Station 04 */}
                      <g transform="translate(325, 95)">
                        <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#0e0e12" strokeWidth="2" />
                        <circle cx="0" cy="0" r="4.5" fill="#0e0e12" />
                        <text x="0" y="24" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0e0e12" fontFamily="var(--font-manrope), sans-serif">Launch</text>
                      </g>
                    </svg>
                  </div>

                  {/* Bottom Text Content Area */}
                  <div className="schematic-panel__content">
                    <h4 className="schematic-panel__title">The Flo Studios Integrated Model</h4>
                    <div className="schematic-panel__divider" aria-hidden="true" />
                    <p className="schematic-panel__desc">{activeDivision.whatWeDo.solution}</p>
                    <p className="schematic-panel__takeaway schematic-panel__takeaway--highlight">
                      “{activeDivision.whatWeDo.philosophy ||
                        (Array.isArray(activeDivision.coreDifferentiator.body) && activeDivision.coreDifferentiator.body[1])}”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Stage-by-Stage Lifecycle Pipeline — Full Width Page Section */}
          <div className="division-pipeline teamwall-container" aria-label={activeDivision.pipelineTitle}>
            <div className="teamwall-inner">
              {/* Header Bar matching Image 1: Title(Count) on left, Category pills on right */}
              <div className="teamwall-header">
                <div className="teamwall-header__left">
                  <h3 className="teamwall-title">
                    {activeDivision.id === 'development' ? 'The Build Lifecycle' : 'The Pipeline'}
                    <span className="teamwall-title__count">({stages.length})</span>
                  </h3>
                </div>

                {categories.length > 1 && (
                  <div className="teamwall-filters" role="tablist" aria-label="Filter stages by phase">
                    {categories.map((cat) => {
                      const isCatActive = selectedCategory === cat
                      const count = cat === 'All' ? stages.length : stages.filter((s) => s.category === cat).length
                      return (
                        <button
                          key={cat}
                          type="button"
                          role="tab"
                          aria-selected={isCatActive}
                          className={`teamwall-filter-pill ${isCatActive ? 'teamwall-filter-pill--active' : ''}`}
                          onClick={() => {
                            setSelectedCategory(cat)
                            setActiveStageIndex(0)
                          }}
                        >
                          <span className="teamwall-filter-pill__label">{cat}</span>
                          <span className="teamwall-filter-pill__count">{count}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="teamwall-layout">
                {/* Left Column: 4-column Table matching Image 1 */}
                <div className="teamwall-roster" ref={rosterRef}>
                  <ul
                    className="teamwall-list"
                    role="tablist"
                    aria-label={`${activeDivision.name} stages`}
                    onMouseLeave={() => setHoveredRowIdx(null)}
                  >
                    {visibleStages.map((stage, sIdx) => {
                      const isLineActive = sIdx === (hoveredRowIdx !== null ? hoveredRowIdx : safeStageIndex)
                      const isActive = isLineActive
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
                              className="teamwall-bar"
                              transition={{ type: 'spring', stiffness: 500, damping: 38 }}
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
                            onClick={() => {
                              handleStageSelect(sIdx, true)
                            }}
                            onMouseEnter={() => {
                              setHoveredRowIdx(sIdx)
                              handleStageSelect(sIdx, false)
                            }}
                            onKeyDown={(e) => handleStageKeyDown(e, sIdx)}
                          >
                            <div className="teamwall-row__stage-wrap">
                              <span
                                className={`teamwall-row__arrow ${isActive ? 'teamwall-row__arrow--active' : ''}`}
                                aria-hidden="true"
                              >
                                →
                              </span>
                              <span className="teamwall-row__location">
                                {stage.location || `Stage ${stageNum}`}
                              </span>
                            </div>

                            <div className="teamwall-row__title-wrap">
                              <SlotText3D
                                text={stage.title}
                                isActive={isActive}
                                isHovered={hoveredRowIdx === sIdx}
                                className="teamwall-row__title"
                              />
                            </div>

                            <span className="teamwall-row__discipline">
                              {stage.discipline || 'Architecture'}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Right Column: Visual Photo Frame & Footer matching Image 1 */}
                <aside
                  className="teamwall-showcase teamwall-card"
                  id={`${id}-stage-panel`}
                  role="tabpanel"
                  aria-labelledby={`${id}-stage-btn-${safeStageIndex}`}
                >
                  <div className="teamwall-frame teamwall-frame--quote">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={`${activeDivision.id}-${currentStage.id || safeStageIndex}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="teamwall-quote-card"
                      >
                        <div className="teamwall-quote-card__body">
                          <p className="teamwall-quote-card__desc">
                            {`"${(currentStage.description || currentStage.desc || '').toUpperCase()}"`}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="teamwall-footer">
                    <div className="teamwall-footer__left">
                      <div className="teamwall-footer__counter">
                        <span className="teamwall-footer__curr">
                          <RollingNumber value={currentStage.number} />
                        </span>
                        <span className="teamwall-footer__sep">/ {String(stages.length).padStart(2, '0')}</span>
                      </div>
                      <span className="teamwall-footer__role">
                        {currentStage.discipline || currentStage.focus}
                      </span>
                    </div>

                    <div className="teamwall-footer__nav">
                      <button
                        type="button"
                        onClick={handlePrevStage}
                        className="teamwall-nav-btn"
                        aria-label="Previous stage"
                      >
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M14 9H4M8 5L4 9l4 4" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStage}
                        className="teamwall-nav-btn"
                        aria-label="Next stage"
                      >
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 9h10M10 5l4 4-4 4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>

          {/* Division Differentiator Quote & Contact CTA (Inverted Image 2 style) */}
          <div className="container services-section__container">
            <div className="division-quote-cta">
              <blockquote className="division-quote-cta__quote">
                “{activeDivision.coreDifferentiator.quote.replace(/^[“"]|[”"]$/g, '')}”
              </blockquote>
              <div className="division-quote-cta__action">
                <Link
                  to="/contact"
                  className="division-quote-cta__btn"
                  aria-label="Get in touch"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
