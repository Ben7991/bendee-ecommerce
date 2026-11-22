"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * Theme mode: "light" | "dark" | "system" (follow the OS).
 *
 * How it maps to CSS (see styles/theme.css):
 *   light  → <html data-theme="light">
 *   dark   → <html data-theme="dark">
 *   system → no data-theme; prefers-color-scheme decides.
 *
 * The choice is stored in localStorage under THEME_STORAGE_KEY. To avoid a flash of the
 * wrong theme, apps render `themeScript` (theme-script.ts) in <head> so the attribute is set
 * before paint.
 */

import {
  isThemeMode,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemeMode,
} from "./theme-script";

function readStoredMode(): ThemeMode {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

function applyMode(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", mode);
}

/* The stored mode is an external store: this tab's writes plus other tabs' storage events. */
const modeListeners = new Set<() => void>();

function subscribeToMode(onChange: () => void) {
  modeListeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    applyMode(readStoredMode());
    onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    modeListeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function writeMode(mode: ThemeMode) {
  applyMode(mode);
  try {
    if (mode === "system") window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Storage unavailable: the attribute still applies for this page view.
  }
  modeListeners.forEach((listener) => listener());
}

const DARK_QUERY = "(prefers-color-scheme: dark)";

function subscribeToSystem(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getSystemDark = () => window.matchMedia(DARK_QUERY).matches;
// The server can't know the stored choice; render "system" and let the client correct it.
const getServerMode = (): ThemeMode => "system";
const getServerSystemDark = () => false;

interface ThemeContextValue {
  /** The user's choice ("system" during server render). */
  mode: ThemeMode;
  /** What is actually showing. */
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  /** Called after the user changes mode, e.g. to save it to their account. */
  onModeChange?: (mode: ThemeMode) => void;
}

export function ThemeProvider({ children, onModeChange }: ThemeProviderProps) {
  const mode = useSyncExternalStore(subscribeToMode, readStoredMode, getServerMode);
  const systemDark = useSyncExternalStore(subscribeToSystem, getSystemDark, getServerSystemDark);

  const setMode = useCallback(
    (next: ThemeMode) => {
      writeMode(next);
      onModeChange?.(next);
    },
    [onModeChange],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedTheme: mode === "system" ? (systemDark ? "dark" : "light") : mode,
      setMode,
    }),
    [mode, systemDark, setMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Current theme mode and setter. Must be used inside <ThemeProvider>. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>.");
  return context;
}
