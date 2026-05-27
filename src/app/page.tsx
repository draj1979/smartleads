import { ThemeToggle } from "@/components/theme-toggle";
import { CONTENT } from "@/lib/content";

export default function Home() {
  const headline = CONTENT.hero.headlines[CONTENT.hero.headlineIdx];

  return (
    <>
      {/* Placeholder nav-row so we can verify ThemeToggle works.
          Real <SiteNav /> lands in Section 1. */}
      <header className="max-w-6xl w-full mx-auto px-5 md:px-10 pt-6 flex items-center justify-between">
        <div className="font-display text-xl tracking-tight">
          {CONTENT.brand.name}
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan mb-5">
            Foundation ready · sections coming
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] text-ink max-w-4xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft leading-relaxed">
            {CONTENT.hero.subhead}
          </p>

          {/* Palette confirmation — both modes */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-3xl">
            {[
              { name: "paper", cls: "bg-paper border border-rule" },
              { name: "paper-deep", cls: "bg-paper-deep" },
              { name: "paper-card", cls: "bg-paper-card border border-rule" },
              { name: "rule", cls: "bg-rule" },
              { name: "ink-soft", cls: "bg-ink-soft" },
              { name: "ink", cls: "bg-ink" },
              { name: "cyan-soft", cls: "bg-cyan-soft" },
              { name: "cyan", cls: "bg-cyan" },
            ].map((c) => (
              <div key={c.name} className="flex flex-col gap-1.5">
                <div className={`h-12 rounded-md ${c.cls}`} />
                <span className="text-[11px] text-ink-soft font-mono">
                  {c.name}
                </span>
              </div>
            ))}
          </div>

          {/* Type sample + accent button so we can sanity-check both fonts and CTA color */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <button className="inline-flex items-center px-5 py-3 rounded-full bg-cyan text-primary-foreground font-medium hover:bg-cyan-deep transition">
              {CONTENT.hero.ctaLabel}
            </button>
            <p className="text-sm text-ink-soft font-mono">
              serif: Instrument · sans: Geist · accent: cyan · use the toggle ↑ to flip mode
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
