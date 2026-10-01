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
              To create motion and brand experiences of the highest caliber, we integrate art direction, 3D motion design, and technical infrastructure, staying in close partnership with visionary clients.&nbsp;&nbsp;✦&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="footer__main container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Flo Studios Home">
              <span className="footer__logo-mark">FLO STUDIOS</span>
            </Link>
          </div>
          <Link to="/contact" className="footer__cta-link">Start a project →</Link>
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
            <h4 className="footer__col-title">Disciplines</h4>
            <span className="footer__col-link">Motion Graphics</span>
            <span className="footer__col-link">3D & CGI</span>
            <span className="footer__col-link">Creative Technology</span>
            <span className="footer__col-link">Brand Identity</span>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Studio</h4>
            <div className="footer__office">
              <p className="footer__office-city">Los Angeles, CA</p>
              <p className="footer__office-addr">Arts District Studio<br/>hello@flostudios.com</p>
            </div>
            <div className="footer__office">
              <p className="footer__office-city">Global / Remote</p>
              <p className="footer__office-addr">Collaborating Worldwide<br/>Available for Commissions</p>
            </div>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Connect</h4>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__col-link">Instagram</a>
            <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="footer__col-link">Vimeo</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer__col-link">Twitter / X</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__col-link">LinkedIn</a>
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
