import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const ANNOUNCEMENTS = [
  {
    text: 'CAMPAIGN US WINNERS: DESIGN STUDIO AGENCY OF THE YEAR 2026!',
    linkText: 'SEE MORE →',
    url: '/latest',
  },
  {
    text: "MEET PLAYSPACE: INSTRUMENT'S ARCHIVE OF CREATIVE EXPERIMENTS.",
    linkText: 'PLAY NOW →',
    url: '/work',
  },
  {
    text: 'JACK DE CALUWÉ RETURNS AS CHIEF CREATIVE OFFICER.',
    linkText: 'READ MORE →',
    url: '/latest',
  },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [announcementIdx, setAnnouncementIdx] = useState(0)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Cycle announcements every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const currentAnnouncement = ANNOUNCEMENTS[announcementIdx]

  return (
    <>
      <header className="site-header" id="site-header">
        <div className="site-header__inner">
          {/* Left pill navigation */}
          <nav className="site-header__nav site-header__nav--left" aria-label="Primary Left">
            <Link
              to="/work"
              className={`site-header__pill ${location.pathname === '/work' ? 'site-header__pill--active' : ''}`}
            >
              WORK
            </Link>
            <Link
              to="/services"
              className={`site-header__pill ${location.pathname === '/services' ? 'site-header__pill--active' : ''}`}
            >
              SERVICES
            </Link>
            <Link
              to="/about"
              className={`site-header__pill ${location.pathname === '/about' ? 'site-header__pill--active' : ''}`}
            >
              ABOUT
            </Link>
          </nav>

          {/* Center announcement */}
          <div className="site-header__announcement">
            <Link to={currentAnnouncement.url} className="site-header__announcement-inner">
              <span className="site-header__announcement-text">
                {currentAnnouncement.text}
              </span>
              <span className="site-header__announcement-link">
                {currentAnnouncement.linkText}
              </span>
            </Link>
          </div>

          {/* Right pill navigation */}
          <nav className="site-header__nav site-header__nav--right" aria-label="Primary Right">
            <Link
              to="/about"
              className="site-header__pill"
            >
              CAREERS
            </Link>
            <Link
              to="/latest"
              className={`site-header__pill ${location.pathname === '/latest' ? 'site-header__pill--active' : ''}`}
            >
              LATEST
            </Link>
            <Link
              to="/contact"
              className={`site-header__pill ${location.pathname === '/contact' ? 'site-header__pill--active' : ''}`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Mobile burger button */}
          <button
            className={`site-header__burger ${menuOpen ? 'site-header__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`site-mobile-menu ${menuOpen ? 'site-mobile-menu--open' : ''}`}>
        <div className="site-mobile-menu__inner">
          <nav className="site-mobile-menu__nav">
            <Link to="/work" className="site-mobile-menu__link" onClick={() => setMenuOpen(false)}>WORK</Link>
            <Link to="/services" className="site-mobile-menu__link" onClick={() => setMenuOpen(false)}>SERVICES</Link>
            <Link to="/about" className="site-mobile-menu__link" onClick={() => setMenuOpen(false)}>ABOUT</Link>
            <Link to="/about" className="site-mobile-menu__link" onClick={() => setMenuOpen(false)}>CAREERS</Link>
            <Link to="/latest" className="site-mobile-menu__link" onClick={() => setMenuOpen(false)}>LATEST</Link>
            <Link to="/contact" className="site-mobile-menu__link" onClick={() => setMenuOpen(false)}>CONTACT</Link>
          </nav>

          <div className="site-mobile-menu__footer">
            <div className="site-mobile-menu__locations">
              <span>PORTLAND, OR</span>
              <span>NEW YORK, NY</span>
            </div>
            <div className="site-mobile-menu__announcement">
              <span>{currentAnnouncement.text}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
