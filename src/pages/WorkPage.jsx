import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { MOTION_REELS } from '../data/motionReels'
import './WorkPage.css'

const FILTER_ITEMS = [
  { id: 'all', label: 'ALL' },
  { id: 'brand', label: 'BRAND' },
  { id: 'marketing', label: 'MARKETING' },
  { id: 'product', label: 'PRODUCT' },
]

const DISPLAY_MODES = [
  { id: 'stack', label: 'STACK' },
  { id: 'grid', label: 'GRID' },
]

// Asymmetric featured duo rows matching Instrument.com (65/35, 35/65 rhythm)
const FEATURED_DUO_PAIRS = [
  {
    id: 'row-1',
    layout: 'wide-narrow',
    left: {
      client: 'ABSTRUCT Infrastructure',
      title: 'Monogram-led identity, visual system, and physical applications for a progressive infrastructure brand.',
      category: 'brand',
      tag: '#BRAND',
      image: '/work/abstruct/web/abstruct-thumb.png',
      href: '/work/abstruct',
      aspectRatio: '16 / 9',
    },
    right: {
      client: 'Multi-Drone 3D Path Optimizer',
      title: 'Real-time UAV path planning simulation platform powered by 3D RRT* and B-Spline trajectory smoothing.',
      category: 'product',
      tag: '#PRODUCT',
      image: '/work/drone-sim/dashboard.png',
      href: '/work/drone-sim',
      aspectRatio: '4 / 3',
    },
  },
  {
    id: 'row-2',
    layout: 'narrow-wide',
    left: {
      client: 'Apple Product Motion',
      title: 'Spatial product visualization, kinematic camera choreography, and dynamic real-time 3D motion graphics.',
      category: 'product',
      tag: '#PRODUCT',
      video: MOTION_REELS.apple.mp4,
      image: MOTION_REELS.apple.poster,
      href: '/work/apple-motion',
      aspectRatio: '4 / 3',
    },
    right: {
      client: 'Peak Club Snowboarding',
      title: 'Dynamic apparel identity, brand visual system, mobile app mockups, and winter campaign branding.',
      category: 'brand',
      tag: '#BRAND  #PRODUCT',
      image: '/work/peak-club/peak-head.png',
      href: '/work/peak-club',
      aspectRatio: '16 / 9',
      isFrame: true,
    },
  },
  {
    id: 'row-3',
    layout: 'wide-narrow',
    left: {
      client: 'Ember & Salt',
      title: 'Seasonal open-fire dining experience inspired by land, sea, and flame — bespoke brand identity and digital booking architecture.',
      category: 'brand',
      tag: '#BRAND  #MARKETING',
      image: '/work/ember-salt/ember-fire.jpg',
      href: '/work/ember-salt',
      aspectRatio: '16 / 9',
    },
    right: {
      client: 'Blitzit 2.0 Interface',
      title: 'Fluid micro-interactions, gesture response curves, and state architecture for next-generation productivity.',
      category: 'product',
      tag: '#PRODUCT',
      video: MOTION_REELS.blitzit.mp4,
      image: MOTION_REELS.blitzit.poster,
      href: '/work/blitzit-motion',
      aspectRatio: '4 / 3',
    },
  },
  {
    id: 'row-4',
    layout: 'narrow-wide',
    left: {
      client: 'C4Future — Carbon Intelligence',
      title: 'Estimate, explain, and compare product lifecycle emissions before production with XGBoost and TreeSHAP attribution.',
      category: 'product',
      tag: '#PRODUCT',
      image: '/work/c4future/carbon-thumb.png',
      href: '/work/c4future',
      aspectRatio: '4 / 3',
    },
    right: {
      client: 'Relay Collaboration Platform',
      title: 'Team chat with a teammate built in — unified channel architecture, live huddles, and autonomous workflows.',
      category: 'product',
      tag: '#PRODUCT',
      image: '/work/relay/relay-thumb.png',
      href: '/work/relay',
      aspectRatio: '16 / 9',
    },
  },
  {
    id: 'row-5',
    layout: 'full',
    left: {
      client: 'SV Studio Showreel',
      title: 'Creative direction, kinetic typographic systems, and high-fidelity studio production reel.',
      category: 'marketing',
      tag: '#MARKETING  #BRAND',
      video: MOTION_REELS.sv.mp4,
      image: MOTION_REELS.sv.poster,
      href: '/work/sv-showreel',
      aspectRatio: '16 / 9',
    },
  },
]

