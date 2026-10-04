import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './WorkSection.css'

gsap.registerPlugin(ScrollTrigger)

const WORK_ITEMS = [
  {
    title: 'Apple Product Motion',
    slug: 'apple-motion',
    tags: ['motion', 'product'],
    image: '/videos/apple-thumb.png',
    video: '/videos/apple.mov',
    metric: 'CGI & 3D Motion',
  },
  {
    title: 'Blitzit 2.0 Interface',
    slug: 'blitzit-motion',
    tags: ['motion', 'product'],
    image: '/videos/blitzit-thumb.png',
    video: '/videos/blitzit2.mov',
    metric: 'App & Micro-Interactions',
  },
  {
    title: 'SV Studio Showreel',
    slug: 'sv-showreel',
    tags: ['motion', 'brand'],
    image: '/videos/sv-thumb.png',
    video: '/videos/sv-final.mov',
    metric: 'Direction & Animation',
  },
  {
    title: 'Deadstock Coffee',
    slug: 'deadstock-coffee',
    tags: ['product'],
    image: 'https://a-us.storyblok.com/f/1004432/1025x1025/54b84c7565/build_week_deadstock_coffee_2026_teaser_thumbnail.png/m/',
    metric: '+140% Conversion',
  },
  {
    title: 'Flo Playspace',
    slug: 'playspace',
    tags: ['product'],
    image: 'https://a-us.storyblok.com/f/1004432/2048x2048/0551a67827/medium-feature.png/m/',
    metric: 'Innovation by Design',
  },
  {
    title: 'Feeld',
    slug: 'feeld-app',
    tags: ['product'],
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/5430259e19/teaser_thumbnail_feeld_app.png/m/',
    metric: 'App of the Day',
  },
  {
    title: 'ŌURA',
    slug: 'oura-app',
    tags: ['product'],
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/2278acc3f6/oura-sleep-recovered-1.jpg/m/',
    metric: 'Flagship Experience',
  },
  {
    title: 'Perfected',
    slug: 'perfected',
    tags: ['brand', 'marketing'],
    image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ba453be5d3/medium-feature.png/m/',
    metric: 'Global Identity',
  },
  {
    title: 'Iru',
    slug: 'iru-launch',
    tags: ['brand', 'marketing'],
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/1245eb7b86/iru_teaser_thumbnail.jpg/m/',
    metric: '0 to 1 Launch',
  },
  {
    title: 'Shutterfly',
    slug: 'shutterfly',
    tags: ['brand', 'marketing'],
    image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ed0a461423/shutterfly_teaser_thumbnail.png/m/',
    metric: 'Design System',
  },
  {
    title: 'Build Week',
    slug: 'build-week',
    tags: ['brand', 'marketing', 'product'],
    image: 'https://a-us.storyblok.com/f/1004432/1080x1080/fbdec33941/buildweek_logo_teaser_thumbnail.png/m/',
    metric: 'Brand & Launch',
  },
  {
    title: 'AlphaSense',
    slug: 'alphasense',
    tags: ['marketing'],
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/b956675169/alphasense_teaser_thumbnail.png/m/',
    metric: 'Enterprise Campaign',
  },
]

const FILTERS = ['all', 'motion', 'brand', 'marketing', 'product']

function WorkCard({ item }) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (item.video && videoRef.current) {
      if (isHovered) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isHovered, item.video])

  return (
    <Link
      to="/work"
      className="work-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="work-card__media">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className={`work-card__img ${isHovered && item.video ? 'work-card__img--hidden' : ''}`}
        />
        {item.video && (
          <video
            ref={videoRef}
            src={item.video}
            loop
            muted
            playsInline
            preload="metadata"
            className={`work-card__video ${isHovered ? 'work-card__video--active' : ''}`}
          />
        )}
        {item.metric && (
          <span className="work-card__badge-metric">{item.metric}</span>
        )}
        {item.video && (
          <span className="work-card__video-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            MOTION
          </span>
        )}
      </div>
      <div className="work-card__info">
        <h3 className="work-card__title">{item.title}</h3>
        <div className="work-card__tags">
          {item.tags.map((t) => (
            <span key={t} className="work-card__tag">{t}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const gridRef = useRef(null)
  const headerRef = useRef(null)
  const spotlightRef = useRef(null)

  const filtered = activeFilter === 'all'
    ? WORK_ITEMS
    : WORK_ITEMS.filter((item) => item.tags.includes(activeFilter))

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(
        spotlightRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: spotlightRef.current, start: 'top 85%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.work-card')
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
    )
  }, [activeFilter])

  return (
    <section className="work-section" id="proof-of-work">
      <div className="container">
        {/* Section Header */}
        <div className="work-section__header" ref={headerRef}>
          <div className="work-section__title-wrap">
            <span className="work-section__label">Proof Of Work</span>
            <h2 className="work-section__headline">
              Selected Work Across Motion, Systems, And Digital <span className="work-section__highlight">CRAFT.</span>
            </h2>
          </div>

          <div className="work-section__filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`work-section__filter ${activeFilter === f ? 'work-section__filter--active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Darkroom-style Spotlight Bento Highlights */}
        <div className="work-spotlight-bento" ref={spotlightRef}>
          <div className="work-bento-card work-bento-card--light">
            <div className="work-bento-card__badge">
              <span className="work-bento-card__dot" />
              <span>VENTURE &amp; COMMERCE</span>
            </div>
            <div className="work-bento-card__center">
              <span className="work-bento-card__logo-text">Lovable</span>
            </div>
            <div className="work-bento-card__content">
              <h3 className="work-bento-card__title">Commerce built for creators</h3>
              <p className="work-bento-card__desc">
                Direct platforms and digital infrastructure designed to turn audience attention into sustained community.
              </p>
            </div>
          </div>

          <div className="work-bento-card work-bento-card--dark">
            <div className="work-bento-card__badge">
              <span className="work-bento-card__dot" />
              <span>EXPERIENCE ENGINEERING</span>
            </div>
            <div className="work-bento-card__center">
              <svg className="work-bento-card__wireframe" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 50L50 20L80 50L50 80L20 50Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
                <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M50 10V90M10 50H90" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
                <circle cx="50" cy="50" r="4" fill="currentColor"/>
              </svg>
            </div>
            <div className="work-bento-card__content">
              <h3 className="work-bento-card__title">Interactive web systems</h3>
              <p className="work-bento-card__desc">
                High-performance 3D environments, spatial graphics, and fluid digital products built for scale.
              </p>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="work-section__grid" ref={gridRef}>
          {filtered.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>

        {/* Footer Link */}
        <div className="work-section__cta">
          <Link to="/work" className="work-section__cta-link">
            View All Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
