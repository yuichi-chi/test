"use client";

import Link from "next/link";
import type { Project } from "@/lib/content";
import { ProjectDiagram } from "@/components/diagrams/ProjectDiagram";
import { PageShell } from "@/components/PageShell";
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

function ProjectPageContent({ project }: ProjectPageProps) {
  const { mode } = useProjectViewMode();
  const pick = <T,>(base: T, simple: T | undefined): T => pickByMode(base, simple, mode);

  const { detail } = project;
  const story = pick(project.story, project.storySimple);

  const leadingSectionTitles = ["Motivation", "Concept"];
  const leadingSection = detail?.sections.find((section) => leadingSectionTitles.includes(section.title));
  const otherSections = detail?.sections.filter((section) => !leadingSectionTitles.includes(section.title)) ?? [];

  const renderSection = (section: NonNullable<Project["detail"]>["sections"][number]) => {
    const sectionBody = pick(section.body, section.bodySimple);
    const sectionTitle = pick(section.title, section.titleSimple);
    return (
      <ScrollReveal key={section.title} distance={40} threshold={0.1}>
        <section className="section-rule py-14 md:py-20">
          <p className="section-label">{sectionTitle}</p>
          <div className="mt-8 max-w-2xl space-y-6 md:mt-10">
            {sectionBody.length > 0 && (
              <p className="body-text">{sectionBody[0]}</p>
            )}
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
        <ScrollReveal distance={40}>
          <Link href="/#works" className="nav-link text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
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

            {leadingSection && renderSection(leadingSection)}

            <ScrollReveal distance={40} threshold={0.1}>
              <section className="section-rule mt-14 py-14 md:mt-20 md:py-20">
                <p className="section-label">Highlights</p>
                <ul className="project-highlights mt-8 md:mt-10">
                  {pick(detail.highlights, detail.highlightsSimple).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal distance={40} threshold={0.1}>
              <section className="section-rule py-14 md:py-20">
                <p className="section-label">Tech Stack</p>
                <ul className="project-stack mt-8 md:mt-10">
                  {detail.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal distance={40} threshold={0.1}>
              <section className="section-rule py-14 md:py-20">
                <p className="section-label">Summary</p>
                <div className="mt-8 max-w-2xl space-y-6 md:mt-10">
                  {story.map((paragraph, index) => (
                    <p
                      key={index}
                      className={index === 0 ? "text-base leading-[2] text-neutral-700 md:text-lg" : "body-text"}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {otherSections.map((section) => renderSection(section))}

            <ScrollReveal distance={40} threshold={0.1}>
              <section className="section-rule py-14 md:py-20">
                <p className="section-label">Process</p>
                <ol className="project-process mt-8 md:mt-10">
                  {detail.process.map((step, index) => (
                    <li key={step.title} className="project-process-item">
                      <span className="project-process-number">{String(index + 1).padStart(2, "0")}</span>
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
              <section className="section-rule py-14 md:py-20">
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
                <p className={index === 0 ? "text-base leading-[2] text-neutral-700 md:text-lg" : "body-text"}>
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        )}
      </PageShell>
    </article>
  );
}
