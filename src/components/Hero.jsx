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
  const [isMuted, setIsMuted] = useState(true)
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const videoCardRef = useRef(null)
  const cardVideoRef = useRef(null)
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
        <h1 className="hero__wordmark" aria-label="Flo Studios">
          FLO STUDIOS
        </h1>
      </div>

      {/* ── 2. Rounded Video Player Card ── */}
      <div className="hero__video-wrapper" ref={videoCardRef}>
        <div className="hero__video-card">
          {/* Looping HTML5 Background Video for Active Reel */}
          <video
            ref={cardVideoRef}
            key={currentReel.id}
            className="hero__video-media"
            autoPlay
            loop
            muted={isMuted}
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
