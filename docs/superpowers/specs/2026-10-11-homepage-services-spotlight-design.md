# Homepage Editorial Services Spotlight Section Design

**Date:** 2026-10-11  
**Author:** Hashil & Antigravity  
**Status:** Approved  

---

## 1. Overview & Context

On the homepage (`src/pages/HomePage.jsx`), the current services section renders the full, heavy 11-stage and 8-stage lifecycle pipelines along with problem/solution cards. While comprehensive, having this full multi-stage breakdown directly on the homepage occupies significant vertical space and duplicates what belongs on the dedicated `/services` page.

The user requested:
- Replace the big services section on the **homepage only** with an editorial two-column spotlight section matching the reference design pattern (inspired by Instrument.com), but with a clean white background instead of lime green.
- On the left side: include the pill toggle button (`01 / DEVELOPMENT DIVISION (PRIMARY)` vs `02 / CREATOR & CONTENT DIVISION`) to switch between divisions, followed by an editorial headline, descriptive paragraph, and a black pill CTA button ("See our offerings →" or "Explore Division →").
- On the right side: include a sleek studio device/display showcase frame displaying rich product/media experiences tailored to each division.
- Keep the dedicated `/services` page (`src/pages/ServicesPage.jsx`) completely intact with its full interactive stage-by-stage lifecycle engine.

---

## 2. Architecture & File Structure

1. **New Component**: `src/components/HomeServicesSpotlight.jsx`
   - Manages `activeDivision` state (`'development'` | `'creator'`).
   - Renders left-column controls (pill toggle, headline, body, CTA link).
   - Renders right-column studio display frame with Framer Motion animated switching.
   - Links to `/services?division=${activeDivision}`.

2. **New Stylesheet**: `src/components/HomeServicesSpotlight.css`
   - Clean white background (`#ffffff` / pure Flo Studios palette).
   - Strict typography: `var(--font-manrope), 'Manrope', sans-serif`. Absolutely NO Panchang.
   - Responsive two-column flex/grid layout (side-by-side on desktop, stacked on mobile).
   - Architectural device monitor mockup with realistic bezel, subtle drop shadow, and high-fidelity screen preview.

3. **Homepage Integration**: `src/pages/HomePage.jsx`
   - Import `HomeServicesSpotlight` instead of `ServicesSection`.
   - Mount `<HomeServicesSpotlight />` between `<WorkSection />` and `<CapabilitiesSection />`.

4. **Services Page Preservation**: `src/pages/ServicesPage.jsx`
   - Remains completely unchanged, preserving the full interactive multi-stage lifecycle experience.

---

## 3. Data & Content Mapping

### Development Division (Primary)
- **Toggle Label**: `01 / DEVELOPMENT DIVISION (PRIMARY)`
- **Headline**: `We build end-to-end digital products from idea to market.`
- **Description**: `We manage the entire journey of turning an idea into a live product — from research and UI/UX design to full-stack engineering and deployment — as one accountable partner with zero broken handoffs.`
- **CTA**: `See our offerings →` (`/services?division=development`)
- **Visual Showcase**: A modern, high-craft web application & SaaS dashboard preview with realistic browser chrome, metrics, and sleek dark/light interface elements.

### Creator & Content Division
- **Toggle Label**: `02 / CREATOR & CONTENT DIVISION`
- **Headline**: `Stage-calibrated media engines for ambitious creators.`
- **Description**: `A single, stage-calibrated pipeline from ideation and scripting to post-production, sound design, and packaging that scales channels systematically.`
- **CTA**: `See our offerings →` (`/services?division=creator`)
- **Visual Showcase**: A high-retention video production timeline, dynamic 4K media canvas, and multi-platform creator distribution preview.

---

## 4. Accessibility & Verification
- Semantic HTML tags (`<section aria-label="Flo Studios Divisions">`, `<button role="tab">`, `<h2 className="...">`).
- Smooth Framer Motion transitions (`layoutId` for the toggle pill, crossfade for the content and visual showcase).
- Verified via Playwright automated tests and screenshots.
- Zero build or lint errors (`npm run build`).
