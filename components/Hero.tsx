import Link from "next/link";
import { HeroBackground3D } from "@/components/HeroBackground3D";
import { siteConfig } from "@/lib/content";
import { HeroScroll } from "@/components/HeroScroll";
import { PageShell } from "@/components/PageShell";

export function Hero() {
  const { eyebrow, lines, subtitle, byline } = siteConfig.hero;

  return (
    <HeroScroll className="relative min-h-[85vh] overflow-hidden pb-32 pt-28 md:pb-40 md:pt-40">
      <HeroBackground3D />
      <PageShell className="relative z-10">
        <p className="hero-eyebrow">{eyebrow}</p>

        <h1 className="mt-6 text-balance md:mt-8">
          {lines.map((line) => (
            <span key={line} className="display-xl block">
              {line}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle mt-6 md:mt-8">{subtitle}</p>

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)] md:mt-8 md:text-sm">
          {byline}
        </p>

        <Link href="#works" className="hero-cta mt-10 md:mt-14" aria-label="View Works">
          <span className="hero-cta-label">View Works</span>
          <span aria-hidden="true" className="hero-cta-arrow">→</span>
        </Link>
      </PageShell>

      <div aria-hidden="true" className="hero-scroll-cue">
        <span className="hero-scroll-cue-line" />
        <span className="hero-scroll-cue-text">Scroll</span>
      </div>
    </HeroScroll>
  );
}
