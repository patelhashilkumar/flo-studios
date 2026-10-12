import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import WorkSection from '../components/WorkSection'
import HomeServicesSpotlight from '../components/HomeServicesSpotlight'
import CapabilitiesSection from '../components/CapabilitiesSection'
import Recognition from '../components/Recognition'
import PurposeSection from '../components/PurposeSection'
import NewsSection from '../components/NewsSection'

// Lazy-load the heavy 3D canvas (Three.js / React Three Fiber) below the fold
const WorkflowSection = lazy(() => import('../WorkflowSection'))

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

export default function HomePage() {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Flo Studios — Dual-Engine Media & Development Hub"
        description="Flo Studios is a progressive dual-engine media and development hub built to scale digital exposure and authority for high-impact creators and venture-backed startups and businesses. Primary focus: Development Division (Full Build Lifecycle)."
        canonicalUrl="https://www.flostudio.co/"
      />
      <Hero />
      <WorkSection />
      <HomeServicesSpotlight />
      <CapabilitiesSection />
      <Suspense fallback={<div style={{ minHeight: '380px', background: '#ffffff' }} />}>
        <WorkflowSection />
      </Suspense>
      <Recognition />
      <PurposeSection />
      <NewsSection />
    </motion.main>
  )
}
