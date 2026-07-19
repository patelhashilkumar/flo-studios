import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProofOfWork.css";

gsap.registerPlugin(ScrollTrigger);

function PlayIcon() {
  return (
    <svg className="play-icon" viewBox="0 0 24 24">
      <path d="M6 4l15 8-15 8z" />
    </svg>
  );
}

export default function ProofOfWork() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const gridCardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(heroRef.current, { opacity: 1, scale: 1 });
      gsap.set(gridCardsRef.current, { opacity: 1, y: 0 });
      return;
    }

    let ctx = gsap.context(() => {
      // Hero Video Animation
      gsap.to(heroRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
        }
      });

      // Grid Videos Animation
      gsap.to(gridCardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".proof-grid",
          start: "top 85%",
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="proof-section" id="work" ref={sectionRef}>
      <div className="proof-header">
        <span className="proof-label">OUR WORK</span>
        <h2 className="proof-title">Proof of Work</h2>
      </div>

      <div className="proof-content">
        {/* Featured Video (Hero) */}
        <div className="proof-hero" ref={heroRef}>
          <div className="video-placeholder">
            <div className="video-glow" />
            <div className="video-mesh" />
            <div className="play-button">
              <div className="play-ring" />
              <PlayIcon />
            </div>
          </div>
          {/* Example integration point for actual video:
            <iframe src="..." frameBorder="0" allowFullScreen></iframe> 
          */}
        </div>

        {/* 2x2 Video Grid */}
        <div className="proof-grid">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="proof-card"
              ref={el => gridCardsRef.current[i-1] = el}
            >
              <div className="video-placeholder">
                <div className="video-glow" style={{ background: i % 2 === 0 ? '#7F77DD' : 'var(--accent-primary)' }} />
                <div className="video-mesh" />
                <div className="play-button">
                  <div className="play-ring" />
                  <PlayIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
