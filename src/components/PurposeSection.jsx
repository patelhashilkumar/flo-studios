import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PurposeSection.css'

gsap.registerPlugin(ScrollTrigger)

const LINE_1 = 'Idea'
const LINE_2 = 'To'
const LINE_3 = 'Outcome.'

const splitChars = (text) =>
  text.split('').map((char, index) => (
    <span
      key={`${char}-${index}`}
      className="purpose__char"
      aria-hidden="true"
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

export default function PurposeSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(sectionRef.current.querySelectorAll('.purpose__char, .purpose__reveal'), {
        opacity: 1,
        y: 0,
      })
      return
    }

    const ctx = gsap.context(() => {
      // Reveal each character in the massive grey title lines
      gsap.fromTo(
        '.purpose__char',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )

      // Fade & slide in the editorial paragraphs and CTA button
      gsap.fromTo(
        '.purpose__reveal',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="purpose-wrapper" id="about-us" ref={sectionRef} aria-label="Our Purpose">
      <div className="section-header section-header--below purpose__header">
        <h2 className="t-overline-1">Our Purpose</h2>
      </div>

      <div className="purpose">
        <h3 className="visually-hidden">Idea To Outcome.</h3>

        {/* First editorial paragraph (Row 1 left on desktop) */}
        <p className="purpose__text purpose__text1 purpose__reveal">
          Most Good Ideas Die In The Space Between Vision And Execution. We Built Flo To Close That Gap. Whether We’re Growing A Channel Or Building A Product, The Same Team Stays With The Work From The First Idea To The Moment It Lives In The World — And Keeps Refining Once It’s Out There.
        </p>

        {/* Title 1: "Idea" (Instrument Serif, grey, Row 1 right on desktop) */}
        <div className="purpose__title purpose__title1" aria-label={LINE_1}>
          {splitChars(LINE_1)}
        </div>

        {/* Title 2: "To" (Manrope sans-serif, grey, Row 2 left on desktop) */}
        <div className="purpose__title purpose__title2" aria-label={LINE_2}>
          {splitChars(LINE_2)}
        </div>

        {/* Second editorial paragraph + CTA (Row 3 left on desktop) */}
        <div className="purpose__text purpose__text2 purpose__reveal">
          <p>
            That Means Owning Every Stage With The Same Team: The Instinct For What Holds Attention, The Clarity For Where You Actually Stand, The Craft To Execute Across Disciplines, And The Ownership To Stay Until It Performs. We Measure Success By What Ships And What Grows, Not By What Gets Delivered And Left Behind.
          </p>
          <div className="purpose__cta-wrapper">
            <Link to="/about" className="purpose__cta-btn" aria-label="Learn more about our studio">
              <span className="purpose__cta-label">Learn more about our studio</span>
              <span className="purpose__cta-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Title 3: "Outcome." (Instrument Serif Italic, grey, Row 3 right on desktop) */}
        <div className="purpose__title purpose__title3" aria-label={LINE_3}>
          {splitChars(LINE_3)}
        </div>
      </div>
    </section>
  )
}
