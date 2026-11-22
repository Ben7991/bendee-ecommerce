import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Admin filter pills (Paper Jofak - Admin → Orders filter bar): an outlined pill with a chevron
 * that opens a filter, or a filled pill with × for a filter that is applied.
 */
export const filterButtonVariants = cva(
  "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full font-sans text-sm leading-sm whitespace-nowrap text-text transition-colors",
  {
    variants: {
      variant: {
        default: "border border-border px-3.5 font-medium hover:bg-surface-subtle",
        applied: "bg-surface pr-3 pl-3.5 font-semibold hover:bg-sage-200",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type FilterButtonVariantProps = VariantProps<typeof filterButtonVariants>;
