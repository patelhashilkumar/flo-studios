import { useEffect, useId, useRef } from 'react'
import { useInView } from 'framer-motion'
import './BlogCardArt.css'

/**
 * Animated line illustrations for each blog card (200x120 canvas).
 * Draw-in is CSS (.dr, pathLength=1); the looping behaviour is SMIL so each
 * scene can tell its own small story: handoff, blink, untangle, launch…
 *
 * Classes: s-dim / s-main / s-hi set stroke weight, glow adds a soft halo.
 */

const LOOP = { repeatCount: 'indefinite' }
const EASE = '0.45 0 0.2 1'

// Decaying wave for the consistency scene
function decayWave() {
  const pts = []
  for (let i = 0; i <= 140; i++) {
    const x = 14 + (i / 140) * 172
    const t = i / 140
    const amp = 44 * Math.pow(1 - t, 1.6) + 1.5
    const y = 60 - amp * Math.sin(i * 0.55)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}
const WAVE = decayWave()

function envelope(sign) {
  const pts = []
  for (let i = 0; i <= 40; i++) {
    const t = i / 40
    const x = 14 + t * 172
    const amp = 44 * Math.pow(1 - t, 1.6) + 1.5
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${(60 + sign * amp).toFixed(1)}`)
  }
  return pts.join(' ')
}

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

/* Draw-in helper: delay in seconds */
const Dr = ({ d, delay = 0, cls = 's-main', ...rest }) => (
  <path className={`dr ${cls}`} d={d} pathLength="1" style={{ '--d': `${delay}s` }} {...rest} />
)

/* ─────────────────────────── scenes ─────────────────────────── */

// 01 — a baton passed along people until it fades before reaching anyone
function Handoff() {
  const xs = [28, 78, 128]
  return (
    <>
      {xs.map((x, i) => (
        <g key={x}>
          <circle className="dr s-main" cx={x} cy="60" r="15" pathLength="1" style={{ '--d': `${i * 0.2}s` }} />
          <circle className="s-hi" cx={x} cy="54" r="3.6" />
          <path className="s-hi" d={`M${x - 8} 69 q8 -12 16 0`} />
          <circle className="s-hi ripple" cx={x} cy="60" r="15">
            <animate attributeName="r" values="15;26" dur="4s" begin={`${0.2 + i * 1.1}s`} {...LOOP} />
            <animate attributeName="opacity" values="0.7;0" dur="4s" begin={`${0.2 + i * 1.1}s`} {...LOOP} />
          </circle>
        </g>
      ))}
      <Dr d="M43 60H63M93 60H113" delay={0.5} />
      <path className="s-dim dash" d="M143 60H163" />

      {/* the ownerless endpoint */}
      <g>
        <circle className="s-main" cx="178" cy="60" r="15" strokeDasharray="3 4">
          <animateTransform attributeName="transform" type="rotate" from="0 178 60" to="360 178 60" dur="14s" {...LOOP} />
        </circle>
        <path className="s-hi" d="M172 55c0-7 12-7 12 0c0 4-6 4-6 9M178 70v.1">
          <animate attributeName="opacity" values="1;0.35;1" dur="2.4s" {...LOOP} />
        </path>
      </g>

      {/* baton */}
      <g className="glow">
        <circle className="fill-hi" r="3.4">
          <animateMotion path="M28 60H160" dur="4s" keyPoints="0;1" keyTimes="0;1" calcMode="linear" {...LOOP} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.7;1" dur="4s" {...LOOP} />
        </circle>
      </g>
    </>
  )
}

// 02 — an eye that looks around, blinks and weighs things up
function Taste({ uid }) {
  const open = 'M20 60C52 22 148 22 180 60C148 98 52 98 20 60Z'
  const shut = 'M20 60C52 58 148 58 180 60C148 62 52 62 20 60Z'
  const blink = `${open};${open};${shut};${open};${open}`
  return (
    <>
      <defs>
        <clipPath id={`${uid}-eye`}>
          <path d={open}>
            <animate attributeName="d" values={blink} keyTimes="0;0.78;0.84;0.9;1" dur="6s" {...LOOP} />
          </path>
        </clipPath>
      </defs>
      <path className="s-main" d={open}>
        <animate attributeName="d" values={blink} keyTimes="0;0.78;0.84;0.9;1" dur="6s" {...LOOP} />
      </path>
      <g clipPath={`url(#${uid}-eye)`}>
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0;-18 -2;-18 -2;16 2;16 2;0 0"
            keyTimes="0;0.2;0.38;0.6;0.8;1"
            dur="6s"
            calcMode="spline"
            keySplines={`${EASE};${EASE};${EASE};${EASE};${EASE}`}
            {...LOOP}
          />
          <circle className="s-hi glow" cx="100" cy="60" r="22" />
          <circle className="s-dim" cx="100" cy="60" r="15" strokeDasharray="2 3">
            <animateTransform attributeName="transform" type="rotate" from="0 100 60" to="-360 100 60" dur="9s" {...LOOP} />
          </circle>
          <circle className="fill-hi" cx="100" cy="60" r="6.5" />
          <circle className="cut" cx="104" cy="55" r="2" opacity="0.85" />
        </g>
      </g>
      {[-1, 0, 1].map((k) => (
        <path key={k} className="s-dim" d={`M${100 + k * 22} ${24 - Math.abs(k) * -2 - 6}l${k * 3} -8`} />
      ))}
      <g className="glow twinkle" style={{ transformOrigin: '160px 26px' }}>
        <path className="s-hi" d="M160 16l2.6 7.4L170 26l-7.4 2.6L160 36l-2.6-7.4L150 26l7.4-2.6z" />
      </g>
    </>
  )
}

// 03 — a knot of ambiguity that untangles into a single clear line
function Clarity() {
  const T = 'M14 60C34 0 60 120 80 50C90 10 40 90 76 76C100 66 90 20 118 54C134 74 150 50 186 60'
  const S = 'M14 60C34 60 60 60 80 60C90 60 40 60 76 60C100 60 90 60 118 60C134 60 150 60 186 60'
  const vals = `${T};${T};${S};${S};${T}`
  const splines = `${EASE};${EASE};0 0 1 1;${EASE}`
  return (
    <>
      <path className="s-dim dash" d="M14 38H186M14 82H186" />
      <path className="s-dim" d={T} opacity="0.35">
        <animate attributeName="d" values={vals} keyTimes="0;0.12;0.5;0.86;1" dur="7s" calcMode="spline" keySplines={splines} begin="0.35s" {...LOOP} />
      </path>
      <path className="s-hi glow" d={T}>
        <animate attributeName="d" values={vals} keyTimes="0;0.12;0.5;0.86;1" dur="7s" calcMode="spline" keySplines={splines} {...LOOP} />
      </path>
      <path className="s-hi glow" d="M174 49L188 60L174 71" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.55;0.86;1" dur="7s" {...LOOP} />
      </path>
    </>
  )
}

// 04 — launch spike, the quiet valley, then a real climb
function Gap() {
  const P = 'M14 98C28 98 34 18 52 18C70 18 74 98 98 98C112 98 114 98 126 98C146 98 152 44 186 22'
  return (
    <>
      <path className="s-dim" d="M14 106H186M14 106V12" />
      {[40, 70, 100, 130, 160].map((x) => (
        <path key={x} className="s-dim" d={`M${x} 106v4`} />
      ))}
      <path className="s-dim dash flow" d="M98 24V100M126 24V100" />
      <path className="s-dim" d="M101 30H123M104 27l-3 3l3 3M120 27l3 3l-3 3" />
      <path className="s-dim" d={P} opacity="0.3" />
      <path className="s-hi glow trace" d={P} pathLength="1" />
      <g className="glow">
        <circle className="fill-hi" r="3.4">
          <animateMotion path={P} dur="6s" keyPoints="0;1;1" keyTimes="0;0.62;1" calcMode="linear" {...LOOP} />
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.62;0.72;1" dur="6s" {...LOOP} />
        </circle>
        <circle className="s-hi" r="3.4">
          <animateMotion path={P} dur="6s" keyPoints="0;1;1" keyTimes="0;0.62;1" calcMode="linear" {...LOOP} />
          <animate attributeName="r" values="3.4;11" dur="1.2s" {...LOOP} />
          <animate attributeName="opacity" values="0.7;0" dur="1.2s" {...LOOP} />
        </circle>
      </g>
    </>
  )
}

// 05 — a spec sheet being written, line by line, by a pencil
function Brief() {
  const lines = [
    { y: 52, x2: 126 },
    { y: 66, x2: 132 },
    { y: 80, x2: 108 },
    { y: 94, x2: 128 },
  ]
  const T = 6
  const starts = [0.5, 1.6, 2.7, 3.8]
  const tl = (i) => {
    const s = starts[i] / T
    const e = (starts[i] + 0.9) / T
    return { s, e }
  }
  const pencilVals = []
  const pencilTimes = []
  lines.forEach((l, i) => {
    const { s, e } = tl(i)
    pencilVals.push(`72 ${l.y}`, `${l.x2} ${l.y}`)
    pencilTimes.push(s, e)
  })
  pencilVals.push('172 70', '172 70', '72 52')
  pencilTimes.push(0.9, 0.96, 1)
  const first = pencilTimes[0]
  pencilVals.unshift('172 70')
  pencilTimes.unshift(0)
  pencilTimes[1] = Math.max(first, 0.05)
  // monotonic guard
  for (let i = 1; i < pencilTimes.length; i++) {
    if (pencilTimes[i] <= pencilTimes[i - 1]) pencilTimes[i] = pencilTimes[i - 1] + 0.001
  }
  pencilTimes[pencilTimes.length - 1] = 1
  return (
    <>
      <Dr d="M56 10H124L148 34V110H56Z" />
      <Dr d="M124 10V34H148" delay={0.3} />
      <path className="s-hi glow" d="M68 24H100" />
      {lines.map((l, i) => (
        <path key={l.y} className="s-hi" d={`M72 ${l.y}H${l.x2}`} pathLength="1" strokeDasharray="1" strokeDashoffset="1">
          <animate
            attributeName="stroke-dashoffset"
            values="1;1;0;0;1"
            keyTimes={`0;${tl(i).s};${tl(i).e};0.93;1`}
            dur={`${T}s`}
            {...LOOP}
          />
        </path>
      ))}
      <g className="glow">
        <path className="s-hi" d="M0 0L5 -9L17 -21L23 -15L11 -3Z M5 -9L11 -3" transform="translate(172 70)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values={pencilVals.join(';')}
            keyTimes={pencilTimes.map((t) => t.toFixed(3)).join(';')}
            dur={`${T}s`}
            {...LOOP}
          />
        </path>
      </g>
      <path className="s-dim" d="M36 14v-6h6M170 14v-6h-6M36 108v6h6M170 108v6h-6">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" {...LOOP} />
      </path>
    </>
  )
}

// 06 — a grid of identical components; one keeps trying to look different
function Same() {
  const cols = [30, 82, 134]
  const rows = [18, 68]
  const cells = rows.flatMap((y, r) => cols.map((x, c) => ({ x, y, i: r * 3 + c })))
  return (
    <>
      {cells.map(({ x, y, i }) => {
        const odd = i === 4
        const body = (
          <>
            <rect className="dr s-main" x={x} y={y} width="36" height="34" rx="7" pathLength="1" style={{ '--d': `${i * 0.1}s` }} />
            <rect className="fill-wave" x={x} y={y} width="36" height="34" rx="7">
              <animate attributeName="opacity" values="0;0.22;0" dur="3.6s" begin={`${i * 0.25}s`} {...LOOP} />
            </rect>
            <circle className="s-hi" cx={x + 11} cy={y + 12} r="3.4" />
            <path className="s-hi" d={`M${x + 8} ${y + 24}H${x + 28}`} />
          </>
        )
        return odd ? (
          <g key={i}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`0 ${x + 18} ${y + 17};0 ${x + 18} ${y + 17};-16 ${x + 18} ${y + 17};-16 ${x + 18} ${y + 17};0 ${x + 18} ${y + 17}`}
              keyTimes="0;0.35;0.45;0.7;0.8"
              dur="4.5s"
              calcMode="spline"
              keySplines={`0 0 1 1;${EASE};0 0 1 1;${EASE}`}
              {...LOOP}
            />
            <g className="glow">{body}</g>
          </g>
        ) : (
          <g key={i}>{body}</g>
        )
      })}
    </>
  )
}

// 07 — output pulse that decays into burnout
function Burnout() {
  return (
    <>
      <path className="s-dim" d="M14 108H186" />
      <path className="s-dim dash" d={envelope(1)} />
      <path className="s-dim dash" d={envelope(-1)} />
      <path className="s-dim" d={WAVE} opacity="0.55" />
      <path className="s-hi glow pulse-run" d={WAVE} pathLength="1" />
      <g className="glow">
        <circle className="s-hi" cx="14" cy="60" r="3">
          <animate attributeName="r" values="3;10" dur="1.6s" {...LOOP} />
          <animate attributeName="opacity" values="0.8;0" dur="1.6s" {...LOOP} />
        </circle>
        <circle className="fill-hi" cx="14" cy="60" r="2.6" />
      </g>
      {/* energy cells draining */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} className="s-hi" x={134 + i * 10} y="12" width="7" height="10" rx="1.5" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.9;0.12;0.12;0.9" keyTimes={`0;${0.15 + (4 - i) * 0.12};${0.2 + (4 - i) * 0.12};0.92;1`} dur="6s" {...LOOP} />
        </rect>
      ))}
    </>
  )
}

