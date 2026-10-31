import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { MOTION_REELS } from '../data/motionReels'
import './WorkPage.css'

const FEATURED_PROJECTS = [
  {
    title: 'ABSTRUCT: Brand Identity',
    client: 'ABSTRUCT Infrastructure',
    year: '2025',
    desc: 'Monogram-led identity, visual system, and physical applications for a progressive construction and infrastructure brand.',
    tags: ['Brand Identity'],
    category: 'brand',
    image: '/work/abstruct/web/moodboard.jpg',
    slug: 'abstruct',
    href: '/work/abstruct',
  },
  {
    title: 'Apple Product Motion',
    client: 'Apple Ecosystem',
    year: '2025',
    desc: 'Spatial product visualization, kinematic camera choreography, and dynamic real-time 3D motion graphics.',
    tags: ['Motion Systems', 'Digital Product'],
    category: 'motion',
    image: MOTION_REELS.apple.poster,
    slug: 'apple-motion',
  },
  {
    title: 'Blitzit 2.0 Interface Motion',
    client: 'Blitzit App',
    year: '2026',
    desc: 'Fluid micro-interactions, gesture response curves, and state architecture for next-generation productivity.',
    tags: ['Motion Systems', 'Digital Product'],
    category: 'motion',
    image: MOTION_REELS.blitzit.poster,
    slug: 'blitzit-motion',
  },
  {
    title: 'SV Studio Showreel',
    client: 'Flo Studios Film',
    year: '2026',
    desc: 'Creative direction, kinetic typographic systems, and high-fidelity studio production reel.',
    tags: ['Motion Systems', 'Brand Identity'],
    category: 'motion',
    image: MOTION_REELS.sv.poster,
    slug: 'sv-showreel',
  },
  {
    title: 'Electronic Arts',
    client: 'EA Sports & Interactive',
    year: '2025',
    desc: 'Multi-platform brand evolution and experiential design across interactive global entertainment.',
    tags: ['Brand Identity'],
    category: 'brand',
    image: 'https://a-us.storyblok.com/f/1004432/2048x1365/a24fa06aee/medium-feature-uber.png/m/',
    slug: 'electronic-arts',
  },
  {
    title: 'ŌURA Smart Ring',
    client: 'ŌURA Health',
    year: '2025',
    desc: 'Digital product experience, algorithmic sleep recovery narrative, and connected biometric interface.',
    tags: ['Digital Product'],
    category: 'product',
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/2278acc3f6/oura-sleep-recovered-1.jpg/m/',
    slug: 'oura-smart-ring',
  },
]

