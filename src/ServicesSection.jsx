import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServicesSection.css";

gsap.registerPlugin(ScrollTrigger);

const servicesData = {
  creator: {
    title: "Creator Growth",
    description: "End-to-end strategy and execution to scale your audience and refine your content.",
    items: [
      "Ideation",
      "Scripting",
      "Video refinement in post production",
      "Distribution",
      "A/B testing",
      "Analysis",
      "Growth strategies"
    ]
  },
  tech: {
    title: "AI & Web Development",
    description: "Building robust, scalable, and beautifully designed digital experiences.",
    items: [
      "Web Design & Development",
      "Web Application Development",
      "App Design & Development",
      "Web performance optimization",
      "CMS setup",
      "Web support"
    ]
  }
};

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const listItems1Ref = useRef([]);
  const listItems2Ref = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          }
        }
      );

      // Subtitle stagger
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Card 1 animation — slide up with scale
      gsap.fromTo(card1Ref.current,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: card1Ref.current,
            start: "top 85%",
          }
        }
      );

      // Card 1 list items stagger
      gsap.fromTo(listItems1Ref.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
          scrollTrigger: {
            trigger: card1Ref.current,
            start: "top 70%",
          }
        }
      );

      // Card 2 animation — slide up with scale (slight delay)
      gsap.fromTo(card2Ref.current,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.15, ease: "power3.out",
          scrollTrigger: {
            trigger: card2Ref.current,
            start: "top 85%",
          }
        }
      );

      // Card 2 list items stagger
      gsap.fromTo(listItems2Ref.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
          scrollTrigger: {
            trigger: card2Ref.current,
            start: "top 70%",
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="services-bg-grid" />
      <div className="services-ambient services-ambient-1" />
      <div className="services-ambient services-ambient-2" />

      <div className="services-header" ref={headerRef}>
        <span className="services-label">WHAT WE DO</span>
        <h2 className="services-title">Services</h2>
        <p className="services-subtitle" ref={subtitleRef}>
          We bring together creative strategy and cutting-edge technology to build experiences that grow brands.
        </p>
      </div>

      <div className="services-grid">
        {/* Creator Growth Card */}
        <div className="service-card service-card--creator" ref={card1Ref}>
          <div className="service-card-bg" />
          
          <div className="service-card-icon">
            <svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
          </div>

          <h3 className="service-card-title">{servicesData.creator.title}</h3>
          <p className="service-card-desc">{servicesData.creator.description}</p>
          
          <ul className="service-list">
            {servicesData.creator.items.map((item, i) => (
              <li 
                key={i} 
                className="service-item"
                ref={el => listItems1Ref.current[i] = el}
              >
                <span className="service-item-num">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                {item}
                <span className="service-item-arrow">→</span>
              </li>
            ))}
          </ul>

          <button className="service-card-cta">
            Explore Creator Services
            <span className="service-card-cta-arrow">→</span>
          </button>
        </div>

        {/* Tech / Web Dev Card */}
        <div className="service-card service-card--tech" ref={card2Ref}>
          <div className="service-card-bg" />
          
          <div className="service-card-icon">
            <svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
          </div>

          <h3 className="service-card-title">{servicesData.tech.title}</h3>
          <p className="service-card-desc">{servicesData.tech.description}</p>
          
          <ul className="service-list">
            {servicesData.tech.items.map((item, i) => (
              <li 
                key={i} 
                className="service-item"
                ref={el => listItems2Ref.current[i] = el}
              >
                <span className="service-item-num">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                {item}
                <span className="service-item-arrow">→</span>
              </li>
            ))}
          </ul>

          <button className="service-card-cta">
            Explore Tech Services
            <span className="service-card-cta-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
