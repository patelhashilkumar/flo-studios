import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FloLogo from './FloLogo'
import './FocusLensNavbar.css'

const LEFT_ITEMS = [
  { id: 'work', label: 'WORK', to: '/work' },
  { id: 'services', label: 'SERVICES', to: '/services' },
  { id: 'about', label: 'ABOUT', to: '/about' },
]

const RIGHT_ITEMS = [
  { id: 'careers', label: 'CAREERS', to: '/careers' },
  { id: 'latest', label: 'LATEST', to: '/latest' },
  { id: 'contact', label: 'CONTACT', to: '/contact' },
]

const ANNOUNCEMENT = {
  id: 'announcement',
  headline: 'CAMPAIGN US WINNERS: DESIGN STUDIO AGENCY OF THE YEAR 2026!',
  cta: 'SEE MORE →',
  to: '/latest',
}

const FOCUS_SPRING = {
  type: 'spring',
  stiffness: 440,
  damping: 34,
  mass: 0.6,
}

export default function FocusLensNavbar() {
  const [hotId, setHotId] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const renderPill = (item) => {
    const isHot = hotId === item.id
    const isAnyHot = hotId !== null
    const isActive = location.pathname === item.to

    // Selective Focus Depth-of-Field animation physics
    const pillMotion = isHot
      ? { opacity: 1, filter: 'blur(0px)', scale: 1.03 }
      : isAnyHot
      ? { opacity: 0.35, filter: 'blur(1.6px)', scale: 0.98 }
      : isActive
      ? { opacity: 1, filter: 'blur(0px)', scale: 1 }
      : { opacity: 1, filter: 'blur(0px)', scale: 1 }

    return (
      <motion.div
        key={item.id}
        className="studio-nav-item-wrap"
        animate={pillMotion}
        transition={FOCUS_SPRING}
        onMouseEnter={() => setHotId(item.id)}
        onMouseLeave={() => setHotId(null)}
      >
        <Link
          to={item.to}
          className={`studio-nav-pill ${isActive ? 'studio-nav-pill--active' : ''} ${isHot ? 'studio-nav-pill--hot' : ''}`}
          onFocus={() => setHotId(item.id)}
          onBlur={() => setHotId(null)}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className="studio-nav-pill-label">{item.label}</span>
        </Link>
      </motion.div>
    )
  }

  const isCenterHot = hotId === ANNOUNCEMENT.id
  const isAnyItemHot = hotId !== null && !isCenterHot

  const centerMotion = isCenterHot
    ? { opacity: 1, filter: 'blur(0px)', scale: 1.01 }
    : isAnyItemHot
    ? { opacity: 0.38, filter: 'blur(1.2px)', scale: 0.99 }
    : { opacity: 0.88, filter: 'blur(0px)', scale: 1 }

  return (
    <header className="studio-nav-header" id="site-header">
      <div className="studio-nav-bar">
        {/* ── Left Navigation Pills (WORK, SERVICES, ABOUT) ── */}
        <nav className="studio-nav-group studio-nav-group--left" aria-label="Main Navigation Left">
          {LEFT_ITEMS.map((item) => renderPill(item))}
        </nav>

        {/* ── Center Editorial Announcement ── */}
        <motion.div
          className="studio-nav-center"
          animate={centerMotion}
          transition={FOCUS_SPRING}
          onMouseEnter={() => setHotId(ANNOUNCEMENT.id)}
          onMouseLeave={() => setHotId(null)}
        >
          <Link
            to={ANNOUNCEMENT.to}
            className={`studio-nav-ticker ${isCenterHot ? 'studio-nav-ticker--hot' : ''}`}
            onFocus={() => setHotId(ANNOUNCEMENT.id)}
            onBlur={() => setHotId(null)}
            title="Read announcement dispatch"
          >
            <span className="studio-nav-ticker-headline">{ANNOUNCEMENT.headline}</span>
            <span className="studio-nav-ticker-cta">{ANNOUNCEMENT.cta}</span>
          </Link>
        </motion.div>

        {/* ── Right Navigation Pills (CAREERS, LATEST, CONTACT) ── */}
        <nav className="studio-nav-group studio-nav-group--right" aria-label="Main Navigation Right">
          {RIGHT_ITEMS.map((item) => renderPill(item))}
        </nav>

        {/* ── Mobile Header Bar (Compact fallback for small screens) ── */}
        <div className="studio-nav-mobile-bar">
          <Link to="/" className="studio-nav-mobile-brand" aria-label="Flo Studios Home">
            <FloLogo height="16px" color="#0e0e12" />
            <span className="studio-nav-mobile-brand-text">FLO STUDIOS</span>
          </Link>

          <button
            type="button"
            className={`studio-nav-mobile-toggle ${mobileOpen ? 'studio-nav-mobile-toggle--open' : ''}`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? 'CLOSE ✕' : 'MENU'}
          </button>
        </div>
      </div>

      {/* ── Mobile Flyout Drawer with Focus Animation ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="studio-nav-mobile-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="studio-nav-mobile-pills">
              {[...LEFT_ITEMS, ...RIGHT_ITEMS].map((item) => {
                const isActive = location.pathname === item.to
                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    className={`studio-nav-mobile-pill ${isActive ? 'studio-nav-mobile-pill--active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="studio-nav-mobile-ticker-wrap">
              <Link
                to={ANNOUNCEMENT.to}
                className="studio-nav-mobile-ticker"
                onClick={() => setMobileOpen(false)}
              >
                <span>{ANNOUNCEMENT.headline}</span>
                <span className="studio-nav-ticker-cta">{ANNOUNCEMENT.cta}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
