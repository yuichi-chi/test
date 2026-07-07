"use client";

import Link from "next/link";
import { getProjectHref, siteConfig } from "@/lib/content";
import { PageShell } from "@/components/PageShell";
import { ScrollReveal } from "@/components/ScrollReveal";

export function WorkList() {
  return (
    <section id="works" className="section-rule">
      <PageShell>
        {siteConfig.projects.map((project, index) => (
          <ScrollReveal key={project.id} distance={64} threshold={index * 0.05}>
            <Link
              href={getProjectHref(project)}
              className={`work-index-link ${index > 0 ? "section-rule" : ""}`}
            >
              <span className="work-index-number">{project.id}</span>
              <div className="min-w-0 flex-1">
                <h2 className="work-index-title">{project.title}</h2>
                <p className="work-index-category mt-3 text-sm text-[var(--muted)] md:mt-4">
                  {project.category}
                </p>
              </div>
              <span className="work-index-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </PageShell>
    </section>
  );
}
