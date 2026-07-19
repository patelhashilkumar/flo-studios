import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./JourneyCollage.css";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   Step Data
   ═══════════════════════════════════════════════════════ */
const steps = [
  {
    number: "01",
    title: "Personalized",
    description:
      "We start by understanding your unique challenges. Through deep discovery sessions, we curate skills and build custom role-plays tailored to your team's specific growth areas — no cookie-cutter content.",
  },
  {
    number: "02",
    title: "Scenario Design",
    description:
      "Our AI studio crafts realistic, immersive scenarios drawn from your industry. Every conversation is designed to mirror real workplace dynamics, so practice feels authentic from day one.",
  },
  {
    number: "03",
    title: "Practice & Iterate",
    description:
      "Your team practices one scene at a time through the immersive story of a fictional company. Real-time AI feedback helps them refine their approach, building confidence with every interaction.",
  },
  {
    number: "04",
    title: "Measure & Scale",
    description:
      "Track progress with detailed analytics. See who's improving, where the gaps are, and scale what works across your entire organization — turning practice into lasting performance.",
  },
];

/* ═══════════════════════════════════════════════════════
   SVG Visual Components
   ═══════════════════════════════════════════════════════ */

function DiscoveryVisual() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ds1" x="-15%" y="-5%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="16" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Soft glow */}
      <circle cx="200" cy="200" r="150" fill="#E8650A" opacity="0.03" />

      {/* Connection lines */}
      <line className="vis-line" x1="130" y1="185" x2="68" y2="148" stroke="#E8650A" strokeWidth="1" opacity="0" />
      <line className="vis-line" x1="130" y1="255" x2="88" y2="295" stroke="#7F77DD" strokeWidth="1" opacity="0" />
      <line className="vis-line" x1="270" y1="175" x2="328" y2="138" stroke="#88B7BD" strokeWidth="1" opacity="0" />
      <line className="vis-line" x1="270" y1="255" x2="335" y2="278" stroke="#E8650A" strokeWidth="1" opacity="0" />
      <line className="vis-line" x1="200" y1="112" x2="200" y2="62" stroke="#7F77DD" strokeWidth="1" opacity="0" />

      {/* Central card */}
      <g className="vis-card" filter="url(#ds1)">
        <rect x="130" y="112" width="140" height="192" rx="16" fill="white" stroke="rgba(232,101,10,0.12)" strokeWidth="1" />
        <circle cx="200" cy="165" r="24" fill="#FFF3EB" />
        <circle cx="200" cy="157" r="10" fill="#E8650A" opacity="0.4" />
        <ellipse cx="200" cy="180" rx="15" ry="8" fill="#E8650A" opacity="0.2" />
        <rect x="155" y="210" width="90" height="5" rx="2.5" fill="#f5f5f5" />
        <rect x="155" y="223" width="64" height="5" rx="2.5" fill="#f5f5f5" />
        <rect x="155" y="236" width="78" height="5" rx="2.5" fill="#f5f5f5" />
        <rect x="155" y="260" width="90" height="24" rx="8" fill="#FFF3EB" />
        <rect x="170" y="269" width="42" height="6" rx="3" fill="#E8650A" opacity="0.3" />
      </g>

      {/* Satellite nodes */}
      <circle className="vis-node" cx="60" cy="142" r="9" fill="#FFF3EB" stroke="#E8650A" strokeWidth="1.5" />
      <circle className="vis-node" cx="80" cy="300" r="11" fill="#F3F0FF" stroke="#7F77DD" strokeWidth="1.5" />
      <circle className="vis-node" cx="336" cy="132" r="8" fill="#EFF8F9" stroke="#88B7BD" strokeWidth="1.5" />
      <circle className="vis-node" cx="343" cy="273" r="10" fill="#FFF3EB" stroke="#E8650A" strokeWidth="1.5" />
      <circle className="vis-node" cx="200" cy="52" r="7" fill="#F3F0FF" stroke="#7F77DD" strokeWidth="1.5" />

      {/* Sparkle dots */}
      <circle cx="98" cy="88" r="2" fill="#E8650A" opacity="0.15" />
      <circle cx="315" cy="198" r="2" fill="#7F77DD" opacity="0.12" />
      <circle cx="148" cy="348" r="2" fill="#88B7BD" opacity="0.1" />
      <circle cx="295" cy="72" r="1.5" fill="#E8650A" opacity="0.1" />
    </svg>
  );
}

