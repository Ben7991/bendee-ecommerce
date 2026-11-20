import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Sparkline strokes (Paper Jofak - Admin → Dashboard KPIs): lime on the evergreen revenue tile,
 * brand green for rising figures, error for falling ones.
 */
export const sparklineVariants = cva("inline-block h-6 w-18 shrink-0 fill-none", {
  variants: {
    tone: {
      accent: "stroke-accent",
      brand: "stroke-brand",
      error: "stroke-error",
    },
  },
  defaultVariants: { tone: "brand" },
});

export type SparklineVariantProps = VariantProps<typeof sparklineVariants>;
