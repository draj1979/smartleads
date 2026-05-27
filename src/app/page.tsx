import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { getWaitlistCount } from "@/lib/waitlist";

export const revalidate = 60; // ISR: rebuild count snapshot at most every minute

export default async function Home() {
  const count = await getWaitlistCount();

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero count={count} />
        <Problem />
        {/* Sections still to land: How it works, Differentiators,
            Personas, Comparison, FAQ, Final CTA, Footer */}
      </main>
    </>
  );
}
