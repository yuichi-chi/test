"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  label: string;
};

type ProjectTocProps = {
  items: TocItem[];
};

export function ProjectToc({ items }: ProjectTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="project-toc" aria-label="ページ内目次">
      <p className="project-toc-label">On this page</p>
      <ol className="project-toc-list">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`project-toc-link${activeId === id ? " is-active" : ""}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
