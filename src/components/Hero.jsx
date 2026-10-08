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
    webmSrc: '/videos/apple.webm',
    mp4Src: '/videos/apple.mp4',
    posterSrc: '/videos/apple-thumb.webp',
  },
  {
    id: 'blitzit',
    name: 'Blitzit',
    badge: 'BLITZIT 2.0',
    webmSrc: '/videos/blitzit2.webm',
    mp4Src: '/videos/blitzit2.mp4',
    posterSrc: '/videos/blitzit-thumb.webp',
  },
  {
    id: 'sv',
    name: 'SV',
    badge: 'SV SHOWCASE',
    webmSrc: '/videos/sv-final.webm',
    mp4Src: '/videos/sv-final.mp4',
    posterSrc: '/videos/sv-thumb.webp',
  },
]

export default function Hero() {
  const [activeReelIdx, setActiveReelIdx] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [preloadStrategy, setPreloadStrategy] = useState('auto')
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const videoCardRef = useRef(null)
  const cardVideoRef = useRef(null)
  const wordsRef = useRef([])

  const currentReel = HERO_REELS[activeReelIdx]

  // Adaptive network-aware preloading
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = navigator.connection
      if (conn?.saveData || conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g') {
        setPreloadStrategy('metadata')
      }
    }
  }, [])

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

  const handleSelectReel = (idx) => {
    if (idx === activeReelIdx) return
    setIsVideoPlaying(false)
    setActiveReelIdx(idx)
  }

  const handleTabHover = (idx) => {
    const reel = HERO_REELS[idx]
    if (reel?.posterSrc) {
      const img = new Image()
      img.src = reel.posterSrc
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    if (cardVideoRef.current) {
      const nextMuted = !cardVideoRef.current.muted
      cardVideoRef.current.muted = nextMuted
      setIsMuted(nextMuted)
    } else {
      setIsMuted((prev) => !prev)
    }
  }

  return (
    <section className="hero" ref={heroRef} id="hero">
      {/* ── 1. Giant "FLO STUDIOS" Wordmark ── */}
      <div className="hero__logo-container" ref={logoRef}>
        <h1 className="hero__wordmark" aria-label="Flo Studios — Creative & Technology Studio">
          FLO STUDIOS
          <span className="sr-only"> — Creative &amp; Technology Studio</span>
        </h1>
      </div>

      {/* ── 2. Rounded Video Player Card ── */}
      <div className="hero__video-wrapper" ref={videoCardRef}>
        <div className="hero__video-card">
          {/* Smooth Cross-Fade Poster Placeholder */}
          <img
            src={currentReel.posterSrc}
            alt=""
            className={`hero__video-poster ${isVideoPlaying ? 'hero__video-poster--hidden' : ''}`}
            fetchPriority={activeReelIdx === 0 ? 'high' : 'auto'}
            decoding="async"
            aria-hidden="true"
          />

          {/* Looping HTML5 Background Video for Active Reel */}
          <video
            ref={cardVideoRef}
            key={currentReel.id}
            className="hero__video-media"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload={preloadStrategy}
            onPlaying={() => setIsVideoPlaying(true)}
            onLoadedData={(e) => {
              const playPromise = e.target.play()
              if (playPromise !== undefined) {
                playPromise.then(() => setIsVideoPlaying(true)).catch(() => {})
              }
            }}
          >
            {currentReel.webmSrc && <source src={currentReel.webmSrc} type="video/webm" />}
            {currentReel.mp4Src && <source src={currentReel.mp4Src} type="video/mp4" />}
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
                  handleSelectReel(idx)
                }}
                onMouseEnter={() => handleTabHover(idx)}
                onFocus={() => handleTabHover(idx)}
              >
                {reel.name}
              </button>
            ))}
          </div>

          {/* Bottom Right Glassmorphic Mute/Audio Toggle */}
          <button
            type="button"
            className={`hero__mute-btn ${!isMuted ? 'hero__mute-btn--active' : ''}`}
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
            <span className="hero__mute-btn-text">{isMuted ? 'MUTE' : 'UNMUTE'}</span>
          </button>
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
    </section>
  )
}
