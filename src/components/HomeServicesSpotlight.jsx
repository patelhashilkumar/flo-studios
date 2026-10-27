import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ShowcaseMotionArt from './ShowcaseMotionArt'
import './HomeServicesSpotlight.css'

const SPOTLIGHT_DATA = {
  development: {
    id: 'development',
    pillLabel: 'Development Division',
    title: 'We translate founder vision into products positioned for scale.',
    description:
      'We partner with venture-backed founders and businesses from the earliest stages throughout the entire product lifecycle, from ideation and research to design, engineering, launch, and go-to-market user acquisition. Zero single-stage handoffs.',
    ctaText: 'See our offerings →',
    ctaHref: '/services?division=development',
    tag: 'Primary Flagship',
    stats: [
      { label: 'Lifecycle', value: '11 Stages' },
      { label: 'Architecture', value: 'Full-Stack' },
      { label: 'Handoffs', value: 'Zero' },
    ],
    previewType: 'product',
  },
  creator: {
    id: 'creator',
    pillLabel: 'Creator Division',
    title: 'End-to-end growth systems for high-impact creators.',
    description:
      'From ideation, scripting, and production through packaging, distribution, and analytics. We take a creator\'s video idea and transform attention into long-term business assets that travel far in the long run.',
    ctaText: 'See our offerings →',
    ctaHref: '/services?division=creator',
    tag: 'Stage-Calibrated Media Engine',
    stats: [
      { label: 'Pipeline', value: '8 Stages' },
      { label: 'Focus', value: 'Retention' },
      { label: 'Distribution', value: 'Multi-Platform' },
    ],
    previewType: 'creator',
  },
}

export default function HomeServicesSpotlight() {
  const [activeDivision, setActiveDivision] = useState('development')
  const current = SPOTLIGHT_DATA[activeDivision]

  return (
    <section className="home-spotlight" aria-label="Flo Studios Divisions Spotlight">
      <div className="home-spotlight__container">
        {/* Left Column: Switcher & Editorial Copy */}
        <div className="home-spotlight__left">
          {/* Segmented Division Switcher */}
          <div className="home-spotlight__toggle-wrapper" role="tablist" aria-label="Division Selector">
            <button
              type="button"
              role="tab"
              aria-selected={activeDivision === 'development'}
              className={`home-spotlight__toggle-btn ${activeDivision === 'development' ? 'is-active' : ''}`}
              onClick={() => setActiveDivision('development')}
            >
              {activeDivision === 'development' && (
                <motion.div
                  layoutId="spotlight-active-indicator"
                  className="home-spotlight__toggle-indicator"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="home-spotlight__toggle-text">Development Division</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeDivision === 'creator'}
              className={`home-spotlight__toggle-btn ${activeDivision === 'creator' ? 'is-active' : ''}`}
              onClick={() => setActiveDivision('creator')}
            >
              {activeDivision === 'creator' && (
                <motion.div
                  layoutId="spotlight-active-indicator"
                  className="home-spotlight__toggle-indicator"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="home-spotlight__toggle-text">Creator Division</span>
            </button>
          </div>

          {/* Dynamic Content Block with Framer Motion transition inside stable stage */}
          <div className="home-spotlight__content-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="home-spotlight__content"
              >
                <h2 className="home-spotlight__heading">{current.title}</h2>
                <p className="home-spotlight__description">{current.description}</p>

                {/* Quick Pillars/Stats */}
                <div className="home-spotlight__stats-row">
                  {current.stats.map((s, idx) => (
                    <div key={idx} className="home-spotlight__stat-item">
                      <span className="home-spotlight__stat-val">{s.value}</span>
                      <span className="home-spotlight__stat-lbl">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="home-spotlight__cta-wrap">
                  <Link to={current.ctaHref} className="home-spotlight__cta-btn">
                    <span>{current.ctaText}</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Sleek Motion Graphic Showcase Card */}
        <div className="home-spotlight__right">
          <div className="home-spotlight__showcase-wrap">
            <AnimatePresence mode="wait">
              {activeDivision === 'development' ? (
                <motion.div
                  key="showcase-dev"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="showcase-card-container"
                >
                  <ShowcaseMotionArt division="development" />
                </motion.div>
              ) : (
                <motion.div
                  key="showcase-creator"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="showcase-card-container"
                >
                  <ShowcaseMotionArt division="creator" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
