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

// Lazy-loaded secondary routes for ultra-fast initial page load
const WorkPage = lazy(() => import('./pages/WorkPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const LatestPage = lazy(() => import('./pages/LatestPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

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