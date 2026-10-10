import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FloLogo from './FloLogo'
import './FocusLensNavbar.css'

const LEFT_NAV = [
  { id: 'work', label: 'Work', to: '/work' },
  { id: 'services', label: 'Services', to: '/services' },
  { id: 'about', label: 'About', to: '/about' },
]

const RIGHT_NAV = [
  { id: 'careers', label: 'Careers', to: '/careers' },
  { id: 'latest', label: 'Latest', to: '/latest' },
  { id: 'contact', label: 'Contact', to: '/contact' },
]

const ANNOUNCEMENT = {
  id: 'announcement',
  text: 'Campaign US Winners: Design Studio Agency of the Year 2026!',
  cta: 'See More',
  to: '/latest',
}

const SPRING = {
  type: 'spring',
  stiffness: 420,
  damping: 32,
  mass: 0.6,
}

export default function FocusLensNavbar() {
  const [hoveredId, setHoveredId] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const location = useLocation()

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Scroll direction detection to auto-hide and reveal navbar
  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const delta = currentScrollY - lastScrollY

          if (currentScrollY <= 50) {
            // Near the top of the page - always visible
            setIsVisible(true)
          } else if (delta > 8) {
            // Scrolling down - hide navbar
            setIsVisible(false)
          } else if (delta < -8) {
            // Scrolling up - reveal navbar
            setIsVisible(true)
          }

          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderNavItem = (item, groupKey) => {
    const isHovered = hoveredId === item.id
    const isAnyHovered = hoveredId !== null
    const isActive = location.pathname === item.to

    // Depth-of-field focus animation physics
    const motionStyle = isHovered
      ? { opacity: 1, filter: 'blur(0px)', scale: 1.02 }
      : isAnyHovered
      ? { opacity: 0.38, filter: 'blur(1.4px)', scale: 0.98 }
      : { opacity: 1, filter: 'blur(0px)', scale: 1 }

    return (
      <li key={item.id} className="nav-item">
        <motion.div
          animate={motionStyle}
          transition={SPRING}
          className="nav-item-inner"
        >
          <Link
            to={item.to}
            className={`button-small button-abacus ${isActive ? 'button-abacus--active' : ''} ${isHovered ? 'button-abacus--hover' : ''}`}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(item.id)}
            onBlur={() => setHoveredId(null)}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Sliding Focus Bead Indicator */}
            {isHovered && (
              <motion.div
                layoutId={`bead-${groupKey}`}
                className="bead"
                transition={SPRING}
              />
            )}
            <span className="shape">
              <span className="label">{item.label}</span>
            </span>
          </Link>
        </motion.div>
      </li>
    )
  }

  const isMarqueeHovered = hoveredId === ANNOUNCEMENT.id
  const isOtherHovered = hoveredId !== null && !isMarqueeHovered

  const marqueeMotion = isMarqueeHovered
    ? { opacity: 1, filter: 'blur(0px)', scale: 1.01 }
    : isOtherHovered
    ? { opacity: 0.4, filter: 'blur(1.2px)', scale: 0.99 }
    : { opacity: 1, filter: 'blur(0px)', scale: 1 }

  const shouldHide = !isVisible && !mobileOpen

  return (
    <>
      <header className={`global-header ${shouldHide ? 'global-header--hidden' : ''}`}>
        <nav className="global-nav">
          <div className="global-nav-large">
            {/* ── 1. Left Primary Navigation Group (Work, Services, About) ── */}
            <div className="global-nav-large__primary abacus">
              <ul className="global-nav-large__primary__nav">
                {LEFT_NAV.map((item) => renderNavItem(item, 'primary'))}
              </ul>
            </div>

            {/* ── 2. Center Editorial Marquee Announcement ── */}
            <motion.div
              className="marquee"
              animate={marqueeMotion}
              transition={SPRING}
              onMouseEnter={() => setHoveredId(ANNOUNCEMENT.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <p>
                <span className="marquee-text">{ANNOUNCEMENT.text} </span>
                <Link
                  to={ANNOUNCEMENT.to}
                  className="link"
                  onFocus={() => setHoveredId(ANNOUNCEMENT.id)}
                  onBlur={() => setHoveredId(null)}
                >
                  <span>{ANNOUNCEMENT.cta}</span>
                  <span className="icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33333 8H12.6667" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </p>
            </motion.div>

            {/* ── 3. Right Secondary Navigation Group (Careers, Latest, Contact) ── */}
            <div className="global-nav-large__secondary abacus">
              <ul className="global-nav-large__secondary__nav">
                {RIGHT_NAV.map((item) => renderNavItem(item, 'secondary'))}
              </ul>
            </div>
          </div>

          {/* ── 4. Mobile Header Bar (< 980px) ── */}
          <div className="global-nav-mobile">
            <Link to="/" className="global-nav-mobile-logo" aria-label="Flo Studios Home">
              <FloLogo height="16px" color="#000000" />
              <span className="global-nav-mobile-logo-text">FLO STUDIOS</span>
            </Link>

            <button
              type="button"
              className="menu-button-toggle"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close Navigation' : 'Open Navigation'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? 'CLOSE ✕' : 'MENU'}
            </button>
          </div>
        </nav>

        {/* ── 5. Mobile Drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="global-nav-mobile-drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="global-nav-mobile-pills">
                {[...LEFT_NAV, ...RIGHT_NAV].map((item) => {
                  const isActive = location.pathname === item.to
                  return (
                    <Link
                      key={item.id}
                      to={item.to}
                      className={`button-small button-abacus ${isActive ? 'button-abacus--active' : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="shape">
                        <span className="label">{item.label}</span>
                      </span>
                    </Link>
                  )
                })}
              </div>

              <div className="global-nav-mobile-marquee">
                <p>
                  <span>{ANNOUNCEMENT.text} </span>
                  <Link
                    to={ANNOUNCEMENT.to}
                    className="link"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{ANNOUNCEMENT.cta} →</span>
                  </Link>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
