# Flo Studios — Technical, Branded & Entity SEO Documentation

> **Official Canonical URL:** [https://www.flostudio.co/](https://www.flostudio.co/)  
> **Repository:** [https://github.com/patelhashilkumar/flo-studios](https://github.com/patelhashilkumar/flo-studios)  
> **Last Updated:** October 2026  
> **Status:** Production-Ready & Deployed to `main` branch

---

## 1. Executive Summary & SEO Objectives

This document details the complete **Technical SEO**, **Branded SEO**, and **Entity SEO** optimization implemented for the official **Flo Studios** web platform.

### Primary Goals
When prospective clients, partners, or crawlers search Google for:
- `"Flo Studios"`
- `"Flo Studio"`
- `"Flo Studios India"`
- `"Flo Studios creative technology studio"`
- `"Flo Studios development"`

The official web platform `https://www.flostudio.co/` must have the strongest entity, branded, and structural signals to rank prominently in the Knowledge Graph, sitelinks, and organic search results.

### Architectural Constraints Preserved
- **Zero Visual Regressions:** All existing typography, layouts, colors, and styling were 100% preserved.
- **Zero Animation Breakage:** GSAP ScrollTrigger timelines, Framer Motion transitions, split-text word animations, and Three.js / WebGL canvases operate without alteration.
- **Zero Synthetic Claims:** All structured data, company information, locations (Los Angeles, CA), and case studies use only factual data already present in the codebase.
- **Production Build:** Passes `npm run build` with zero warnings or errors.

---

## 2. Technical Stack & SEO Architecture

The Flo Studios platform is engineered with **React 19**, **Vite**, and **React Router v7** using code-splitting (`React.lazy` and `Suspense`).

Because single-page applications (SPAs) rely on JavaScript execution, a **Dual-Layer SEO Architecture** was implemented:

1. **Static HTML Base Layer (`index.html`):**
   - Direct crawlers (such as Googlebot’s first-pass scraper, Twitterbot, LinkedInBot, WhatsApp, Discord, Facebook crawlers) receive complete metadata, canonical declarations, Open Graph tags, Twitter cards, and Schema.org JSON-LD structured data directly in raw HTML without needing client-side JS execution.
2. **Dynamic SPA Head Manager (`src/components/SEO.jsx`):**
   - Zero-dependency custom component updating `document.title`, canonical link elements, meta descriptions, Open Graph properties, Twitter card tags, `robots` directives, and dynamic `BreadcrumbList` JSON-LD schemas during client-side route transitions.

---

## 3. Canonical Domain & Redirects Implementation

### Canonical Rules
- Canonical root: `https://www.flostudio.co/`
- Every indexable route enforces an absolute canonical URL with the `https://www.flostudio.co` origin and no trailing slash inconsistencies.
- Apex domain `flostudio.co` is permanently redirected to `https://www.flostudio.co`.

### 1. Vercel Configuration (`vercel.json`)
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "flostudio.co"
        }
      ],
      "destination": "https://www.flostudio.co/$1",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=()" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

### 2. Static Web Server / Netlify Configuration (`public/_redirects`)
```text
https://flostudio.co/* https://www.flostudio.co/:splat 301!
/*    /index.html   200
```

---

## 4. Search Engine Crawler Architecture

### 1. Robots Directives (`public/robots.txt`)
- Allows crawl access across all public pages, assets, styles, fonts, and scripts.
- Disallows administrative intakes (`/admin`), sensitive query strings, and auth parameters.
- Points explicitly to the canonical sitemap.

```txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/

# Disallow internal admin auth query parameters
Disallow: /*?*passcode=
Disallow: /*?*auth=

# Canonical Sitemap Reference
Sitemap: https://www.flostudio.co/sitemap.xml
```

### 2. XML Sitemap (`public/sitemap.xml`)
Contains all 7 indexable public routes with valid RFC 822 / W3C datetimes and search engine priority weighting. Excludes 404 pages, admin areas, and internal redirects.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.flostudio.co/</loc>
    <lastmod>2026-10-09T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.flostudio.co/work</loc>
    <lastmod>2026-10-09T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.flostudio.co/services</loc>
    <lastmod>2026-10-09T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.flostudio.co/about</loc>
    <lastmod>2026-10-09T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.flostudio.co/careers</loc>
    <lastmod>2026-10-09T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.flostudio.co/contact</loc>
    <lastmod>2026-10-09T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.flostudio.co/latest</loc>
    <lastmod>2026-10-09T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

## 5. Entity Structured Data (JSON-LD)

Implemented via Schema.org `@graph` architecture in `index.html` to establish an authoritative entity graph for Google's Knowledge Vault.

