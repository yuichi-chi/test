"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getHeroFadeProgress } from "@/lib/scroll";

type HeroScrollProps = {
  children: ReactNode;
  className?: string;
};

export function HeroScroll({ children, className = "" }: HeroScrollProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const progress = getHeroFadeProgress(window.scrollY);
      const eased = progress * progress;

      element.style.opacity = String(1 - eased * 0.75);
      element.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className={`hero-scroll ${className}`.trim()}>
      {children}
    </section>
  );
}
