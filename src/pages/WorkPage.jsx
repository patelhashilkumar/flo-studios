import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/SEO'
import './Pages.css'

gsap.registerPlugin(ScrollTrigger)

const FEATURED_PROJECTS = [
  {
    title: 'Apple Product Motion',
    desc: 'Product visualization and dynamic 3D motion graphics.',
    tags: ['motion', 'product'],
    image: '/videos/apple-thumb.png',
    slug: 'apple-motion',
  },
  {
    title: 'Blitzit 2.0 Interface Motion',
    desc: 'Fluid micro-interactions and productivity interface design.',
    tags: ['motion', 'product'],
    image: '/videos/blitzit-thumb.png',
    slug: 'blitzit-motion',
  },
  {
    title: 'SV Studio Showreel',
    desc: 'Creative direction, kinetic typography, and studio showcase.',
    tags: ['motion', 'brand'],
    image: '/videos/sv-thumb.png',
    slug: 'sv-showreel',
  },
  {
    title: 'Electronic Arts',
    desc: 'Brand evolution across interactive entertainment.',
    tags: ['brand'],
    image: 'https://a-us.storyblok.com/f/1004432/2048x1365/a24fa06aee/medium-feature-uber.png/m/',
    slug: 'electronic-arts',
  },
  {
    title: 'Oura Smart Ring',
    desc: 'Digital experience and product narrative.',
    tags: ['product'],
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/2278acc3f6/oura-sleep-recovered-1.jpg/m/',
    slug: 'oura-smart-ring',
  },
]

const ALL_PROJECTS = [
  { title: 'Apple Product Motion', tags: ['motion', 'product'], image: '/videos/apple-thumb.png' },
  { title: 'Blitzit 2.0 Interface', tags: ['motion', 'product'], image: '/videos/blitzit-thumb.png' },
  { title: 'SV Studio Showreel', tags: ['motion', 'brand'], image: '/videos/sv-thumb.png' },
  { title: 'Deadstock Coffee', tags: ['product'], image: 'https://a-us.storyblok.com/f/1004432/1025x1025/54b84c7565/build_week_deadstock_coffee_2026_teaser_thumbnail.png/m/' },
  { title: 'Instrument Playspace', tags: ['product'], image: 'https://a-us.storyblok.com/f/1004432/2048x2048/0551a67827/medium-feature.png/m/' },
  { title: 'Feeld', tags: ['product'], image: 'https://a-us.storyblok.com/f/1004432/1024x1024/5430259e19/teaser_thumbnail_feeld_app.png/m/' },
  { title: 'ŌURA', tags: ['product'], image: 'https://a-us.storyblok.com/f/1004432/1024x1024/2278acc3f6/oura-sleep-recovered-1.jpg/m/' },
  { title: 'AlphaSense', tags: ['marketing'], image: 'https://a-us.storyblok.com/f/1004432/1024x1024/b956675169/alphasense_teaser_thumbnail.png/m/' },
  { title: 'Perfected', tags: ['brand', 'marketing'], image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ba453be5d3/medium-feature.png/m/' },
  { title: 'Iru', tags: ['brand', 'marketing'], image: 'https://a-us.storyblok.com/f/1004432/1024x1024/1245eb7b86/iru_teaser_thumbnail.jpg/m/' },
  { title: 'Eventbrite', tags: ['product'], image: 'https://a-us.storyblok.com/f/1004432/566x566/b1977a7872/eventbrite_thumb.png/m/' },
  { title: 'Shutterfly', tags: ['brand', 'marketing'], image: 'https://a-us.storyblok.com/f/1004432/2048x2048/ed0a461423/shutterfly_teaser_thumbnail.png/m/' },
  { title: 'Build Week', tags: ['brand', 'marketing', 'product'], image: 'https://a-us.storyblok.com/f/1004432/1080x1080/fbdec33941/buildweek_logo_teaser_thumbnail.png/m/' },
  { title: 'Mercury', tags: ['marketing'], image: 'https://a-us.storyblok.com/f/1004432/1200x630/1144fa66c6/mercury-bank-brand-campaign-social-share.png/m/' },
]

const FILTERS = ['all', 'motion', 'brand', 'marketing', 'product']

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export default function WorkPage() {
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('stack')
  const headerRef = useRef(null)

  const filtered = filter === 'all'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.tags.includes(filter))

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-page__hero-word', { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: 'power3.out', delay: 0.2 })
    }, headerRef)
    return () => ctx.revert()
  }, [])

  return (
    <motion.main className="work-page" variants={pageV} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Work & Case Studies — Flo Studios"
        description="Browse portfolio work and case studies by Flo Studios across 3D motion design, brand identities, and high-performance digital products."
        canonicalUrl="https://www.flostudio.co/work"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/' },
          { name: 'Work & Case Studies', item: 'https://www.flostudio.co/work' },
        ]}
      />

      <section className="work-page__hero" ref={headerRef}>
        <div className="container">
          <div className="work-page__filters">
            <div className="work-page__filter-group">
              <span className="work-page__filter-label">Filter:</span>
              {FILTERS.map((f) => (
                <button key={f} className={`work-page__filter ${filter === f ? 'work-page__filter--active' : ''}`}
                  onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
            <div className="work-page__filter-group">
              <span className="work-page__filter-label">Display:</span>
              <button className={`work-page__filter ${view === 'stack' ? 'work-page__filter--active' : ''}`}
                onClick={() => setView('stack')}>stack</button>
              <button className={`work-page__filter ${view === 'grid' ? 'work-page__filter--active' : ''}`}
                onClick={() => setView('grid')}>grid</button>
            </div>
          </div>

          <h1 className="work-page__tagline" aria-label="Flo Studios Work & Case Studies: Work engineered for attention, clarity, and enduring impact.">
            <span className="sr-only">Flo Studios Work & Case Studies — </span>
            {'Work engineered for attention, clarity, and enduring impact.'.split(' ').map((w, i) => (
              <span key={i} className="work-page__hero-word">{w}</span>
            ))}
          </h1>
        </div>
      </section>

      {/* Featured projects */}
      <section className="work-page__featured container">
        {FEATURED_PROJECTS.map((proj) => (
          <div className="work-page__featured-card" key={proj.slug}>
            <div className="work-page__featured-media">
              <img src={proj.image} alt={`${proj.title} — Flo Studios case study`} loading="lazy" />
            </div>
            <div className="work-page__featured-info">
              <h2 className="work-page__featured-title">{proj.title}</h2>
              <p className="work-page__featured-desc">{proj.desc}</p>
              <div className="work-page__featured-tags">
                {proj.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Grid */}
      <section className="work-page__grid-section container">
        <div className={`work-page__project-grid ${view === 'grid' ? 'work-page__project-grid--compact' : ''}`}>
          {filtered.map((proj, i) => (
            <div className="work-page__project-card" key={i}>
              <div className="work-page__project-media">
                <img src={proj.image} alt={`${proj.title} — Flo Studios project`} loading="lazy" />
              </div>
              <h3 className="work-page__project-title">{proj.title}</h3>
              <div className="work-page__project-tags">
                {proj.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.main>
  )
}
