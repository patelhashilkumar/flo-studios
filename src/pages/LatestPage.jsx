import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import SEO from '../components/SEO'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const ARTICLES = [
  { type: 'press', title: 'Fast Company Innovation by Design Finalist', image: 'https://a-us.storyblok.com/f/1004432/1024x1024/0ab7345c9d/fastco_ibd_2026_experimental_design.png/m/' },
  { type: 'press', title: 'Jack De Caluwé Appointed Chief Creative Officer', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/80c987174f/instrument_cco_jackdecaluwe_littleblackbook_aug242026.png/m/' },
  { type: 'article', time: '5 min', title: 'Building Without a Brief: Making with Pure Curiosity', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/4951b14198/thumb_instrument_beyondthebrief.jpg/m/' },
  { type: 'article', time: '3 min', title: 'Taste as a Competitive Advantage in Digital Design', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/dbe87799c5/taste_thumb_instrument.png/m/' },
  { type: 'press', title: 'Digiday: Rapid Brand Launch Case Study', image: 'https://a-us.storyblok.com/f/1004432/2048x1365/a24fa06aee/medium-feature-uber.png/m/' },
  { type: 'article', time: '5 min', title: 'Mentorship and the Next Generation of Designers', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/182321901f/emerging-talent-square-thumbnail-teaser.png/m/' },
  { type: 'press', title: 'The Drum: Creative Direction Beyond Automation', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/d5014e4bd6/instrument_thedrum_cannes_hottake_2026.png/m/' },
  { type: 'article', time: '5 min', title: 'The Next Frontier for AI is Human Trust', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/11e2a67206/ai_adoption_challenge_teaser.png/m/' },
  { type: 'article', time: '5 min', title: 'The Agent Bottleneck in Modern Creative Workflows', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/abfa3181da/ai-agent-paradox-teaser-thumbnail.png/m/' },
  { type: 'article', time: '5 min', title: 'Design to Code: Engineering High-Fidelity Interfaces', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/7fecf913ae/thumb1.png/m/' },
  { type: 'article', time: '5 min', title: 'Dynamic Brand Systems Beyond Static Guidelines', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/425625caa0/thumb_mordernbrands.png/m/' },
  { type: 'article', time: '5 min', title: 'Annual Studio Impact & Operations Report', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/94d63e40ef/2025treport_thumb.png/m/' },
]

export default function LatestPage() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.latest-page__hero-word', { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo('.latest-page__card', { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'power3.out', delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <motion.main className="latest-page" variants={pageV} initial="initial" animate="animate" exit="exit" ref={heroRef}>
      <SEO
        title="Latest Dispatches & Insights — Flo Studios"
        description="Perspectives, design research, and studio dispatches from Flo Studios on creative technology, digital products, and motion systems."
        canonicalUrl="https://www.flostudio.co/latest"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Latest Dispatches', item: 'https://www.flostudio.co/latest', url: 'https://www.flostudio.co/latest' },
        ]}
      />

      <section className="latest-page__hero">
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Latest</span>
          </div>
          <h1 className="latest-page__title" aria-label="Flo Studios Latest Dispatches: Perspectives, research, and studio dispatches.">
            <span className="sr-only">Flo Studios Latest Dispatches — </span>
            {'Perspectives, research, and studio dispatches.'.split(' ').map((w, i) => (
              <span key={i} className="latest-page__hero-word">{w}</span>
            ))}
          </h1>
        </div>
      </section>

      <section className="latest-page__grid-section">
        <div className="container">
          <h2 className="sr-only">Articles & Studio Dispatches</h2>
          <div className="latest-page__grid">
            {(ARTICLES || []).map((item, i) => (
              <div className="latest-page__card" key={i}>
                <div className="latest-page__card-media">
                  <img src={item.image} alt={`${item.title} — Flo Studios dispatch`} loading="lazy" />
                </div>
                <div className="latest-page__card-meta">
                  <span className="latest-page__card-type">{item.type}</span>
                  {item.time && <span className="latest-page__card-time">{item.time}</span>}
                </div>
                <h3 className="latest-page__card-title">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  )
}
