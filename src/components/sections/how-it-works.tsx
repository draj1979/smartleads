"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CONTENT } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function HowItWorks() {
  const { eyebrow, headline, steps } = CONTENT.howItWorks;

  return (
    <section id="how" className="relative scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-amber-deep mb-4">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.04] tracking-tight text-ink">
            {headline}
          </h2>
        </motion.div>

        {/* Step grid */}
        <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 relative">
          {/* Faint connector line on lg+ — sits behind cards, gives sequence */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[5.5rem] left-[12%] right-[12%] h-px"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent, var(--rule), transparent)",
            }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            return (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease,
                }}
                className="relative bg-paper-card border border-rule rounded-2xl p-6 md:p-7 transition hover:-translate-y-1 hover:shadow-[0_24px_48px_-22px_oklch(0.30_0.082_264_/_0.20)]"
              >
                {/* Number block — the visual anchor */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="font-display text-[3.75rem] leading-[0.9] text-amber-deep"
                    aria-hidden
                  >
                    {step.n}
                  </span>
                  {!isLast && (
                    <ArrowRight
                      size={18}
                      className="text-ink-soft/50 mt-3 hidden lg:block"
                      aria-hidden
                    />
                  )}
                </div>

                {/* Icon badge + title row */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-amber-soft text-amber-deep border border-amber/30 shrink-0">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-[20px] md:text-[22px] leading-[1.2] tracking-tight text-ink pt-1">
                    {step.title}
                  </h3>
                </div>

                <p className="text-[14.5px] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
