import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tags = [
  { text: "innovation",          x: 58, y: 12,  rot: -2,  dark: false },
  { text: "passion",             x: 42, y: 28,  rot: 4,   dark: true  },
  { text: "finance",             x: 64, y: 26,  rot: -5,  dark: false },
  { text: "leadership",          x: 50, y: 38,  rot: 2,   dark: false },
  { text: "recruiting",          x: 72, y: 35,  rot: -3,  dark: true  },
  { text: "marketing",           x: 38, y: 50,  rot: 5,   dark: false },
  { text: "sales",               x: 60, y: 52,  rot: -4,  dark: false },
  { text: "project management",  x: 48, y: 62,  rot: 3,   dark: true  },
  { text: "DEI",                 x: 36, y: 72,  rot: -6,  dark: false },
  { text: "product launch",      x: 56, y: 74,  rot: 2,   dark: false },
];

function Tag({ tag, index }) {
  const outerRef = useRef(null);

  return (
    <div
      className="practice-tag"
      ref={outerRef}
      style={{
        position: "absolute",
        left: `${tag.x}%`,
        top: `${tag.y}%`,
        zIndex: 10 + index,
        opacity: 0,
        willChange: "transform, opacity",
      }}
      data-rot={tag.rot}
    >
      <div
        className="practice-tag-inner"
        style={{
          transform: `rotate(${tag.rot}deg)`,
          background: "rgba(255,255,255,0.65)",
          color: "var(--text-primary, #1a1a2e)",
          fontFamily: "var(--font-family, 'Manrope', sans-serif)",
          fontSize: "clamp(16px, 2.2vw, 28px)",
          fontWeight: "var(--font-weight-bold, 700)",
          fontStyle: "italic",
          padding: "10px 22px",
          whiteSpace: "nowrap",
          cursor: "default",
          borderRadius: "999px",
          border: "1px solid rgba(0,0,0,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = `rotate(0deg) scale(1.08)`;
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(232,101,10,0.2), 0 0 40px rgba(127,119,221,0.1)";
          e.currentTarget.style.borderColor = "rgba(232,101,10,0.4)";
          e.currentTarget.style.background = "rgba(255,255,255,0.8)";
          if (outerRef.current) outerRef.current.style.zIndex = "30";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = `rotate(${tag.rot}deg)`;
          e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
          e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
          e.currentTarget.style.background = "rgba(255,255,255,0.65)";
          if (outerRef.current) outerRef.current.style.zIndex = String(10 + index);
        }}
      >
        {tag.text}
      </div>
    </div>
  );
}

