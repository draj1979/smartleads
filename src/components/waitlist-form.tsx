"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { CONTENT } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  source: "hero" | "final";
  placeholder?: string;
  ctaLabel?: string;
  /** Initial server-rendered count; shown beneath the form when provided. */
  count?: number;
  /** Template with {count} placeholder, e.g. "{count} solopreneurs already on the waitlist". */
  proofTemplate?: string;
  /** Compact = no proof line (used by Final CTA where its own copy lives outside). */
  compact?: boolean;
  /** Visual variant — controls input bg, pill bg, and button color.
   *  - on-paper: form sits on cream bg, ink button
   *  - on-paper-card: form sits on lifted paper-card, ink button
   *  - on-dark: form sits on a dark navy section, amber button (conversion CTA)
   */
  variant?: "on-paper" | "on-paper-card" | "on-dark";
  className?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm({
  source,
  placeholder = "you@yourthing.com",
  ctaLabel = "Join the waitlist",
  count,
  proofTemplate,
  compact = false,
  variant = "on-paper",
  className = "",
}: Props) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(count ?? 0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError("That doesn't look like a valid email.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source, bot_field: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        already?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Couldn't submit just now — try again?");
      }
      setStatus("success");
      // Optimistic count bump (only if this wasn't a dedup).
      if (!data.already) {
        setShowCount((c) => c + 1);
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  /* ── Success state ────────────────────────────────────── */
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`flex items-start gap-3 p-4 rounded-2xl border border-amber/40 bg-amber-soft/70 text-ink ${className}`}
      >
        <div className="w-8 h-8 rounded-full bg-amber text-ink flex items-center justify-center shrink-0">
          <Check size={16} strokeWidth={2.5} />
        </div>
        <div className="leading-snug">
          <p className="font-display text-lg">{CONTENT.waitlist.successHeading}</p>
          <p className="text-sm text-ink-soft mt-0.5">{CONTENT.waitlist.successBody}</p>
        </div>
      </div>
    );
  }

  /* ── Idle / submitting / error ───────────────────────── */
  const v = {
    "on-paper": {
      pill: "sm:bg-paper-card sm:border-rule",
      inputBg: "bg-paper-card",
      button: "bg-ink text-paper hover:opacity-90",
      ring: "focus:ring-amber/50",
    },
    "on-paper-card": {
      pill: "sm:bg-paper sm:border-rule",
      inputBg: "bg-paper",
      button: "bg-ink text-paper hover:opacity-90",
      ring: "focus:ring-amber/50",
    },
    "on-dark": {
      pill: "sm:bg-paper sm:border-transparent",
      inputBg: "bg-paper",
      button: "bg-amber text-ink hover:bg-amber-deep",
      ring: "focus:ring-amber",
    },
  }[variant];

  return (
    <div className={className}>
      <form
        onSubmit={onSubmit}
        noValidate
        className={`flex flex-col sm:flex-row sm:items-stretch gap-2 sm:gap-1.5 sm:p-1.5 sm:rounded-full sm:border ${v.pill}`}
      >
        {/* Honeypot — not display:none (some bots skip those); off-screen + tabIndex -1 */}
        <label className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden>
          Don&apos;t fill this in
          <input
            type="text"
            name="bot_field"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>

        <input
          type="email"
          required
          autoComplete="email"
          aria-label="Email address"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          className={`flex-1 min-w-0 px-5 py-3.5 sm:py-2.5 rounded-full ${v.inputBg} border border-rule sm:border-0 sm:bg-transparent text-ink placeholder:text-ink-soft/70 outline-none focus:ring-2 ${v.ring} disabled:opacity-60`}
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          data-event={`${source}_cta_click`}
          className={`inline-flex items-center justify-center gap-1.5 px-5 py-3.5 sm:py-2.5 rounded-full ${v.button} text-[15px] font-medium transition disabled:opacity-70`}
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Joining…
            </>
          ) : (
            <>
              {ctaLabel}
              <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Social proof line */}
      {!compact && count !== undefined && proofTemplate && (
        <p className="mt-3 text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber" />
            </span>
            {proofTemplate.replace("{count}", String(showCount))}
          </span>
        </p>
      )}
    </div>
  );
}
