/*
 * Server-safe theme constants. Kept out of theme.tsx ("use client") because values exported
 * from a client module become client references when a server component imports them.
 */

export const THEME_MODES = ["light", "dark", "system"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "jofak-theme";

export function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === "string" && (THEME_MODES as readonly string[]).includes(value);
}

/**
 * Inline script for <head>. Runs before first paint, applies the stored mode and never throws
 * (private mode / blocked storage fall back to System). Render it with
 * `<script dangerouslySetInnerHTML={{ __html: themeScript }} />` and put
 * `suppressHydrationWarning` on <html>, since the attribute is set before React hydrates.
 */
export const themeScript = `(function(){try{var m=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(m==="light"||m==="dark"){document.documentElement.setAttribute("data-theme",m)}}catch(e){}})();`;
