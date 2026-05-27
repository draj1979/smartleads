import Link from "next/link";
import { CONTENT } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Sticky top navigation with subtle backdrop blur.
 *
 * Server Component — ThemeToggle is the only client child.
 * Links use plain anchor hrefs; smooth-scroll is handled by
 * `scroll-behavior: smooth` set globally on <html>.
 */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule/50 bg-paper/75 backdrop-blur-md supports-[backdrop-filter]:bg-paper/55">
      <div className="max-w-6xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href="/"
          data-event="nav_logo_click"
          className="flex items-center gap-2.5 group shrink-0"
        >
          <BrandMark />
          <span className="font-display text-lg md:text-xl tracking-tight text-ink">
            {CONTENT.brand.name}
          </span>
        </Link>

        {/* Center links — md+ only */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 text-sm text-ink-soft"
        >
          {CONTENT.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-event={`nav_${l.href.replace(/[^a-z0-9]/gi, "_")}_click`}
              className="hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <ThemeToggle />
          <a
            href={CONTENT.nav.ctaHref}
            data-event="nav_cta_click"
            className="inline-flex items-center gap-1.5 px-3.5 md:px-4 py-2 rounded-full bg-ink text-paper text-sm font-medium hover:opacity-90 transition"
          >
            {CONTENT.nav.ctaLabel}
            <span aria-hidden className="hidden sm:inline">
              ↓
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* Brand mark: `S` in a rounded square. Echoes Instrument Serif italic
   for character — different from a generic SaaS sans-serif logo. */
function BrandMark() {
  return (
    <div
      aria-hidden
      className="w-8 h-8 rounded-md bg-ink text-paper flex items-center justify-center"
    >
      <span className="font-display italic text-[17px] leading-none translate-y-[1px]">
        S
      </span>
    </div>
  );
}
