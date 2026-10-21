import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import SEO from '../components/SEO'
import FloWordmark from '../components/FloWordmark'
import { getAllBlogs } from '../data/blogsData'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export default function LatestPage() {
  const heroRef = useRef(null)
  const blogs = getAllBlogs()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.latest-page__hero-word',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(
        '.latest-page__card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.4 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <motion.main
      className="latest-page"
      variants={pageV}
      initial="initial"
      animate="animate"
      exit="exit"
      ref={heroRef}
    >
      <SEO
        title="Latest Dispatches & Essays — Flo Studios"
        description="Breaking news, insights, and articles from Flo Studios on digital product architecture, craft, and creator media engines."
        canonicalUrl="https://www.flostudio.co/latest"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Latest', item: 'https://www.flostudio.co/latest', url: 'https://www.flostudio.co/latest' },
        ]}
      />

      {/* Giant Edge-to-Edge Brand Wordmark (matching Instrument.com /latest/) */}
      <div className="latest-page__wordmark-wrap">
        <Link to="/" className="latest-page__wordmark-link" aria-label="Flo Studios Home">
          <span className="sr-only">FLO STUDIOS</span>
          <FloWordmark className="latest-page__wordmark-svg" color="#f0f0f2" />
        </Link>
      </div>

      <section className="latest-page__hero">
        <div className="container">
          {/* Breadcrumb Navigation: HOME / LATEST */}
          <nav className="latest-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="latest-page__breadcrumb-home">HOME</Link>
            <span className="latest-page__breadcrumb-separator">/</span>
            <span className="latest-page__breadcrumb-current">LATEST</span>
          </nav>

          <h1
            className="latest-page__title"
            aria-label="Breaking news, insights, and articles."
          >
            {'Breaking news, insights, and articles.'.split(' ').map((w, i) => (
              <span key={i} className="latest-page__hero-word">
                {w}
              </span>
            ))}
          </h1>
        </div>
      </section>

      <section className="latest-page__grid-section">
        <div className="container">
          <h2 className="sr-only">Articles & Studio Dispatches</h2>
          <div className="latest-page__grid">
            {blogs.map((item) => (
              <Link
                to={`/latest/${item.slug}`}
                className="latest-page__card"
                key={item.id || item.slug}
              >
                <div className="latest-page__card-tile">
                  <div className="latest-page__card-tile-top">
                    <span className="latest-page__card-num">BLOG {item.number}</span>
                    <span className="latest-page__card-brand">FLO STUDIOS</span>
                  </div>
                  <div className="latest-page__card-tile-bottom">
                    <span className="latest-page__card-category">{item.cardCategory || item.category}</span>
                  </div>
                </div>

                <div className="latest-page__card-meta">
                  <span className="latest-page__card-type">{item.type}</span>
                  <span className="latest-page__card-bullet">•</span>
                  <span className="latest-page__card-time">{item.readTime}</span>
                </div>

                <h3 className="latest-page__card-title">{item.cardTitle || item.displayTitle || item.title}</h3>
                <p className="latest-page__card-excerpt">{item.cardExcerpt || item.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  )
}
