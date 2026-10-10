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
    subBadge: 'One Owner, Start to Finish',
    label: 'Primary Flagship',
    tag: 'Full Build Lifecycle',
    whatWeDo: {
      heading: 'What We Do',
      problem:
        "The Development Division exists to solve one core problem: founders and businesses with a great idea rarely have a single partner who can take that idea all the way to a live, functioning, growing digital product. They're forced to stitch together freelance designers, developers, QA testers, and marketers - each with no visibility into what the others are doing, and no one owning the outcome.",
      solution:
        'Flo Studios replaces that fragmentation with a single, integrated build lifecycle. We manage the entire journey of turning an idea into a live product - from the first planning conversation to post-launch growth - as one continuous, connected process. Every stage is handled by specialists who are already aligned with what came before and what comes next, so nothing gets lost in translation between design, development, and launch.',
      philosophy:
        "We don't sell deliverables. We sell a product that works, and the outcome of it going live successfully."
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
        description:
          "We start by deeply understanding the founder's vision, goals, and constraints - translating a raw idea into clear product requirements, defined scope, and a shared understanding of what's being built and why.",
        desc: "We start by deeply understanding the founder's vision, goals, and constraints - translating a raw idea into clear product requirements, defined scope, and a shared understanding of what's being built and why."
      },
      {
        id: 'market-technical-research',
        number: '02',
        step: '02',
        title: 'Market & Technical Research',
        description:
          "Validating the idea against real market conditions and identifying the right technical approach - competitor analysis, user needs, and the technology choices that will actually support the product's goals at scale.",
        desc: "Validating the idea against real market conditions and identifying the right technical approach - competitor analysis, user needs, and the technology choices that will actually support the product's goals at scale."
      },
      {
        id: 'estimation-proposal-project-setup',
        number: '03',
        step: '03',
        title: 'Estimation, Proposal & Project Setup',
        description:
          'Clear timelines, cost estimates, and a structured proposal - followed by formal project setup, so both sides start with full alignment on scope, deliverables, and expectations.',
        desc: 'Clear timelines, cost estimates, and a structured proposal - followed by formal project setup, so both sides start with full alignment on scope, deliverables, and expectations.'
      },
      {
        id: 'ui-ux-design',
        number: '04',
        step: '04',
        title: 'UI/UX Design',
        description:
          "Designing the product's interface and experience - wireframes through high-fidelity design - built around real user behavior, not just visual polish, ensuring the product is as usable as it is attractive.",
        desc: "Designing the product's interface and experience - wireframes through high-fidelity design - built around real user behavior, not just visual polish, ensuring the product is as usable as it is attractive."
      },
      {
        id: 'technical-architecture-development-planning',
        number: '05',
        step: '05',
        title: 'Technical Architecture & Development Planning',
        description:
          'Defining the technical foundation of the product - system architecture, tech stack, database design, and a clear development roadmap - before a single line of production code is written.',
        desc: 'Defining the technical foundation of the product - system architecture, tech stack, database design, and a clear development roadmap - before a single line of production code is written.'
      },
      {
        id: 'development',
        number: '06',
        step: '06',
        title: 'Development',
        description:
          'Full-stack build of the product - web, app, or web app - executed against the architecture and design already agreed upon, with structured progress checkpoints throughout.',
        desc: 'Full-stack build of the product - web, app, or web app - executed against the architecture and design already agreed upon, with structured progress checkpoints throughout.'
      },
      {
        id: 'qa-testing',
        number: '07',
        step: '07',
        title: 'QA & Testing',
        description:
          'Rigorous testing across functionality, performance, security, and usability to catch issues before they reach real users - not an afterthought, but a dedicated phase.',
        desc: 'Rigorous testing across functionality, performance, security, and usability to catch issues before they reach real users - not an afterthought, but a dedicated phase.'
      },
      {
        id: 'pre-launch-release-preparation',
        number: '08',
        step: '08',
        title: 'Pre-Launch / Release Preparation',
        description:
          'Final readiness checks - performance optimization, environment setup, launch checklists, and contingency planning - to ensure the product goes live without surprises.',
        desc: 'Final readiness checks - performance optimization, environment setup, launch checklists, and contingency planning - to ensure the product goes live without surprises.'
      },
      {
        id: 'deployment-launch',
        number: '09',
        step: '09',
        title: 'Deployment & Launch',
        description:
          'Managing the actual release of the product into the real world - deployment execution, monitoring, and hands-on support through the critical first moments of going live.',
        desc: 'Managing the actual release of the product into the real world - deployment execution, monitoring, and hands-on support through the critical first moments of going live.'
      },
      {
        id: 'post-launch-support-maintenance',
        number: '10',
        step: '10',
        title: 'Post-Launch Support & Maintenance',
        description:
          "Ongoing technical support, bug fixes, and system upkeep after launch - because a product's real test begins the moment users start using it.",
        desc: "Ongoing technical support, bug fixes, and system upkeep after launch - because a product's real test begins the moment users start using it."
      },
      {
        id: 'optimization-continuous-development',
        number: '11',
        step: '11',
        title: 'Optimization & Continuous Development',
        description:
          "Using real user data and performance insights to continuously refine and evolve the product - new features, performance improvements, and iteration based on what's actually happening in the market, not assumptions.",
        desc: "Using real user data and performance insights to continuously refine and evolve the product - new features, performance improvements, and iteration based on what's actually happening in the market, not assumptions."
      }
    ],
    oneLineSummary:
      "Flo Studios' Development Division is a full build lifecycle for founders and businesses - we don't just build your product, we carry it from idea to market and beyond, as one accountable partner instead of a chain of vendors.",
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
    badge: 'Secondary Division',
    subBadge: 'Stage-Specialized Execution',
    label: 'Secondary Division',
    tag: 'Integrated Content Pipeline',
    whatWeDo: {
      heading: 'What We Do',
      problem:
        'The Creator Division exists to solve one core problem: creators trying to grow are forced to piece together their content process from disconnected freelancers, tools, and guesswork - an editor here, a scriptwriter there, a thumbnail designer somewhere else, with no one thinking about the channel as a whole.',
      solution:
        "Creator Division replaces that chaos with a single, integrated content pipeline. We manage the entire life cycle of a creator's content, from the first idea to post-publish analysis, as one continuous, connected process. Every stage of that pipeline is calibrated to the creator's current stage of growth, so a channel that's stuck at 5K subscribers gets a fundamentally different approach than one plateaued at 500K."
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
        description:
          'We identify content ideas and formats aligned to the creator\'s niche, current audience behavior, and platform trends - not generic "content calendars," but ideas built to move that specific channel forward at its specific stage.',
        desc: 'We identify content ideas and formats aligned to the creator\'s niche, current audience behavior, and platform trends - not generic "content calendars," but ideas built to move that specific channel forward at its specific stage.'
      },
      {
        id: 'scripting',
        number: '02',
        step: '02',
        title: 'Scripting',
        description:
          "Structured scripts or talking-point frameworks (depending on the creator's style and platform) designed to maximize retention, hook strength, and message clarity from the first second. Structured as per the content style and needs of the channel and creator.",
        desc: "Structured scripts or talking-point frameworks (depending on the creator's style and platform) designed to maximize retention, hook strength, and message clarity from the first second. Structured as per the content style and needs of the channel and creator."
      },
      {
        id: 'storyboarding',
        number: '03',
        step: '03',
        title: 'Storyboarding',
        description:
          'Visual / shot planning that translates the script into a clear production roadmap, where every frame is meaningful and supports the end goal - ensuring the creator (or our production team) knows exactly what to shoot and how before cameras roll.',
        desc: 'Visual / shot planning that translates the script into a clear production roadmap, where every frame is meaningful and supports the end goal - ensuring the creator (or our production team) knows exactly what to shoot and how before cameras roll.'
      },
      {
        id: 'post-production-editing',
        number: '04',
        step: '04',
        title: 'Post-Production Editing',
        description:
          "Full editing of raw footage into a polished final cut - pacing, cuts, visual style, and structure tailored to the platform and the creator's brand identity. All of it crafted using techniques ensured to work towards the motive",
        desc: "Full editing of raw footage into a polished final cut - pacing, cuts, visual style, and structure tailored to the platform and the creator's brand identity. All of it crafted using techniques ensured to work towards the motive"
      },
      {
        id: 'sound-design',
        number: '05',
        step: '05',
        title: 'Sound Design',
        description:
          'Audio mixing, sound effects, and music selection / integration to elevate production quality, keep viewers engaged throughout and create Depth in the videos.',
        desc: 'Audio mixing, sound effects, and music selection / integration to elevate production quality, keep viewers engaged throughout and create Depth in the videos.'
      },
      {
        id: 'packaging-design',
        number: '06',
        step: '06',
        title: 'Packaging Design',
        description:
          "Thumbnails, titles, and cover art engineered specifically to drive click-through - informed by what's proven to work at the creator's current audience size and niche and crafted with precision by specialized designers.",
        desc: "Thumbnails, titles, and cover art engineered specifically to drive click-through - informed by what's proven to work at the creator's current audience size and niche and crafted with precision by specialized designers."
      },
      {
        id: 'multi-platform-distribution-planning',
        number: '07',
        step: '07',
        title: 'Multi-Platform Distribution Planning',
        description:
          'Strategic planning for how, when, and where content gets published across platforms (YouTube, Instagram, TikTok, etc.), including repurposing and format adaptation per platform. Preparations are made according to the Funnel made by the specialist to drive in the most accurate traffic.',
        desc: 'Strategic planning for how, when, and where content gets published across platforms (YouTube, Instagram, TikTok, etc.), including repurposing and format adaptation per platform. Preparations are made according to the Funnel made by the specialist to drive in the most accurate traffic.'
      },
      {
        id: 'specialized-analysis',
        number: '08',
        step: '08',
        title: 'Specialized Analysis',
        description:
          'Post-publish performance analysis - not just views and likes, but retention curves, audience behavior, and growth signals - feeding insights back into the next ideation cycle to keep the pipeline improving over time and the funnel is calibrated as per the needs.',
        desc: 'Post-publish performance analysis - not just views and likes, but retention curves, audience behavior, and growth signals - feeding insights back into the next ideation cycle to keep the pipeline improving over time and the funnel is calibrated as per the needs.'
      }
    ],
    oneLineSummary:
      "Flo Studios' Creator Division replaces content chaos with a single, stage-calibrated pipeline - turning raw ideas into high-retention, multi-platform media engines that scale channels systematically.",
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
  return DIVISIONS.find((division) => division.id.toLowerCase() === normalized) || DIVISIONS[0]
}

/**
 * Returns all divisions.
 *
 * @returns {typeof DIVISIONS}
 */
export function getAllDivisions() {
  return DIVISIONS
}

export default DIVISIONS
