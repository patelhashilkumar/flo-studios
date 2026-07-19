import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Fake avatar circles ─── */
const avatars = [
  { bg: "#E8650A", icon: "❤", active: false },
  { bg: "#333",    icon: "👤", active: true  },
  { bg: "#5ba4c9", icon: "📋", active: false },
  { bg: "#888",    icon: "📊", active: false },
  { bg: "#aaa",    icon: "📁", active: false },
  { bg: "#E8650A", icon: "🎯", active: false },
  { bg: "#666",    icon: "📈", active: false },
  { bg: "#999",    icon: "📝", active: false },
];

/* ─── Keyframes injected once ─── */
const styleId = "practice-showcase-styles";
if (typeof document !== "undefined" && !document.getElementById(styleId)) {
  const sheet = document.createElement("style");
  sheet.id = styleId;
  sheet.textContent = `
    @keyframes blobPulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.75; }
      50%      { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes dotFade {
      0%, 100% { opacity: 0.25; }
      50%      { opacity: 0.45; }
    }
  `;
  document.head.appendChild(sheet);
}

function FloatingCard() {
  return (
    <div className="showcase-card" style={{
      background: "rgba(255,255,255,0.75)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(0,0,0,0.06)",
      borderRadius: 16,
      width: "clamp(380px, 36vw, 520px)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)",
      overflow: "hidden",
      position: "relative",
      zIndex: 5,
    }}>
      {/* Header */}
      <div style={{
        padding: "16px 20px 12px",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(0,0,0,0.02)",
      }}>
        <span style={{ fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 14, fontWeight: "var(--font-weight-bold, 700)", color: "#1a1a2e" }}>
          Lead a product launch
        </span>
        <span style={{ fontSize: 18, color: "#999", cursor: "pointer", lineHeight: 1 }}>×</span>
      </div>

      {/* Avatar strip */}
      <div style={{
        display: "flex", gap: 6, padding: "14px 20px",
        overflowX: "auto",
        background: "transparent",
      }}>
        {avatars.map((av, i) => (
          <div key={i} style={{
            width: 42, height: 42, borderRadius: 8, flexShrink: 0,
            background: av.active ? "rgba(0,0,0,0.03)" : `${av.bg}1a`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, opacity: av.active ? 1 : 0.5,
            border: av.active ? "2.5px solid var(--accent-primary, #E8650A)" : "2px solid rgba(0,0,0,0.06)",
            transition: "all 0.2s",
          }}>{av.icon}</div>
        ))}
      </div>

      {/* Person row */}
      <div style={{
        padding: "8px 20px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-primary, #E8650A), var(--accent-secondary, #7F77DD))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, color: "#fff",
          }}>👤</div>
          <div>
            <div style={{ fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 13, fontWeight: "var(--font-weight-bold, 700)", color: "#1a1a2e" }}>John Smith</div>
            <div style={{ fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 10, color: "#777" }}>Product Manager</div>
          </div>
        </div>
        <button style={{
          background: "transparent", border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: 20,
          padding: "5px 14px", fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 11,
          color: "#555", cursor: "pointer",
          transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-primary, #E8650A)"; e.currentTarget.style.color = "#1a1a2e"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; e.currentTarget.style.color = "#555"; }}
        >Change person</button>
      </div>

      {/* How to win */}
      <div style={{ padding: "0 20px 14px" }}>
        <div style={{ fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 10, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1, fontWeight: "var(--font-weight-medium, 500)" }}>How to win</div>
        <div style={{ fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 13, color: "#555", lineHeight: 1.5, fontWeight: "var(--font-weight-medium, 500)" }}>
          You are John's manager. John has hit only 55% of his targets last quarter.
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: "flex", gap: 1, margin: "0 20px 16px",
        background: "#f5f5f7", borderRadius: 10, overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.06)",
      }}>
        {[
          { label: "Difficulty", value: "Easy" },
          { label: "Avg time", value: "03:21" },
          { label: "Avg messages", value: "12" },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1, padding: "10px 12px", textAlign: "center",
            background: "#f5f5f7",
            borderRight: i < 2 ? "1px solid rgba(0,0,0,0.06)" : "none",
          }}>
            <div style={{ fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 9, color: "#888", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: "var(--font-weight-medium, 500)" }}>{stat.label}</div>
            <div style={{ fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 16, fontWeight: "var(--font-weight-bold, 700)", color: "#1a1a2e" }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{ padding: "0 20px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 1, fontWeight: "var(--font-weight-medium, 500)" }}>Progress bar</span>
          <span style={{ fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 10, color: "var(--accent-primary, #E8650A)", fontWeight: "var(--font-weight-bold, 700)" }}>● 5%</span>
        </div>
        {/* Progress bar track */}
        <div style={{
          height: 4, borderRadius: 2, background: "rgba(0,0,0,0.06)", marginBottom: 12, overflow: "hidden",
        }}>
          <div style={{
            width: "47%", height: "100%", borderRadius: 2,
            background: "linear-gradient(90deg, var(--accent-primary, #E8650A), var(--accent-secondary, #7F77DD))",
            boxShadow: "0 0 12px rgba(232,101,10,0.4)",
          }} />
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{
            fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 42, fontWeight: "var(--font-weight-bold, 700)",
            color: "#1a1a2e", lineHeight: 1,
          }}>47%</span>
          <span style={{ fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 11, color: "#777", lineHeight: 1.4, maxWidth: 180, fontWeight: "var(--font-weight-medium, 500)" }}>
            By the end of the game, you should have effectively communicated with John.
          </span>
        </div>
      </div>

      {/* Your goal */}
      <div style={{ padding: "0 20px 16px" }}>
        <div style={{ fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 10, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1, fontWeight: "var(--font-weight-medium, 500)" }}>Your goal</div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { step: "Step 1", text: "Hold John accountable for that poor performance" },
            { step: "Step 2", text: "Get him to build a plan for doing better next quarter." },
          ].map((goal, i) => (
            <div key={i} style={{
              flex: 1, padding: "10px 12px",
              border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 10,
              background: "rgba(255,255,255,0.6)",
              transition: "border-color 0.3s",
            }}>
              <span style={{
                display: "inline-block", padding: "2px 8px",
                background: "#f0f0f0",
                borderRadius: 10, fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 9,
                fontWeight: "var(--font-weight-bold, 700)", color: "var(--accent-primary, #E8650A)", marginBottom: 6,
              }}>{goal.step}</span>
              <div style={{ fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 11, color: "#555", lineHeight: 1.4, fontWeight: "var(--font-weight-medium, 500)" }}>{goal.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA button */}
      <div style={{ padding: "0 20px 20px" }}>
        <button style={{
          width: "100%", padding: "14px", borderRadius: 28,
          background: "linear-gradient(135deg, var(--accent-primary, #E8650A), #ff8533)",
          border: "none", color: "#fff",
          fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 15, fontWeight: "var(--font-weight-bold, 700)",
          cursor: "pointer", letterSpacing: 0.5,
          boxShadow: "0 4px 20px rgba(232,101,10,0.3), 0 0 40px rgba(232,101,10,0.1)",
          transition: "transform 0.2s, box-shadow 0.2s",
          backgroundSize: "200% auto",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(232,101,10,0.5), 0 0 60px rgba(232,101,10,0.2)";
          e.currentTarget.style.backgroundImage = "linear-gradient(90deg, var(--accent-primary, #E8650A), #ff8533, var(--accent-secondary, #7F77DD), #ff8533, var(--accent-primary, #E8650A))";
          e.currentTarget.style.backgroundSize = "200% auto";
          e.currentTarget.style.animation = "shimmer 2s linear infinite";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,101,10,0.3), 0 0 40px rgba(232,101,10,0.1)";
          e.currentTarget.style.backgroundImage = "linear-gradient(135deg, var(--accent-primary, #E8650A), #ff8533)";
          e.currentTarget.style.backgroundSize = "100% auto";
          e.currentTarget.style.animation = "none";
        }}
        >
          Let's start
        </button>
      </div>
    </div>
  );
}