// Catalog archive strictly featuring Flo Studios client projects (each project appears once)
const CATALOG_ITEMS = [
  { title: 'ABSTRUCT Identity', tag: '#BRAND', category: 'brand', image: '/work/abstruct/web/abstruct-thumb.png', href: '/work/abstruct' },
  { title: 'Drone 3D Optimizer', tag: '#PRODUCT', category: 'product', image: '/work/drone-sim/dashboard.png', href: '/work/drone-sim' },
  { title: 'Apple Product Motion', tag: '#PRODUCT', category: 'product', image: MOTION_REELS.apple.poster, href: '/work/apple-motion' },
  { title: 'Peak Club Snowboarding', tag: '#BRAND  #PRODUCT', category: 'brand', image: '/work/peak-club/peak-head.png', href: '/work/peak-club' },
  { title: 'Ember & Salt', tag: '#BRAND  #MARKETING', category: 'brand', image: '/work/ember-salt/ember-fire.jpg', href: '/work/ember-salt' },
  { title: 'Blitzit 2.0 Interface', tag: '#PRODUCT', category: 'product', image: MOTION_REELS.blitzit.poster, href: '/work/blitzit-motion' },
  { title: 'C4Future Carbon AI', tag: '#PRODUCT', category: 'product', image: '/work/c4future/carbon-thumb.png', href: '/work/c4future' },
  { title: 'Relay Team Chat', tag: '#PRODUCT', category: 'product', image: '/work/relay/relay-thumb.png', href: '/work/relay' },
  { title: 'SV Studio Showreel', tag: '#MARKETING  #BRAND', category: 'marketing', image: MOTION_REELS.sv.poster, href: '/work/sv-showreel' },
]

const springBead = {
  type: 'spring',
  stiffness: 440,
  damping: 34,
  mass: 0.5,
}

function ProjectLink({ href, external, children, className, ariaLabel }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }
  return (
    <Link to={href || '/work'} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}

function CardMedia({ item }) {
  return (
    <div className={`media-box ${item.isFrame ? 'media-box--frame' : ''}`} style={{ aspectRatio: item.aspectRatio }}>
      {item.video ? (
        <video
          src={item.video}
          poster={item.image}
          muted
          loop
          playsInline
          autoPlay
          className="media-video"
        />
      ) : (
        <img src={item.image} alt={item.client} loading="lazy" />
      )}
      <div className="media-playback-btn" aria-hidden="true">
        <span>{item.video ? '▶' : '||'}</span>
      </div>
    </div>
  )
}

