/**
 * ═════════════════════════════════════════════════════════════════
 * FLO STUDIOS — EDITORIAL DISPATCHES & ARTICLES DATA MODULE
 * Structured blog articles and press dispatches matching Instrument.com
 * ═════════════════════════════════════════════════════════════════
 */

export const BLOG_POSTS = [
  {
    id: 'blog-1',
    slug: 'every-handoff-is-a-leak',
    title: 'Every Handoff Is a Leak: Why the Transaction Model Dilutes Great Ideas',
    displayTitle: 'Every Handoff Is a Leak',
    titleLead: 'Every Handoff Is',
    titleHighlight: 'a Leak.',
    type: 'article',
    readTime: '6 minutes',
    category: 'Product Strategy & Philosophy',
    author: 'Flo Studios Editorial',
    publishedDate: 'October 2026',
    coverImage: 'https://a-us.storyblok.com/f/1004432/1080x1080/4951b14198/thumb_instrument_beyondthebrief.jpg/m/',
    heroImage: 'https://a-us.storyblok.com/f/1004432/1920x1080/890e3114b9/instrument_taste-is-the-new-advantage_2.jpg/m/',
    excerpt:
      "There is a particular kind of frustration that every founder and creator knows intimately: the product ships and something feels hollow. Why fragmented work quietly kills vision at every seam.",
    summaryQuote:
      '“A project doesn’t fail at the handoff. It fails at every small moment where the person holding it didn’t have the full picture, and had no way of getting it.”',
    content: [
      {
        type: 'intro',
        paragraphs: [
          "There is a particular kind of frustration that every founder and creator knows intimately but rarely manages to name correctly — the kind where the product ships and something feels off, not broken exactly, just hollow in a way that's hard to articulate. The video goes live and it's technically fine, competently put together, but it doesn't sound like you anymore, and the people watching can probably feel that even if they can't say why. The app works, the features are there, but the experience doesn't carry the weight of the idea you had at the beginning, the one that made you want to build the thing in the first place.",
          "Most people, when they sit with that feeling long enough, land on execution as the culprit — someone dropped the ball, missed the brief, didn't care enough — so the next time around they go looking for better people, a more experienced developer, a more senior designer, a more talented editor, and then it happens again anyway.",
          "The problem was never the people, and we say that having worked alongside some genuinely exceptional individuals who delivered exactly what they were scoped to deliver and still produced an end result that felt assembled rather than built — because that's precisely what it was. A series of well-executed fragments passed from one person to the next, with a little bit of the original intent quietly dying at every seam, until by the time it reached the finish line the idea that sparked the whole thing had been replaced by a technically correct version of itself that nobody involved was fully responsible for. The real problem didn't begin at execution. It began the moment the work got divided up."
        ]
      },
      {
        type: 'section',
        heading: 'The transaction model is the problem',
        paragraphs: [
          "Both the creative and tech industries have built themselves almost entirely around a project-as-transaction mindset, where the logic goes: you have a need, you find someone who covers that need, they deliver, you move on to whoever covers the next one. A founder with a product idea hires a team for product planning, then a separate research team to handle market and technical research, then someone to set the project up, then a UI/UX designer to design the experience, then a developer to build it, then a QA team to test it, then someone to manage the pre-launch, then the launch itself, then post-launch support, and eventually a maintenance team to keep it running — each one a separate engagement, each one scoped to their slice, and each one handed a baton that carries a little less of the original vision than the one before it, in a way that looks like a well-organized process on paper but is actually something closer to organized fragmentation.",
          "What it produces in practice is a chain of technically correct decisions that have no meaningful relationship to each other, where the developer never spoke to the designer and the marketer never really understood what the product was trying to be, and everyone did their individual job well enough that nobody can point to a single moment where it went wrong, it just arrived somewhere that felt like a diluted version of the original intention.",
          "The same pattern runs through the creator economy just as reliably, where a creator hands their idea to one person to script, another to shoot, another to edit, another to handle distribution, and each handoff bleeds a little more of the original creative instinct that made the idea worth pursuing until by the time the video publishes nobody is quite sure whose voice it actually is anymore."
        ],
        pullQuote:
          '“Every handoff is a leak. Not of files or folders but of intent, context, and the original thinking that made the idea worth building.”'
      },
      {
        type: 'section',
        heading: 'What gets lost in the handoff',
        paragraphs: [
          "In the tech industry this problem runs deeper than most founders realize, partly because the stakes at each stage are higher and the decisions made are significantly harder to reverse once the next stage has already built on top of them. When a product moves from strategy to design to development as three separate engagements with three separate teams, something breaks at every seam in ways that are individually small and collectively damaging — the strategist understood the user's problem clearly but isn't in the room when the designer makes visual decisions that quietly reframe it, the designer built something with a specific interaction logic in mind but isn't present when the developer interprets the spec, and the developer built it as written but doesn't fully understand why certain things were prioritized, so when tradeoffs come up — and they always do — they make calls based on what's technically cleaner rather than what was originally intentional.",
          "Each of those gaps between intent and execution is small enough on its own, but accumulated across an entire build they are the difference between a product that feels like it was always going to exist and one that feels like it was put together from parts.",
          "In creative work the damage shows up differently but it's equally real, and tone tends to be the first casualty — the person who wrote the script had a specific rhythm and register in mind, the editor who never had a conversation with the creator cuts for pacing and loses it, the thumbnail designer picks the frame that performs best visually but is wrong for the audience that actually follows this person, and none of them made bad decisions so much as uninformed ones, because they were each brought in to execute a fragment of something they were never given full sight of."
        ]
      },
      {
        type: 'section',
        heading: 'Why single-service engagements make this worse',
        paragraphs: [
          "Hiring for a single service feels like the rational and financially sensible move, you pay for exactly what you need and nothing more, but what you're actually doing is hiring someone to solve a problem they can only ever partially see, which means the solution they give you is always going to be partial too, optimized for the fragment they were handed rather than for the outcome the whole thing was supposed to produce. A developer brought in purely to build has no real stake in whether the product should be built the way it's been designed, an editor brought in purely to cut has no stake in whether the content strategy behind the video actually makes sense for the channel, a designer brought in purely to make something look good has no stake in whether it works — their incentive is entirely to deliver the output they were scoped for, not to step back and question whether that output is serving the larger goal it was meant to serve.",
          "This is not a failure of talent or commitment, it's a failure of structure, because when you hire for fragments you get fragments back and the integration work — the part that makes the fragments add up to something coherent — belongs to nobody's brief, so it either doesn't happen at all or it falls back onto the founder or creator to do themselves, which is the precise thing they hired people to take off their plate."
        ],
        pullQuote:
          '“When you hire for fragments, you get fragments back. The part that makes them add up to something is work nobody is being paid to do.”'
      },
      {
        type: 'section',
        heading: 'How Flo approaches this differently',
        paragraphs: [
          "We don't take single-service briefs, not because we're incapable of executing them but because executing a fragment of something without owning the whole isn't really a service, it's a transaction, and transactions don't compound into anything that lasts or that a client can genuinely build on. The way we work is one continuous thread, where the same understanding that shapes the strategy is still present at every stage that follows it:"
        ],
        stages: [
          {
            name: 'Product Planning',
            desc: "We start by understanding the idea at its core, what it is, who it's for, and what it needs to be before anyone writes a line of code or opens a design tool, so every decision that comes after it is grounded in something real rather than assumed."
          },
          {
            name: 'Research',
            desc: "Market research and technical research happen together and inform each other, because a product's feasibility and its positioning aren't separate questions and shouldn't be answered by separate people."
          },
          {
            name: 'Project Setup',
            desc: "The architecture of how the project runs, timelines, structure, communication, is designed around the product's specific needs rather than a generic template, and the people setting it up already understand the context behind it."
          },
          {
            name: 'UI/UX Design',
            desc: "Design isn't handed a brief and left to interpret it alone; the thinking that went into planning and research is still in the room, which means the experience being designed is built on the same foundation the strategy was."
          },
          {
            name: 'Development',
            desc: "The developer isn't receiving a finished spec from a team they've never met; they've been part of the conversation long enough to understand why things are the way they are, which changes every tradeoff call they make."
          },
          {
            name: 'QA',
            desc: "Testing is done with an understanding of what the product is supposed to feel like, not just whether it functions, so what gets flagged is informed by intent and not just spec."
          },
          {
            name: 'Pre-launch & Launch',
            desc: "The people managing the launch are the same people who built the thing, which means positioning, messaging, and timing decisions are made by people who actually understand what they're putting into the world."
          },
          {
            name: 'Post-launch Support & Maintenance',
            desc: "When something needs to change or something breaks, the team handling it has the full history of why every decision was made, so fixes and iterations are consistent with the original vision rather than working around it."
          }
        ],
        closingParagraph:
          "The result is better work, and it is also consistently faster work, because a significant portion of what slows projects down at every stage is the time spent re-explaining to the next person why things are the way they are, and when there is no next person to explain to, that time disappears entirely."
      },
      {
        type: 'section',
        heading: 'The outcome is the only brief that matters',
        paragraphs: [
          "The creative and tech industries have spent a long time training clients to think in deliverables — the logo, the app, the video, the campaign — as though the deliverable and the outcome are the same thing, when they almost never are. A logo doesn't grow a brand on its own, a video doesn't build an audience by existing, an app doesn't acquire users just because it shipped, and what actually produces those outcomes is a series of deeply connected decisions made by people who understood the whole thing from the beginning and carried that understanding consistently from the first conversation all the way through to the final product.",
          "That's what end-to-end actually means when it's working: not a longer list of services offered, but a fundamentally different relationship to the result, where the people building the thing are the ones responsible for what it becomes."
        ],
        pullQuote:
          '“A project doesn’t fail at the handoff. It fails at every small moment where the person holding it didn’t have the full picture, and had no way of getting it.”'
      }
    ]
  }
]

export function getAllBlogs() {
  return BLOG_POSTS
}

export function getBlogBySlug(slug) {
  if (!slug) return null
  return BLOG_POSTS.find((b) => b.slug.toLowerCase() === slug.toLowerCase()) || null
}

export function getRelatedBlogs(currentSlug, limit = 3) {
  return BLOG_POSTS.filter((b) => b.slug.toLowerCase() !== (currentSlug || '').toLowerCase()).slice(0, limit)
}
