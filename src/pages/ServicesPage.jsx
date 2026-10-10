import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import ServicesSection from '../components/ServicesSection'
import { getDivisionById } from '../data/divisionsData'
import './Pages.css'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export default function ServicesPage() {
  const [searchParams] = useSearchParams()
  const rawDivision = searchParams.get('division')
  const initialDivision = rawDivision ? getDivisionById(rawDivision)?.id : 'development'

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


      {/* Interactive Two-Division Services Engine */}
      <ServicesSection defaultDivision={initialDivision} id="services-divisions" />

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
