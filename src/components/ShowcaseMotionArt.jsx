import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import './BlogCardArt.css'
import './ShowcaseMotionArt.css'

// Animated vector motion graphic line art matching the /latest cover card aesthetic
const LOOP = { repeatCount: 'indefinite' }

function gearPath(cx, cy, rOut, rIn, teeth) {
  const step = (Math.PI * 2) / teeth
  let d = ''
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    const p = (r, o) => {
      const ang = a + o * step
      return `${(cx + r * Math.cos(ang)).toFixed(1)} ${(cy + r * Math.sin(ang)).toFixed(1)}`
    }
    d += `${i === 0 ? 'M' : 'L'}${p(rIn, 0)} L${p(rOut, 0.12)} L${p(rOut, 0.38)} L${p(rIn, 0.5)} `
  }
  return d + 'Z'
}

function DevScene() {
  return (
    <>
      {/* Viewport alignment coordinate markers */}
      <path className="s-dim" d="M10 18h6M10 18v-6M190 18h-6M190 18v-6M10 102h6M10 102v6M190 102h-6M190 102v6" />
      <path className="s-dim dash" d="M18 60H182" opacity="0.2" />

      {/* Node 1: Architecture Blueprint & Strategy (x=36, y=60) */}
      <rect x="22" y="46" width="28" height="28" rx="4" className="s-dim" />
      <circle cx="36" cy="60" r="10" className="s-main" />
      <circle className="s-hi" cx="36" cy="60" r="10">
        <animate attributeName="r" values="10;22" dur="3.2s" {...LOOP} />
        <animate attributeName="opacity" values="0.7;0" dur="3.2s" {...LOOP} />
      </circle>
      <circle cx="36" cy="60" r="3" className="fill-hi glow" />
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 36 60" to="360 36 60" dur="12s" {...LOOP} />
        <path className="s-dim" d="M36 46v28M22 60h28" />
      </g>
      <text x="36" y="86" textAnchor="middle" className="sc-svg-label">STAGE 01 // ARCH</text>

      {/* Node 2: Flo Cloud Engine (x=100, y=60) */}
      <g>
        <path className="s-main" d={gearPath(100, 60, 24, 18, 8)}>
          <animateTransform attributeName="transform" type="rotate" from="0 100 60" to="360 100 60" dur="16s" {...LOOP} />
        </path>
        <circle className="s-hi" cx="100" cy="60" r="11" />
        <path className="s-hi glow" d="M96 56l-4 4l4 4M104 56l4 4l-4 4" />
        <path className="s-dim" d="M101 54l-2 12" />
      </g>
      <circle className="s-hi" cx="100" cy="60" r="11">
        <animate attributeName="r" values="11;30" dur="3.2s" begin="1.2s" {...LOOP} />
        <animate attributeName="opacity" values="0.6;0" dur="3.2s" begin="1.2s" {...LOOP} />
      </circle>
      <text x="100" y="94" textAnchor="middle" className="sc-svg-label sc-svg-label--hi">ENGINE // 99.98%</text>

      {/* Node 3: Edge CDN & Production Cluster (x=164, y=60) */}
      <rect x="148" y="44" width="32" height="32" rx="4" className="s-dim" />
      <path className="s-main" d="M152 52h24M152 60h24M152 68h24" />
      <circle cx="156" cy="52" r="1.5" className="fill-hi glow">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" {...LOOP} />
      </circle>
      <circle cx="156" cy="60" r="1.5" className="fill-hi glow">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" {...LOOP} />
      </circle>
      <circle cx="156" cy="68" r="1.5" className="fill-hi glow">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" {...LOOP} />
      </circle>
      <path className="s-hi" d="M164 44v-8" />
      <circle cx="164" cy="34" r="2" className="fill-hi glow" />
      <path className="s-dim" d="M159 31a7 7 0 0 1 10 0M156 27a12 12 0 0 1 16 0" />
      <text x="164" y="86" textAnchor="middle" className="sc-svg-label">EDGE PROD // CDN</text>

      {/* Connecting Data Pipelines */}
      <path className="s-dim dash flow" d="M50 54 Q 72 32 100 46 T 148 50" />
      <path className="s-dim dash flow rev" d="M148 70 Q 126 88 100 74 T 50 66" />

      {/* Traveling Data Photon Packets */}
      <g className="glow">
        <circle className="fill-hi" r="2.4">
          <animateMotion path="M50 54 Q 72 32 100 46 T 148 50" dur="2.8s" {...LOOP} />
        </circle>
        <circle className="fill-hi" r="2.4">
          <animateMotion path="M50 54 Q 72 32 100 46 T 148 50" dur="2.8s" begin="1.4s" {...LOOP} />
        </circle>
        <circle className="fill-hi" r="2.2">
          <animateMotion path="M148 70 Q 126 88 100 74 T 50 66" dur="3.4s" {...LOOP} />
        </circle>
        <circle className="fill-hi" r="2.2">
          <animateMotion path="M148 70 Q 126 88 100 74 T 50 66" dur="3.4s" begin="1.7s" {...LOOP} />
        </circle>
      </g>

      {/* Twinkle Starbursts */}
      <g className="glow twinkle" style={{ transformOrigin: '72px 24px' }}>
        <path className="s-hi" d="M72 18l1.8 4.2L78 24l-4.2 1.8L72 30l-1.8-4.2L66 24l4.2-1.8z" />
      </g>
      <g className="glow twinkle" style={{ transformOrigin: '132px 24px', animationDelay: '1.2s' }}>
        <path className="s-hi" d="M132 18l1.8 4.2L138 24l-4.2 1.8L132 30l-1.8-4.2L126 24l4.2-1.8z" />
      </g>
    </>
  )
}

