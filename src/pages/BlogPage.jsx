import { useState } from 'react';
import { Link } from 'react-router-dom';
import './EditorialPage.css';

/* ─── Blog Post Data ─── */
const blogPosts = [
  {
    id: 1,
    title: "The Future\nof AI-Driven\nDesign",
    category: "AI & Design",
    author: "Flo Studios",
    date: "Aug 28, 2025",
    readTime: "8 min read",
    location: "Remote",
    excerpt: "How artificial intelligence is reshaping the creative process — from generative layouts to adaptive user experiences that learn from behavior.",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    thumbGradient: "linear-gradient(135deg, #1a1a2e, #0f3460)",
  },
  {
    id: 2,
    title: "Minimal\nInterfaces,\nMaximal Impact",
    category: "Web Design",
    author: "Flo Studios",
    date: "Jul 15, 2025",
    readTime: "6 min read",
    location: "Berlin",
    excerpt: "Why the most effective digital experiences strip away everything unnecessary — and how constraint breeds the most inventive solutions.",
    gradient: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #0d0d0d 100%)",
    thumbGradient: "linear-gradient(135deg, #2d2d2d, #0d0d0d)",
  },
  {
    id: 3,
    title: "Scaling\nCreator\nBrands",
    category: "Creator Growth",
    author: "Flo Studios",
    date: "Jun 02, 2025",
    readTime: "10 min read",
    location: "Los Angeles",
    excerpt: "The playbook for turning a personal brand into a scalable media company — content systems, team structure, and monetization frameworks.",
    gradient: "linear-gradient(135deg, #2c1810 0%, #3d1f10 50%, #1a0f08 100%)",
    thumbGradient: "linear-gradient(135deg, #3d1f10, #1a0f08)",
  },
  {
    id: 4,
    title: "Motion\nDesign in\nProduct",
    category: "Video Production",
    author: "Flo Studios",
    date: "May 18, 2025",
    readTime: "7 min read",
    location: "New York",
    excerpt: "Purposeful animation isn't decoration. It's information architecture in motion — guiding attention, communicating state, and building delight.",
    gradient: "linear-gradient(135deg, #1a2a1a 0%, #0d1f0d 50%, #0a170a 100%)",
    thumbGradient: "linear-gradient(135deg, #1a2a1a, #0a170a)",
  },
  {
    id: 5,
    title: "Building\nDesign\nSystems",
    category: "Web Design",
    author: "Flo Studios",
    date: "Apr 30, 2025",
    readTime: "12 min read",
    location: "London",
    excerpt: "A design system isn't a component library. It's a shared language — tokens, patterns, and principles that let teams move fast without breaking coherence.",
    gradient: "linear-gradient(135deg, #1f1a2e 0%, #2a1f3e 50%, #150f28 100%)",
    thumbGradient: "linear-gradient(135deg, #2a1f3e, #150f28)",
  },
  {
    id: 6,
    title: "The Art\nof Script\nWriting",
    category: "Creator Growth",
    author: "Flo Studios",
    date: "Apr 05, 2025",
    readTime: "9 min read",
    location: "Remote",
    excerpt: "Every great video starts with a great script. Structure, pacing, and the invisible art of holding attention in the first three seconds.",
    gradient: "linear-gradient(135deg, #2e2e1a 0%, #3e3e16 50%, #1a1a0d 100%)",
    thumbGradient: "linear-gradient(135deg, #2e2e1a, #1a1a0d)",
  },
  {
    id: 7,
    title: "Full-Stack\nArchitecture\nPatterns",
    category: "AI Development",
    author: "Flo Studios",
    date: "Mar 12, 2025",
    readTime: "15 min read",
    location: "San Francisco",
    excerpt: "Modern full-stack architecture for AI-integrated applications — from edge functions and streaming to real-time inference pipelines.",
    gradient: "linear-gradient(135deg, #0d1a2e 0%, #0a1628 50%, #061020 100%)",
    thumbGradient: "linear-gradient(135deg, #0d1a2e, #061020)",
  },
  {
    id: 8,
    title: "Color\nTheory\nfor Web",
    category: "Web Design",
    author: "Flo Studios",
    date: "Feb 20, 2025",
    readTime: "5 min read",
    location: "Tokyo",
    excerpt: "Color isn't subjective in interface design. It's systematic — accessibility ratios, semantic meaning, and the math behind harmonious palettes.",
    gradient: "linear-gradient(135deg, #2e1a1a 0%, #3e1616 50%, #280d0d 100%)",
    thumbGradient: "linear-gradient(135deg, #2e1a1a, #280d0d)",
  },
  {
    id: 9,
    title: "Mobile-First\nProduct\nThinking",
    category: "App Development",
    author: "Flo Studios",
    date: "Jan 08, 2025",
    readTime: "11 min read",
    location: "Seoul",
    excerpt: "Mobile-first isn't about screen size. It's about designing for constraint, focus, and the moments when people need your product most.",
    gradient: "linear-gradient(135deg, #1a2e2e 0%, #0d2020 50%, #0a1818 100%)",
    thumbGradient: "linear-gradient(135deg, #1a2e2e, #0a1818)",
  },
];

