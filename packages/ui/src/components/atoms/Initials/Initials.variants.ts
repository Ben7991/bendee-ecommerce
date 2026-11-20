import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Initials disc sizes (Paper Account): md 48 (sidebar), lg 60 (mobile overview greeting),
 * staff 36 (admin). */
export const initialsVariants = cva(
  "flex shrink-0 items-center justify-center rounded-full bg-sage-100 font-sans font-semibold text-primary dark:text-text",
  {
    variants: {
      size: {
        md: "size-12 text-lg leading-base",
        lg: "size-15 text-xl leading-lg",
        /** Admin staff avatar (sidebar card, rail, top bar): 36px on sage-200. */
        staff: "size-9 bg-sage-200 text-sm leading-xs font-bold",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type InitialsVariantProps = VariantProps<typeof initialsVariants>;
