"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CONTENT } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function FAQ() {
  const { eyebrow, headline, contact, items } = CONTENT.faq;

  // Controlled accordion: open the first item by default, but if the URL
  // hash matches an item id (e.g. nav 'Pricing' → #faq-pricing), open that
  // one instead and scroll into view.
  const [open, setOpen] = useState<string>(items[0].id);

  useEffect(() => {
    function syncFromHash() {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const match = items.find((it) => it.id === hash);
      if (match) {
        setOpen(match.id);
        // Defer scroll a tick so the accordion has time to expand.
        requestAnimationFrame(() => {
          document
            .getElementById(match.id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [items]);

  return (
    <section id="faq" className="relative scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-28 grid lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: header + contact bridge */}
        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="lg:col-span-5 lg:sticky lg:top-24 self-start"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-amber-deep mb-4">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.04] tracking-tight text-ink">
            Everything{" "}
            <em className="italic text-amber-deep">I&apos;d ask</em> if I were
            you.
          </h2>

          {/* Contact bridge */}
          <div className="mt-9 bg-paper-card border border-rule rounded-2xl p-5">
            <p className="text-sm font-medium text-ink mb-3">
              {contact.heading}
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${contact.email}`}
                data-event="faq_email_click"
                className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-amber-deep transition"
              >
                <Mail size={14} className="text-amber-deep" />
                {contact.email}
              </a>
              <a
                href={contact.twitterUrl}
                target="_blank"
                rel="noreferrer"
                data-event="faq_twitter_click"
                className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-amber-deep transition"
              >
                <MessageCircle size={14} className="text-amber-deep" />
                {contact.twitterLabel}
              </a>
            </div>
          </div>
        </motion.aside>

        {/* Right: accordion */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="lg:col-span-7"
        >
          <Accordion
            type="single"
            collapsible
            value={open}
            onValueChange={(v) => setOpen(v || "")}
            className="bg-paper-card border border-rule rounded-2xl px-5 md:px-7"
          >
            {items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                id={item.id}
                className="border-rule scroll-mt-24"
              >
                <AccordionTrigger
                  data-event={`faq_${item.id}_toggle`}
                  className="text-base md:text-[17px] font-display tracking-tight text-ink py-5 hover:no-underline leading-snug"
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-ink-soft pb-5 pr-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
