import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './NewsSection.css'

gsap.registerPlugin(ScrollTrigger)

const NEWS_ITEMS = [
  {
    type: 'press',
    title: 'Fast Company Innovation by Design Finalist',
    image: 'https://a-us.storyblok.com/f/1004432/1024x1024/0ab7345c9d/fastco_ibd_2026_experimental_design.png/m/',
    link: '#',
  },
  {
    type: 'press',
    title: 'Jack De Caluwé Appointed Chief Creative Officer',
    image: 'https://a-us.storyblok.com/f/1004432/1080x1080/80c987174f/instrument_cco_jackdecaluwe_littleblackbook_aug242026.png/m/',
    link: '#',
  },
  {
    type: 'article',
    readTime: '5 min',
    title: 'Building Without a Brief: Making with Pure Curiosity',
    image: 'https://a-us.storyblok.com/f/1004432/1080x1080/4951b14198/thumb_instrument_beyondthebrief.jpg/m/',
    link: '/latest',
  },
  {
    type: 'article',
    readTime: '3 min',
    title: 'Taste as a Competitive Advantage in Digital Design',
    image: 'https://a-us.storyblok.com/f/1004432/1080x1080/dbe87799c5/taste_thumb_instrument.png/m/',
    link: '/latest',
  },
]

export default function NewsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.news-section__header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(
        '.news-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="news-section" ref={sectionRef}>
      <div className="container">
        <div className="news-section__header">
          <div>
            <span className="news-section__label">EDITORIAL &amp; PERSPECTIVES</span>
            <h2 className="news-section__title">Latest Dispatches</h2>
          </div>
          <Link to="/latest" className="news-section__cta">
            All dispatches
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="news-section__grid">
          {NEWS_ITEMS.map((item, i) => (
            <Link
              to={item.link}
              className="news-card"
              key={i}
            >
              <div className="news-card__media">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="news-card__meta">
                <span className="news-card__type">{item.type}</span>
                {item.readTime && <span className="news-card__time">{item.readTime}</span>}
              </div>
              <h3 className="news-card__title">{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
