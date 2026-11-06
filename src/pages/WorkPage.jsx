import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import { MOTION_REELS } from '../data/motionReels'
import './WorkPage.css'

const FILTER_ITEMS = [
  { id: 'all', label: 'all' },
  { id: 'brand', label: 'brand' },
  { id: 'marketing', label: 'marketing' },
  { id: 'product', label: 'product' },
]

const DISPLAY_MODES = [
  { id: 'stack', label: 'stack' },
  { id: 'grid', label: 'grid' },
]

const STACK_FEATURES = [
  {
    client: 'ABSTRUCT Infrastructure',
    title: 'Monogram-led identity, visual system, and physical applications for a progressive infrastructure brand.',
    category: 'brand',
    tags: ['brand'],
    image: '/work/abstruct/web/abstruct-thumb.png',
    href: '/work/abstruct',
    offset: '60%',
  },
  {
    client: 'Apple Ecosystem',
    title: 'Spatial product visualization, kinematic camera choreography, and dynamic real-time 3D motion graphics.',
    category: 'product',
    tags: ['product', 'brand'],
    image: MOTION_REELS.apple.poster,
    offset: '0%',
  },
  {
    client: 'Blitzit App',
    title: 'Fluid micro-interactions, gesture response curves, and state architecture for next-generation productivity.',
    category: 'product',
    tags: ['product'],
    image: MOTION_REELS.blitzit.poster,
    offset: '50%',
  },
  {
    client: 'Electronic Arts',
    title: 'The evolution of EA: from gaming legacy to entertainment leader.',
    category: 'brand',
    tags: ['brand'],
    image: 'https://a-us.storyblok.com/f/1004432/2048x1365/a24fa06aee/medium-feature-uber.png/m/',
    offset: '0%',
  },
  {
    client: 'ŌURA Health',
    title: 'Transforming the way people discover and embrace the Oura Smart Ring.',
    category: 'product',
    tags: ['product'],
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/2278acc3f6/oura-sleep-recovered-1.jpg/m/',
    offset: '25%',
  },
  {
    client: 'Flo Studios Film',
    title: 'Creative direction, kinetic typographic systems, and high-fidelity studio production reel.',
    category: 'marketing',
    tags: ['marketing', 'brand'],
    image: MOTION_REELS.sv.poster,
    offset: '80%',
  },
]

const GRID_CATALOG = [
  {
    title: 'ABSTRUCT',
    category: 'brand',
    tags: ['brand'],
    image: '/work/abstruct/web/abstruct-thumb.png',
    href: '/work/abstruct',
  },
  {
    title: 'Apple Product Motion',
    category: 'product',
    tags: ['product'],
    image: MOTION_REELS.apple.poster,
  },
  {
    title: 'Blitzit 2.0 Interface',
    category: 'product',
    tags: ['product'],
    image: MOTION_REELS.blitzit.poster,
  },
  {
    title: 'SV Studio Showreel',
    category: 'marketing',
    tags: ['marketing'],
    image: MOTION_REELS.sv.poster,
  },
  {
    title: 'Deadstock Coffee',
    category: 'product',
    tags: ['product'],
    image: 'https://a-us.storyblok.com/f/1004432/1025x1025/54b84c7565/build_week_deadstock_coffee_2026_teaser_thumbnail.png/m/',
  },
  {
    title: 'Instrument Playspace',
    category: 'product',
    tags: ['product'],
    image: 'https://a-us.storyblok.com/f/1004432/2048x2048/0551a67827/medium-feature.png/m/',
  },
  {
    title: 'Feeld',
    category: 'product',
    tags: ['product'],
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/5430259e19/teaser_thumbnail_feeld_app.png/m/',
  },
  {
    title: 'ŌURA',
    category: 'product',
    tags: ['product'],
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/2278acc3f6/oura-sleep-recovered-1.jpg/m/',
  },
  {
    title: 'AlphaSense',
    category: 'marketing',
    tags: ['marketing'],
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/b956675169/alphasense_teaser_thumbnail.png/m/',
  },
  {
    title: 'Perfected',
    category: 'brand',
    tags: ['brand'],
    image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ba453be5d3/medium-feature.png/m/',
  },
  {
    title: 'Iru',
    category: 'brand',
    tags: ['brand'],
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/1245eb7b86/iru_teaser_thumbnail.jpg/m/',
  },
  {
    title: 'Eventbrite',
    category: 'product',
    tags: ['product'],
    image: 'https://a-us.storyblok.com/f/1004432/566x566/b1977a7872/eventbrite_thumb.png/m/',
  },
  {
    title: 'Shutterfly',
    category: 'brand',
    tags: ['brand'],
    image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ed0a461423/shutterfly_teaser_thumbnail.png/m/',
  },
  {
    title: 'Build Week',
    category: 'brand',
    tags: ['brand'],
    image: 'https://a-us.storyblok.com/f/1004432/1080x1080/fbdec33941/buildweek_logo_teaser_thumbnail.png/m/',
  },
  {
    title: 'Mercury',
    category: 'marketing',
    tags: ['marketing'],
    image: 'https://a-us.storyblok.com/f/1004432/1200x630/1144fa66c6/mercury-bank-brand-campaign-social-share.png/m/',
  },
  {
    title: 'Nike Digital Design System',
    category: 'product',
    tags: ['product', 'brand'],
    image: 'https://a-us.storyblok.com/f/1004432/2048x2048/0551a67827/medium-feature.png/m/',
  },
  {
    title: 'ServiceNow Rebrand',
    category: 'brand',
    tags: ['brand'],
    image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ba453be5d3/medium-feature.png/m/',
  },
  {
    title: 'Uber for Business',
    category: 'marketing',
    tags: ['marketing'],
    image: 'https://a-us.storyblok.com/f/1004432/2048x1365/a24fa06aee/medium-feature-uber.png/m/',
  },
]

