import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Applied-filter chips above the product grid ("Vegan ×"). */
export const filterChipVariants = cva(
  "inline-flex shrink-0 items-center rounded-full bg-surface font-sans font-medium whitespace-nowrap text-text transition-colors hover:bg-border-subtle",
  {
    variants: {
      size: {
        /** Mobile toolbar. */
        sm: "gap-1 px-2.5 py-1 text-xs leading-xs",
        /** Tablet and desktop toolbar. */
        md: "gap-1.5 py-1.5 pr-2 pl-3 text-sm leading-xs",
        /** sm on mobile, md from 768px. */
        responsive: "gap-1 px-2.5 py-1 text-xs leading-xs md:gap-1.5 md:py-1.5 md:pr-2 md:pl-3 md:text-sm",
      },
    },
    defaultVariants: { size: "responsive" },
  },
);

export const filterChipIconVariants = cva("shrink-0 text-text-muted", {
  variants: {
    size: {
      sm: "size-2.5",
      md: "size-3.5",
      responsive: "size-2.5 md:size-3.5",
    },
  },
  defaultVariants: { size: "responsive" },
});

export type FilterChipVariantProps = VariantProps<typeof filterChipVariants>;
