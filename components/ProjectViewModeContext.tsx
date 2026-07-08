"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
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
const MODE_CHANGE_EVENT = "projectViewModeChange";
const HYDRATED_EVENT = "projectViewModeHydrated";

const ProjectViewModeContext = createContext<ProjectViewModeContextValue | null>(null);

function readStoredMode(): ProjectViewMode {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "expert" || stored === "simple") {
      return stored;
    }
  } catch {
    // localStorage が使えない環境ではデフォルトのまま
  }
  return DEFAULT_MODE;
}

function subscribe(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(MODE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(MODE_CHANGE_EVENT, onStoreChange);
  };
}

let clientHydrated = false;

function subscribeHydrated(onStoreChange: () => void) {
  const markHydrated = () => {
    if (!clientHydrated) {
      clientHydrated = true;
      onStoreChange();
    }
  };

  queueMicrotask(markHydrated);
  window.addEventListener(HYDRATED_EVENT, markHydrated);

  return () => {
    window.removeEventListener(HYDRATED_EVENT, markHydrated);
  };
}

function getHydratedSnapshot() {
  return clientHydrated;
}

function getHydratedServerSnapshot() {
  return false;
}

export function ProjectViewModeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(
    subscribe,
    readStoredMode,
    () => DEFAULT_MODE,
  );
  const isHydrated = useSyncExternalStore(
    subscribeHydrated,
    getHydratedSnapshot,
    getHydratedServerSnapshot,
  );

  const setMode = useCallback((next: ProjectViewMode) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new Event(MODE_CHANGE_EVENT));
    } catch {
      // localStorage 書き込み不可でも UI 状態は維持
    }
  }, []);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      isHydrated,
    }),
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
