# Claude Code Prompt — Landing Page Build

> Fill in the four `[TODO]` items at the top, then paste the whole thing into Claude Code from the project root of an empty directory.

---

## Decisions to fill in first

1. **SMARTLEADS:** `smartleads`
2. **Founder X/Twitter handle:** `draj_02`
3. **Primary competitor to position against:** `[Subreddit Signals, Redreach]`
4. **Accent color:** `dark cyan`

---

# Project: Landing page for smart leads

## What we're building

A high-converting marketing landing page for a SaaS product called **[SMARTLEADS]** — an agentic AI platform that monitors Reddit 24/7 for buying-intent signals and delivers qualified leads to solopreneurs.

The goal of this page is **waitlist signups**, not direct sales. We are pre-launch, validating demand, and collecting founder-pricing emails.

## Target audience

Solopreneurs who sell their time or expertise: freelance designers, copywriters, developers, fractional CMOs/CFOs, consultants, coaches, indie SaaS founders, small agency owners. They:
- Need a steady pipeline of clients but hate cold outreach
- Already lurk on Reddit, IndieHackers, X
- Are price-sensitive ($20–80/mo range) but pay for things that demonstrably save hours
- Have seen 10 of these tools already and are skeptical of AI hype

## Voice and tone

- Direct, no fluff, no enterprise-y marketing speak
- Talk peer-to-peer with another solopreneur, not "we empower businesses to..."
- Concrete > vague. Real examples beat buzzwords every time.
- Skeptical-friendly. Assume the reader has tried competitors and was disappointed.
- Confidence without arrogance. Never say "revolutionary" or "game-changing."

## Tech stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** for base components
- **Lucide React** icons
- **Framer Motion** for tasteful micro-interactions only
- Form submission: write to a local `data/waitlist.json` by default. If `RESEND_API_KEY` env var is present, also send a confirmation email.
- Vercel deploy-ready, with `vercel.json` if needed

## Page structure

### 1. Top navigation
- Logo (left), nav links: How it works · Pricing · FAQ
- "Join waitlist" CTA button (right) — scrolls smoothly to the hero form
- Sticky on scroll with subtle backdrop-blur