function ScenarioVisual() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ds2" x="-15%" y="-5%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="14" floodOpacity="0.07" />
        </filter>
      </defs>

      <circle cx="200" cy="210" r="150" fill="#7F77DD" opacity="0.03" />

      {/* Card 1 — back */}
      <g className="vis-card" filter="url(#ds2)">
        <rect x="92" y="98" width="188" height="135" rx="14" fill="white" stroke="rgba(0,0,0,0.06)" strokeWidth="1" transform="rotate(-4 186 165)" />
      </g>

      {/* Card 2 — middle */}
      <g className="vis-card" filter="url(#ds2)">
        <rect x="112" y="138" width="188" height="135" rx="14" fill="white" stroke="rgba(0,0,0,0.06)" strokeWidth="1" transform="rotate(2 206 205)" />
      </g>

      {/* Card 3 — front (hero) */}
      <g className="vis-card" filter="url(#ds2)">
        <rect x="98" y="178" width="188" height="148" rx="14" fill="white" stroke="#7F77DD" strokeWidth="1.5" />
        <circle cx="128" cy="208" r="14" fill="#F3F0FF" />
        <circle cx="128" cy="205" r="5" fill="#7F77DD" opacity="0.35" />
        <rect x="152" y="200" width="68" height="5" rx="2.5" fill="#eee" />
        <rect x="152" y="213" width="46" height="4" rx="2" fill="#f5f5f5" />
        <rect x="115" y="240" width="155" height="4" rx="2" fill="#f5f5f5" />
        <rect x="115" y="252" width="135" height="4" rx="2" fill="#f5f5f5" />
        <rect x="115" y="264" width="95" height="4" rx="2" fill="#f5f5f5" />
        <rect x="115" y="286" width="74" height="22" rx="7" fill="#F3F0FF" />
        <rect x="128" y="294" width="36" height="5" rx="2.5" fill="#7F77DD" opacity="0.3" />
      </g>

      {/* Chat bubbles */}
      <g className="vis-bubble">
        <rect x="32" y="218" width="50" height="34" rx="10" fill="#FFF3EB" stroke="#E8650A" strokeWidth="1" />
        <rect x="44" y="229" width="26" height="4" rx="2" fill="#E8650A" opacity="0.2" />
        <rect x="44" y="237" width="18" height="3" rx="1.5" fill="#E8650A" opacity="0.12" />
      </g>
      <g className="vis-bubble">
        <rect x="310" y="148" width="58" height="38" rx="10" fill="#EFF8F9" stroke="#88B7BD" strokeWidth="1" />
        <rect x="322" y="160" width="34" height="4" rx="2" fill="#88B7BD" opacity="0.2" />
        <rect x="322" y="168" width="24" height="3" rx="1.5" fill="#88B7BD" opacity="0.12" />
      </g>

      {/* Flow arrows */}
      <path className="vis-arrow" d="M86 248 Q 64 245 55 232" stroke="#E8650A" strokeWidth="1.5" fill="none" opacity="0" strokeLinecap="round" />
      <path className="vis-arrow" d="M302 218 Q 328 198 322 174" stroke="#88B7BD" strokeWidth="1.5" fill="none" opacity="0" strokeLinecap="round" />

      {/* Decorative */}
      <circle className="vis-node" cx="338" cy="98" r="5" fill="#7F77DD" opacity="0.25" />
      <circle className="vis-node" cx="62" cy="318" r="4" fill="#E8650A" opacity="0.2" />
      <circle cx="48" cy="128" r="2" fill="#7F77DD" opacity="0.1" />
      <circle cx="355" cy="288" r="2" fill="#E8650A" opacity="0.1" />
    </svg>
  );
}

