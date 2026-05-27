"use client";

import { motion } from "framer-motion";
import { CONTENT } from "@/lib/content";
import { WaitlistForm } from "@/components/waitlist-form";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Final CTA — the conversion close.
 *
 * Sits on bg-ink so it inverts with the theme (matches Differentiators).
 * Center-aligned single-column composition, distinct shape from the
 * 2x2 Differentiators band so the two dark moments don't feel identical.
 */
export function FinalCta({ count }: { count: number }) {
  const { eyebrow, headline, accent, subhead, emailPlaceholder, ctaLabel } =
    CONTENT.finalCta;

  return (
    <section
      id="join"
      className="relative bg-ink text-paper overflow-hidden border-t border-rule/30"
    >
      {/* Amber atmosphere */}
      <div
        aria-hidden
        className="absolute top-0 right-1/4 w-[28rem] h-[28rem] rounded-full bg-gold/18 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] rounded-full bg-gold/10 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-3xl mx-auto px-5 md:px-10 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold mb-5">
            {eyebrow}
          </p>

          <h2 className="font-display text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.02] tracking-tight text-paper">
            {headline}
            <br />
            <em className="italic text-gold">{accent}</em>
          </h2>

          <p className="mt-7 max-w-xl mx-auto text-base md:text-lg text-paper/70 leading-relaxed">
            {subhead}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.18, ease }}
          className="mt-10 max-w-md mx-auto"
        >
          <WaitlistForm
            source="final"
            variant="on-dark"
            ctaLabel={ctaLabel}
            placeholder={emailPlaceholder}
            compact
          />
          {/* Tiny live count + reassurance row */}
          <p className="mt-4 text-xs text-paper/55 flex items-center justify-center gap-2">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-sage opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sage" />
            </span>
            <span>{count} already in · no spam · unsubscribe anytime</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