/* ─── Arrow SVG path ─── */
function ArrowPath() {
  const arrowId = "practice-arrow-gradient";
  return (
    <svg
      className="practice-arrow"
      viewBox="0 0 260 60"
      fill="none"
      style={{
        position: "absolute",
        left: "30%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "clamp(180px, 20vw, 280px)",
        height: "auto",
        overflow: "visible",
        opacity: 0,
        filter: "drop-shadow(0 0 8px rgba(232,101,10,0.25)) drop-shadow(0 0 20px rgba(127,119,221,0.12))",
      }}
    >
      <defs>
        <linearGradient id={arrowId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-primary, #E8650A)" />
          <stop offset="100%" stopColor="var(--accent-secondary, #7F77DD)" />
        </linearGradient>
      </defs>
      {/* Looping arrow line */}
      <path
        className="arrow-line"
        d="M0 30 H100 Q130 30 130 15 Q130 0 110 0 Q90 0 90 15 Q90 30 120 30 H230"
        stroke={`url(#${arrowId})`}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <path
        className="arrow-head"
        d="M225 24 L240 30 L225 36"
        stroke={`url(#${arrowId})`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ─── Sparkle decorations ─── */
function Sparkle({ size, top, left, delay, color }) {
  const sparkleColor = color || "var(--accent-primary, #E8650A)";
  return (
    <div
      className="sparkle"
      style={{
        position: "absolute", top, left,
        width: size, height: size,
        opacity: 0,
        filter: `drop-shadow(0 0 4px ${sparkleColor === "var(--accent-primary, #E8650A)" ? "rgba(232,101,10,0.4)" : "rgba(127,119,221,0.4)"})`,
      }}
    >
      <svg viewBox="0 0 24 24" fill={sparkleColor} width={size} height={size}>
        <path d="M12 0 L14 9 L24 12 L14 14 L12 24 L10 14 L0 12 L10 9 Z" />
      </svg>
    </div>
  );
}

export default function PracticeSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Main text reveal
      gsap.fromTo(".practice-title",
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            scrub: 1.5,
          }
        }
      );

      // Arrow draw-in
      gsap.fromTo(".practice-arrow",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "top 25%",
            scrub: 1.5,
          }
        }
      );

      // Sparkle animation
      gsap.fromTo(".sparkle",
        { opacity: 0, scale: 0 },
        {
          opacity: 0.9, scale: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            end: "top 25%",
            scrub: 1.5,
          }
        }
      );

      // Tags scatter in
      const tagEls = section.querySelectorAll(".practice-tag");
      tagEls.forEach((tag, i) => {
        gsap.fromTo(tag,
          {
            opacity: 0,
            y: gsap.utils.random(40, 80),
            x: gsap.utils.random(-30, 30),
            rotation: gsap.utils.random(-15, 15),
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotation: parseFloat(tag.dataset.rot || 0),
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: `top ${60 - i * 3}%`,
              end: `top ${30 - i * 2}%`,
              scrub: 1.5,
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="practice"
      ref={sectionRef}
      style={{
        background: "var(--bg-primary, #f5f5f7)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Radial accent glow — orange */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 20% 45%, rgba(232,101,10,0.04) 0%, transparent 55%)",
        pointerEvents: "none",
      }} />

      {/* Radial accent glow — purple */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 75% 55%, rgba(127,119,221,0.03) 0%, transparent 55%)",
        pointerEvents: "none",
      }} />

      {/* Radial accent glow — teal subtle */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 80%, rgba(136,183,189,0.02) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />

      {/* Subtle noise / grain overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 30% 50%, rgba(0,0,0,0.01) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Left side: "practice your" text */}
      <div
        className="practice-title"
        style={{
          position: "absolute",
          left: "clamp(40px, 6vw, 100px)",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0,
          zIndex: 5,
        }}
      >
        <div style={{
          fontFamily: "var(--font-family, 'Manrope', sans-serif)",
          fontSize: "clamp(60px, 8vw, 130px)",
          fontWeight: "var(--font-weight-bold, 700)",
          lineHeight: 0.95,
          letterSpacing: -3,
          background: "linear-gradient(135deg, var(--text-primary, #1a1a2e) 0%, var(--accent-primary, #E8650A) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 30px rgba(232,101,10,0.1))",
        }}>
          <span style={{ display: "block" }}>practice</span>
          <span style={{ display: "block" }}>your</span>
        </div>
      </div>

      {/* Sparkles near the text — glowing with accent colors */}
      <Sparkle size={22} top="32%" left="30%" delay={0} color="var(--accent-primary, #E8650A)" />
      <Sparkle size={16} top="28%" left="34%" delay={0.2} color="var(--accent-secondary, #7F77DD)" />
      <Sparkle size={12} top="38%" left="32%" delay={0.4} color="var(--accent-primary, #E8650A)" />

      {/* Arrow */}
      <ArrowPath />

      {/* Right side: scattered tags */}
      <div style={{
        position: "absolute",
        right: 0, top: 0, bottom: 0,
        width: "60%",
      }}>
        {tags.map((tag, i) => (
          <Tag key={i} tag={tag} index={i} />
        ))}
      </div>
    </section>
  );
}
