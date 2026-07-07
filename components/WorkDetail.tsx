"use client";

import { siteConfig } from "@/lib/content";
import { PageShell } from "@/components/PageShell";
import { ScrollReveal } from "@/components/ScrollReveal";

export function WorkDetail() {
  const inlineProjects = siteConfig.projects.filter((project) => !project.slug);

  if (inlineProjects.length === 0) {
    return null;
  }

  return (
    <section className="pt-8 md:pt-12">
      <PageShell>
        <ScrollReveal distance={40}>
          <p className="section-label">Works</p>
        </ScrollReveal>

        {inlineProjects.map((project, index) => (
          <ScrollReveal key={project.id} distance={48} threshold={0.05}>
            <article
              id={`work-${project.id}`}
              className={`scroll-mt-32 py-14 md:py-20 ${index > 0 ? "section-rule" : "mt-10 md:mt-14"}`}
            >
              <p className="text-xs font-medium tracking-wide text-[var(--muted)]">{project.id}</p>
              <p className="mt-3 text-sm text-[var(--muted)]">{project.category}</p>

              <div className="mt-8 max-w-2xl space-y-5 md:mt-10">
                {project.story.map((paragraph, paragraphIndex) => (
                  <ScrollReveal
                    key={paragraphIndex}
                    distance={32}
                    threshold={paragraphIndex * 0.08}
                  >
                    <p
                      className={
                        paragraphIndex === 0
                          ? "text-[0.9375rem] leading-[2] text-neutral-700 md:text-base"
                          : "body-text"
                      }
                    >
                      {paragraph}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </article>
          </ScrollReveal>
        ))}
      </PageShell>
    </section>
  );
}