const springBead = {
  type: 'spring',
  stiffness: 440,
  damping: 34,
  mass: 0.5,
}

export default function WorkPage() {
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('stack')

  const matchesFilter = (item) => {
    if (filter === 'all') return true
    return item.category === filter || (item.tags && item.tags.includes(filter))
  }

  const filteredFeatures = STACK_FEATURES.filter(matchesFilter)
  const filteredGrid = GRID_CATALOG.filter(matchesFilter)

  return (
    <main className="instrument-work-page">
      <SEO
        title="Work — Flo Studios"
        description="We create beautiful, functional, technology-forward work that elevates and unifies experiences across all brand surfaces."
        canonicalUrl="https://www.flostudio.co/work"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Work', item: 'https://www.flostudio.co/work', url: 'https://www.flostudio.co/work' },
        ]}
      />

      {/* ─── Sticky Abacus Filter Bar (Exact Instrument.com #filter-nav) ─── */}
      <section id="filter-nav" className="filter-nav-wrapper">
        <div className="filter-nav">
          {/* Primary Abacus (Filter by Discipline) */}
          <div className="filter-nav__primary">
            <div className="nav abacus">
              <ul className="nav__list" role="tablist" aria-label="Filter work by category">
                <li className="label">
                  <span>Filter:</span>
                </li>
                {FILTER_ITEMS.map((item) => {
                  const isActive = filter === item.id
                  return (
                    <li key={item.id} className={isActive ? 'active' : ''}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`button-small button-abacus ${isActive ? 'button-abacus--active' : ''}`}
                        onClick={() => setFilter(item.id)}
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

          {/* Secondary Abacus (Display Switcher: Stack vs Grid) */}
          <div className="filter-nav__secondary">
            <div className="nav abacus">
              <ul className="nav__list" role="radiogroup" aria-label="Display mode">
                <li className="label">
                  <span>Display:</span>
                </li>
                {DISPLAY_MODES.map((mode) => {
                  const isActive = view === mode.id
                  return (
                    <li key={mode.id} className={isActive ? 'active' : ''}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        className={`button-small button-abacus ${isActive ? 'button-abacus--active' : ''}`}
                        onClick={() => setView(mode.id)}
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

      {/* ─── Page Intro Statement (Verbatim Instrument Typographic Statement) ─── */}
      <section className="page-intro" aria-label="We create beautiful, functional, technology-forward work that elevates and unifies experiences across all brand surfaces.">
        <div className="page-intro__wrapper">
          <h1 className="page-intro__text">
            We create beautiful, functional, technology-forward work that elevates and unifies experiences across all brand surfaces.
          </h1>
        </div>
      </section>

      {/* ─── Main Content Display (Stack Editorial vs Grid) ─── */}
      <div className="work-display-container">
        {view === 'stack' ? (
          <section className="work-features" aria-label="Featured projects stack">
            {filteredFeatures.length > 0 ? (
              filteredFeatures.map((proj, idx) => (
                <article
                  key={`${proj.client}-${idx}`}
                  className="work-feature"
                  style={{ '--offset': proj.offset || '0%' }}
                >
                  {/* Rounded Media Container */}
                  <div className="media">
                    <div className="media__content">
                      <Link to={proj.href || '/work'} className="media__link" aria-label={`View ${proj.client} case study`}>
                        <div className="media-large">
                          <img
                            src={proj.image}
                            alt={`${proj.client} case study`}
                            loading={idx === 0 ? 'eager' : 'lazy'}
                          />
                        </div>
                        {/* Hover Floating Glass Pill */}
                        <div className="hover-button">
                          <span className="shape">
                            <span className="label">Case Study</span>
                            <span className="icon">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M3.33333 8H12.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Editorial Text Block */}
                  <div className="text">
                    <div className="title-tags">
                      <ul className="tag-list tag-list--left" aria-label="Disciplines">
                        {proj.tags.map((tag) => (
                          <li key={tag}>
                            <button
                              type="button"
                              className="tag"
                              onClick={() => setFilter(tag)}
                              aria-label={`Filter by ${tag}`}
                            >
                              <span className="tag__hashtag">#</span>
                              <span>{tag}</span>
                            </button>
                          </li>
                        ))}
                      </ul>

                      <Link to={proj.href || '/work'} className="feature-text-link">
                        <p className="client">{proj.client}</p>
                        <h2 className="title">{proj.title}</h2>
                      </Link>
                    </div>

                    <Link to={proj.href || '/work'} className="inline-button">
                      <span className="shape">
                        <span className="label">View Case Study</span>
                        <span className="icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M5 12H19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </span>
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="work-empty-state">
                <p>No featured projects found under #{filter}.</p>
                <button type="button" className="button-small button-abacus" onClick={() => setFilter('all')}>
                  <span className="shape"><span className="label">view all projects</span></span>
                </button>
              </div>
            )}
          </section>
        ) : (
          /* ─── 4-Column Responsive Grid View (Exact Instrument .card-grid) ─── */
          <section className="card-grid" aria-label="Projects grid catalog">
            <div className="card-grid__cards">
              {filteredGrid.length > 0 ? (
                filteredGrid.map((proj, idx) => (
                  <div key={`${proj.title}-${idx}`} className="card-grid__card-container">
                    <article className="work-card">
                      <div className="work-card__media">
                        <Link to={proj.href || '/work'} aria-label={proj.title}>
                          <div className="image-component image-component--rounded-corners">
                            <img src={proj.image} alt={proj.title} loading="lazy" />
                          </div>
                        </Link>
                      </div>
                      <div className="work-card__text">
                        <Link to={proj.href || '/work'}>
                          <h3 className="title">{proj.title}</h3>
                        </Link>
                        <div className="work-card__tags">
                          <ul className="tag-list tag-list--left">
                            {proj.tags.map((tag) => (
                              <li key={tag}>
                                <button
                                  type="button"
                                  className="tag"
                                  onClick={() => setFilter(tag)}
                                  aria-label={`Filter by ${tag}`}
                                >
                                  <span className="tag__hashtag">#</span>
                                  <span>{tag}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  </div>
                ))
              ) : (
                <div className="work-empty-state">
                  <p>No projects found under #{filter}.</p>
                  <button type="button" className="button-small button-abacus" onClick={() => setFilter('all')}>
                    <span className="shape"><span className="label">view all projects</span></span>
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* ─── Bottom Outro Statement (Exact Instrument .text-tout & Button) ─── */}
      <section className="text-tout" aria-label="Studio philosophy and services">
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
