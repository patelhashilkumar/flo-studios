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
    desc: 'We start with what earns trust and commands attention, then engineer the visual and technical medium around it.',
    tags: ['Attention Architecture', 'Content Direction', 'UX Strategy'],
  },
  {
    id: 'stage-aware-thinking',
    num: '02',
    title: 'STAGE-AWARE THINKING',
    desc: 'No off-the-shelf formulas. Every strategic decision is calibrated to where you stand today and where you scale tomorrow.',
    tags: ['Custom Roadmaps', 'Scale Calibration', 'Growth Architecture'],
  },
  {
    id: 'cross-disciplinary-execution',
    num: '03',
    title: 'CROSS-DISCIPLINARY EXECUTION',
    desc: 'Directors who code and engineers with taste. One unified team across design and infrastructure, eliminating handoff friction.',
    tags: ['Unified Team', 'Zero-Silo Workflow', 'Rapid Deployment'],
  },
  {
    id: 'ownership-through-completion',
    num: '04',
    title: 'OWNERSHIP THROUGH COMPLETION',
    desc: 'We stay through deployment and live release, continuously testing, refining, and tuning real-world performance.',
    tags: ['Production Rigor', 'Live Optimization', 'End-to-End Delivery'],
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
            BUILT ON CRAFT, TECHNICAL RIGOR, AND END-TO-END OWNERSHIP.
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
                    {Array.isArray(item.tags) && item.tags.length > 0 && (
                      <div className="capabilities-item__tags">
                        {(item.tags || []).map((tag) => (
                          <span key={tag} className="capabilities-item__tag">{tag}</span>
                        ))}
                      </div>
                    )}
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
