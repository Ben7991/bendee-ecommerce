import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Initials disc sizes (Paper Account): md 48 (sidebar), lg 60 (mobile overview greeting). */
export const initialsVariants = cva(
  "flex shrink-0 items-center justify-center rounded-full bg-sage-100 font-sans font-semibold text-primary dark:text-text",
  {
    variants: {
      size: {
        md: "size-12 text-lg leading-base",
        lg: "size-15 text-xl leading-lg",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type InitialsVariantProps = VariantProps<typeof initialsVariants>;