function CreatorScene() {
  const spectrumBars = [
    { x: 146, minH: 6, maxH: 16, dur: '1.1s' },
    { x: 152, minH: 10, maxH: 22, dur: '0.8s' },
    { x: 158, minH: 14, maxH: 26, dur: '1.3s' },
    { x: 164, minH: 8, maxH: 18, dur: '0.9s' },
    { x: 170, minH: 5, maxH: 12, dur: '1.2s' },
  ]

  return (
    <>
      {/* Viewfinder crosshairs and frame guides */}
      <path className="s-dim" d="M12 24V14H22M178 14H188V24M12 96V106H22M178 106H188V96" />
      <path className="s-dim" d="M96 60h8M100 56v8" opacity="0.35" />

      {/* Node 1: Cinema Film Reel Ingestion (x=40, y=60) */}
      <circle cx="40" cy="60" r="18" className="s-main" />
      <circle cx="40" cy="60" r="6" className="s-hi" />
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 40 60" to="360 40 60" dur="9s" {...LOOP} />
        <path className="s-dim" d="M40 42v36M22 60h36M27 47l26 26M27 73l26-26" />
        <circle cx="40" cy="48" r="2" className="s-hi" />
        <circle cx="52" cy="60" r="2" className="s-hi" />
        <circle cx="40" cy="72" r="2" className="s-hi" />
        <circle cx="28" cy="60" r="2" className="s-hi" />
      </g>
      <path className="s-dim dash flow" d="M40 78 C 50 88, 64 88, 76 74" />
      <text x="40" y="88" textAnchor="middle" className="sc-svg-label">RAW // 60FPS</text>

      {/* Node 2: Camera Aperture & 4K Master Cut Iris (x=100, y=60) */}
      <circle cx="100" cy="60" r="24" className="s-dim" />
      <circle cx="100" cy="60" r="20" className="s-main" />
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 100 60" to="-360 100 60" dur="20s" {...LOOP} />
        <path className="s-dim" d="M100 40 L115 50 L110 70 L90 70 L85 50 Z" />
        <circle cx="100" cy="60" r="9" className="s-main" />
      </g>
      <polygon points="98,55 98,65 106,60" className="fill-hi glow" />
      <circle className="s-hi" cx="100" cy="60" r="20">
        <animate attributeName="r" values="20;34" dur="2.8s" {...LOOP} />
        <animate attributeName="opacity" values="0.7;0" dur="2.8s" {...LOOP} />
      </circle>
      <text x="100" y="94" textAnchor="middle" className="sc-svg-label sc-svg-label--hi">MASTER CUT // 4K</text>

      {/* Node 3: Audio Spectrum & Master Sound Monitor (x=160, y=60) */}
      <rect x="140" y="44" width="40" height="32" rx="4" className="s-dim" />
      {spectrumBars.map((b, i) => (
        <rect key={i} x={b.x} y={60 - b.minH / 2} width="3" height={b.minH} rx="1" className="fill-hi glow">
          <animate
            attributeName="height"
            values={`${b.minH};${b.maxH};${b.minH}`}
            dur={b.dur}
            {...LOOP}
          />
          <animate
            attributeName="y"
            values={`${60 - b.minH / 2};${60 - b.maxH / 2};${60 - b.minH / 2}`}
            dur={b.dur}
            {...LOOP}
          />
        </rect>
      ))}
      <path className="s-hi glow" d="M140 60h40" opacity="0.4" />
      <text x="160" y="86" textAnchor="middle" className="sc-svg-label">AUDIO // +0dB</text>

      {/* Video & Audio Signal Highways */}
      <path className="s-dim dash flow" d="M58 52 Q 78 34 100 46 T 140 50" />
      <path className="s-dim dash flow rev" d="M140 70 Q 120 86 100 74 T 58 68" />

      {/* Traveling Signal Packets */}
      <g className="glow">
        <circle className="fill-hi" r="2.4">
          <animateMotion path="M58 52 Q 78 34 100 46 T 140 50" dur="2.6s" {...LOOP} />
        </circle>
        <circle className="fill-hi" r="2.2">
          <animateMotion path="M140 70 Q 120 86 100 74 T 58 68" dur="3.2s" {...LOOP} />
        </circle>
      </g>

      {/* Twinkle Starbursts */}
      <g className="glow twinkle" style={{ transformOrigin: '74px 24px' }}>
        <path className="s-hi" d="M74 18l1.8 4.2L80 24l-4.2 1.8L74 30l-1.8-4.2L68 24l4.2-1.8z" />
      </g>
      <g className="glow twinkle" style={{ transformOrigin: '126px 24px', animationDelay: '1.4s' }}>
        <path className="s-hi" d="M126 18l1.8 4.2L132 24l-4.2 1.8L126 30l-1.8-4.2L120 24l4.2-1.8z" />
      </g>
    </>
  )
}

