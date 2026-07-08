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

  const title = project.title;
  const description = project.detail?.lead ?? project.story[0];
  const pageUrl = `${siteConfig.metadata.siteUrl}/works/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: pageUrl,
    },
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
