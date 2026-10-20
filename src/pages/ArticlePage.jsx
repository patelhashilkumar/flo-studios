import { useMemo, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import SEO from '../components/SEO'
import { getBlogBySlug, getRelatedBlogs, getAllBlogs } from '../data/blogsData'
import './ArticlePage.css'

const pageV = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

export default function ArticlePage() {
  const { slug } = useParams()
  const post = useMemo(() => getBlogBySlug(slug), [slug])
  const related = useMemo(() => {
    const list = getRelatedBlogs(slug, 3)
    if (list.length >= 3) return list
    // Fallback if not enough blogs yet: show other known items
    const all = getAllBlogs()
    return all.filter((b) => b.slug !== slug).slice(0, 3)
  }, [slug])

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  // Ensure scroll is restored to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return <Navigate to="/latest" replace />
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: '2026-10-15T00:00:00Z',
    author: {
      '@type': 'Organization',
      name: 'Flo Studios',
      url: 'https://www.flostudio.co',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Flo Studios',
      url: 'https://www.flostudio.co',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.flostudio.co/latest/${post.slug}`,
    },
  }

  return (
    <motion.main
      className="article-page"
      variants={pageV}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <SEO
        title={`${post.title} — Flo Studios`}
        description={post.excerpt}
        canonicalUrl={`https://www.flostudio.co/latest/${post.slug}`}
        ogImage={post.coverImage}
        structuredData={articleSchema}
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Latest', item: 'https://www.flostudio.co/latest', url: 'https://www.flostudio.co/latest' },
          { name: post.displayTitle || post.title, item: `https://www.flostudio.co/latest/${post.slug}`, url: `https://www.flostudio.co/latest/${post.slug}` },
        ]}
      />

      {/* Reading Progress Indicator */}
      <motion.div className="article-progress-bar" style={{ scaleX }} />

      <article className="article-page__container">
        {/* Breadcrumb Navigation */}
        <nav className="article-page__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="article-page__breadcrumb-separator">/</span>
          <Link to="/latest">Latest</Link>
          <span className="article-page__breadcrumb-separator">/</span>
          <span className="article-page__breadcrumb-current" aria-current="page">
            {post.displayTitle || post.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="article-page__header">
          {post.category && (
            <span className="article-page__category-badge">{post.category}</span>
          )}

          <h1 className="article-page__title">
            {post.titleLead ? (
              <>
                {post.titleLead} <em>{post.titleHighlight}</em>
              </>
            ) : (
              post.title
            )}
          </h1>

          {post.subtitle && (
            <p className="article-page__subtitle">{post.subtitle}</p>
          )}

          {/* Metadata Row */}
          <div className="article-page__meta">
            <span className="article-page__meta-author">Written by {post.author}</span>
            <span className="article-page__meta-divider" />
            <span className="article-page__meta-item">{post.readTime}</span>
            {post.publishedDate && (
              <>
                <span className="article-page__meta-divider" />
                <span className="article-page__meta-item">{post.publishedDate}</span>
              </>
            )}
          </div>
        </header>

        {/* Hero Cover Media */}
        {post.heroImage && (
          <div className="article-page__hero-media">
            <img
              src={post.heroImage}
              alt={post.title}
              loading="eager"
            />
          </div>
        )}

        {/* Editorial Body Content */}
        <div className="article-page__reading-container">
          <div className="article-page__body">
            {post.content.map((block, idx) => {
              if (block.type === 'intro') {
                return (
                  <section key={idx} className="article-page__intro-block">
                    {block.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className={`article-page__paragraph ${
                          pIdx === 0 ? 'article-page__intro-lead' : ''
                        }`}
                      >
                        {p}
                      </p>
                    ))}
                  </section>
                )
              }

              if (block.type === 'section') {
                return (
                  <section key={idx} className="article-page__content-section">
                    {block.heading && (
                      <h2 className="article-page__section-heading">
                        {block.heading}
                      </h2>
                    )}

                    {block.paragraphs &&
                      block.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="article-page__paragraph">
                          {p}
                        </p>
                      ))}

                    {/* Pull Quote */}
                    {block.pullQuote && (
                      <aside className="article-page__pullquote">
                        <blockquote>{block.pullQuote}</blockquote>
                      </aside>
                    )}

                    {/* Stage breakdown cards */}
                    {block.stages && (
                      <div className="article-page__stages-grid">
                        {block.stages.map((stage, sIdx) => (
                          <div key={sIdx} className="article-page__stage-card">
                            <div className="article-page__stage-header">
                              <span className="article-page__stage-num">
                                0{sIdx + 1}
                              </span>
                              <h3 className="article-page__stage-title">
                                {stage.name}
                              </h3>
                            </div>
                            <p className="article-page__stage-desc">
                              {stage.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {block.closingParagraph && (
                      <p className="article-page__paragraph">
                        {block.closingParagraph}
                      </p>
                    )}
                  </section>
                )
              }

              return null
            })}
          </div>

          {/* Studio Callout CTA Box */}
          <div className="article-page__cta-box">
            <span className="article-page__cta-eyebrow">Flo Studios Partnership</span>
            <h3 className="article-page__cta-title">Want to build something that lasts?</h3>
            <p className="article-page__cta-desc">
              We own the full product and media lifecycle under one roof. No broken handoffs. No diluted intent.
            </p>
            <Link to="/contact" className="article-page__cta-button">
              Start a Conversation →
            </Link>
          </div>
        </div>

        {/* Related Dispatches */}
        {related.length > 0 && (
          <section className="article-page__related">
            <div className="article-page__related-header">
              <h2 className="article-page__related-title">Related Dispatches</h2>
              <Link to="/latest" className="article-page__related-all-link">
                View all articles →
              </Link>
            </div>
            <div className="article-page__related-grid">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/latest/${item.slug}`}
                  className="article-page__related-card"
                >
                  <div className="article-page__related-card-media">
                    <img src={item.coverImage} alt={item.title} loading="lazy" />
                  </div>
                  <div className="article-page__related-card-meta">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h3 className="article-page__related-card-title">{item.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </motion.main>
  )
}
