import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './MotionContactForm.css'

const SERVICES = ['Motion Graphics', '3D & CGI', 'Creative Tech', 'Brand Identity']

/**
 * Animated Checkmark Icon
 */
function CheckmarkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="#ffffff"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      <motion.path
        d="M7 12l3.5 3.5L17 9"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
      />
    </svg>
  )
}

/**
 * Motion Submit Button
 * Features smooth spring morphing between Idle, Loading, and Success states.
 */
function MotionSubmitButton({ status, disabled }) {
  return (
    <motion.button
      type="submit"
      disabled={disabled || status === 'loading' || status === 'success'}
      className={`motion-submit-btn ${status === 'success' ? 'motion-submit-btn--success' : ''}`}
      layout
      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
      whileTap={status === 'idle' ? { scale: 0.98 } : {}}
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span className="motion-submit-spinner" />
            <span>Sending...</span>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <CheckmarkIcon />
            <span>Message sent</span>
          </motion.div>
        )}

        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span>Send message</span>
            <span className="motion-submit-arrow">→</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default function MotionContactForm({ activeSubject }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedService, setSelectedService] = useState('Motion Graphics')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success'

  // Sync external topic clicks if triggered from left sidebar
  useEffect(() => {
    if (activeSubject) {
      if (activeSubject === 'Start a Project') setSelectedService('Motion Graphics')
      if (activeSubject === 'Press & Media') setSelectedService('Brand Identity')
      if (activeSubject === 'General Note') setSelectedService('Creative Tech')
    }
  }, [activeSubject])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    setStatus('loading')

    // Simulate authentic network dispatch with smooth feedback
    setTimeout(() => {
      setStatus('success')
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')

      setTimeout(() => {
        setStatus('idle')
      }, 4200)
    }, 1100)
  }

  return (
    <div className="motion-form-card">
      <div className="motion-form-card__header">
        <h3 className="motion-form-card__title">Start a Conversation</h3>
        <p className="motion-form-card__desc">
          Tell us about your project, timeline, or vision. We respond within 24 hours.
        </p>
      </div>

      <form className="motion-form" onSubmit={handleSubmit}>
        {/* Name & Email Row */}
        <div className="motion-form__row">
          <div className="motion-form__group">
            <label className="motion-form__label">Your Name *</label>
            <input
              type="text"
              className="motion-form__input"
              placeholder="e.g. Maya Lin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="motion-form__group">
            <label className="motion-form__label">Email Address *</label>
            <input
              type="email"
              className="motion-form__input"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Phone & Service Row */}
        <div className="motion-form__group">
          <label className="motion-form__label">Phone Number (Optional)</label>
          <input
            type="tel"
            className="motion-form__input"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Discipline / Service Selection Chips */}
        <div className="motion-form__group">
          <label className="motion-form__label">Discipline / Project Focus</label>
          <div className="motion-form__chips">
            {SERVICES.map((s) => (
              <button
                key={s}
                type="button"
                className={`motion-form__chip ${selectedService === s ? 'motion-form__chip--active' : ''}`}
                onClick={() => setSelectedService(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="motion-form__group">
          <label className="motion-form__label">Your Message *</label>
          <textarea
            className="motion-form__textarea"
            placeholder="A big idea, a brief question, or just a little hello..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          />
        </div>

        {/* Motion Submit Button with Spring States */}
        <div className="motion-submit-btn-wrap">
          <MotionSubmitButton status={status} />
        </div>

        {/* Feedback confirmation note on success */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              className="motion-form__feedback"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ✓ Thank you! We received your message and will be in touch shortly.
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}
