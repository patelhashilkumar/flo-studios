import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import ServicesSection from '../components/ServicesSection'
import { DIVISIONS, getDivisionById } from '../data/divisionsData'
import './Pages.css'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export default function ServicesPage() {
  const [searchParams] = useSearchParams()
  const rawDivision = searchParams.get('division')
  const initialDivision = rawDivision ? getDivisionById(rawDivision)?.id : 'development'

  const devDivision = DIVISIONS.find((d) => d.id === 'development') || DIVISIONS[0]
  const creatorDivision = DIVISIONS.find((d) => d.id === 'creator') || DIVISIONS[1]

  const servicesSchema = useMemo(
    () => [
      {
        '@type': 'Service',
        '@id': 'https://www.flostudio.co/services#development',
        name: `${devDivision.name} (${devDivision.badge})`,
        serviceType: 'Full Build Lifecycle & Product Engineering',
        provider: {
          '@type': 'Organization',
          name: 'Flo Studios',
          url: 'https://www.flostudio.co/'
        },
        description: devDivision.whatWeDo.solution,
        offers: {
          '@type': 'Offer',
          description: devDivision.oneLineSummary
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: devDivision.pipelineTitle,
          itemListElement: devDivision.stages.map((stage, idx) => ({
            '@type': 'Offer',
            position: idx + 1,
            name: `${stage.number} - ${stage.title}`,
            description: stage.description
          }))
        }
      },
      {
        '@type': 'Service',
        '@id': 'https://www.flostudio.co/services#creator',
        name: `${creatorDivision.name} (Secondary Division)`,
        serviceType: 'Creator Growth Systems & Media Production',
        provider: {
          '@type': 'Organization',
          name: 'Flo Studios',
          url: 'https://www.flostudio.co/'
        },
        description: creatorDivision.whatWeDo.solution,
        offers: {
          '@type': 'Offer',
          description: creatorDivision.oneLineSummary
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: creatorDivision.pipelineTitle,
          itemListElement: creatorDivision.stages.map((stage, idx) => ({
            '@type': 'Offer',
            position: idx + 1,
            name: `${stage.number} - ${stage.title}`,
            description: stage.description
          }))
        }
      }
    ],
    [devDivision, creatorDivision]
  )

  return (
    <motion.main className="services-page" variants={pageV} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Services | Development Division (Primary Flagship) & Creator Systems | Flo Studios"
        description="Flo Studios' primary flagship is our Development Division: partnering with venture-backed founders across the full 11-stage build lifecycle, from strategy, UI/UX, and engineering to launch with zero broken handoffs. Secondarily offering end-to-end Creator Division growth pipelines."
        canonicalUrl="https://www.flostudio.co/services"
        breadcrumbs={[
          { name: 'Home', item: 'https://www.flostudio.co/', url: 'https://www.flostudio.co/' },
          { name: 'Services & Divisions', item: 'https://www.flostudio.co/services', url: 'https://www.flostudio.co/services' },
        ]}
        schema={servicesSchema}
      />


      {/* Interactive Two-Division Services Engine */}
      <ServicesSection defaultDivision={initialDivision} id="services-divisions" />
    </motion.main>
  )
}
