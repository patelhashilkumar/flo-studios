import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  REST_FRAME,
  readCards,
  planBento,
  boxesFor,
  shadeFor,
  textFit,
  edge,
  span,
  limit,
  two,
  tint,
} from '../utils/casementLayout'
import './CasementGrid.css'

const GLIDE_ARRAY = [0.22, 0.9, 0.12, 1]

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */
function useInView(ref) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const node = ref.current
    let onScreen = true
    let tabOn = typeof document === 'undefined' ? true : !document.hidden
    const commit = () => {
      const next = onScreen && tabOn
      setOpen((prev) => (prev === next ? prev : next))
    }
    let watcher = null
    if (node && typeof IntersectionObserver !== 'undefined') {
      onScreen = false
      watcher = new IntersectionObserver(
        (records) => {
          for (const r of records) onScreen = r.isIntersecting
          commit()
        },
        { rootMargin: '100px 0px', threshold: 0 }
      )
      watcher.observe(node)
    }
    const onTab = () => {
      tabOn = !document.hidden
      commit()
    }
    if (typeof document !== 'undefined') document.addEventListener('visibilitychange', onTab)
    commit()
    return () => {
      if (watcher) watcher.disconnect()
      if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', onTab)
    }
  }, [ref])
  return open
}

function useQuery(query, fallback) {
  const [match, setMatch] = useState(fallback)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const list = window.matchMedia(query)
    const read = () => setMatch(list.matches)
    read()
    if (list.addEventListener) list.addEventListener('change', read)
    else list.addListener(read)
    return () => {
      if (list.removeEventListener) list.removeEventListener('change', read)
      else list.removeListener(read)
    }
  }, [query])
  return match
}

/* ------------------------------------------------------------------ */
/* Subcomponents                                                       */
/* ------------------------------------------------------------------ */
function TileVideo({ src, videoWebm, videoMp4, playing, poster, className, label }) {
  const ref = useRef(null)
  const playPromiseRef = useRef(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    if (playing) {
      if (v.ended) {
        v.currentTime = 0
      }
      const attempt = v.play()
      playPromiseRef.current = attempt
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(() => {})
      }
    } else {
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            if (!v.paused) v.pause()
          })
          .catch(() => {})
      } else {
        v.pause()
      }
    }
  }, [playing])

  useEffect(() => {
    const v = ref.current
    return () => {
      if (v) v.pause()
    }
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      disablePictureInPicture
      preload="auto"
      aria-label={label}
    >
      {videoWebm && <source src={videoWebm} type="video/webm" />}
      {videoMp4 && <source src={videoMp4} type="video/mp4" />}
      {src && !videoWebm && !videoMp4 && <source src={src} type="video/mp4" />}
    </video>
  )
}

