# Design Specification: Flo Studio Website Content & Section Updates

## Overview
Transform the website with new agency copy, brand identity (**Flo**), and structured sections matching the provided design specifications and Darkroom/Figma references:
1. **Proof of Work Section** (redesigned with Darkroom-style interactive cards and headline).
2. **Services Section** (updated headline and lifecycle description).
3. **Capabilities Section ("Our Edge")** (new interactive accordion component following the Figma layout).
4. **About Us Section** (updated with "Idea To Outcome" tagline and 2-stage manifesto copy).
5. **Blog Preview Section** (updated headline to "Our Latest & Greatest").
6. **Brand Refresh** (updating site brand to "Flo").

---

## 1. Proof of Work Section (`src/components/WorkSection.jsx` & `WorkSection.css`)
- **Headline**: `"We're A Creative & Tech Studio Built At The Intersection Of Content And Technical INFRASTRUCTURE."`
- **Visual Style (Darkroom Inspiration)**:
  - Bento-inspired grid layout with high-contrast cards.
  - Featured statement card / quote card ("We design digital experiences", "We invest in the future of commerce / content").
  - Rich project cards with rounded borders (`16px`/`20px`), subtle glassmorphism tags, smooth hover elevation, image zoom, and GSAP scroll triggers.
  - Category filter pills (`all`, `brand`, `marketing`, `product`) preserved with active pill indicators.

---

## 2. Services Section (`src/components/ServicesSection.jsx`)
- **Headline**: `"We Make Brands, Products, Websites, And Establish Creators."`
- **Description**: `"We Work Across The Full Lifecycle, Start To Finish, So Every Piece Lands As One Coherent Outcome."`
- **Visuals**: Maintain the sleek automatic slide carousel showing high-fidelity client work, interactive pagination dots, and `"See our offerings"` link.

---

## 3. Capabilities Section: "Our Edge" (`src/components/CapabilitiesSection.jsx` & `CapabilitiesSection.css`)
- **Placement**: Directly following `ServicesSection` and before `WorkflowSection`.
- **Top Label**: `"OUR EDGE"` / `"CAPABILITIES"`
- **Section Heading (Figma Layout)**:
  `"WE CREATE POWERFUL BRANDS, SEAMLESS DIGITAL EXPERIENCES, AND RESPONSIVE, DEVICE-READY WEBSITES."`
- **Accordion Architecture**:
  - Interactive accordion list with crisp horizontal divider borders.
  - Items built from the 4 strategic pillars:
    1. **NARRATIVE INSTINCT**:
       `Every piece of content, every product, every user interaction lives or dies by whether it holds attention and earns trust. Our team doesn't start with execution — we start with instinct for what actually resonates, then build backward from there. It's the same instinct whether we're scripting a video or designing a product flow.`
    2. **STAGE-AWARE THINKING**:
       `A 5K-subscriber creator and a 500K-subscriber creator need different strategies. A pre-funded founder and a funded one need different priorities. Nothing we do is templated — every decision starts with understanding exactly where you are right now, not where a generic playbook assumes you are.`
    3. **CROSS-DISCIPLINARY EXECUTION**:
       `Strategists, writers, designers, developers, editors, and technical architects — working from the same brief, not handed off between silos. When the same team understands both the creative and technical sides of a problem, nothing gets lost in translation.`
    4. **OWNERSHIP THROUGH COMPLETION**:
       `We don't disappear after the deliverable ships. Whether it's a piece of content going live or a product hitting the market, our team stays close enough to see how it actually performs — and adjusts from there.`
  - **Interaction**:
    - Clicking any item expands it with smooth animation while showing `×` icon; collapsed items show `+` icon.
    - Default first item open on load.
    - Keyboard accessible (`aria-expanded`, `button` triggers).

---

## 4. About Us Section (`src/components/PurposeSection.jsx` & `PurposeSection.css`)
- **Section Label**: `"About Us"`
- **Main Tagline (Giant typography)**: `"Idea To Outcome."`
- **First Paragraph**:
  `"Most Good Ideas Die In The Space Between Vision And Execution. We Built Flo To Close That Gap. Whether We're Growing A Channel Or Building A Product, The Same Team Stays With The Work From The First Idea To The Moment It Lives In The World — And Keeps Refining Once It's Out There."`
- **Second Paragraph**:
  `"That Means Owning Every Stage With The Same Team: The Instinct For What Holds Attention, The Clarity For Where You Actually Stand, The Craft To Execute Across Disciplines, And The Ownership To Stay Until It Performs. We Measure Success By What Ships And What Grows, Not By What Gets Delivered And Left Behind."`
- **CTA**: `"Learn more about us"` link with arrow icon.

---

## 5. Blog Preview Section (`src/components/NewsSection.jsx`)
- **Section Label / Title**: `"News & Noteworthy"`
- **Headline**: `"Our Latest & Greatest"`
- **Content Cards**: Editorial and press cards with read time tags, hover image scale, and link to `/latest`.

---

## 6. Branding & Global Details (`Header.jsx`, `Hero.jsx`, `index.html`)
- Brand name transitioned to **Flo**:
  - `index.html`: Title updated to `"Flo | Creative & Tech Studio"`.
  - Header logo: Bold modern "FLO" wordmark.
  - Hero: Clean modern typography and hero statement aligned with Flo studio positioning.

---

## Component Hierarchy on HomePage
1. `<Hero />`
2. `<WorkSection />` (Proof of Work)
3. `<ClientRoster />`
4. `<ServicesSection />`
5. `<CapabilitiesSection />` (Our Edge - Accordion)
6. `<WorkflowSection />` (3D Flight Path journey)
7. `<Recognition />`
8. `<PurposeSection />` (About Us: Idea To Outcome)
9. `<NewsSection />` (Blog Preview: Our Latest & Greatest)
