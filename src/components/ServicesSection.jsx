import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ServicesSection.css'

gsap.registerPlugin(ScrollTrigger)

const CAROUSEL_IMAGES = [
  'https://a-us.storyblok.com/f/1004432/2048x2048/485d9ae1f2/oura_homepage_slideshow.jpg/m/',
  'https://a-us.storyblok.com/f/1004432/1816x1816/43774ed1be/notion_carousel.png/m/',
  'https://a-us.storyblok.com/f/1004432/2048x2048/6f9fad5a18/eames_carousel.png/m/',
  'https://a-us.storyblok.com/f/1004432/1816x1816/21bf56a7b4/dropnow.png/m/',
  'https://a-us.storyblok.com/f/1004432/1816x1816/813fe651cc/nike_carousel.png/m/',
  'https://a-us.storyblok.com/f/1004432/2048x2048/dc9c30f062/pagerduty_homepage_slideshow.png/m/',
]

const CAROUSEL_CAPTIONS = [
  'Flo Studios digital experience for ŌURA',
  'Flo Studios product storytelling for Notion',
  'Flo Studios brand design and spatial showcase',
  'Flo Studios digital commerce platform and creative direction',
  'Flo Studios dynamic visual system for Nike',
  'Flo Studios enterprise digital product design for PagerDuty',
]

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-section__text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
      gsap.fromTo(
        '.services-section__visual',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="container">
        <h2 className="services-section__label">Services</h2>
        <div className="services-section__content">
          <div className="services-section__text">
            <h3 className="services-section__heading">
              We shape brands, digital products, and cinematic motion.
            </h3>
            <p className="services-section__desc">
              From initial direction to final build, executed by one unified team.
            </p>
            <Link to="/services" className="services-section__cta" aria-label="Explore Flo Studios services and capabilities">
              Explore services
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div className="services-section__visual">
            <div className="services-section__carousel">
              {CAROUSEL_IMAGES.map((src, i) => (
                <div
                  key={i}
                  className={`services-section__slide ${i === currentSlide ? 'services-section__slide--active' : ''}`}
                >
                  <img src={src} alt={CAROUSEL_CAPTIONS[i] || `Flo Studios showcase ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
            <div className="services-section__dots">
              {CAROUSEL_IMAGES.map((_, i) => (
                <button
                  key={i}
                  className={`services-section__dot ${i === currentSlide ? 'services-section__dot--active' : ''}`}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
