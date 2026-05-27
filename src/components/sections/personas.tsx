"use client";

import { motion } from "framer-motion";
import { CONTENT } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Personas() {
  const { eyebrow, headline, items } = CONTENT.personas;

  return (
    <section id="who" className="relative">
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
            If you sell your time or expertise,{" "}
            <em className="italic text-amber-deep">you&apos;re in.</em>
          </h2>
        </motion.div>

        {/* Persona grid: 1 / 2 / 3 — mobile, sm, lg */}
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p, i) => (
            <motion.li
              key={p.role}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: 0.05 + i * 0.06,
                ease,
              }}
              className="group bg-paper-card border border-rule rounded-xl p-5 md:p-6 transition hover:-translate-y-0.5 hover:border-amber/50 hover:shadow-[0_18px_36px_-22px_oklch(0.30_0.082_264_/_0.18)]"
            >
              <div className="flex items-start gap-3.5">
                <span
                  aria-hidden
                  className="text-2xl md:text-[26px] leading-none w-10 h-10 rounded-lg bg-paper border border-rule flex items-center justify-center shrink-0 group-hover:border-amber/40 transition"
                >
                  {p.emoji}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[18px] md:text-[19px] leading-tight tracking-tight text-ink mb-1.5">
                    {p.role}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-ink-soft">
                    {p.line}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Bottom honest note — reinforces the brief's 'skeptical-friendly' voice */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="mt-10 text-sm text-ink-soft max-w-xl"
        >
          Not on this list? If you sell expertise to someone who&apos;d
          describe their problem out loud, it probably still works — try it
          and see.
        </motion.p>
      </div>
    </section>
  );
}