function PracticeVisual() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8650A" />
          <stop offset="100%" stopColor="#FF8533" />
        </linearGradient>
        <filter id="ds3" x="-25%" y="-15%" width="150%" height="150%">
          <feDropShadow dx="0" dy="4" stdDeviation="12" floodOpacity="0.07" />
        </filter>
      </defs>

      <circle cx="200" cy="200" r="165" fill="#88B7BD" opacity="0.025" />

      {/* Track ring */}
      <circle cx="200" cy="200" r="130" stroke="rgba(0,0,0,0.04)" strokeWidth="10" fill="none" />

      {/* Animated progress ring */}
      <circle className="vis-ring" cx="200" cy="200" r="130"
        stroke="url(#ringGrad)" strokeWidth="10" fill="none"
        strokeLinecap="round" transform="rotate(-90 200 200)" />

      {/* Center card */}
      <g filter="url(#ds3)">
        <rect x="150" y="162" width="100" height="76" rx="14" fill="white" />
      </g>
      <text className="vis-percent" x="200" y="206" textAnchor="middle"
        fontFamily="Manrope, sans-serif" fontSize="28" fontWeight="700" fill="#1a1a2e">75%</text>
      <text x="200" y="226" textAnchor="middle"
        fontFamily="Manrope, sans-serif" fontSize="9" fontWeight="600" fill="#aaa" letterSpacing="2">COMPLETE</text>

      {/* Orbiting dots */}
      <circle className="vis-dot" cx="200" cy="62" r="6" fill="#E8650A" />
      <circle className="vis-dot" cx="330" cy="200" r="5" fill="#7F77DD" opacity="0.8" />
      <circle className="vis-dot" cx="200" cy="338" r="4" fill="#88B7BD" opacity="0.7" />
      <circle className="vis-dot" cx="70" cy="200" r="5" fill="#E8650A" opacity="0.5" />

      {/* Feedback checks */}
      <g className="vis-check-group" transform="translate(312 102)">
        <circle r="13" fill="#E8F5E9" />
        <path d="M-4 1 L-1 4 L5-3" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="vis-check-group" transform="translate(86 306)">
        <circle r="11" fill="#E8F5E9" />
        <path d="M-3 1 L-1 3 L4-2" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Iteration arcs */}
      <path className="vis-arrow" d="M288 108 A 115 115 0 0 1 318 172" stroke="#7F77DD" strokeWidth="1.5" fill="none" opacity="0" strokeLinecap="round" />
      <path className="vis-arrow" d="M112 292 A 115 115 0 0 1 82 228" stroke="#E8650A" strokeWidth="1.5" fill="none" opacity="0" strokeLinecap="round" />

      {/* Sparkles */}
      <circle cx="138" cy="78" r="2" fill="#7F77DD" opacity="0.1" />
      <circle cx="318" cy="312" r="2" fill="#E8650A" opacity="0.1" />
    </svg>
  );
}

