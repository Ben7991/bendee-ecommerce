import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * SummaryCard tones (Paper Account → Overview side cards):
 *   default: outlined ("Default address")
 *   feature: evergreen with a lime eyebrow ("Subscription")
 */
export const summaryCardVariants = cva("flex flex-col gap-2.5 rounded-lg p-5 font-sans", {
  variants: {
    tone: {
      default: "border border-border-subtle text-text [&_[data-slot=summary-card-eyebrow]]:text-text-muted",
      feature: "bg-feature text-text-inverse [&_[data-slot=summary-card-eyebrow]]:text-accent",
    },
  },
  defaultVariants: { tone: "default" },
});

export type SummaryCardVariantProps = VariantProps<typeof summaryCardVariants>;
