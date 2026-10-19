import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import SEO from '../components/SEO'
import './AbstructCaseStudy.css'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const IMG = '/work/abstruct/web/'
const RAW = '/work/abstruct/'

// Sampled from the supplied artwork
const PALETTE = [
  { name: 'Ivory', hex: '#EBE5DC', role: 'Ground, print stock, reversed marks', dark: true },
  { name: 'Charcoal', hex: '#111111', role: 'Type, monogram, night surfaces' },
  { name: 'Signal red', hex: '#C31C18', role: 'The single accent: safety gear, planes of colour' },
  { name: 'Concrete', hex: '#8C8B87', role: 'Architectural neutrals and photography' },
]

const VARIANTS = [
  { name: 'Primary', src: 'logo-colored.png', bg: '#111111' },
  { name: 'Reversed', src: 'logo-white.png', bg: '#C31C18' },
  { name: 'Mono black', src: 'logo-black.png', bg: '#EBE5DC' },
  { name: 'Horizontal', src: 'logo-horizontal.png', bg: '#111111', wide: true },
  { name: 'Vertical', src: 'logo-vertical.png', bg: '#111111' },
]

const LINES = [
  'Building stability. Shaping the future.',
  'Spaces that perform.',
  'Precision today. Stronger tomorrow.',
  'We build. You live.',
  'People. Spaces. Progress.',
  'Building with purpose.',
]

// Floating chips around the phone, all taken from the brand's own lines
const CHIPS = ['Spaces that last', 'Building with purpose', 'Design · Build · Deliver', 'People · Spaces · Progress']

// Applications: street, site and mobile
const APPLICATIONS = [
  { src: 'billboard.jpg', alt: 'ABSTRUCT oversized wordmark on a construction site hoarding' },
  { src: 'website-mockup.jpg', alt: 'ABSTRUCT website homepage design, ivory and black with a red accent plane' },
]

// Animated palette: swatches wipe in, then the active one widens in turn (hover or focus takes over)
function PaletteMotion() {
  const ref = useRef(null)
  const [active, setActive] = useState(2)
  const [on, setOn] = useState(false)
  const [hold, setHold] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.35 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!on || hold || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setActive((a) => (a + 1) % PALETTE.length), 2600)
    return () => clearInterval(t)
  }, [on, hold])

  return (
    <ul
      className={`abs__palette abs__bleed ${on ? 'is-on' : ''}`}
      ref={ref}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
    >
      {PALETTE.map((c, i) => (
        <li
          key={c.hex}
          className={active === i ? 'is-active' : ''}
          style={{ '--sw': c.hex, '--ink': c.dark ? '#111111' : '#EBE5DC', '--i': i }}
          tabIndex={0}
          onMouseEnter={() => setActive(i)}
          onFocus={() => { setHold(true); setActive(i) }}
          onBlur={() => setHold(false)}
        >
          <span className="abs__sw-no">0{i + 1}</span>
          <b>{c.name}</b>
          <span key={active === i ? 'on' : 'off'} className="abs__sw-hex">{c.hex}</span>
          <em>{c.role}</em>
        </li>
      ))}
    </ul>
  )
}

// Two typographic voices from the supplied specimen, kept apart: the light alphabet, and the heavy and regular display lines
const SPECIMENS = [
  { src: 'type-light.png', label: 'Light', note: 'Wide, airy capitals for wordmarks and small print', alt: 'Neue Grostek light alphabet, A to Z', cls: 'abs__tm-light' },
  { src: 'type-heavy.png', label: 'Heavy & regular', note: 'Tight, heavy headlines with a regular companion line', alt: 'Aa 123 in heavy weight above Neue Grostek in regular weight', cls: 'abs__tm-heavy' },
]
function TypeMotion() {
  return (
    <div className="abs__tm">
      {SPECIMENS.map((f, i) => (
        <div key={f.src} className="abs__tm-item">
          <p className="abs__tm-label"><b>{String(i + 1).padStart(2, '0')}</b> {f.label}<span>{f.note}</span></p>
          <figure className={`abs__tm-fig ${f.cls}`} style={{ '--m': `url(${RAW + f.src})`, '--d': `${i * 0.12}s` }}>
            <img src={RAW + f.src} alt={f.alt} loading="lazy" decoding="async" />
            <span className="abs__tm-sweep" aria-hidden="true" />
          </figure>
        </div>
      ))}
    </div>
  )
}

