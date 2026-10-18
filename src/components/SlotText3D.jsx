import './SlotText3D.css'

export default function SlotText3D({
  text,
  isActive = false,
  isHovered = false,
  className = '',
  staggerDelay = 0.016,
  duration = 0.38,
}) {
  // Running character counter for smooth staggered cascade across words
  let globalCharIdx = 0

  return (
    <span
      className={`slot-3d-text ${isActive ? 'slot-3d-text--active' : ''} ${className}`}
      aria-label={text}
      style={{
        '--stagger-delay': `${staggerDelay}s`,
        '--duration': `${duration}s`,
      }}
    >
      <span className="sr-only">{text}</span>
      <span
        className={`slot-3d-text__visual ${isHovered ? 'slot-3d-text__visual--animating' : ''}`}
        aria-hidden="true"
      >
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
                  <span
                    key={`char-${tIdx}-${cIdx}`}
                    className="slot-3d-text__char-slot"
                    style={{ '--char-i': charIndex }}
                  >
                    {/* Outgoing face: tumbles out 90deg on X axis via GPU CSS keyframe */}
                    <span className="slot-3d-text__face slot-3d-text__face--outgoing">
                      {char}
                    </span>

                    {/* Incoming face: tumbles in from -90deg on X axis via GPU CSS keyframe */}
                    <span className="slot-3d-text__face slot-3d-text__face--incoming">
                      {char}
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
