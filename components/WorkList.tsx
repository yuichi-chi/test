"use client";

import Link from "next/link";
import { getProjectHref, isInlineProject, siteConfig } from "@/lib/content";
import { ProjectDiagram } from "@/components/diagrams/ProjectDiagram";
import { PageShell } from "@/components/PageShell";
import { ScrollReveal } from "@/components/ScrollReveal";

const MAX_TAGS = 4;

function splitCategoryTags(category: string): string[] {
  return category
    .split("/")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function WorkList() {
  const projects = siteConfig.projects;
  const projectCount = projects.length;

  return (
    <section id="works" className="section-rule pt-20 md:pt-28">
      <PageShell>
        <ScrollReveal distance={40}>
          <div className="works-header">
            <h2 className="display-md">Works</h2>
            <p className="works-header-meta">
              <span>{projectCount} projects</span>
              <span className="works-header-dot" aria-hidden="true">·</span>
              <span>2023 — 2026</span>
            </p>
          </div>
        </ScrollReveal>

        {projects.map((project, index) => {
          const tags = splitCategoryTags(project.category);
          const visibleTags = tags.slice(0, MAX_TAGS);
          const hiddenCount = Math.max(tags.length - MAX_TAGS, 0);

          return (
            <ScrollReveal key={project.id} distance={64} threshold={index * 0.05}>
              <Link
                href={getProjectHref(project)}
                className={`work-index-link ${index > 0 ? "section-rule" : ""}`}
              >
                <span className="work-index-number">{project.id}</span>
                {project.listDiagramId && (
                  <div className="work-index-thumb" aria-hidden="true">
                    <ProjectDiagram id={project.listDiagramId} compact />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="work-index-title">{project.title}</h3>
                  <ul className="work-index-tags mt-4 md:mt-5">
                    {isInlineProject(project) && (
                      <li className="work-index-tag work-index-tag-inline">インライン展示</li>
                    )}
                    {visibleTags.map((tag) => (
                      <li key={tag} className="work-index-tag">
                        {tag}
                      </li>
                    ))}
                    {hiddenCount > 0 && (
                      <li className="work-index-tag work-index-tag-more">+{hiddenCount}</li>
                    )}
                  </ul>
                </div>
                <span className="work-index-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </ScrollReveal>
          );
        })}
      </PageShell>
    </section>
  );
}