// Scroll-scrubbed scene: side beams close in, the lifted beam is lowered onto them, sparks fly, then the words land
const clamp01 = (v) => Math.min(1, Math.max(0, v))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const easeIn = (t) => t * t * (3 - 2 * t) // smoothstep: no hard start or stop
const SPARKS = [-155, -130, -105, -80, -55, -30, -10]
function BeamScene() {
  const secRef = useRef(null)
  const figRef = useRef(null)
  const lRef = useRef(null)
  const rRef = useRef(null)
  const ropeRef = useRef(null)
  const asmRef = useRef(null)
  const w1Ref = useRef(null)
  const w2Ref = useRef(null)
  const w3Ref = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fig = figRef.current
    let raf = 0
    let hit = false

    const apply = (p) => {
      // 1. side beams slide in
      const side = easeOut(clamp01((p - 0.02) / 0.3))
      lRef.current.style.transform = `translateX(${(-1 + side) * 60}%)`
      lRef.current.style.opacity = clamp01(side * 2)
      rRef.current.style.transform = `translateX(${(1 - side) * 60}%)`
      rRef.current.style.opacity = clamp01(side * 2)

      // 2. the lifted beam descends (percent of canvas height), rope stretches to follow, small recoil on contact
      const drop = easeIn(clamp01((p - 0.18) / 0.42))
      const rec = p > 0.6 ? -1.1 * Math.sin(clamp01((p - 0.6) / 0.12) * Math.PI) : 0
      const dy = -16.9 + drop * (5.4 + 16.9) + rec
      asmRef.current.style.transform = `translateY(${dy}%)`
      asmRef.current.style.opacity = clamp01((p - 0.14) * 12)
      ropeRef.current.style.transform = `scaleY(${Math.max(0.05, (188 + dy * 8.9) / 188)})`
      ropeRef.current.style.opacity = clamp01((p - 0.14) * 12)

      // 3. impact: sparks and a short shake, retriggered when scrubbing back over the threshold
      if (p >= 0.6 && !hit) { hit = true; fig.classList.remove('hit'); void fig.offsetWidth; fig.classList.add('hit') }
      if (p < 0.56 && hit) { hit = false; fig.classList.remove('hit') }

      // 4. words land one after another
      ;[w1Ref, w2Ref, w3Ref].forEach((ref, i) => {
        const t = easeOut(clamp01((p - 0.66 - i * 0.07) / 0.1))
        ref.current.style.opacity = t
        ref.current.style.transform = `translateY(${(1 - t) * 220}%)`
      })
    }

    // The scroll position sets a target; the scene eases toward it every frame, so wheel steps never look jumpy
    let target = 0
    let cur = 0
    const readTarget = () => {
      const r = secRef.current.getBoundingClientRect()
      const total = r.height - window.innerHeight
      return reduce ? 1 : clamp01(-r.top / Math.max(1, total))
    }
    const tick = () => {
      cur += (target - cur) * 0.14
      if (Math.abs(target - cur) < 0.0004) cur = target
      apply(cur)
      raf = cur === target ? 0 : requestAnimationFrame(tick)
    }
    const onScroll = () => {
      target = readTarget()
      if (!raf) raf = requestAnimationFrame(tick)
    }
    target = readTarget()
    cur = target
    apply(cur)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  return (
    <section className="abs__beam" data-theme="light" aria-label="We build trust" ref={secRef}>
      <div className="abs__beam-stick">
        <figure className="abs__beam-fig" ref={figRef} role="img" aria-label="We build trust. A hand-drawn steel beam is lowered by a crane onto two beams, sparks fly, and the words land.">
          <span className="abs__layer" ref={lRef}><img src={RAW + 'beams-left.png'} alt="" decoding="async" /></span>
          <span className="abs__layer" ref={rRef}><img src={RAW + 'beams-right.png'} alt="" decoding="async" /></span>
          <span className="abs__layer abs__rope" ref={ropeRef}><img src={RAW + 'beams-rope.png'} alt="" decoding="async" /></span>
          <span className="abs__layer" ref={asmRef}><img src={RAW + 'beams-asm.png'} alt="" decoding="async" /></span>
          <span className="abs__layer" ref={w1Ref}><img src={RAW + 'beams-we.png'} alt="" decoding="async" /></span>
          <span className="abs__layer" ref={w2Ref}><img src={RAW + 'beams-build.png'} alt="" decoding="async" /></span>
          <span className="abs__layer" ref={w3Ref}><img src={RAW + 'beams-trust.png'} alt="" decoding="async" /></span>
          <span className="abs__spark abs__spark--l" aria-hidden="true">{SPARKS.map((a) => <i key={a} style={{ '--a': `${a}deg` }} />)}</span>
          <span className="abs__spark abs__spark--r" aria-hidden="true">{SPARKS.map((a) => <i key={a} style={{ '--a': `${a}deg` }} />)}</span>
        </figure>
      </div>
    </section>
  )
}