const ALL_PROJECTS = [
  { title: 'ABSTRUCT', category: 'brand', tags: ['Brand Identity'], image: '/work/abstruct/web/billboard.jpg', href: '/work/abstruct' },
  { title: 'Apple Product Motion', category: 'motion', tags: ['Motion Systems', 'Digital Product'], image: MOTION_REELS.apple.poster },
  { title: 'Blitzit 2.0 Interface', category: 'motion', tags: ['Motion Systems', 'Digital Product'], image: MOTION_REELS.blitzit.poster },
  { title: 'SV Studio Showreel', category: 'motion', tags: ['Motion Systems', 'Brand Identity'], image: MOTION_REELS.sv.poster },
  { title: 'Deadstock Coffee', category: 'product', tags: ['Digital Product'], image: 'https://a-us.storyblok.com/f/1004432/1025x1025/54b84c7565/build_week_deadstock_coffee_2026_teaser_thumbnail.png/m/' },
  { title: 'Instrument Playspace', category: 'product', tags: ['Digital Product'], image: 'https://a-us.storyblok.com/f/1004432/2048x2048/0551a67827/medium-feature.png/m/' },
  { title: 'Feeld', category: 'product', tags: ['Digital Product'], image: 'https://a-us.storyblok.com/f/1004432/1024x1024/5430259e19/teaser_thumbnail_feeld_app.png/m/' },
  { title: 'ŌURA', category: 'product', tags: ['Digital Product'], image: 'https://a-us.storyblok.com/f/1004432/1024x1024/2278acc3f6/oura-sleep-recovered-1.jpg/m/' },
  { title: 'AlphaSense', category: 'marketing', tags: ['Marketing'], image: 'https://a-us.storyblok.com/f/1004432/1024x1024/b956675169/alphasense_teaser_thumbnail.png/m/' },
  { title: 'Perfected', category: 'brand', tags: ['Brand Identity', 'Marketing'], image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ba453be5d3/medium-feature.png/m/' },
  { title: 'Iru', category: 'brand', tags: ['Brand Identity', 'Marketing'], image: 'https://a-us.storyblok.com/f/1004432/1024x1024/1245eb7b86/iru_teaser_thumbnail.jpg/m/' },
  { title: 'Eventbrite', category: 'product', tags: ['Digital Product'], image: 'https://a-us.storyblok.com/f/1004432/566x566/b1977a7872/eventbrite_thumb.png/m/' },
  { title: 'Shutterfly', category: 'brand', tags: ['Brand Identity', 'Marketing'], image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ed0a461423/shutterfly_teaser_thumbnail.png/m/' },
  { title: 'Build Week', category: 'brand', tags: ['Brand Identity', 'Digital Product'], image: 'https://a-us.storyblok.com/f/1004432/1080x1080/fbdec33941/buildweek_logo_teaser_thumbnail.png/m/' },
  { title: 'Mercury', category: 'marketing', tags: ['Marketing'], image: 'https://a-us.storyblok.com/f/1004432/1200x630/1144fa66c6/mercury-bank-brand-campaign-social-share.png/m/' },
]

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'brand', label: 'Brand Identity' },
  { id: 'product', label: 'Digital Product' },
  { id: 'motion', label: 'Motion Systems' },
  { id: 'marketing', label: 'Marketing' },
]

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

