import { SiteNav } from "@/components/site-nav";
import { CONTENT } from "@/lib/content";

export default function Home() {
  const headline = CONTENT.hero.headlines[CONTENT.hero.headlineIdx];

  return (
    <>
      <SiteNav />

      <main className="flex-1">
        {/* Section 1 ✓ landed. Hero comes next — placeholder until then. */}
        <section className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-deep mb-5">
            Section 1 (nav) ✓ · hero coming next
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] text-ink max-w-4xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft leading-relaxed">
            {CONTENT.hero.subhead}
          </p>

          {/* Scroll target so the nav CTA has somewhere to land before the real hero form exists */}
          <div
            id="waitlist"
            className="mt-12 p-6 rounded-2xl border border-rule bg-paper-card text-sm text-ink-soft max-w-xl"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-amber-deep mb-1.5">
              waitlist anchor
            </p>
            <p>
              The hero email form will land here (id=&quot;waitlist&quot;) so
              the nav CTA scrolls to it. Replaced in Section 2.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
