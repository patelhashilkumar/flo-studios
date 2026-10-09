import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/HomePage'
import './pages/Pages.css'

// Resilient lazy-loaded secondary routes: auto-reloads if browser attempts to load stale deployment chunk
function lazyWithRetry(componentImport) {
  return lazy(async () => {
    try {
      return await componentImport()
    } catch (error) {
      const alreadyRefreshed = sessionStorage.getItem('flo_chunk_retry')
      if (!alreadyRefreshed) {
        sessionStorage.setItem('flo_chunk_retry', 'true')
        window.location.reload()
        return { default: () => null }
      }
      sessionStorage.removeItem('flo_chunk_retry')
      throw error
    }
  })
}

const WorkPage = lazyWithRetry(() => import('./pages/WorkPage'))
const AboutPage = lazyWithRetry(() => import('./pages/AboutPage'))
const ServicesPage = lazyWithRetry(() => import('./pages/ServicesPage'))
const LatestPage = lazyWithRetry(() => import('./pages/LatestPage'))
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage'))
const CareersPage = lazyWithRetry(() => import('./pages/CareersPage'))
const AdminPage = lazyWithRetry(() => import('./pages/AdminPage'))
const NotFoundPage = lazyWithRetry(() => import('./pages/NotFoundPage'))

function RouteFallback() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '24px', height: '24px', border: '2px solid rgba(0,0,0,0.08)', borderTopColor: '#000000', borderRadius: '50%', animation: 'flo-spin 0.6s linear infinite' }} />
      <style>{`@keyframes flo-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <ErrorBoundary>
      <SmoothScroll>
        <ScrollToTop />
        <Header />
        <AnimatePresence mode="wait">
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/latest" element={<LatestPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />

              {/* Common Alias Redirects */}
              <Route path="/career" element={<Navigate to="/careers" replace />} />
              <Route path="/jobs" element={<Navigate to="/careers" replace />} />
              <Route path="/job" element={<Navigate to="/careers" replace />} />
              <Route path="/apply" element={<Navigate to="/careers" replace />} />

              {/* 404 Catch-All Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
        <Footer />
      </SmoothScroll>
    </ErrorBoundary>
  )
}