### 2. Hero
- **Headline** — a sharp, specific promise. Generate 3 candidates and pick the strongest. Examples of the *shape* (don't copy, write better):
  - "Your next 5 clients are asking for help on Reddit right now."
  - "Stop cold-emailing. Start replying to people who already want what you sell."
- **Subhead** — one sentence: who it's for + what it does + what makes it different
- **Email input + "Join the waitlist" button**
- Social proof line below: "237 solopreneurs already on the waitlist" (start at a believable number, see Functional Requirements below)
- **Visual** — to the right of (or below) the hero text, a designed mockup of a "Lead card" showing: subreddit name, post excerpt, an intent score (e.g. "92 / 100 — High intent"), tags like "Budget mentioned," "Asking for recs," and a "Draft reply" button. Make this feel like a real product screenshot, not a generic illustration.

### 3. The problem
A short, punchy section that names the pain. Three short paragraphs or three cards. Speak the reader's actual thoughts:
- "You know Reddit is a goldmine. You just don't have 3 hours a day to read it."
- "You found the perfect thread — three days late. Someone else got the gig."
- "You wrote a thoughtful reply. It got removed for 'self-promotion.' Account warning."

### 4. How it works (3 steps)
Numbered, with a small icon + heading + one paragraph each:
1. **Tell us what you do.** Your service, your ICP, your voice — takes 5 minutes.
2. **Our agent watches Reddit for you.** 24/7 across the subreddits your buyers actually live in. It scores every post for real buying intent — not just keyword matches.
3. **Get a daily digest of warm leads.** With context, a draft reply in your voice, and a one-click way to engage without getting your account flagged.

### 5. What makes it different
4 cards in a grid. Concrete differentiators, not vague benefits:
- **Intent scoring, not keyword matching.** We classify posts across multiple intent dimensions — problem-aware, actively shopping, ready to buy, recently burned by a competitor.
- **Voice-matched replies.** Trained on your past writing so replies sound like you, not like ChatGPT.
- **Subreddit rule awareness.** We know which subs ban promotion and recommend DM vs. comment accordingly.
- **One Reddit account, zero bans.** Built-in rate limiting and reply guardrails so you don't get nuked.

### 6. Who it's for
Grid of 6 personas, each with an emoji/icon + role + one-liner:
- Freelance designer — "Find founders asking 'who can design my landing page?'"
- Fractional CMO — "Catch series-A founders complaining about their growth"
- Indie SaaS founder — "Spot users frustrated with your competitor"
- Agency owner — "Pipeline that doesn't depend on referrals"
- Consultant — "Be in the conversation before the RFP goes out"
- Coach — "Find people describing exactly the problem you solve"

### 7. Positioning vs. competitors (optional section)
A small, honest comparison block vs. redroach. Use a 3-column table with 4 rows. Don't be snarky — be specific. Focus on the gap you're filling.

### 8. FAQ
Accordion. Six questions:
- Will my Reddit account get banned?
- What if my niche doesn't have an obvious subreddit?
- How is this different from redreach?
- Do I need to be active on Reddit all day for this to work?
- What will it cost?
- When does it launch and what's "founder pricing"?

Write real answers — short, direct, no hedging. If something isn't decided yet, say so honestly ("Pricing isn't finalized — waitlist members lock in $X/mo for life").

### 9. Final CTA
Full-width section. Big headline like "Be one of the first 100. Founder pricing locked in for life." Email input. Single button.

### 10. Footer
Minimal. SMARTLEADS, one-line tagline, X handle, email, Privacy, Terms. Copyright year auto-rendered.

## Design direction

- **Avoid generic AI aesthetic at all costs.** No purple-to-blue gradient hero. No abstract blob shapes. No "AI sparkle" icons.
- **Editorial, type-first.** Big confident typography, lots of whitespace, content does the heavy lifting.
- **Palette:** monochrome base (warm off-white `#FAFAF7` light / deep charcoal `#0F0F0E` dark) + ONE accent color (from the choice above) used sparingly for CTAs and the intent-score visual.
- **Typography:** serif display for the hero and section headlines (Fraunces or Instrument Serif), clean sans for body (Geist or Inter). Load via `next/font`.
- **Subtle motion only.** Fade-in-on-scroll for sections, hover lifts on cards, button micro-interactions. No parallax. No autoplay video.
- **Light mode default**, dark-mode toggle in the nav. Both modes must look intentional, not auto-inverted.
- **Mobile-first.** Test every section at 375px before declaring done.

## Functional requirements

- Email validation on both signup forms (hero + final CTA)
- Honeypot field for spam protection
- Submit handler writes `{ email, timestamp, source }` to `data/waitlist.json`
- If `RESEND_API_KEY` is set, also send a confirmation email via Resend
- On submit: optimistic UI swap to success state — "You're in. Watch your inbox."
- Waitlist counter on the page reads from `data/waitlist.json` length + a believable starting offset (set in an env var `NEXT_PUBLIC_WAITLIST_OFFSET=200`). Display as "237 solopreneurs already on the waitlist."
- Clean event IDs on every CTA (`data-event="hero_cta_click"` etc.) so analytics can be wired up later
- Add basic OpenGraph + Twitter meta tags
- `robots.txt` and `sitemap.xml`

## Deliverables

- Full Next.js app, runs cleanly with `npm install && npm run dev`
- `README.md` with: setup steps, env var reference, "Deploy to Vercel" button, and a note on where to edit copy
- Modular, well-named components — one component per file, colocated where sensible
- Zero console errors, zero Tailwind warnings
- Lighthouse 90+ on Performance, Accessibility, Best Practices, SEO
- All copy in a single `content.ts` or `content.json` so I can edit headlines without touching components

## Workflow

1. Confirm the four `[TODO]` decisions back to me before writing code.
2. Scaffold the Next.js project and the file structure first; show me the tree.
3. Build section by section, top to bottom, so I can give feedback as you go.
4. After the build, run the dev server and verify each section renders cleanly at desktop (1440px) and mobile (375px) widths.
5. End with a checklist of what's done and what I should manually verify before deploying.
