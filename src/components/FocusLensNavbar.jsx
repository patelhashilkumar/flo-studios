import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion'
import FloLogo from './FloLogo'
import './FocusLensNavbar.css'

const NAV_ITEMS = [
  // Left items
  { id: 'work', label: 'WORK', to: '/work' },
  { id: 'services', label: 'SERVICES', to: '/services' },
  { id: 'about', label: 'ABOUT', to: '/about' },
  // Center Brand Mark
  { id: 'brand', label: 'FLO', to: '/', isBrand: true },
  // Right items
  { id: 'latest', label: 'LATEST', to: '/latest' },
  { id: 'careers', label: 'CAREERS', to: '/about' },
  // Signature Glass CTA
  { id: 'contact', label: 'CONTACT', to: '/contact', isCta: true },
]

const LENS_SPRING = {
  type: 'spring',
  stiffness: 420,
  damping: 38,
  mass: 0.7,
}

/**
 * Viewfinder Corner Lens Brackets
 * Glides smoothly across the active focus target with spring motion
 */
function ViewfinderLens({ target, color = '#0e0e12' }) {
  const padX = 8
  const padY = 5
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const w = useMotionValue(0)
  const h = useMotionValue(0)
  const opacity = useMotionValue(0)
  const scale = useMotionValue(1)
  const hasAppeared = useRef(false)

  useEffect(() => {
    if (!target) {
      animate(opacity, 0, { duration: 0.2, ease: 'easeOut' })
      hasAppeared.current = false
      return
    }

    const tx = target.x - padX
    const ty = target.y - padY
    const tw = target.w + padX * 2
    const th = target.h + padY * 2

    if (!hasAppeared.current) {
      // First appearance into view: snap into place and camera focus zoom
      x.jump(tx)
      y.jump(ty)
      w.jump(tw)
      h.jump(th)
      animate(opacity, 1, { duration: 0.18, ease: 'easeOut' })
      scale.jump(1.18)
      animate(scale, 1, { type: 'spring', stiffness: 480, damping: 32 })
      hasAppeared.current = true
    } else {
      // Gliding between links
      animate(x, tx, LENS_SPRING)
      animate(y, ty, LENS_SPRING)
      animate(w, tw, LENS_SPRING)
      animate(h, th, LENS_SPRING)
    }
  }, [target, padX, padY, x, y, w, h, opacity, scale])

  const arm = 7
  const t = 1.25
  const corner = (pos, borders) => ({
    position: 'absolute',
    width: arm,
    height: arm,
    borderColor: color,
    borderStyle: 'solid',
    borderWidth: 0,
    transition: 'border-color 0.2s ease',
    ...pos,
    ...borders,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        x,
        y,
        width: w,
        height: h,
        opacity,
        scale,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {/* Top Left */}
      <span style={corner({ left: 0, top: 0 }, { borderLeftWidth: t, borderTopWidth: t, borderTopLeftRadius: 2 })} />
      {/* Top Right */}
      <span style={corner({ right: 0, top: 0 }, { borderRightWidth: t, borderTopWidth: t, borderTopRightRadius: 2 })} />
      {/* Bottom Left */}
      <span style={corner({ left: 0, bottom: 0 }, { borderLeftWidth: t, borderBottomWidth: t, borderBottomLeftRadius: 2 })} />
      {/* Bottom Right */}
      <span style={corner({ right: 0, bottom: 0 }, { borderRightWidth: t, borderBottomWidth: t, borderBottomRightRadius: 2 })} />
    </motion.div>
  )
}

export default function FocusLensNavbar() {
  const [hotId, setHotId] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lensTarget, setLensTarget] = useState(null)
  const location = useLocation()

  const containerRef = useRef(null)
  const itemRefs = useRef(new Map())

  const registerItem = useCallback((id, el) => {
    if (el) {
      itemRefs.current.set(id, el)
    } else {
      itemRefs.current.delete(id)
    }
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Track closest link on mouse move across the capsule
  const handlePointerMove = (e) => {
    if (e.pointerType === 'touch') return
    if (!containerRef.current) return

    let bestId = null
    let bestDist = Infinity

    itemRefs.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const dist = Math.abs(e.clientX - centerX)
      if (dist < bestDist) {
        bestDist = dist
        bestId = id
      }
    })

    if (bestId !== hotId) {
      setHotId(bestId)
    }
  }

  const handlePointerLeave = () => {
    setHotId(null)
  }

  // Update target coordinates relative to container
  useEffect(() => {
    if (!hotId || !containerRef.current) {
      setLensTarget(null)
      return
    }

    const targetEl = itemRefs.current.get(hotId)
    if (!targetEl) {
      setLensTarget(null)
      return
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const targetRect = targetEl.getBoundingClientRect()

    setLensTarget({
      x: targetRect.left - containerRect.left,
      y: targetRect.top - containerRect.top,
      w: targetRect.width,
      h: targetRect.height,
    })
  }, [hotId])

  // Viewfinder bracket color: white over dark CTA, dark obsidian over liquid glass links
  const lensColor = hotId === 'contact' ? '#ffffff' : '#0e0e12'

  return (
    <header className="focus-nav-header" id="site-header">
      {/* ── 1. Desktop Liquid Glass Navbar ── */}
      <div className="liquid-glass-rim">
        <nav
          ref={containerRef}
          className="liquid-glass-body"
          aria-label="Primary Navigation"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="focus-nav-track">
            {NAV_ITEMS.map((item) => {
              const isHot = hotId === item.id
              const isAnyHot = hotId !== null
              const isActive = location.pathname === item.to && !item.isBrand

              // Focus & Depth of Field blur states
              const textAnimate = isHot
                ? { opacity: 1, filter: 'blur(0px)', scale: 1 }
                : isAnyHot
                ? { opacity: 0.28, filter: 'blur(2px)', scale: 0.97 }
                : isActive
                ? { opacity: 1, filter: 'blur(0px)', scale: 1 }
                : { opacity: 0.72, filter: 'blur(0px)', scale: 1 }

              if (item.isBrand) {
                return (
                  <Link
                    key={item.id}
                    to="/"
                    className="focus-nav-brand"
                    aria-label="Flo Studios Home"
                  >
                    <motion.div
                      ref={(el) => registerItem(item.id, el)}
                      className="focus-nav-brand__content"
                      animate={textAnimate}
                      transition={LENS_SPRING}
                    >
                      <FloLogo className="focus-nav-brand__mark" height="17px" color="#0e0e12" />
                      <span className="focus-nav-brand__text">FLO</span>
                    </motion.div>
                  </Link>
                )
              }

              if (item.isCta) {
                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    className="focus-nav-cta"
                  >
                    <motion.span
                      ref={(el) => registerItem(item.id, el)}
                      className="focus-nav-cta__text"
                      animate={isHot ? { scale: 1.02 } : isAnyHot ? { opacity: 0.65 } : { opacity: 1 }}
                      transition={LENS_SPRING}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                )
              }

              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className={`focus-nav-link ${isActive ? 'focus-nav-link--active' : ''}`}
                >
                  <motion.span
                    ref={(el) => registerItem(item.id, el)}
                    className="focus-nav-link__text"
                    animate={textAnimate}
                    transition={LENS_SPRING}
                  >
                    {item.label}
                  </motion.span>
                  {isActive && <span className="focus-nav-link__dot" />}
                </Link>
              )
            })}
          </div>

          {/* Viewfinder brackets glide over whichever element is in focus */}
          <ViewfinderLens target={lensTarget} color={lensColor} />
        </nav>
      </div>

      {/* ── 2. Mobile Liquid Glass Capsule + Drawer ── */}
      <div className={`liquid-glass-mobile-wrap ${mobileOpen ? 'liquid-glass-mobile-wrap--open' : ''}`}>
        <div className="liquid-glass-mobile-inner">
          <div
            className="liquid-glass-mobile-bar"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Link
              to="/"
              className="liquid-glass-mobile-brand"
              onClick={(e) => {
                e.stopPropagation()
                setMobileOpen(false)
              }}
              aria-label="Flo Studios Home"
            >
              <FloLogo height="17px" color="#0e0e12" />
              <span className="liquid-glass-mobile-brand__text">FLO STUDIOS</span>
            </Link>

            <button
              className="liquid-glass-mobile-toggle"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <span className="liquid-glass-mobile-toggle__label">
                {mobileOpen ? 'CLOSE' : 'MENU'}
              </span>
              <div className="liquid-glass-mobile-icon">
                <span />
                <span />
              </div>
            </button>
          </div>

          {/* Expandable Drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                className="liquid-glass-mobile-drawer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {NAV_ITEMS.filter((i) => !i.isBrand).map((item) => {
                  const isActive = location.pathname === item.to
                  return (
                    <Link
                      key={item.id}
                      to={item.to}
                      className={`liquid-glass-mobile-link ${isActive ? 'liquid-glass-mobile-link--active' : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="liquid-glass-mobile-link__label">{item.label}</span>
                      <span className="liquid-glass-mobile-link__arrow">→</span>
                    </Link>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
