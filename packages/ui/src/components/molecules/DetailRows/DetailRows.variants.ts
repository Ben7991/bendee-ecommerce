import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * DetailRows sizes (Paper Account):
 *   md: Overview "Your details": label above value on mobile, a 140px label column from 768px
 *   lg: Profile "Your details" card rows: padded and ruled, label beside value everywhere
 */
export const detailRowVariants = cva("flex border-b border-border-subtle last:border-0", {
  variants: {
    size: {
      md: "flex-col gap-0.5 py-3.5 md:flex-row md:items-center md:gap-4",
      lg: "items-center gap-3 px-4.5 py-3.5 md:gap-0 md:px-6 md:py-4",
    },
  },
  defaultVariants: { size: "md" },
});

export const detailLabelVariants = cva("shrink-0 text-sm leading-sm text-text-muted", {
  variants: {
    size: {
      md: "md:w-35",
      lg: "w-21 md:w-50",
    },
  },
  defaultVariants: { size: "md" },
});

export type DetailRowsVariantProps = VariantProps<typeof detailRowVariants>;
