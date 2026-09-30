import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      {/* Marquee CTA */}
      <div className="footer__marquee-wrap">
        <div className="footer__marquee">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="footer__marquee-item">
              To create brand experiences of the highest caliber, we take a multi-disciplinary approach to our work by seamlessly integrating strategy, creative, and technology, and staying in close partnership with our clients.&nbsp;&nbsp;✦&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="footer__main container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Flo Home">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="6" fill="currentColor"/>
                <text x="50%" y="70%" textAnchor="middle" fill="var(--color-bg)" fontSize="16" fontWeight="900" fontFamily="DM Sans, sans-serif">F</text>
              </svg>
              <span>Flo</span>
            </Link>
          </div>
          <Link to="/services" className="footer__cta-link">See our services →</Link>
        </div>

        <div className="footer__grid">
          <div className="footer__col">
            <h4 className="footer__col-title">Navigate</h4>
            <Link to="/work" className="footer__col-link">Work</Link>
            <Link to="/services" className="footer__col-link">Services</Link>
            <Link to="/about" className="footer__col-link">About</Link>
            <Link to="/latest" className="footer__col-link">Latest</Link>
            <Link to="/contact" className="footer__col-link">Contact</Link>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <span className="footer__col-link">Brand</span>
            <span className="footer__col-link">Marketing</span>
            <span className="footer__col-link">Product</span>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Offices</h4>
            <div className="footer__office">
              <p className="footer__office-city">Portland, OR</p>
              <p className="footer__office-addr">2035 NW Front Ave, Suite 600<br/>Portland, OR 97209</p>
            </div>
            <div className="footer__office">
              <p className="footer__office-city">New York, NY</p>
              <p className="footer__office-addr">One World Trade Center<br/>87 Vesey St, Floor 69<br/>New York, NY 10007</p>
            </div>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Connect</h4>
            <a href="https://twitter.com/instrument" target="_blank" rel="noopener noreferrer" className="footer__col-link">Twitter / X</a>
            <a href="https://instagram.com/instrument" target="_blank" rel="noopener noreferrer" className="footer__col-link">Instagram</a>
            <a href="https://linkedin.com/company/instrument" target="_blank" rel="noopener noreferrer" className="footer__col-link">LinkedIn</a>
            <a href="https://vimeo.com/instrument" target="_blank" rel="noopener noreferrer" className="footer__col-link">Vimeo</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© {new Date().getFullYear()} Flo. All rights reserved.</p>
          <div className="footer__legal">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
