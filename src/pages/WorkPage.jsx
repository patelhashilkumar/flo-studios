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
      href: 'https://drone-sim-901y.onrender.com',
      external: true,
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
      href: '/work',
      aspectRatio: '4 / 3',
    },
    right: {
      client: 'Peak Club Snowboarding',
      title: 'Dynamic apparel identity, brand visual system, mobile app mockups, and winter campaign branding.',
      category: 'brand',
      tag: '#BRAND  #PRODUCT',
      image: '/work/peak-club/peak-head.png',
      href: 'https://drive.google.com/drive/folders/177Brxs1FX737QdR_4e-o2uuIBsjKgzfL',
      external: true,
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
      href: 'https://ember-salt-bento.lovable.app/',
      external: true,
      aspectRatio: '16 / 9',
    },
    right: {
      client: 'Blitzit 2.0 Interface',
      title: 'Fluid micro-interactions, gesture response curves, and state architecture for next-generation productivity.',
      category: 'product',
      tag: '#PRODUCT',
      video: MOTION_REELS.blitzit.mp4,
      image: MOTION_REELS.blitzit.poster,
      href: '/work',
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
      href: 'https://ad074890-c4future.hf.space/',
      external: true,
      aspectRatio: '4 / 3',
    },
    right: {
      client: 'Relay Collaboration Platform',
      title: 'Team chat with a teammate built in — unified channel architecture, live huddles, and autonomous workflows.',
      category: 'product',
      tag: '#PRODUCT',
      image: '/work/relay/relay-thumb.png',
      href: 'https://slack-reverse.vercel.app/',
      external: true,
      aspectRatio: '16 / 9',
    },
  },
  {
    id: 'row-5',
    layout: 'wide-narrow',
    left: {
      client: 'SV Studio Showreel',
      title: 'Creative direction, kinetic typographic systems, and high-fidelity studio production reel.',
      category: 'marketing',
      tag: '#MARKETING  #BRAND',
      video: MOTION_REELS.sv.mp4,
      image: MOTION_REELS.sv.poster,
      href: '/work',
      aspectRatio: '16 / 9',
    },
    right: {
      client: 'Peak Club Mobile System',
      title: 'Biometric telemetry tracking, member community roster, and mountain resort discovery experience.',
      category: 'product',
      tag: '#PRODUCT',
      image: '/work/peak-club/peak-mockup.png',
      href: 'https://drive.google.com/drive/folders/177Brxs1FX737QdR_4e-o2uuIBsjKgzfL',
      external: true,
      aspectRatio: '4 / 3',
    },
  },
]

