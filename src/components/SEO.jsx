import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const CANONICAL_DOMAIN = 'https://www.flostudio.co'
const DEFAULT_IMAGE = `${CANONICAL_DOMAIN}/og-image.jpg`

/**
 * ══════════════════════════════════════════════════════════════════
 * FLO STUDIOS — PRODUCTION SEO & ENTITY METADATA COMPONENT
 * Handles page title, meta description, canonical URLs,
 * Open Graph, Twitter Cards, robots indexing, and JSON-LD schemas.
 * ══════════════════════════════════════════════════════════════════
 */
export default function SEO({
  title = 'Flo Studios — Creative & Technology Studio',
  description = 'Flo Studios is an independent creative and technology studio engineering brand systems, digital products, 3D motion, and high-performance web infrastructure.',
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  noindex = false,
  breadcrumbs = null,
  schema = null
}) {
  const location = useLocation()
  const pageCanonical = canonicalUrl || `${CANONICAL_DOMAIN}${location.pathname === '/' ? '' : location.pathname}`

  useEffect(() => {
    // 1. Page Title
    if (title) {
      document.title = title
    }

    // Helper function to update or create meta tags
    const setMeta = (attrName, attrValue, content) => {
      if (!content && content !== '') return
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attrName, attrValue)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // 2. Primary Meta Description & Title
    setMeta('name', 'title', title)
    setMeta('name', 'description', description)
    setMeta(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    )

    // 3. Absolute Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', pageCanonical)

    // 4. Open Graph Meta Tags
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', pageCanonical)
    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:site_name', 'Flo Studios')
    setMeta('property', 'og:locale', 'en_US')

    // 5. Twitter / X Meta Tags
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)
    setMeta('name', 'twitter:url', pageCanonical)

    // 6. Dynamic JSON-LD Structured Data Injection
    const scriptId = 'flo-route-schema'
    let scriptEl = document.getElementById(scriptId)

    if (breadcrumbs || schema) {
      try {
        if (!scriptEl) {
          scriptEl = document.createElement('script')
          scriptEl.id = scriptId
          scriptEl.type = 'application/ld+json'
          document.head.appendChild(scriptEl)
        }

        const schemas = []
        if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
          schemas.push({
            '@type': 'BreadcrumbList',
            'itemListElement': breadcrumbs.map((crumb, index) => {
              const rawUrl = String(crumb?.item || crumb?.url || '')
              const fullUrl = rawUrl.startsWith('http')
                ? rawUrl
                : `${CANONICAL_DOMAIN}${rawUrl ? (rawUrl.startsWith('/') ? '' : '/') + rawUrl : ''}`
              return {
                '@type': 'ListItem',
                'position': index + 1,
                'name': crumb?.name || '',
                'item': fullUrl
              }
            })
          })
        }

        if (schema) {
          if (Array.isArray(schema)) {
            schemas.push(...schema)
          } else {
            schemas.push(schema)
          }
        }

        scriptEl.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': schemas
        })
      } catch (err) {
        console.warn('Flo Studios SEO Schema Generation Warning:', err)
      }
    } else if (scriptEl) {
      scriptEl.remove()
    }
  }, [title, description, pageCanonical, ogType, ogImage, noindex, breadcrumbs, schema])

  return null
}
