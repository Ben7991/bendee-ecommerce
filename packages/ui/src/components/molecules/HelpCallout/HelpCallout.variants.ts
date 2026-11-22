import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * HelpCallout tones (Paper Content pages):
 *   subtle:  "Still need help?" on surface-subtle, a primary button
 *   feature: "Not sure where to start?" on evergreen, a lime button
 * Stacked with a full-width action on mobile; one row from 768px.
 */
export const helpCalloutVariants = cva(
  "flex flex-col gap-4 rounded-xl font-sans md:flex-row md:items-center md:justify-between md:gap-6",
  {
    variants: {
      tone: {
        subtle: "bg-surface-subtle p-5 md:px-7 md:py-6",
        feature: "bg-feature p-5.5 md:p-7",
      },
    },
    defaultVariants: { tone: "subtle" },
  },
);

export const helpCalloutTitleVariants = cva("font-semibold", {
  variants: {
    tone: {
      subtle: "text-lg leading-lg text-text",
      feature: "text-xl leading-lg text-text-inverse",
    },
  },
  defaultVariants: { tone: "subtle" },
});

export const helpCalloutTextVariants = cva("text-base leading-sm", {
  variants: {
    tone: {
      subtle: "text-text-secondary",
      feature: "text-text-inverse-muted",
    },
  },
  defaultVariants: { tone: "subtle" },
});

export type HelpCalloutVariantProps = VariantProps<typeof helpCalloutVariants>;
