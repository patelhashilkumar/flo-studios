import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion'
import FloLogo from './FloLogo'
import './FocusLensNavbar.css'

const LEFT_ITEMS = [
  { id: 'work', label: 'WORK', to: '/work' },
  { id: 'services', label: 'SERVICES', to: '/services' },
  { id: 'about', label: 'ABOUT', to: '/about' },
]

const RIGHT_ITEMS = [
  { id: 'latest', label: 'LATEST', to: '/latest' },
  { id: 'careers', label: 'CAREERS', to: '/careers' },
  { id: 'contact', label: 'CONTACT', to: '/contact', isCta: true },
]

const BRAND_ITEM = { id: 'brand', label: 'FLO', to: '/', isBrand: true }

const ALL_ITEMS = [...LEFT_ITEMS, BRAND_ITEM, ...RIGHT_ITEMS]

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
  const padX = 7
  const padY = 4
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

  const arm = 6.5
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

  // Track closest link on mouse move across the full-width capsule
  const handlePointerMove = (e) => {
    if (e.pointerType === 'touch') return
    if (!containerRef.current) return

    let bestId = null
    let bestDist = Infinity

    itemRefs.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY)
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

  const renderItem = (item) => {
    const isHot = hotId === item.id
    const isAnyHot = hotId !== null
    const isActive = location.pathname === item.to && !item.isBrand

    const textAnimate = isHot
      ? { opacity: 1, filter: 'blur(0px)', scale: 1 }
      : isAnyHot
      ? { opacity: 0.32, filter: 'blur(1.8px)', scale: 0.98 }
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
            <FloLogo className="focus-nav-brand__mark" height="15px" color="#0e0e12" />
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
  }

  return (
    <header className="focus-nav-header" id="site-header">
      {/* ── 1. Desktop Full-Width Liquid Glass Navbar ── */}
      <div className="liquid-glass-rim">
        <nav
          ref={containerRef}
          className="liquid-glass-body"
          aria-label="Primary Navigation"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* Left links group */}
          <div className="focus-nav-side focus-nav-side--left">
            {LEFT_ITEMS.map((item) => renderItem(item))}
          </div>

          {/* Center Brand FLO (Mathematically Centered across the whole site width) */}
          <div className="focus-nav-center">
            {renderItem(BRAND_ITEM)}
          </div>

          {/* Right links group + Signature CTA */}
          <div className="focus-nav-side focus-nav-side--right">
            {RIGHT_ITEMS.map((item) => renderItem(item))}
          </div>

          {/* Viewfinder brackets glide over whichever element is in focus */}
          <ViewfinderLens target={lensTarget} color={lensColor} />
        </nav>
      </div>

      {/* ── 2. Mobile Full-Width Liquid Glass Capsule + Drawer ── */}
      <nav
        className={`liquid-glass-mobile-wrap ${mobileOpen ? 'liquid-glass-mobile-wrap--open' : ''}`}
        aria-label="Mobile Navigation"
      >
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
              <FloLogo height="15px" color="#0e0e12" />
              <span className="liquid-glass-mobile-brand__text">FLO STUDIOS</span>
            </Link>

            <button
              className="liquid-glass-mobile-toggle"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
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
                id="mobile-nav-drawer"
                className="liquid-glass-mobile-drawer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {ALL_ITEMS.filter((i) => !i.isBrand).map((item) => {
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
      </nav>
    </header>
  )
}
