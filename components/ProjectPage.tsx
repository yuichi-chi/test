"use client";

import Link from "next/link";
import type { Project } from "@/lib/content";
import { ProjectDiagram } from "@/components/diagrams/ProjectDiagram";
import { PageShell } from "@/components/PageShell";
import { ProjectToc, type TocItem } from "@/components/ProjectToc";
import { RlTrainingEvidence } from "@/components/RlTrainingEvidence";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  pickByMode,
  ProjectViewModeProvider,
  useProjectViewMode,
} from "@/components/ProjectViewModeContext";
import { ProjectViewModeToggle } from "@/components/ProjectViewModeToggle";

type ProjectPageProps = {
  project: Project;
};

export function ProjectPage({ project }: ProjectPageProps) {
  return (
    <ProjectViewModeProvider>
      <ProjectPageContent project={project} />
      <ProjectViewModeToggle />
    </ProjectViewModeProvider>
  );
}

function slugifySectionId(title: string) {
  return `section-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

function ProjectPageContent({ project }: ProjectPageProps) {
  const { mode } = useProjectViewMode();
  const pick = <T,>(base: T, simple: T | undefined): T => pickByMode(base, simple, mode);

  const { detail } = project;
  const story = pick(project.story, project.storySimple);

  const leadingSectionTitles = ["Motivation", "Concept"];
  const leadingSection = detail?.sections.find((section) =>
    leadingSectionTitles.includes(section.title),
  );
  const otherSections =
    detail?.sections.filter((section) => !leadingSectionTitles.includes(section.title)) ?? [];

  const tocItems: TocItem[] = detail
    ? [
        ...(leadingSection
          ? [
              {
                id: slugifySectionId(leadingSection.title),
                label: pick(leadingSection.title, leadingSection.titleSimple),
              },
            ]
          : []),
        { id: "section-highlights", label: "Highlights" },
        { id: "section-tech-stack", label: "Tech Stack" },
        { id: "section-summary", label: "Summary" },
        ...otherSections.flatMap((section) => {
          if (section.title === "Training Pipeline" && project.trainingEvidence) {
            return [
              {
                id: "section-training-results",
                label: pick(project.trainingEvidence.title, project.trainingEvidence.titleSimple),
              },
            ];
          }
          return [
            {
              id: slugifySectionId(section.title),
              label: pick(section.title, section.titleSimple),
            },
          ];
        }),
        { id: "section-process", label: "Process" },
        { id: "section-reflection", label: "Reflection" },
      ]
    : [];

  const renderSection = (
    section: NonNullable<Project["detail"]>["sections"][number],
    sectionId: string,
  ) => {
    const sectionBody = pick(section.body, section.bodySimple);
    const sectionTitle = pick(section.title, section.titleSimple);
    return (
      <ScrollReveal key={section.title} distance={40} threshold={0.1}>
        <section id={sectionId} className="section-rule scroll-mt-32 py-14 md:py-20">
          <p className="section-label">{sectionTitle}</p>
          <div className="mt-8 max-w-2xl space-y-6 md:mt-10">
            {sectionBody.length > 0 && <p className="body-text">{sectionBody[0]}</p>}
            {section.diagram && (
              <ProjectDiagram id={section.diagram} className="project-diagram" />
            )}
            {sectionBody.slice(1).map((paragraph, index) => (
              <p key={index} className="body-text">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </ScrollReveal>
    );
  };

  return (
    <article className="pb-24 pt-28 md:pb-32 md:pt-36">
      <PageShell>
        <div className="project-page-layout">
          <div className="project-page-main">
            <ScrollReveal distance={40}>
              <Link
                href="/#works"
                className="nav-link text-xs uppercase tracking-[0.14em] text-[var(--muted)]"
              >
                ← Works
              </Link>
            </ScrollReveal>

            <ScrollReveal distance={48} threshold={0.05}>
              <header className="mt-10 md:mt-14">
                <p className="text-xs font-medium tracking-wide text-[var(--muted)]">{project.id}</p>
                <h1 className="display-md mt-4">{project.title}</h1>
                <p className="mt-4 text-sm text-[var(--muted)] md:mt-5">{project.category}</p>
                <div className="project-link-group mt-6 md:mt-8">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-live-link"
                    >
                      <span className="project-live-link-label">Live site</span>
                      <span className="project-live-link-url">{project.liveUrl}</span>
                      <span aria-hidden="true" className="project-live-link-arrow">
                        ↗
                      </span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-repo-link"
                    >
                      <span className="project-live-link-label">Source</span>
                      <span className="project-live-link-url">{project.repoUrl}</span>
                      <span aria-hidden="true" className="project-live-link-arrow">
                        ↗
                      </span>
                    </a>
                  )}
                </div>
              </header>
            </ScrollReveal>

            {detail ? (
              <>
                <ScrollReveal distance={40} threshold={0.06}>
                  <p className="project-lead mt-10 max-w-3xl md:mt-14">
                    {pick(detail.lead, detail.leadSimple)}
                  </p>
                </ScrollReveal>

                <ScrollReveal distance={32} threshold={0.08}>
                  <dl className="project-meta mt-10 md:mt-14">
                    {detail.meta.map((item) => (
                      <div key={item.label} className="project-meta-item">
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </ScrollReveal>

                {leadingSection &&
                  renderSection(leadingSection, slugifySectionId(leadingSection.title))}

                <ScrollReveal distance={40} threshold={0.1}>
                  <section
                    id="section-highlights"
                    className="section-rule mt-14 scroll-mt-32 py-14 md:mt-20 md:py-20"
                  >
                    <p className="section-label">Highlights</p>
                    <ul className="project-highlights mt-8 md:mt-10">
                      {pick(detail.highlights, detail.highlightsSimple).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                </ScrollReveal>

                <ScrollReveal distance={40} threshold={0.1}>
                  <section
                    id="section-tech-stack"
                    className="section-rule scroll-mt-32 py-14 md:py-20"
                  >
                    <p className="section-label">Tech Stack</p>
                    <ul className="project-stack mt-8 md:mt-10">
                      {detail.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </section>
                </ScrollReveal>

                <ScrollReveal distance={40} threshold={0.1}>
                  <section id="section-summary" className="section-rule scroll-mt-32 py-14 md:py-20">
                    <p className="section-label">Summary</p>
                    <div className="mt-8 max-w-2xl space-y-6 md:mt-10">
                      {story.map((paragraph, index) => (
                        <p
                          key={index}
                          className={
                            index === 0
                              ? "text-base leading-[2] text-[color-mix(in_srgb,var(--fg)_78%,transparent)] md:text-lg"
                              : "body-text"
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                </ScrollReveal>

                {otherSections.flatMap((section) => {
                  const blocks = [];
                  if (section.title === "Training Pipeline" && project.trainingEvidence) {
                    blocks.push(
                      <RlTrainingEvidence
                        key="training-evidence"
                        evidence={project.trainingEvidence}
                        repoUrl={project.repoUrl}
                      />,
                    );
                  }
                  blocks.push(renderSection(section, slugifySectionId(section.title)));
                  return blocks;
                })}

                <ScrollReveal distance={40} threshold={0.1}>
                  <section id="section-process" className="section-rule scroll-mt-32 py-14 md:py-20">
                    <p className="section-label">Process</p>
                    <ol className="project-process mt-8 md:mt-10">
                      {detail.process.map((step, index) => (
                        <li key={step.title} className="project-process-item">
                          <span className="project-process-number">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <p className="project-process-title">{step.title}</p>
                            <p className="body-text mt-2">{step.description}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                </ScrollReveal>

                <ScrollReveal distance={40} threshold={0.1}>
                  <section
                    id="section-reflection"
                    className="section-rule scroll-mt-32 py-14 md:py-20"
                  >
                    <p className="section-label">Reflection</p>
                    <p className="closing-quote mt-8 md:mt-10">
                      {pick(detail.reflection, detail.reflectionSimple)}
                    </p>
                  </section>
                </ScrollReveal>
              </>
            ) : (
              <div className="mt-12 max-w-2xl space-y-8 md:mt-16">
                {story.map((paragraph, index) => (
                  <ScrollReveal key={index} distance={40} threshold={index * 0.06}>
                    <p
                      className={
                        index === 0
                          ? "text-base leading-[2] text-[color-mix(in_srgb,var(--fg)_78%,transparent)] md:text-lg"
                          : "body-text"
                      }
                    >
                      {paragraph}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>

          {detail && (
            <aside className="project-page-aside">
              <ProjectToc items={tocItems} />
            </aside>
          )}
        </div>
      </PageShell>
    </article>
  );
}
