import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";

import "@repo/ui/styles.css";
import "../src/stories/jofak-examples.css";

type Theme = "light" | "dark" | "system";

/**
 * Applies the toolbar theme to <html>:
 *   light  → data-theme="light" (forces light even if the OS is dark)
 *   dark   → data-theme="dark"
 *   system → no attribute, tokens.css follows prefers-color-scheme
 */
const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? "system") as Theme;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        fontFamily: "var(--font-sans)",
        padding: "var(--spacing-6)",
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Jofak colour theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
          { value: "system", title: "System", icon: "browser" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "system",
  },
  decorators: [withTheme],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
