import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CapabilitiesSection.css'

gsap.registerPlugin(ScrollTrigger)

const CAPABILITY_ITEMS = [
  {
    id: 'narrative-instinct',
    num: '01',
    title: 'NARRATIVE INSTINCT',
    desc: "Every piece of content, every product, every user interaction lives or dies by whether it holds attention and earns trust. Our team doesn't start with execution — we start with instinct for what actually resonates, then build backward from there. It's the same instinct whether we're scripting a video or designing a product flow.",
  },
  {
    id: 'stage-aware-thinking',
    num: '02',
    title: 'STAGE-AWARE THINKING',
    desc: "A 5K-subscriber creator and a 500K-subscriber creator need different strategies. A pre-funded founder and a funded one need different priorities. Nothing we do is templated — every decision starts with understanding exactly where you are right now, not where a generic playbook assumes you are.",
  },
  {
    id: 'cross-disciplinary-execution',
    num: '03',
    title: 'CROSS-DISCIPLINARY EXECUTION',
    desc: 'Strategists, writers, designers, developers, editors, and technical architects — working from the same brief, not handed off between silos. When the same team understands both the creative and technical sides of a problem, nothing gets lost in translation.',
  },
  {
    id: 'ownership-through-completion',
    num: '04',
    title: 'OWNERSHIP THROUGH COMPLETION',
    desc: "We don't disappear after the deliverable ships. Whether it's a piece of content going live or a product hitting the market, our team stays close enough to see how it actually performs — and adjusts from there.",
  },
]

export default function CapabilitiesSection() {
  const [openIndex, setOpenIndex] = useState(0) // Default first item open
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const listRef = useRef(null)

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      )

      gsap.fromTo(
        '.capabilities-item',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="capabilities-section" id="capabilities" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="capabilities-header" ref={headerRef}>
          <span className="capabilities-label">OUR EDGE</span>
          <h2 className="capabilities-title">
            WE CREATE POWERFUL BRANDS, SEAMLESS DIGITAL EXPERIENCES, AND RESPONSIVE, DEVICE-READY WEBSITES.
          </h2>
        </div>

        {/* Accordion List */}
        <div className="capabilities-accordion" ref={listRef} role="region" aria-label="Capabilities Accordion">
          {CAPABILITY_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={item.id}
                className={`capabilities-item ${isOpen ? 'capabilities-item--open' : ''}`}
              >
                <button
                  type="button"
                  className="capabilities-item__trigger"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`capability-panel-${item.id}`}
                  id={`capability-header-${item.id}`}
                >
                  <div className="capabilities-item__left">
                    <span className="capabilities-item__num">{item.num}</span>
                    <span className="capabilities-item__name">{item.title}</span>
                  </div>

                  <span className="capabilities-item__icon-wrap" aria-hidden="true">
                    <span className={`capabilities-item__icon ${isOpen ? 'capabilities-item__icon--close' : ''}`}>
                      {isOpen ? '✕' : '+'}
                    </span>
                  </span>
                </button>

                <div
                  id={`capability-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`capability-header-${item.id}`}
                  className="capabilities-item__panel"
                  style={{
                    maxHeight: isOpen ? '280px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="capabilities-item__content">
                    <p className="capabilities-item__text">{item.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
