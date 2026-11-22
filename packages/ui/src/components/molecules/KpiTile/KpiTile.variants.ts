import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * KPI tiles (Paper Jofak - Admin → Dashboard KPIs). `feature` is the one evergreen tile per row
 * (revenue). Tiles sit in KpiGroup, which draws the dividers.
 */
export const kpiTileVariants = cva("flex min-w-0 flex-col gap-2 p-4 font-sans md:gap-2.5 md:px-6 md:py-5.5", {
  variants: {
    tone: {
      default: "bg-bg",
      feature: "bg-primary",
    },
  },
  defaultVariants: { tone: "default" },
});

export const kpiTileMutedVariants = cva("", {
  variants: {
    tone: {
      default: "text-text-muted",
      feature: "text-text-inverse-muted",
    },
  },
  defaultVariants: { tone: "default" },
});

export type KpiTileVariantProps = VariantProps<typeof kpiTileVariants>;
