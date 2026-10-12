import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import SEO from '../components/SEO'
import FloLogo from '../components/FloLogo'
import './AboutPage.css'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const LEADERS = [
  { name: 'Laurel Burton', role: 'Chief Executive Officer', image: 'https://a-us.storyblok.com/f/1004432/1282x1604/a9337ef144/laurel-burton.png/m/' },
  { name: 'Jack De Caluwé', role: 'Chief Creative Officer', image: 'https://a-us.storyblok.com/f/1004432/1282x1604/179f8beb3a/jackdecaluwe_insrument_cco_about_page.png/m/' },
  { name: 'Coryna Sorin', role: 'Chief Operations Officer', image: 'https://a-us.storyblok.com/f/1004432/1282x1604/f7881acef8/coryna-sorin-2.png/m/' },
  { name: 'Tessa Baston', role: 'Chief People Officer', image: 'https://a-us.storyblok.com/f/1004432/1282x1604/e5ec3755bd/tessa-baston.png/m/' },
]

const IMAGES = [
  { src: 'https://a-us.storyblok.com/f/1004432/1348x1006/3d7c5fd107/about_page_image2.png/m/', alt: 'Flo Studios collaborative design exploration and creative strategy session' },
  { src: 'https://a-us.storyblok.com/f/1004432/3840x2160/eb1d22feae/build-week-high-level.png/m/', alt: 'Flo Studios technical architecture and engineering build week sprint' },
  { src: 'https://a-us.storyblok.com/f/1004432/2353x1568/6518a18c78/about_page_image1.png/m/', alt: 'Flo Studios creative direction and studio team workspace' },
]

const PILLARS = [
  { glyph: 'orbit', title: 'Taste', text: 'Strategists.' },
  { glyph: 'cube', title: 'Motion', text: '3D artists.' },
  { glyph: 'wave', title: 'Technology', text: 'Creative technologists.' },
]

const HERO_WORDS = 'Built at the intersection of taste, motion, and'.split(' ')
const ARCS = ['M600,56 C600,150 200,110 200,220', 'M600,56 L600,220', 'M600,56 C600,150 1000,110 1000,220']

