import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * ProgressSteps sizes (Paper Account):
 *   md: order tracking (24px markers, 15px titles)
 *   sm: return status (22px markers, 13px titles)
 */
export const progressStepsVariants = cva("flex flex-col font-sans", {
  variants: {
    size: {
      md: "gap-0",
      sm: "gap-0",
    },
  },
  defaultVariants: { size: "md" },
});

export const progressMarkerVariants = cva("flex shrink-0 items-center justify-center rounded-full", {
  variants: {
    state: {
      done: "bg-brand text-text-inverse",
      current: "border-5 border-accent bg-primary",
      upcoming: "border-2 border-border bg-bg",
    },
    size: { md: "size-6", sm: "size-5.5" },
  },
  defaultVariants: { state: "upcoming", size: "md" },
});

export type ProgressStepsVariantProps = VariantProps<typeof progressStepsVariants>;