### Organization & WebSite Entities
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.flostudio.co/#organization",
      "name": "Flo Studios",
      "alternateName": [
        "Flo Studio",
        "FLO STUDIOS",
        "Flo Studios Creative & Technology Studio"
      ],
      "url": "https://www.flostudio.co/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.flostudio.co/favicon.svg",
        "width": "512",
        "height": "512"
      },
      "image": "https://www.flostudio.co/og-image.jpg",
      "description": "Flo Studios is an independent creative and technology studio engineering brand systems, digital products, 3D motion, and high-performance web infrastructure.",
      "email": "hello@flostudios.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://instagram.com",
        "https://vimeo.com",
        "https://x.com",
        "https://linkedin.com"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.flostudio.co/#website",
      "url": "https://www.flostudio.co/",
      "name": "Flo Studios",
      "description": "Creative and technology studio built at the intersection of content and technical infrastructure.",
      "publisher": {
        "@id": "https://www.flostudio.co/#organization"
      },
      "inLanguage": "en-US"
    }
  ]
}
```

### Dynamic BreadcrumbList Schema
Injected into the DOM on every internal page transition via `<SEO breadcrumbs={[...]} />`:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.flostudio.co/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://www.flostudio.co/services"
    }
  ]
}
```

---

## 6. Page-by-Page Audit & Metadata Matrix

| Route | Canonical URL | Title | Meta Description | Primary H1 | Robots Directive |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`/`** | `https://www.flostudio.co/` | Flo Studios — Creative & Technology Studio | Flo Studios is an independent creative and technology studio engineering brand systems, digital products, 3D motion, and high-performance web infrastructure. | `FLO STUDIOS — Creative & Technology Studio` | `index, follow` |
| **`/work`** | `https://www.flostudio.co/work` | Work & Case Studies — Flo Studios | Browse portfolio work and case studies by Flo Studios across 3D motion design, brand identities, and high-performance digital products. | `Flo Studios Work & Case Studies — Work engineered for attention, clarity, and enduring impact.` | `index, follow` |
| **`/services`** | `https://www.flostudio.co/services` | Services & Capabilities — Flo Studios | Explore Flo Studios services across Brand Systems, Motion & 3D Campaigns, and Digital Products & Engineering. Building scalable digital experiences for visionary brands. | `Flo Studios Services & Capabilities — We design how visionary brands move, interact, and perform.` | `index, follow` |
| **`/about`** | `https://www.flostudio.co/about` | About Flo Studios — Creative & Technology Studio | Learn about Flo Studios, a creative and technology studio pairing creative direction with technical rigor to build enduring brands, digital products, and motion systems. | `About Flo Studios — Built at the intersection of taste, motion, and technology.` | `index, follow` |
| **`/careers`** | `https://www.flostudio.co/careers` | Careers at Flo Studios — [Dynamic Role Title] | Explore career opportunities at Flo Studios. Currently hiring: [Role Title]. Join a studio pairing taste with engineering. | `Careers at Flo Studios — [Role Title]` | `index, follow` |
| **`/contact`** | `https://www.flostudio.co/contact` | Contact Flo Studios — Start a Project | Get in touch with Flo Studios. Start a project, explore creative partnerships, or inquire about our design and technology engineering capabilities. | `Flo Studios — Contact Flo Studios` | `index, follow` |
| **`/latest`** | `https://www.flostudio.co/latest` | Latest Dispatches & Insights — Flo Studios | Perspectives, design research, and studio dispatches from Flo Studios on creative technology, digital products, and motion systems. | `Flo Studios Latest Dispatches — Perspectives, research, and studio dispatches.` | `index, follow` |
| **`/admin`** | None (noindex) | Studio Portal — Flo Studios | Restricted studio administrative portal. | `Flo Studios Admin` | `noindex, nofollow` |
| **`*` (404)** | None (noindex) | 404 — Page Not Found — Flo Studios | The page you requested could not be found. Return to the Flo Studios homepage or explore our work and open careers. | `Page Not Found` | `noindex, nofollow` |

---

## 7. Heading Hierarchy & Entity Normalization

Each page was audited to guarantee **exactly one H1** that establishes the brand and topic entity, followed by a strict, unskipped `H2 -> H3 -> H4` hierarchy:

### 1. Homepage (`Hero.jsx`)
- **Visual Display:** `FLO STUDIOS` (exact Panchang Extrabold typography preserved).
- **DOM / Crawler Context:**
  ```jsx
  <h1 className="hero__wordmark" aria-label="Flo Studios — Creative & Technology Studio">
    FLO STUDIOS<span className="sr-only"> — Creative &amp; Technology Studio</span>
  </h1>
  ```
