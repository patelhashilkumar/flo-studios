import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './FooterWave.css'

export default function FooterWave({ dark: explicitDark }) {
  const canvasRef = useRef(null)
  const drawRef = useRef(null)
  const location = useLocation()
  const isDark = explicitDark !== undefined ? explicitDark : location.pathname === '/latest'
  const darkRef = useRef(isDark)

  useEffect(() => {
    darkRef.current = isDark
    if (drawRef.current) {
      drawRef.current(performance.now())
    }
  }, [isDark])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    let raf = 0
    let mouse = { x: -9999, y: -9999 }

    const fit = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * d
      canvas.height = canvas.clientHeight * d
      ctx.setTransform(d, 0, 0, d, 0, 0)
    }

    const ro = new ResizeObserver(() => {
      fit()
      if (still) draw(0)
    })
    ro.observe(canvas)
    fit()

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
    }

    const onLeave = () => {
      mouse = { x: -9999, y: -9999 }
    }

    canvas.addEventListener('pointermove', onMove, { passive: true })
    canvas.addEventListener('pointerleave', onLeave, { passive: true })

    const draw = (now) => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return

      ctx.clearRect(0, 0, w, h)
      const t = now / 1000
      const currentDark = darkRef.current

      // Three signature Flo wave ribbons: swell and taper, thickening under cursor
      for (let i = 0; i < 3; i++) {
        const y0 = h * (0.32 + 0.18 * i)
        const top = []
        const bottom = []
        for (let px = 0; px <= w + 8; px += 8) {
          const mid = y0 + Math.sin(px * 0.004 + t * 1.2 + i * 1.3) * 14 + Math.sin(px * 0.009 - t * 0.8 + i) * 6
          const swell = (0.5 + 0.5 * Math.sin(px * 0.006 - t * 1.5 + i * 2)) ** 2
          const dx = px - mouse.x
          const dy = mid - mouse.y
          const half = 1 + 10 * swell + 8 * Math.exp(-(dx * dx + dy * dy) / 12000)
          top.push([px, mid - half])
          bottom.push([px, mid + half])
        }

        ctx.fillStyle = currentDark
          ? [
              'rgba(255, 255, 255, 0.96)',
              'rgba(255, 255, 255, 0.50)',
              'rgba(255, 255, 255, 0.20)',
            ][i]
          : [
              'rgba(14, 14, 18, 0.96)',
              'rgba(14, 14, 18, 0.48)',
              'rgba(14, 14, 18, 0.18)',
            ][i]

        ctx.beginPath()
        top.forEach(([px, y], k) => (k ? ctx.lineTo(px, y) : ctx.moveTo(px, y)))
        bottom.reverse().forEach(([px, y]) => ctx.lineTo(px, y))
        ctx.fill()
      }
    }

    drawRef.current = draw

    let isVisible = true
    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    }, { threshold: 0.05 })
    io.observe(canvas)

    if (still) {
      draw(0)
    } else {
      const loop = (now) => {
        if (isVisible) draw(now)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    return () => {
      drawRef.current = null
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className={`footer__wave-wrap ${isDark ? 'footer__wave-wrap--dark' : ''}`} aria-hidden="true">
      <canvas ref={canvasRef} className="footer__wave-canvas" />
    </div>
  )
}