// 6-column catalog archive matching Instrument.com lower grid
const CATALOG_ITEMS = [
  { title: 'Drone 3D Optimizer', tag: '#PRODUCT', category: 'product', image: '/work/drone-sim/dashboard.png', href: 'https://drone-sim-901y.onrender.com', external: true },
  { title: 'C4Future Carbon AI', tag: '#PRODUCT', category: 'product', image: '/work/c4future/carbon-thumb.png', href: 'https://ad074890-c4future.hf.space/', external: true },
  { title: 'Ember & Salt', tag: '#BRAND  #MARKETING', category: 'brand', image: '/work/ember-salt/ember-fire.jpg', href: 'https://ember-salt-bento.lovable.app/', external: true },
  { title: 'Relay Team Chat', tag: '#PRODUCT', category: 'product', image: '/work/relay/relay-thumb.png', href: 'https://slack-reverse.vercel.app/', external: true },
  { title: 'Peak Club Snowboarding', tag: '#BRAND  #PRODUCT', category: 'brand', image: '/work/peak-club/peak-head.png', href: 'https://drive.google.com/drive/folders/177Brxs1FX737QdR_4e-o2uuIBsjKgzfL', external: true },
  { title: 'Peak Club Mobile App', tag: '#PRODUCT', category: 'product', image: '/work/peak-club/peak-app.png', href: 'https://drive.google.com/drive/folders/177Brxs1FX737QdR_4e-o2uuIBsjKgzfL', external: true },
  { title: 'ABSTRUCT Identity', tag: '#BRAND', category: 'brand', image: '/work/abstruct/web/abstruct-thumb.png', href: '/work/abstruct' },
  { title: 'Apple Product Motion', tag: '#PRODUCT', category: 'product', image: MOTION_REELS.apple.poster, href: '/work' },
  { title: 'Blitzit 2.0 Interface', tag: '#PRODUCT', category: 'product', image: MOTION_REELS.blitzit.poster, href: '/work' },
  { title: 'SV Studio Showreel', tag: '#MARKETING', category: 'marketing', image: MOTION_REELS.sv.poster, href: '/work' },
  { title: 'Deadstock Coffee', tag: '#PRODUCT', category: 'product', image: 'https://a-us.storyblok.com/f/1004432/1025x1025/54b84c7565/build_week_deadstock_coffee_2026_teaser_thumbnail.png/m/' },
  { title: 'Instrument Playspace', tag: '#PRODUCT', category: 'product', image: 'https://a-us.storyblok.com/f/1004432/2048x2048/0551a67827/medium-feature.png/m/' },
  { title: 'Feeld', tag: '#PRODUCT', category: 'product', image: 'https://a-us.storyblok.com/f/1004432/1024x1024/5430259e19/teaser_thumbnail_feeld_app.png/m/' },
  { title: 'ŌURA Smart Ring', tag: '#PRODUCT', category: 'product', image: 'https://a-us.storyblok.com/f/1004432/1024x1024/2278acc3f6/oura-sleep-recovered-1.jpg/m/' },
  { title: 'AlphaSense', tag: '#MARKETING', category: 'marketing', image: 'https://a-us.storyblok.com/f/1004432/1024x1024/b956675169/alphasense_teaser_thumbnail.png/m/' },
  { title: 'Perfected', tag: '#BRAND  #MARKETING', category: 'brand', image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ba453be5d3/medium-feature.png/m/' },
  { title: 'Iru', tag: '#BRAND  #MARKETING', category: 'brand', image: 'https://a-us.storyblok.com/f/1004432/1024x1024/1245eb7b86/iru_teaser_thumbnail.jpg/m/' },
  { title: 'Eventbrite', tag: '#PRODUCT', category: 'product', image: 'https://a-us.storyblok.com/f/1004432/566x566/b1977a7872/eventbrite_thumb.png/m/' },
  { title: 'Shutterfly', tag: '#BRAND  #MARKETING', category: 'brand', image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ed0a461423/shutterfly_teaser_thumbnail.png/m/' },
  { title: 'Build Week', tag: '#BRAND  #PRODUCT', category: 'brand', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/fbdec33941/buildweek_logo_teaser_thumbnail.png/m/' },
  { title: 'Mercury', tag: '#MARKETING', category: 'marketing', image: 'https://a-us.storyblok.com/f/1004432/1200x630/1144fa66c6/mercury-bank-brand-campaign-social-share.png/m/' },
  { title: 'Nike Digital System', tag: '#BRAND  #PRODUCT', category: 'brand', image: 'https://a-us.storyblok.com/f/1004432/2048x2048/0551a67827/medium-feature.png/m/' },
  { title: 'Google Design', tag: '#BRAND  #PRODUCT', category: 'product', image: '/work/abstruct/web/abstruct-thumb.png', href: '/work/abstruct' },
  { title: 'Now in Android', tag: '#BRAND  #PRODUCT', category: 'product', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/fbdec33941/buildweek_logo_teaser_thumbnail.png/m/' },
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
          <>
            {/* ── Asymmetric Duo Rows (Stack Mode: 65/35 & 35/65 Asymmetric Pairs) ── */}
            <section className="work-duo-showcase" aria-label="Featured projects stack">
              {filteredDuoRows.map((row) => {
                const showLeft = matchesFilter(row.left)
                const showRight = matchesFilter(row.right)

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

            {/* ── 6-Column Archive Catalog (Exact Instrument.com Lower Grid) ── */}
            <section className="catalog-section" aria-label="Complete project archive">
              <div className="catalog-grid">
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
          </>
        ) : (
          /* ── Full Grid Mode: Comprehensive Multi-Column Grid ── */
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
