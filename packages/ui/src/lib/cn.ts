import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge taught the Jofak scales (see src/styles/theme.css) so that conflicting
 * classes resolve correctly, e.g. cn("leading-sm", "leading-base") → "leading-base".
 * Keep these lists in sync with the theme when a scale changes.
 */
const twMerge = extendTailwindMerge({
  override: {
    theme: {
      "font-weight": ["regular", "medium", "semibold", "bold"],
      tracking: ["display", "tight", "snug", "normal", "wide"],
      leading: ["xs", "sm", "base", "lg", "2xl", "3xl", "4xl", "5xl", "6xl"],
      text: ["xs", "sm", "base", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
      radius: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      breakpoint: ["sm", "md", "lg", "xl"],
      container: ["prose", "content"],
    },
  },
});

/** Merge class names; later classes win. Every component passes `className` last. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
