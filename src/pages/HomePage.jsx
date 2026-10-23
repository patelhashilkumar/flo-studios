import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import WorkSection from '../components/WorkSection'
import HomeServicesSpotlight from '../components/HomeServicesSpotlight'
import CapabilitiesSection from '../components/CapabilitiesSection'
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
        title="Flo Studios | Development Division (Primary Flagship) & Creator Systems"
        description="Flo Studios' primary flagship is our Development Division: partnering with venture-backed founders across the full build lifecycle, from strategy, UI/UX, and engineering to launch with zero broken handoffs. Secondarily backed by our Creator Division."
        canonicalUrl="https://www.flostudio.co/"
      />
      <Hero />
      <WorkSection />
      <HomeServicesSpotlight />
      <CapabilitiesSection />
      <Suspense fallback={<div style={{ minHeight: '380px', background: '#ffffff' }} />}>
        <WorkflowSection />
      </Suspense>
      <PurposeSection />
      <NewsSection />
    </motion.main>
  )
}
