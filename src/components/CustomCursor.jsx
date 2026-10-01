import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const followerRef = useRef(null)
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only run on devices that support hover (not touch-only)
    if (window.matchMedia('(hover: none)').matches) return

    let mouseX = -100
    let mouseY = -100
    let followerX = -100
    let followerY = -100
    let rafId = null

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) setIsVisible(true)

      // Direct update for tiny inner dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }

      // Check hovered element for data-cursor or link/button
      const target = e.target.closest('[data-cursor], a, button, .clickable')
      if (target) {
        setIsHovered(true)
        const customText = target.getAttribute('data-cursor') || ''
        setCursorText(customText)
      } else {
        setIsHovered(false)
        setCursorText('')
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Smooth spring/lerp loop for trailing follower
    const render = () => {
      const ease = 0.18
      followerX += (mouseX - followerX) * ease
      followerY += (mouseY - followerY) * ease

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`
      }

      rafId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isVisible])

  return (
    <div className={`custom-cursor-container ${isVisible ? 'custom-cursor-container--visible' : ''}`}>
      {/* Fast center point */}
      <div ref={dotRef} className={`custom-cursor-dot ${isHovered ? 'custom-cursor-dot--hidden' : ''}`} />

      {/* Smooth fluid trailing follower */}
      <div
        ref={followerRef}
        className={`custom-cursor-follower ${
          isHovered ? 'custom-cursor-follower--hovered' : ''
        } ${cursorText ? 'custom-cursor-follower--with-text' : ''}`}
      >
        {cursorText && <span className="custom-cursor-text">{cursorText}</span>}
      </div>
    </div>
  )
}
