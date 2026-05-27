"use client";

import { motion } from "framer-motion";
import { CONTENT } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Comparison() {
  const { eyebrow, headline, note, rows, competitorName } = CONTENT.comparison;
  const brand = CONTENT.brand.name;

  return (
    <section
      id="vs-redreach"
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
            Where {brand} goes further than{" "}
            <em className="italic">{competitorName}</em>.
          </h2>
          <p className="mt-5 text-[15px] md:text-base text-ink-soft leading-relaxed">
            {note}
          </p>
        </motion.div>

        {/* ── Desktop table (md+) ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="hidden md:block mt-12 rounded-2xl border border-rule overflow-hidden bg-paper-card"
        >
          {/* Header row */}
          <div className="grid grid-cols-[1.1fr_1.6fr_1.3fr]">
            <div className="p-5 lg:p-6" />
            <div className="p-5 lg:p-6 bg-gold-soft border-l border-rule/70">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-ink text-paper flex items-center justify-center font-display italic text-base leading-none">
                  S
                </div>
                <span className="font-display text-lg text-ink">{brand}</span>
              </div>
            </div>
            <div className="p-5 lg:p-6 border-l border-rule/70">
              <span className="font-display text-lg text-ink-soft">
                {competitorName}
              </span>
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-[1.1fr_1.6fr_1.3fr] border-t border-rule/70"
            >
              <div className="p-5 lg:p-6 text-sm font-medium text-ink-soft">
                {row.feature}
              </div>
              <div className="p-5 lg:p-6 bg-gold-soft/60 border-l border-rule/70 text-[14.5px] text-ink leading-relaxed">
                {row.smartleads}
              </div>
              <div className="p-5 lg:p-6 border-l border-rule/70 text-[14.5px] text-ink-soft leading-relaxed">
                {row.competitor}
              </div>
              {/* visual: tiny index marker hidden in row */}
              <span
                aria-hidden
                className="hidden lg:block absolute font-mono text-[10px] tracking-wider text-ink-soft/40"
                style={{ display: "none" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Mobile stack (< md) ─────────────────────────── */}
        <div className="md:hidden mt-10 space-y-4">
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: 0.05 + i * 0.06,
                ease,
              }}
              className="rounded-xl border border-rule bg-paper-card p-5"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-ink-soft font-medium mb-4">
                {row.feature}
              </p>

              {/* SmartLeads */}
              <div className="rounded-lg bg-gold-soft border border-gold/30 px-4 py-3 mb-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-sm bg-ink text-paper flex items-center justify-center font-display italic text-[11px] leading-none">
                    S
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-ink">
                    {brand}
                  </span>
                </div>
                <p className="text-[14px] text-ink leading-relaxed">
                  {row.smartleads}
                </p>
              </div>

              {/* Competitor */}
              <div className="px-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                  {competitorName}
                </p>
                <p className="text-[14px] text-ink-soft leading-relaxed">
                  {row.competitor}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Honest footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-8 text-xs text-ink-soft/80 max-w-2xl leading-relaxed"
        >
          Based on {competitorName}&apos;s public documentation as of mid-2026.
          If something on their end has changed since, tell us — we update
          this table when it does.
        </motion.p>
      </div>
    </section>
  );
}
