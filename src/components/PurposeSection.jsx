import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PurposeSection.css'

gsap.registerPlugin(ScrollTrigger)

const BIG_WORDS = ['Idea', 'To', 'Outcome.']

export default function PurposeSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Giant text parallax
      gsap.fromTo(
        '.purpose__giant-word',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )

      // Body text
      gsap.fromTo(
        '.purpose__body',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="purpose" id="about-us" ref={sectionRef}>
      <div className="container">
        <h2 className="purpose__label">About Us</h2>

        <div className="purpose__giant">
          {BIG_WORDS.map((word, i) => (
            <span key={i} className="purpose__giant-word">{word}</span>
          ))}
        </div>

        <div className="purpose__body">
          <p>
            Great ideas fail in the space between vision and execution. We built Flo to close that gap—keeping one dedicated team aligned from first concept to living product, refining long after launch.
          </p>
          <Link to="/about" className="purpose__cta">
            Learn more about our studio
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
