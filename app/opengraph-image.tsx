import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/content";

export const dynamic = "force-static";
export const alt = siteConfig.metadata.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#faf9f6",
          color: "#111111",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p
            style={{
              fontSize: 22,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8a8a8a",
              margin: 0,
            }}
          >
            {siteConfig.metadata.author} · Portfolio
          </p>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              margin: 0,
              maxWidth: 900,
            }}
          >
            {siteConfig.hero.lines.join("")}
          </h1>
          <p style={{ fontSize: 28, color: "#444444", margin: 0, maxWidth: 820 }}>
            {siteConfig.hero.subtitle}
          </p>
        </div>
        <p style={{ fontSize: 20, color: "#8a8a8a", margin: 0 }}>
          Web3 · Reinforcement Learning · Game Strategy
        </p>
      </div>
    ),
    { ...size },
  );
}
