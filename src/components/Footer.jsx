import { useState } from 'react'
import { Link } from 'react-router-dom'
import FloLogo from './FloLogo'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="footer" id="site-footer">
      {/* ── Marquee Ribbon ── */}
      <div className="footer__marquee-wrap">
        <div className="footer__marquee">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="footer__marquee-item">
              To create motion and brand experiences of the highest caliber, we integrate art direction, 3D motion design, and technical infrastructure, staying in close partnership with visionary clients.&nbsp;&nbsp;✦&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Floating Liquid Glass Footer Island ── */}
      <div className="liquid-glass-footer-rim">
        <div className="liquid-glass-footer-body">
          {/* Top Grid */}
          <div className="lg-footer__top-grid">
            {/* Brand & Newsletter Column */}
            <div className="lg-footer__brand-col">
              <Link to="/" className="lg-footer__brand" aria-label="Flo Studios Home">
                <FloLogo className="lg-footer__brand-icon" height="24px" color="#0e0e12" />
                <span className="lg-footer__brand-text">FLO STUDIOS</span>
              </Link>

              <p className="lg-footer__tagline">
                Motion graphics, 3D CGI direction, and creative technology studio built at the intersection of content and technical infrastructure.
              </p>

              {/* Glass Newsletter Subscribe */}
              <form className="lg-footer__newsletter" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="lg-footer__input"
                  placeholder="Enter email for reel releases..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="lg-footer__submit-btn">
                  {subscribed ? 'Subscribed ✓' : 'Subscribe →'}
                </button>
              </form>
            </div>

            {/* Column 1: Navigate */}
            <div className="lg-footer__col">
              <div className="lg-footer__col-title">Navigate</div>
              <div className="lg-footer__nav-list">
                <Link to="/work" className="lg-footer__link">Work</Link>
                <Link to="/services" className="lg-footer__link">Services</Link>
                <Link to="/about" className="lg-footer__link">About</Link>
                <Link to="/latest" className="lg-footer__link">Latest</Link>
                <Link to="/contact" className="lg-footer__link">Contact</Link>
              </div>
            </div>

            {/* Column 2: Disciplines */}
            <div className="lg-footer__col">
              <div className="lg-footer__col-title">Disciplines</div>
              <div className="lg-footer__nav-list">
                <span className="lg-footer__link">Motion Graphics</span>
                <span className="lg-footer__link">3D & CGI</span>
                <span className="lg-footer__link">Creative Tech</span>
                <span className="lg-footer__link">Brand Systems</span>
                <span className="lg-footer__link">Art Direction</span>
              </div>
            </div>

            {/* Column 3: Studio */}
            <div className="lg-footer__col">
              <div className="lg-footer__col-title">Studio</div>
              <div className="lg-footer__info-block">
                <p className="lg-footer__info-primary">Los Angeles, CA</p>
                <p className="lg-footer__info-secondary">Arts District Studio<br />hello@flostudios.com</p>
              </div>
              <div className="lg-footer__info-block">
                <p className="lg-footer__info-primary">Global / Remote</p>
                <p className="lg-footer__info-secondary">Collaborating Worldwide<br />Available for Commissions</p>
              </div>
            </div>
          </div>

          {/* Translucent Divider */}
          <div className="lg-footer__divider" />

          {/* Bottom Row */}
          <div className="lg-footer__bottom">
            <div className="lg-footer__bottom-left">
              <p className="lg-footer__copyright">
                © {new Date().getFullYear()} Flo Studios. All rights reserved.
              </p>
              <div className="lg-footer__legal">
                <Link to="/" className="lg-footer__legal-link">Privacy Policy</Link>
                <Link to="/" className="lg-footer__legal-link">Terms of Use</Link>
              </div>
            </div>

            {/* Liquid Glass Social Pills */}
            <div className="lg-footer__socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="lg-footer__social-btn"
              >
                Instagram ↗
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="lg-footer__social-btn"
              >
                Vimeo ↗
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="lg-footer__social-btn"
              >
                Twitter / X ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="lg-footer__social-btn"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