export default function WorkPage() {
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('stack')

  const matchesFilter = (item) => {
    if (!item) return false
    if (filter === 'all') return true
    return item.category === filter || (item.tag && item.tag.toLowerCase().includes(filter))
  }

  // Filter pairs for Stack view
  const filteredDuoRows = FEATURED_DUO_PAIRS.filter((row) => {
    return matchesFilter(row.left) || matchesFilter(row.right)
  })

  // Filter items for 6-column catalog
  const filteredCatalog = CATALOG_ITEMS.filter(matchesFilter)

  return (
    <main className="instrument-work-page">
      <SEO
        title="Work | Flo Studios"
        description="We create beautiful, functional, technology-forward work that elevates and unifies experiences across all brand surfaces."
        canonicalUrl="https://www.flostudio.co/work"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Work', item: 'https://www.flostudio.co/work', url: 'https://www.flostudio.co/work' },
        ]}
      />

      {/* ─── Giant Edge-to-Edge Wordmark Header (Exact Instrument.com Top) ─── */}
      <div className="work-page__wordmark-wrap">
        <Link to="/" className="work-page__wordmark-link" aria-label="Flo Studios Home">
          <span className="sr-only">FLO STUDIOS</span>
          <span className="work-page__wordmark" aria-hidden="true">FLO STUDIOS</span>
        </Link>
      </div>

      {/* ─── Sticky Abacus Toolbar (#filter-nav) ─── */}
      <section id="filter-nav" className="filter-nav-wrapper">
        <div className="filter-nav">
          {/* Primary Abacus (FILTER: ALL, BRAND, MARKETING, PRODUCT) */}
          <div className="filter-nav__primary">
            <div className="nav abacus">
              <ul className="nav__list" role="tablist" aria-label="Filter work by category">
                <li className="label">
                  <span>FILTER:</span>
                </li>
                {FILTER_ITEMS.map((item) => {
                  const isActive = filter === item.id.toLowerCase()
                  return (
                    <li key={item.id} className={isActive ? 'active' : ''}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`button-small button-abacus ${isActive ? 'button-abacus--active' : ''}`}
                        onClick={() => setFilter(item.id.toLowerCase())}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="workFilterBead"
                            className="bead"
                            transition={springBead}
                          />
                        )}
                        <span className="shape">
                          <span className="label">{item.label}</span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Secondary Abacus (DISPLAY: STACK, GRID) */}
          <div className="filter-nav__secondary">
            <div className="nav abacus">
              <ul className="nav__list" role="radiogroup" aria-label="Display mode">
                <li className="label">
                  <span>DISPLAY:</span>
                </li>
                {DISPLAY_MODES.map((mode) => {
                  const isActive = view === mode.id.toLowerCase()
                  return (
                    <li key={mode.id} className={isActive ? 'active' : ''}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        className={`button-small button-abacus ${isActive ? 'button-abacus--active' : ''}`}
                        onClick={() => setView(mode.id.toLowerCase())}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="workDisplayBead"
                            className="bead"
                            transition={springBead}
                          />
                        )}
                        <span className="shape">
                          <span className="icon">
                            {mode.id === 'stack' ? (
                              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path
                                  d="M12.9782 2.04883H3.41542C2.66094 2.04883 2.04932 2.66046 2.04932 3.41494V12.9777C2.04932 13.7322 2.66094 14.3438 3.41542 14.3438H12.9782C13.7327 14.3438 14.3443 13.7322 14.3443 12.9777V3.41494C14.3443 2.66046 13.7327 2.04883 12.9782 2.04883Z"
                                  stroke="currentColor"
                                  strokeWidth="1.025"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5.80583 6.83041C6.37169 6.83041 6.83041 6.37169 6.83041 5.80583C6.83041 5.23997 6.37169 4.78125 5.80583 4.78125C5.23997 4.78125 4.78125 5.23997 4.78125 5.80583C4.78125 6.37169 5.23997 6.83041 5.80583 6.83041Z"
                                  stroke="currentColor"
                                  strokeWidth="1.025"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14.3444 10.2463L10.9291 6.83105L3.41553 14.3446"
                                  stroke="currentColor"
                                  strokeWidth="1.025"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M6.66667 2H2V6.66667H6.66667V2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 2H9.33333V6.66667H14V2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 9.33333H9.33333V14H14V9.33333Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6.66667 9.33333H2V14H6.66667V9.33333Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className="label">{mode.label}</span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Page Intro Statement (Instrument Serif Condensed Display) ─── */}
      <section className="page-intro" aria-label="We create beautiful, functional, technology-forward work that elevates and unifies experiences across all brand surfaces.">
        <div className="page-intro__wrapper">
          <h1 className="page-intro__text">
            We create beautiful, functional, technology-forward work that elevates and unifies experiences across all brand surfaces.
          </h1>
        </div>
      </section>

      {/* ─── Main Content Container ─── */}
      <div className="work-display-container">
        {view === 'stack' ? (
          /* ── Asymmetric Duo Rows (Stack Mode: Each Project Shown Once Without Repeating) ── */
          <section className="work-duo-showcase" aria-label="Featured projects stack">
            {filteredDuoRows.map((row) => {
              const showLeft = matchesFilter(row.left)
              const showRight = matchesFilter(row.right)

              if (row.layout === 'full') {
                if (!showLeft) return null
                return (
                  <div key={row.id} className="work-duo-row work-duo-row--full">
                    <article className="work-card-featured work-card--full">
                      <ProjectLink
                        href={row.left.href}
                        external={row.left.external}
                        className="work-card-featured__media-link"
                        ariaLabel={`View ${row.left.client}`}
                      >
                        <CardMedia item={row.left} />
                      </ProjectLink>
                      <div className="work-card-featured__meta">
                        <p className="client-name">{row.left.client}</p>
                        <h2 className="project-title">{row.left.title}</h2>
                        <p className="project-tag">{row.left.tag}</p>
                      </div>
                    </article>
                  </div>
                )
              }

              if (!showLeft && !showRight) return null

              return (
                <div key={row.id} className={`work-duo-row work-duo-row--${row.layout}`}>
                  {showLeft && (
                    <article className={`work-card-featured ${row.layout === 'wide-narrow' ? 'work-card--wide' : 'work-card--narrow'}`}>
                      <ProjectLink
                        href={row.left.href}
                        external={row.left.external}
                        className="work-card-featured__media-link"
                        ariaLabel={`View ${row.left.client}`}
                      >
                        <CardMedia item={row.left} />
                      </ProjectLink>
                      <div className="work-card-featured__meta">
                        <p className="client-name">{row.left.client}</p>
                        <h2 className="project-title">{row.left.title}</h2>
                        <p className="project-tag">{row.left.tag}</p>
                      </div>
                    </article>
                  )}

                  {showRight && (
                    <article className={`work-card-featured ${row.layout === 'wide-narrow' ? 'work-card--narrow' : 'work-card--wide'}`}>
                      <ProjectLink
                        href={row.right.href}
                        external={row.right.external}
                        className="work-card-featured__media-link"
                        ariaLabel={`View ${row.right.client}`}
                      >
                        <CardMedia item={row.right} />
                      </ProjectLink>
                      <div className="work-card-featured__meta">
                        <p className="client-name">{row.right.client}</p>
                        <h2 className="project-title">{row.right.title}</h2>
                        <p className="project-tag">{row.right.tag}</p>
                      </div>
                    </article>
                  )}
                </div>
              )
            })}
          </section>
        ) : (
          /* ── Full Grid Mode: Comprehensive 6-Column Grid (Each Project Shown Once) ── */
          <section className="catalog-section" aria-label="Project grid catalog">
            <div className="catalog-grid catalog-grid--full">
              {filteredCatalog.map((item, idx) => (
                <article key={`${item.title}-${idx}`} className="catalog-card">
                  <ProjectLink
                    href={item.href}
                    external={item.external}
                    className="catalog-card__link"
                    ariaLabel={item.title}
                  >
                    <div className="catalog-card__media">
                      <img src={item.image} alt={item.title} loading="lazy" />
                    </div>
                  </ProjectLink>
                  <h3 className="catalog-card__client">{item.title}</h3>
                  <p className="catalog-card__tag">{item.tag}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ─── Bottom Outro Statement (Exact Instrument.com .text-tout) ─── */}
      <section className="text-tout" aria-label="Studio services manifesto">
        <div className="text-tout__wrapper">
          <p className="text-tout__text">
            To create brand experiences of the highest caliber, we take a multi-disciplinary approach to our work by seamlessly integrating strategy, creative, and technology, and staying in close partnership with our clients.
          </p>
          <div className="text-tout__cta">
            <Link to="/services" className="button-x-large">
              <span className="shape">
                <span className="label">View our services</span>
                <span className="icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M5 12H19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
