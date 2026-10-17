import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import MotionContactForm from '../components/MotionContactForm'
import CalBookingWidget from '../components/CalBookingWidget'
import SEO from '../components/SEO'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const divisionParam = searchParams.get('division')
  const initialMode = searchParams.get('mode') || (divisionParam ? 'message' : 'call')
  const [contactMode, setContactMode] = useState(initialMode)
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
        description="Partner with Flo Studios. Inquire with our Development Division (Primary Flagship: Full Build Lifecycle from strategy to launch) or our Creator Division (Secondary Vertical: End-to-End Growth Systems)."
        canonicalUrl="https://www.flostudio.co/contact"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Contact Flo Studios', item: 'https://www.flostudio.co/contact', url: 'https://www.flostudio.co/contact' },
        ]}
      />

      <section className="contact-page__hero">
        <div className="container">
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
                Have a new project, creative partnership, or inquiry? Book a 15-minute scope call with our founders or submit a detailed brief below.
              </p>

              <div className="contact-page__actions">
                <button
                  type="button"
                  className={`contact-page__action ${contactMode === 'call' ? 'contact-page__action--active' : ''}`}
                  onClick={() => setContactMode('call')}
                >
                  <div className="contact-page__action-lead">
                    <span className="contact-page__action-pill">⚡ FASTEST</span>
                    <span className="contact-page__action-label">BOOK 15-MIN SCOPE CALL</span>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  type="button"
                  className={`contact-page__action ${contactMode === 'message' && activeSubject === 'Start a Project' ? 'contact-page__action--active' : ''}`}
                  onClick={() => { setContactMode('message'); setActiveSubject('Start a Project') }}
                >
                  <span className="contact-page__action-label">START A PROJECT (BRIEF)</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  type="button"
                  className={`contact-page__action ${contactMode === 'message' && activeSubject === 'Press & Media' ? 'contact-page__action--active' : ''}`}
                  onClick={() => { setContactMode('message'); setActiveSubject('Press & Media') }}
                >
                  <span className="contact-page__action-label">PRESS & MEDIA</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  type="button"
                  className={`contact-page__action ${contactMode === 'message' && activeSubject === 'General Note' ? 'contact-page__action--active' : ''}`}
                  onClick={() => { setContactMode('message'); setActiveSubject('General Note') }}
                >
                  <span className="contact-page__action-label">WRITE US A NOTE</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Booking Widget or Written Brief Form */}
            <div className="contact-page__right">
              {/* Mode Switcher */}
              <div className="contact-mode-wrap">
                <div className="contact-mode-switcher" role="tablist" aria-label="Contact Methods">
                  <button
                    type="button"
                    role="tab"
                    id="contact-tab-call"
                    aria-selected={contactMode === 'call'}
                    aria-controls="contact-panel-call"
                    className={`contact-mode-tab ${contactMode === 'call' ? 'contact-mode-tab--active' : ''}`}
                    onClick={() => setContactMode('call')}
                  >
                    <span className="contact-mode-tab__pulse" aria-hidden="true" />
                    <span>⚡ Book 15-Min Call</span>
                    <span className="contact-mode-tab__pill">Instant</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="contact-tab-message"
                    aria-selected={contactMode === 'message'}
                    aria-controls="contact-panel-message"
                    className={`contact-mode-tab ${contactMode === 'message' ? 'contact-mode-tab--active' : ''}`}
                    onClick={() => setContactMode('message')}
                  >
                    <span>✉ Send Written Brief</span>
                  </button>
                </div>
              </div>

              {contactMode === 'call' ? (
                <div id="contact-panel-call" role="tabpanel" aria-labelledby="contact-tab-call">
                  <CalBookingWidget calLink="flo-studios-nh4bet/15min" />
                </div>
              ) : (
                <div id="contact-panel-message" role="tabpanel" aria-labelledby="contact-tab-message">
                  <MotionContactForm activeSubject={activeSubject} initialDivision={divisionParam} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-page__offices">
        <div className="container">
          <h2 className="sr-only">Studio Locations</h2>
          <div className="contact-page__offices-grid">
            <div className="contact-page__office">
              <h3 className="contact-page__office-city">London, UK</h3>
              <p className="contact-page__office-addr">
                Sugar House Ln<br/>
                London E15 2QS<br/>
                United Kingdom
              </p>
              <a href="https://maps.google.com/?q=Sugar+House+Ln,+London+E15+2QS,+United+Kingdom" target="_blank" rel="noopener noreferrer" className="contact-page__office-link">
                Get Directions →
              </a>
            </div>
            <div className="contact-page__office">
              <h3 className="contact-page__office-city">Global / Remote</h3>
              <p className="contact-page__office-addr">
                Collaborating Worldwide<br/>
                Available for Global Commissions<br/>
                hello@flostudios.com
              </p>
              <a href="mailto:hello@flostudios.com" className="contact-page__office-link">
                Contact Studio →
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
