import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { CASE_STUDIES } from '../data/caseStudiesData'
import './ProjectCaseStudy.css'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

function DynamicPalette({ palette }) {
  const ref = useRef(null)
  const [active, setActive] = useState(1)
  const [on, setOn] = useState(false)
  const [hold, setHold] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!on || hold || !palette || palette.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % palette.length)
    }, 2800)
    return () => clearInterval(t)
  }, [on, hold, palette])

  if (!palette || palette.length === 0) return null

  return (
    <ul
      className={`pcs__palette pcs__bleed ${on ? 'is-on' : ''}`}
      ref={ref}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      aria-label="Project color system"
    >
      {palette.map((c, i) => {
        const isHexLight =
          c.hex === '#FFFFFF' ||
          c.hex === '#FAFAFA' ||
          c.hex === '#F8FAFC' ||
          c.hex === '#F6F1EB' ||
          c.hex === '#F1F5F9' ||
          c.hex === '#D1FAE5' ||
          c.hex === '#EBE5DC' ||
          c.hex === '#D4D4D8' ||
          c.hex === '#A3E635'
        const inkColor = isHexLight ? '#0B0F19' : '#F8FAFC'

        return (
          <li
            key={c.hex + i}
            className={active === i ? 'is-active' : ''}
            style={{
              '--sw': c.hex,
              '--ink': inkColor,
              '--i': i,
            }}
            tabIndex={0}
            onMouseEnter={() => setActive(i)}
            onFocus={() => {
              setHold(true)
              setActive(i)
            }}
            onBlur={() => setHold(false)}
          >
            <span className="pcs__sw-no">0{i + 1}</span>
            <b>{c.name}</b>
            <span key={active === i ? 'on' : 'off'} className="pcs__sw-hex">
              {c.hex}
            </span>
            <em>{c.role}</em>
          </li>
        )
      })}
    </ul>
  )
}

