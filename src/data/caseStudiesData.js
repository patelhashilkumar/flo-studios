import { MOTION_REELS } from './motionReels.js'

export const CASE_STUDIES = {
  'drone-sim': {
    slug: 'drone-sim',
    title: 'Multi-Drone 3D Path Optimizer',
    client: 'Autonomous Avionics Lab',
    year: '2024',
    discipline: 'Spatial Computing · 3D Algorithms · Autonomous Systems',
    timeline: '12 Weeks',
    roleSummary: 'Architecture, 3D WebGL Visualization, Path Planning Algorithms, Full-Stack Engineering',
    liveUrl: 'https://drone-sim-901y.onrender.com',
    liveLabel: 'Launch 3D Simulator',
    accentColor: '#00F0FF',
    bgColor: '#080C14',
    inkColor: '#F1F5F9',
    heroMedia: {
      type: 'image',
      src: '/work/drone-sim/dashboard.webp',
      alt: 'Multi-Drone 3D Path Optimizer WebGL simulation dashboard and trajectory controls',
      aspectRatio: '16 / 9',
    },
    introMarkText: '3D PATH',
    leadQuote: 'Synthesizing collision-free flight trajectories across dynamic 3D obstacle topologies in sub-10ms intervals.',
    leadText:
      'Modern autonomous aerial swarms face severe combinatorial complexity when routing through dense urban terrain. Flo Studios partnered with avionics researchers to design and engineer a web-native 3D simulation platform uniting 3D RRT* path planning, B-Spline trajectory smoothing, and real-time telemetry streaming.',
    challenge: {
      statement: 'Synthesizing conflict-free trajectories for multi-agent aerial swarms in real time without communication bottlenecks.',
      body:
        'Standard discrete grid search algorithms fail to scale in three-dimensional spatial environments under tight frame budgets. The simulation required an architecture capable of processing continuous obstacle geometry, resolving dynamic multi-drone collision corridors, and rendering spatial flight paths at 60 FPS in standard browser environments.',
    },
    showcase: {
      title: 'Real-time 3D Telemetry & Swarm Intelligence',
      caption: 'Three.js spatial viewports, interactive 3D camera controls, and real-time waypoint interpolation.',
      items: [
        {
          src: '/work/drone-sim/dashboard.webp',
          alt: 'Primary 3D path optimization canvas showing simulated drone waypoints',
          caption: 'Continuous 3D space obstacle field with real-time collision detection',
        },
      ],
    },
    palette: [
      { name: 'Obsidian Void', hex: '#080C14', role: 'Simulation background and night viewports' },
      { name: 'Electric Cyan', hex: '#00F0FF', role: 'Primary flight path vector and active drone markers' },
      { name: 'Radar Emerald', hex: '#10B981', role: 'Clearance corridors and optimal trajectory splines' },
      { name: 'Hazard Amber', hex: '#F59E0B', role: 'Dynamic proximity warnings and obstacle bounding volumes' },
      { name: 'Slate Matrix', hex: '#1E293B', role: 'Telemetry HUD containers and structural grid lines' },
    ],
    system: {
      statement: 'Mathematical precision meets real-time WebGL rendering.',
      description:
        'The underlying engine couples 3D RRT* (Rapidly-exploring Random Trees) with B-Spline curvature minimization, ensuring zero angular jerk across high-speed maneuvers while maintaining safety separation envelopes.',
      features: [
        {
          title: '3D RRT* Pathfinding',
          desc: 'Asymptotically optimal trajectory computation searching continuous 3D coordinate space with spherical collision checks.',
        },
        {
          title: 'B-Spline Smoothing',
          desc: 'Higher-order parametric spline smoothing converting jagged waypoint sequences into flyable kinematic trajectories.',
        },
        {
          title: 'WebSocket Telemetry',
          desc: 'Low-latency bidirectional state streaming transmitting coordinates, velocities, and clearance metrics at 60 Hz.',
        },
        {
          title: 'Spatial Clustering',
          desc: 'DBSCAN and k-Means clustering algorithms detecting localized swarm congestions before conflict points emerge.',
        },
      ],
    },
    principles: [
      'Sub-millisecond trajectory convergence.',
      'Deterministic safety separation buffers.',
      'Hardware-accelerated WebGL spatial telemetry.',
      'Resilient multi-agent conflict resolution.',
    ],
    quote: 'Autonomous flight paths synthesized at millisecond latency.',
    deliverables: [
      { group: 'Architecture', items: ['3D Spatial Planning Engine', 'Continuous Kinematic Solver', 'Conflict Resolution Matrix'] },
      { group: 'Engineering', items: ['Three.js WebGL Simulation Canvas', 'Realtime WebSocket Server', 'B-Spline Trajectory Interpolator'] },
      { group: 'Interface', items: ['Flight Telemetry HUD', 'Obstacle Density Configurator', 'Performance Profiler'] },
      { group: 'Analytics', items: ['Fleet Energy Consumption Models', 'Flight Duration Optimizers', 'Spatial Clustering Engine'] },
    ],
    nextSlug: 'c4future',
  },

  c4future: {
    slug: 'c4future',
    title: 'C4Future — Carbon Intelligence',
    client: 'C4Future Planetary Systems',
    year: '2024',
    discipline: 'Climate AI · Machine Learning · Enterprise Systems',
    timeline: '10 Weeks',
    roleSummary: 'Brand Strategy, UX/UI Design, Machine Learning Explainability, Frontend System',
    liveUrl: 'https://ad074890-c4future.hf.space/',
    liveLabel: 'Launch Carbon Intelligence App',
    accentColor: '#10B981',
    bgColor: '#07110E',
    inkColor: '#F2FBF7',
    heroMedia: {
      type: 'image',
      src: '/work/c4future/carbon-thumb.webp',
      alt: 'C4Future carbon intelligence dashboard forecasting product lifecycle emissions',
      aspectRatio: '16 / 9',
    },
    introMarkText: 'C4FUTURE',
    leadQuote: 'Forecasting Scope 3 product carbon footprints before committing manufacturing capital.',
    leadText:
      'Over 80% of an industrial product’s environmental footprint is locked in during initial design. C4Future empowers hardware engineering and procurement teams to estimate, explain, and optimize cradle-to-gate carbon emissions in seconds using conformal predictive models and TreeSHAP attribution.',
    challenge: {
      statement: 'Demystifying supply chain carbon data to guide early-stage material decisions.',
      body:
        'Traditional Life Cycle Assessments (LCAs) are retrospective, expensive, and require months of external auditing. C4Future needed an intuitive platform that translates raw bill-of-materials into instant emission forecasts with rigorous 90% confidence bounds, highlighting which sub-assemblies contribute the greatest ecological burden.',
    },
    showcase: {
      title: 'Explainable AI for Sustainable Manufacturing',
      caption: 'Decomposition trees, material substitution matrices, and emission confidence bounds.',
      items: [
        {
          src: '/work/c4future/carbon-thumb.webp',
          alt: 'C4Future intelligence overview with emission breakdowns and supply chain analytics',
          caption: 'TreeSHAP attribution isolating highest-impact component alloys',
        },
      ],
    },
    palette: [
      { name: 'Forest Shadow', hex: '#07110E', role: 'Deep night substrate and primary application surface' },
      { name: 'Bio Mint', hex: '#10B981', role: 'Primary brand accent and sustainability indicator' },
      { name: 'Solar Amber', hex: '#F59E0B', role: 'High-emission alerts and cautionary supply-chain nodes' },
      { name: 'Eucalyptus Pale', hex: '#D1FAE5', role: 'Contrasting typography and numeric readouts' },
      { name: 'Carbon Slate', hex: '#1F2937', role: 'Component cards and analytical comparative tables' },
    ],
    system: {
      statement: 'Predictive precision backed by transparent mathematical explainability.',
      description:
        'Rather than black-box approximations, C4Future leverages gradient-boosted regression trained on comprehensive Ecoinvent and global LCA databases, paired with conformal prediction intervals.',
      features: [
        {
          title: 'Conformal Prediction',
          desc: 'Guaranteed 90% statistical coverage intervals providing engineers with realistic uncertainty bounds.',
        },
        {
          title: 'TreeSHAP Attribution',
          desc: 'Game-theoretic Shapley additive explanations pinpointing the exact marginal contribution of each raw material.',
        },
        {
          title: 'Bill-of-Materials Parser',
          desc: 'Automated extraction of weights, metallurgy codes, and manufacturing processes from CAD metadata.',
        },
        {
          title: 'Material Substitution Matrix',
          desc: 'Live recalculation suggesting low-carbon alloy alternatives with equivalent tensile and thermal properties.',
        },
      ],
    },
    principles: [
      'Zero greenwashing: provable statistical bounds.',
      'Instant feedback in CAD ideation cycles.',
      'Actionable material substitutions.',
      'Auditable ESG compliance exports.',
    ],
    quote: 'Designing for circularity before the first bolt is turned.',
    deliverables: [
      { group: 'Strategy', items: ['Climate Tech Positioning', 'Product Taxonomy', 'Scientific Narrative'] },
      { group: 'Machine Learning', items: ['XGBoost Regressor Calibration', 'TreeSHAP Attribution Pipelines', 'Conformal Interval Bounds'] },
      { group: 'Design', items: ['Design System & Component Tokenization', 'Data Visualization Roster', 'Comparative Analysis Dashboard'] },
      { group: 'Implementation', items: ['Gradio & React Interface Integration', 'PDF Report Generator', 'REST Prediction API'] },
    ],
    nextSlug: 'ember-salt',
  },

  'ember-salt': {
    slug: 'ember-salt',
    title: 'Ember & Salt',
    client: 'Ember & Salt Hospitality Group',
    year: '2024',
    discipline: 'Brand Identity · Hospitality Design · Digital Experience',
    timeline: '8 Weeks',
    roleSummary: 'Brand Strategy, Visual Identity, Bento Digital Experience, Reservation Flow',
    liveUrl: 'https://ember-salt-bento.lovable.app/',
    liveLabel: 'Experience Ember & Salt',
    accentColor: '#E05A2B',
    bgColor: '#141211',
    inkColor: '#F6F1EB',
    heroMedia: {
      type: 'image',
      src: '/work/ember-salt/ember-fire.jpg',
      alt: 'Ember and Salt wood-fired culinary experience and open flame gastronomy',
      aspectRatio: '16 / 9',
    },
    introMarkText: 'EMBER & SALT',
    leadQuote: 'Elemental open-fire gastronomy translated into an immersive culinary digital journey.',
    leadText:
      'Rooted in ancient hearth cooking traditions and coastal foraging, Ember & Salt is a modern wood-fired dining institution. Flo Studios crafted a comprehensive brand world spanning custom wood-carved identity marks, tactile printed collateral, and a digital bento reservation platform.',
    challenge: {
      statement: 'Capturing the primal warmth of wood, smoke, and salt in an editorial digital medium.',
      body:
        'Hospitality websites frequently devolve into sterile booking widgets devoid of atmosphere. The challenge was to communicate the raw sensory drama of open-fire embers, iron cookware, and tidal seasonings while facilitating an effortless, high-conversion reservation flow for both dinner service and private cellar tastings.',
    },
    showcase: {
      title: 'A Sensory Hearth in Every Detail',
      caption: 'Warm textural typography, raw linen accents, and interactive tasting menus.',
      items: [
        {
          src: '/work/ember-salt/ember-fire.jpg',
          alt: 'Open flame grilling over aged oak embers at Ember & Salt',
          caption: 'Live wood-fire hearth showcasing seasonal heritage produce',
        },
      ],
    },
    palette: [
      { name: 'Char Black', hex: '#141211', role: 'Heavily charred iron and deep hearth darkness' },
      { name: 'Ember Ochre', hex: '#E05A2B', role: 'Open fire flame, heat accents, and interactive hovers' },
      { name: 'Raw Linen', hex: '#F6F1EB', role: 'Natural linen table runners, menus, and typography ground' },
      { name: 'Ash Smoke', hex: '#877E77', role: 'Subtle captions, borders, and tactile dividers' },
      { name: 'Deep Sea Kelp', hex: '#2A3029', role: 'Coastal foraging accents and seasonal wine pairings' },
    ],
    system: {
      statement: 'Hand-crafted warmth meets modern modular layouts.',
      description:
        'The design language balances tactile, physical materiality with crisp digital usability. Custom wood-block inspired typographic marks marry with a responsive bento-box grid that surfaces chef profiles, daily seafood catches, and sommelier notes.',
      features: [
        {
          title: 'Bento Culinary Grid',
          desc: 'Modular asymmetric cards spotlighting daily catch provenance, hearth techniques, and seasonal cocktails.',
        },
        {
          title: 'Interactive Cellar List',
          desc: 'Filterable natural and biodynamic wine registry categorized by soil minerality and vintage rarity.',
        },
        {
          title: 'Frictionless Booking Flow',
          desc: 'Integrated table reservation engine handling counter seating, main dining, and private event inquiries.',
        },
        {
          title: 'Sensory Typography',
          desc: 'Expressive serif display paired with clean, readable grotesque typefaces for effortless mobile readability.',
        },
      ],
    },
    principles: [
      'Honor the elemental ingredients: wood, smoke, salt.',
      'Warm tactile richness over sterile digital minimalism.',
      'Uncompromising hospitality in every click.',
      'Direct transparency in provenance and craft.',
    ],
    quote: 'Food cooked over live wood speaks directly to the soul.',
    deliverables: [
      { group: 'Brand Identity', items: ['Wordmark & Monogram Suite', 'Custom Stamp & Emboss Marks', 'Brand Guidelines & Tone of Voice'] },
      { group: 'Print Collateral', items: ['Letterpress Daily Menus', 'Sommelier Wine Book', 'Table Coasters & Matchboxes'] },
      { group: 'Digital Experience', items: ['Bento Grid Web Experience', 'Interactive Reservation System', 'Private Dining Inquiry Portal'] },
      { group: 'Art Direction', items: ['Hearth & Culinary Photography', 'Soundscape Design', 'Social Launch Vignettes'] },
    ],
    nextSlug: 'relay',
  },

  relay: {
    slug: 'relay',
    title: 'Relay Collaboration Platform',
    client: 'Relay Technologies',
    year: '2024',
    discipline: 'Product Design · Design System · Enterprise SaaS',
    timeline: '14 Weeks',
    roleSummary: 'Product Strategy, UI/UX Architecture, Component Library, Prototyping',
    liveUrl: 'https://slack-reverse.vercel.app/',
    liveLabel: 'Launch Relay Platform',
    accentColor: '#6366F1',
    bgColor: '#0C0F1D',
    inkColor: '#F8FAFC',
    heroMedia: {
      type: 'image',
      src: '/work/relay/relay-thumb.webp',
      alt: 'Relay team collaboration interface featuring channels, AI teammates, and live audio huddles',
      aspectRatio: '16 / 9',
    },
    introMarkText: 'RELAY',
    leadQuote: 'Team communication with an autonomous AI collaborator built into every channel.',
    leadText:
      'Relay rethinks workplace messaging by embedding autonomous AI co-workers directly alongside human team members. Instead of juggling fragmented tools, teams collaborate through a unified channel stream featuring live voice huddles, collaborative canvas documents, and proactive task routing.',
    challenge: {
      statement: 'Ending workspace fragmentation and alert fatigue with proactive context synthesis.',
      body:
        'Knowledge workers spend up to 40% of their workday piecing together context across disconnected chat rooms, docs, and issue trackers. Relay needed an operating system that transforms passive group chats into active problem-solving spaces where context flows seamlessly between live audio, written prose, and executable code.',
    },
    showcase: {
      title: 'Conversational Fluency Meets Actionable Canvases',
      caption: 'Real-time WebRTC audio huddles, dynamic notification tiers, and native markdown editors.',
      items: [
        {
          src: '/work/relay/relay-thumb.webp',
          alt: 'Relay interface showing channel hierarchy and integrated team workspace',
          caption: 'Autonomous agent participation within channel discussion threads',
        },
      ],
    },
    palette: [
      { name: 'Relay Night', hex: '#0C0F1D', role: 'Application chrome, sidebar surfaces, and dark viewports' },
      { name: 'Electric Indigo', hex: '#6366F1', role: 'Active workspace indicator, send states, and primary actions' },
      { name: 'Ultra Violet', hex: '#8B5CF6', role: 'AI teammate responses and automated thread syntheses' },
      { name: 'Ice Platinum', hex: '#F8FAFC', role: 'High-contrast typography and focus states' },
      { name: 'Slate Matrix', hex: '#1E293B', role: 'Input containers, hover overlays, and divider rules' },
    ],
    system: {
      statement: 'Low latency, zero clutter, and instantaneous context switching.',
      description:
        'Designed from the ground up for cognitive ergonomics. The layout adapts between focused single-thread deep work and high-level team radar monitoring with sub-100ms transitions.',
      features: [
        {
          title: 'Unified AI Co-Worker',
          desc: 'Persistent contextual assistant capable of summarizing 200+ message threads, pulling Git commits, and drafting PR reviews.',
        },
        {
          title: 'Spatial Audio Huddles',
          desc: 'Instant one-click audio rooms with spatial positioning, screen sharing, and automatic live transcription.',
        },
        {
          title: 'Collaborative Canvas',
          desc: 'Rich text and block-based markdown editor living side-by-side with conversations without tab switching.',
        },
        {
          title: 'Focus Notification Mesh',
          desc: 'Machine-learning prioritized notification routing filtering trivial chatter while surfacing urgent blockers.',
        },
      ],
    },
    principles: [
      'Zero context switching: work where you talk.',
      'Low latency is table stakes.',
      'AI as a humble, proactive participant.',
      'Calm aesthetics that reduce workday fatigue.',
    ],
    quote: 'The conversation is no longer separate from the work.',
    deliverables: [
      { group: 'Strategy', items: ['Competitive Benchmarking', 'User Persona Research', 'Information Architecture'] },
      { group: 'Product Design', items: ['Desktop App UX/UI', 'Mobile Companion Suite', 'Huddle Audio Interface'] },
      { group: 'Design System', items: ['Figma Token Architecture', 'Accessibility Compliance (WCAG AAA)', 'Micro-interaction Specs'] },
      { group: 'Engineering Handoff', items: ['React Component Library', 'WebRTC Signaling Flows', 'Design Tokens Schema'] },
    ],
    nextSlug: 'peak-club',
  },

  'peak-club': {
    slug: 'peak-club',
    title: 'Peak Club Snowboarding',
    client: 'Peak Club Alpine Collective',
    year: '2024',
    discipline: 'Brand Strategy · Technical Outerwear · Mobile Experience',
    timeline: '12 Weeks',
    roleSummary: 'Monogram Design, Technical Apparel System, Telemetry Mobile App, Campaign Direction',
    liveUrl: 'https://drive.google.com/drive/folders/177Brxs1FX737QdR_4e-o2uuIBsjKgzfL',
    liveLabel: 'View High-Res Design Archive',
    accentColor: '#0284C7',
    bgColor: '#0B132B',
    inkColor: '#F8FAFC',
    heroMedia: {
      type: 'image',
      src: '/work/peak-club/peak-head.webp',
      alt: 'Peak Club Snowboarding mountain identity and technical outerwear branding',
      aspectRatio: '16 / 9',
    },
    introMarkText: 'PEAK CLUB',
    leadQuote: 'Bridging backcountry freeride performance with high-altitude alpine culture.',
    leadText:
      'Peak Club was founded for riders who demand technical performance without sacrificing contemporary street aesthetics. Flo Studios crafted a complete brand ecosystem encompassing a geometric alpine monogram, weather-rated technical apparel trims, and a mobile telemetry platform.',
    challenge: {
      statement: 'Unifying hardcore big-mountain performance with lifestyle street culture.',
      body:
        'Snowboarding branding has long been divided between dated neon cliches and generic outdoor sportswear. Peak Club required a disciplined, high-contrast visual identity that looks striking at 3,000 meters in whiteout conditions while feeling culturally relevant in city centers.',
    },
    showcase: {
      title: 'From Mountain Ridges to Digital Coordinates',
      caption: 'The tripartite monogram, technical shell detailing, and companion biometric tracking.',
      items: [
        {
          src: '/work/peak-club/peak-head.webp',
          alt: 'Peak Club identity mark and brand visual system',
          caption: 'High-contrast alpine identity designed for whiteout visibility',
        },
        {
          src: '/work/peak-club/peak-app.webp',
          alt: 'Peak Club companion mobile application showing trail coordinates',
          caption: 'Biometric telemetry, avalanche risk advisories, and offline trail maps',
        },
        {
          src: '/work/peak-club/peak-mockup.webp',
          alt: 'Peak Club technical apparel and physical gear applications',
          caption: 'Technical outerwear trims, waterproof heat-transfer logos, and packaging',
        },
      ],
    },
    palette: [
      { name: 'Basalt Charcoal', hex: '#0B132B', role: 'Volcanic mountain rock and technical shell fabrics' },
      { name: 'Alpine Glacier', hex: '#0284C7', role: 'Ice crevasse blue, digital telemetry charts, and high-viz details' },
      { name: 'Summit Orange', hex: '#EA580C', role: 'Avalanche rescue beacons and safety equipment accents' },
      { name: 'Powder White', hex: '#F8FAFC', role: 'Fresh powder snow ground and high-contrast wordmark typography' },
      { name: 'Slate Granite', hex: '#334155', role: 'Subdued weather overlays and technical specifications' },
    ],
    system: {
      statement: 'Engineered for sub-zero readability and structural permanence.',
      description:
        'The monogram abstracts three descending mountain cols into a razor-sharp geometric glyph. Its heavy angles are calibrated to stitch cleanly onto technical Cordura outerwear and render crisply on mobile OLED displays.',
      features: [
        {
          title: 'Geometric Col Mark',
          desc: 'High-symmetry vector monogram engineered for laser-cut hypalon zipper pulls and die-cut decals.',
        },
        {
          title: 'Backcountry Telemetry App',
          desc: 'Offline GPS descent tracking, speed metrics, slope pitch telemetry, and emergency satellite beacon integration.',
        },
        {
          title: 'Technical Outerwear Trims',
          desc: 'Silicone heat-transfer badges, woven reflective labels, and weatherproof garment spec cards.',
        },
        {
          title: 'Lookbook & Campaign Direction',
          desc: 'High-grain black and white action photography juxtaposed against saturated cyan alpine sky vistas.',
        },
      ],
    },
    principles: [
      'High-contrast legibility in severe blizzards.',
      'Durability before decorative excess.',
      'Respect for the backcountry mountain environment.',
      'Unbroken connection between physical apparel and digital telemetry.',
    ],
    quote: 'The mountain does not negotiate.',
    deliverables: [
      { group: 'Brand Strategy', items: ['Alpine Brand Positioning', 'Backcountry Naming & Architecture', 'Brand Manifesto'] },
      { group: 'Identity System', items: ['Peak Col Monogram Suite', 'Weather-Rated Typography', 'Packaging & Hangtag System'] },
      { group: 'Apparel Design', items: ['Technical Outerwear Trim Kits', 'Hypalon Pulls & Waterproof Badges', 'Color Blocking Guidelines'] },
      { group: 'Digital Experience', items: ['iOS Telemetry Application', 'Offline Trail Mapping System', 'E-Commerce Showcase'] },
    ],
    nextSlug: 'apple-motion',
  },

  'apple-motion': {
    slug: 'apple-motion',
    title: 'Apple Product Motion',
    client: 'Flo Motion Lab',
    year: '2024',
    discipline: '3D Motion Design · Cinematic Lighting · Spatial Visualization',
    timeline: '6 Weeks',
    roleSummary: 'Kinematic Camera Choreography, Shader Engineering, 3D Realtime Motion, Sound Design',
    liveUrl: '/videos/apple.mp4',
    liveLabel: 'Watch 4K Master Video',
    accentColor: '#3B82F6',
    bgColor: '#09090B',
    inkColor: '#FAFAFA',
    heroMedia: {
      type: 'video',
      mp4: MOTION_REELS.apple.mp4,
      webm: MOTION_REELS.apple.webm,
      poster: MOTION_REELS.apple.poster,
      alt: 'Apple product spatial visualization showing kinematic camera curves and dynamic lighting',
      aspectRatio: '16 / 9',
    },
    introMarkText: 'MOTION 01',
    leadQuote: 'Choreographing light, titanium curvature, and spatial dynamics to reveal industrial elegance.',
    leadText:
      'High-end industrial design deserves motion that feels tactile, physical, and weightless all at once. Flo Studios engineered a cinema-grade product motion exploration highlighting precision micro-bevels, anisotropic brushed metal refractions, and fluid multi-camera kinematic transitions.',
    challenge: {
      statement: 'Capturing photorealistic material refractions and continuous camera inertia in real-time motion.',
      body:
        'Standard 3D renders often look sterile or plastic. The creative challenge was to capture the nuanced grazing angles of diffused light across physical anodized aluminum and curved glass surfaces, orchestrating camera moves that feel driven by natural physical momentum rather than artificial interpolation splines.',
    },
    showcase: {
      title: 'Micro-Bevels, Anisotropic Metals & Cinematic Shading',
      caption: 'Physically based rendering, multi-axis camera rigs, and high-dynamic-range lighting passes.',
      items: [
        {
          src: MOTION_REELS.apple.poster,
          alt: 'Apple spatial product motion keyframe render',
          caption: 'Precision anisotropic surface reflections and zero-tolerance edge highlights',
        },
      ],
    },
    palette: [
      { name: 'Deep Space', hex: '#09090B', role: 'Pure black cinema canvas and light-absorption environment' },
      { name: 'Titanium Grey', hex: '#D4D4D8', role: 'Chassis material, brushed metal highlights, and reflections' },
      { name: 'Accent Cobalt', hex: '#3B82F6', role: 'Subtle lens glare, UI active indicators, and laser guides' },
      { name: 'Photon White', hex: '#FFFFFF', role: 'Grazing rim lighting and specular highlight spikes' },
      { name: 'Graphite Shadow', hex: '#27272A', role: 'Volumetric shadows and bevel transitions' },
    ],
    system: {
      statement: 'Physics-driven kinematics meet zero-tolerance material shaders.',
      description:
        'Every frame was synthesized using custom ray-marched material nodes and continuous bezier camera rigs that mimic heavy cine lenses on mechanical robot arms.',
      features: [
        {
          title: 'Kinematic Spline Curves',
          desc: 'Custom acceleration curves with continuous second-order derivatives preventing sudden camera stops.',
        },
        {
          title: 'Anisotropic Micro-Shaders',
          desc: 'Simulated microscopic surface grooves creating authentic rotational light flares across curved metals.',
        },
        {
          title: 'Volumetric Depth of Field',
          desc: 'Physically accurate focal length and aperture simulations creating organic optical defocus.',
        },
        {
          title: 'Spatial Sound Design',
          desc: 'Frequency-tuned audio design matching physical camera velocity and resonant mechanical clicks.',
        },
      ],
    },
    principles: [
      'Honor the integrity of physical manufacturing.',
      'Continuous momentum: cameras never stop dead.',
      'Light reveals form; shadow creates drama.',
      'Sound and picture locked in frame-perfect sync.',
    ],
    quote: 'Simplicity is the consequence of eliminating the superfluous.',
    deliverables: [
      { group: 'Direction', items: ['Motion Concept Treatment', 'Storyboard & Beat Sheet', 'Camera Choreography Rigs'] },
      { group: '3D Execution', items: ['Sub-D Surface Modeling', 'Anisotropic Material Shaders', 'Volumetric Lighting Rig'] },
      { group: 'Compositing', items: ['4K Multi-Pass Compositing', 'Optical Glare Calibration', 'Color Grade Master (ACEScg)'] },
      { group: 'Audio', items: ['Spatial Foley Design', 'Sub-Bass Kinetic Accents', 'Soundtrack Mixing'] },
    ],
    nextSlug: 'blitzit-motion',
  },

  'blitzit-motion': {
    slug: 'blitzit-motion',
    title: 'Blitzit 2.0 Interface Motion',
    client: 'Blitzit Systems',
    year: '2024',
    discipline: 'Interaction Motion · Micro-interactions · Kinetic Systems',
    timeline: '8 Weeks',
    roleSummary: 'Motion Architecture, Micro-interaction Design, Gesture Physics, Performance Profiling',
    liveUrl: '/videos/blitzit2.mp4',
    liveLabel: 'Watch Interface Motion Reel',
    accentColor: '#A3E635',
    bgColor: '#0A0A0A',
    inkColor: '#FAFAFA',
    heroMedia: {
      type: 'video',
      mp4: MOTION_REELS.blitzit.mp4,
      webm: MOTION_REELS.blitzit.webm,
      poster: MOTION_REELS.blitzit.poster,
      alt: 'Blitzit 2.0 interface motion reel showcasing micro-interactions and gesture physics',
      aspectRatio: '16 / 9',
    },
    introMarkText: 'BLITZIT 2.0',
    leadQuote: 'Fluid micro-interactions and gesture response curves engineered for effortless high-velocity flow.',
    leadText:
      'Productivity applications often fail because their UI states feel sluggish or disjointed. For Blitzit 2.0, Flo Studios developed a comprehensive motion design language built around critically damped spring physics, zero-latency feedback loops, and tactile spatial state morphs.',
    challenge: {
      statement: 'Designing interactive transitions that feel instantaneous while preserving spatial continuity.',
      body:
        'When power users operate at 120 actions per minute, gratuitous animations waste time. The goal was to eliminate all static loading states and replace linear CSS transitions with spring-mass systems that complete under 200ms without ever jarring the user’s cognitive focus.',
    },
    showcase: {
      title: 'Spring Dynamics & Kinetic Feedback Systems',
      caption: 'Critically damped springs, nested hierarchy collapses, and interactive completion bursts.',
      items: [
        {
          src: MOTION_REELS.blitzit.poster,
          alt: 'Blitzit 2.0 micro-interaction state preview',
          caption: 'Fluid task completion morphs with neon lime accent indicators',
        },
      ],
    },
    palette: [
      { name: 'Dark Void', hex: '#0A0A0A', role: 'Main canvas and distraction-free dark background' },
      { name: 'Neon Lime', hex: '#A3E635', role: 'Active task focus, completion celebrations, and keyboard triggers' },
      { name: 'Cyber Graphite', hex: '#27272A', role: 'Structural task cards and hover border definitions' },
      { name: 'Crisp White', hex: '#FAFAFA', role: 'High-contrast typography and icon glyphs' },
      { name: 'Slate Muted', hex: '#71717A', role: 'Metadata timestamps, secondary shortcuts, and inactive states' },
    ],
    system: {
      statement: 'Critically damped springs tuned for high-velocity cognitive focus.',
      description:
        'We calibrated the mathematical stiffness and damping ratios of every element so movement feels weightless, decisive, and natural to the human eye.',
      features: [
        {
          title: 'Critically Damped Springs',
          desc: 'Zero overshoot spring parameters delivering immediate physical responsiveness without annoying bouncing.',
        },
        {
          title: 'Shared Element Morphs',
          desc: 'Seamless geometric expansion from list rows into full modal task detail canvases without page redraws.',
        },
        {
          title: 'Haptic Motion Sync',
          desc: 'Tactile haptic pulses synchronized with visual completion ticks for visceral tactile validation.',
        },
        {
          title: '60 FPS Frame Budget',
          desc: 'Strict GPU transform-only animations guaranteeing zero layout thrashing on low-power mobile devices.',
        },
      ],
    },
    principles: [
      'Speed is the ultimate feature: under 200ms always.',
      'Never break spatial orientation.',
      'Damped spring physics beats linear easing every time.',
      'Delight emerges from responsiveness, not decoration.',
    ],
    quote: 'When software responds with zero friction, work feels like play.',
    deliverables: [
      { group: 'Strategy', items: ['Cognitive Flow Audits', 'Interaction Benchmark Matrix', 'Keyboard Navigation Mapping'] },
      { group: 'Motion Design', items: ['Full Interface Motion Reel', 'Micro-interaction Token System', 'State Transition Maps'] },
      { group: 'Code Specs', items: ['Framer Motion Spring Tokens', 'CSS GPU Compositing Rules', 'Gesture Velocity Interpolators'] },
      { group: 'Design System', items: ['Interactive Storybook Preview', 'Keyboard Shortcut Guides', 'Haptic Sound & Vibration Packs'] },
    ],
    nextSlug: 'sv-showreel',
  },

  'sv-showreel': {
    slug: 'sv-showreel',
    title: 'SV Studio Showreel',
    client: 'Flo Creative Group',
    year: '2024',
    discipline: 'Studio Reel · Kinetic Typography · Creative Direction',
    timeline: '6 Weeks',
    roleSummary: 'Editorial Direction, Kinetic Typographic Systems, Sound Design, Final Cut',
    liveUrl: '/videos/sv-final.mp4',
    liveLabel: 'Watch High-Fidelity Reel',
    accentColor: '#EAB308',
    bgColor: '#09090B',
    inkColor: '#FAFAFA',
    heroMedia: {
      type: 'video',
      mp4: MOTION_REELS.sv.mp4,
      webm: MOTION_REELS.sv.webm,
      poster: MOTION_REELS.sv.poster,
      alt: 'SV Studio showreel highlighting kinetic typography, 3D systems, and brand direction',
      aspectRatio: '16 / 9',
    },
    introMarkText: 'SV STUDIO',
    leadQuote: 'Distilling three years of multifaceted brand transformations and experimental interfaces into an uncompromising 60-second statement.',
    leadText:
      'The SV Studio Showreel is Flo Studios’ definitive cinematic manifesto. Combining kinetic typography, 3D spatial simulations, identity systems, and pulse-pounding sound design, it captures our commitment to design that cuts through the noise.',
    challenge: {
      statement: 'Harmonizing divergent client projects into a singular, rhythmic creative crescendo.',
      body:
        'A studio reel risks feeling like an arbitrary montage of unrelated clips. We treated the showreel as an original motion film with custom audio composition, unifying disparate domains—fintech, aerospace, alpine sports, and high-end gastronomy—under a unified visual tempo.',
    },
    showcase: {
      title: 'Pacing, Typography & Rhythm in Absolute Harmony',
      caption: 'Dynamic frame transitions, custom kinetic type suites, and beat-locked audio pacing.',
      items: [
        {
          src: MOTION_REELS.sv.poster,
          alt: 'SV Studio showreel title frame and typography treatment',
          caption: 'High-contrast studio title card with gold illumination',
        },
      ],
    },
    palette: [
      { name: 'True Black', hex: '#09090B', role: 'Cinematic theater canvas and deep optical shadows' },
      { name: 'Studio Gold', hex: '#EAB308', role: 'Main brand accent, prestige highlights, and typography accents' },
      { name: 'Pure White', hex: '#FAFAFA', role: 'Punchy headline typography and rapid flash frames' },
      { name: 'Velvet Charcoal', hex: '#18181B', role: 'Letterbox borders and background card layers' },
      { name: 'Muted Platinum', hex: '#71717A', role: 'Timeline timecodes and editorial chapter marks' },
    ],
    system: {
      statement: 'Audio-driven editorial cadence and procedural typographic choreography.',
      description:
        'Every cut was synchronized down to the exact millisecond audio transient. Custom kinetic fonts flex and distort dynamically in response to low-frequency sub-bass hits.',
      features: [
        {
          title: 'Beat-Synced Montage',
          desc: 'Frame-accurate video cuts aligned with bespoke electronic soundtrack transients.',
        },
        {
          title: 'Kinetic Type Systems',
          desc: 'Variable font weight and tracking modulations tied to motion velocity curves.',
        },
        {
          title: 'Color Grading Master',
          desc: 'Unified ACEScg color pipeline ensuring visual cohesion across 3D renders and live footage.',
        },
        {
          title: 'Spatial Audio Composition',
          desc: 'Bespoke sound design featuring sub-drops, risers, and tactile tactile Foley elements.',
        },
      ],
    },
    principles: [
      'Every frame must hold its ground as a still image.',
      'Rhythm is felt, not calculated.',
      'Contrast between quiet minimalism and explosive maximalism.',
      'Uncompromising production standards.',
    ],
    quote: 'Design that demands attention, engineered to endure.',
    deliverables: [
      { group: 'Creative Direction', items: ['Showreel Treatment & Script', 'Visual Cadence Mapping', 'Asset Curation & Editorial'] },
      { group: 'Motion & Type', items: ['Kinetic Typography Suite', 'Bespoke Transition Cards', '3D Scene Assemblies'] },
      { group: 'Sound Production', items: ['Custom Electronic Score', 'Foley & SFX Mixing', 'Surround Sound Mastering'] },
      { group: 'Deliverables', items: ['4K Ultra HD Display Cut', 'Vertical Social Cuts (9:16)', 'Web-Optimized Streaming Chunks'] },
    ],
    nextSlug: 'abstruct',
  },
}