/* ═══════════════════════════════════════════════════════
   Blog Page Component
   ═══════════════════════════════════════════════════════ */
export default function BlogPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePost = blogPosts[activeIndex];

  const progressWidth = ((activeIndex + 1) / blogPosts.length) * 100;

  return (
    <div className="editorial-page">
      {/* ── Navigation ── */}
      <nav className="editorial-nav">
        <Link to="/" className="editorial-nav__back">
          ← Back
        </Link>
        <Link to="/" className="editorial-nav__logo">
          Flo Studios
        </Link>
        <button className="editorial-nav__menu">
          Menu
          <span className="editorial-nav__menu-icon">
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>

      {/* ── Hero Section ── */}
      <section className="editorial-hero">
        {/* Background */}
        <div
          className="editorial-hero__bg"
          style={{ background: activePost.gradient }}
        />

        {/* Decorative silhouette */}
        <div className="editorial-hero__silhouette editorial-hero__silhouette--blog" />

        {/* Title */}
        <div className="editorial-hero__content">
          <h1 className="editorial-title">
            {activePost.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < activePost.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>

        {/* Metadata */}
        <div className="editorial-meta">
          <span className="editorial-meta__item">By {activePost.author}</span>
          <span className="editorial-meta__divider" />
          <span className="editorial-meta__item">{activePost.date}</span>
          <span className="editorial-meta__divider" />
          <span className="editorial-meta__item">{activePost.readTime}</span>
          <span className="editorial-meta__divider" />
          <span className="editorial-meta__item">{activePost.location}</span>
        </div>

        {/* Image Strip */}
        <div className="editorial-strip">
          {blogPosts.map((post, i) => (
            <button
              key={post.id}
              className={`editorial-strip__item ${
                i === activeIndex ? 'editorial-strip__item--active' : ''
              }`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View post: ${post.title.replace(/\n/g, ' ')}`}
            >
              <div
                className="editorial-strip__placeholder"
                style={{ background: post.thumbGradient }}
              >
                <span className="editorial-strip__placeholder-label">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Pagination */}
        <div className="editorial-pagination">
          <span className="editorial-pagination__current">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <div className="editorial-pagination__bar">
            <div
              className="editorial-pagination__fill"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          <span className="editorial-pagination__total">
            {String(blogPosts.length).padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* ── Below-Fold: All Articles ── */}
      <section className="editorial-below">
        <div className="editorial-below__inner">
          <div className="editorial-below__header">
            <h2 className="editorial-below__title">All Articles</h2>
            <span className="editorial-below__count">
              {blogPosts.length} Posts
            </span>
          </div>

          <div className="editorial-grid">
            {blogPosts.map((post, i) => (
              <div
                key={post.id}
                className="editorial-card"
                onClick={() => {
                  setActiveIndex(i);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="editorial-card__image">
                  <div
                    className="editorial-card__image-placeholder"
                    style={{ background: post.gradient }}
                  />
                </div>
                <div className="editorial-card__body">
                  <span className="editorial-card__category">
                    {post.category}
                  </span>
                  <h3 className="editorial-card__title">
                    {post.title.replace(/\n/g, ' ')}
                  </h3>
                  <p className="editorial-card__excerpt">{post.excerpt}</p>
                  <div className="editorial-card__footer">
                    <span className="editorial-card__date">{post.date}</span>
                    <span className="editorial-card__detail">
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
