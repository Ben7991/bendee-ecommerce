import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Small caps label above a section heading ("SHOP BY GOAL"). */
export const eyebrowVariants = cva("font-sans font-semibold uppercase tracking-wide", {
  variants: {
    tone: {
      brand: "text-brand",
      accent: "text-accent",
    },
    size: {
      sm: "text-xs leading-xs",
      md: "text-sm leading-xs",
      responsive: "text-xs leading-xs md:text-sm",
    },
  },
  defaultVariants: { tone: "brand", size: "responsive" },
});

export type EyebrowVariantProps = VariantProps<typeof eyebrowVariants>;