// 08 — an engineering engine and a media engine, looping into each other
function Dual() {
  return (
    <>
      <g>
        <path className="s-main" d={gearPath(64, 60, 31, 25, 10)}>
          <animateTransform attributeName="transform" type="rotate" from="0 64 60" to="360 64 60" dur="16s" {...LOOP} />
        </path>
        <circle className="s-hi" cx="64" cy="60" r="11" />
        <path className="s-hi glow" d="M58 56l-5 4l5 4M70 56l5 4l-5 4" />
      </g>
      <g>
        <circle className="s-main" cx="136" cy="60" r="31" />
        <path className="s-hi glow" d="M130 48v24l20-12z" />
        {[0, 1.5].map((b) => (
          <circle key={b} className="s-hi" cx="136" cy="60" r="31">
            <animate attributeName="r" values="31;46" dur="3s" begin={`${b}s`} {...LOOP} />
            <animate attributeName="opacity" values="0.6;0" dur="3s" begin={`${b}s`} {...LOOP} />
          </circle>
        ))}
      </g>
      <path className="s-dim dash flow" d="M64 24Q100 -4 136 24" />
      <path className="s-dim dash flow rev" d="M64 96Q100 124 136 96" />
      <g className="glow">
        <circle className="fill-hi" r="2.6">
          <animateMotion path="M64 24Q100 -4 136 24" dur="3s" {...LOOP} />
        </circle>
        <circle className="fill-hi" r="2.6">
          <animateMotion path="M136 96Q100 124 64 96" dur="3s" begin="1.5s" {...LOOP} />
        </circle>
      </g>
    </>
  )
}

