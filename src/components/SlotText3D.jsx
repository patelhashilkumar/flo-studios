import { useEffect, useRef, useCallback } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import './SlotText3D.css'

export default function SlotText3D({
  text,
  isActive = false,
  isHovered = false,
  className = '',
  staggerDelay = 0.016,
  duration = 0.38,
}) {
  const controls = useAnimationControls()
  const isAnimating = useRef(false)
  const isFirstRender = useRef(true)

  const playFlip = useCallback(async () => {
    if (isAnimating.current) return
    isAnimating.current = true
    try {
      await controls.set('initial')
      await controls.start('animate')
    } catch {
      // Safely catch any unmount animation cancel
    } finally {
      isAnimating.current = false
    }
  }, [controls])

  // Trigger 3D tumble when the row is hovered
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (isHovered) {
      playFlip()
    }
  }, [isHovered, playFlip])

  const outgoingVariants = {
    initial: {
      y: '0em',
      rotateX: 0,
      opacity: 1,
    },
    animate: (i) => ({
      y: '-0.22em',
      rotateX: 90,
      opacity: 0,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
        delay: i * staggerDelay,
      },
    }),
  }

  const incomingVariants = {
    initial: {
      y: '0.22em',
      rotateX: -90,
      opacity: 0,
    },
    animate: (i) => ({
      y: '0em',
      rotateX: 0,
      opacity: 1,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
        delay: i * staggerDelay,
      },
    }),
  }

  // Running character counter for smooth staggered cascade across words
  let globalCharIdx = 0

  return (
    <span
      className={`slot-3d-text ${isActive ? 'slot-3d-text--active' : ''} ${className}`}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <span className="slot-3d-text__visual" aria-hidden="true">
        {text.split(/(\s+)/).map((token, tIdx) => {
          if (!token) return null
          const isWhitespace = /^\s+$/.test(token)
          if (isWhitespace) {
            return (
              <span key={`space-${tIdx}`} className="slot-3d-text__space">
                &nbsp;
              </span>
            )
          }

          return (
            <span key={`word-${tIdx}`} className="slot-3d-text__word">
              {token.split('').map((char, cIdx) => {
                const charIndex = globalCharIdx++
                return (
                  <span key={`char-${tIdx}-${cIdx}`} className="slot-3d-text__char-slot">
                    {/* Outgoing face */}
                    <motion.span
                      className="slot-3d-text__face slot-3d-text__face--outgoing"
                      custom={charIndex}
                      variants={outgoingVariants}
                      initial="initial"
                      animate={controls}
                    >
                      {char}
                    </motion.span>

                    {/* Incoming face */}
                    <motion.span
                      className="slot-3d-text__face slot-3d-text__face--incoming"
                      custom={charIndex}
                      variants={incomingVariants}
                      initial="initial"
                      animate={controls}
                    >
                      {char}
                    </motion.span>
                  </span>
                )
              })}
            </span>
          )
        })}
      </span>
    </span>
  )
}