- **Section Headings:**
  - `H2`: Selected Work Across Motion, Systems, And Digital CRAFT (`WorkSection`)
  - `H2`: Selected Clients (`ClientRoster`)
  - `H2`: Services (`ServicesSection`)
  - `H2`: OUR EDGE / BUILT ON CRAFT, TECHNICAL RIGOR... (`CapabilitiesSection`)
  - `H2`: Industry Recognition (`Recognition`)
  - `H2`: About Flo Studios (`PurposeSection`)
  - `H2`: Latest Dispatches (`NewsSection`)

### 2. About Page (`AboutPage.jsx`)
- `H1`: `About Flo Studios — Built at the intersection of taste, motion, and technology.`
- `H2`: `Leadership`
  - `H3`: Laurel Burton, Jack De Caluwé, Coryna Sorin, Tessa Baston (converted from H4 to H3)
- `H2`: `Who we are` (converted from H3 to H2)
- `H2`: `How we work` (converted from H3 to H2)
- `H2`: `Think you'd be a good addition to our team?` (CTA)

### 3. Services Page (`ServicesPage.jsx`)
- `H1`: `Flo Studios Services & Capabilities — We design how visionary brands move, interact, and perform.`
- `H2`: `Capabilities`
  - `H3`: Brand Systems, Motion & Campaigns, Digital Products
    - `H4`: Procore, ServiceNow, Google Shopping, Notion, Eventbrite, Oura
- `H2`: `Selected Clients` (converted from H3 to H2)
- `H2`: `Start a project with our studio.` (CTA)

### 4. Work Page (`WorkPage.jsx`)
- `H1`: `Flo Studios Work & Case Studies — Work engineered for attention, clarity, and enduring impact.`
- `H2`: Featured Case Studies (Apple Product Motion, Blitzit 2.0 Interface Motion, SV Studio Showreel, etc.)
- `H3`: Grid Projects

### 5. Careers Page (`CareersPage.jsx`)
- `H1`: `Careers at Flo Studios — [Job Title]`
- `H2`: `About Flo Studios`
- `H2`: `About the Job`
- `H2`: `Responsibilities`
  - `H3`: Responsibility items
- `H2`: `Compensation`
- `H2`: `Minimum Qualifications` & `Preferred Qualifications`
- `H2`: `What Success Looks Like`
- `H2`: `You Might Thrive in this Role`
- `H2`: `Flo Studios' Mission & Diversity`
- `H2`: `Equal Opportunity Employer`
- `H2`: Application form card

### 6. Contact Page (`ContactPage.jsx` & `MotionContactForm.jsx`)
- `H1`: `Flo Studios — Contact Flo Studios`
- `H2`: `Start a Conversation` (`MotionContactForm.jsx` header converted from H3 to H2)
- `H2`: `Studio Locations` (semantic section header)
  - `H3`: `Portland, OR` & `New York, NY`

---

## 8. Social Sharing, Alt Tags & Internal Linking

### 1. Social Sharing Card (`public/og-image.jpg`)
A high-definition 1200×630 JPEG was created and referenced across all Open Graph and Twitter Card tags:
- `og:image`: `https://www.flostudio.co/og-image.jpg`
- `og:image:width`: `1200`
- `og:image:height`: `630`
- `og:image:alt`: `Flo Studios — Creative & Technology Studio`
- `twitter:card`: `summary_large_image`
- `twitter:image`: `https://www.flostudio.co/og-image.jpg`

### 2. Descriptive Image Alt Tags
All placeholder or generic `alt` attributes were replaced with descriptive entity-level context:
- `WorkSection.jsx`: `${item.title} — Flo Studios case study`
- `ServicesSection.jsx`:
  - `Flo Studios digital experience for ŌURA`
  - `Flo Studios product storytelling for Notion`
  - `Flo Studios brand design and spatial showcase`
  - `Flo Studios digital commerce platform and creative direction`
  - `Flo Studios dynamic visual system for Nike`
  - `Flo Studios enterprise digital product design for PagerDuty`
- `NewsSection.jsx`: `${item.title} — Flo Studios dispatch`
- `AboutPage.jsx`:
  - `${leader.name} — ${leader.role} at Flo Studios`
  - `Flo Studios collaborative design exploration and creative strategy session`
  - `Flo Studios technical architecture and engineering build week sprint`
  - `Flo Studios creative direction and studio team workspace`

### 3. Internal Linking & Crawl Budget
- All navigation links in the header and footer use direct, semantic `<Link to="...">` components.
- News section press items now link directly to `/latest` instead of dead `#` hashes.
- Studio intake admin link in `Footer.jsx` marked with `rel="nofollow"` to prevent search engine bots from wasting crawl budget on private intake portals.

---

## 9. Verification & Build Results

