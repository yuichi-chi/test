import { HeroBackground3D } from "@/components/HeroBackground3D";
import { siteConfig } from "@/lib/content";
import { HeroScroll } from "@/components/HeroScroll";
import { PageShell } from "@/components/PageShell";

export function Hero() {
  return (
    <HeroScroll className="relative min-h-[70vh] overflow-hidden pb-24 pt-28 md:pb-32 md:pt-40">
      <HeroBackground3D />
      <PageShell className="relative z-10">
        <h1 className="text-balance">
          {siteConfig.hero.lines.map((line) => (
            <span key={line} className="display-xl block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-8 text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)] md:mt-10 md:text-base">
          {siteConfig.hero.byline}
        </p>
      </PageShell>
    </HeroScroll>
  );
}
