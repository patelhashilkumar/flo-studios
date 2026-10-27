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
    tags: ['brand'],
    category: 'Brand Identity',
    image: '/work/abstruct/web/moodboard.jpg',
    metric: 'Construction Identity',
    description: 'Monogram-led identity, visual system, and digital craft for a modern construction architecture firm.',
    size: 'hero',
  },
  {
    title: 'Apple Product Motion',
    slug: 'apple-motion',
    tags: ['motion', 'product'],
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
    tags: ['motion', 'product'],
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
    tags: ['motion', 'brand'],
    category: 'Direction & Animation',
    image: MOTION_REELS.sv.poster,
    videoWebm: MOTION_REELS.sv.webm,
    videoMp4: MOTION_REELS.sv.mp4,
    metric: 'Direction & Animation',
    description: 'Commercial brand direction, tactile physics simulation, and studio showreel montage.',
    size: 'regular',
  },
  {
    title: 'Deadstock Coffee',
    slug: 'deadstock-coffee',
    tags: ['product'],
    category: 'Development',
    image: 'https://a-us.storyblok.com/f/1004432/1025x1025/54b84c7565/build_week_deadstock_coffee_2026_teaser_thumbnail.png/m/',
    metric: '+140% Conversion',
    description: 'Custom Shopify Plus infrastructure driving +140% conversion through community storytelling.',
    size: 'regular',
  },
  {
    title: 'Flo Playspace',
    slug: 'playspace',
    tags: ['product'],
    category: 'Interactive Web',
    image: 'https://a-us.storyblok.com/f/1004432/2048x2048/0551a67827/medium-feature.png/m/',
    metric: 'Innovation by Design',
    description: 'High-performance WebGL sandbox and generative UI playground for spatial experiments.',
    size: 'regular',
  },
  {
    title: 'Feeld',
    slug: 'feeld-app',
    tags: ['product'],
    category: 'Product Strategy',
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/5430259e19/teaser_thumbnail_feeld_app.png/m/',
    metric: 'App of the Day',
    description: 'App of the Day dating experience rethinking connection architecture.',
    size: 'small',
  },
  {
    title: 'ŌURA',
    slug: 'oura-app',
    tags: ['product'],
    category: 'Digital Product',
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/2278acc3f6/oura-sleep-recovered-1.jpg/m/',
    metric: 'Flagship Experience',
    description: 'Sleep health biometric dashboard and flagship biometric web experience.',
    size: 'small',
  },
  {
    title: 'Perfected',
    slug: 'perfected',
    tags: ['brand', 'marketing'],
    category: 'Brand Strategy',
    image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ba453be5d3/medium-feature.png/m/',
    metric: 'Global Identity',
    description: 'Comprehensive identity architecture for an international luxury studio.',
    size: 'regular',
  },
  {
    title: 'Iru',
    slug: 'iru-launch',
    tags: ['brand', 'marketing'],
    category: '0 to 1 Launch',
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/1245eb7b86/iru_teaser_thumbnail.jpg/m/',
    metric: '0 to 1 Launch',
    description: 'Market entrance campaign and digital launch platform.',
    size: 'regular',
  },
  {
    title: 'Shutterfly',
    slug: 'shutterfly',
    tags: ['brand', 'marketing'],
    category: 'Design Systems',
    image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ed0a461423/shutterfly_teaser_thumbnail.png/m/',
    metric: 'Design System',
    description: 'Multi-brand design system and production component guidelines.',
    size: 'regular',
  },
  {
    title: 'Build Week',
    slug: 'build-week',
    tags: ['brand', 'marketing', 'product'],
    category: 'Venture & Launch',
    image: 'https://a-us.storyblok.com/f/1004432/1080x1080/fbdec33941/buildweek_logo_teaser_thumbnail.png/m/',
    metric: 'Brand & Launch',
    description: 'Hackathon brand sprint and high-velocity digital deployment.',
    size: 'regular',
  },
  {
    title: 'AlphaSense',
    slug: 'alphasense',
    tags: ['marketing'],
    category: 'Enterprise Motion',
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/b956675169/alphasense_teaser_thumbnail.png/m/',
    metric: 'Enterprise Campaign',
    description: 'Enterprise market intelligence visual storytelling and video campaign.',
    size: 'regular',
  },
]

const FILTER_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'product', label: 'Development' },
  { id: 'motion', label: 'Motion & 3D' },
  { id: 'brand', label: 'Brand Identity' },
  { id: 'marketing', label: 'Campaigns' },
]

const FEATURED_LIMIT = 5

const getFilterCount = (filterId) => {
  if (filterId === 'all') return FEATURED_LIMIT
  const count = WORK_ITEMS.filter((item) => item.tags.includes(filterId)).length
  return Math.min(FEATURED_LIMIT, count)
}

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
                const count = getFilterCount(cat.id)
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
                    <span className="work-section__filter-count">{count}</span>
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
            hoverGrow={1.3}
            reflowSpeed={0.35}
            dimOthers={0.28}
            hoverZoom={1.06}
            captionMode="always"
            showIndex={false}
            showBadge={false}
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
