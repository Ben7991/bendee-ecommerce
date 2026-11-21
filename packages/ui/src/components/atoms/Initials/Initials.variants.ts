import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Initials disc sizes (Paper Account): md 48 (sidebar), lg 60 (mobile overview greeting),
 * staff 36 (admin). `tone` recolours the disc (admin customer list: each customer keeps a tint). */
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
        /** Admin customer list row: 42px on mobile, 38px from 768px. */
        row: "size-10.5 text-14 leading-4.5 md:size-9.5 md:text-sm md:leading-5",
        /** Admin customer profile header: 52px mobile, 56px tablet, 64px from 1440px. */
        profile: "size-13 text-lg leading-5.5 md:size-14 md:text-xl md:leading-6 xl:size-16 xl:text-22 xl:leading-7",
        /** Admin customer notes: 28px tablet, 30px from 1440px. */
        note: "size-7 text-10 leading-3 xl:size-7.5 xl:text-11 xl:leading-3.5",
      },
      tone: {
        sage: "bg-sage-100 text-brand dark:text-brand",
        lavender: "bg-tint-lavender text-lavender-text dark:text-lavender-text",
        amber: "bg-tint-amber text-warning-text dark:text-warning-text",
        info: "bg-tint-info text-info dark:text-info",
        citrus: "bg-tint-citrus text-error dark:text-error",
        neutral: "bg-surface text-text-secondary dark:text-text-secondary",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type InitialsVariantProps = VariantProps<typeof initialsVariants>;
