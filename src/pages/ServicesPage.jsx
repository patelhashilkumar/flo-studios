import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import SEO from '../components/SEO'
import ServicesSection from '../components/ServicesSection'
import { getDivisionById } from '../data/divisionsData'
import './Pages.css'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const CLIENTS = [
  'Nike', 'Google', 'Oura', 'ServiceNow', 'EA', 'Netflix', 'Spotify', 'Pinterest',
  'Microsoft', 'Patagonia', 'Uber', 'Marriott', 'Instagram', 'Sephora', 'Sonos',
  'PayPal', "Levi's", 'NBA', 'Nordstrom', 'Stripe', 'Salesforce', 'Samsung'
]

export default function ServicesPage() {
  const [searchParams] = useSearchParams()
  const rawDivision = searchParams.get('division')
  const initialDivision = rawDivision ? getDivisionById(rawDivision)?.id : 'development'
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-page__hero-word',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: 'power3.out', delay: 0.2 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <motion.main className="services-page" variants={pageV} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Services & Divisions — Flo Studios"
        description="Explore Flo Studios' two specialized divisions: Development Division (full build lifecycle) and Creator / Content Division (integrated content pipeline). One unified standard of craft."
        canonicalUrl="https://www.flostudio.co/services"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Services', item: 'https://www.flostudio.co/services', url: 'https://www.flostudio.co/services' },
        ]}
      />

      <section className="services-page__hero" ref={heroRef}>
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Services</span>
          </div>
          <h1
            className="services-page__title"
            aria-label="Flo Studios Services & Divisions: Two specialized divisions. One unified standard of craft."
          >
            <span className="sr-only">Flo Studios Services & Divisions — </span>
            <span aria-hidden="true">
              {'Two specialized divisions. One unified standard of craft.'.split(' ').map((w, i) => (
                <span key={i} className="services-page__hero-word">
                  {w}
                </span>
              ))}
            </span>
          </h1>
          <Link to="/contact" className="page-cta-btn">
            Start a project →
          </Link>
        </div>
      </section>

      {/* Interactive Two-Division Services Engine */}
      <ServicesSection defaultDivision={initialDivision} id="services-divisions" />

      {/* Clients */}
      <section className="services-page__clients">
        <div className="container">
          <h2 className="services-page__clients-label">Selected Clients</h2>
          <p className="services-page__clients-list">{(CLIENTS || []).join(', ')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="services-page__cta-section">
        <div className="container">
          <h2 className="services-page__cta-title">Start a project with our studio.</h2>
          <Link to="/contact" className="page-cta-btn">
            Get in touch →
          </Link>
        </div>
      </section>
    </motion.main>
  )
}