function MeasureVisual() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8650A" />
          <stop offset="100%" stopColor="#FF8533" />
        </linearGradient>
        <filter id="ds4" x="-25%" y="-15%" width="150%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="10" floodOpacity="0.06" />
        </filter>
      </defs>

      <circle cx="200" cy="220" r="160" fill="#E8650A" opacity="0.025" />

      {/* Grid lines */}
      <line x1="80" y1="320" x2="330" y2="320" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      <line x1="80" y1="260" x2="330" y2="260" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="80" y1="200" x2="330" y2="200" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="80" y1="140" x2="330" y2="140" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="4 4" />

      {/* Bars */}
      <rect className="vis-bar" x="100" y="250" width="28" height="70" rx="4" fill="#FFF3EB" />
      <rect className="vis-bar" x="148" y="210" width="28" height="110" rx="4" fill="#FFE0C4" />
      <rect className="vis-bar" x="196" y="175" width="28" height="145" rx="4" fill="#FFD4B0" />
      <rect className="vis-bar" x="244" y="145" width="28" height="175" rx="4" fill="#FF8533" />
      <rect className="vis-bar" x="292" y="110" width="28" height="210" rx="4" fill="url(#barGrad)" />

      {/* Trend line */}
      <path className="vis-trend" d="M114 240 C150 210,180 190,210 165 S265 128,306 100"
        stroke="#E8650A" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Trend endpoint glow */}
      <circle className="vis-dot" cx="306" cy="100" r="12" fill="#E8650A" opacity="0.12" />
      <circle className="vis-dot" cx="306" cy="100" r="5" fill="#E8650A" />

      {/* Success badge */}
      <g className="vis-success" transform="translate(306 58)">
        <circle r="20" fill="#E8F5E9" opacity="0.9" />
        <path className="vis-check" d="M-7 1 L-2 6 L8-5" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Metric cards */}
      <g className="vis-node" filter="url(#ds4)">
        <rect x="48" y="68" width="90" height="56" rx="10" fill="white" />
        <text x="64" y="88" fontFamily="Manrope, sans-serif" fontSize="9" fontWeight="600" fill="#aaa" letterSpacing="0.5">GROWTH</text>
        <text x="64" y="110" fontFamily="Manrope, sans-serif" fontSize="18" fontWeight="700" fill="#E8650A">+127%</text>
      </g>
      <g className="vis-node" filter="url(#ds4)">
        <rect x="262" y="340" width="90" height="56" rx="10" fill="white" />
        <text x="278" y="360" fontFamily="Manrope, sans-serif" fontSize="9" fontWeight="600" fill="#aaa" letterSpacing="0.5">SCALED</text>
        <text x="278" y="382" fontFamily="Manrope, sans-serif" fontSize="18" fontWeight="700" fill="#7F77DD">4.2x</text>
      </g>

      {/* Sparkles */}
      <circle cx="45" cy="305" r="2" fill="#E8650A" opacity="0.1" />
      <circle cx="358" cy="205" r="2" fill="#7F77DD" opacity="0.1" />
    </svg>
  );
}

const stepVisuals = [DiscoveryVisual, ScenarioVisual, PracticeVisual, MeasureVisual];

/* ═══════════════════════════════════════════════════════
   Per-Step SVG Animation Helper
   ═══════════════════════════════════════════════════════ */
