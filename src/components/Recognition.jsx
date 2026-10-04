import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Recognition.css'

gsap.registerPlugin(ScrollTrigger)

const AWARDS = [
  'The Drum Awards',
  'B2 Awards',
  'The Webbys',
  'Fast Company',
  'Awwwards',
  'Indigo Awards',
  'Campaign AOTY',
  'Anthem Awards',
  'W3 Awards',
  'ADC Awards',
  'Shorty Awards',
  'Clio Health Awards',
]

export default function Recognition() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.recognition__title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(
        '.recognition__badge',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="recognition" ref={sectionRef}>
      <div className="container">
        <h2 className="recognition__title">Industry Recognition</h2>
        <div className="recognition__grid">
          {AWARDS.map((award) => (
            <div key={award} className="recognition__badge">
              <span className="recognition__badge-text">{award}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
