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
  const [isPlaying, setIsPlaying] = useState(true)
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

        {/* Right Column: Sleek Editorial Showcase (Matching Image 3) */}
        <div className="home-spotlight__right">
          <div className="home-spotlight__showcase-frame">
            {/* Active Presentation Stage */}
            <div className="showcase-stage">
              <AnimatePresence mode="wait">
                {activeDivision === 'development' ? (
                  <motion.div
                    key="showcase-dev"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="showcase-slide showcase-slide--dev"
                  >
                    {/* Main Canvas: Warm Editorial Paper Aesthetic matching Image 3 */}
                    <div className="showcase-canvas">
                      <div className="showcase-canvas__header">
                        <span className="showcase-canvas__kicker">ENTERPRISE CLOUD ARCHITECTURE</span>
                        <span className="showcase-canvas__badge">STAGE 01 → 11</span>
                      </div>

                      <div className="showcase-canvas__body">
                        {/* Left: UI/Platform Schematic Box */}
                        <div className="showcase-canvas__visual">
                          <div className="showcase-canvas__preview-box">
                            <div className="showcase-canvas__preview-bar">
                              <span className="sc-dot red" />
                              <span className="sc-dot yellow" />
                              <span className="sc-dot green" />
                              <span className="sc-title">flostudios.co/platform</span>
                            </div>
                            <div className="showcase-canvas__preview-grid">
                              <div className="sc-grid-card">
                                <span className="sc-card-lbl">Full Build</span>
                                <span className="sc-card-val">Zero Handoffs</span>
                              </div>
                              <div className="sc-grid-card sc-grid-card--accent">
                                <span className="sc-card-lbl">Uptime</span>
                                <span className="sc-card-val">99.98%</span>
                              </div>
                            </div>
                            <div className="showcase-canvas__terminal">
                              <code>$ flo deploy --production --zero-downtime</code>
                            </div>
                          </div>
                        </div>

                        {/* Right: Editorial Typography & Copy */}
                        <div className="showcase-canvas__editorial">
                          <h3 className="showcase-canvas__title">Next-Gen Digital Platform</h3>
                          <p className="showcase-canvas__text">
                            We carry your product through all 11 stages — from technical research and UI/UX design to full-stack cloud deployment and customer acquisition.
                          </p>
                          <div className="showcase-canvas__metric-row">
                            <span className="sc-metric-tag">+148% Conversion</span>
                            <span className="sc-metric-tag sc-metric-tag--light">18ms Latency</span>
                          </div>
                        </div>
                      </div>

                      {/* Floating Responsive Mobile Device (Overlapping Bottom Right, matching Image 3) */}
                      <div className="showcase-mobile-device">
                        <div className="showcase-mobile-notch" />
                        <div className="showcase-mobile-screen">
                          <div className="mobile-header">
                            <span className="mobile-logo">FLO</span>
                            <span className="mobile-live-pill">LIVE</span>
                          </div>
                          <div className="mobile-chart-area">
                            <div className="mobile-bars">
                              <span style={{ height: '35%' }} />
                              <span style={{ height: '65%' }} />
                              <span style={{ height: '50%' }} />
                              <span style={{ height: '90%' }} />
                              <span style={{ height: '100%' }} />
                            </div>
                            <span className="mobile-stat">+148%</span>
                            <span className="mobile-sub">Conversion Lift</span>
                          </div>
                          <div className="mobile-status-pill">
                            <span>Stage 07 / 11 Ready</span>
                          </div>
                        </div>
                      </div>

                      {/* Floating Circular Branded Sticker Tokens (Matching Image 3) */}
                      <div className="showcase-token showcase-token--top-center" title="Flo Craft Monogram">
                        <span>F</span>
                      </div>
                      <div className="showcase-token showcase-token--top-right" title="11 Stages Lifecycle">
                        <span>11</span>
                      </div>
                      <div className="showcase-token showcase-token--bottom-left" title="Zero Broken Handoffs">
                        <span>00</span>
                      </div>
                      <div className="showcase-token showcase-token--bottom-mid" title="Enterprise SLA">
                        <span>99%</span>
                      </div>
                      <div className="showcase-token showcase-token--mid-left" title="Full-Stack Engineering">
                        <span>FS</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="showcase-creator"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="showcase-slide showcase-slide--creator"
                  >
                    {/* Main Canvas: Warm Editorial Paper Aesthetic matching Image 3 */}
                    <div className="showcase-canvas">
                      <div className="showcase-canvas__header">
                        <span className="showcase-canvas__kicker">STAGE-CALIBRATED MEDIA ENGINE</span>
                        <span className="showcase-canvas__badge showcase-canvas__badge--rec">REC ● 60FPS</span>
                      </div>

                      <div className="showcase-canvas__body">
                        {/* Left: Studio Media Waveform & Timeline Box */}
                        <div className="showcase-canvas__visual">
                          <div className="showcase-canvas__preview-box showcase-canvas__preview-box--studio">
                            <div className="showcase-canvas__video-art">
                              <div className="showcase-canvas__waveform">
                                <span style={{ height: '30%' }} />
                                <span style={{ height: '65%' }} />
                                <span style={{ height: '95%' }} />
                                <span style={{ height: '55%' }} />
                                <span style={{ height: '80%' }} />
                                <span style={{ height: '100%' }} />
                                <span style={{ height: '70%' }} />
                                <span style={{ height: '40%' }} />
                              </div>
                              <span className="showcase-canvas__play-glyph">▶</span>
                            </div>
                            <div className="showcase-canvas__timeline-slice">
                              <span className="sc-track-tag">V1 4K MASTER</span>
                              <div className="sc-track-fill" />
                            </div>
                          </div>
                        </div>

                        {/* Right: Editorial Typography & Copy */}
                        <div className="showcase-canvas__editorial">
                          <h3 className="showcase-canvas__title">Cinematic Media Engines</h3>
                          <p className="showcase-canvas__text">
                            We replace content chaos with an 8-stage calibrated pipeline: high-retention scripting, master color grading, 3D motion, and multi-platform packaging.
                          </p>
                          <div className="showcase-canvas__metric-row">
                            <span className="sc-metric-tag">+86% Retention</span>
                            <span className="sc-metric-tag sc-metric-tag--light">Multi-Platform</span>
                          </div>
                        </div>
                      </div>

                      {/* Floating Responsive Mobile Device (Overlapping Bottom Right, matching Image 3) */}
                      <div className="showcase-mobile-device showcase-mobile-device--creator">
                        <div className="showcase-mobile-notch" />
                        <div className="showcase-mobile-screen showcase-mobile-screen--creator">
                          <div className="mobile-header">
                            <span className="mobile-logo">REELS</span>
                            <span className="mobile-live-pill mobile-live-pill--rec">4K</span>
                          </div>
                          <div className="mobile-chart-area">
                            <div className="mobile-bars mobile-bars--creator">
                              <span style={{ height: '40%' }} />
                              <span style={{ height: '85%' }} />
                              <span style={{ height: '65%' }} />
                              <span style={{ height: '100%' }} />
                            </div>
                            <span className="mobile-stat">86%</span>
                            <span className="mobile-sub">Hook Retention</span>
                          </div>
                          <div className="mobile-status-pill">
                            <span>Stage 04 / 08 Master Cut</span>
                          </div>
                        </div>
                      </div>

                      {/* Floating Circular Branded Sticker Tokens (Matching Image 3) */}
                      <div className="showcase-token showcase-token--top-center" title="Flo Media Monogram">
                        <span>F</span>
                      </div>
                      <div className="showcase-token showcase-token--top-right" title="8 Stages Pipeline">
                        <span>08</span>
                      </div>
                      <div className="showcase-token showcase-token--bottom-left" title="Master Sound Design">
                        <span>SFX</span>
                      </div>
                      <div className="showcase-token showcase-token--bottom-mid" title="Audience Retention">
                        <span>86%</span>
                      </div>
                      <div className="showcase-token showcase-token--mid-left" title="Master 4K Video">
                        <span>4K</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Controls Bar: Pause Button + 8 Segmented Progress Dashes (Exact match to Image 3) */}
            <div className="showcase-bottom-bar">
              <button
                type="button"
                className="showcase-ctrl-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause presentation' : 'Play presentation'}
              >
                {isPlaying ? (
                  <span className="showcase-pause-icon">
                    <span />
                    <span />
                  </span>
                ) : (
                  <span className="showcase-play-icon">▶</span>
                )}
              </button>

              <div className="showcase-dashes" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, idx) => {
                  const isActive =
                    activeDivision === 'development' ? idx < 4 : idx >= 4
                  return (
                    <span
                      key={idx}
                      className={`showcase-dash ${isActive ? 'is-active' : ''}`}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
