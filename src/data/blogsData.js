/**
 * ═════════════════════════════════════════════════════════════════
 * FLO STUDIOS — EDITORIAL DISPATCHES & ESSAYS DATA MODULE
 * Authentic studio blogs with pure internal editorial typography & styling
 * ═════════════════════════════════════════════════════════════════
 */

export const BLOG_POSTS = [
  {
    id: 'blog-1',
    number: '01',
    orderNumber: 1,
    slug: 'nobody-owns-the-outcome',
    aliases: ['blog-1', 'every-handoff-is-a-leak', 'the-handoff-trap'],
    title: 'Nobody Owns the Outcome: What gets lost every time a project changes hands',
    displayTitle: 'Nobody Owns the Outcome',
    titleLead: 'Nobody Owns',
    titleHighlight: 'the Outcome.',
    type: 'article',
    readTime: '7 min read',
    category: 'Creator Economy • Software Development',
    author: 'Flo Studios',
    publishedDate: 'October 2026',
    subtitle: 'What gets lost every time a project changes hands',
    excerpt:
      "There is a particular kind of frustration that every founder and creator knows intimately: the product ships and something feels hollow. Why fragmented work quietly kills vision at every seam.",
    summaryQuote:
      '“A project doesn’t fail at the handoff. It fails at every small moment where the person holding it didn’t have the full picture, and had no way of getting it.”',
    content: [
      {
        type: 'intro',
        paragraphs: [
          "There is a particular kind of frustration that every founder and creator knows intimately but rarely manages to name correctly — the kind where the product ships and something feels off, not broken exactly, just hollow in a way that's hard to articulate. The video goes live and it's technically fine, competently put together, but it doesn't sound like you anymore, and the people watching can probably feel that even if they can't say why. The app works, the features are there, but the experience doesn't carry the weight of the idea you had at the beginning, the one that made you want to build the thing in the first place. Most people, when they sit with that feeling long enough, land on execution as the culprit — someone dropped the ball, missed the brief, didn't care enough — so the next time around they go looking for better people, a more experienced developer, a more senior designer, a more talented editor, and then it happens again anyway.",
          "The problem was never the people, and we say that having worked alongside some genuinely exceptional individuals who delivered exactly what they were scoped to deliver and still produced an end result that felt assembled rather than built — because that's precisely what it was. A series of well-executed fragments passed from one person to the next, with a little bit of the original intent quietly dying at every seam, until by the time it reached the finish line the idea that sparked the whole thing had been replaced by a technically correct version of itself that nobody involved was fully responsible for. The real problem didn't begin at execution. It began the moment the work got divided up."
        ]
      },
      {
        type: 'section',
        heading: 'The transaction model is the problem',
        paragraphs: [
          "Both the creative and tech industries have built themselves almost entirely around a project-as-transaction mindset, where the logic goes: you have a need, you find someone who covers that need, they deliver, you move on to whoever covers the next one. A founder with a product idea hires a team for product planning, then a separate research team to handle market and technical research, then someone to set the project up, then a UI/UX designer to design the experience, then a developer to build it, then a QA team to test it, then someone to manage the pre-launch, then the launch itself, then post-launch support, and eventually a maintenance team to keep it running — each one a separate engagement, each one scoped to their slice, and each one handed a baton that carries a little less of the original vision than the one before it, in a way that looks like a well-organised process on paper but is actually something closer to organised fragmentation.",
          "What it produces in practice is a chain of technically correct decisions that have no meaningful relationship to each other, where the developer never spoke to the designer and the marketer never really understood what the product was trying to be, and everyone did their individual job well enough that nobody can point to a single moment where it went wrong — it just arrived somewhere that felt like a diluted version of the original intention. The same pattern runs through the creator economy just as reliably, where a creator hands their idea to one person to script, another to shoot, another to edit, another to handle distribution, and each handoff bleeds a little more of the original creative instinct that made the idea worth pursuing until by the time the video publishes nobody is quite sure whose voice it actually is anymore."
        ],
        pullQuote:
          '“Every handoff is a leak. Not of files or folders — but of intent, context, and the original thinking that made the idea worth building.”'
      },
      {
        type: 'section',
        heading: 'What gets lost in the handoff',
        paragraphs: [
          "In the tech industry this problem runs deeper than most founders realize, partly because the stakes at each stage are higher and the decisions made are significantly harder to reverse once the next stage has already built on top of them.",
          "When a product moves from strategy to design to development as three separate engagements with three separate teams, something breaks at every seam in ways that are individually small and collectively damaging — the strategist understood the user's problem clearly but isn't in the room when the designer makes visual decisions that quietly reframe it, the designer built something with a specific interaction logic in mind but isn't present when the developer interprets the spec, and the developer built it as written but doesn't fully understand why certain things were prioritized, so when tradeoffs come up — and they always do — they make calls based on what's technically cleaner rather than what was originally intentional.",
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
          "We don't take single-service briefs, not because we're incapable of executing them but because executing a fragment of something without owning the whole isn't really a service — it's a transaction, and transactions don't compound into anything that lasts or that a client can genuinely build on. The way we work is one continuous thread, where the same understanding that shapes the strategy is still present at every stage that follows it:"
        ],
        stages: [
          {
            name: 'Product Planning',
            desc: "We start by understanding the idea at its core — what it is, who it's for, and what it needs to be before anyone writes a line of code or opens a design tool, so every decision that comes after is grounded in something real rather than assumed."
          },
          {
            name: 'Research',
            desc: "Market research and technical research happen together and inform each other, because a product's feasibility and its positioning aren't separate questions and shouldn't be answered by separate people."
          },
          {
            name: 'Project Setup',
            desc: "The architecture of how the project runs — timelines, structure, communication — is designed around the product's specific needs rather than a generic template, and the people setting it up already understand the context behind it."
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
          "That's what end-to-end actually means when it's working — not a longer list of services offered, but a fundamentally different relationship to the result, where the people building the thing are the ones responsible for what it becomes."
        ],
        pullQuote:
          '“A project doesn’t fail at the handoff. It fails at every small moment where the person holding it didn’t have the full picture — and had no way of getting it.”'
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
    readTime: '5 min read',
    category: 'Design & Engineering Craft',
    author: 'Flo Studios',
    publishedDate: 'October 2026',
    subtitle: 'In an era where anyone can build in an hour, discernment is the greatest competitive differentiator.',
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
  },
  {
    id: 'blog-3',
    number: '03',
    orderNumber: 3,
    slug: 'the-clarity-tax',
    aliases: ['blog-3', 'the-smarter-the-tool', 'more-expensive-vagueness'],
    title: 'The Smarter the Tool, the More Expensive Your Vagueness Gets',
    displayTitle: 'The Clarity Tax',
    titleLead: 'The Smarter the Tool, the More Expensive',
    titleHighlight: 'Your Vagueness Gets.',
    type: 'article',
    readTime: '6 min read',
    category: 'AI • Creator Economy • Software Development',
    author: 'Flo Studios',
    publishedDate: 'October 2026',
    subtitle: 'Why AI amplifies unclear thinking instead of fixing it',
    excerpt:
      "AI doesn't compensate for unclear thinking. It scales it. A vague brief produces fifty mediocre outputs in four minutes — why the cost of not knowing what you want has never been higher.",
    summaryQuote:
      '“The cost of vagueness has always been real. AI just made it impossible to defer.”',
    content: [
      {
        type: 'intro',
        paragraphs: [
          "There is an assumption quietly embedded in how most teams talk about AI, and it goes something like this: the tool is powerful enough to compensate for whatever we bring to it. If the output isn't good, we need a better model. If the response feels generic, we need to prompt it differently. If the result misses the brief, the brief probably wasn't detailed enough — but the model will figure it out. It's an assumption that feels reasonable until you watch it play out in practice, at which point it becomes one of the most expensive beliefs a team can hold.",
          "AI doesn't compensate for unclear thinking. It scales it. A vague brief given to a human produces one mediocre output that a single person spent time on. A vague brief given to AI produces fifty mediocre outputs in four minutes, and now someone has to review all of them, form an opinion on all of them, and explain to the tool why none of them are right — without being able to articulate what right actually looks like. The cost of not knowing what you want has never been higher, and most teams are paying it without realising that's what the invoice is for."
        ],
        pullQuote:
          '“AI doesn\'t compensate for unclear thinking. It scales it. A vague brief given to a human produces one mediocre output. A vague brief given to AI produces fifty — and now someone has to review all of them.”'
      },
      {
        type: 'section',
        heading: 'What vagueness actually costs',
        paragraphs: [
          "To understand why this matters so much right now, it helps to understand what AI is actually doing when it receives an unclear instruction — because the model doesn't experience vagueness the way a person does.",
          "A person given a vague brief will ask a clarifying question, make an assumption and flag it, or apply judgment based on context they've accumulated over years of similar work. An LLM given a vague brief will produce something confident, structurally sound, and calibrated to the statistical average of everything it has ever seen that resembles this kind of request — which means it will give you the most generic possible version of what you asked for, delivered with complete conviction.",
          "That's not a model failure. That's the model doing exactly what it was designed to do with the information it was given. The failure lives upstream, at the point where the person using the tool hadn't done the thinking that would have made the instruction specific. And here is what makes this so costly in a world where AI is embedded into every part of the creative and development process: the volume of output means the thinking deficit compounds at speed. Every unclear input doesn't produce one poor output that gets revised — it produces a cascade of outputs that each carry the shape of the original vagueness, and the team spends its energy reacting to the outputs rather than resolving the thinking that produced them."
        ]
      },
      {
        type: 'section',
        heading: 'The two kinds of vagueness',
        paragraphs: [
          "Not all unclear thinking looks the same, and the distinction matters because each kind has a different cost and a different fix.",
          "The first is directional vagueness — not knowing what you actually want the output to do, who it's for, or what a successful result looks like in concrete terms. This is the most common kind and the most expensive, because no amount of iteration closes the gap when the destination hasn't been defined. A team that doesn't know whether a piece of content is meant to build trust, drive a specific action, or establish authority will produce ten drafts that each optimise for something slightly different, and the feedback loop will keep cycling because the evaluation criteria keep shifting.",
          "The second is standard vagueness — knowing what you want in general terms but not having a sharp enough definition of quality to evaluate what comes back. This shows up as the feeling that the output is almost right but something's off, without being able to name what. It produces longer revision cycles, inconsistent results across a team using the same tool, and a growing frustration that gets attributed to the model rather than to the absence of a defined standard. The model isn't inconsistent. The team's picture of what good looks like is."
        ],
        pullQuote:
          '“The model isn\'t inconsistent. The team\'s picture of what good looks like is — and AI makes that gap impossible to hide.”'
      },
      {
        type: 'section',
        heading: 'Why AI makes this harder to ignore',
        paragraphs: [
          "Before AI was embedded in creative and development workflows, vagueness had a natural speed limit. The time it took a human to produce an output created space for the thinking to catch up. A brief would get written, someone would ask a question that exposed a gap, the gap would get filled, and the work would proceed with a slightly clearer picture of what it was trying to be. The process was slow enough that clarity could emerge through iteration without too much waste.",
          "AI removed that speed limit entirely, which means the gap between thinking and doing has collapsed in a way that exposes every piece of unclear thinking immediately and at scale. There is no longer a natural checkpoint where vagueness gets surfaced before it becomes output — the output arrives before the thinking is finished, and the team is left managing the consequences of having moved faster than their clarity allowed.",
          "This is why so many teams feel like AI is making them busier rather than more productive: they are producing more, reviewing more, revising more, and making more decisions per hour than they ever have, but the proportion of that work that actually advances the project is lower than it should be because the inputs that generated it weren't sharp enough."
        ]
      },
      {
        type: 'section',
        heading: 'What working clearly with AI actually looks like',
        paragraphs: [
          "The teams that get consistently strong output from AI tools are almost never the ones with the most sophisticated prompting techniques. They are the ones who do their thinking before they open the tool, and carry that thinking into every input they give it. In practice, this looks like a few specific habits that are less about technical knowledge and more about the discipline to answer hard questions before asking the model anything.",
          "It means being able to state, in a sentence, what the output needs to do and for whom — not what it should contain, but what job it is supposed to perform and for what specific person. It means having a concrete example of output that is close to what you're looking for, even if it's imperfect, because examples communicate standard in a way that descriptions rarely do. It means knowing in advance what would make you reject a response — what specific quality, tone, or structural characteristic the output cannot have — because negative constraints are often clearer than positive ones and the model responds to both equally well.",
          "And it means treating the first output not as a draft to be revised but as a diagnostic — a signal about the quality of the input rather than a starting point to be worked forward from. When the first response is off, the correct next step is almost always to sharpen the input, not to revise the output. Teams that understand this stop accumulating revision cycles and start accumulating clarity, which is the asset that compounds."
        ],
        pullQuote:
          '“When the first response is off, the correct next step is to sharpen the input — not revise the output. One habit produces clarity. The other produces cycles.”'
      },
      {
        type: 'section',
        heading: 'The thinking is the work',
        paragraphs: [
          "There is a version of AI adoption that treats the tool as a way to skip the hard part of creative and technical work — the part where you have to figure out what you actually want and why, where you have to develop a sharp enough standard to evaluate what you produce, where you have to make judgment calls about quality that can't be automated. That version produces a lot of output and very little progress, and the frustration it generates tends to land on the model.",
          "The version that compounds is the one where the tool is used to accelerate thinking that is already clear — where the input carries the weight of the judgment that went into it, and the output is a function of that judgment rather than a substitute for it. In that version, AI genuinely extends what a team can do, because it removes the friction from execution without removing the human from the decision. The thinking remains the work. AI just means you can act on it faster once you've done it."
        ],
        pullQuote:
          '“The cost of vagueness has always been real. AI just made it impossible to defer.”'
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
