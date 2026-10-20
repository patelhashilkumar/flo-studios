/**
 * ═════════════════════════════════════════════════════════════════
 * FLO STUDIOS — OFFICIAL DIVISIONS SPECIFICATION & DATA MODULE
 * Verbatim text and stage lifecycles extracted from Frame 6Divisions Doc Flo.pdf
 * ═════════════════════════════════════════════════════════════════
 */

export const DIVISIONS = [
  {
    id: 'development',
    name: 'Development Division',
    shortName: 'Development',
    badge: 'Primary Flagship',
    subBadge: 'Our Core Studio Focus',
    label: 'Primary Flagship',
    tag: 'Full Build Lifecycle',
    introStatement: [
      "In our Development Division, we partner exclusively with a handpicked limited number of venture-backed startups and ambitious companies to transform bold ideas into fully realized digital products, supporting them across the entire product lifecycle. Every stage is led by a specialist, not a generalist.",
      "In select engagements, we also direct the initial customer acquisition that places your product in front of the right audience. One specialist-led team, from start to finish."
    ],
    whatWeDo: {
      heading: 'What We Do',
      problem:
        "Founders and venture-backed businesses rarely have a single partner who can translate their vision into creative direction across product strategy, design, development, launch, and go-to-market distribution. They're forced to stitch together disconnected vendors with no one owning the outcome.",
      solution:
        "Our Development Division partners with venture-backed founders and businesses from the earliest stages throughout the entire lifecycle of the product. We translate the founder's vision into creative direction across product strategy, UI/UX design, full-stack engineering, production launch, and a go-to-market distribution strategy that drives user acquisition—helping companies bridge the gap between vision and execution while building products positioned for scale. We help companies from the very start—ideation and market research all the way through development and deployment at the end—with zero single-stage handoffs.",
      philosophy:
        "We don't sell disconnected deliverables. We build products positioned for scale and carry them all the way to market."
    },
    coreDifferentiator: {
      label: 'Core Differentiator: One Owner, Start to Finish',
      title: 'Core Differentiator: One Owner, Start to Finish',
      quote:
        '“We don’t hand you off between stages. We carry your product through all of them.”',
      body: [
        "Most technical projects fail not because of bad code, but because of broken handoffs - a designer who didn't understand the technical constraints, a developer who didn't understand the market, a launch with no plan behind it.",
        "Flo Studios removes that risk by owning the entire lifecycle under one roof. The same understanding of the founder's vision, market, and users that shapes our initial planning carries through design, development, testing, launch, and beyond - with nothing re-explained, re-scoped, or lost at each stage."
      ],
      text: "Most technical projects fail not because of bad code, but because of broken handoffs - a designer who didn't understand the technical constraints, a developer who didn't understand the market, a launch with no plan behind it.\n\nFlo Studios removes that risk by owning the entire lifecycle under one roof. The same understanding of the founder's vision, market, and users that shapes our initial planning carries through design, development, testing, launch, and beyond - with nothing re-explained, re-scoped, or lost at each stage."
    },
    pipelineTitle: 'The Build Lifecycle: Stage by Stage',
    stages: [
      {
        id: 'requirements-product-planning',
        number: '01',
        step: '01',
        title: 'Requirements & Product Planning',
        discipline: 'Product Strategy',
        category: 'Discovery',
        location: 'Stage 01',
        image: 'https://framerusercontent.com/images/mpNkv7vlfahUMsPEJwZ8bCRFoY.jpg',
        description:
          "We start by deeply understanding the founder's vision, goals, and constraints - translating a raw idea into clear product requirements, defined scope, and a shared understanding of what's being built and why.",
        desc: "We start by deeply understanding the founder's vision, goals, and constraints - translating a raw idea into clear product requirements, defined scope, and a shared understanding of what's being built and why.",
        focus: 'Scope definition, product requirements document (PRD) & architectural boundaries.'
      },
      {
        id: 'market-technical-research',
        number: '02',
        step: '02',
        title: 'Market & Technical Research',
        discipline: 'Market Intelligence',
        category: 'Discovery',
        location: 'Stage 02',
        image: 'https://framerusercontent.com/images/Tbt5OfH99FAPX0gTOTpdDgIvS0k.jpg',
        description:
          "Validating the idea against real market conditions and identifying the right technical approach - competitor analysis, user needs, and the technology choices that will actually support the product's goals at scale.",
        desc: "Validating the idea against real market conditions and identifying the right technical approach - competitor analysis, user needs, and the technology choices that will actually support the product's goals at scale.",
        focus: 'Competitor landscape analysis, technical feasibility & tech stack validation.'
      },
      {
        id: 'estimation-proposal-project-setup',
        number: '03',
        step: '03',
        title: 'Estimation, Proposal & Project Setup',
        discipline: 'Scoping & Setup',
        category: 'Discovery',
        location: 'Stage 03',
        image: 'https://framerusercontent.com/images/hCsL2Fj3mIg4D4NKuTSE4ZX74lI.jpg',
        description:
          'Clear timelines, cost estimates, and a structured proposal - followed by formal project setup, so both sides start with full alignment on scope, deliverables, and expectations.',
        desc: 'Clear timelines, cost estimates, and a structured proposal - followed by formal project setup, so both sides start with full alignment on scope, deliverables, and expectations.',
        focus: 'Transparent milestone timeline, cost estimates & team alignment.'
      },
      {
        id: 'ui-ux-design',
        number: '04',
        step: '04',
        title: 'UI/UX Design',
        discipline: 'UI/UX Architecture',
        category: 'Design',
        location: 'Stage 04',
        image: 'https://framerusercontent.com/images/6TNedQuYuRry5tCguhRkT7A2A.jpg',
        description:
          "Designing the product's interface and experience - wireframes through high-fidelity design - built around real user behavior, not just visual polish, ensuring the product is as usable as it is attractive.",
        desc: "Designing the product's interface and experience - wireframes through high-fidelity design - built around real user behavior, not just visual polish, ensuring the product is as usable as it is attractive.",
        focus: 'User flows, wireframes & high-fidelity interactive design system.'
      },
      {
        id: 'technical-architecture-development-planning',
        number: '05',
        step: '05',
        title: 'Technical Architecture & Development Planning',
        discipline: 'Systems Engineering',
        category: 'Build',
        location: 'Stage 05',
        image: 'https://framerusercontent.com/images/h0kj4w9Kv742dKw44nr7kdj4kBA.jpg',
        description:
          'Defining the technical foundation of the product - system architecture, tech stack, database design, and a clear development roadmap - before a single line of production code is written.',
        desc: 'Defining the technical foundation of the product - system architecture, tech stack, database design, and a clear development roadmap - before a single line of production code is written.',
        focus: 'System architecture, database schemas & development roadmap.'
      },
      {
        id: 'development',
        number: '06',
        step: '06',
        title: 'Development',
        discipline: 'Full-Stack Build',
        category: 'Build',
        location: 'Stage 06',
        image: 'https://framerusercontent.com/images/hUByl2uUdtAmQ8vWCUDiBj1pRLc.jpg',
        description:
          'Full-stack build of the product - web, app, or web app - executed against the architecture and design already agreed upon, with structured progress checkpoints throughout.',
        desc: 'Full-stack build of the product - web, app, or web app - executed against the architecture and design already agreed upon, with structured progress checkpoints throughout.',
        focus: 'Full-stack web/app engineering with structured sprint checkpoints.'
      },
      {
        id: 'qa-testing',
        number: '07',
        step: '07',
        title: 'QA & Testing',
        discipline: 'QA & Testing',
        category: 'Launch',
        location: 'Stage 07',
        image: 'https://framerusercontent.com/images/emC6pcmjB7cWoT2kjdEQgwEM5E.jpg',
        description:
          'Rigorous testing across functionality, performance, security, and usability to catch issues before they reach real users - not an afterthought, but a dedicated phase.',
        desc: 'Rigorous testing across functionality, performance, security, and usability to catch issues before they reach real users - not an afterthought, but a dedicated phase.',
        focus: 'End-to-end functionality, performance, security & cross-device QA.'
      },
      {
        id: 'pre-launch-release-preparation',
        number: '08',
        step: '08',
        title: 'Pre-Launch / Release Preparation',
        discipline: 'Release Readiness',
        category: 'Launch',
        location: 'Stage 08',
        image: 'https://framerusercontent.com/images/zafbjJHQ4CKtNULrFqONzgnF9J8.jpg',
        description:
          'Final readiness checks - performance optimization, environment setup, launch checklists, and contingency planning - to ensure the product goes live without surprises.',
        desc: 'Final readiness checks - performance optimization, environment setup, launch checklists, and contingency planning - to ensure the product goes live without surprises.',
        focus: 'Staging verification, environment setup & launch contingency checklist.'
      },
      {
        id: 'deployment-launch',
        number: '09',
        step: '09',
        title: 'Deployment & Launch',
        discipline: 'Production Launch',
        category: 'Launch',
        location: 'Stage 09',
        image: 'https://framerusercontent.com/images/rBdJWX2roUxwTqeqATk7TUnaji0.jpg',
        description:
          'Managing the actual release of the product into the real world - deployment execution, monitoring, and hands-on support through the critical first moments of going live.',
        desc: 'Managing the actual release of the product into the real world - deployment execution, monitoring, and hands-on support through the critical first moments of going live.',
        focus: 'Production rollout, DNS/CDN deployment & real-time live monitoring.'
      },
      {
        id: 'post-launch-support-maintenance',
        number: '10',
        step: '10',
        title: 'Post-Launch Support & Maintenance',
        discipline: 'Operations & Upkeep',
        category: 'Scale',
        location: 'Stage 10',
        image: 'https://framerusercontent.com/images/cq4fbtwlLzMSkWzsrZOuJUPzQ.jpg',
        description:
          "Ongoing technical support, bug fixes, and system upkeep after launch - because a product's real test begins the moment users start using it.",
        desc: "Ongoing technical support, bug fixes, and system upkeep after launch - because a product's real test begins the moment users start using it.",
        focus: 'SLA technical support, error telemetry & ongoing system maintenance.'
      },
      {
        id: 'optimization-continuous-development',
        number: '11',
        step: '11',
        title: 'Optimization & Continuous Development',
        discipline: 'Continuous Evolution',
        category: 'Scale',
        location: 'Stage 11',
        image: 'https://framerusercontent.com/images/621kKqEkjtoC67BteNeK1pEJI.jpg',
        description:
          "Using real user data and performance insights to continuously refine and evolve the product - new features, performance improvements, and iteration based on what's actually happening in the market, not assumptions.",
        desc: "Using real user data and performance insights to continuously refine and evolve the product - new features, performance improvements, and iteration based on what's actually happening in the market, not assumptions.",
        focus: 'User telemetry review, conversion optimization & continuous feature sprints.'
      }
    ],
    oneLineSummary:
      "Our Development Division partners with venture-backed founders and businesses from the earliest stages throughout the entire product lifecycle—translating vision into creative direction across strategy, design, engineering, launch, and go-to-market user acquisition with zero broken handoffs.",
    cta: {
      text: 'Start a Project with Development',
      label: 'Start a Project with Development',
      href: '/contact?division=development'
    }
  },
  {
    id: 'creator',
    name: 'Creator / Content Division',
    shortName: 'Creator & Content',
    badge: 'Creator Division',
    subBadge: 'End-to-End Growth Systems',
    label: 'Creator Division',
    tag: 'Integrated Growth Pipeline',
    introStatement: [
      "In our Creator Division, we build end-to-end growth systems for high-impact creators—managing the entire lifecycle of content from ideation and scripting to production, packaging, and distribution. Every stage is calibrated to the creator's current audience size and growth trajectory.",
      "In select engagements, we also direct the multi-platform distribution that transforms attention into long-term business assets. One specialist-led pipeline, from start to finish."
    ],
    whatWeDo: {
      heading: 'What We Do',
      problem:
        'Creators trying to grow are forced to piece together their content process from disconnected freelancers and tools—an editor here, a scriptwriter there, a thumbnail designer somewhere else—with no one thinking about the channel as a long-term business asset.',
      solution:
        "Our Creator Division builds end-to-end growth systems for high-impact creators—from ideation, scripting, and production through distribution, analytics, and high-impact digital strategies crafted from research aggregated across every engagement. We take a creator's idea for a video or series and help them throughout the entire process of creating, packaging, and distributing that content, helping creators transform attention into long-term business assets that travel far in the long run."
    },
    coreDifferentiator: {
      label: 'Core Differentiator: Stage-Specialized Execution',
      title: 'Core Differentiator: Stage-Specialized Execution',
      quote: '“We don’t run one playbook for every creator.”',
      body: [
        "Before any pipeline work begins, every creator is diagnosed against their current stage - audience size, growth trajectory, content-market fit, and where exactly they're stuck."
      ],
      text: "Before any pipeline work begins, every creator is diagnosed against their current stage - audience size, growth trajectory, content-market fit, and where exactly they're stuck."
    },
    pipelineTitle: 'The Pipeline: Stage by Stage',
    stages: [
      {
        id: 'ideation-format-development',
        number: '01',
        step: '01',
        title: 'Ideation & Format Development',
        discipline: 'Ideation & Format',
        category: 'Creative',
        location: 'Stage 01',
        image: 'https://framerusercontent.com/images/mpNkv7vlfahUMsPEJwZ8bCRFoY.jpg',
        description:
          'We identify content ideas and formats aligned to the creator\'s niche, current audience behavior, and platform trends - not generic "content calendars," but ideas built to move that specific channel forward at its specific stage.',
        desc: 'We identify content ideas and formats aligned to the creator\'s niche, current audience behavior, and platform trends - not generic "content calendars," but ideas built to move that specific channel forward at its specific stage.',
        focus: 'Channel-specific idea engine & high-retention content formats.'
      },
      {
        id: 'scripting',
        number: '02',
        step: '02',
        title: 'Scripting',
        discipline: 'Script Architecture',
        category: 'Creative',
        location: 'Stage 02',
        image: 'https://framerusercontent.com/images/Tbt5OfH99FAPX0gTOTpdDgIvS0k.jpg',
        description:
          "Structured scripts or talking-point frameworks (depending on the creator's style and platform) designed to maximize retention, hook strength, and message clarity from the first second. Structured as per the content style and needs of the channel and creator.",
        desc: "Structured scripts or talking-point frameworks (depending on the creator's style and platform) designed to maximize retention, hook strength, and message clarity from the first second. Structured as per the content style and needs of the channel and creator.",
        focus: 'Hook calibration, structured scripts & retention-focused talking points.'
      },
      {
        id: 'storyboarding',
        number: '03',
        step: '03',
        title: 'Storyboarding',
        discipline: 'Visual Mapping',
        category: 'Production',
        location: 'Stage 03',
        image: 'https://framerusercontent.com/images/hCsL2Fj3mIg4D4NKuTSE4ZX74lI.jpg',
        description:
          'Visual / shot planning that translates the script into a clear production roadmap, where every frame is meaningful and supports the end goal - ensuring the creator (or our production team) knows exactly what to shoot and how before cameras roll.',
        desc: 'Visual / shot planning that translates the script into a clear production roadmap, where every frame is meaningful and supports the end goal - ensuring the creator (or our production team) knows exactly what to shoot and how before cameras roll.',
        focus: 'Visual scene mapping & shot-by-shot production roadmap.'
      },
      {
        id: 'post-production-editing',
        number: '04',
        step: '04',
        title: 'Post-Production Editing',
        discipline: 'Narrative Cuts',
        category: 'Production',
        location: 'Stage 04',
        image: 'https://framerusercontent.com/images/6TNedQuYuRry5tCguhRkT7A2A.jpg',
        description:
          "Full editing of raw footage into a polished final cut - pacing, cuts, visual style, and structure tailored to the platform and the creator's brand identity. All of it crafted using techniques ensured to work towards the motive",
        desc: "Full editing of raw footage into a polished final cut - pacing, cuts, visual style, and structure tailored to the platform and the creator's brand identity. All of it crafted using techniques ensured to work towards the motive",
        focus: 'Pacing, visual narrative cuts & platform-calibrated final master.'
      },
      {
        id: 'sound-design',
        number: '05',
        step: '05',
        title: 'Sound Design',
        discipline: 'Audio & Sound',
        category: 'Production',
        location: 'Stage 05',
        image: 'https://framerusercontent.com/images/h0kj4w9Kv742dKw44nr7kdj4kBA.jpg',
        description:
          'Audio mixing, sound effects, and music selection / integration to elevate production quality, keep viewers engaged throughout and create Depth in the videos.',
        desc: 'Audio mixing, sound effects, and music selection / integration to elevate production quality, keep viewers engaged throughout and create Depth in the videos.',
        focus: 'Audio mixing, sound effects & immersive sonic layering.'
      },
      {
        id: 'packaging-design',
        number: '06',
        step: '06',
        title: 'Packaging Design',
        discipline: 'Packaging & CTR',
        category: 'Packaging',
        location: 'Stage 06',
        image: 'https://framerusercontent.com/images/hUByl2uUdtAmQ8vWCUDiBj1pRLc.jpg',
        description:
          "Thumbnails, titles, and cover art engineered specifically to drive click-through - informed by what's proven to work at the creator's current audience size and niche and crafted with precision by specialized designers.",
        desc: "Thumbnails, titles, and cover art engineered specifically to drive click-through - informed by what's proven to work at the creator's current audience size and niche and crafted with precision by specialized designers.",
        focus: 'High-CTR thumbnail engineering, packaging & title positioning.'
      },
      {
        id: 'multi-platform-distribution-planning',
        number: '07',
        step: '07',
        title: 'Multi-Platform Distribution Planning',
        discipline: 'Channel Distribution',
        category: 'Distribution',
        location: 'Stage 07',
        image: 'https://framerusercontent.com/images/emC6pcmjB7cWoT2kjdEQgwEM5E.jpg',
        description:
          'Strategic planning for how, when, and where content gets published across platforms (YouTube, Instagram, TikTok, etc.), including repurposing and format adaptation per platform. Preparations are made according to the Funnel made by the specialist to drive in the most accurate traffic.',
        desc: 'Strategic planning for how, when, and where content gets published across platforms (YouTube, Instagram, TikTok, etc.), including repurposing and format adaptation per platform. Preparations are made according to the Funnel made by the specialist to drive in the most accurate traffic.',
        focus: 'Cross-platform distribution schedules & content repurposing funnel.'
      },
      {
        id: 'specialized-analysis',
        number: '08',
        step: '08',
        title: 'Specialized Analysis',
        discipline: 'Audience Analytics',
        category: 'Analytics',
        location: 'Stage 08',
        image: 'https://framerusercontent.com/images/zafbjJHQ4CKtNULrFqONzgnF9J8.jpg',
        description:
          'Post-publish performance analysis - not just views and likes, but retention curves, audience behavior, and growth signals - feeding insights back into the next ideation cycle to keep the pipeline improving over time and the funnel is calibrated as per the needs.',
        desc: 'Post-publish performance analysis - not just views and likes, but retention curves, audience behavior, and growth signals - feeding insights back into the next ideation cycle to keep the pipeline improving over time and the funnel is calibrated as per the needs.',
        focus: 'Retention curve analytics, audience insights & pipeline optimization.'
      }
    ],
    oneLineSummary:
      "Our Creator Division builds end-to-end growth systems for high-impact creators—taking initial video ideas through scripting, production, packaging, distribution, and analytics to transform attention into long-term business assets that travel far in the long run.",
    cta: {
      text: 'Start a Project with Creator Division',
      label: 'Start a Project with Creator Division',
      href: '/contact?division=creator'
    }
  }
]

/**
 * Returns a division by ID ('development' or 'creator').
 * Falls back to the primary development division if not found.
 *
 * @param {string} [id]
 * @returns {typeof DIVISIONS[0]}
 */
export function getDivisionById(id) {
  if (!id) return DIVISIONS[0]
  const normalized = String(id).toLowerCase().trim()
  return (
    DIVISIONS.find((division) => {
      const divId = division.id.toLowerCase()
      return (
        divId === normalized ||
        (divId === 'creator' && (normalized === 'content' || normalized === 'creator-content' || normalized === 'media')) ||
        (divId === 'development' && (normalized === 'dev' || normalized === 'build' || normalized === 'software'))
      )
    }) || DIVISIONS[0]
  )
}

export default DIVISIONS
