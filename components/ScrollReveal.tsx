"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getRevealProgress } from "@/lib/scroll";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** 上方向への移動量（px） */
  distance?: number;
  /** 0〜1。小さいほど遅れて現れる */
  threshold?: number;
};

export function ScrollReveal({
  children,
  className = "",
  distance = 56,
  threshold = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      element.style.opacity = "1";
      element.style.transform = "none";
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = element.getBoundingClientRect();
      const progress = Math.max(0, getRevealProgress(rect, window.innerHeight) - threshold);
      const eased = 1 - Math.pow(1 - progress, 3);

      element.style.opacity = String(eased);
      element.style.transform = `translateY(${(1 - eased) * distance}px)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [distance, threshold]);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`.trim()} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
