# SmartLeads — waitlist landing page

A high-converting, type-first marketing page for **SmartLeads** — an agentic
AI platform that monitors Reddit for buying-intent signals and delivers
qualified leads to solopreneurs.

The goal of this page is **waitlist signups**, not direct sales. Pre-launch,
collecting founder-pricing emails.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production:

```bash
npm run build
npm run start
```

---

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** with CSS variables
- **shadcn/ui** (radix + nova preset) — `button`, `accordion`, `input`
- **Lucide React** icons (brand-icon SVGs inlined where needed)
- **Framer Motion** for tasteful entrance + scroll animations only
- **next-themes** for light / dark mode
- **Resend** for confirmation emails (optional)

---

## Environment variables

Create a `.env.local`:

```bash
# Site URL — used in metadata, robots, sitemap, OG image links.
NEXT_PUBLIC_SITE_URL="https://smartleads.app"

# Believable starting count added to data/waitlist.json length when
# rendering the "X solopreneurs already on the waitlist" line.
NEXT_PUBLIC_WAITLIST_OFFSET="200"

# Founder X handle (used in nav CTA, FAQ contact, confirmation email).
NEXT_PUBLIC_FOUNDER_HANDLE="draj_02"

# Optional — when set, /api/waitlist sends a confirmation email via Resend.
# If unset, signups still succeed; no email is sent.
RESEND_API_KEY=""

# Optional — FROM address for confirmation emails. Defaults to Resend's
# 'onboarding@resend.dev' so it works without domain verification.
# For real launches, point this at your verified domain.
RESEND_FROM="SmartLeads <hello@smartleads.app>"
```

None of the public (`NEXT_PUBLIC_*`) vars are *required* — sensible defaults
fall through if they're missing.

---

## Editing copy

**Everything is in [`src/lib/content.ts`](src/lib/content.ts).** Section
components import only the slices they need — you can rewrite any headline,
question, persona, or comparison row without touching JSX.

Notable bits:

- **`hero.headlines`** — array of three candidate headlines. Change
  `hero.headlineIdx` (0 / 1 / 2) to swap the chosen one.
- **`hero.leadCard`** — the mock "today's lead" data shown on the right side
  of the hero. Subreddit, post title, intent score, tags, draft reply lines.
- **`comparison.rows`** — the SmartLeads vs Redreach table.
- **`faq.items`** — six FAQ entries. Each has an `id` that becomes a URL
  hash so the nav "Pricing" link (`#faq-pricing`) auto-opens that answer.

---

## Project layout

```
src/
├── app/
│   ├── api/waitlist/route.ts   ← POST handler (rate-limit, dedup, persist, email)
│   ├── globals.css             ← Palette + fonts + base styles
│   ├── layout.tsx              ← Fonts + ThemeProvider + SEO metadata
│   ├── opengraph-image.tsx     ← Dynamic OG image (1200x630)
│   ├── page.tsx                ← Composes the 10 sections + footer
│   ├── robots.ts               ← /robots.txt
│   └── sitemap.ts              ← /sitemap.xml
├── components/
│   ├── sections/               ← One file per page section
│   │   ├── hero.tsx
│   │   ├── problem.tsx
│   │   ├── how-it-works.tsx
│   │   ├── differentiators.tsx
│   │   ├── personas.tsx
│   │   ├── comparison.tsx
│   │   ├── faq.tsx
│   │   └── final-cta.tsx
│   ├── ui/                     ← shadcn (button, accordion, input)
│   ├── site-nav.tsx
│   ├── site-footer.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── waitlist-form.tsx       ← Used by Hero + Final CTA
├── lib/
│   ├── content.ts              ← ALL page copy
│   ├── rate-limit.ts           ← Per-IP gate for /api/waitlist
│   ├── send-confirmation.ts    ← Resend send (no-op if key unset)
│   ├── utils.ts                ← shadcn cn()
│   └── waitlist.ts             ← Local JSON storage helpers
└── data/
    └── waitlist.json           ← Local waitlist store (gitignored in prod)
```

---

## Design system

**Palette** — monochrome + a single gold accent (per the brief):

