"use client";

import { motion } from "framer-motion";
import { CONTENT } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Problem() {
  const { eyebrow, headline, items } = CONTENT.problem;

  return (
    <section
      id="problem"
      className="relative border-y border-rule/60 bg-paper-deep/40"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold-deep mb-4">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.04] tracking-tight text-ink">
            {headline}
          </h2>
        </motion.div>

        {/* Cards */}
        <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.li
                key={card.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease,
                }}
                className="group relative bg-paper-card border border-rule rounded-2xl p-6 md:p-7 transition hover:-translate-y-1 hover:shadow-[0_24px_48px_-22px_oklch(0.30_0.082_264_/_0.20)]"
              >
                {/* Index marker + icon */}
                <div className="flex items-start justify-between mb-7">
                  <div className="w-10 h-10 rounded-lg bg-paper text-ink-soft border border-rule flex items-center justify-center">
                    <Icon size={17} strokeWidth={1.75} />
                  </div>
                  <span
                    className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-soft"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")} / 03
                  </span>
                </div>

                <h3 className="font-display text-[20px] md:text-[22px] leading-[1.2] tracking-tight text-ink mb-3 max-w-[24ch]">
                  {card.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-ink-soft">
                  {card.body}
                </p>
              </motion.li>
            );
          })}
        </ul>

        {/* Bridge line to next section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="mt-14 flex items-center justify-center gap-3"
        >
          <span className="h-px w-12 bg-rule" aria-hidden />
          <a
            href="#how"
            data-event="problem_bridge_click"
            className="text-sm text-ink-soft hover:text-ink transition inline-flex items-center gap-1.5"
          >
            Here&apos;s what we do about it
            <span aria-hidden>↓</span>
          </a>
          <span className="h-px w-12 bg-rule" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