// Screen-recording style loop shown inside the phone: hero, services, work, call to action, back to hero
function PhonePanel({ kind, tap }) {
  if (kind === 'hero') {
    return (
      <div className="abs__pn abs__pn--hero">
        <img className="abs__pn-logo" src={RAW + 'logo-white.png'} alt="" />
        <p className="abs__pn-h">Spaces that last</p>
        <p className="abs__pn-p">Construction solutions for a stronger tomorrow.</p>
        <span className={`abs__pn-go abs__pn-go--${tap}`}>→</span>
        <img className="abs__pn-bg" src={IMG + 'building-with-purpose.jpg'} alt="" />
      </div>
    )
  }
  if (kind === 'services') {
    return (
      <div className="abs__pn abs__pn--light">
        <img className="abs__pn-logo abs__pn-logo--sm" src={RAW + 'logo-black.png'} alt="" />
        <p className="abs__pn-k">Our services</p>
        {['Residential', 'Commercial', 'Project management'].map((t) => <p className="abs__pn-row" key={t}>{t}<span>→</span></p>)}
        <img className="abs__pn-card abs__pn-card--s" src={IMG + 'billboard.jpg'} alt="" />
      </div>
    )
  }
  if (kind === 'work') {
    return (
      <div className="abs__pn abs__pn--light">
        <p className="abs__pn-k">People · Spaces · Progress</p>
        <img className="abs__pn-card" src={IMG + 'worker-red-gear.jpg'} alt="" />
        <img className="abs__pn-card abs__pn-card--b" src={IMG + 'helmet-profile.jpg'} alt="" />
      </div>
    )
  }
  return (
    <div className="abs__pn abs__pn--red">
      <img className="abs__pn-logo" src={RAW + 'logo-white.png'} alt="" />
      <p className="abs__pn-h abs__pn-h--bold">Let&rsquo;s build a stronger tomorrow.</p>
      <span className="abs__pn-btn">Get a quote<i className="abs__pn-go--cta" /></span>
    </div>
  )
}

