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
      {/* ── 1. Giant "FLO" Wordmark ── */}
      <div className="hero__logo-container" ref={logoRef}>
        <svg
          viewBox="0 0 800 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hero__giant-logo"
          aria-label="Flo"
        >
          {/* F */}
          <path d="M90 15H152V185H90V15Z" fill="#000000" />
          <path d="M152 15H255V65H152V15Z" fill="#000000" />
          <path d="M152 88H235V135H152V88Z" fill="#000000" />
          {/* L */}
          <path d="M295 15H357V185H295V15Z" fill="#000000" />
          <path d="M357 135H475V185H357V135Z" fill="#000000" />
          {/* O */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M625 15C705 15 755 53 755 100C755 147 705 185 625 185C545 185 495 147 495 100C495 53 545 15 625 15ZM625 65C585 65 557 80 557 100C557 120 585 135 625 135C665 135 693 120 693 100C693 80 665 65 625 65Z"
            fill="#000000"
          />
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
