import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

// Page imports
import WhyFloStudios from './pages/WhyFloStudios.jsx'
import WhoDidThis from './pages/WhoDidThis.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CareersPage from './pages/CareersPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import TryNowPage from './pages/TryNowPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import GDPRPage from './pages/GDPRPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import JobPortalPage from './pages/JobPortalPage.jsx'

// Suppress known Three.js deprecation warnings from library internals
const _warn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && (
    args[0].includes('THREE.Clock') ||
    args[0].includes('X4122')
  )) return;
  _warn.apply(console, args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/why-flo-studios" element={<WhyFloStudios />} />
          <Route path="/who-did-this" element={<WhoDidThis />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/try-now" element={<TryNowPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/gdpr" element={<GDPRPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/jobs" element={<JobPortalPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
