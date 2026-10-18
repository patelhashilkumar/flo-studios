import { memo } from 'react'
import './LifecycleMotionGraphic.css'

const STAGES_BY_DIVISION = {
  development: [
    { num: '01', title: 'PRD & Scope', x: 40 },
    { num: '02', title: 'UI/UX Design', x: 154 },
    { num: '03', title: 'Engineering', x: 268 },
    { num: '04', title: 'Market Launch', x: 382 }
  ],
  creator: [
    { num: '01', title: 'Diagnosis', x: 40 },
    { num: '02', title: 'Script & Format', x: 154 },
    { num: '03', title: 'Production', x: 268 },
    { num: '04', title: 'Distribution', x: 382 }
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
      {/* Interactive Mode Control Switcher */}
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

        <span className="lmg-metric-tag" aria-live="polite">
          {isUnified ? '0 Hand-off Loss' : 'Severe Fracture'}
        </span>
      </div>

      {/* Vector Line Art SVG Schematic */}
      <div className="lmg-canvas-wrap">
        <svg
          className="lmg-canvas"
          viewBox="0 0 422 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Subtle Grid Guidelines */}
          <line x1="20" y1="56" x2="402" y2="56" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="20" y1="24" x2="402" y2="24" stroke="rgba(0, 0, 0, 0.03)" strokeWidth="1" />
          <line x1="20" y1="88" x2="402" y2="88" stroke="rgba(0, 0, 0, 0.03)" strokeWidth="1" />

          {/* Node Vertical Alignment Guides & Crosshairs */}
          {stages.map((stg) => (
            <g key={`cross-${stg.num}`}>
              <line
                x1={stg.x}
                y1="18"
                x2={stg.x}
                y2="92"
                stroke="rgba(0, 0, 0, 0.04)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <path
                d={`M ${stg.x - 3} 18 H ${stg.x + 3} M ${stg.x} 15 V 21`}
                stroke="rgba(0, 0, 0, 0.15)"
                strokeWidth="1"
              />
            </g>
          ))}

          {isUnified ? (
            /* ── UNIFIED MODE: Unbroken, continuous precision circuit ── */
            <g className="lmg-unified-group">
              {/* Main Structural Continuous Backbone Line */}
              <line
                x1="40"
                y1="56"
                x2="382"
                y2="56"
                stroke="#0e0e12"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Hardware-Accelerated Dynamic Traveling Pulse Overlay */}
              <line
                x1="40"
                y1="56"
                x2="382"
                y2="56"
                className="lmg-flowing-signal"
                stroke="#000000"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Glowing Pulse Laser Dot Traveling the Continuous Line */}
              <circle className="lmg-pulse-head" r="4.5" fill="#000000" />
            </g>
          ) : (
            /* ── FRACTURED MODE: Broken handoff gaps, severed lines ── */
            <g className="lmg-fracture-group">
              {/* Stage 1 to Stage 2: Fragmented Segment */}
              <line
                x1="40"
                y1="56"
                x2="154"
                y2="56"
                stroke="#6b7280"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Severed Drop Path Between Stage 2 and 3 */}
              <path
                d="M 154 56 C 180 56, 185 74, 202 74"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="4 3"
                fill="none"
              />
              <path
                d="M 220 38 C 238 38, 245 56, 268 56"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="4 3"
                fill="none"
              />

              {/* Stage 3 to Stage 4: Disconnected Remnant */}
              <line
                x1="268"
                y1="56"
                x2="382"
                y2="56"
                stroke="#9ca3af"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* The Broken Handoff Warning Badge in the Gap */}
              <g transform="translate(211, 56)">
                <rect
                  x="-38"
                  y="-11"
                  width="76"
                  height="22"
                  rx="11"
                  fill="#ffffff"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                  className="lmg-fracture-badge-bg"
                />
                <circle cx="-26" cy="0" r="3" fill="#dc2626" />
                <text
                  x="4"
                  y="3.5"
                  textAnchor="middle"
                  fill="#dc2626"
                  fontSize="7.5"
                  fontWeight="800"
                  letterSpacing="0.08em"
                  fontFamily="var(--font-manrope), sans-serif"
                >
                  HANDOFF GAP
                </text>
              </g>
            </g>
          )}

          {/* Milestone Node Pins & Typography */}
          {stages.map((stg, sIdx) => {
            const isFractureDropNode = !isUnified && sIdx === 1
            const isFractureLossNode = !isUnified && sIdx === 2
            return (
              <g key={stg.num} className="lmg-node-group">
                {/* Stage Number Above */}
                <text
                  x={stg.x}
                  y="38"
                  textAnchor="middle"
                  className="lmg-node-num"
                  fontFamily="var(--font-manrope), sans-serif"
                >
                  {stg.num}
                </text>

                {/* Node Outer Ring */}
                <circle
                  cx={stg.x}
                  cy="56"
                  r="7"
                  className={`lmg-node-ring ${
                    isFractureDropNode || isFractureLossNode ? 'lmg-node-ring--fracture' : ''
                  }`}
                />

                {/* Node Inner Core Dot */}
                <circle
                  cx={stg.x}
                  cy="56"
                  r="3"
                  className={`lmg-node-core ${
                    isFractureDropNode || isFractureLossNode ? 'lmg-node-core--fracture' : ''
                  }`}
                />

                {/* Stage Title Below */}
                <text
                  x={stg.x}
                  y="78"
                  textAnchor="middle"
                  className={`lmg-node-title ${
                    isFractureDropNode || isFractureLossNode ? 'lmg-node-title--fracture' : ''
                  }`}
                  fontFamily="var(--font-manrope), sans-serif"
                >
                  {stg.title}
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
            <strong>Single Accountability:</strong> Same team carries initial product PRD through engineering to live launch.
          </p>
        ) : (
          <p className="lmg-status-text lmg-status-text--fracture">
            <span className="lmg-status-bullet lmg-status-bullet--alert" aria-hidden="true" />
            <strong>Broken Handoffs:</strong> Freelancer chain drops technical context, stalls timeline, and forces rebuilds.
          </p>
        )}
      </div>
    </div>
  )
}

const LifecycleMotionGraphic = memo(LifecycleMotionGraphicComponent)
export default LifecycleMotionGraphic
