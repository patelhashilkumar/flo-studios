import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const ARTICLES = [
  { type: 'press', title: 'Instrument Playspace named a Fast Company Innovation by Design finalist.', image: 'https://a-us.storyblok.com/f/1004432/1024x1024/0ab7345c9d/fastco_ibd_2026_experimental_design.png/m/' },
  { type: 'press', title: 'Welcome back, Jack: Jack De Caluwé returns to Instrument as Chief Creative Officer.', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/80c987174f/instrument_cco_jackdecaluwe_littleblackbook_aug242026.png/m/' },
  { type: 'article', time: '5 min', title: 'Building Without a Brief: What do you make when curiosity is the only assignment?', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/4951b14198/thumb_instrument_beyondthebrief.jpg/m/' },
  { type: 'article', time: '3 min', title: 'Taste Is the New Competitive Advantage: Discernment becomes the greatest differentiator.', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/dbe87799c5/taste_thumb_instrument.png/m/' },
  { type: 'press', title: 'Digiday: How Instrument won Crocs business in a day.', image: 'https://a-us.storyblok.com/f/1004432/1080x1059/1ac7131b48/digiday_media_buying_briefing_instrument_crocs.jpg/m/' },
  { type: 'article', time: '5 min', title: 'Everyone Starts Somewhere: Building the next generation of designers.', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/182321901f/emerging-talent-square-thumbnail-teaser.png/m/' },
  { type: 'press', title: 'The Drum: We don\'t need an AI revolution. We need a creative one.', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/d5014e4bd6/instrument_thedrum_cannes_hottake_2026.png/m/' },
  { type: 'article', time: '5 min', title: 'The Next Challenge for AI is Trust: Everyday moments define the next phase.', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/11e2a67206/ai_adoption_challenge_teaser.png/m/' },
  { type: 'article', time: '5 min', title: 'The Agent Paradox: The smarter the tech gets, the more you become the bottleneck.', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/abfa3181da/ai-agent-paradox-teaser-thumbnail.png/m/' },
  { type: 'article', time: '5 min', title: 'Design to Code: How better collaboration builds better products.', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/7fecf913ae/thumb1.png/m/' },
  { type: 'article', time: '5 min', title: 'Modern Brands Should Feel Alive: Your Brand Isn\'t a File. It\'s a Dynamic System.', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/425625caa0/thumb_mordernbrands.png/m/' },
  { type: 'article', time: '5 min', title: '2025 Transparency Report: From Commitment to Renewal.', image: 'https://a-us.storyblok.com/f/1004432/1080x1080/94d63e40ef/2025treport_thumb.png/m/' },
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
      <section className="latest-page__hero">
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Latest</span>
          </div>
          <h1 className="latest-page__title">
            {'Breaking news, insights, and articles.'.split(' ').map((w, i) => (
              <span key={i} className="latest-page__hero-word">{w} </span>
            ))}
          </h1>
        </div>
      </section>

      <section className="latest-page__grid-section">
        <div className="container">
          <div className="latest-page__grid">
            {ARTICLES.map((item, i) => (
              <div className="latest-page__card" key={i}>
                <div className="latest-page__card-media">
                  <img src={item.image} alt={item.title} loading="lazy" />
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
