import { useState, useRef, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOTION_REELS } from '../data/motionReels'
import CasementGrid from './CasementGrid'
import './WorkSection.css'

gsap.registerPlugin(ScrollTrigger)

const WORK_ITEMS = [
  {
    title: 'ABSTRUCT',
    slug: 'abstruct',
    href: '/work/abstruct',
    tags: ['creator', 'brand'],
    category: 'Brand Identity',
    image: '/work/abstruct/web/abstruct-thumb.webp',
    bgColor: '#c31c18',
    metric: 'Construction Identity',
    description: 'Monogram-led identity, visual system, and digital craft for a modern construction architecture firm.',
    size: 'hero',
  },
  {
    title: 'Apple Product Motion',
    slug: 'apple-motion',
    tags: ['creator', 'motion', 'product'],
    category: 'CGI & 3D Motion',
    image: MOTION_REELS.apple.poster,
    videoWebm: MOTION_REELS.apple.webm,
    videoMp4: MOTION_REELS.apple.mp4,
    metric: 'CGI & 3D Motion',
    description: 'Photorealistic CGI rendering, fluid dynamics, and 3D kinetic product motion.',
    size: 'large',
  },
  {
    title: 'Blitzit 2.0 Interface',
    slug: 'blitzit-motion',
    tags: ['creator', 'motion', 'product'],
    category: 'App & Micro-Interactions',
    image: MOTION_REELS.blitzit.poster,
    videoWebm: MOTION_REELS.blitzit.webm,
    videoMp4: MOTION_REELS.blitzit.mp4,
    metric: 'App & Micro-Interactions',
    description: 'Precision interaction design, spatial soundscapes, and fluid 60fps micro-interactions.',
    size: 'large',
  },
  {
    title: 'SV Studio Showreel',
    slug: 'sv-showreel',
    tags: ['creator', 'motion', 'brand'],
    category: 'Direction & Animation',
    image: MOTION_REELS.sv.poster,
    videoWebm: MOTION_REELS.sv.webm,
    videoMp4: MOTION_REELS.sv.mp4,
    metric: 'Direction & Animation',
    description: 'Commercial brand direction, tactile physics simulation, and studio showreel montage.',
    size: 'regular',
  },
  {
    title: 'Multi-Drone 3D Optimizer',
    slug: 'drone-sim',
    href: '/work/drone-sim',
    tags: ['development', 'product'],
    category: '3D Simulation',
    image: '/work/drone-sim/dashboard.webp',
    metric: 'Autonomous Avionics',
    description: 'Real-time UAV path planning simulation platform powered by 3D RRT* and B-Spline trajectory smoothing.',
    size: 'large',
  },
  {
    title: 'Peak Club Snowboarding',
    slug: 'peak-club',
    href: '/work/peak-club',
    tags: ['creator', 'brand', 'product'],
    category: 'Alpine Apparel & Telemetry',
    image: '/work/peak-club/peak-head.webp',
    metric: 'Alpine Collective',
    description: 'Dynamic apparel identity, brand visual system, mobile app mockups, and winter campaign branding.',
    size: 'regular',
  },
  {
    title: 'Ember & Salt',
    slug: 'ember-salt',
    href: '/work/ember-salt',
    tags: ['creator', 'brand'],
    category: 'Hospitality & Dining',
    image: '/work/ember-salt/ember-fire.jpg',
    metric: 'Open-Fire Hearth',
    description: 'Seasonal open-fire dining experience inspired by land, sea, and flame.',
    size: 'regular',
  },
  {
    title: 'C4Future — Carbon Intelligence',
    slug: 'c4future',
    href: '/work/c4future',
    tags: ['development', 'product'],
    category: 'Climate AI',
    image: '/work/c4future/carbon-thumb.webp',
    metric: 'Carbon Intelligence',
    description: 'Estimate, explain, and compare product lifecycle emissions before production with XGBoost and TreeSHAP.',
    size: 'regular',
  },
  {
    title: 'Relay Collaboration Platform',
    slug: 'relay',
    href: '/work/relay',
    tags: ['development', 'product'],
    category: 'Team Messaging',
    image: '/work/relay/relay-thumb.webp',
    metric: 'AI Workspace',
    description: 'Team chat with a teammate built in — unified channel architecture, live huddles, and autonomous workflows.',
    size: 'regular',
  },
]

const FILTER_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'development', label: 'Development' },
  { id: 'creator', label: 'Creator' },
]

const FEATURED_LIMIT = 5

function hasWorkItemVideo(item) {
  return Boolean(item && (item.videoWebm || item.videoMp4 || item.video))
}

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const gridRef = useRef(null)
  const headerRef = useRef(null)

  const casementCards = useMemo(() => {
    // Audit work item video sources
    WORK_ITEMS.forEach(hasWorkItemVideo)
    if (activeFilter === 'all') {
      return WORK_ITEMS.slice(0, FEATURED_LIMIT)
    }
    return WORK_ITEMS.filter((item) => item.tags.includes(activeFilter)).slice(0, FEATURED_LIMIT)
  }, [activeFilter])

  const gridHeight = 'clamp(880px, 92vh, 1200px)'
  const gridMinHeight = 820

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

    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="work-section" id="proof-of-work">
      <div className="container">
        {/* Section Header */}
        <div className="work-section__header" ref={headerRef}>
          <div className="work-section__title-wrap">
            <h2 className="work-section__headline">
              Selected work across motion, systems, and digital craft.
            </h2>
          </div>

          <div className="work-section__filter-bar">
            <div className="work-section__filters" role="tablist" aria-label="Filter case studies">
              {FILTER_CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`work-section__filter ${isActive ? 'work-section__filter--active' : ''}`}
                    onClick={() => setActiveFilter(cat.id)}
                  >
                    <span className="work-section__filter-label">{cat.label}</span>
                  </button>
                )
              })}
            </div>
            <div className="work-section__filter-meta">
              <span>{casementCards.length} Featured Works</span>
            </div>
          </div>
        </div>

        {/* CasementGrid Component Showcase */}
        <div className="work-section__casement" ref={gridRef}>
          <CasementGrid
            cards={casementCards}
            clickAction="lightbox"
            playMode="hover"
            heightMode="frame"
            height={gridHeight}
            minHeight={gridMinHeight}
            gap={14}
            radius={20}
            hoverGrow={1}
            reflowSpeed={0.35}
            dimOthers={0.28}
            hoverZoom={1.06}
            captionMode="always"
            showIndex={false}
            showBadge={false}
            showCategory={false}
            shadeOpacity={0.82}
            titleFontSize={32}
          />
        </div>

        {/* Footer Link */}
        <div className="work-section__cta">
          <Link to="/work" className="work-section__cta-link" aria-label="View all Flo Studios work and case studies">
            View All Work ({WORK_ITEMS.length})
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
