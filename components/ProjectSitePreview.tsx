"use client";

import Image from "next/image";
import type { ProjectPreview } from "@/lib/content";
import { pickByMode, useProjectViewMode } from "@/components/ProjectViewModeContext";
import { ScrollReveal } from "@/components/ScrollReveal";

type ProjectSitePreviewProps = {
  preview: ProjectPreview;
  liveUrl?: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function assetPath(path: string) {
  return `${basePath}${path}`;
}

export function ProjectSitePreview({ preview, liveUrl }: ProjectSitePreviewProps) {
  const { mode } = useProjectViewMode();
  const pick = <T,>(base: T, simple: T | undefined): T => pickByMode(base, simple, mode);

  const title = pick(preview.title, preview.titleSimple);
  const caption = pick(preview.caption, preview.captionSimple);
  const href = preview.href ?? liveUrl;

  const image = (
    <Image
      src={assetPath(preview.src)}
      alt={preview.alt}
      width={1280}
      height={900}
      unoptimized
      className="project-preview-image"
    />
  );

  return (
    <ScrollReveal distance={40} threshold={0.08}>
      <section id="section-site-preview" className="section-rule mt-14 scroll-mt-32 py-14 md:mt-20 md:py-20">
        <p className="section-label">{title}</p>

        <figure className="project-preview-figure mt-8 max-w-3xl md:mt-10">
          <div className="project-preview-frame">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-preview-link"
                aria-label={pick("Open live site", "公開サイトを開く")}
              >
                {image}
              </a>
            ) : (
              image
            )}
          </div>
          {caption && <figcaption className="diagram-caption mt-4">{caption}</figcaption>}
        </figure>
      </section>
    </ScrollReveal>
  );
}
