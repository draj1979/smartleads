import { ThemeToggle } from "@/components/theme-toggle";
import { CONTENT } from "@/lib/content";

export default function Home() {
  const headline = CONTENT.hero.headlines[CONTENT.hero.headlineIdx];

  return (
    <>
      {/* Placeholder nav-row so we can verify ThemeToggle works.
          Real <SiteNav /> lands in Section 1. */}
      <header className="max-w-6xl w-full mx-auto px-5 md:px-10 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-ink text-paper flex items-center justify-center font-display text-base font-medium">
            S
          </div>
          <span className="font-display text-xl tracking-tight text-ink">
            {CONTENT.brand.name}
          </span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-deep mb-5">
            Foundation ready · sections coming
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] text-ink max-w-4xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft leading-relaxed">
            {CONTENT.hero.subhead}
          </p>

          {/* Palette confirmation — swatches react to the theme toggle */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-3xl">
            {[
              { name: "paper", cls: "bg-paper border border-rule" },
              { name: "paper-deep", cls: "bg-paper-deep" },
              { name: "paper-card", cls: "bg-paper-card border border-rule" },
              { name: "rule", cls: "bg-rule" },
              { name: "ink-soft", cls: "bg-ink-soft" },
              { name: "ink", cls: "bg-ink" },
              { name: "amber-soft", cls: "bg-amber-soft" },
              { name: "amber", cls: "bg-amber" },
            ].map((c) => (
              <div key={c.name} className="flex flex-col gap-1.5">
                <div className={`h-12 rounded-md ${c.cls}`} />
                <span className="text-[11px] text-ink-soft font-mono">
                  {c.name}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons — show both CTA flavors so we can sanity-check both */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <button className="inline-flex items-center px-5 py-3 rounded-full bg-ink text-paper font-medium hover:opacity-90 transition">
              Primary CTA (ink on cream)
            </button>
            <button className="inline-flex items-center px-5 py-3 rounded-full bg-amber text-ink font-medium hover:bg-amber-deep transition">
              Amber CTA (highlight)
            </button>
            <p className="text-sm text-ink-soft font-mono">
              serif: Instrument · sans: Geist · toggle ↑ flips mode
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
