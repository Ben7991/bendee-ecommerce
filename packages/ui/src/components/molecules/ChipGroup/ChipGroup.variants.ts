import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * One chip in a ChipGroup (Paper PLP filters: Dietary, price presets, "Sort by").
 * Unselected chips are outlined; selected ones fill with lime (`accent`) or evergreen (`primary`).
 * Selected chips keep a same-colour border so the size doesn't jump.
 */
export const chipVariants = cva(
  "inline-flex shrink-0 items-center rounded-full border border-border font-sans text-sm leading-xs text-text transition-colors hover:bg-surface-subtle data-[state=on]:font-semibold",
  {
    variants: {
      variant: {
        /** Multi-select facets ("Vegan"). */
        accent: "data-[state=on]:border-accent data-[state=on]:bg-accent data-[state=on]:text-on-accent",
        /** Single choices ("Featured"). */
        primary: "data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-text-inverse",
      },
      size: {
        /** Price presets ("Under 200"). */
        sm: "px-3 py-1.5",
        md: "px-3.5 py-2",
      },
    },
    defaultVariants: { variant: "accent", size: "md" },
  },
);

export type ChipVariantProps = VariantProps<typeof chipVariants>;