function animateStepSVG(tl, stepEl, index, pos) {
  const vis = stepEl.querySelector(".journey-step-visual");
  if (!vis) return;

  switch (index) {
    /* Step 1: Card assembles, nodes pop in */
    case 0: {
      const card = vis.querySelector(".vis-card");
      const nodes = vis.querySelectorAll(".vis-node");
      const lines = vis.querySelectorAll(".vis-line");

      if (card) {
        tl.fromTo(card,
          { opacity: 0, scale: 0.82 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.4)" },
          pos + 0.1
        );
      }
      if (nodes.length) {
        tl.fromTo(nodes,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.2, stagger: 0.04, ease: "back.out(2)" },
          pos + 0.18
        );
      }
      if (lines.length) {
        tl.fromTo(lines,
          { opacity: 0 },
          { opacity: 0.25, duration: 0.2, stagger: 0.03 },
          pos + 0.24
        );
      }
      break;
    }

    /* Step 2: Cards stack in, bubbles appear */
    case 1: {
      const cards = vis.querySelectorAll(".vis-card");
      const bubbles = vis.querySelectorAll(".vis-bubble");
      const arrows = vis.querySelectorAll(".vis-arrow");
      const nodes = vis.querySelectorAll(".vis-node");

      if (cards.length) {
        tl.fromTo(cards,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.06, ease: "power3.out" },
          pos + 0.08
        );
      }
      if (bubbles.length) {
        tl.fromTo(bubbles,
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, duration: 0.2, stagger: 0.08, ease: "back.out(1.5)" },
          pos + 0.22
        );
      }
      if (arrows.length) {
        tl.fromTo(arrows,
          { opacity: 0 },
          { opacity: 0.35, duration: 0.2, stagger: 0.05 },
          pos + 0.28
        );
      }
      if (nodes.length) {
        tl.fromTo(nodes,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.15, stagger: 0.04, ease: "back.out(1.6)" },
          pos + 0.3
        );
      }
      break;
    }

    /* Step 3: Ring draws, dots orbit, checks pop */
    case 2: {
      const ring = vis.querySelector(".vis-ring");
      const dots = vis.querySelectorAll(".vis-dot");
      const checks = vis.querySelectorAll(".vis-check-group");
      const arrows = vis.querySelectorAll(".vis-arrow");

      if (ring) {
        const circ = 2 * Math.PI * 130;
        gsap.set(ring, { strokeDasharray: circ, strokeDashoffset: circ });
        tl.to(ring,
          { strokeDashoffset: circ * 0.25, duration: 0.45, ease: "power2.inOut" },
          pos + 0.1
        );
      }
      if (dots.length) {
        tl.fromTo(dots,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.18, stagger: 0.05, ease: "back.out(2)" },
          pos + 0.2
        );
      }
      if (checks.length) {
        tl.fromTo(checks,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.2, stagger: 0.08, ease: "back.out(1.8)" },
          pos + 0.32
        );
      }
      if (arrows.length) {
        tl.fromTo(arrows,
          { opacity: 0 },
          { opacity: 0.25, duration: 0.2, stagger: 0.06 },
          pos + 0.36
        );
      }
      break;
    }

    /* Step 4: Bars grow, trend draws, success badge */
    case 3: {
      const bars = vis.querySelectorAll(".vis-bar");
      const trend = vis.querySelector(".vis-trend");
      const dots = vis.querySelectorAll(".vis-dot");
      const success = vis.querySelector(".vis-success");
      const metricCards = vis.querySelectorAll(".vis-node");

      if (bars.length) {
        tl.fromTo(bars,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.3, stagger: 0.05, ease: "power3.out" },
          pos + 0.08
        );
      }
      if (trend) {
        const len = trend.getTotalLength ? trend.getTotalLength() : 250;
        gsap.set(trend, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(trend,
          { strokeDashoffset: 0, duration: 0.35, ease: "power2.inOut" },
          pos + 0.2
        );
      }
      if (dots.length) {
        tl.fromTo(dots,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.15, stagger: 0.04, ease: "back.out(2)" },
          pos + 0.32
        );
      }
      if (metricCards.length) {
        tl.fromTo(metricCards,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.2, stagger: 0.06, ease: "power2.out" },
          pos + 0.28
        );
      }
      if (success) {
        tl.fromTo(success,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(1.8)" },
          pos + 0.42
        );
      }
      break;
    }
    default:
      break;
  }
}

