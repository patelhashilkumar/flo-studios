import { memo } from 'react'
import { getDivisionById } from '../data/divisionsData.js'
import './LifecycleMotionGraphic.css'

function formatStageTitle(title) {
  const breaks = {
    // Development 11 Stages (Verbatim from Frame 6 / User Image 2)
    'Requirements & Product Planning': ['Requirements &', 'Product Planning'],
    'Market & Technical Research': ['Market & Technical', 'Research'],
    'Estimation, Proposal & Project Setup': ['Estimation, Proposal', '& Project Setup'],
    'UI/UX Design': ['UI/UX Design'],
    'Technical Architecture & Development Planning': ['Tech Architecture', '& Dev Planning'],
    'Development': ['Development'],
    'QA & Testing': ['QA & Testing'],
    'Pre-Launch / Release Preparation': ['Pre-Launch /', 'Release Prep'],
    'Deployment & Launch': ['Deployment', '& Launch'],
    'Post-Launch Support & Maintenance': ['Post-Launch Support', '& Maintenance'],
    'Optimization & Continuous Development': ['Optimization &', 'Continuous Dev'],

    // Creator 8 Stages
    'Ideation & Format Development': ['Ideation & Format', 'Development'],
    'Scripting': ['Scripting'],
    'Storyboarding': ['Storyboarding'],
    'Post-Production Editing': ['Post-Production', 'Editing'],
    'Sound Design': ['Sound Design'],
    'Packaging Design': ['Packaging Design'],
    'Multi-Platform Distribution Planning': ['Multi-Platform', 'Distribution Plan'],
    'Specialized Analysis': ['Specialized', 'Analysis']
  }

  if (breaks[title]) return breaks[title]
  if (title.length <= 16) return [title]
  const words = title.split(' ')
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

function getFormattedStages(stagesProp, divisionId) {
  const rawStages =
    stagesProp && stagesProp.length > 0
      ? stagesProp
      : getDivisionById(divisionId)?.stages || []

  const startX = 54
  const endX = 1086
  const count = rawStages.length
  const stepX = count > 1 ? (endX - startX) / (count - 1) : 0

  return rawStages.map((stg, idx) => {
    const x = Math.round(startX + idx * stepX)
    const num = stg.number || stg.num || String(idx + 1).padStart(2, '0')
    const title = stg.title || ''
    const role = stg.discipline || stg.role || ''
    const titleLines = formatStageTitle(title)

    return {
      num,
      title,
      titleLines,
      role,
      x
    }
  })
}

function LifecycleMotionGraphicComponent({
  divisionId = 'development',
  stages: stagesProp,
  mode = 'unified',
  onModeChange
}) {
  const stages = getFormattedStages(stagesProp, divisionId)
  const isUnified = mode === 'unified'
  const count = stages.length

  const startX = stages[0]?.x ?? 54
  const endX = stages[count - 1]?.x ?? 1086

  // Multi-vendor fracture break points (calibrated to stage count)
  const dropIdx1 = count >= 10 ? 2 : 1 // Between Discovery and Design
  const dropIdx2 = count >= 10 ? 4 : 3 // Between Architecture and Development
  const dropIdx3 = count >= 10 ? 7 : 5 // Between Pre-Launch and Launch

  const p0 = stages[0]?.x ?? startX
  const pDrop1 = stages[dropIdx1]?.x ?? 260
  const pResume1 = stages[dropIdx1 + 1]?.x ?? 363

  const pDrop2 = stages[dropIdx2]?.x ?? 466
  const pResume2 = stages[dropIdx2 + 1]?.x ?? 570

  const pDrop3 = stages[dropIdx3]?.x ?? 777
  const pResume3 = stages[dropIdx3 + 1]?.x ?? 881
  const pEnd = stages[count - 1]?.x ?? endX

  return (
    <div
      className={`lmg-container ${isUnified ? 'lmg-container--unified' : 'lmg-container--fracture'}`}
      role="region"
      aria-label="Lifecycle Pipeline Architecture"
    >
      {/* Schematic Meta Header & Controls */}
      <div className="lmg-header">
        <div className="lmg-controls" role="group" aria-label="Pipeline Architecture View">
          <button
            type="button"
            className={`lmg-pill ${isUnified ? 'lmg-pill--active-unified' : ''}`}
            onClick={() => onModeChange && onModeChange('unified')}
            aria-pressed={isUnified}
          >
            <span className="lmg-pill__dot lmg-pill__dot--unified" aria-hidden="true" />
            <span>Flo Unified Pipeline</span>
          </button>
          <button
            type="button"
            className={`lmg-pill ${!isUnified ? 'lmg-pill--active-fracture' : ''}`}
            onClick={() => onModeChange && onModeChange('fracture')}
            aria-pressed={!isUnified}
          >
            <span className="lmg-pill__dot lmg-pill__dot--fracture" aria-hidden="true" />
            <span>Multi-Vendor Handoffs</span>
          </button>
        </div>

        <div className="lmg-meta-status">
          <span className="lmg-metric-tag" aria-live="polite">
            {isUnified ? '0 Hand-off Loss' : 'Severe Fracture'}
          </span>
          <span className="lmg-metric-badge">
            {isUnified ? 'UNBROKEN PIPELINE' : 'LOST CONTEXT'}
          </span>
        </div>
      </div>

      {/* Vector Line Art SVG Schematic (Full-Width Precision Drafting) */}
      <div className="lmg-canvas-wrap">
        <svg
          className="lmg-canvas"
          viewBox="0 0 1140 114"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Subtle Drafting Grid Guidelines */}
          <line x1="20" y1="48" x2="1120" y2="48" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="20" y1="18" x2="1120" y2="18" stroke="rgba(0, 0, 0, 0.03)" strokeWidth="1" />
          <line x1="20" y1="96" x2="1120" y2="96" stroke="rgba(0, 0, 0, 0.03)" strokeWidth="1" />

          {/* Precision Architectural Ruler Ticks Between Nodes */}
          {stages.slice(0, -1).map((stg, idx) => {
            const nextStg = stages[idx + 1]
            const midX = Math.round((stg.x + nextStg.x) / 2)
            return (
              <line
                key={`tick-${idx}`}
                x1={midX}
                y1="45"
                x2={midX}
                y2="51"
                stroke="rgba(0, 0, 0, 0.12)"
                strokeWidth="1"
              />
            )
          })}

          {/* Node Vertical Alignment Guides & Crosshair Reticles */}
          {stages.map((stg) => (
            <g key={`cross-${stg.num}`}>
              <line
                x1={stg.x}
                y1="12"
                x2={stg.x}
                y2="98"
                stroke="rgba(0, 0, 0, 0.04)"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <path
                d={`M ${stg.x - 3} 14 H ${stg.x + 3} M ${stg.x} 11 V 17`}
                stroke="rgba(0, 0, 0, 0.2)"
                strokeWidth="1"
              />
            </g>
          ))}

          {isUnified ? (
            /* ── UNIFIED MODE: Unbroken, continuous precision circuit ── */
            <g className="lmg-unified-group">
              {/* Main Structural Continuous Backbone Line */}
              <line
                x1={startX}
                y1="48"
                x2={endX}
                y2="48"
                stroke="#0e0e12"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Hardware-Accelerated Dynamic Traveling Laser Pulse */}
              <line
                x1={startX}
                y1="48"
                x2={endX}
                y2="48"
                className="lmg-flowing-signal"
                stroke="#000000"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Glowing Pulse Laser Dot Traveling the Continuous Line */}
              <circle className="lmg-pulse-head" cx="0" cy="48" r="4.5" fill="#000000" />
            </g>
          ) : (
            /* ── FRACTURED MODE: Multi-vendor handoff gaps & severed lines ── */
            <g className="lmg-fracture-group">
              {/* Segment 1: Initial Discovery / Scoping */}
              <line
                x1={p0}
                y1="48"
                x2={pDrop1}
                y2="48"
                stroke="#6b7280"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Gap 1: Discovery to Design Drop */}
              <path
                d={`M ${pDrop1} 48 C ${pDrop1 + 22} 48, ${pDrop1 + 32} 64, ${pDrop1 + 44} 64`}
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="4 3"
                fill="none"
              />
              <path
                d={`M ${pResume1 - 44} 32 C ${pResume1 - 32} 32, ${pResume1 - 22} 48, ${pResume1} 48`}
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="4 3"
                fill="none"
              />
              <g transform={`translate(${(pDrop1 + pResume1) / 2}, 48)`}>
                <rect
                  x="-28"
                  y="-9"
                  width="56"
                  height="18"
                  rx="9"
                  fill="#ffffff"
                  stroke="#dc2626"
                  strokeWidth="1.2"
                />
                <circle cx="-18" cy="0" r="2.5" fill="#dc2626" />
                <text
                  x="4"
                  y="3"
                  textAnchor="middle"
                  fill="#dc2626"
                  fontSize="6.5"
                  fontWeight="800"
                  fontFamily="var(--font-manrope), sans-serif"
                >
                  HANDOFF
                </text>
              </g>

              {/* Segment 2: Design to Architecture */}
              <line
                x1={pResume1}
                y1="48"
                x2={pDrop2}
                y2="48"
                stroke="#6b7280"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Gap 2: Architecture to Dev Severed Gap (The Core Breakdown) */}
              <path
                d={`M ${pDrop2} 48 C ${pDrop2 + 25} 48, ${pDrop2 + 35} 66, ${pDrop2 + 48} 66`}
                stroke="#dc2626"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                fill="none"
              />
              <path
                d={`M ${pResume2 - 48} 30 C ${pResume2 - 35} 30, ${pResume2 - 25} 48, ${pResume2} 48`}
                stroke="#dc2626"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                fill="none"
              />
              <g transform={`translate(${(pDrop2 + pResume2) / 2}, 48)`}>
                <rect
                  x="-42"
                  y="-10"
                  width="84"
                  height="20"
                  rx="10"
                  fill="#ffffff"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                  className="lmg-fracture-badge-bg"
                />
                <circle cx="-28" cy="0" r="3" fill="#dc2626" />
                <text
                  x="5"
                  y="3.5"
                  textAnchor="middle"
                  fill="#dc2626"
                  fontSize="7"
                  fontWeight="800"
                  letterSpacing="0.04em"
                  fontFamily="var(--font-manrope), sans-serif"
                >
                  BROKEN HANDOFF
                </text>
              </g>

              {/* Segment 3: Development to Testing / Pre-Launch */}
              <line
                x1={pResume2}
                y1="48"
                x2={pDrop3}
                y2="48"
                stroke="#6b7280"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Gap 3: Pre-Launch to Production Launch Handoff */}
              <path
                d={`M ${pDrop3} 48 C ${pDrop3 + 22} 48, ${pDrop3 + 32} 64, ${pDrop3 + 44} 64`}
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="4 3"
                fill="none"
              />
              <path
                d={`M ${pResume3 - 44} 32 C ${pResume3 - 32} 32, ${pResume3 - 22} 48, ${pResume3} 48`}
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="4 3"
                fill="none"
              />
              <g transform={`translate(${(pDrop3 + pResume3) / 2}, 48)`}>
                <rect
                  x="-34"
                  y="-9"
                  width="68"
                  height="18"
                  rx="9"
                  fill="#ffffff"
                  stroke="#dc2626"
                  strokeWidth="1.2"
                />
                <circle cx="-22" cy="0" r="2.5" fill="#dc2626" />
                <text
                  x="4"
                  y="3"
                  textAnchor="middle"
                  fill="#dc2626"
                  fontSize="6.5"
                  fontWeight="800"
                  fontFamily="var(--font-manrope), sans-serif"
                >
                  LOST CONTEXT
                </text>
              </g>

              {/* Segment 4: Launch to Scale */}
              <line
                x1={pResume3}
                y1="48"
                x2={pEnd}
                y2="48"
                stroke="#9ca3af"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            </g>
          )}

          {/* Milestone Node Pins & Technical Typography across ALL stages */}
          {stages.map((stg, sIdx) => {
            const isFractureDropNode =
              !isUnified && (sIdx === dropIdx1 || sIdx === dropIdx2 || sIdx === dropIdx3)
            return (
              <g key={stg.num} className="lmg-node-group">
                {/* Stage Number Above Node */}
                <text
                  x={stg.x}
                  y="33"
                  textAnchor="middle"
                  className="lmg-node-num"
                  fontFamily="var(--font-manrope), sans-serif"
                >
                  {stg.num}
                </text>

                {/* Node Outer Ring */}
                <circle
                  cx={stg.x}
                  cy="48"
                  r="6.5"
                  className={`lmg-node-ring ${isFractureDropNode ? 'lmg-node-ring--fracture' : ''}`}
                />

                {/* Node Inner Core Dot */}
                <circle
                  cx={stg.x}
                  cy="48"
                  r="3"
                  className={`lmg-node-core ${isFractureDropNode ? 'lmg-node-core--fracture' : ''}`}
                />

                {/* Stage Title Below Node (Split neatly across lines if long) */}
                <text
                  x={stg.x}
                  y="66"
                  textAnchor="middle"
                  className={`lmg-node-title ${isFractureDropNode ? 'lmg-node-title--fracture' : ''}`}
                  fontFamily="var(--font-manrope), sans-serif"
                >
                  {stg.titleLines.map((line, lIdx) => (
                    <tspan key={lIdx} x={stg.x} dy={lIdx === 0 ? 0 : 10}>
                      {line}
                    </tspan>
                  ))}
                </text>

                {/* Discipline Tag Below Title */}
                <text
                  x={stg.x}
                  y={stg.titleLines.length > 1 ? '89' : '79'}
                  textAnchor="middle"
                  className="lmg-node-role"
                  fontFamily="var(--font-manrope), sans-serif"
                >
                  {stg.role}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Explanatory Outcome Sub-Banner */}
      <div className="lmg-status-strip">
        {isUnified ? (
          <p className="lmg-status-text lmg-status-text--unified">
            <span className="lmg-status-bullet" aria-hidden="true" />
            <span>
              <strong>Single Accountability:</strong> Same team carries initial product PRD through engineering to live launch.
            </span>
          </p>
        ) : (
          <p className="lmg-status-text lmg-status-text--fracture">
            <span className="lmg-status-bullet lmg-status-bullet--alert" aria-hidden="true" />
            <span>
              <strong>Broken Handoffs:</strong> Freelancer chain drops technical context, stalls timeline, and forces rebuilds.
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

const LifecycleMotionGraphic = memo(LifecycleMotionGraphicComponent)
export default LifecycleMotionGraphic
