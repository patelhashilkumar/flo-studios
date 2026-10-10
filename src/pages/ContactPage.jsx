import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import MotionContactForm from '../components/MotionContactForm'
import SEO from '../components/SEO'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const divisionParam = searchParams.get('division')
  const [activeSubject, setActiveSubject] = useState('Start a Project')
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-page__title-word', { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo('.contact-page__action', { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.5 })
      gsap.fromTo('.contact-page__office', { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.7 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <motion.main className="contact-page" variants={pageV} initial="initial" animate="animate" exit="exit" ref={heroRef}>
      <SEO
        title="Contact Flo Studios — Start a Project"
        description="Get in touch with Flo Studios. Start a project, explore creative partnerships, or inquire about our design and technology engineering capabilities."
        canonicalUrl="https://www.flostudio.co/contact"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Contact Flo Studios', item: 'https://www.flostudio.co/contact', url: 'https://www.flostudio.co/contact' },
        ]}
      />

      <section className="contact-page__hero">
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Contact</span>
          </div>

          <div className="contact-page__split">
            {/* Left Column: Title & Actions */}
            <div className="contact-page__left">
              <h1 className="contact-page__title" aria-label="Contact Flo Studios">
                <span className="sr-only">Flo Studios — </span>
                <span className="contact-page__title-word">Contact</span>{' '}
                <span className="contact-page__title-word">Flo</span>{' '}
                <span className="contact-page__title-word">Studios</span>
              </h1>
              <p className="contact-page__subtitle">
                Have a new project, creative partnership, or inquiry? Choose an option below or message our team directly.
              </p>

              <div className="contact-page__actions">
                <button
                  type="button"
                  className={`contact-page__action ${activeSubject === 'Start a Project' ? 'contact-page__action--active' : ''}`}
                  onClick={() => setActiveSubject('Start a Project')}
                >
                  <span className="contact-page__action-label">START A PROJECT</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  type="button"
                  className={`contact-page__action ${activeSubject === 'Press & Media' ? 'contact-page__action--active' : ''}`}
                  onClick={() => setActiveSubject('Press & Media')}
                >
                  <span className="contact-page__action-label">PRESS & MEDIA</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  type="button"
                  className={`contact-page__action ${activeSubject === 'General Note' ? 'contact-page__action--active' : ''}`}
                  onClick={() => setActiveSubject('General Note')}
                >
                  <span className="contact-page__action-label">WRITE US A NOTE</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>


            </div>

            {/* Right Column: Motion Submit Form Card */}
            <div className="contact-page__right">
              <MotionContactForm activeSubject={activeSubject} initialDivision={divisionParam} />
            </div>
          </div>
        </div>
      </section>

      <section className="contact-page__offices">
        <div className="container">
          <h2 className="sr-only">Studio Locations</h2>
          <div className="contact-page__offices-grid">
            <div className="contact-page__office">
              <h3 className="contact-page__office-city">Portland, OR</h3>
              <p className="contact-page__office-addr">
                2035 NW Front Ave, Suite 600<br/>
                Portland, OR 97209<br/>
                (503) 928-3188
              </p>
              <a href="https://maps.app.goo.gl/7P7qaAWdyCbBDAHHA" target="_blank" rel="noopener noreferrer" className="contact-page__office-link">
                Get Directions →
              </a>
            </div>
            <div className="contact-page__office">
              <h3 className="contact-page__office-city">New York, NY</h3>
              <p className="contact-page__office-addr">
                One World Trade Center<br/>
                87 Vesey St., Floor 69<br/>
                New York, NY 10007
              </p>
              <a href="https://goo.gl/maps/QXcxACd6tRw49MX18" target="_blank" rel="noopener noreferrer" className="contact-page__office-link">
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
