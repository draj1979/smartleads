"use client";

import { motion } from "framer-motion";
import { CONTENT } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Differentiators sits on `bg-ink` which is the deep navy in light mode
 * and the cream in dark mode — so it naturally inverts to a "punch" band
 * regardless of theme. Type and icons use `text-paper` / `bg-gold/15`
 * which look right against either background.
 */
export function Differentiators() {
  const { eyebrow, headline, items } = CONTENT.differentiators;

  return (
    <section
      id="features"
      className="relative bg-ink text-paper overflow-hidden"
    >
      {/* Soft gold wash for warmth — works on both navy and cream */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[28rem] h-[28rem] rounded-full bg-gold/15 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[20rem] h-[20rem] rounded-full bg-gold/10 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold mb-4">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.04] tracking-tight text-paper">
            Built for the parts everyone else{" "}
            <em className="italic text-gold not-italic-tablet">gets wrong.</em>
          </h2>
        </motion.div>

        {/* 2×2 grid of typography-led items — no card surfaces, the dark
            band does the structural lifting. */}
        <ul className="mt-14 grid sm:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-10 lg:gap-y-12 max-w-5xl">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + i * 0.08,
                  ease,
                }}
                className="flex gap-4 md:gap-5"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gold/15 border border-gold/40 text-gold shrink-0">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-display text-[20px] md:text-[22px] leading-[1.2] tracking-tight text-paper mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-paper/70 max-w-md">
                    {item.body}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* Quiet bottom note — proof of restraint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="mt-14 text-xs text-paper/55 font-mono uppercase tracking-[0.16em]"
        >
          No autoplay. No spam. No 'AI sparkle' aesthetic.
        </motion.p>
      </div>
    </section>
  );
}
