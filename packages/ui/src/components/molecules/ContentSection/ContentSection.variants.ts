import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * ContentSection sizes (Paper Content pages):
 *   lg: "Delivery fees and times": 22px → 26px medium headings, 16px gaps
 *   md: "1. Who we are": numbered policy clauses, 18px → 20px semibold, 12px gaps
 */
export const contentSectionVariants = cva(
  "flex flex-col font-sans text-base leading-base text-text-secondary md:text-md md:leading-6.5 [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-2 dark:[&_a]:text-text",
  {
    variants: {
      size: {
        lg: "gap-4",
        md: "gap-3",
      },
    },
    defaultVariants: { size: "lg" },
  },
);

export const contentSectionTitleVariants = cva("font-sans text-text", {
  variants: {
    size: {
      lg: "text-22 leading-lg font-medium tracking-snug md:text-2xl md:leading-2xl",
      md: "text-lg leading-base font-semibold tracking-compact md:text-xl md:leading-lg",
    },
  },
  defaultVariants: { size: "lg" },
});

export type ContentSectionVariantProps = VariantProps<typeof contentSectionVariants>;
