import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getAllBlogs } from '../data/blogsData'
import BlogCardArt from './BlogCardArt'
import './NewsSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function NewsSection() {
  const sectionRef = useRef(null)
  const allBlogs = getAllBlogs()
  const featuredBlogs = allBlogs.slice(0, 4)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.news-section__header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo(
        '.news-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
      gsap.fromTo(
        '.news-section__footer',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="news-section" ref={sectionRef}>
      <div className="container">
        <div className="news-section__header">
          <div>
            <h2 className="news-section__title">Latest Dispatches</h2>
          </div>
          <Link
            to="/latest"
            className="news-section__cta"
            aria-label="View all Flo Studios dispatches and essays"
          >
            All dispatches
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="news-section__grid">
          {featuredBlogs.map((item) => (
            <Link
              to={`/latest/${item.slug}`}
              className="news-card"
              key={item.id || item.slug}
            >
              <div className="news-card__media">
                <div className="news-card__tile">
                  <BlogCardArt slug={item.slug} light />
                </div>
              </div>
              <div className="news-card__meta">
                <span className="news-card__type">{item.type}</span>
                {item.readTime && (
                  <span className="news-card__time">{item.readTime}</span>
                )}
              </div>
              <h3 className="news-card__title">{item.cardTitle || item.displayTitle || item.title}</h3>
            </Link>
          ))}
        </div>

        <div className="news-section__footer">
          <Link
            to="/latest"
            className="news-section__view-more"
            aria-label="View more Flo Studios dispatches"
          >
            View More Dispatches
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
