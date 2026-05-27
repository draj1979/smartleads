/**
 * Single source of truth for all page copy.
 * Edit headlines / paragraphs / questions here — components import only the
 * pieces they need, so this file should never need a component to compile.
 *
 * Conventions:
 *   - Sentence-case body copy, title-case section labels.
 *   - Numbers (intent scores, counts) are real-looking but illustrative.
 *   - Keep voice peer-to-peer with another solopreneur. No enterprise-y verbs.
 */

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Brain,
  CalendarClock,
  Compass,
  DollarSign,
  Eye,
  Mic2,
  Palette,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

/* ── Brand ─────────────────────────────────────────────────── */

export const CONTENT = {
  brand: {
    name: "SmartLeads",
    tagline: "Warm leads from Reddit, every morning",
    description:
      "An always-on agent that reads Reddit, scores threads for real buying intent, and lands warm leads in your inbox each morning — with a draft reply in your voice.",
    founderHandle: "draj_02",
    supportEmail: "hello@smartleads.app",
  },

  /* ── 1. Nav ─────────────────────────────────────────────── */
  nav: {
    links: [
      { label: "How it works", href: "#how" },
      { label: "Pricing", href: "#faq-pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    ctaLabel: "Join waitlist",
    ctaHref: "#waitlist",
  },

  /* ── 2. Hero ────────────────────────────────────────────── */
  // 3 candidates — change `headlineIdx` to swap.
  hero: {
    eyebrow: "Pre-launch · founder pricing for the first 100",
    headlines: [
      // 0 ← chosen
      "Stop sending cold pitches. Start answering questions your buyers already asked.",
      // 1
      "Your next client posted on Reddit this morning. You scrolled past it.",
      // 2
      "Reddit is full of people describing exactly what you sell. We bring them to you.",
    ],
    headlineIdx: 0,
    subhead:
      "An always-on agent that scores Reddit threads for real buying intent and lands warm leads in your inbox each morning — with a draft reply in your voice.",
    emailPlaceholder: "you@yourthing.com",
    ctaLabel: "Join the waitlist",
    proofTemplate: "{count} solopreneurs already on the waitlist",

    /** Mock Lead Card — the hero visual */
    leadCard: {
      subreddit: "r/Entrepreneur",
      postedAgo: "47 min ago",
      author: "u/founder_in_austin",
      title: "Need a designer for a SaaS landing page — current conv. rate is 1.2% 😩",
      excerpt:
        "Hey all. Our hero section is just not converting. Budget around $1,500 for a one-page redesign + a couple iterations. Anyone freelance or have someone they'd recommend? Bonus if you've worked with B2B SaaS before.",
      intentScore: 92,
      intentLabel: "High intent",
      tags: ["Budget mentioned", "Asking for recs", "Decision-making"],
      replyPreviewLines: [
        "Hey — I've done a few B2B SaaS landings recently. Happy to share",
        "two of them so you can sanity-check the style fit. The 1.2% number",
        "usually tells me one of three things about a hero...",
      ],
      replyLabel: "Draft reply (your voice)",
    },
  },

  /* ── 3. The problem ────────────────────────────────────── */
  problem: {
    eyebrow: "The problem",
    headline: "Reddit is the best place to find clients. Until you try.",
    items: [
      {
        title: "You know Reddit is a goldmine. You just don't have 3 hours a day to read it.",
        body: "There are 200+ subreddits where your buyers ask for what you sell. Manually scanning them is a full-time job — and the second you blink, the moment passes.",
        icon: Eye,
      },
      {
        title: "You found the perfect thread — three days late. Someone else got the gig.",
        body: "By the time the right post bubbles up in your feed, two competitors have already replied, the OP has DMs to sort through, and you look like the slow option.",
        icon: CalendarClock,
      },
      {
        title: "You wrote a thoughtful reply. It got removed for self-promotion. Account warning.",
        body: "Most subs ban promotion outright. Some allow it only in DM. The line is invisible — until your reply gets nuked and the mods email you about it.",
        icon: Shield,
      },
    ],
  },

  /* ── 4. How it works ────────────────────────────────────── */
  howItWorks: {
    eyebrow: "How it works",
    headline: "Three steps. Then the agent does the watching.",
    steps: [
      {
        n: "01",
        title: "Tell us what you do.",
        body: "Your service, your ideal customer, your voice — pulled from a short interview and 3–5 links to your past writing. Takes about 5 minutes.",
        icon: Target,
      },
      {
        n: "02",
        title: "Our agent watches Reddit for you.",
        body: "24/7 across the subreddits your buyers actually live in. Every new post gets scored across multiple intent dimensions — not just keyword matched.",
        icon: Activity,
      },
      {
        n: "03",
        title: "Get a daily digest of warm leads.",
        body: "With full context, a draft reply in your voice, and a one-click path to engage — DM or comment, picked based on the sub's rules.",
        icon: Sparkles,
      },
    ],
  },

  /* ── 5. What makes it different ─────────────────────────── */
  differentiators: {
    eyebrow: "What makes it different",
    headline: "Built for the parts everyone else gets wrong.",
    items: [
      {
        title: "Intent scoring, not keyword matching.",
        body: "We classify every post across multiple dimensions — problem-aware, actively shopping, ready to buy, recently burned by a competitor. So a 'need recs' post outranks a casual 'thinking about it' mention.",
        icon: Brain,
      },
      {
        title: "Voice-matched replies.",
        body: "Drafts are trained on your past writing — your tweets, your blog, your past Reddit replies. They sound like you on a good day, not like ChatGPT on any day.",
        icon: Mic2,
      },
      {
        title: "Subreddit rule awareness.",
        body: "We know which subs ban promotion, which require flair, and which prefer DMs. The agent recommends DM-vs-comment per post — so your reply lands instead of getting removed.",
        icon: Compass,
      },
      {
        title: "One Reddit account, zero bans.",
        body: "Built-in rate limits, comment-velocity caps, and reply guardrails. We won't let you reply to 40 threads in a day and get your account torched.",
        icon: Shield,
      },
    ],
  },

  /* ── 6. Who it's for ─────────────────────────────────────── */
  personas: {
    eyebrow: "Who it's for",
    headline: "If you sell your time or expertise, you're in.",
    items: [
      {
        emoji: "✏️",
        role: "Freelance designer",
        line: "Find founders asking 'who can design my landing page?'",
      },
      {
        emoji: "📈",
        role: "Fractional CMO",
        line: "Catch series-A founders complaining about their growth.",
      },
      {
        emoji: "🧪",
        role: "Indie SaaS founder",
        line: "Spot users frustrated with your competitor.",
      },
      {
        emoji: "🛠️",
        role: "Agency owner",
        line: "Pipeline that doesn't depend on referrals.",
      },
      {
        emoji: "📚",
        role: "Consultant",
        line: "Be in the conversation before the RFP goes out.",
      },
      {
        emoji: "🎯",
        role: "Coach",
        line: "Find people describing exactly the problem you solve.",
      },
    ],
  },

  /* ── 7. Comparison vs Redreach ──────────────────────────── */
  comparison: {
    eyebrow: "vs. the alternatives",
    headline: "Where SmartLeads goes further than Redreach.",
    note: "Both products read Reddit. The difference is in what they read for and what they hand you afterwards.",
    rows: [
      {
        feature: "How leads are detected",
        smartleads: "Intent classifier — problem-aware → ready-to-buy",
        competitor: "Keyword + subreddit matching",
      },
      {
        feature: "Replies",
        smartleads: "Draft trained on your past writing — sounds like you",
        competitor: "Generic AI templates",
      },
      {
        feature: "Account safety",
        smartleads: "Per-sub rule awareness, DM vs comment routing, rate limits",
        competitor: "You decide — no guardrails",
      },
      {
        feature: "Daily digest",
        smartleads: "5–15 leads ranked by intent score, with context",
        competitor: "Firehose of keyword hits",
      },
    ],
    competitorName: "Redreach",
  },

  /* ── 8. FAQ ─────────────────────────────────────────────── */
  faq: {
    eyebrow: "Questions",
    headline: "Everything I'd ask if I were you.",
    contact: {
      heading: "Still wondering something?",
      email: "hello@smartleads.app",
      twitterLabel: "DM me on X",
      twitterUrl: "https://x.com/draj_02",
    },
    items: [
      {
        id: "ban",
        q: "Will my Reddit account get banned?",
        a: "Almost certainly not, if you let the agent do its job. We rate-limit replies, route promotion to DM in subs that ban it, and never auto-post — every reply is a one-click confirm from you. The main way to get banned is to ignore the warnings and reply too fast in too many places; the app actively stops you from doing that.",
      },
      {
        id: "niche",
        q: "What if my niche doesn't have an obvious subreddit?",
        a: "Most niches have 5–10 sideways subs that work better than the obvious ones. A copywriter doesn't sit only in r/copywriting — buyers live in r/Entrepreneur, r/SaaS, r/marketing, r/startups, r/smallbusiness. We map your niche to the subs where buyers actually post, then expand from there based on what scores well in the first two weeks.",
      },
      {
        id: "vs-redreach",
        q: "How is this different from Redreach?",
        a: "Two big things: intent scoring vs. keyword matching, and voice-matched replies vs. generic templates. Keyword tools tell you when your keywords appear on Reddit. SmartLeads tells you when someone is about to spend money on what you sell — and hands you a draft that sounds like you wrote it. See the comparison table above for the full breakdown.",
      },
      {
        id: "active",
        q: "Do I need to be active on Reddit all day for this to work?",
        a: "No. The whole point is you get one daily digest with ranked leads, context, and ready drafts. Most users spend 15–20 minutes a day on it. If you're on Reddit anyway, great — the in-app sidebar surfaces leads in real time too.",
      },
      {
        id: "faq-pricing",
        q: "What will it cost?",
        a: "Pricing isn't finalized. The plan: a free tier with a smaller subreddit footprint and a daily digest cap, and a paid tier in the $30–60/mo range with unlimited subs, voice training, and the in-app reply layer. Everyone who joins the waitlist in the first 100 locks in founder pricing — which will be at least 40% below public pricing — for life.",
      },
      {
        id: "launch",
        q: "When does it launch and what's founder pricing?",
        a: "Closed beta in late Q3, public launch by end of year. Waitlist members get beta access in the order they signed up. Founder pricing locks in your monthly rate forever, even after we raise public prices.",
      },
    ],
  },

  /* ── 9. Final CTA ───────────────────────────────────────── */
  finalCta: {
    eyebrow: "One last thing",
    headline: "Be one of the first 100.",
    accent: "Founder pricing locked in for life.",
    subhead:
      "Join the waitlist, get beta access in the order you signed up, and never see your price go up — even after we raise it for everyone else.",
    emailPlaceholder: "you@yourthing.com",
    ctaLabel: "Lock in founder pricing",
  },

  /* ── 10. Footer ─────────────────────────────────────────── */
  footer: {
    tagline: "Warm leads from Reddit, every morning.",
    links: [
      { label: "How it works", href: "#how" },
      { label: "FAQ", href: "#faq" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
    builtBy: "Built by a solopreneur, for solopreneurs.",
  },

  /* ── Shared waitlist UI ────────────────────────────────── */
  waitlist: {
    successHeading: "You're in.",
    successBody: "Watch your inbox — we'll email when the beta opens.",
  },
} as const;

/** Helper to keep persona icon-coloring centralized later if we swap emojis for Lucide icons. */
export type Persona = (typeof CONTENT.personas.items)[number];
export type ProblemItem = (typeof CONTENT.problem.items)[number];
export type Step = (typeof CONTENT.howItWorks.steps)[number];
export type Differentiator = (typeof CONTENT.differentiators.items)[number];
export type ComparisonRow = (typeof CONTENT.comparison.rows)[number];
export type FaqItem = (typeof CONTENT.faq.items)[number];

// Avoid 'unused import' warnings; some icons here will be used as section builds in.
// (Tree-shaken in production.)
void [
  Activity,
  Brain,
  CalendarClock,
  Compass,
  DollarSign,
  Eye,
  Mic2,
  Palette,
  Shield,
  Sparkles,
  Target,
  Users,
] as unknown as LucideIcon[];
