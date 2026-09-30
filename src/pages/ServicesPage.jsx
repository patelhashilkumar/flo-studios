import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const SERVICES = [
  {
    title: 'Brand',
    desc: 'We design brand systems that scale and flex across entire ecosystems.',
    cases: [
      { name: 'Procore', desc: 'Honoring the Past, Building the Future.', image: 'https://a-us.storyblok.com/f/1004432/1920x1080/6f0f8cbfe8/thumbnail-mobile-1920x1080.png/m/' },
      { name: 'ServiceNow', desc: 'Reimagining ServiceNow with a bold system.', image: 'https://a-us.storyblok.com/f/1004432/1024x1024/b956675169/alphasense_teaser_thumbnail.png/m/' },
    ],
  },
  {
    title: 'Marketing',
    desc: 'We create content, campaigns, and websites that drive connection and growth.',
    cases: [
      { name: 'Google Shopping', desc: 'The Holiday 100—Google\'s trend-inspired gift guide.', image: 'https://a-us.storyblok.com/f/1004432/2048x1365/81580be7a6/google_ho100_thumbnail.png/m/' },
      { name: 'Notion', desc: 'Introducing Notion to billions of new users.', image: 'https://a-us.storyblok.com/f/1004432/2560x1588/4d38378620/notion_thumbnail.png/m/' },
    ],
  },
  {
    title: 'Product',
    desc: 'We design digital products that define categories and transform businesses.',
    cases: [
      { name: 'Eventbrite', desc: 'Reimagining Eventbrite: A New Vision for Discovery.', image: 'https://a-us.storyblok.com/f/1004432/566x566/b1977a7872/eventbrite_thumb.png/m/' },
      { name: 'Oura', desc: 'Transforming the way people discover the Oura Smart Ring.', image: 'https://a-us.storyblok.com/f/1004432/2048x2048/485d9ae1f2/oura_homepage_slideshow.jpg/m/' },
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
      <section className="services-page__hero" ref={heroRef}>
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Services</span>
          </div>
          <h1 className="services-page__title">
            {'From rebrands to digital products to campaigns, we design how your brand shows up in the world.'.split(' ').map((w, i) => (
              <span key={i} className="services-page__hero-word">{w} </span>
            ))}
          </h1>
          <Link to="/contact" className="page-cta-btn">Get in touch →</Link>
        </div>
      </section>

      {/* Offerings */}
      <section className="services-page__offerings">
        <div className="container">
          <h2 className="services-page__section-title">Our Offerings</h2>
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
                      <img src={c.image} alt={c.name} loading="lazy" />
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
          <h3 className="services-page__clients-label">Select clients include:</h3>
          <p className="services-page__clients-list">{CLIENTS.join(', ')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="services-page__cta-section">
        <div className="container">
          <h2 className="services-page__cta-title">We'd love to work with you and your team.</h2>
          <Link to="/contact" className="page-cta-btn">Get in touch →</Link>
        </div>
      </section>
    </motion.main>
  )
}
