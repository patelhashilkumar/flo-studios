import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import WorkSection from '../components/WorkSection'
import ClientRoster from '../components/ClientRoster'
import ServicesSection from '../components/ServicesSection'
import CapabilitiesSection from '../components/CapabilitiesSection'
import WorkflowSection from '../WorkflowSection'
import Recognition from '../components/Recognition'
import PurposeSection from '../components/PurposeSection'
import NewsSection from '../components/NewsSection'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

export default function HomePage() {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Hero />
      <WorkSection />
      <ClientRoster />
      <ServicesSection />
      <CapabilitiesSection />
      <WorkflowSection />
      <Recognition />
      <PurposeSection />
      <NewsSection />
    </motion.main>
  )
}
