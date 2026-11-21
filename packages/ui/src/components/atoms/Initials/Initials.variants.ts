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
        /** Admin customer avatar (order detail): lavender, 40px on mobile, 44px from 768px. */
        customer: "size-10 bg-tint-lavender text-14 leading-4.5 font-bold text-lavender-text md:size-11 md:text-base dark:text-lavender-text",
        /** Admin activity timeline: 28px. */
        activity: "size-7 bg-sage-200 text-11 leading-3.5 font-bold",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type InitialsVariantProps = VariantProps<typeof initialsVariants>;
