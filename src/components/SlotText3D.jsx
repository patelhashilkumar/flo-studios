import './SlotText3D.css'

export default function SlotText3D({
  text,
  isActive = false,
  isHovered = false,
  className = '',
  staggerDelay = 0.014,
}) {
  // Running character counter for smooth staggered cascade across words
  let globalCharIdx = 0

  return (
    <span
      className={`slot-3d-text ${isActive ? 'slot-3d-text--active' : ''} ${isHovered ? 'slot-3d-text--hovered' : ''} ${className}`}
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
                const delayMs = Math.round(charIndex * (staggerDelay * 1000))
                return (
                  <span key={`char-${tIdx}-${cIdx}`} className="slot-3d-text__ch">
                    <span
                      className="slot-3d-text__ch-in"
                      style={{ transitionDelay: `${delayMs}ms` }}
                    >
                      <span className="slot-3d-text__face slot-3d-text__face--top">{char}</span>
                      <span className="slot-3d-text__face slot-3d-text__face--bottom">{char}</span>
                    </span>
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