export default function AbstructCaseStudy() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    document.body.classList.add('abs-page')

    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return
      io.unobserve(e.target)
      e.target.classList.add('is-in')
    }), { threshold: 0.15 })
    root.querySelectorAll('.abs__reveal').forEach((el) => io.observe(el))

    // Theme follows the last section whose top crossed 80% of the viewport
    const sections = [...root.querySelectorAll('section[data-theme]')]
    const onScroll = () => {
      const trigger = window.innerHeight * 0.8
      let theme = 'light'
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= trigger) theme = s.dataset.theme })
      root.dataset.theme = theme
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); document.body.classList.remove('abs-page') }
  }, [])

  return (
    <motion.main className="abs" ref={rootRef} variants={pageV} initial="initial" animate="animate" exit="exit">
      <SEO
        title="ABSTRUCT — Construction Brand Identity | Flo Studios"
        description="Flo Studios built a monogram-led identity for ABSTRUCT Construction in ivory, charcoal and signal red, applied from site hoardings to hard hats and digital."
        canonicalUrl="https://www.flostudio.co/work/abstruct"
      />

      {/* 1a. Intro: the monogram fills the first screen, revealed after a red curtain lifts */}
      <section className="abs__intro" data-theme="light" aria-label="ABSTRUCT Construction">
        <span className="abs__curtain" aria-hidden="true" />
        <h1 className="sr-only">ABSTRUCT Construction: building stability, shaping the future</h1>
        <div className="abs__intro-mark">
          <img src={RAW + 'logo-black.png'} alt="ABSTRUCT Construction monogram" fetchPriority="high" />
        </div>
        <p className="abs__scroll" aria-hidden="true"><span>Scroll</span><i /></p>
      </section>

      {/* 1b. Hero image */}
      <section className="abs__hero" data-theme="light">
        <div className="container">
          <figure className="abs__frame abs__bleed abs__hero-img">
            <img src={IMG + 'hero.webp'} alt="ABSTRUCT billboard beside a construction site, showing the monogram in black and white around a site worker in a hard hat" loading="eager" decoding="async" fetchPriority="high" />
          </figure>
          <p className="abs__text abs__reveal">
            A construction brand built on precision, integrity and lasting quality. We gave it an identity as considered as the structures it delivers.
          </p>
        </div>
      </section>

      {/* 2. Full-width image, centred statement, body copy */}
      <section className="abs__chapters" data-theme="light">
        <div className="container">
          <figure className="abs__frame abs__bleed abs__reveal"><img src={IMG + 'billboard-night.jpg'} alt="Illuminated ABSTRUCT billboard in a city at night" loading="lazy" decoding="async" /></figure>
          <div className="abs__center abs__reveal">
            <p className="abs__label">The Challenge</p>
            <p className="abs__big abs__big--center">Create an identity that signals structural strength without the clichés of construction branding.</p>
          </div>
          <p className="abs__text abs__text--right abs__reveal">
            ABSTRUCT needed a brand that communicated strength, precision and a forward-looking approach. It had to hold up on construction sites, in corporate communications and on digital platforms, with every touchpoint carrying the same three things: clarity, confidence and uncompromising quality.
          </p>
        </div>
      </section>

      {/* 3. Media grid: two stacked left, one tall right */}
      <section className="abs__mosaic-sec" data-theme="light">
        <div className="container">
          <div className="abs__mosaic abs__bleed abs__reveal">
            <figure className="abs__frame abs__m1"><img src={IMG + 'helmet-profile.jpg'} alt="White ABSTRUCT hard hat with the black logo, seen in profile" loading="lazy" decoding="async" /></figure>
            <figure className="abs__frame abs__m2"><img src={IMG + 'worker-red-gear.jpg'} alt="Red ABSTRUCT hard hat and high-visibility vest with the reversed monogram" loading="lazy" decoding="async" /></figure>
            <figure className="abs__frame abs__m3"><img src={IMG + 'poster.jpg'} alt="ABSTRUCT campaign poster with a monochrome site team outlined in red" loading="lazy" decoding="async" /></figure>
          </div>
          <p className="abs__text abs__text--center abs__reveal">Safety equipment, site apparel and campaign posters carry the same monogram, the same black, ivory and signal red.</p>
        </div>
      </section>

      {/* Mid-page band: scroll-driven beam landing */}
      <BeamScene />

      {/* 4. System: statement, scattered logo suite, copy, palette, type, pattern */}
      <section className="abs__system" data-theme="dark">
        <div className="container">
          <div className="abs__center abs__reveal">
            <p className="abs__label">The System</p>
            <p className="abs__big abs__big--center">A distinctive monogram, a restrained palette and one bold accent.</p>
          </div>

          <ul className="abs__scatter" aria-label="ABSTRUCT logo suite">
            {VARIANTS.map((v, i) => (
              <li key={v.name} className="abs__reveal" style={{ '--n': i }}>
                <span className="abs__tile" style={{ background: v.bg }}>
                  <img src={RAW + v.src} alt={`ABSTRUCT logo, ${v.name.toLowerCase()} version`} loading="lazy" decoding="async" />
                </span>
                <span className="abs__vname">{v.name}</span>
              </li>
            ))}
          </ul>

          <p className="abs__text abs__reveal">
            Three pillars of different heights rise through an open arc: structure, strength and progress in a single gesture. The wordmark is spaced wide and set in a light sans so the monogram carries the weight.
          </p>

          <div className="abs__id abs__reveal">
            <p className="abs__label">Colour palette</p>
            <PaletteMotion />
          </div>

          <div className="abs__id abs__reveal">
            <p className="abs__label">Typography</p>
            <div className="abs__type">
              <TypeMotion />
              <p className="abs__text abs__text--right">Neue Grostek, as specified in the supplied specimen. Heavy, tightly tracked grotesque for statements; light, widely spaced capitals for the wordmark and small print.</p>
            </div>
          </div>

          <div className="abs__id abs__reveal">
            <p className="abs__label">Pattern</p>
            <div className="abs__elements">
              <figure className="abs__bleed"><img src={IMG + 'packaging.jpg'} alt="ABSTRUCT monogram repeat pattern on ivory, used as packaging wrap" loading="lazy" decoding="async" /><figcaption>Monogram repeat, packaging wrap</figcaption></figure>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Voice */}
      <section className="abs__voice" data-theme="light">
        <div className="container">
          <p className="abs__label abs__reveal">Voice &amp; taglines</p>
          <ul className="abs__lines">
            {LINES.map((l, i) => <li key={l} className="abs__reveal" style={{ '--d': `${i * 60}ms` }}>{l}</li>)}
          </ul>
        </div>
      </section>

      {/* 6. Full-width moodboard, then text left + image right */}
      <section className="abs__digital-sec" data-theme="light">
        <div className="container">
          <figure className="abs__frame abs__bleed abs__reveal">
            <img src={IMG + 'moodboard.jpg'} alt="ABSTRUCT moodboard: concrete architecture, red planes, hard hats and the monogram on ivory and black" loading="lazy" decoding="async" />
          </figure>
          <div className="abs__digital-copy abs__bleed abs__reveal">
            <p className="abs__text">An ivory and black website with a single red plane, built on the same grid and the same heavy headlines as the print work, scaling down to mobile without losing its weight.</p>
          </div>
          <div className="abs__apps abs__bleed">
            {APPLICATIONS.map((a) => (
              <figure key={a.src} className="abs__app abs__reveal">
                <span className="abs__frame"><img src={IMG + a.src} alt={a.alt} loading="lazy" decoding="async" /></span>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Single phone: cut out, floating, with a glint, a tap pulse and drifting chips */}
      <section className="abs__phone-sec" data-theme="light" aria-label="ABSTRUCT mobile site">
        <div className="abs__stage abs__reveal">
          <span className="abs__radar" aria-hidden="true"><i /><i /><i /></span>
          <ul className="abs__chips-float" aria-hidden="true">
            {CHIPS.map((t, i) => <li key={t} style={{ '--i': i }}>{t}</li>)}
          </ul>
          <div className="abs__phone">
            <div className="abs__screen" aria-hidden="true">
              <div className="abs__feed">
                <PhonePanel kind="hero" tap="a" />
                <PhonePanel kind="services" />
                <PhonePanel kind="work" />
                <PhonePanel kind="cta" />
                <PhonePanel kind="hero" tap="c" />
              </div>
              <p className="abs__status"><b>9:41</b><span className="abs__status-ic"><i /><i /><i /></span></p>
              <i className="abs__glint" />
            </div>
            <img className="abs__frame-img" src={RAW + 'phone-frame.png'} alt="ABSTRUCT mobile site playing inside a phone: Spaces that last, services, work, and a call to action" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="abs__quote" data-theme="light">
        <div className="container">
          <blockquote className="abs__q">&ldquo;Turning imaginations into permanence.&rdquo;</blockquote>
          <div className="abs__quote-cta"><Link to="/contact" className="abs__btn">Contact us</Link></div>
        </div>
      </section>

      <section className="abs__role" data-theme="light">
        <div className="container abs__role-grid">
          <h2 className="abs__role-title abs__reveal">Our role</h2>
          <div className="abs__role-list abs__reveal">
            {[
              { group: 'Strategy', items: ['Brand positioning', 'Voice & taglines'] },
              { group: 'Identity', items: ['Monogram & logo suite', 'Colour palette', 'Typography', 'Pattern & illustration', 'Art direction'] },
              { group: 'Environment', items: ['Site hoarding', 'Billboard', 'Street poster'] },
              { group: 'People', items: ['Safety equipment', 'Site apparel', 'Campaign poster'] },
              { group: 'Digital', items: ['Website', 'Mobile'] },
            ].map((r) => (
              <div key={r.group} className="abs__role-row">
                <h3>{r.group}</h3>
                <ul>{r.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
            <div className="abs__cta">
              <Link to="/work" className="abs__back">All work</Link>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
