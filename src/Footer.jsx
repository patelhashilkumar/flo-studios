import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Footer Data ─── */
const FOOTER_SECTIONS = [
  {
    title: 'BONUS TRACK',
    rows: [
      { sub: 'BUT WHY', main: 'Why Flo Studios', path: '/why-flo-studios' },
      { sub: 'CURIOUS', main: 'Who did this?!', path: '/who-did-this' },
    ],
  },
  {
    title: 'WEBSITE NAVIGATION',
    rows: [
      { sub: 'OUR SERVICES', main: 'Services', path: '/services' },
      { sub: 'OUR SOUL', main: 'About', path: '/about' },
      { sub: 'JOIN OUR VENTURE', main: 'Careers', path: '/careers' },
      { sub: 'REACH OUT!', main: 'Contact', path: '/contact' },
      { sub: 'INSIGHTS', main: 'Blog', path: '/blog' },
      { sub: 'OPEN ROLES', main: 'Jobs', path: '/jobs' },
    ],
  },
  {
    title: 'OUR PLATFORM',
    rows: [
      { sub: 'WITHOUT ACCOUNT', main: 'Try now', path: '/try-now' },
      { sub: 'FOR LONG-TERM RELATIONSHIPS', main: 'Sign Up', path: '/sign-up' },
      { sub: 'GLAD TO SEE YOU AGAIN', main: 'Login', path: '/login' },
    ],
  },
  {
    title: 'LEGAL INFORMATION',
    rows: [
      { sub: 'BORING BUT USEFUL', main: 'Terms of Use', path: '/terms' },
      { sub: 'MY DAAATA', main: 'Privacy Policy', path: '/privacy' },
      { sub: 'LOVE FROM EUROPE', main: 'GDPR Notice', path: '/gdpr' },
    ],
  },
];

/* ─── Compute how many sprocket holes we need ─── */
function useSprocketCount(ref) {
  const count = useRef(24); // default

  useEffect(() => {
    if (!ref.current) return;
    const updateCount = () => {
      const h = ref.current?.offsetHeight || 960;
      // Each sprocket hole occupies ~40px (16px hole + 24px margin)
      count.current = Math.ceil(h / 40);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, [ref]);

  return count;
}

export default function Footer() {
  const footerRef = useRef(null);
  const sprocketCount = useSprocketCount(footerRef);

  /* ─── GSAP Scroll-Triggered Staggered Reveals ─── */
  useEffect(() => {
    if (!footerRef.current) return;

    const els = footerRef.current.querySelectorAll(
      '.film-footer__row, .film-footer__section-title'
    );

    // Set initial state via GSAP (overrides CSS opacity:0)
    gsap.set(els, { opacity: 0, y: 14 });

    const ctx = gsap.context(() => {
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  /* ─── Generate sprocket hole arrays ─── */
  const sprocketHoles = useMemo(() => {
    const holes = [];
    for (let i = 0; i < 30; i++) {
      holes.push(<div className="sprocket-hole" key={i} />);
    }
    return holes;
  }, []);

  return (
    <footer id="footer" className="film-footer" ref={footerRef}>
      {/* Film grain overlay */}
      <div className="film-footer__grain" />

      {/* Ambient glow */}
      <div className="film-footer__glow" />

      {/* Sprocket holes — Left */}
      <div className="sprocket-col sprocket-col--left">{sprocketHoles}</div>

      {/* Sprocket holes — Right */}
      <div className="sprocket-col sprocket-col--right">{sprocketHoles}</div>

      {/* Main content area */}
      <div className="film-footer__inner">
        {FOOTER_SECTIONS.map((section, sIdx) => (
          <div key={section.title}>
            {/* Section header */}
            <div className="film-footer__section-title">{section.title}</div>

            {/* Credit rows */}
            <div className="film-footer__group">
              {section.rows.map((row) => (
                <a
                  key={row.main}
                  href={row.path}
                  className="film-footer__row"
                  aria-label={`${row.sub} — ${row.main}`}
                >
                  <span className="film-footer__sub-label">{row.sub}</span>
                  <span className="film-footer__dot" />
                  <span className="film-footer__main-link">{row.main}</span>
                </a>
              ))}
            </div>
          </div>
        ))}

      </div>

      {/* Copyright bar */}
      <div className="film-footer__copyright-bar">
        © 2026 Flo Studios. All rights reserved.
      </div>
    </footer>
  );
}