const SCENES = {
  'nobody-owns-the-outcome': Handoff,
  'taste-is-the-new-skill': Taste,
  'the-clarity-tax': Clarity,
  'why-most-products-die-between-launch-and-traction': Gap,
  'the-brief-is-the-product': Brief,
  'why-most-tech-products-look-the-same-now': Same,
  'why-consistency-is-misunderstood-in-creator-space': Burnout,
  'the-dual-engine-thesis': Dual,
}

function Fallback() {
  return <Dr d="M14 90C50 10 90 110 130 50S170 30 186 40" />
}

export default function BlogCardArt({ slug, light = false }) {
  const Scene = SCENES[slug] || Fallback
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const onScreen = useInView(ref, { margin: '120px' })
  const uid = useId().replace(/:/g, '')

  // Idle animations cost CPU on 8 cards at once: pause everything that is off screen
  useEffect(() => {
    const svg = ref.current
    if (!svg || !svg.pauseAnimations) return
    if (onScreen) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [onScreen])

  return (
    <svg
      ref={ref}
      className={`blog-card-art${light ? ' blog-card-art--light' : ''}${inView ? ' is-in' : ''}${onScreen ? '' : ' is-paused'}`}
      viewBox="0 0 200 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <Scene uid={uid} />
    </svg>
  )
}
