"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Wand2,
  ExternalLink,
  Tag,
  Clock,
  CircleDot,
} from "lucide-react";
import { CONTENT } from "@/lib/content";
import { WaitlistForm } from "@/components/waitlist-form";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ count }: { count: number }) {
  const headline = CONTENT.hero.headlines[CONTENT.hero.headlineIdx];

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-12 md:pt-20 pb-16 md:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ── Left: copy + form ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="lg:col-span-7 lg:pt-4"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-amber-soft border border-amber/40 text-ink mb-7">
            <Sparkles size={12} className="text-amber-deep" />
            {CONTENT.hero.eyebrow}
          </div>

          {/* Headline */}
          <h1 className="font-display text-[2.6rem] leading-[1.04] sm:text-5xl md:text-6xl lg:text-[4.4rem] lg:leading-[1.02] text-ink tracking-tight max-w-3xl">
            {headline}
          </h1>

          {/* Subhead */}
          <p className="mt-7 text-lg md:text-xl text-ink-soft leading-relaxed max-w-2xl">
            {CONTENT.hero.subhead}
          </p>

          {/* Form — owns id="waitlist" so the nav CTA lands here */}
          <div id="waitlist" className="mt-9 max-w-lg scroll-mt-24">
            <WaitlistForm
              source="hero"
              ctaLabel={CONTENT.hero.ctaLabel}
              placeholder={CONTENT.hero.emailPlaceholder}
              count={count}
              proofTemplate={CONTENT.hero.proofTemplate}
            />
          </div>
        </motion.div>

        {/* ── Right: Lead card visual ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease }}
          className="lg:col-span-5"
        >
          <LeadCard />
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Lead card — the "product screenshot" hero visual.
   Pure markup so we don't need an image asset; reads as a real
   surface, not an illustration.
   ──────────────────────────────────────────────────────────── */

function LeadCard() {
  const card = CONTENT.hero.leadCard;

  return (
    <div className="relative">
      {/* Soft amber wash behind the card to anchor it visually */}
      <div
        aria-hidden
        className="absolute -top-8 -right-10 w-44 h-44 rounded-full bg-amber/30 blur-3xl -z-10"
      />
      <div
        aria-hidden
        className="absolute -bottom-10 -left-8 w-40 h-40 rounded-full bg-amber-soft blur-3xl -z-10"
      />

      <div className="relative bg-paper-card border border-rule rounded-2xl shadow-[0_30px_60px_-25px_oklch(0.30_0.082_264_/_0.28)] overflow-hidden">
        {/* Toolbar header — anchors the "this is a product" feeling */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-rule/60">
          <div className="flex items-center gap-2">
            <RedditMark className="w-4 h-4 text-ink-soft" />
            <span className="text-[12px] font-medium text-ink">
              {card.subreddit}
            </span>
            <span className="text-ink-soft text-xs">·</span>
            <span className="text-[11px] text-ink-soft inline-flex items-center gap-1">
              <Clock size={10} />
              {card.postedAgo}
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-ink-soft">
            SmartLeads · inbox
          </span>
        </div>

        <div className="p-5 md:p-6">
          {/* Author */}
          <p className="text-xs text-ink-soft mb-2">{card.author}</p>

          {/* Title */}
          <h3 className="font-display text-[18px] md:text-[20px] leading-snug text-ink mb-2.5">
            {card.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[13.5px] text-ink-soft leading-relaxed mb-5 line-clamp-3">
            {card.excerpt}
          </p>

          {/* ── Intent score block ───────────────────────── */}
          <div className="rounded-xl border border-amber/40 bg-amber-soft/70 px-4 py-3.5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-4xl leading-none text-ink">
                  {card.intentScore}
                </span>
                <span className="text-sm text-ink-soft">/ 100</span>
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-amber-deep">
                {card.intentLabel}
              </span>
            </div>
            <IntentBar value={card.intentScore} />
          </div>

          {/* Tags */}
          <ul className="flex flex-wrap gap-1.5 mb-5">
            {card.tags.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full bg-paper text-ink border border-rule"
              >
                <Tag size={9} className="text-ink-soft" />
                {t}
              </li>
            ))}
          </ul>

          {/* Reply preview */}
          <div className="rounded-xl bg-paper border border-rule/80 p-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-amber-deep mb-2">
              <Wand2 size={11} />
              {card.replyLabel}
            </div>
            <div className="space-y-1.5 text-[13px] leading-snug text-ink-soft">
              {card.replyPreviewLines.map((line, i) => (
                <p key={i} className={i === card.replyPreviewLines.length - 1 ? "text-ink-soft/70" : ""}>
                  {line}
                </p>
              ))}
              <span
                aria-hidden
                className="inline-block w-2 h-3.5 bg-amber animate-pulse ml-0.5 align-baseline -mb-0.5"
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs text-ink-soft hover:text-ink transition"
            >
              <ExternalLink size={12} />
              Open thread
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-paper text-xs font-medium hover:opacity-90 transition"
            >
              Send reply
              <ArrowUpRight size={12} />
            </button>
          </div>
        </div>

        {/* Quiet status footer */}
        <div className="px-5 py-2.5 border-t border-rule/60 flex items-center justify-between text-[11px] text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <CircleDot size={10} className="text-amber" />
            5 of 12 leads today
          </span>
          <span className="font-mono uppercase tracking-wider">guardrails on</span>
        </div>
      </div>
    </div>
  );
}

/* Animated intent bar — fills from 0 → value once visible. */
function IntentBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-rule/60 overflow-hidden">
      <motion.div
        initial={{ width: "0%" }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease }}
        className="h-full rounded-full bg-amber"
      />
    </div>
  );
}

/* Reddit alien mark — inline SVG so we avoid the trademark dep. */
function RedditMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="13" r="8" />
      <path d="M12 5l1-3 3 1" />
      <circle cx="16" cy="2.5" r="0.9" fill="currentColor" />
      <circle cx="9" cy="13" r="1.1" fill="currentColor" />
      <circle cx="15" cy="13" r="1.1" fill="currentColor" />
      <path d="M9 16.5c1 1 2 1.5 3 1.5s2-.5 3-1.5" />
    </svg>
  );
}