function Arrow({ way }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={way === 'back' ? 'M13 8H3m4-4.5L2.5 8 7 12.5' : 'M3 8h10M9 3.5 13.5 8 9 12.5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LiveLightbox({
  cards,
  index,
  still,
  onIndex,
  onClose,
  background = '#0a0b0e',
  textColor = '#ffffff',
  radius = 12,
}) {
  const list = cards
  const total = list.length
  const card = list[index]
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const videoRef = useRef(null)
  const touch = useRef(null)
  const [heading, setHeading] = useState(1)

  const go = useCallback(
    (dir) => {
      if (total < 2) return
      setHeading(dir)
      onIndex((i) => (i + dir + total) % total)
    },
    [total, onIndex]
  )

  useEffect(() => {
    if (closeRef.current) closeRef.current.focus({ preventScroll: true })
    const body = document.body
    const overflow = body.style.overflow
    const padRight = body.style.paddingRight
    const bar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (bar > 0) body.style.paddingRight = `${bar}px`
    return () => {
      body.style.overflow = overflow
      body.style.paddingRight = padRight
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = false
    const attempt = v.play()
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        v.muted = true
        const retry = v.play()
        if (retry && typeof retry.catch === 'function') retry.catch(() => {})
      })
    }
    return () => v.pause()
  }, [card.id])

  // Warm neighbouring stills
  useEffect(() => {
    if (total < 2) return
    for (const n of [list[(index + 1) % total], list[(index - 1 + total) % total]]) {
      if (!n || !n.still || n.id === card.id) continue
      const warm = new window.Image()
      if (n.stillSet) warm.srcset = n.stillSet
      warm.src = n.still
    }
  }, [index, total, list, card.id])

  const trap = (e) => {
    if (e.key !== 'Tab') return
    const root = panelRef.current
    if (!root) return
    const stops = root.querySelectorAll('button, a[href], video[controls]')
    if (!stops.length) return
    const first = stops[0]
    const last = stops[stops.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const down = (e) => {
    if (e.pointerType === 'mouse') return
    touch.current = { x: e.clientX, y: e.clientY, id: e.pointerId }
  }

  const up = (e) => {
    const t = touch.current
    touch.current = null
    if (!t || t.id !== e.pointerId) return
    const dx = e.clientX - t.x
    const dy = e.clientY - t.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) go(dx < 0 ? 1 : -1)
  }

  const stop = (e) => e.stopPropagation()

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={card.alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: GLIDE_ARRAY }}
      onClick={onClose}
      onKeyDown={trap}
      onPointerDown={down}
      onPointerUp={up}
      onPointerCancel={() => {
        touch.current = null
      }}
      className="casement-lightbox-dialog"
      style={{
        background: tint(background, 0.88),
        color: textColor,
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="casement-btn"
        aria-label="Close"
        onClick={(e) => {
          stop(e)
          onClose()
        }}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 44,
          height: 44,
          zIndex: 5,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1.5 1.5l11 11M12.5 1.5l-11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            className="casement-btn casement-side"
            aria-label="Previous"
            onClick={(e) => {
              stop(e)
              go(-1)
            }}
            style={{ left: 'clamp(12px, 3vw, 36px)' }}
          >
            <Arrow way="back" />
          </button>
          <button
            type="button"
            className="casement-btn casement-side"
            aria-label="Next"
            onClick={(e) => {
              stop(e)
              go(1)
            }}
            style={{ right: 'clamp(12px, 3vw, 36px)' }}
          >
            <Arrow way="on" />
          </button>
        </>
      )}

      <AnimatePresence initial={false} custom={heading}>
        <motion.div
          key={card.id}
          custom={heading}
          variants={{
            enter: (d) => ({ opacity: 0, x: still ? 0 : d * 50, scale: still ? 1 : 0.96 }),
            rest: { opacity: 1, x: 0, scale: 1 },
            leave: (d) => ({ opacity: 0, x: still ? 0 : d * -50, scale: still ? 1 : 0.96 }),
          }}
          initial="enter"
          animate="rest"
          exit="leave"
          transition={{ duration: still ? 0.15 : 0.45, ease: GLIDE_ARRAY }}
          className="casement-lightbox-card"
        >
          {card.kind === 'video' ? (
            <video
              ref={videoRef}
              src={card.video}
              controls
              loop
              playsInline
              preload="auto"
              aria-label={card.alt}
              onClick={stop}
              className="casement-lightbox-media"
              style={{ borderRadius: radius, background: '#000' }}
            >
              {card.videoWebm && <source src={card.videoWebm} type="video/webm" />}
              {card.videoMp4 && <source src={card.videoMp4} type="video/mp4" />}
            </video>
          ) : (
            <img
              src={card.still}
              srcSet={card.stillSet || undefined}
              sizes={card.stillSet ? '100vw' : undefined}
              alt={card.alt}
              decoding="async"
              draggable={false}
              onClick={stop}
              className="casement-lightbox-media"
              style={{ borderRadius: radius, objectFit: 'contain', userSelect: 'none' }}
            />
          )}

          <div className="casement-lightbox-meta" onClick={stop}>
            {card.category && <span className="casement-lightbox-category">{card.category}</span>}
            {card.title && <h3 className="casement-lightbox-title">{card.title}</h3>}
            {card.description && <p className="casement-lightbox-desc">{card.description}</p>}
            {card.link && (
              <Link to={card.link} className="casement-lightbox-cta" onClick={onClose}>
                View Project
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

function LiveTile({
  card,
  index,
  box,
  gap,
  radius,
  fit,
  lit,
  playing,
  eager,
  sizes,
  shade,
  captionMode,
  showIndex,
  showBadge,
  clickAction,
  onLight,
  onOpen,
  bindRef,
}) {
  const navigate = useNavigate()
  const [brokenSrc, setBrokenSrc] = useState(null)
  const broken = brokenSrc === card.still

  const asLink = clickAction === 'link' && Boolean(card.link)
  const asButton = clickAction === 'lightbox'
  const withText = captionMode !== 'hidden' && fit.title && Boolean(card.title || card.category)

  const handleClick = () => {
    if (asButton) {
      onOpen(index)
    } else if (asLink && card.link) {
      if (card.link.startsWith('http')) {
        window.open(card.link, '_blank', 'noopener,noreferrer')
      } else {
        navigate(card.link)
      }
    }
  }

  return (
    <div
      ref={bindRef}
      className={`casement-tile ${asLink || asButton ? 'casement-go' : ''} ${lit ? 'casement-lit' : ''}`}
      style={{
        left: edge(box.x, gap),
        top: edge(box.y, gap),
        width: span(box.w, gap),
        height: span(box.h, gap),
        borderRadius: radius,
        '--cg-d': `${Math.min(index, 10) * 60}ms`,
      }}
      role={asButton ? 'button' : asLink ? 'link' : undefined}
      tabIndex={asButton || asLink ? 0 : undefined}
      aria-label={`View ${card.alt}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick(e)
        }
      }}
      onMouseEnter={() => onLight(index)}
      onMouseLeave={() => onLight(-1)}
      onFocus={(e) => {
        const isKeyboard = !e.currentTarget.matches || e.currentTarget.matches(':focus-visible')
        if (isKeyboard) onLight(index)
      }}
      onBlur={() => onLight(-1)}
    >
      {card.kind === 'video' ? (
        <TileVideo
          className="casement-media"
          src={card.video}
          videoWebm={card.videoWebm}
          videoMp4={card.videoMp4}
          poster={card.still}
          playing={playing}
          label={card.alt}
        />
      ) : broken ? (
        <span className="casement-blank" />
      ) : (
        <img
          className="casement-media"
          src={card.still}
          srcSet={card.stillSet || undefined}
          sizes={card.stillSet ? sizes : undefined}
          alt={card.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          onError={() => setBrokenSrc(card.still)}
        />
      )}

      {withText && <span className="casement-shade" style={{ background: shade }} aria-hidden="true" />}

      {showIndex && (
        <span className="casement-chip" aria-hidden="true">
          {two(index + 1)}
        </span>
      )}

      {card.kind === 'video' && showBadge && (
        <span className="casement-badge casement-badge--label" aria-hidden="true">
          <svg width="9" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          MOTION
        </span>
      )}

      {withText && (
        <div
          className={`casement-cap ${captionMode === 'hover' ? 'casement-cap--hover' : ''}`}
          style={{ padding: fit.pad }}
        >
          {fit.category && card.category && <span className="casement-category">{card.category}</span>}
          {card.title && (
            <span className="casement-title" style={{ fontSize: `${fit.size}px` }}>
              {card.title}
            </span>
          )}
        </div>
      )}

      <span className="casement-veil" aria-hidden="true" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main CasementGrid Component                                        */
/* ------------------------------------------------------------------ */
export default function CasementGrid({
  cards: rawCards,
  clickAction = 'lightbox',
  heightMode = 'frame',
  height = 'clamp(850px, 94vh, 1300px)',
  minHeight = 800,
  padding = 0,
  gap = 12,
  radius = 16,
  mirror = false,
  hoverGrow = 1.3,
  dimOthers = 0.28,
  reflowSpeed = 0.35,
  hoverZoom = 1.05,
  playMode = 'hover',
  captionMode = 'always',
  showIndex = false,
  showBadge = false,
  tileColor = '#111215',
  textColor = '#ffffff',
  shadeColor = '#000000',
  shadeOpacity = 0.78,
  titleFontSize = 32,
  backgroundColor = 'transparent',
  className = '',
  style = {},
}) {
  const rootRef = useRef(null)
  const fieldRef = useRef(null)
  const tileRefs = useRef([])
  const openRef = useRef(-1)

  const inView = useInView(rootRef)
  const still = useQuery('(prefers-reduced-motion: reduce)', false)

  const [frame, setFrame] = useState(null)
  const [lit, setLit] = useState(-1)
  const [openAt, setOpenAt] = useState(-1)

  const cards = useMemo(() => readCards(rawCards), [rawCards])
  const count = cards.length
  const restWeights = useMemo(() => cards.map((c) => c.weight), [cards])

  useEffect(() => {
    openRef.current = openAt
  }, [openAt])

  useEffect(() => {
    const node = fieldRef.current
    if (!node) return
    const take = (w, h) => {
      const next = { w: Math.round(w), h: Math.round(h) }
      setFrame((prev) => (prev && prev.w === next.w && prev.h === next.h ? prev : next))
    }
    const r = node.getBoundingClientRect()
    take(r.width, r.height)
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver((records) => {
      for (const rec of records) take(rec.contentRect.width, rec.contentRect.height)
    })
    ro.observe(node)
    return () => ro.disconnect()
  }, [count])

  const shown = Boolean(inView && frame)

  const fieldW = frame ? frame.w : REST_FRAME.w
  const fieldH = frame ? frame.h : REST_FRAME.h

  const tree = useMemo(() => planBento(count, restWeights, fieldW, fieldH), [count, restWeights, fieldW, fieldH])
  const restBoxes = useMemo(() => boxesFor(tree, count, restWeights, mirror), [tree, count, restWeights, mirror])

  const litRafRef = useRef(null)
  const setLitThrottled = useCallback((nextIndex) => {
    if (litRafRef.current) cancelAnimationFrame(litRafRef.current)
    litRafRef.current = requestAnimationFrame(() => {
      setLit(nextIndex)
    })
  }, [])

  useEffect(() => {
    return () => {
      if (litRafRef.current) cancelAnimationFrame(litRafRef.current)
    }
  }, [])

  const grows = hoverGrow > 1.001 && !still && fieldW >= 480
  const liveWeights = useMemo(() => {
    if (!grows || lit < 0 || lit >= count) return restWeights
    const next = restWeights.slice()
    next[lit] = next[lit] * hoverGrow
    return next
  }, [grows, lit, count, restWeights, hoverGrow])

  const boxes = useMemo(() => boxesFor(tree, count, liveWeights, mirror), [tree, count, liveWeights, mirror])

  const boxOpen = clickAction === 'lightbox' && openAt >= 0 && openAt < count

  const openCard = useCallback((i) => {
    if (litRafRef.current) cancelAnimationFrame(litRafRef.current)
    setOpenAt(i)
    setLit(-1)
  }, [])

  const closeBox = useCallback(() => {
    const current = openRef.current
    if (current >= 0) {
      const node = tileRefs.current[current]
      window.setTimeout(() => {
        if (node) node.focus({ preventScroll: true })
      }, 0)
    }
    setOpenAt(-1)
  }, [])

  const shade = useMemo(() => shadeFor(shadeColor, shadeOpacity), [shadeColor, shadeOpacity])
  const byViewport = heightMode === 'viewport'

  const rootClass = [
    'casement-root',
    byViewport ? 'casement-root--vh' : '',
    inView ? '' : 'casement-idle',
    shown ? 'casement-shown' : '',
    lit >= 0 && dimOthers > 0 ? 'casement-hush' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const rootStyle = {
    ...style,
    height: byViewport ? undefined : height,
    minHeight,
    background: backgroundColor,
    '--cg-flow': `${Math.max(0.1, reflowSpeed)}s`,
    '--cg-hover-zoom': hoverZoom,
    '--cg-dim': limit(dimOthers, 0, 0.9),
    '--cg-tile-bg': tileColor,
    '--cg-text-color': textColor,
    '--cg-bg': backgroundColor === 'transparent' ? '#000000' : backgroundColor,
  }

  if (count === 0) {
    return null
  }

  const inset = padding - gap / 2
  const playHover = playMode === 'hover'

  return (
    <div ref={rootRef} className={rootClass} style={rootStyle}>
      <div
        ref={fieldRef}
        className="casement-field"
        style={{ inset: `${inset}px` }}
        onPointerLeave={() => setLitThrottled(-1)}
      >
        {cards.map((card, i) => {
          const b = boxes[i]
          if (!b) return null
          const restB = restBoxes[i] || b
          const fit = textFit(restB.w * fieldW - gap, restB.h * fieldH - gap, titleFontSize)
          const playing = card.kind === 'video' && inView && !boxOpen && (playHover ? lit === i : !still)

          return (
            <LiveTile
              key={card.id}
              card={card}
              index={i}
              box={b}
              gap={gap}
              radius={radius}
              fit={fit}
              lit={lit === i}
              playing={playing}
              eager={i < 4}
              sizes={`${limit(Math.round(b.w * 100), 25, 100)}vw`}
              shade={shade}
              captionMode={captionMode}
              showIndex={showIndex}
              showBadge={showBadge}
              clickAction={clickAction}
              onLight={setLitThrottled}
              onOpen={openCard}
              bindRef={(node) => {
                tileRefs.current[i] = node
              }}
            />
          )
        })}
      </div>

      <AnimatePresence>
        {boxOpen && (
          <LiveLightbox
            cards={cards}
            index={openAt}
            still={still}
            onIndex={setOpenAt}
            onClose={closeBox}
            background="#0a0b0e"
            textColor={textColor}
            radius={radius}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
