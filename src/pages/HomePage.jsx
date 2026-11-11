import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import WorkSection from '../components/WorkSection'
import HomeServicesSpotlight from '../components/HomeServicesSpotlight'
import CapabilitiesSection from '../components/CapabilitiesSection'
import PurposeSection from '../components/PurposeSection'
import NewsSection from '../components/NewsSection'

// Lazy-load the heavy 3D canvas (Three.js / React Three Fiber) below the fold with idle preloading
const loadWorkflowSection = () => import('../WorkflowSection')
const WorkflowSection = lazy(loadWorkflowSection)

function WorkflowSkeleton() {
  return (
    <section className="workflow-section workflow-section--loading" aria-busy="true" aria-label="Loading interactive workflow">
      <div className="workflow-ui">
        <div className="workflow-header">
          <h2 className="workflow-title">The Journey</h2>
          <p className="workflow-desc">
            How Flo Studios brings cinematic motion and 3D from concept to global launch.
          </p>
        </div>
      </div>
      <div className="workflow-canvas-container workflow-skeleton-loader">
        <div className="workflow-skeleton-pulse" />
      </div>
    </section>
  )
}

function DeferredWorkflowSection() {
  const [shouldRender, setShouldRender] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    // 1. Kick off network prefetch in idle time so Three.js bundle is cached in browser
    //    before the user scrolls down to this section
    const prefetch = () => {
      loadWorkflowSection()
    }
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 2500 })
      return () => window.cancelIdleCallback(id)
    } else {
      const timer = setTimeout(prefetch, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setShouldRender(true)
      return
    }

    // 2. High 1000px rootMargin triggers mount well ahead of entering viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '1000px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      {shouldRender ? (
        <Suspense fallback={<WorkflowSkeleton />}>
          <WorkflowSection />
        </Suspense>
      ) : (
        <WorkflowSkeleton />
      )}
    </div>
  )
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

export default function HomePage() {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Flo Studios"
        description="Flo Studios' primary flagship is our Development Division: partnering with venture-backed founders across the full build lifecycle, from strategy, UI/UX, and engineering to launch with zero broken handoffs. Secondarily backed by our Creator Division."
        canonicalUrl="https://www.flostudio.co/"
      />
      <Hero />
      <WorkSection />
      <HomeServicesSpotlight />
      <CapabilitiesSection />
      <DeferredWorkflowSection />
      <PurposeSection />
      <NewsSection />
    </motion.main>
  )
}
