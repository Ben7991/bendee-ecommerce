import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Admin status chips (Paper Jofak - Admin): payment states ("Paid · MoMo", "Cash on delivery"),
 * KPI deltas ("+8.8%") and section counts ("9"). `md` sits in tables, `sm` in mobile rows,
 * `count` next to titles and in KPI deltas (pass `font-bold` there).
 */
export const statusChipVariants = cva("inline-flex w-fit items-center rounded-full font-sans font-semibold whitespace-nowrap", {
  variants: {
    tone: {
      success: "bg-sage-100 text-brand",
      warning: "bg-tint-sun text-warning-text",
      error: "bg-tint-citrus text-error",
      accent: "bg-accent text-on-accent",
      neutral: "bg-surface text-text-muted",
    },
    size: {
      sm: "px-1.75 py-0.5 text-11 leading-3.5",
      md: "px-2 py-0.75 text-xs leading-xs",
      count: "px-2 py-0.5 text-xs leading-xs",
    },
  },
  defaultVariants: { tone: "success", size: "md" },
});

export type StatusChipVariantProps = VariantProps<typeof statusChipVariants>;