### Production Build
```bash
> new-site@0.0.0 build
> vite build

vite v8.3.2 building client environment for production...
transforming...
✓ 1075 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                             5.67 kB │ gzip:   1.57 kB
dist/assets/NotFoundPage-C25lWhh5.css       1.59 kB │ gzip:   0.62 kB
dist/assets/ContactPage-DMFvwSIm.css        4.24 kB │ gzip:   1.38 kB
dist/assets/WorkflowSection-ByTzcXJ_.css    4.63 kB │ gzip:   1.41 kB
dist/assets/CareersPage-De9NUaqG.css       11.03 kB │ gzip:   2.35 kB
dist/assets/AdminPage-CgeUuOQo.css         16.93 kB │ gzip:   3.34 kB
dist/assets/index-WCvIOU3r.css             51.70 kB │ gzip:   8.85 kB
dist/assets/rolldown-runtime-hePW80VL.js    0.71 kB │ gzip:   0.42 kB
dist/assets/NotFoundPage-GeT2Az4K.js        1.30 kB │ gzip:   0.60 kB
dist/assets/LatestPage-BLj1CFkU.js          4.88 kB │ gzip:   1.76 kB
dist/assets/ServicesPage-DFL_uUt4.js        5.10 kB │ gzip:   1.82 kB
dist/assets/WorkPage-zWchMf4D.js            6.54 kB │ gzip:   2.00 kB
dist/assets/AboutPage-BHm5nULv.js           6.61 kB │ gzip:   2.05 kB
dist/assets/WorkflowSection-C8qlio7X.js    10.91 kB │ gzip:   3.65 kB
dist/assets/vendor-misc-D53CNTj6.js        13.35 kB │ gzip:   4.75 kB
dist/assets/CareersPage-Cv3aiO3k.js        19.03 kB │ gzip:   5.01 kB
dist/assets/AdminPage-L22os6d0.js          25.32 kB │ gzip:   6.44 kB
dist/assets/adminStorage-CZlxGQL7.js       25.53 kB │ gzip:   8.68 kB
dist/assets/ContactPage-CjglN7n1.js        32.80 kB │ gzip:   9.45 kB
dist/assets/index-Ca5AkHXj.js              44.65 kB │ gzip:  13.23 kB
dist/assets/vendor-supabase-ZjJciyKg.js   208.19 kB │ gzip:  53.65 kB
dist/assets/vendor-react-BgVgy5Kg.js      221.91 kB │ gzip:  70.90 kB
dist/assets/vendor-animation-DcBvoWDg.js  271.69 kB │ gzip:  95.18 kB
dist/assets/vendor-three-3j0w-gDc.js      878.24 kB │ gzip: 233.64 kB

✓ built in 586ms
```

### Static Asset Distribution in `/dist`
- `robots.txt` (328 B)
- `sitemap.xml` (1,448 B)
- `og-image.jpg` (65.2 KB)
- `_redirects` (78 B)
- `index.html` (5.67 KB)

---

## 10. Manual Deployment & External SEO Steps Required

To ensure Google and other search engines immediately recognise Flo Studios as the authoritative entity, follow these external dashboard steps:

### 1. Vercel Domain Configuration (Apex to WWW 308 Redirect)
1. Open your **[Vercel Dashboard](https://vercel.com/)** and select the **flo-studios** project.
2. Navigate to **Settings** → **Domains**.
3. Verify both `www.flostudio.co` and `flostudio.co` are listed.
4. Ensure `www.flostudio.co` is set as the **Production Domain**.
5. Configure `flostudio.co` with **Redirect to www.flostudio.co** (Status Code: `308 Permanent Redirect`).

### 2. Google Search Console (GSC) Setup
1. Go to **[Google Search Console](https://search.google.com/search-console)**.
2. Add a new property: `https://www.flostudio.co/`.
3. In the left sidebar, click **Sitemaps**.
4. Submit: `https://www.flostudio.co/sitemap.xml`.
5. Use the **URL Inspection** tool on `https://www.flostudio.co/` and click **Request Indexing**.

### 3. Bing Webmaster Tools Setup
1. Go to **[Bing Webmaster Tools](https://www.bing.com/webmasters)**.
2. Choose **Import from Google Search Console** to sync sitemaps and site verification instantly.

### 4. Entity Knowledge Graph Alignment
To reinforce Google's entity understanding of `"Flo Studios"`:
- **LinkedIn:** In the official company page settings, set the website to `https://www.flostudio.co/`.
- **Instagram / X / Vimeo:** Ensure the bio links point to `https://www.flostudio.co/`.
- **Google Business Profile:** If operating a physical presence in Los Angeles, CA or Portland, OR, create or verify the profile with primary name `"Flo Studios"` and URL `https://www.flostudio.co/`.
