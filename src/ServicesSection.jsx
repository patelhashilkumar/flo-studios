import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServicesSection.css";

gsap.registerPlugin(ScrollTrigger);

/* ─── Stacking Configuration ─── */
const SCROLL_PER_CARD = 900;   // px of scroll each card transition owns
const PERSPECTIVE = 1200;      // 3D perspective depth
const MAX_DEPTH = 3;           // how many receded cards stay visible
const SCALE_STEP = 0.05;       // shrink per depth level
const STACK_OFFSET = 16;       // px downward nudge per depth level
const TILT_ANGLE = 5;          // rotateX degrees at max depth
const DARKEN_AMOUNT = 0.3;     // overlay opacity at max depth
const ENTRANCE_SCALE = 0.5;    // incoming card start scale
const ENTRANCE_DISTANCE = 40;  // px incoming card rises from

/* ─── Card Data (consolidated from 8 → 4) ─── */
const cards = [
  {
    title: "Creator Growth",
    description:
      "End-to-end strategy and execution to scale your audience — from ideation and scripting to content refinement, built into a growth engine.",
    background: "#ffffff",
    contentBg: "#f5f0eb",
    number: "01",
    tags: ["Strategy", "Ideation", "Scripting"],
  },
  {
    title: "Web Design & Development",
    description:
      "Pixel-perfect, high-performance websites and full-stack web applications built with modern architectures and rigorous attention to detail.",
    background: "#ffffff",
    contentBg: "#eef1f5",
    number: "02",
    tags: ["UI/UX", "Frontend", "Full-Stack"],
  },
  {
    title: "AI Development",
    description:
      "Intelligent systems and AI-powered solutions seamlessly integrated into your products, workflows, and digital experiences.",
    background: "#ffffff",
    contentBg: "#eef0f0",
    number: "03",
    tags: ["Machine Learning", "Automation", "Integration"],
  },
  {
    title: "Video & App Production",
    description:
      "Cinematic post-production polish and native cross-platform mobile applications that elevate your digital presence.",
    background: "#ffffff",
    contentBg: "#f3eef5",
    number: "04",
    tags: ["Motion", "Editing", "Mobile Apps"],
  },
];

/* ─── Helpers ─── */
function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function mapRange(v, inMin, inMax, outMin, outMax) {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
}

/* ═══════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════ */
export default function ServicesSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const darkenRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const cardEls = cardRefs.current.filter(Boolean);
    const darkenEls = darkenRefs.current.filter(Boolean);
    const numCards = cards.length;

    const ctx = gsap.context(() => {
      /* ── Set initial card states ── */
      cardEls.forEach((card, i) => {
        gsap.set(card, {
          autoAlpha: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : ENTRANCE_SCALE,
          y: i === 0 ? 0 : ENTRANCE_DISTANCE,
          rotateX: 0,
          zIndex: i,
          transformOrigin: "50% 100%",
          transformPerspective: PERSPECTIVE,
        });
        gsap.set(darkenEls[i], { opacity: 0 });
      });

      /* ── Scroll-driven stacking ── */
      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: () => `+=${SCROLL_PER_CARD * (numCards - 1)}`,
        pin: true,
        onUpdate: (self) => {
          const activeFloat = self.progress * (numCards - 1);

          cardEls.forEach((card, i) => {
            const d = activeFloat - i;
            const darken = darkenEls[i];

            /* Card is too far ahead — hide */
            if (d < -1) {
              gsap.set(card, { autoAlpha: 0 });
              gsap.set(darken, { opacity: 0 });
              return;
            }

            /* ── Compute per-card transforms ── */

            // Opacity: quick fade-in between d=-1 and d=-0.6, then solid
            let opacity;
            if (d < -0.6) {
              opacity = mapRange(d, -1, -0.6, 0, 1);
            } else if (d <= MAX_DEPTH) {
              opacity = 1;
            } else {
              opacity = mapRange(d, MAX_DEPTH, MAX_DEPTH + 1, 1, 0);
            }

            // Scale: grow from entrance scale → 1, then shrink as it recedes
            let scale;
            if (d < 0) {
              scale = mapRange(d, -1, 0, ENTRANCE_SCALE, 1);
            } else {
              scale = 1 - SCALE_STEP * clamp(d, 0, MAX_DEPTH);
            }

            // Y offset: rise up on entrance, nudge down as it recedes
            let y;
            if (d < 0) {
              y = mapRange(d, -1, 0, ENTRANCE_DISTANCE * 0.25, 0);
            } else {
              y = STACK_OFFSET * clamp(d, 0, MAX_DEPTH);
            }

            // RotateX: tilt backward as it recedes into the stack
            let rotateX;
            if (d <= 0) {
              rotateX = 0;
            } else {
              rotateX = mapRange(d, 0, MAX_DEPTH, 0, TILT_ANGLE);
            }

            // Darken overlay: increases as card recedes
            let darkenOpacity;
            if (d <= 0) {
              darkenOpacity = 0;
            } else {
              darkenOpacity = mapRange(d, 0, MAX_DEPTH, 0, DARKEN_AMOUNT);
            }

            gsap.set(card, {
              autoAlpha: opacity,
              scale,
              y,
              rotateX,
              zIndex: i,
              transformOrigin: "50% 100%",
              transformPerspective: PERSPECTIVE,
            });
            gsap.set(darken, { opacity: darkenOpacity });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="stack-stage" ref={stageRef}>
        <div className="stack-viewport">
          {cards.map((card, i) => (
            <div
              key={i}
              className="stack-card"
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div
                className="stack-card__face"
                style={{ background: card.background }}
              >
                <div className="stack-card__header">
                  <h3 className="stack-card__title">{card.title}</h3>
                  <p className="stack-card__desc">{card.description}</p>
                </div>

                <div
                  className="stack-card__content"
                  style={{ background: card.contentBg }}
                >
                  <span className="stack-card__number">{card.number}</span>
                  <div className="stack-card__tags">
                    {card.tags.map((tag, j) => (
                      <span key={j} className="stack-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="stack-card__darken"
                ref={(el) => (darkenRefs.current[i] = el)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
