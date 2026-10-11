import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import './HomeServicesSpotlight.css'

const SPOTLIGHT_DATA = {
  development: {
    id: 'development',
    pillLabel: '01 / DEVELOPMENT DIVISION (PRIMARY)',
    title: 'We build end-to-end digital products from idea to market.',
    description:
      'We manage the entire journey of turning an idea into a live product — from research and UI/UX design to full-stack engineering and deployment — as one accountable partner with zero broken handoffs.',
    ctaText: 'See our offerings →',
    ctaHref: '/services?division=development',
    tag: 'Full Build Lifecycle',
    stats: [
      { label: 'Lifecycle', value: '11 Stages' },
      { label: 'Architecture', value: 'Full-Stack' },
      { label: 'Handoffs', value: 'Zero' },
    ],
    previewType: 'product',
  },
  creator: {
    id: 'creator',
    pillLabel: '02 / CREATOR & CONTENT DIVISION',
    title: 'Stage-calibrated media engines for ambitious creators.',
    description:
      'A single, stage-calibrated pipeline from ideation and scripting to post-production, sound design, and packaging that scales channels systematically.',
    ctaText: 'See our offerings →',
    ctaHref: '/services?division=creator',
    tag: 'Integrated Content Pipeline',
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
              <span className="home-spotlight__toggle-text">01 / DEVELOPMENT DIVISION (PRIMARY)</span>
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
              <span className="home-spotlight__toggle-text">02 / CREATOR &amp; CONTENT DIVISION</span>
            </button>
          </div>

          {/* Dynamic Content Block with Framer Motion transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Right Column: Studio Display Mockup */}
        <div className="home-spotlight__right">
          <div className="home-spotlight__monitor-assembly">
            {/* Monitor Screen Frame */}
            <div className="home-spotlight__monitor-bezel">
              <div className="home-spotlight__screen-inner">
                <AnimatePresence mode="wait">
                  {current.previewType === 'product' ? (
                    <motion.div
                      key="preview-product"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="home-spotlight__preview-screen home-spotlight__preview--product"
                    >
                      {/* Browser Chrome Header */}
                      <div className="screen-browser-bar">
                        <div className="screen-browser-dots">
                          <span className="dot red" />
                          <span className="dot yellow" />
                          <span className="dot green" />
                        </div>
                        <div className="screen-browser-url">flostudios.co/platform/v2</div>
                        <div className="screen-browser-badge">LIVE PROD</div>
                      </div>

                      {/* Mockup Product UI Content */}
                      <div className="screen-product-body">
                        <div className="screen-product-hero">
                          <div className="screen-product-header">
                            <span className="screen-kicker">ENTERPRISE CLOUD PLATFORM</span>
                            <h3 className="screen-headline">Next-Gen Digital Architecture</h3>
                          </div>
                          <div className="screen-product-metric-pill">+148% Conversion</div>
                        </div>

                        {/* Interactive UI Cards Grid */}
                        <div className="screen-ui-grid">
                          <div className="screen-ui-card">
                            <div className="screen-card-bar" />
                            <span className="screen-card-label">Core Pipeline</span>
                            <span className="screen-card-stat">99.98% Uptime</span>
                            <div className="screen-card-sparkline">
                              <span style={{ height: '40%' }} />
                              <span style={{ height: '65%' }} />
                              <span style={{ height: '50%' }} />
                              <span style={{ height: '85%' }} />
                              <span style={{ height: '100%' }} />
                            </div>
                          </div>

                          <div className="screen-ui-card screen-ui-card--accent">
                            <div className="screen-card-bar" />
                            <span className="screen-card-label">Global Latency</span>
                            <span className="screen-card-stat">18ms Avg</span>
                            <div className="screen-card-sparkline">
                              <span style={{ height: '90%' }} />
                              <span style={{ height: '70%' }} />
                              <span style={{ height: '60%' }} />
                              <span style={{ height: '40%' }} />
                              <span style={{ height: '25%' }} />
                            </div>
                          </div>

                          <div className="screen-ui-card">
                            <div className="screen-card-bar" />
                            <span className="screen-card-label">Full Lifecycle</span>
                            <span className="screen-card-stat">Stage 01 → 11</span>
                            <div className="screen-card-sparkline">
                              <span style={{ height: '30%' }} />
                              <span style={{ height: '55%' }} />
                              <span style={{ height: '75%' }} />
                              <span style={{ height: '90%' }} />
                              <span style={{ height: '100%' }} />
                            </div>
                          </div>
                        </div>

                        {/* Visual Code / Architecture Slice */}
                        <div className="screen-terminal-slice">
                          <span className="term-prompt">$</span>
                          <span className="term-cmd">flo deploy --env=production --zero-downtime</span>
                          <span className="term-status">✓ SUCCESS</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview-creator"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="home-spotlight__preview-screen home-spotlight__preview--creator"
                    >
                      {/* Media Studio Bar */}
                      <div className="screen-browser-bar screen-browser-bar--dark">
                        <div className="screen-browser-dots">
                          <span className="dot red" />
                          <span className="dot yellow" />
                          <span className="dot green" />
                        </div>
                        <div className="screen-browser-url">flo-creator-engine / master-cut-4k</div>
                        <div className="screen-browser-badge screen-browser-badge--rec">REC ● 60FPS</div>
                      </div>

                      {/* Mockup Video & Creator Studio Canvas */}
                      <div className="screen-creator-body">
                        {/* Video Player Canvas */}
                        <div className="screen-video-viewport">
                          <div className="screen-video-overlay-info">
                            <span className="screen-video-tag">EPISODE 04 / FINAL COLOR GRADE</span>
                            <span className="screen-video-tc">00:14:28:19</span>
                          </div>
                          <div className="screen-video-center-art">
                            <div className="screen-video-waveform">
                              <span style={{ height: '35%' }} />
                              <span style={{ height: '70%' }} />
                              <span style={{ height: '95%' }} />
                              <span style={{ height: '60%' }} />
                              <span style={{ height: '80%' }} />
                              <span style={{ height: '100%' }} />
                              <span style={{ height: '50%' }} />
                              <span style={{ height: '75%' }} />
                              <span style={{ height: '40%' }} />
                            </div>
                            <span className="screen-video-play-glyph">▶</span>
                          </div>
                        </div>

                        {/* Multi-Track Timeline */}
                        <div className="screen-timeline">
                          <div className="screen-timeline-track">
                            <span className="track-name">V1 4K A-ROLL</span>
                            <div className="track-bar track-bar--v1">
                              <span>Hook (0-5s)</span>
                              <span>Core Narrative</span>
                              <span>Climax</span>
                            </div>
                          </div>
                          <div className="screen-timeline-track">
                            <span className="track-name">V2 MOTION</span>
                            <div className="track-bar track-bar--v2">
                              <span>3D Title</span>
                              <span>Infographic B-Roll</span>
                            </div>
                          </div>
                          <div className="screen-timeline-track">
                            <span className="track-name">A1 MASTER SFX</span>
                            <div className="track-bar track-bar--a1">
                              <span>Spatial Soundscape &amp; Foley</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sub-bar with Media Controls matching Reference Image */}
                <div className="screen-footer-ctrls">
                  <div className="screen-ctrl-pill" aria-label="Playback control">
                    <span className="ctrl-bars">
                      <span />
                      <span />
                    </span>
                  </div>
                  <div className="screen-progress-track">
                    <div className="screen-progress-fill" />
                  </div>
                  <span className="screen-ctrl-fps">4K HDR</span>
                </div>
              </div>
            </div>

            {/* Realistic Monitor Stand & Base Shadow */}
            <div className="home-spotlight__monitor-neck" />
            <div className="home-spotlight__monitor-base" />
            <div className="home-spotlight__monitor-shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}