export default function ProjectCaseStudy() {
  const { slug } = useParams()
  const rootRef = useRef(null)
  const videoRef = useRef(null)

  const project = CASE_STUDIES[slug]

  useEffect(() => {
    if (!project) return
    const root = rootRef.current
    if (!root) return

    document.body.classList.add('pcs-page')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          io.unobserve(e.target)
          e.target.classList.add('is-in')
        })
      },
      { threshold: 0.12 }
    )

    root.querySelectorAll('.pcs__reveal').forEach((el) => io.observe(el))

    // Theme scroll tracker
    const sections = [...root.querySelectorAll('section[data-theme]')]
    const onScroll = () => {
      const trigger = window.innerHeight * 0.75
      let theme = 'dark'
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top <= trigger) {
          theme = s.dataset.theme
        }
      })
      root.dataset.theme = theme
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      document.body.classList.remove('pcs-page')
    }
  }, [project, slug])

  // Optimize video performance: pause when offscreen or tab hidden
  useEffect(() => {
    if (!project) return
    const video = videoRef.current
    if (!video) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.08 }
    )

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause()
      } else if (video.getBoundingClientRect().bottom > 0) {
        video.play().catch(() => {})
      }
    }

    io.observe(video)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [project])

  if (!project) {
    return <Navigate to="/work" replace />
  }

  const isMultiItemShowcase = project.showcase?.items && project.showcase.items.length >= 3

  return (
    <motion.main
      className="pcs"
      ref={rootRef}
      variants={pageV}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        '--pcs-bg': project.bgColor || '#09090B',
        '--pcs-ink': project.inkColor || '#FAFAFA',
        '--pcs-accent': project.accentColor || '#3B82F6',
      }}
    >
      <SEO
        title={`${project.title} | Case Study | Flo Studios`}
        description={project.leadQuote || project.leadText}
        canonicalUrl={`https://www.flostudio.co/work/${project.slug}`}
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Work', item: 'https://www.flostudio.co/work', url: 'https://www.flostudio.co/work' },
          { name: project.title, item: `https://www.flostudio.co/work/${project.slug}`, url: `https://www.flostudio.co/work/${project.slug}` },
        ]}
        schema={[
          {
            '@type': 'CreativeWork',
            '@id': `https://www.flostudio.co/work/${project.slug}#case-study`,
            headline: `${project.title} - ${project.category} Case Study`,
            name: project.title,
            description: project.leadQuote || project.leadText,
            genre: project.category,
            creator: {
              '@type': 'Organization',
              name: 'Flo Studios',
              url: 'https://www.flostudio.co/',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Flo Studios',
              url: 'https://www.flostudio.co/',
            },
          },
        ]}
      />

      {/* 1. Intro Screen with Curtain Lift */}
      <section className="pcs__intro" data-theme="dark" aria-label={project.title}>
        <span className="pcs__curtain" aria-hidden="true" />
        <div className="pcs__intro-content">
          <span className="pcs__tagline-overline">Flo Studios Case Study</span>
          <h1 className="pcs__intro-title">{project.introMarkText || project.title}</h1>
          <p className="pcs__intro-lead">{project.leadQuote}</p>
        </div>
        <p className="pcs__scroll" aria-hidden="true">
          <span>Explore Case</span>
          <i />
        </p>
      </section>

      {/* 2. Full-bleed Hero Visual / Video */}
      <section className="pcs__hero" data-theme="dark">
        <div className="container">
          <figure className="pcs__frame pcs__bleed pcs__hero-media pcs__reveal">
            {project.heroMedia.type === 'video' ? (
              <div className="pcs__video-wrap">
                <video
                  ref={videoRef}
                  className="pcs__hero-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={project.heroMedia.poster}
                  preload="metadata"
                >
                  {project.heroMedia.webm && <source src={project.heroMedia.webm} type="video/webm" />}
                  <source src={project.heroMedia.mp4} type="video/mp4" />
                </video>
              </div>
            ) : (
              <img
                src={project.heroMedia.src}
                alt={project.heroMedia.alt || project.title}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            )}
          </figure>

          {/* Project Metadata Ribbon */}
          <div className="pcs__meta-grid pcs__reveal">
            <div className="pcs__meta-col">
              <span className="pcs__meta-label">Client</span>
              <strong className="pcs__meta-val">{project.client}</strong>
            </div>
            <div className="pcs__meta-col">
              <span className="pcs__meta-label">Discipline</span>
              <strong className="pcs__meta-val">{project.discipline}</strong>
            </div>
            <div className="pcs__meta-col">
              <span className="pcs__meta-label">Year</span>
              <strong className="pcs__meta-val">{project.year}</strong>
            </div>
            <div className="pcs__meta-col pcs__meta-col--cta">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pcs__live-btn"
                  aria-label={`Open ${project.title} live experience`}
                >
                  {project.liveLabel || 'Launch Project'}
                  <span className="pcs__live-btn-arr">↗</span>
                </a>
              )}
            </div>
          </div>

          <p className="pcs__lead-body pcs__reveal">{project.leadText}</p>
        </div>
      </section>

      {/* 3. The Challenge Narrative */}
      <section className="pcs__chapters" data-theme="dark">
        <div className="container">
          <div className="pcs__center pcs__reveal">
            <p className="pcs__label">The Challenge</p>
            <h2 className="pcs__big pcs__big--center">{project.challenge.statement}</h2>
          </div>
          <p className="pcs__text pcs__text--right pcs__reveal">{project.challenge.body}</p>
        </div>
      </section>

      {/* 4. Visual Showcase Mosaic */}
      <section className="pcs__mosaic-sec" data-theme="dark">
        <div className="container">
          {isMultiItemShowcase ? (
            <div className="pcs__mosaic pcs__bleed pcs__reveal">
              {project.showcase.items.map((item, idx) => (
                <figure key={item.src + idx} className={`pcs__frame pcs__m${idx + 1}`}>
                  <img src={item.src} alt={item.alt || ''} loading="lazy" decoding="async" />
                  {item.caption && <figcaption className="pcs__item-caption">{item.caption}</figcaption>}
                </figure>
              ))}
            </div>
          ) : (
            <div className="pcs__single-showcase pcs__reveal">
              <figure className="pcs__frame pcs__bleed">
                <img
                  src={project.showcase.items[0]?.src || project.heroMedia.src}
                  alt={project.showcase.items[0]?.alt || project.title}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              {project.showcase.caption && (
                <p className="pcs__text pcs__text--center pcs__reveal" style={{ marginTop: '2rem' }}>
                  {project.showcase.caption}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 5. The System & Color Palette */}
      <section className="pcs__system" data-theme="dark">
        <div className="container">
          <div className="pcs__center pcs__reveal">
            <p className="pcs__label">The System &amp; Architecture</p>
            <h2 className="pcs__big pcs__big--center">{project.system.statement}</h2>
          </div>

          {/* Palette Swatches */}
          <div className="pcs__id pcs__reveal">
            <p className="pcs__label">Color Palette &amp; Material Spectrum</p>
            <DynamicPalette palette={project.palette} />
          </div>

          {/* System Feature Matrix */}
          <div className="pcs__id pcs__reveal">
            <p className="pcs__label">Architecture &amp; Core Mechanics</p>
            <div className="pcs__features-grid">
              {project.system.features.map((feat, i) => (
                <div key={feat.title} className="pcs__feat-card pcs__reveal" style={{ '--d': `${i * 90}ms` }}>
                  <div className="pcs__feat-top">
                    <span className="pcs__feat-no">0{i + 1}</span>
                    <h3 className="pcs__feat-title">{feat.title}</h3>
                  </div>
                  <p className="pcs__feat-desc">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Principles / Strategic Voice */}
      {project.principles && project.principles.length > 0 && (
        <section className="pcs__voice" data-theme="dark">
          <div className="container">
            <p className="pcs__label pcs__reveal">Core Tenets</p>
            <ul className="pcs__lines">
              {project.principles.map((p, i) => (
                <li key={p} className="pcs__reveal" style={{ '--d': `${i * 60}ms` }}>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 7. Studio Quote Callout */}
      <section className="pcs__quote" data-theme="dark">
        <div className="container">
          <blockquote className="pcs__q">&ldquo;{project.quote}&rdquo;</blockquote>
          <div className="pcs__quote-cta">
            <Link to="/contact" className="pcs__btn">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Our Role / Deliverables Checklist */}
      <section className="pcs__role" data-theme="dark">
        <div className="container pcs__role-grid">
          <h2 className="pcs__role-title pcs__reveal">Our role</h2>
          <div className="pcs__role-list pcs__reveal">
            {project.deliverables.map((r, i) => (
              <div key={r.group} className="pcs__role-row" style={{ '--d': `${i * 80}ms` }}>
                <h3>{r.group}</h3>
                <ul>
                  {r.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="pcs__cta">
              <Link to="/work" className="pcs__back">
                ← All work
              </Link>
              {project.nextSlug && (
                <Link to={`/work/${project.nextSlug}`} className="pcs__next-btn">
                  Next Project <span>→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
