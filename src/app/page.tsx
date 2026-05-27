import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Differentiators } from "@/components/sections/differentiators";
import { Personas } from "@/components/sections/personas";
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
        <HowItWorks />
        <Differentiators />
        <Personas />
        {/* Sections still to land: Comparison, FAQ, Final CTA, Footer */}
      </main>
    </>
  );
}
