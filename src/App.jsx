import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './App.css'

import ServicesSection from './ServicesSection'
import ProofOfWork from './ProofOfWork'
import SkillsShowcase from './SkillsShowcase'
import WorkflowSection from './WorkflowSection'
import Footer from './Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const logoRef = useRef(null)
  const containerRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis for ultra-smooth scrolling
    const lenis = new Lenis({
      duration: 1.8,       // Slower = more cinematic
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    
    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    };
    gsap.ticker.add(updateLenis)
    
    gsap.ticker.lagSmoothing(0)

    // Use gsap.context to properly clean up in React 18+ strict mode
    let ctx = gsap.context(() => {
      // Initial positioning for center
      gsap.set(logoRef.current, { xPercent: -50, yPercent: -50, willChange: "transform, opacity" })

      // GSAP ScrollTrigger Animation — Logo zoom
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2.5, // Slightly slower scrub for even more smoothness
        }
      })

      tl.to(logoRef.current, {
        scale: 30,
        opacity: 0,
        letterSpacing: "10px", // Letters spread as it zooms
        ease: "power2.in"
      })

      // Scroll indicator fade out on scroll
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "5% top",
            scrub: 1.5,
          }
        })
      }

      // Gradient orbs parallax — they drift upward as user scrolls
      gsap.utils.toArray('.hero-gradient-orb').forEach((orb, i) => {
        gsap.to(orb, {
          y: -(100 + i * 60),
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "70% top",
            scrub: 2,
          }
        })
      })
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(updateLenis)
      ctx.revert()
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <div className="container" ref={containerRef}>
        <div className="scroll-space"></div>

        {/* Ambient gradient orbs */}
        <div className="hero-gradient-orb hero-gradient-orb--orange" />
        <div className="hero-gradient-orb hero-gradient-orb--purple" />
        <div className="hero-gradient-orb hero-gradient-orb--teal" />

        {/* Dot grid pattern */}
        <div className="hero-grid-pattern" />

        <h1 className="logo" ref={logoRef}>
          Flo Studios
        </h1>

        {/* Scroll indicator */}
        <div className="scroll-indicator" ref={scrollIndicatorRef}>
          <div className="scroll-indicator__mouse">
            <div className="scroll-indicator__dot"></div>
          </div>
          <span className="scroll-indicator__text">Scroll</span>
        </div>
      </div>

      {/* Gradient transition to content */}
      <div className="section-transition" />

      {/* 1. Services */}
      <ServicesSection />

      {/* Seamless blend */}
      <div className="section-blend section-blend--white-to-white" />

      {/* 2. Proof of Work */}
      <ProofOfWork />

      {/* Seamless blend */}
      <div className="section-blend section-blend--white-to-white" />

      {/* 3. Practice Your (Skills Showcase) */}
      <SkillsShowcase />

      {/* Seamless blend into workflow */}
      <div className="section-blend section-blend--white-to-white" />

      {/* 4. Workflow (3D Journey) */}
      <WorkflowSection />

      {/* Spacer to give breathing room after the 3D pin ends */}
      <div style={{ height: '25vh' }} />

      {/* 6. Footer */}
      <Footer />
    </>
  )
}

export default App