/* ═══════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════ */
export default function JourneyCollage() {
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);
  const indicatorFillRefs = useRef([]);
  const counterRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* Respect reduced-motion: show all steps statically */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stepRefs.current.forEach((s) => {
        if (s) gsap.set(s, { autoAlpha: 1 });
      });
      return;
    }

    const mm = gsap.matchMedia();

    /* ─── Desktop: Pinned Scroll Experience ─── */
    mm.add("(min-width: 969px)", () => {
      /* Hide all steps initially */
      stepRefs.current.forEach((s) => {
        if (s) gsap.set(s, { autoAlpha: 0 });
      });

      const scrollDist = window.innerHeight * 3.5;
      const numSteps = steps.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDist}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            /* Update step counter */
            const active = Math.min(
              Math.floor(self.progress * numSteps),
              numSteps - 1
            );
            if (counterRef.current) {
              counterRef.current.textContent = steps[active].number;
            }
          },
        },
      });

      for (let i = 0; i < numSteps; i++) {
        const step = stepRefs.current[i];
        if (!step) continue;

        const num = step.querySelector(".journey-step-num");
        const title = step.querySelector(".journey-step-title");
        const desc = step.querySelector(".journey-step-desc");
        const visual = step.querySelector(".journey-step-visual");
        const fill = indicatorFillRefs.current[i];
        const isLast = i === numSteps - 1;

        /* Enter position (slight overlap for crossfade) */
        const enterAt = i === 0 ? 0 : i - 0.05;

        /* Show container */
        tl.to(step, { autoAlpha: 1, duration: 0.01 }, enterAt);

        /* Number */
        tl.fromTo(num,
          { opacity: 0, y: 28, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power3.out" },
          enterAt
        );

        /* Title */
        tl.fromTo(title,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" },
          enterAt + 0.06
        );

        /* Description */
        tl.fromTo(desc,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
          enterAt + 0.12
        );

        /* Visual — scale + blur-to-focus */
        tl.fromTo(visual,
          { opacity: 0, scale: 0.88, filter: "blur(10px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.35, ease: "power2.out" },
          enterAt + 0.04
        );

        /* Progress indicator */
        if (fill) {
          tl.fromTo(fill,
            { width: "0%" },
            { width: "100%", duration: 0.6, ease: "none" },
            enterAt + 0.15
          );
        }

        /* Per-step SVG animations */
        animateStepSVG(tl, step, i, enterAt);

        /* ── Exit ── */
        if (!isLast) {
          const exitAt = i + 0.75;

          tl.to(num,
            { opacity: 0, y: -20, duration: 0.2, ease: "power2.in" },
            exitAt
          );
          tl.to(title,
            { opacity: 0, y: -16, duration: 0.2, ease: "power2.in" },
            exitAt + 0.02
          );
          tl.to(desc,
            { opacity: 0, y: -12, duration: 0.18, ease: "power2.in" },
            exitAt + 0.04
          );
          tl.to(visual,
            { opacity: 0, scale: 1.06, filter: "blur(6px)", duration: 0.22, ease: "power2.in" },
            exitAt
          );
          tl.to(step, { autoAlpha: 0, duration: 0.01 }, exitAt + 0.22);
        }
      }
    });

    /* ─── Mobile: Simple Scroll Reveals ─── */
    mm.add("(max-width: 968px)", () => {
      stepRefs.current.forEach((step) => {
        if (!step) return;

        const text = step.querySelector(".journey-step-text");
        const visual = step.querySelector(".journey-step-visual");

        if (text) {
          gsap.fromTo(text,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                end: "top 55%",
                scrub: 1,
              },
            }
          );
        }

        if (visual) {
          gsap.fromTo(visual,
            { opacity: 0, y: 28 },
            {
              opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
              scrollTrigger: {
                trigger: visual,
                start: "top 88%",
                end: "top 62%",
                scrub: 1,
              },
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  /* ─── Render ─── */
  return (
    <section className="journey-section" id="journey" ref={sectionRef}>
      {/* Persistent header */}
      <div className="journey-header">
        <span className="journey-label">Our Process</span>
        <h2 className="journey-heading">
          How we build
          <br />
          the journey
        </h2>
      </div>

      {/* Step blocks (stacked absolutely, GSAP controls visibility) */}
      <div className="journey-steps">
        {steps.map((step, i) => {
          const Visual = stepVisuals[i];
          return (
            <div
              className="journey-step"
              key={step.number}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
            >
              <div className="journey-step-text">
                <div className="journey-step-num">{step.number}</div>
                <h3 className="journey-step-title">{step.title}</h3>
                <p className="journey-step-desc">{step.description}</p>
              </div>
              <div className="journey-step-visual">
                <div className="journey-visual-wrapper">
                  <Visual />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress indicators */}
      <div className="journey-indicators">
        {steps.map((step, i) => (
          <div className="journey-indicator" key={step.number}>
            <div
              className="journey-indicator-fill"
              ref={(el) => {
                indicatorFillRefs.current[i] = el;
              }}
            />
          </div>
        ))}
        <span className="journey-step-counter">
          <span className="journey-counter-num" ref={counterRef}>
            01
          </span>{" "}
          / 0{steps.length}
        </span>
      </div>

      {/* Ambient glow orbs */}
      <div className="journey-ambient journey-ambient--1" />
      <div className="journey-ambient journey-ambient--2" />
    </section>
  );
}
