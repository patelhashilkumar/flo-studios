/**
 * ═════════════════════════════════════════════════════════════════
 * FLO STUDIOS — EDITORIAL DISPATCHES & ESSAYS DATA MODULE
 * Authentic studio blogs with pure internal editorial styling (zero external Instrument images)
 * ═════════════════════════════════════════════════════════════════
 */

export const BLOG_POSTS = [
  {
    id: 'blog-1',
    number: '01',
    orderNumber: 1,
    slug: 'every-handoff-is-a-leak',
    aliases: ['blog-1', 'the-handoff-trap'],
    title: 'Every Handoff Is a Leak: Why the Transaction Model Dilutes Great Ideas',
    displayTitle: 'Every Handoff Is a Leak',
    titleLead: 'Every Handoff Is',
    titleHighlight: 'a Leak.',
    type: 'article',
    readTime: '6 minutes',
    category: 'Product Strategy & Philosophy',
    author: 'Flo Studios Editorial',
    publishedDate: 'October 2026',
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
  },
  {
    id: 'blog-2',
    number: '02',
    orderNumber: 2,
    slug: 'taste-is-the-new-skill',
    aliases: ['blog-2', 'taste-new-skill'],
    title: 'Taste is the New Skill',
    displayTitle: 'Taste is the New Skill',
    titleLead: 'Taste is the',
    titleHighlight: 'New Skill.',
    type: 'article',
    readTime: '5 minutes',
    category: 'Design & Engineering Craft',
    author: 'Flo Studios Editorial',
    publishedDate: 'October 2026',
    excerpt:
      "When the cost of producing something drops to near zero, the market gets flooded with adequate work. In a world of automated output, perspective and discernment become the greatest differentiators.",
    summaryQuote:
      '“Taste has always mattered. It just wasn\'t the bottleneck. Now it is.”',
    content: [
      {
        type: 'intro',
        paragraphs: [
          "In times where an individual thinks about a product within an hour and makes the final build with just a few sentences the following day, informs us that execution isn’t the golden standard anymore. The barriers that are being broken down with the help of AI, around building products that too in a very short period of time is disregarding the value that “unfiltered output” upholds, but at the same time what has become dramatically valuable is the ability to have a reliable judgment when you need to make a decision, and knowing why it is reliable.",
          "And that leads us to the break point that the most meager resource in a process of building something now is nothing else but the perspective with which you approach the build."
        ]
      },
      {
        type: 'section',
        heading: 'How Taste became so essential',
        paragraphs: [
          "This reality has given rise to the tech industry’s new favorite buzzword: taste. But unlike most buzzwords, this one actually points at something real. Taste isn’t about having an eye for aesthetics or knowing which fonts pair well together. It is the ability to sit in front of something — a product, a piece of content, a pitch — and know almost immediately whether it is honest to what it is trying to be. It is pattern recognition built from years of consuming deeply and producing critically. And crucially, it is the thing that tells you not just what to build next, but what to stop building right now.",
          "The reason it has become so essential is straightforward: when the cost of producing something drops to near zero, the market gets flooded. Not with bad work but with adequate work which can be replicated all the time. These products are technically sound, reasonably polished, and also completely indistinct. And in a sea of adequate, the only thing that cuts through is something that has a genuine point of view baked into every decision that shaped it. That point of view is taste in action."
        ],
        pullQuote:
          '“Taste is not what you add. It is what you remove — knowing what to cut, when to stop, and what the work actually needs versus what it could theoretically tolerate.” — Nuwadan, Designer @Flo'
      },
      {
        type: 'section',
        heading: 'How Flo practices taste in their work',
        paragraphs: [
          "Taste for us isn’t a value we put on a deck, it is the standard we hold every piece of work to before it leaves our hands. Across both our Creator and Development divisions, it shows up in a few consistent ways."
        ]
      },
      {
        type: 'section',
        heading: 'Being innovative in what we create',
        paragraphs: [
          "Discernment begins before we make anything. Every brief, every concept, every creative direction starts with the same pressure: is this actually original, or is this just the most obvious version of the answer? Because the most obvious version is exactly what AI will give you without being asked. Our job is to reach past that.",
          "Whether we’re building a content strategy for a creator or architecting the experience of a new digital product, we’re looking for the idea that a competitor can’t easily reverse-engineer, the one that comes from a specific understanding of the audience, the brand, the moment, and as well as have a reason behind it. Nobody remembers the generic version of anything. It takes a genuine creative conviction to build something that feels specific, surprising, and entirely its own."
        ]
      },
      {
        type: 'section',
        heading: 'Holding the standard under pressure',
        paragraphs: [
          "Speed is a real constraint. Clients have deadlines, creators have posting schedules, and development cycles have milestones. Taste gets tested hardest in those moments when the adequate version is ready and the right version needs one more pass. What we’ve learned is that the teams who consistently produce work that stands out are the ones who treat that final judgment not as a luxury but as a nonnegotiable step in the process.",
          "The question is never just “is it done?” It’s “does it actually deserve to exist?”"
        ]
      },
      {
        type: 'section',
        heading: 'The uncomfortable truth about building taste',
        paragraphs: [
          "It doesn’t come fast, and it doesn’t come from tools. It comes from the discipline of paying close attention to the work you admire, to the work you make, and especially to the gap between the two. It requires you to articulate why something works, not just that it does. It requires honest feedback, from people who care enough to tell you when something isn’t there yet. And it requires the willingness to slow down at the exact moment when everything around you is optimizing for speed.",
          "That last part is what makes it rare. In an environment that rewards output, developing taste asks you to occasionally prioritize judgment over momentum. Most people won’t do it. The ones who do are building something that becomes genuinely difficult to compete with — because you can copy a workflow, you can copy a format, but you cannot copy the years of calibrated attention that produced someone’s instinct for what is worth making.",
          "The professionals who will define the next decade of media and technology are not the ones who can use the most tools. They are the ones who have the clearest sense of what's worth making and the conviction to pursue it, even when the path of least resistance goes somewhere else."
        ],
        pullQuote:
          '“Taste has always mattered. It just wasn\'t the bottleneck. Now it is.”'
      }
    ]
  }
]

export function getAllBlogs() {
  return BLOG_POSTS
}

export function getBlogBySlug(slug) {
  if (!slug) return null
  const clean = slug.toLowerCase()
  return (
    BLOG_POSTS.find(
      (b) =>
        b.slug.toLowerCase() === clean ||
        b.id.toLowerCase() === clean ||
        (b.aliases && b.aliases.some((a) => a.toLowerCase() === clean))
    ) || null
  )
}

export function getRelatedBlogs(currentSlug, limit = 3) {
  const current = getBlogBySlug(currentSlug)
  const currentId = current ? current.id : currentSlug
  return BLOG_POSTS.filter(
    (b) => b.id !== currentId && b.slug !== currentSlug
  ).slice(0, limit)
}
