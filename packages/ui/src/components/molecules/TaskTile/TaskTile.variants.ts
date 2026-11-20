import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * "Needs your attention" tiles (Paper Jofak - Admin → Dashboard): neutral work queues, citrus for
 * problems (failed payments), sun for money waiting (cash on delivery to remit).
 */
export const taskTileVariants = cva(
  "flex min-w-0 flex-col gap-3.5 rounded-md px-4.5 py-4 font-sans transition-colors",
  {
    variants: {
      tone: {
        neutral: "bg-surface-subtle hover:bg-surface",
        citrus: "bg-tint-citrus hover:bg-citrus-200 dark:hover:bg-tint-citrus/80",
        sun: "bg-tint-sun hover:bg-sun-200 dark:hover:bg-tint-sun/80",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export const taskTileIconVariants = cva("flex size-8 shrink-0 items-center justify-center rounded-10 bg-bg", {
  variants: {
    tone: {
      neutral: "text-primary dark:text-text",
      citrus: "text-error",
      sun: "text-warning-text",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export type TaskTileVariantProps = VariantProps<typeof taskTileVariants>;
