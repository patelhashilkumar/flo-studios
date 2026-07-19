import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SkillsShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { name: "innovation", style: "light" },
  { name: "passion", style: "dark" },
  { name: "finance", style: "light" },
  { name: "leadership", style: "dark" },
  { name: "recruiting", style: "light" },
  { name: "marketing", style: "dark" },
  { name: "sales", style: "light" },
  { name: "project management", style: "dark" },
  { name: "DEI", style: "light" },
  { name: "product launch", style: "light" },
  { name: "strategy", style: "dark" },
  { name: "analytics", style: "light" },
];

export default function SkillsShowcase() {
  const sectionRef = useRef(null);
  const bigTextRef = useRef(null);
  const arrowRef = useRef(null);
  const tagsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ctx = gsap.context(() => {
      // Big text slides in from left
      gsap.fromTo(bigTextRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        }
      );

      // Arrow draws in
      if (arrowRef.current) {
        gsap.fromTo(arrowRef.current,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1, scaleX: 1, duration: 0.8, delay: 0.5, ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            }
          }
        );
      }

      // Tags scatter in from random directions
      tagsRef.current.forEach((tag, i) => {
        if (!tag) return;
        
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = 100 + Math.random() * 100;
        const randomRotate = (Math.random() - 0.5) * 30;

        gsap.fromTo(tag,
          { 
            opacity: 0, 
            y: randomY, 
            x: randomX,
            rotation: randomRotate,
            scale: 0.5
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotation: 0, // CSS handles final rotation via nth-child
            scale: 1,
            duration: 0.8 + Math.random() * 0.4,
            delay: 0.6 + i * 0.07,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
            }
          }
        );
      });

      // Subtle parallax on tags as you scroll past
      gsap.to(tagsRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="skills-section" id="expertise" ref={sectionRef}>
      <div className="skills-inner">
        {/* Left: Big Typography */}
        <div className="skills-left" ref={bigTextRef}>
          <div className="skills-big-text">
            <span>practice</span>
            <span>your</span>

            {/* Sparkle decorations */}
            <span className="sparkle sparkle-1">✦</span>
            <span className="sparkle sparkle-2">✦</span>
            <span className="sparkle sparkle-3">✧</span>
          </div>

          {/* Sketchy Hand-drawn Arrow */}
          <div className="skills-arrow" ref={arrowRef}>
            <svg viewBox="0 0 220 150" className="sketchy-arrow-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8">
                  <path d="M-1,1 l2,-2 M0,8 l8,-8 M7,9 l2,-2" stroke="#3a3a3a" strokeWidth="1.5" strokeLinecap="square" />
                </pattern>
              </defs>
              <g transform="translate(15, 5)">
                {/* 3D Extrusion/Shadow */}
                <path d="M 20 90 C 50 40, 110 40, 140 60 L 130 25 L 190 75 L 135 125 L 140 85 C 110 70, 60 70, 30 110 Z" 
                      fill="url(#hatch)" stroke="#3a3a3a" strokeWidth="2.5" strokeLinejoin="round" 
                      transform="translate(-6, 12)" />
                {/* Main Red Arrow */}
                <path d="M 20 90 C 50 40, 110 40, 140 60 L 130 25 L 190 75 L 135 125 L 140 85 C 110 70, 60 70, 30 110 Z" 
                      fill="#d84339" stroke="#3a3a3a" strokeWidth="2.5" strokeLinejoin="round" />
                {/* Highlight inside */}
                <path d="M 35 82 C 60 48, 105 48, 130 62" 
                      fill="none" stroke="#ff7369" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </div>

        {/* Right: Scattered Tags */}
        <div className="skills-right">
          {skillsData.map((skill, i) => (
            <div
              key={skill.name}
              className={`skill-tag skill-tag--${skill.style}`}
              ref={el => tagsRef.current[i] = el}
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