export default function WorkPage() {
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('stack')

  const filteredFeatured = filter === 'all'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter((p) => p.category === filter || (p.tags && p.tags.some(t => t.toLowerCase().includes(filter))))

  const filteredCatalog = filter === 'all'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.category === filter || (p.tags && p.tags.some(t => t.toLowerCase().includes(filter))))

  return (
    <motion.main className="work-page" variants={pageV} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Work & Case Studies — Flo Studios"
        description="Selected digital products, engineering architecture, and creator media productions engineered by Flo Studios across our Development and Creator divisions."
        canonicalUrl="https://www.flostudio.co/work"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Work & Case Studies', item: 'https://www.flostudio.co/work', url: 'https://www.flostudio.co/work' },
        ]}
      />

      {/* ─── Hero Header ─── */}
      <section className="work-page__hero">
        <div className="container">
          <div className="work-page__header">
            <p className="work-page__eyebrow">Selected Works & Case Studies</p>
            <h1 className="work-page__title">
              Engineered for attention, clarity, and enduring impact.
            </h1>
            <p className="work-page__subtitle">
              Collaborating globally with industry pioneers across digital product architecture, interactive 3D motion, and creator media ecosystems.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Control Bar ─── */}
      <div className="container">
        <div className="work-page__bar" role="toolbar" aria-label="Project filters and display mode">
          <div className="work-page__filter-list" role="tablist" aria-label="Filter projects by discipline">
            {FILTER_OPTIONS.map((f) => {
              const isActive = filter === f.id
              const count = f.id === 'all'
                ? ALL_PROJECTS.length
                : ALL_PROJECTS.filter(p => p.category === f.id || (p.tags && p.tags.some(t => t.toLowerCase().includes(f.id)))).length

              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`work-page__filter-btn ${isActive ? 'work-page__filter-btn--active' : ''}`}
                  onClick={() => setFilter(f.id)}
                >
                  <span>{f.label}</span>
                  <span className="work-page__filter-count">{count}</span>
                </button>
              )
            })}
          </div>

          <div className="work-page__view-switcher" role="radiogroup" aria-label="Layout view switcher">
            <button
              type="button"
              role="radio"
              aria-checked={view === 'stack'}
              className={`work-page__view-btn ${view === 'stack' ? 'work-page__view-btn--active' : ''}`}
              onClick={() => setView('stack')}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true">
                <rect x="2" y="3" width="12" height="4" rx="1" />
                <rect x="2" y="9" width="12" height="4" rx="1" />
              </svg>
              <span>Editorial</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={view === 'grid'}
              className={`work-page__view-btn ${view === 'grid' ? 'work-page__view-btn--active' : ''}`}
              onClick={() => setView('grid')}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true">
                <rect x="2" y="2" width="5" height="5" rx="1" />
                <rect x="9" y="2" width="5" height="5" rx="1" />
                <rect x="2" y="9" width="5" height="5" rx="1" />
                <rect x="9" y="9" width="5" height="5" rx="1" />
              </svg>
              <span>Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Projects Section ─── */}
      <div className="container">
        {view === 'stack' ? (
          <>
            {/* Featured Editorial Showcase */}
            {filteredFeatured.length > 0 && (
              <section className="work-page__featured" aria-label="Featured projects">
                {filteredFeatured.map((proj, idx) => {
                  const isAlt = idx % 2 === 1
                  const formattedIdx = String(idx + 1).padStart(2, '0')

                  return (
                    <Link
                      to={proj.href || '/work'}
                      className={`work-page__featured-card ${isAlt ? 'work-page__featured-card--alt' : ''}`}
                      key={proj.slug}
                    >
                      <div className="work-page__featured-media">
                        <img
                          src={proj.image}
                          alt={`${proj.title} case study`}
                          loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                      </div>
                      <div className="work-page__featured-info">
                        <div className="work-page__featured-meta">
                          <span className="work-page__featured-idx">{formattedIdx} / {String(filteredFeatured.length).padStart(2, '0')}</span>
                          {proj.href && <span className="work-page__featured-badge">Case Study</span>}
                        </div>
                        <h2 className="work-page__featured-title">{proj.title}</h2>
                        <p className="work-page__featured-desc">{proj.desc}</p>
                        <div className="work-page__tag-group">
                          {proj.tags.map((t) => (
                            <span key={t} className="work-page__tag">{t}</span>
                          ))}
                        </div>
                        <span className="work-page__cta-link">
                          {proj.href ? 'Explore case study' : 'View project details'}
                          <span aria-hidden="true"> →</span>
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </section>
            )}

            {/* Catalog Archive */}
            <section className="work-page__catalog" aria-label="Project archive catalog">
              <div className="work-page__catalog-heading">
                <h3 className="work-page__catalog-title">Catalog Archive</h3>
                <span className="work-page__catalog-count">{filteredCatalog.length} projects</span>
              </div>
              <div className="work-page__grid">
                {filteredCatalog.map((proj, i) => (
                  <Link
                    to={proj.href || '/work'}
                    className="work-page__card"
                    key={`${proj.title}-${i}`}
                  >
                    <div className="work-page__card-media">
                      <img src={proj.image} alt={proj.title} loading="lazy" />
                    </div>
                    <div className="work-page__card-info">
                      <h4 className="work-page__card-title">{proj.title}</h4>
                      <div className="work-page__card-tags">
                        {proj.tags.map((t) => (
                          <span key={t} className="work-page__card-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Uniform Dense Grid View */
          <section className="work-page__catalog" aria-label="Project gallery">
            <div className="work-page__grid work-page__grid--compact">
              {filteredCatalog.map((proj, i) => (
                <Link
                  to={proj.href || '/work'}
                  className="work-page__card"
                  key={`${proj.title}-${i}`}
                >
                  <div className="work-page__card-media">
                    <img src={proj.image} alt={proj.title} loading="lazy" />
                  </div>
                  <div className="work-page__card-info">
                    <h4 className="work-page__card-title">{proj.title}</h4>
                    <div className="work-page__card-tags">
                      {proj.tags.map((t) => (
                        <span key={t} className="work-page__card-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.main>
  )
}