// Each painter draws one frame of a line graphic. `ink` is the current theme colour as "r,g,b",
// `p` is 0→1 progress since the canvas scrolled into view.
const PAINTERS = {
  // Hero / CTA backdrop: grid of rounded tiles that softly light up, brighter near the cursor
  tiles(x, w, h, t, ink, p, mouse) {
    const cell = 84, r = 14, cols = Math.ceil(w / cell) + 1, rows = Math.ceil(h / cell) + 1, ox = (w - cols * cell) / 2
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const px = ox + i * cell, py = j * cell
      const glow = Math.pow(Math.max(0, Math.sin(t * 0.6 + i * 12.9898 + j * 78.233)), 10)
      const dx = px + cell / 2 - mouse.x, dy = py + cell / 2 - mouse.y
      const near = Math.exp(-(dx * dx + dy * dy) / 26000)
      x.beginPath(); x.roundRect(px + 3, py + 3, cell - 6, cell - 6, r)
      x.fillStyle = `rgba(${ink},${0.05 * glow + 0.07 * near})`; x.fill()
      x.strokeStyle = `rgba(${ink},${0.05 + 0.12 * near})`; x.stroke()
    }
  },
  // 350 dots that fill in as the number counts up
  crowd(x, w, h, t, ink, p) {
    const n = 350, cell = Math.floor(Math.sqrt((w * h) / n)), cols = Math.floor(w / cell), on = Math.round(n * p)
    for (let i = 0; i < n; i++) {
      const lit = i < on, tw = lit ? 0.75 + 0.25 * Math.sin(t * 2 + i) : 0.14
      x.fillStyle = `rgba(${ink},${tw})`
      x.beginPath(); x.arc((i % cols) * cell + cell / 2, Math.floor(i / cols) * cell + cell / 2, cell * 0.2, 0, 7); x.fill()
    }
  },
  // Two studios on a dot field, joined by an arc with a travelling signal
  pins(x, w, h, t, ink, p) {
    x.fillStyle = `rgba(${ink},0.14)`
    for (let i = 6; i < w; i += 12) for (let j = 6; j < h; j += 12) { x.beginPath(); x.arc(i, j, 1, 0, 7); x.fill() }
    const a = [w * 0.2, h * 0.64], b = [w * 0.8, h * 0.4], c = [w * 0.5, h * -0.1]
    const at = (u) => [(1 - u) ** 2 * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]]
    x.strokeStyle = `rgb(${ink})`; x.lineWidth = 1.25; x.beginPath()
    for (let u = 0; u <= p; u += 0.02) { const q = at(u); u ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1]) }
    x.stroke()
    x.fillStyle = `rgb(${ink})`
    ;[a, b].forEach((pt, i) => {
      x.beginPath(); x.arc(pt[0], pt[1], 4, 0, 7); x.fill()
      const pulse = (t * 0.5 + i * 0.5) % 1
      x.strokeStyle = `rgba(${ink},${1 - pulse})`; x.beginPath(); x.arc(pt[0], pt[1], 4 + pulse * 18, 0, 7); x.stroke()
    })
    if (p >= 1) { const q = at((t * 0.35) % 1); x.beginPath(); x.arc(q[0], q[1], 3, 0, 7); x.fill() }
    x.font = '600 11px Manrope, sans-serif'
    x.fillText('Portland', a[0] - 22, a[1] + 24); x.fillText('New York', b[0] - 24, b[1] + 24)
  },
  // Closing band: three ribbons that swell and taper like the Flo wave mark, thickening under the cursor
  flow(x, w, h, t, ink, p, mouse) {
    for (let i = 0; i < 3; i++) {
      const y0 = h * (0.3 + 0.2 * i), top = [], bottom = []
      for (let px = 0; px <= w + 8; px += 8) {
        const mid = y0 + Math.sin(px * 0.004 + t * 1.2 + i * 1.3) * 16 + Math.sin(px * 0.009 - t * 0.8 + i) * 6
        const swell = (0.5 + 0.5 * Math.sin(px * 0.006 - t * 1.5 + i * 2)) ** 2
        const dx = px - mouse.x, dy = mid - mouse.y
        const half = 1 + 12 * swell + 8 * Math.exp(-(dx * dx + dy * dy) / 12000)
        top.push([px, mid - half]); bottom.push([px, mid + half])
      }
      x.fillStyle = `rgba(${ink},${[1, 0.5, 0.2][i]})`
      x.beginPath()
      top.forEach(([px, y], k) => (k ? x.lineTo(px, y) : x.moveTo(px, y)))
      bottom.reverse().forEach(([px, y]) => x.lineTo(px, y))
      x.fill()
    }
  },
  orbit(x, w, h, t, ink) {
    const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.36
    x.strokeStyle = x.fillStyle = `rgb(${ink})`; x.lineWidth = 1.25
    for (let i = 0; i < 3; i++) { x.globalAlpha = 0.35 + i * 0.3; x.beginPath(); x.ellipse(cx, cy, R, R * (0.28 + i * 0.3), t * 0.4 + i * 1.05, 0, 7); x.stroke() }
    x.globalAlpha = 1
    x.beginPath(); x.arc(cx + Math.cos(t * 1.6) * R, cy + Math.sin(t * 1.6) * R * 0.88, 4, 0, 7); x.fill()
    x.beginPath(); x.arc(cx, cy, 2.5, 0, 7); x.fill()
  },
  cube(x, w, h, t, ink) {
    const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.3, a1 = t * 0.7, a2 = t * 0.45, v = []
    for (let k = 0; k < 8; k++) {
      const X = k & 1 ? 1 : -1, Y = k & 2 ? 1 : -1, Z = k & 4 ? 1 : -1
      const x1 = X * Math.cos(a1) - Z * Math.sin(a1), z1 = X * Math.sin(a1) + Z * Math.cos(a1)
      const y1 = Y * Math.cos(a2) - z1 * Math.sin(a2), z2 = Y * Math.sin(a2) + z1 * Math.cos(a2), f = 3 / (4 + z2)
      v.push([cx + x1 * f * R, cy + y1 * f * R])
    }
    x.strokeStyle = `rgb(${ink})`; x.lineWidth = 1.25
    ;[[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]].forEach(([a, b]) => {
      x.beginPath(); x.moveTo(v[a][0], v[a][1]); x.lineTo(v[b][0], v[b][1]); x.stroke()
    })
  },
  // Sine wave that morphs into a square wave and back: analogue feel, digital precision
  wave(x, w, h, t, ink) {
    const cy = h / 2, R = Math.min(w, h) * 0.22, m = (Math.sin(t * 0.8) + 1) / 2
    x.strokeStyle = `rgb(${ink})`; x.lineWidth = 1.25; x.beginPath()
    for (let px = 0; px <= w; px += 2) {
      const sn = Math.sin(px * 0.045 - t * 3), y = cy - (sn * (1 - m) + Math.sign(sn) * m) * R
      px ? x.lineTo(px, y) : x.moveTo(px, y)
    }
    x.stroke()
    x.globalAlpha = 0.2; x.beginPath(); x.moveTo(0, cy); x.lineTo(w, cy); x.stroke(); x.globalAlpha = 1
  },
}

