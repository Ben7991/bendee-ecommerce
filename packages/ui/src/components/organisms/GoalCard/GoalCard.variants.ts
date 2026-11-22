import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** "Shop by goal" cards. Each tone carries its own text colours for both themes. */
export const goalCardVariants = cva(
  "group relative isolate flex flex-col overflow-hidden rounded-22 p-5 md:rounded-2xl",
  {
    variants: {
      tone: {
        feature: "bg-gradient-feature",
        surface: "bg-surface",
        accent: "bg-accent",
        citrus: "bg-gradient-citrus",
      },
      size: {
        feature: "md:p-8",
        default: "md:p-7",
      },
    },
    defaultVariants: { tone: "surface", size: "default" },
  },
);

export const goalCardTitleVariants = cva("font-sans font-medium", {
  variants: {
    tone: {
      feature: "text-text-inverse",
      surface: "text-text",
      accent: "text-on-accent",
      citrus: "text-citrus-950 dark:text-text",
    },
    size: {
      feature: "text-2xl leading-lg tracking-snug md:text-40 md:leading-10.5 md:tracking-heading",
      default: "text-24 leading-6.5 tracking-snug md:text-2xl md:leading-2xl",
    },
  },
  defaultVariants: { tone: "surface", size: "default" },
});

export const goalCardDescriptionVariants = cva("font-sans", {
  variants: {
    tone: {
      feature: "text-text-inverse-muted",
      surface: "text-text-muted",
      accent: "text-evergreen-800",
      citrus: "text-citrus-900 dark:text-text-secondary",
    },
    size: {
      feature: "text-sm leading-4.5 md:w-75 md:text-base md:leading-5.5",
      default: "text-sm leading-4.5 md:text-14 md:leading-sm",
    },
  },
  defaultVariants: { tone: "surface", size: "default" },
});

export type GoalCardVariantProps = VariantProps<typeof goalCardVariants>;