export default function ShowcaseMotionArt({ division = 'development' }) {
  const isDev = division === 'development'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const onScreen = useInView(ref, { margin: '100px' })

  // Pause SMIL calculations when scrolled off screen to keep idle GPU/CPU low
  useEffect(() => {
    const svg = ref.current
    if (!svg || !svg.pauseAnimations) return
    if (onScreen) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [onScreen])

  return (
    <div className="showcase-motion-card">
      <div className="showcase-motion-card__top">
        <div className="showcase-motion-card__dots">
          <span className="sc-dot red" />
          <span className="sc-dot yellow" />
          <span className="sc-dot green" />
          <span className="showcase-motion-card__route">
            {isDev ? 'flostudios.co/platform' : 'flostudios.co/studio'}
          </span>
        </div>
        <span className={`showcase-motion-card__badge ${isDev ? 'showcase-motion-card__badge--dev' : 'showcase-motion-card__badge--creator'}`}>
          {isDev ? 'STAGE 01 → 11' : 'REC ● 60FPS'}
        </span>
      </div>

      <div className="showcase-motion-card__canvas">
        <svg
          ref={ref}
          className={`blog-card-art showcase-motion-card__svg${inView ? ' is-in' : ''}${onScreen ? '' : ' is-paused'}`}
          viewBox="0 0 200 120"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          {isDev ? <DevScene /> : <CreatorScene />}
        </svg>
      </div>

      <div className="showcase-motion-card__bottom">
        <span className="showcase-motion-card__cmd">
          {isDev ? '$ flo deploy --production --zero-downtime' : '$ flo render --export 4k-master-v1'}
        </span>
        <div className="showcase-motion-card__metrics">
          <span className="showcase-motion-card__metric-tag">
            {isDev ? '+148% Conversion' : '+86% Retention'}
          </span>
          <span className={`showcase-motion-card__metric-tag ${isDev ? 'showcase-motion-card__metric-tag--dev' : 'showcase-motion-card__metric-tag--creator'}`}>
            {isDev ? '18ms Latency' : 'Multi-Platform'}
          </span>
        </div>
      </div>
    </div>
  )
}