| Token | Light | Dark | Used for |
|---|---|---|---|
| `paper` | `#FAFAF7` warm off-white | `#0A0A09` near-black | page background |
| `paper-deep` | `#F2F2EF` | lifted dark | section bands |
| `paper-card` | white | lifted dark | card surfaces |
| `ink` | `#0F0F0E` deep charcoal | warm off-white | text + primary CTA |
| `ink-soft` | `#6B6B68` mid gray | lighter mid gray | muted text, borders |
| `gold` | `#FFC94D` | `#FFC94D` | THE accent — CTAs, highlights, intent score |
| `gold-deep` | `#D69A1E` | lifted | hover state |
| `gold-soft` | very pale gold wash | dark gold tint | washes, success-state bg |
| `rule` | `#E5E5E2` | dark hairline | borders |

**ONE accent — gold.** Everything else is grayscale. Primary CTAs go
ink-on-paper (charcoal on off-white). Gold is reserved for highlight
moments: the Hero kicker chip, the intent-score block, the success state
banner, and the Final CTA conversion button.

The high-contrast monochrome base means **WCAG AAA** body contrast in both
modes — ~21:1 for ink on paper, ~7.5:1 for ink-soft.

**Typography** — Instrument Serif (display, `h1–h4`) + Geist Sans (body) +
Geist Mono. All via `next/font/google`, self-hosted.

**Page rhythm** — paper / paper-deep / paper / **dark band** / paper /
paper-deep / paper / **dark band** / paper-deep (footer). Two dark "punch"
moments bookend the middle (Differentiators + Final CTA). The `bg-ink`
sections auto-flip between modes (charcoal-on-page in light, off-white-on-page
in dark).

---

## Deployment

### Vercel (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/draj1979/smartleads)

Connect this repo in the Vercel dashboard. Auto-detected as Next.js — no
config needed. Add the env vars from above in **Project Settings → Environment
Variables**.

### Important caveat on the waitlist store

`data/waitlist.json` works for local dev but **won't persist on Vercel** —
serverless instances are ephemeral, and the writes go to a read-only
filesystem in production. Before you launch publicly, replace
`src/lib/waitlist.ts` with a real backing store. Recommended quick path:

- **[Vercel KV](https://vercel.com/docs/storage/vercel-kv)** — same surface,
  works on the free tier
- **[Upstash Redis](https://upstash.com)** — same idea, more provider-neutral
- **A simple Google Sheet via the Sheets API** — fine for a launch waitlist

The interface (`readWaitlist`, `appendWaitlist`, `getWaitlistCount`) is tiny
on purpose — swap is a one-file change.

The same caveat applies to the rate limiter (`src/lib/rate-limit.ts`). It's
in-memory per serverless instance, so the effective limit is
`window × instance_count`. Good enough to deflect obvious form-spam, not
robust against a distributed attack. Upgrade path: same shared store as
above.

---

## QA checklist before going live

- [ ] Run `npm run build` — zero errors, zero TypeScript warnings.
- [ ] Open `http://localhost:3000` and check:
  - [ ] **1440px** wide — every section renders comfortably.
  - [ ] **375px** wide (mobile) — every section is readable, no horizontal
        scroll, nav collapses, comparison table switches to stacked cards.
- [ ] **Theme toggle** — flip between light + dark. Both look intentional
      (the inverted bg-ink sections in Differentiators and Final CTA should
      switch direction).
- [ ] **Form** — submit a real email in the Hero. Check `data/waitlist.json`
      gets the entry. Submit the same email again — silent dedup (no error,
      no double entry).
- [ ] **Nav anchors** — clicking `Pricing` in the nav should scroll to the
      FAQ and auto-open the pricing answer.
- [ ] **OG image** — visit `http://localhost:3000/opengraph-image` and
      confirm it renders. Test with the
      [Open Graph debugger](https://www.opengraph.xyz/) once deployed.
- [ ] **robots.txt** + **sitemap.xml** — visit
      `http://localhost:3000/robots.txt` and `http://localhost:3000/sitemap.xml`.
- [ ] **Lighthouse** (in Chrome incognito, page loaded fresh):
      Performance, Accessibility, Best Practices, SEO — target 90+ on all.
- [ ] **Resend** (if `RESEND_API_KEY` is set) — submit a real email and
      confirm the confirmation lands.
- [ ] Replace `data/waitlist.json` storage with a persistent backing store
      before launch (see "Important caveat" above).

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on `:3000` |
| `npm run build` | Production build |
| `npm run start` | Run the built app |
| `npm run lint` | ESLint |
