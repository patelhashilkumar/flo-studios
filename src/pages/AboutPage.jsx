import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import SEO from '../components/SEO'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const LEADERS = [
  { name: 'Laurel Burton', role: 'Chief Executive Officer', image: 'https://a-us.storyblok.com/f/1004432/1282x1604/a9337ef144/laurel-burton.png/m/' },
  { name: 'Jack De Caluwé', role: 'Chief Creative Officer', image: 'https://a-us.storyblok.com/f/1004432/1282x1604/179f8beb3a/jackdecaluwe_insrument_cco_about_page.png/m/' },
  { name: 'Coryna Sorin', role: 'Chief Operations Officer', image: 'https://a-us.storyblok.com/f/1004432/1282x1604/f7881acef8/coryna-sorin-2.png/m/' },
  { name: 'Tessa Baston', role: 'Chief People Officer', image: 'https://a-us.storyblok.com/f/1004432/1282x1604/e5ec3755bd/tessa-baston.png/m/' },
]

const IMAGES = [
  'https://a-us.storyblok.com/f/1004432/1348x1006/3d7c5fd107/about_page_image2.png/m/',
  'https://a-us.storyblok.com/f/1004432/3840x2160/eb1d22feae/build-week-high-level.png/m/',
  'https://a-us.storyblok.com/f/1004432/2353x1568/6518a18c78/about_page_image1.png/m/',
]

export default function AboutPage() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-page__hero-word', { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo('.about-page__stat', { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <motion.main className="about-page" variants={pageV} initial="initial" animate="animate" exit="exit">
      <SEO
        title="About Flo Studios — Dual-Engine Media & Development Hub"
        description="Flo Studios is a progressive dual-engine media and development hub built to scale digital exposure and authority for high-impact creators and venture-backed startups and businesses. Primary focus: Development Division."
        canonicalUrl="https://www.flostudio.co/about"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'About Flo Studios', item: 'https://www.flostudio.co/about', url: 'https://www.flostudio.co/about' },
        ]}
      />

      {/* Hero */}
      <section className="about-page__hero" ref={heroRef}>
        <div className="container">
          <h1 className="about-page__title" aria-label="About Flo Studios: Built at the intersection of creative storytelling and digital infrastructure.">
            <span className="sr-only">About Flo Studios — </span>
            {'Built at the intersection of creative storytelling and digital infrastructure.'.split(' ').map((w, i) => (
              <span key={i} className="about-page__hero-word">{w}</span>
            ))}
          </h1>
          <Link to="/work" className="about-page__cta">Explore work →</Link>

          <p className="about-page__intro">
            Flo Studios is a progressive dual-engine media and development hub built to scale digital exposure and authority for high-impact creators and venture-backed startups and businesses. We drive growth through two distinct verticals: our primary Development Division (Full Build Lifecycle) and our Creator Division (Stage-Calibrated Media Engine).
          </p>

          <div className="about-page__stats">
            <div className="about-page__stat">
              <span className="about-page__stat-num">20</span>
              <span className="about-page__stat-label">Years</span>
              <p className="about-page__stat-desc">Building digital products and brands.</p>
            </div>
            <div className="about-page__stat">
              <span className="about-page__stat-num">350+</span>
              <span className="about-page__stat-label">Craftspeople</span>
              <p className="about-page__stat-desc">Designers, directors, and technologists.</p>
            </div>
            <div className="about-page__stat">
              <span className="about-page__stat-num">02</span>
              <span className="about-page__stat-label">Studios</span>
              <p className="about-page__stat-desc">Portland · New York · Remote</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="about-page__leadership">
        <div className="container">
          <h2 className="about-page__section-title">Leadership</h2>
          <p className="about-page__section-sub">Led with intention. Built for what's next.</p>
          <div className="about-page__leaders-grid">
            {LEADERS.map((leader) => (
              <div className="about-page__leader" key={leader.name}>
                <div className="about-page__leader-img">
                  <img src={leader.image} alt={`${leader.name} — ${leader.role} at Flo Studios`} loading="lazy" />
                </div>
                <h3 className="about-page__leader-name">{leader.name}</h3>
                <p className="about-page__leader-role">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="about-page__who">
        <div className="container">
          <h2 className="about-page__who-title">Who we are</h2>
          <p className="about-page__who-text">
            Strategists, 3D artists, and creative technologists. Opinionated about detail, disciplined in execution, and committed to work that commands attention.
          </p>
          <Link to="/services" className="about-page__cta-pill">Explore services →</Link>

          <div className="about-page__images">
            {IMAGES.map((src, i) => {
              const altDescriptions = [
                'Flo Studios collaborative design exploration and creative strategy session',
                'Flo Studios technical architecture and engineering build week sprint',
                'Flo Studios creative direction and studio team workspace'
              ]
              return (
                <div key={i} className="about-page__image-wrap">
                  <img src={src} alt={altDescriptions[i] || `Flo Studios workspace ${i + 1}`} loading="lazy" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="about-page__how">
        <div className="container">
          <h2 className="about-page__how-title">How we work</h2>
          <div className="about-page__how-content">
            <p>We operate at the intersection of creative storytelling and digital infrastructure. Our primary focus is our Development Division—partnering with venture-backed founders from the earliest stages to translate vision into products built for scale.</p>
            <p>Our cross-vertical advantage: the insights gathered across creators, startups, and businesses allow us to develop high-impact strategies that accelerate growth, strengthen digital authority, and eliminate single-stage handoffs.</p>
          </div>
          <Link to="/careers" className="about-page__cta-pill">View open roles →</Link>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="about-page__careers-cta">
        <div className="container">
          <h2 className="about-page__careers-title">
            {'Think you\'d be a good addition to our team?'.split(' ').map((w, i) => (
              <span key={i} className="about-page__careers-word">{w} </span>
            ))}
          </h2>
          <Link to="/careers" className="about-page__cta-pill">Careers →</Link>
        </div>
      </section>
    </motion.main>
  )
}
