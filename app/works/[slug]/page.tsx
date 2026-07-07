import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ProjectPage } from "@/components/ProjectPage";
import { getProjectBySlug, siteConfig } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return siteConfig.projects
    .filter((project) => project.slug)
    .map((project) => ({ slug: project.slug! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Not Found" };
  }

  return {
    title: `${project.title} | ${siteConfig.metadata.title}`,
    description: project.detail?.lead ?? project.story[0],
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <ProjectPage project={project} />
      </main>
    </>
  );
}
