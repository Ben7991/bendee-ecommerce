import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge taught the Jofak scales (see src/styles/theme.css) so that conflicting
 * classes resolve correctly, e.g. cn("text-14", "text-text-muted") keeps both (size vs colour).
 * Keep these lists in sync with the theme when a scale changes.
 */
const twMerge = extendTailwindMerge({
  override: {
    theme: {
      "font-weight": ["regular", "medium", "semibold", "bold"],
      leading: ["xs", "sm", "base", "lg", "2xl", "3xl", "4xl", "5xl", "6xl"],
      tracking: ["display", "heading", "tight", "snug", "compact", "subtle", "normal", "caps", "wide", "numeral", "label", "eyebrow", "code"],
      text: [
        "xs", "sm", "base", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl",
        "10", "11", "14", "17", "19", "22", "24", "28", "30", "34", "36", "38", "40", "56", "64", "104", "140", "180",
      ],
      radius: ["none", "2", "3", "5", "6", "8", "10", "sm", "14", "md", "18", "lg", "22", "xl", "26", "2xl", "3xl", "full"],
      shadow: ["xs", "chip", "card", "brand", "overlay", "drawer", "modal", "panel-left", "panel-up", "bar"],
      breakpoint: ["sm", "md", "lg", "xl"],
      container: ["prose", "content"],
    },
  },
  extend: {
    classGroups: {
      // Custom @utility classes from theme.css, so they don't get mistaken for colours.
      "border-w": ["border-field"],
      "auto-cols": ["auto-cols-quarter"],
    },
  },
});

/** Merge class names; later classes win. Every component passes `className` last. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
