import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import './Hero.css'

const STATEMENT_WORDS = [
  "A", "creative", "&", "tech", "studio", "built", "at", "the", "intersection", "of", "content", "and", "technical", "infrastructure."
]

const HERO_REELS = [
  {
    id: 'apple',
    name: 'Apple',
    badge: 'APPLE MOTION',
    videoSrc: '/videos/apple.mov',
    posterSrc: '/videos/apple-thumb.png',
  },
  {
    id: 'blitzit',
    name: 'Blitzit',
    badge: 'BLITZIT 2.0',
    videoSrc: '/videos/blitzit2.mov',
    posterSrc: '/videos/blitzit-thumb.png',
  },
  {
    id: 'sv',
    name: 'SV',
    badge: 'SV SHOWCASE',
    videoSrc: '/videos/sv-final.mov',
    posterSrc: '/videos/sv-thumb.png',
  },
]

export default function Hero() {
  const [activeReelIdx, setActiveReelIdx] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const videoCardRef = useRef(null)
  const cardVideoRef = useRef(null)
  const modalVideoRef = useRef(null)
  const wordsRef = useRef([])

  const currentReel = HERO_REELS[activeReelIdx]

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

  // Coordinate video playback between card loop and full modal
  useEffect(() => {
    if (modalOpen) {
      cardVideoRef.current?.pause()
      if (modalVideoRef.current) {
        modalVideoRef.current.currentTime = 0
        modalVideoRef.current.play().catch(() => {})
      }
    } else {
      if (modalVideoRef.current) {
        modalVideoRef.current.pause()
      }
      cardVideoRef.current?.play().catch(() => {})
    }
  }, [modalOpen])

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
        <h1 className="hero__wordmark" aria-label="Flo Studios">
          FLO STUDIOS
        </h1>
      </div>

      {/* ── 2. Rounded Video Player Card ── */}
      <div className="hero__video-wrapper" ref={videoCardRef}>
        <div
          className="hero__video-card"
          data-cursor="WATCH"
          onClick={() => setModalOpen(true)}
          role="button"
          tabIndex={0}
          aria-label={`Open ${currentReel.name} video in theater mode`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setModalOpen(true)
          }}
        >
          {/* Looping HTML5 Background Video for Active Reel */}
          <video
            ref={cardVideoRef}
            key={currentReel.id}
            className="hero__video-media"
            autoPlay
            loop
            muted
            playsInline
            poster={currentReel.posterSrc}
          >
            <source src={currentReel.videoSrc} type="video/mp4" />
            <source src={currentReel.videoSrc} type="video/quicktime" />
          </video>

          {/* Bottom Left Glassmorphic Project Switcher */}
          <div className="hero__reel-switcher" role="tablist" aria-label="Motion Graphics Reels">
            {HERO_REELS.map((reel, idx) => (
              <button
                key={reel.id}
                role="tab"
                aria-selected={activeReelIdx === idx}
                className={`hero__reel-tab ${activeReelIdx === idx ? 'hero__reel-tab--active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveReelIdx(idx)
                }}
              >
                {reel.name}
              </button>
            ))}
          </div>

          {/* Bottom Right Reel Info Label */}
          <div className="hero__video-badge">
            <span className="hero__video-dot" />
            <span>{currentReel.badge}</span>
          </div>
        </div>
      </div>

      {/* ── 3. Intro Statement & CTA ── */}
      <div className="hero__statement-container">
        <h2 className="hero__statement">
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
        </h2>

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
            <div className="hero-modal__header">
              <div className="hero-modal__title-wrap">
                <span className="hero-modal__badge">NOW PLAYING</span>
                <span className="hero-modal__title">{currentReel.name} Motion Reel</span>
              </div>
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
            </div>
            <div className="hero-modal__video-container">
              <video
                ref={modalVideoRef}
                key={currentReel.id + '-modal'}
                className="hero-modal__video-player"
                controls
                autoPlay
                playsInline
                poster={currentReel.posterSrc}
              >
                <source src={currentReel.videoSrc} type="video/mp4" />
                <source src={currentReel.videoSrc} type="video/quicktime" />
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
