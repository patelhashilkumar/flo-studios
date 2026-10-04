import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <motion.main
      className="not-found-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="not-found-container">
        <span className="not-found-badge">404 // NOT FOUND</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page you are looking for doesn't exist, may have moved, or the link is outdated.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-btn not-found-btn--primary">
            Return to Home →
          </Link>
          <Link to="/careers" className="not-found-btn not-found-btn--secondary">
            View Careers & Roles
          </Link>
          <Link to="/contact" className="not-found-btn not-found-btn--secondary">
            Contact Studio
          </Link>
        </div>
      </div>
    </motion.main>
  )
}
