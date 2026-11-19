import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * ProductThumb sizes (Paper Account): xs 40×46 (stacked on mobile), sm 48×54 (order rows), md
 * 52×60 (return items), lg 60×68 (order breakdown), xl 88 (subscription), square 64 / 72.
 */
export const productThumbVariants = cva("relative flex shrink-0 items-center justify-center", {
  variants: {
    tint: {
      sage: "bg-sage-100",
      amber: "bg-tint-amber",
      lavender: "bg-tint-lavender",
      sun: "bg-tint-sun",
      surface: "bg-surface",
    },
    size: {
      xs: "h-11.5 w-10 rounded-sm",
      sm: "h-13.5 w-12 rounded-sm",
      md: "h-15 w-13 rounded-sm",
      lg: "h-17 w-15 rounded-sm",
      xl: "size-22 rounded-md",
      square: "size-16 rounded-14",
      photo: "size-18 rounded-sm",
    },
  },
  defaultVariants: { tint: "sage", size: "sm" },
});

export type ProductThumbVariantProps = VariantProps<typeof productThumbVariants>;
