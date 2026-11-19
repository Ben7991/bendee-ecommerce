import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * AddTile sizes (Paper Account):
 *   lg: "Add a new address" in the address grid: a disc, a title and a line, centred
 *   sm: "+ Subscribe to another product": one brand line
 */
export const addTileVariants = cva(
  "flex items-center justify-center rounded-lg border-field border-dashed border-border font-sans transition-colors hover:border-brand hover:bg-surface-subtle",
  {
    variants: {
      size: {
        lg: "min-h-50 flex-col gap-3 p-6 text-center",
        sm: "gap-2 p-4 text-sm leading-xs font-semibold text-brand md:rounded-xl",
      },
    },
    defaultVariants: { size: "lg" },
  },
);

export type AddTileVariantProps = VariantProps<typeof addTileVariants>;
