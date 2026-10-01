import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FloLogo from './FloLogo'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className="site-header" id="site-header">

        {/* Main Navigation Bar */}
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

          {/* Center Brand Logo with Official Flo Wave Mark & Wordmark */}
          <Link to="/" className="site-header__center-logo" aria-label="Flo Studios Home">
            <FloLogo className="site-header__center-logo-mark" height="19px" />
            <span className="site-header__center-logo-text">FLO</span>
          </Link>

          {/* Right pill navigation */}
          <nav className="site-header__nav site-header__nav--right" aria-label="Primary Right">
            <Link
              to="/latest"
              className={`site-header__pill ${location.pathname === '/latest' ? 'site-header__pill--active' : ''}`}
            >
              LATEST
            </Link>
            <Link
              to="/about"
              className="site-header__pill"
            >
              CAREERS
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
          <div className="site-mobile-menu__brand-header">
            <FloLogo height="22px" />
            <span className="site-mobile-menu__brand-text">FLO STUDIOS</span>
          </div>
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
          </div>
        </div>
      </div>
    </>
  )
}
