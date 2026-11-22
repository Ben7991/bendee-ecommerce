import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** The dot and label colour of a StockStatus line. */
export const stockStatusVariants = cva("", {
  variants: {
    tone: {
      /** "In stock". */
      success: "text-success",
      /** "Only 3 left", "Pre-order". */
      warning: "text-warning-text",
      /** "Sold out". */
      error: "text-error",
    },
  },
  defaultVariants: { tone: "success" },
});

export type StockStatusVariantProps = VariantProps<typeof stockStatusVariants>;