export default function AboutPage() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shownAt = new WeakMap()

    // Reveal on scroll, and count the stats up once
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return
      io.unobserve(e.target)
      e.target.classList.add('is-in')
      e.target.querySelectorAll('canvas').forEach((c) => shownAt.set(c, performance.now()))
      e.target.querySelectorAll('[data-count]').forEach((el) => {
        const end = +el.dataset.count, pad = +(el.dataset.pad || 0), suffix = el.dataset.suffix || '', t0 = performance.now()
        const step = (now) => {
          const p = still ? 1 : Math.min((now - t0) / 1600, 1)
          el.textContent = String(Math.round(end * (1 - (1 - p) ** 4))).padStart(pad, '0') + suffix
          if (p < 1) requestAnimationFrame(step)
        }
        step(t0)
      })
    }), { threshold: 0.2 })
    root.querySelectorAll('.about__reveal').forEach((el) => io.observe(el))

    // Scroll theme switcher: the last section whose top has crossed 80% of the viewport sets the theme.
    // "How we work" lines draw with the scroll and merge into one.
    const sections = [...root.querySelectorAll('section[data-theme]')]
    const how = root.querySelector('.about__how')
    const lines = [...root.querySelectorAll('.about__merge-line')]
    const merged = root.querySelector('.about__merge-tag')
    lines.forEach((l) => { l.style.strokeDasharray = l.getTotalLength() })
    let inkTo = 0
    const onScroll = () => {
      const trigger = window.innerHeight * 0.8
      let theme = 'light'
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= trigger) theme = s.dataset.theme })
      root.dataset.theme = theme
      inkTo = theme === 'dark' ? 255 : 0
      const r = how.getBoundingClientRect()
      const p = still ? 1 : Math.max(0, Math.min(1, (window.innerHeight * 0.85 - r.top) / (r.height * 0.9)))
      lines.forEach((l) => { l.style.strokeDashoffset = l.getTotalLength() * (1 - p) })
      merged.classList.toggle('is-on', p > 0.92)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    // One animation loop paints every canvas that is on screen
    const canvases = [...root.querySelectorAll('canvas[data-g]')]
    const mouse = new WeakMap()
    const fit = (c) => {
      const d = Math.min(window.devicePixelRatio || 1, 2)
      c.width = c.clientWidth * d; c.height = c.clientHeight * d
      c.getContext('2d').setTransform(d, 0, 0, d, 0, 0)
    }
    const ro = new ResizeObserver((es) => es.forEach((e) => fit(e.target)))
    canvases.forEach((c) => { ro.observe(c); mouse.set(c, { x: -999, y: -999 }) })
    const onMove = (e) => canvases.forEach((c) => {
      const r = c.getBoundingClientRect()
      mouse.set(c, { x: e.clientX - r.left, y: e.clientY - r.top })
    })
    window.addEventListener('pointermove', onMove, { passive: true })

    let raf, ink = 0
    const frame = (now) => {
      ink += (inkTo - ink) * (still ? 1 : 0.1)
      const v = Math.round(ink), rgb = `${v},${v},${v}`
      canvases.forEach((c) => {
        const r = c.getBoundingClientRect()
        if (r.bottom < 0 || r.top > window.innerHeight || !c.width) return
        const x = c.getContext('2d'), t0 = shownAt.get(c)
        const p = still ? 1 : t0 ? Math.min((now - t0) / 1600, 1) : 0
        x.clearRect(0, 0, r.width, r.height)
        PAINTERS[c.dataset.g](x, r.width, r.height, still ? 0 : now / 1000, rgb, 1 - (1 - p) ** 3, mouse.get(c))
      })
      raf = still ? setTimeout(() => frame(performance.now()), 400) : requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      io.disconnect(); ro.disconnect()
      cancelAnimationFrame(raf); clearTimeout(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <motion.main className="about" ref={rootRef} variants={pageV} initial="initial" animate="animate" exit="exit">
      <SEO
        title="About Flo Studios — Creative & Technology Studio"
        description="Learn about Flo Studios, a creative and technology studio pairing creative direction with technical rigor to build enduring brands, digital products, and motion systems."
        canonicalUrl="https://www.flostudio.co/about"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'About Flo Studios', item: 'https://www.flostudio.co/about', url: 'https://www.flostudio.co/about' },
        ]}
      />

      {/* Hero */}
      <section className="about__hero" data-theme="light">
        <canvas className="about__tiles" data-g="tiles" aria-hidden="true" />
        <div className="container about__hero-inner">
          <h1 className="about__title" aria-label="About Flo Studios: Built at the intersection of taste, motion, and technology.">
            {HERO_WORDS.map((w, i) => (
              <span key={i} className="about__word" aria-hidden="true"><i style={{ animationDelay: `${0.15 + i * 0.06}s` }}>{w}</i></span>
            ))}
            <span className="about__slot" aria-hidden="true">
              <b><em>technology.</em><em>taste.</em><em>motion.</em><em>technology.</em></b>
            </span>
          </h1>
          <p className="about__intro">
            We pair creative direction with technical rigor to build brands, digital products, and motion systems that endure. Collaborating globally with industry pioneers including Google, Spotify, Electronic Arts, and ŌURA.
          </p>
          <Link to="/work" className="about__pill">Explore work →</Link>
        </div>
      </section>

      {/* Studio photos */}
      <section className="about__strip" data-theme="light">
        <div className="about__strip-track">
          {[...IMAGES, ...IMAGES].map((img, i) => (
            <div className="about__strip-card" key={i} aria-hidden={i >= IMAGES.length}>
              <img src={img.src} alt={i < IMAGES.length ? img.alt : ''} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <section className="about__who" data-theme="dark">
        <div className="container">
          <div className="about__head about__reveal">
            <h2 className="about__h2">Who we are</h2>
            <p className="about__lead">
              Strategists, 3D artists, and creative technologists. Opinionated about detail, disciplined in execution, and committed to work that commands attention.
            </p>
          </div>

          <div className="about__bento">
            <div className="about__card about__reveal">
              <span className="about__num" data-count="20">0</span>
              <div className="about__ruler" aria-hidden="true" />
              <h3 className="about__card-title">Years</h3>
              <p className="about__card-text">Building digital products and brands.</p>
            </div>
            <div className="about__card about__reveal">
              <span className="about__num" data-count="350" data-suffix="+">0</span>
              <canvas className="about__graphic" data-g="crowd" aria-hidden="true" />
              <h3 className="about__card-title">Craftspeople</h3>
              <p className="about__card-text">Designers, directors, and technologists.</p>
            </div>
            <div className="about__card about__reveal">
              <span className="about__num" data-count="2" data-pad="2">0</span>
              <canvas className="about__graphic" data-g="pins" aria-hidden="true" />
              <h3 className="about__card-title">Studios</h3>
              <p className="about__card-text">Portland · New York · Remote</p>
            </div>

            <div className="about__card about__hub about__reveal">
              <svg className="about__arcs" viewBox="0 0 1200 220" aria-hidden="true">
                {ARCS.map((d, i) => (
                  <g key={i}>
                    <path id={`about-arc-${i}`} className="about__arc" pathLength="1" d={d} style={{ transitionDelay: `${i * 0.15}s` }} />
                    <circle r="4" className="about__pulse">
                      <animateMotion dur="3.2s" begin={`${i * 0.6}s`} repeatCount="indefinite"><mpath href={`#about-arc-${i}`} /></animateMotion>
                    </circle>
                  </g>
                ))}
              </svg>
              <div className="about__hub-logo"><FloLogo height="22px" ariaLabel="" aria-hidden="true" /></div>
              <div className="about__pillars">
                {PILLARS.map((p) => (
                  <div className="about__pillar" key={p.title}>
                    <canvas data-g={p.glyph} aria-hidden="true" />
                    <h3 className="about__card-title">{p.title}</h3>
                    <p className="about__card-text">{p.text}</p>
                  </div>
                ))}
              </div>
              <Link to="/services" className="about__pill">Explore services →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="about__how" data-theme="light">
        <div className="container">
          <div className="about__head about__reveal">
            <h2 className="about__h2">How we work</h2>
            <p className="about__lead">Designers who code and engineers with taste—collaborating in the same room from day one.</p>
            <p className="about__lead">We eliminate handoff friction to preserve conceptual integrity from initial direction through production deployment.</p>
          </div>
          <svg className="about__merge" viewBox="0 0 1200 220" aria-hidden="true">
            <text className="about__tag" x="0" y="34">Design</text>
            <text className="about__tag" x="0" y="204">Engineering</text>
            <path className="about__merge-line" d="M0,50 C180,50 240,190 400,120 S560,40 700,110 S800,120 860,120 L1200,120" />
            <path className="about__merge-line" d="M0,180 C180,180 240,30 400,110 S560,190 700,128 S800,120 860,120 L1200,120" />
            <text className="about__tag about__merge-tag" x="1200" y="100" textAnchor="end">One room · one stream</text>
          </svg>
          <div className="about__center"><Link to="/careers" className="about__pill">View open roles →</Link></div>
        </div>
      </section>

      {/* Leadership */}
      <section className="about__leadership" data-theme="dark">
        <div className="container">
          <div className="about__head about__reveal">
            <h2 className="about__h2">Leadership</h2>
            <p className="about__lead">Led with intention. Built for what's next.</p>
          </div>
          <div className="about__leaders">
            {LEADERS.map((leader, i) => (
              <div className="about__leader about__reveal" key={leader.name} style={{ '--i': i }}>
                <img src={leader.image} alt={`${leader.name} — ${leader.role} at Flo Studios`} loading="lazy" />
                <svg viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
                  <rect pathLength="1" x="0.5" y="0.5" width="99" height="124" rx="5" vectorEffect="non-scaling-stroke" />
                </svg>
                <span className="about__scan" aria-hidden="true" />
                <div className="about__leader-info">
                  <h3 className="about__leader-name">{leader.name}</h3>
                  <p className="about__leader-role">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="about__cta" data-theme="light">
        <div className="container">
          <div className="about__cta-card about__reveal">
            <canvas className="about__tiles" data-g="tiles" aria-hidden="true" />
            <h2 className="about__cta-title">Think you'd be a good addition to our team?</h2>
            <Link to="/careers" className="about__ring">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle className="about__ring-dash" cx="50" cy="50" r="48" />
                <circle className="about__ring-draw" pathLength="1" cx="50" cy="50" r="42" />
              </svg>
              Careers →
            </Link>
          </div>
        </div>
        <canvas className="about__flow" data-g="flow" aria-hidden="true" />
      </section>
    </motion.main>
  )
}
