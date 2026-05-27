import Link from "next/link";
import { Mail } from "lucide-react";
import { CONTENT } from "@/lib/content";

/**
 * Minimal footer per the brief: brand + tagline, four nav links,
 * email + X handle, auto copyright year. Server Component — no
 * interaction below the fold.
 */
export function SiteFooter() {
  const { brand, footer } = CONTENT;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-paper-deep/50 border-t border-rule/60">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-12 md:py-16">
        {/* Top row */}
        <div className="grid sm:grid-cols-2 gap-8 sm:gap-10 items-start">
          {/* Brand block */}
          <div>
            <Link
              href="/"
              data-event="footer_logo_click"
              className="inline-flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-md bg-ink text-paper flex items-center justify-center">
                <span className="font-display italic text-[18px] leading-none translate-y-[1px]">
                  S
                </span>
              </div>
              <span className="font-display text-xl tracking-tight text-ink">
                {brand.name}
              </span>
            </Link>
            <p className="mt-4 text-sm text-ink-soft max-w-xs leading-relaxed">
              {footer.tagline}
            </p>
            <p className="mt-3 text-xs text-ink-soft/80 italic">
              {footer.builtBy}
            </p>
          </div>

          {/* Link cluster */}
          <nav
            aria-label="Footer"
            className="sm:justify-self-end sm:text-right"
          >
            <ul className="flex flex-wrap sm:justify-end gap-x-5 gap-y-2 text-sm">
              {footer.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-event={`footer_${l.label.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_click`}
                    className="text-ink-soft hover:text-ink transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Hairline */}
        <div className="mt-10 mb-6 h-px bg-rule" />

        {/* Bottom row */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-5 text-sm">
          {/* Contact */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-ink-soft">
            <a
              href={`mailto:${brand.supportEmail}`}
              data-event="footer_email_click"
              className="inline-flex items-center gap-1.5 hover:text-gold-deep transition"
            >
              <Mail size={13} className="text-gold-deep" />
              {brand.supportEmail}
            </a>
            <a
              href={`https://x.com/${brand.founderHandle}`}
              target="_blank"
              rel="noreferrer"
              data-event="footer_twitter_click"
              className="inline-flex items-center gap-1.5 hover:text-gold-deep transition"
            >
              <XMark className="w-3 h-3 text-gold-deep" />@{brand.founderHandle}
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-ink-soft/80 font-mono">
            © {year} {brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Lucide v1.x dropped brand icons. Inline X glyph. */
function XMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.452-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}