/* ─── Wavy logo icon ─── */
function WavyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.85, filter: "drop-shadow(0 0 5px rgba(232,101,10,0.15))" }}>
      {[0, 6, 12, 18, 24].map((offset, i) => (
        <path key={i} d={`M${8 + offset} 8 Q${12 + offset} 20 ${8 + offset} 32 Q${4 + offset} 44 ${8 + offset} 48`}
          stroke={i % 2 === 0 ? "var(--accent-primary, #E8650A)" : "var(--accent-secondary, #7F77DD)"}
          strokeWidth="2.5" strokeLinecap="round" fill="none"
          style={{ filter: "drop-shadow(0 0 2px rgba(232,101,10,0.1))" }}
        />
      ))}
    </svg>
  );
}

export default function PracticeShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading slide in
      gsap.fromTo(".showcase-heading",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 65%", end: "top 30%", scrub: 1.5 },
        }
      );

      // Subtitle
      gsap.fromTo(".showcase-subtitle",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 58%", end: "top 25%", scrub: 1.5 },
        }
      );

      // Blob scale in
      gsap.fromTo(".showcase-blob",
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%", end: "top 25%", scrub: 1.5 },
        }
      );

      // Card slide in from right
      gsap.fromTo(".showcase-card",
        { opacity: 0, x: 100, y: 30 },
        {
          opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 55%", end: "top 15%", scrub: 1.5 },
        }
      );

      // Bottom text
      gsap.fromTo(".showcase-bottom",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 40%", end: "top 10%", scrub: 1.5 },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      style={{
        background: "var(--bg-secondary, #f0f0f3)",
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Top gradient bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, var(--accent-primary, #E8650A), var(--accent-secondary, #7F77DD), transparent)",
        boxShadow: "0 0 20px rgba(232,101,10,0.3), 0 0 40px rgba(127,119,221,0.15)",
      }} />

      {/* Top label */}
      <div style={{
        position: "absolute", top: 16, left: 30,
        fontFamily: "var(--font-family, 'Manrope', sans-serif)", fontSize: 12, fontWeight: "var(--font-weight-bold, 700)",
        color: "var(--text-muted, #5a5a70)", letterSpacing: 2, textTransform: "uppercase",
      }}>Practice</div>

      {/* Bottom gradient bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, var(--accent-primary, #E8650A), var(--accent-secondary, #7F77DD), transparent)",
        boxShadow: "0 0 20px rgba(232,101,10,0.3), 0 0 40px rgba(127,119,221,0.15)",
      }} />

      {/* Gradient blob */}
      <div className="showcase-blob" style={{
        position: "absolute",
        top: "50%", left: "45%",
        transform: "translate(-50%, -50%)",
        width: "clamp(400px, 45vw, 650px)",
        height: "clamp(400px, 45vw, 650px)",
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, rgba(232,101,10,0.25) 0%, rgba(127,119,221,0.15) 40%, rgba(136,183,189,0.06) 65%, transparent 80%)",
        filter: "blur(50px)",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 1,
        animation: "blobPulse 6s ease-in-out infinite",
      }} />

      {/* Left content */}
      <div style={{
        position: "relative", zIndex: 3,
        padding: "0 clamp(30px, 5vw, 80px)",
        width: "45%",
      }}>
        <h2 className="showcase-heading" style={{
          fontFamily: "var(--font-family, 'Manrope', sans-serif)",
          fontSize: "clamp(48px, 6.5vw, 100px)",
          fontWeight: "var(--font-weight-bold, 700)",
          background: "linear-gradient(135deg, var(--accent-primary, #E8650A) 0%, #ff9944 50%, var(--accent-secondary, #7F77DD) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
          letterSpacing: -2,
          marginBottom: 20,
          opacity: 0,
          filter: "drop-shadow(0 4px 30px rgba(232,101,10,0.4))",
        }}>
          Practice
        </h2>
        <p className="showcase-subtitle" style={{
          fontFamily: "var(--font-family, 'Manrope', sans-serif)",
          fontSize: "clamp(16px, 1.6vw, 22px)",
          color: "var(--text-secondary, #a0a0b0)",
          fontWeight: "var(--font-weight-medium, 500)",
          lineHeight: 1.5,
          maxWidth: 380,
          opacity: 0,
        }}>
          Practice one scene at a time through the immersive story of a fictional company
        </p>

        {/* Bottom text + icon */}
        <div className="showcase-bottom" style={{
          display: "flex", alignItems: "center", gap: 16,
          marginTop: "clamp(60px, 8vh, 120px)",
          opacity: 0,
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-family, 'Manrope', sans-serif)",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: "var(--font-weight-bold, 700)",
              color: "var(--text-primary, #f0f0f2)",
              lineHeight: 1.1,
            }}>
              Hold me<br />accountable
            </div>
          </div>
          <WavyIcon />
        </div>
      </div>

      {/* Right: floating card */}
      <div style={{
        position: "relative", zIndex: 4,
        display: "flex", justifyContent: "center", alignItems: "center",
        width: "55%",
        paddingRight: "clamp(20px, 4vw, 60px)",
      }}>
        <FloatingCard />
      </div>
    </section>
  );
}
