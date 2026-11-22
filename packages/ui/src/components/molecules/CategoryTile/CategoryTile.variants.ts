import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * A tinted shortcut to a category (Paper Search → Popular categories, overlay → Categories).
 * Both variants are pills on mobile; from 768px `tile` stacks name over count and `row` puts
 * them side by side.
 */
export const categoryTileVariants = cva(
  "flex shrink-0 rounded-full px-3.75 py-2.5 font-sans text-sm leading-xs font-semibold whitespace-nowrap text-text transition-shadow hover:ring-1 hover:ring-border",
  {
    variants: {
      variant: {
        tile: "md:min-w-0 md:flex-1 md:shrink md:basis-50 md:flex-col md:gap-1 md:rounded-lg md:p-5 md:text-lg md:leading-base",
        row: "md:items-center md:justify-between md:gap-3 md:rounded-md md:px-4 md:py-3.5 md:text-base md:leading-sm",
      },
      tint: {
        sage: "bg-sage-50",
        sun: "bg-tint-sun",
        lavender: "bg-tint-lavender",
        amber: "bg-tint-amber",
        citrus: "bg-tint-citrus",
      },
    },
    defaultVariants: { variant: "tile", tint: "sage" },
  },
);

export type CategoryTileVariantProps = VariantProps<typeof categoryTileVariants>;
