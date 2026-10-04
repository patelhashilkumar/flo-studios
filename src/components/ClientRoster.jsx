import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ClientRoster.css'

gsap.registerPlugin(ScrollTrigger)

const CLIENTS = [
  'Nike', 'Google', 'Oura', 'ServiceNow', 'EA', 'Netflix',
  'Spotify', 'Pinterest', 'Microsoft', 'Patagonia', 'Uber', 'Marriott',
  'Instagram', 'Sephora', 'Sonos', 'PayPal', "Levi's", 'NBA',
  'Nordstrom', 'Stripe', 'Salesforce', 'Samsung',
]

export default function ClientRoster() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.client-roster__label',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(
        '.client-roster__item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="client-roster" ref={sectionRef}>
      <div className="container">
        <h2 className="client-roster__label">Selected Clients</h2>
        <div className="client-roster__list">
          {CLIENTS.map((client) => (
            <span key={client} className="client-roster__item">{client}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
