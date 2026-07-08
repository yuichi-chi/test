"use client";

import { useProjectViewMode, type ProjectViewMode } from "@/components/ProjectViewModeContext";

const OPTIONS: { value: ProjectViewMode; label: string; hint: string }[] = [
  { value: "expert", label: "詳しく", hint: "技術寄りの詳細解説を表示" },
  { value: "simple", label: "ざっくり", hint: "専門知識なしでも読める平易な解説を表示" },
];

export function ProjectViewModeToggle() {
  const { mode, setMode, isHydrated } = useProjectViewMode();

  return (
    <div
      className="project-view-mode-toggle fixed bottom-6 right-6 z-50 flex items-center gap-1 rounded-full border border-neutral-900/15 bg-[var(--bg)]/95 p-1 shadow-lg backdrop-blur-sm md:bottom-8 md:right-8"
      role="group"
      aria-label="解説モードの切替"
    >
      {OPTIONS.map((option) => {
        const isActive = isHydrated && mode === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setMode(option.value)}
            aria-pressed={isActive}
            title={option.hint}
            className={
              isActive
                ? "rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-[var(--bg)] transition-colors md:text-sm"
                : "rounded-full bg-transparent px-4 py-2 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-900 md:text-sm"
            }
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
