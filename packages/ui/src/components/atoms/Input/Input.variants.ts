import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Bare text input. The pill container and focus ring belong to the molecule around it
 * (e.g. NewsletterForm), so the field itself has no border.
 */
export const inputVariants = cva(
  "w-full min-w-0 bg-transparent font-sans outline-none disabled:cursor-not-allowed disabled:opacity-muted",
  {
    variants: {
      tone: {
        default: "text-text placeholder:text-text-muted",
        inverse: "text-text-inverse placeholder:text-on-feature-muted",
      },
      size: {
        sm: "text-14 leading-4.5",
        md: "text-base leading-4.5",
      },
    },
    defaultVariants: { tone: "default", size: "md" },
  },
);

export type InputVariantProps = VariantProps<typeof inputVariants>;
