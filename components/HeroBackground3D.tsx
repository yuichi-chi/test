"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CanvasErrorBoundary } from "@/components/CanvasErrorBoundary";

const HeroCanvas = dynamic(() => import("@/components/hero/HeroCanvas"), {
  ssr: false,
  loading: () => <div className="hero-canvas-fallback" aria-hidden="true" />,
});

export function HeroBackground3D() {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setEnabled(!media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (enabled !== true) {
    return <div className="hero-canvas-fallback" aria-hidden="true" />;
  }

  return (
    <div className="hero-canvas" aria-hidden="true">
      <CanvasErrorBoundary fallback={<div className="hero-canvas-fallback" aria-hidden="true" />}>
        <HeroCanvas />
      </CanvasErrorBoundary>
    </div>
  );
}
