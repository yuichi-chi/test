"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ProjectViewMode = "expert" | "simple";

type ProjectViewModeContextValue = {
  mode: ProjectViewMode;
  setMode: (mode: ProjectViewMode) => void;
  isHydrated: boolean;
};

const STORAGE_KEY = "projectViewMode";
const DEFAULT_MODE: ProjectViewMode = "simple";

const ProjectViewModeContext = createContext<ProjectViewModeContextValue | null>(null);

export function ProjectViewModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ProjectViewMode>(DEFAULT_MODE);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "expert" || stored === "simple") {
        setModeState(stored);
      }
    } catch {
      // localStorage が使えない環境ではデフォルトのまま
    }
    setIsHydrated(true);
  }, []);

  const setMode = useCallback((next: ProjectViewMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage 書き込み不可でも UI 状態は維持
    }
  }, []);

  const value = useMemo(
    () => ({ mode, setMode, isHydrated }),
    [mode, setMode, isHydrated],
  );

  return (
    <ProjectViewModeContext.Provider value={value}>
      {children}
    </ProjectViewModeContext.Provider>
  );
}

export function useProjectViewMode(): ProjectViewModeContextValue {
  const ctx = useContext(ProjectViewModeContext);
  if (!ctx) {
    throw new Error(
      "useProjectViewMode must be used within a ProjectViewModeProvider",
    );
  }
  return ctx;
}

export function pickByMode<T>(base: T, simple: T | undefined, mode: ProjectViewMode): T {
  if (mode === "simple" && simple !== undefined) {
    return simple;
  }
  return base;
}
