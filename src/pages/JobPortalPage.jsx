import { useState } from 'react';
import { Link } from 'react-router-dom';
import './EditorialPage.css';

/* ─── Featured Job Data (for the hero strip) ─── */
const featuredJobs = [
  {
    id: 1,
    title: "Senior\nFull-Stack\nEngineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    posted: "Aug 2025",
    gradient: "linear-gradient(135deg, #0d1a2e 0%, #0a1628 50%, #061020 100%)",
    thumbGradient: "linear-gradient(135deg, #0d1a2e, #061020)",
  },
  {
    id: 2,
    title: "AI / ML\nEngineer",
    department: "AI Research",
    location: "San Francisco",
    type: "Full-time",
    posted: "Aug 2025",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    thumbGradient: "linear-gradient(135deg, #1a1a2e, #0f3460)",
  },
  {
    id: 3,
    title: "Product\nDesigner",
    department: "Design",
    location: "Berlin",
    type: "Full-time",
    posted: "Jul 2025",
    gradient: "linear-gradient(135deg, #2c1810 0%, #3d1f10 50%, #1a0f08 100%)",
    thumbGradient: "linear-gradient(135deg, #3d1f10, #1a0f08)",
  },
  {
    id: 4,
    title: "Creative\nDirector",
    department: "Creative",
    location: "New York",
    type: "Full-time",
    posted: "Jul 2025",
    gradient: "linear-gradient(135deg, #1f1a2e 0%, #2a1f3e 50%, #150f28 100%)",
    thumbGradient: "linear-gradient(135deg, #2a1f3e, #150f28)",
  },
  {
    id: 5,
    title: "Motion\nDesigner",
    department: "Creative",
    location: "Remote",
    type: "Contract",
    posted: "Jun 2025",
    gradient: "linear-gradient(135deg, #1a2a1a 0%, #0d1f0d 50%, #0a170a 100%)",
    thumbGradient: "linear-gradient(135deg, #1a2a1a, #0a170a)",
  },
  {
    id: 6,
    title: "Content\nStrategist",
    department: "Growth",
    location: "Los Angeles",
    type: "Full-time",
    posted: "Jun 2025",
    gradient: "linear-gradient(135deg, #2e2e1a 0%, #3e3e16 50%, #1a1a0d 100%)",
    thumbGradient: "linear-gradient(135deg, #2e2e1a, #1a1a0d)",
  },
  {
    id: 7,
    title: "Frontend\nDeveloper",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    posted: "May 2025",
    gradient: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #0d0d0d 100%)",
    thumbGradient: "linear-gradient(135deg, #2d2d2d, #0d0d0d)",
  },
  {
    id: 8,
    title: "Video\nEditor",
    department: "Production",
    location: "London",
    type: "Contract",
    posted: "May 2025",
    gradient: "linear-gradient(135deg, #2e1a1a 0%, #3e1616 50%, #280d0d 100%)",
    thumbGradient: "linear-gradient(135deg, #2e1a1a, #280d0d)",
  },
];

/* ─── All Open Positions ─── */
const allPositions = [
  { title: "Senior Full-Stack Engineer", dept: "Engineering", location: "Remote", type: "Full-time" },
  { title: "AI / ML Engineer", dept: "AI Research", location: "San Francisco", type: "Full-time" },
  { title: "Product Designer", dept: "Design", location: "Berlin", type: "Full-time" },
  { title: "Creative Director", dept: "Creative", location: "New York", type: "Full-time" },
  { title: "Motion Designer", dept: "Creative", location: "Remote", type: "Contract" },
  { title: "Content Strategist", dept: "Growth", location: "Los Angeles", type: "Full-time" },
  { title: "Frontend Developer", dept: "Engineering", location: "Remote", type: "Full-time" },
  { title: "Video Editor", dept: "Production", location: "London", type: "Contract" },
  { title: "Behavioral Science Researcher", dept: "Research", location: "Remote", type: "Full-time" },
  { title: "DevOps Engineer", dept: "Engineering", location: "Remote", type: "Full-time" },
  { title: "Community Manager", dept: "Growth", location: "Remote", type: "Part-time" },
  { title: "Scenario Writer", dept: "Content", location: "Remote", type: "Contract" },
];

/* ═══════════════════════════════════════════════════════
   Job Portal Page Component
   ═══════════════════════════════════════════════════════ */
export default function JobPortalPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeJob = featuredJobs[activeIndex];

  const progressWidth = ((activeIndex + 1) / featuredJobs.length) * 100;

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
          style={{ background: activeJob.gradient }}
        />

        {/* Decorative silhouette */}
        <div className="editorial-hero__silhouette editorial-hero__silhouette--jobs" />

        {/* Title */}
        <div className="editorial-hero__content">
          <h1 className="editorial-title">
            {activeJob.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < activeJob.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>

        {/* Metadata */}
        <div className="editorial-meta">
          <span className="editorial-meta__item">{activeJob.department}</span>
          <span className="editorial-meta__divider" />
          <span className="editorial-meta__item">{activeJob.location}</span>
          <span className="editorial-meta__divider" />
          <span className="editorial-meta__item">{activeJob.type}</span>
          <span className="editorial-meta__divider" />
          <span className="editorial-meta__item">{activeJob.posted}</span>
        </div>

        {/* Image Strip */}
        <div className="editorial-strip">
          {featuredJobs.map((job, i) => (
            <button
              key={job.id}
              className={`editorial-strip__item ${
                i === activeIndex ? 'editorial-strip__item--active' : ''
              }`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View position: ${job.title.replace(/\n/g, ' ')}`}
            >
              <div
                className="editorial-strip__placeholder"
                style={{ background: job.thumbGradient }}
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
            {String(featuredJobs.length).padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* ── Below-Fold: All Positions ── */}
      <section className="editorial-below">
        <div className="editorial-below__inner">
          <div className="editorial-below__header">
            <h2 className="editorial-below__title">Open Positions</h2>
            <span className="editorial-below__count">
              {allPositions.length} Roles
            </span>
          </div>

          <div className="editorial-positions">
            {allPositions.map((pos, i) => (
              <div key={i} className="editorial-position">
                <span className="editorial-position__title">{pos.title}</span>
                <span className="editorial-position__dept">{pos.dept}</span>
                <span className="editorial-position__location">
                  {pos.location}
                </span>
                <span className="editorial-position__type">{pos.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
