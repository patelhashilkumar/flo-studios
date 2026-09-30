import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import './Hero.css'

const STATEMENT_WORDS = [
  "A", "creative", "&", "tech", "studio", "built", "at", "the", "intersection", "of", "content", "and", "technical", "infrastructure."
]

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const videoCardRef = useRef(null)
  const wordsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.1 }
      )

      gsap.fromTo(
        videoCardRef.current,
        { opacity: 0, y: 40, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      )

      // Statement words reveal
      gsap.fromTo(
        wordsRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.6,
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section className="hero" ref={heroRef} id="hero">
      {/* ── 1. Giant "FLO STUDIOS" Wordmark ── */}
      <div className="hero__logo-container" ref={logoRef}>
        <svg
          viewBox="0 0 1824 189"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hero__giant-logo"
          aria-label="Flo Studios"
        >
          {/* F */}
          <path d="M17.12 183.5H107.07V109.73H177.12V75.42H107.07V67.16H191.52V4.59H17.12V183.5Z" fill="#000000" />
          {/* L */}
          <path d="M198.02 183.5H363.02V117.99H287.97V4.59H198.02V183.5Z" fill="#000000" />
          {/* O */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M463.79 0C526.94 0 558.06 25.51 558.06 87.34V101.66C558.06 163.49 526.94 189 463.79 189C400.64 189 369.52 163.49 369.52 101.66V87.34C369.52 25.51 400.64 0 463.79 0ZM463.79 70.65C460.49 70.65 459.48 72.85 459.48 79.82V109.18C459.48 116.15 460.49 118.35 463.79 118.35C467.09 118.35 468.10 116.15 468.10 109.18V79.82C468.10 72.85 467.09 70.65 463.79 70.65Z"
            fill="#000000"
          />
          {/* S */}
          <path d="M707.31 188.08C767.34 188.08 793.78 166.25 793.78 123.31C793.78 89.18 775.97 74.87 731.73 66.79C706.94 62.39 702.35 60.74 702.35 54.86C702.35 52.66 704.74 50.83 707.31 50.83C711.35 50.83 714.29 54.13 714.29 58.72V62.2H791.76V59.27C791.76 19.27 761.83 0 706.94 0C648.93 0 622.50 22.94 622.50 61.1C622.50 93.77 639.39 105.88 683.26 115.97C709.51 121.84 715.57 122.39 715.57 128.63C715.57 130.83 713.92 133.58 709.70 133.58C706.39 133.58 702.35 129.55 702.35 124.78V122.21H619.56V122.94C619.56 164.41 641.59 188.08 707.31 188.08Z" fill="#000000" />
          {/* T */}
          <path d="M839.38 183.5H925.66V77.07H963.30V4.59H800.28V77.07H839.38V183.5Z" fill="#000000" />
          {/* U */}
          <path d="M1064.16 189C1127.31 189 1158.34 163.49 1158.34 101.66V4.59H1068.38V109.18C1068.38 116.15 1067.46 118.35 1064.16 118.35C1060.86 118.35 1059.75 116.15 1059.75 109.18V4.59H969.80V101.66C969.80 162.76 993.66 189 1064.16 189Z" fill="#000000" />
          {/* D */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1164.84 183.5H1254.79C1309.79 183.5 1344.84 160.0 1344.84 101.66V87.34C1344.84 29.0 1309.79 4.59 1254.79 4.59H1164.84V183.5ZM1254.79 67.16H1256.79C1260.79 67.16 1263.42 72.85 1263.42 79.82V109.18C1263.42 116.15 1260.79 120.9 1254.79 120.9V67.16Z"
            fill="#000000"
          />
          {/* I */}
          <path d="M1351.34 183.5H1437.62V4.59H1351.34V183.5Z" fill="#000000" />
          {/* O */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1538.39 0C1601.54 0 1632.66 25.51 1632.66 87.34V101.66C1632.66 163.49 1601.54 189 1538.39 189C1475.24 189 1444.12 163.49 1444.12 101.66V87.34C1444.12 25.51 1475.24 0 1538.39 0ZM1538.39 70.65C1535.09 70.65 1534.08 72.85 1534.08 79.82V109.18C1534.08 116.15 1535.09 118.35 1538.39 118.35C1541.69 118.35 1542.70 116.15 1542.70 109.18V79.82C1542.70 72.85 1541.69 70.65 1538.39 70.65Z"
            fill="#000000"
          />
          {/* S */}
          <path d="M1726.91 188.08C1786.94 188.08 1813.38 166.25 1813.38 123.31C1813.38 89.18 1795.57 74.87 1751.33 66.79C1726.54 62.39 1721.95 60.74 1721.95 54.86C1721.95 52.66 1724.34 50.83 1726.91 50.83C1730.95 50.83 1733.89 54.13 1733.89 58.72V62.2H1811.36V59.27C1811.36 19.27 1781.43 0 1726.54 0C1668.53 0 1642.10 22.94 1642.10 61.1C1642.10 93.77 1658.99 105.88 1702.86 115.97C1729.11 121.84 1735.17 122.39 1735.17 128.63C1735.17 130.83 1733.52 133.58 1729.30 133.58C1725.99 133.58 1721.95 129.55 1721.95 124.78V122.21H1639.16V122.94C1639.16 164.41 1661.19 188.08 1726.91 188.08Z" fill="#000000" />
        </svg>
      </div>

      {/* ── 2. Rounded Video Player Card ── */}
      <div className="hero__video-wrapper" ref={videoCardRef}>
        <div className="hero__video-card">
          {/* Vimeo Background Loop Video */}
          <iframe
            src="https://player.vimeo.com/video/1008984369?app_id=122963&autoplay=1&muted=1&controls=0&loop=1&autopause=0&title=0&byline=0&playsinline=1&background=1"
            className="hero__video-iframe"
            title="Instrument 2026 Showreel"
            allow="autoplay; fullscreen; picture-in-picture"
            tabIndex="-1"
          />

          {/* Central Play Button Overlay */}
          <button
            className="hero__play-btn"
            onClick={() => setModalOpen(true)}
            aria-label="Play full 2026 Instrument reel"
          >
            <span className="hero__play-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>

          {/* Bottom Right Reel Info Label */}
          <div className="hero__video-badge">
            <span className="hero__video-dot" />
            <span>2026 REEL</span>
          </div>
        </div>
      </div>

      {/* ── 3. Intro Statement & CTA ── */}
      <div className="hero__statement-container">
        <h1 className="hero__statement">
          {STATEMENT_WORDS.map((word, i) => (
            <span key={i} className="hero__word-wrap">
              <span
                className="hero__word"
                ref={(el) => { wordsRef.current[i] = el }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__action">
          <Link to="/work" className="hero__cta-link">
            <span>View All Work</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── 4. Full Reel Theater Modal ── */}
      {modalOpen && (
        <div className="hero-modal" onClick={() => setModalOpen(false)}>
          <div className="hero-modal__content" onClick={(e) => e.stopPropagation()}>
            <button
              className="hero-modal__close"
              onClick={() => setModalOpen(false)}
              aria-label="Close video player"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="hero-modal__video-container">
              <iframe
                src="https://player.vimeo.com/video/1008984909?autoplay=1&title=0&byline=0&portrait=0"
                className="hero-modal__iframe"
                title="Instrument Full Reel"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
