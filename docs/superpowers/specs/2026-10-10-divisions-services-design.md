# Spec: Two Divisions Services Section (Development & Creator/Content)

## 1. Overview
Redesign the Services experience across both the Homepage (`ServicesSection.jsx`) and the dedicated Services Page (`ServicesPage.jsx`) to reflect Flo Studios' two operational divisions specified in `Frame 6Divisions Doc Flo.pdf`:
1. **Development Division** (Default & Primary Flagship): Full build lifecycle for founders and digital products.
2. **Creator / Content Division** (Secondary): Stage-specialized integrated content pipeline for creators.

---

## 2. Information Architecture & Centralized Data
Create `src/data/divisionsData.js` exporting:
- `DIVISIONS`: Array containing objects for `'development'` (primary, index 0) and `'creator'` (index 1).
- Exact verbatim text extracted from `Frame 6Divisions Doc Flo.pdf`:
  - **Development Division**:
    - Problem & Solution ("What We Do")
    - Core Differentiator: One Owner, Start to Finish (“We don't hand you off between stages. We carry your product through all of them.”)
    - The Build Lifecycle: Stage by Stage (11 stages with exact names and descriptions)
    - The One-Line Summary
  - **Creator / Content Division**:
    - Problem & Solution ("What We Do")
    - Core Differentiator: Stage-Specialized Execution (“We don't run one playbook for every creator.”)
    - The Pipeline: Stage by Stage (8 stages with exact names and descriptions)
    - The One-Line Summary

---

## 3. UI & Interaction Design
- **Interactive Division Switcher:**
  - Modern segmented control with pills for `Development Division (Primary)` and `Creator / Content Division`.
  - Animated bead / layout pill indicator via Framer Motion.
  - Development Division active by default.
- **Division Overview:**
  - Eyebrow tag + Core Differentiator callout quote in bold Manrope typography.
  - "The Challenge vs The Flo Studios Model" dual-card breakdown.
- **Stage-by-Stage Lifecycle Pipeline:**
  - Interactive stage cards (11 for Development, 8 for Creator) with stage number (e.g. `01`, `02`), title, and in-depth description.
  - Responsive grid layout (desktop 2-column or 3-column, mobile 1-column).
- **The One-Line Summary & CTA:**
  - Editorial summary badge.
  - Direct "Start a Project with [Division]" button pointing to `/contact?division=[id]`.

---

## 4. Components & Pages Touched
- `src/data/divisionsData.js` (New centralized data module)
- `src/components/ServicesSection.jsx` (Interactive division switcher and stage pipeline)
- `src/components/ServicesSection.css` (Clean editorial styling with Manrope font family)
- `src/pages/ServicesPage.jsx` (Unified page view integrating the dual-division system)

---

## 5. Verification Plan
- Verify all 11 development stages and 8 creator stages match verbatim text in `Frame 6Divisions Doc Flo.pdf`.
- Test tab switching: smooth transition between Development and Creator divisions.
- Responsive testing across desktop, tablet, and mobile.
- Build verification via `npm run build` (0 errors).
