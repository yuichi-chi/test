"use client";

import { siteConfig } from "@/lib/content";
import { PageShell } from "@/components/PageShell";
import { ScrollReveal } from "@/components/ScrollReveal";

function splitCategoryTags(category: string): string[] {
  return category
    .split("/")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function WorkDetail() {
  const inlineProjects = siteConfig.projects.filter((project) => !project.slug);

  if (inlineProjects.length === 0) {
    return null;
  }

  return (
    <section className="pt-8 md:pt-12">
      <PageShell>
        {inlineProjects.map((project, index) => {
          const tags = splitCategoryTags(project.category);
          const paragraphs = project.storySimple ?? project.story;

          return (
            <ScrollReveal key={project.id} distance={48} threshold={0.05}>
              <article
                id={`work-${project.id}`}
                className={`scroll-mt-32 py-14 md:py-20 ${index > 0 ? "section-rule" : "section-rule mt-10 md:mt-14"}`}
              >
                <p className="text-xs font-medium tracking-wide text-[var(--muted)]">{project.id}</p>
                <h3 className="work-index-title mt-4">{project.title}</h3>
                <ul className="work-index-tags mt-4 md:mt-5">
                  <li className="work-index-tag work-index-tag-inline">インライン展示</li>
                  {tags.map((tag) => (
                    <li key={tag} className="work-index-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
                <p className="work-inline-note mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                  詳細ページはありません。ホーム上で概要のみを掲載しています。
                </p>

                <div className="mt-8 max-w-2xl space-y-5 md:mt-10">
                  {paragraphs.map((paragraph, paragraphIndex) => (
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
          );
        })}
      </PageShell>
    </section>
  );
}
