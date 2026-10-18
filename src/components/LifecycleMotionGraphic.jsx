import { memo } from 'react'
import './LifecycleMotionGraphic.css'

const STAGES_BY_DIVISION = {
  development: [
    { num: '01', title: 'PRD & Scope', x: 80, role: 'Product Strategy' },
    { num: '02', title: 'UI/UX Design', x: 300, role: 'Design Systems' },
    { num: '03', title: 'Engineering', x: 520, role: 'Full-Stack Code' },
    { num: '04', title: 'Market Launch', x: 740, role: 'Scale & Growth' }
  ],
  creator: [
    { num: '01', title: 'Diagnosis', x: 80, role: 'Channel Audit' },
    { num: '02', title: 'Script & Format', x: 300, role: 'Creative Ideation' },
    { num: '03', title: 'Production', x: 520, role: 'High-Retention Edit' },
    { num: '04', title: 'Distribution', x: 740, role: 'Multi-Platform' }
  ]
}

function LifecycleMotionGraphicComponent({ divisionId = 'development', mode = 'unified', onModeChange }) {
  const stages = STAGES_BY_DIVISION[divisionId] || STAGES_BY_DIVISION.development
  const isUnified = mode === 'unified'

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
          viewBox="0 0 820 126"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Subtle Drafting Grid Guidelines */}
          <line x1="30" y1="62" x2="790" y2="62" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="30" y1="24" x2="790" y2="24" stroke="rgba(0, 0, 0, 0.03)" strokeWidth="1" />
          <line x1="30" y1="100" x2="790" y2="100" stroke="rgba(0, 0, 0, 0.03)" strokeWidth="1" />

          {/* Precision Architectural Ruler Ticks Between Nodes */}
          {[135, 190, 245, 355, 410, 465, 575, 630, 685].map((tickX) => (
            <line
              key={`tick-${tickX}`}
              x1={tickX}
              y1="59"
              x2={tickX}
              y2="65"
              stroke="rgba(0, 0, 0, 0.12)"
              strokeWidth="1"
            />
          ))}

          {/* Node Vertical Alignment Guides & Crosshair Reticles */}
          {stages.map((stg) => (
            <g key={`cross-${stg.num}`}>
              <line
                x1={stg.x}
                y1="16"
                x2={stg.x}
                y2="108"
                stroke="rgba(0, 0, 0, 0.05)"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <path
                d={`M ${stg.x - 4} 16 H ${stg.x + 4} M ${stg.x} 12 V 20`}
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
                x1="80"
                y1="62"
                x2="740"
                y2="62"
                stroke="#0e0e12"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Hardware-Accelerated Dynamic Traveling Laser Pulse */}
              <line
                x1="80"
                y1="62"
                x2="740"
                y2="62"
                className="lmg-flowing-signal"
                stroke="#000000"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Glowing Pulse Laser Dot Traveling the Continuous Line */}
              <circle className="lmg-pulse-head" r="5" fill="#000000" />
            </g>
          ) : (
            /* ── FRACTURED MODE: Broken handoff gaps, severed lines ── */
            <g className="lmg-fracture-group">
              {/* Stage 1 to Stage 2: Fragmented Segment */}
              <line
                x1="80"
                y1="62"
                x2="300"
                y2="62"
                stroke="#6b7280"
                strokeWidth="2"
                strokeDasharray="5 4"
              />

              {/* Severed Drop Path Between Stage 2 and 3 */}
              <path
                d="M 300 62 C 345 62, 360 84, 385 84"
                stroke="#dc2626"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                fill="none"
              />
              <path
                d="M 435 40 C 460 40, 480 62, 520 62"
                stroke="#dc2626"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                fill="none"
              />

              {/* Stage 3 to Stage 4: Disconnected Remnant */}
              <line
                x1="520"
                y1="62"
                x2="740"
                y2="62"
                stroke="#9ca3af"
                strokeWidth="2"
                strokeDasharray="5 4"
              />

              {/* The Broken Handoff Warning Badge in the Gap */}
              <g transform="translate(410, 62)">
                <rect
                  x="-55"
                  y="-12"
                  width="110"
                  height="24"
                  rx="12"
                  fill="#ffffff"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                  className="lmg-fracture-badge-bg"
                />
                <circle cx="-38" cy="0" r="3.5" fill="#dc2626" />
                <text
                  x="6"
                  y="4"
                  textAnchor="middle"
                  fill="#dc2626"
                  fontSize="8"
                  fontWeight="800"
                  letterSpacing="0.08em"
                  fontFamily="var(--font-manrope), sans-serif"
                >
                  BROKEN HANDOFF
                </text>
              </g>
            </g>
          )}

          {/* Milestone Node Pins & Technical Typography */}
          {stages.map((stg, sIdx) => {
            const isFractureDropNode = !isUnified && sIdx === 1
            const isFractureLossNode = !isUnified && sIdx === 2
            return (
              <g key={stg.num} className="lmg-node-group">
                {/* Stage Number Above */}
                <text
                  x={stg.x}
                  y="42"
                  textAnchor="middle"
                  className="lmg-node-num"
                  fontFamily="var(--font-manrope), sans-serif"
                >
                  {stg.num}
                </text>

                {/* Node Outer Ring */}
                <circle
                  cx={stg.x}
                  cy="62"
                  r="7.5"
                  className={`lmg-node-ring ${
                    isFractureDropNode || isFractureLossNode ? 'lmg-node-ring--fracture' : ''
                  }`}
                />

                {/* Node Inner Core Dot */}
                <circle
                  cx={stg.x}
                  cy="62"
                  r="3.5"
                  className={`lmg-node-core ${
                    isFractureDropNode || isFractureLossNode ? 'lmg-node-core--fracture' : ''
                  }`}
                />

                {/* Stage Title Below */}
                <text
                  x={stg.x}
                  y="85"
                  textAnchor="middle"
                  className={`lmg-node-title ${
                    isFractureDropNode || isFractureLossNode ? 'lmg-node-title--fracture' : ''
                  }`}
                  fontFamily="var(--font-manrope), sans-serif"
                >
                  {stg.title}
                </text>

                {/* Discipline Tag Below */}
                <text
                  x={stg.x}
                  y="98"
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
