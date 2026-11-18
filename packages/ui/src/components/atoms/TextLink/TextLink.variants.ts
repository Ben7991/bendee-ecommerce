import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Inline text links. Size and line height come from the surrounding text.
 *   brand: semibold brand green, underlined ("Change", "Sign in", "Forgot password?")
 *   muted: inherits the text colour, underlined (legal: "Terms", "Privacy policy")
 */
export const textLinkVariants = cva(
  "underline decoration-1 underline-offset-auto transition-colors",
  {
    variants: {
      tone: {
        brand: "font-semibold text-brand hover:text-primary dark:hover:text-text",
        muted: "text-inherit hover:text-text",
      },
    },
    defaultVariants: { tone: "brand" },
  },
);

export type TextLinkVariantProps = VariantProps<typeof textLinkVariants>;
