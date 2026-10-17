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
      gsap.fromTo('.contact-page__title-word', { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out', delay: 0.15 })
      gsap.fromTo('.contact-founder-card', { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.35 })
      gsap.fromTo('.contact-page__action', { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'power3.out', delay: 0.45 })
      gsap.fromTo('.contact-page__office', { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.6 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <motion.main className="contact-page" variants={pageV} initial="initial" animate="animate" exit="exit" ref={heroRef}>
      <SEO
        title="Contact Flo Studios — Start a Project"
        description="Partner with Flo Studios founders. Direct 15-minute discovery calls or structured project briefs for our Development Division and Creator Division."
        canonicalUrl="https://www.flostudio.co/contact"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Contact Flo Studios', item: 'https://www.flostudio.co/contact', url: 'https://www.flostudio.co/contact' },
        ]}
      />

      <section className="contact-page__hero">
        <div className="container">
          {/* Header area inspired by About Page */}
          <div className="contact-hero__header">
            <div className="contact-hero__tag">
              <span className="contact-hero__pulse" aria-hidden="true" />
              <span>DIRECT FOUNDER ACCESS</span>
            </div>
            <h1 className="contact-page__title" aria-label="Contact Flo Studios">
              <span className="sr-only">Flo Studios — </span>
              <span className="contact-page__title-word">Contact</span>{' '}
              <span className="contact-page__title-word">Flo</span>{' '}
              <span className="contact-page__title-word">Studios</span>
            </h1>
            <p className="contact-page__subtitle">
              Direct collaboration with Flo Studios founding partners. Book a 15-minute discovery call to map scope and timeline, or send us a structured brief.
            </p>

            {/* Mode Switcher Dock */}
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
                  <span className="contact-mode-tab__pill">Fastest</span>
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
                  <span className="contact-mode-tab__pill contact-mode-tab__pill--muted">Detailed</span>
                </button>
              </div>
            </div>
          </div>

          {/* 1. Primary Interactive Area in Full Landscape */}
          <div className="contact-landscape-stage">
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

          {/* 2. Below Stage: Founder Leadership & Direct Channels Grid */}
          <div className="contact-below-grid">
            {/* Founder Direct Card (About Page Inspired) */}
            <div className="contact-founder-card">
              <div className="contact-founder-header">
                <div className="contact-founder-avatars">
                  <img src="/images/founders/aman.jpg" alt="Aman Pal — Co-Founder" className="contact-founder-img" />
                  <img src="/images/founders/mohit.jpg" alt="Mohit Ninama — Co-Founder" className="contact-founder-img contact-founder-img--overlap" />
                </div>
                <div className="contact-founder-meta">
                  <h2 className="contact-founder-names">Aman Pal & Mohit Ninama</h2>
                  <span className="contact-founder-role">Co-Founders, Flo Studios</span>
                </div>
              </div>

              <p className="contact-founder-quote">
                “We don’t hand you off to sales reps. Every discovery call is run directly with our founding partners who will architect, design, and ship your product.”
              </p>

              <div className="contact-founder-perks">
                <div className="contact-founder-perk">
                  <span className="contact-founder-perk-bullet">⚡</span>
                  <div className="contact-founder-perk-text">
                    <strong>15-Minute Scoping</strong>
                    <span>Direct technical architecture & feasibility review</span>
                  </div>
                </div>
                <div className="contact-founder-perk">
                  <span className="contact-founder-perk-bullet">⏱</span>
                  <div className="contact-founder-perk-text">
                    <strong>24-Hour Review</strong>
                    <span>Concrete milestone breakdown within one business day</span>
                  </div>
                </div>
                <div className="contact-founder-perk">
                  <span className="contact-founder-perk-bullet">🔒</span>
                  <div className="contact-founder-perk-text">
                    <strong>Mutual NDA</strong>
                    <span>Full intellectual property ownership & confidentiality</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Studio Topics / Inquiries Box */}
            <div className="contact-channels-box">
              <span className="contact-channels-label">SELECT A TOPIC OR DIRECT CHANNEL</span>
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
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  type="button"
                  className={`contact-page__action ${contactMode === 'message' && activeSubject === 'Start a Project' ? 'contact-page__action--active' : ''}`}
                  onClick={() => { setContactMode('message'); setActiveSubject('Start a Project') }}
                >
                  <span className="contact-page__action-label">START A PROJECT (BRIEF)</span>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  type="button"
                  className={`contact-page__action ${contactMode === 'message' && activeSubject === 'Press & Media' ? 'contact-page__action--active' : ''}`}
                  onClick={() => { setContactMode('message'); setActiveSubject('Press & Media') }}
                >
                  <span className="contact-page__action-label">PRESS & MEDIA</span>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  type="button"
                  className={`contact-page__action ${contactMode === 'message' && activeSubject === 'General Note' ? 'contact-page__action--active' : ''}`}
                  onClick={() => { setContactMode('message'); setActiveSubject('General Note') }}
                >
                  <span className="contact-page__action-label">WRITE US A NOTE</span>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>

              <div className="contact-channels-direct">
                <span>Direct inquiries: </span>
                <a href="mailto:hello@flostudio.co" className="contact-channels-email">hello@flostudio.co</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Locations (Inspired by About Page Studios) */}
      <section className="contact-page__offices">
        <div className="container">
          <div className="contact-offices-head">
            <span className="contact-offices-tag">GLOBAL REACH</span>
            <h2 className="contact-offices-title">Studio Locations</h2>
          </div>
          <div className="contact-page__offices-grid">
            <div className="contact-page__office">
              <span className="contact-page__office-label">HQ STUDIO</span>
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
              <span className="contact-page__office-label">GLOBAL COLLABORATION</span>
              <h3 className="contact-page__office-city">Worldwide / Remote</h3>
              <p className="contact-page__office-addr">
                Partnering with creators & ambitious companies globally.<br/>
                hello@flostudio.co
              </p>
              <a href="mailto:hello@flostudio.co" className="contact-page__office-link">
                Email Studio Directly →
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  )
}

