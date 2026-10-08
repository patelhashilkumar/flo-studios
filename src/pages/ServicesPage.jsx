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

const SERVICES = [
  {
    title: 'Brand Systems',
    desc: 'Identity systems and guidelines engineered to scale across physical and digital surfaces.',
    cases: [
      { name: 'Procore', desc: 'Brand evolution and design language.', image: 'https://a-us.storyblok.com/f/1004432/1920x1080/6f0f8cbfe8/thumbnail-mobile-1920x1080.png/m/' },
      { name: 'ServiceNow', desc: 'Enterprise design system and motion kit.', image: 'https://a-us.storyblok.com/f/1004432/1024x1024/b956675169/alphasense_teaser_thumbnail.png/m/' },
    ],
  },
  {
    title: 'Motion & Campaigns',
    desc: 'Cinematic 3D animation, product films, and motion graphics that command global attention.',
    cases: [
      { name: 'Google Shopping', desc: 'Holiday gift guide and dynamic visual direction.', image: 'https://a-us.storyblok.com/f/1004432/2048x1365/81580be7a6/google_ho100_thumbnail.png/m/' },
      { name: 'Notion', desc: 'Global launch films and product storytelling.', image: 'https://a-us.storyblok.com/f/1004432/2560x1588/4d38378620/notion_thumbnail.png/m/' },
    ],
  },
  {
    title: 'Digital Products',
    desc: 'High-performance web applications, 3D interfaces, and fluid digital experiences.',
    cases: [
      { name: 'Eventbrite', desc: 'Discovery architecture and event experience.', image: 'https://a-us.storyblok.com/f/1004432/566x566/b1977a7872/eventbrite_thumb.png/m/' },
      { name: 'Oura', desc: 'Flagship digital experience and health data narrative.', image: 'https://a-us.storyblok.com/f/1004432/2048x2048/485d9ae1f2/oura_homepage_slideshow.jpg/m/' },
    ],
  },
]

const CLIENTS = ['Nike', 'Google', 'Oura', 'ServiceNow', 'EA', 'Netflix', 'Spotify', 'Pinterest', 'Microsoft', 'Patagonia', 'Uber', 'Marriott', 'Instagram', 'Sephora', 'Sonos', 'PayPal', "Levi's", 'NBA', 'Nordstrom', 'Stripe', 'Salesforce', 'Samsung']

export default function ServicesPage() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-page__hero-word', { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: 'power3.out', delay: 0.2 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <motion.main className="services-page" variants={pageV} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Services & Capabilities — Flo Studios"
        description="Explore Flo Studios services across Brand Systems, Motion & 3D Campaigns, and Digital Products & Engineering. Building scalable digital experiences for visionary brands."
        canonicalUrl="https://www.flostudio.co/services"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/' },
          { name: 'Services', item: 'https://www.flostudio.co/services' },
        ]}
      />

      <section className="services-page__hero" ref={heroRef}>
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Services</span>
          </div>
          <h1 className="services-page__title" aria-label="Flo Studios Services & Capabilities: We design how visionary brands move, interact, and perform.">
            <span className="sr-only">Flo Studios Services & Capabilities — </span>
            {'We design how visionary brands move, interact, and perform.'.split(' ').map((w, i) => (
              <span key={i} className="services-page__hero-word">{w}</span>
            ))}
          </h1>
          <Link to="/contact" className="page-cta-btn">Start a project →</Link>
        </div>
      </section>

      {/* Offerings */}
      <section className="services-page__offerings">
        <div className="container">
          <h2 className="services-page__section-title">Capabilities</h2>
          {SERVICES.map((service) => (
            <div className="services-page__offering" key={service.title}>
              <div className="services-page__offering-header">
                <h3 className="services-page__offering-title">{service.title}</h3>
                <p className="services-page__offering-desc">{service.desc}</p>
              </div>
              <div className="services-page__offering-cases">
                {service.cases.map((c) => (
                  <div className="services-page__case" key={c.name}>
                    <div className="services-page__case-img">
                      <img src={c.image} alt={`${c.name} — ${c.desc} by Flo Studios`} loading="lazy" />
                    </div>
                    <h4 className="services-page__case-name">{c.name}</h4>
                    <p className="services-page__case-desc">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clients */}
      <section className="services-page__clients">
        <div className="container">
          <h2 className="services-page__clients-label">Selected Clients</h2>
          <p className="services-page__clients-list">{CLIENTS.join(', ')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="services-page__cta-section">
        <div className="container">
          <h2 className="services-page__cta-title">Start a project with our studio.</h2>
          <Link to="/contact" className="page-cta-btn">Get in touch →</Link>
        </div>
      </section>
    </motion.main>
  )
}
