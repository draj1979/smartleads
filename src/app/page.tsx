import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { getWaitlistCount } from "@/lib/waitlist";

export const revalidate = 60; // ISR: rebuild count snapshot at most every minute

export default async function Home() {
  const count = await getWaitlistCount();

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero count={count} />
        {/* Sections still to land: Problem, How it works, Differentiators,
            Personas, Comparison, FAQ, Final CTA, Footer */}
      </main>
    </>
  );
}
