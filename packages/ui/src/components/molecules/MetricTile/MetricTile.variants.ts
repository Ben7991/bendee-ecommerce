import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** MetricTile value tones (Paper Account → Overview stats): default, or brand for money saved. */
export const metricTileValueVariants = cva("text-xl leading-lg font-medium tracking-snug md:text-3xl md:leading-3xl", {
  variants: {
    tone: {
      default: "text-text",
      brand: "text-brand",
    },
  },
  defaultVariants: { tone: "default" },
});

export type MetricTileVariantProps = VariantProps<typeof metricTileValueVariants>;
