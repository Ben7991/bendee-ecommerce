import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** The pill that holds the email field and submit button. */
export const newsletterFieldVariants = cva(
  "flex items-center justify-between gap-3 rounded-full focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand",
  {
    variants: {
      tone: {
        /** On page backgrounds (mobile footer). */
        default: "border border-border py-1.5 pr-1.5 pl-5",
        /** On the evergreen footer. */
        feature: "border border-white/16 bg-white/8 py-2 pr-2 pl-6",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export type NewsletterFormVariantProps = VariantProps<typeof newsletterFieldVariants>;
