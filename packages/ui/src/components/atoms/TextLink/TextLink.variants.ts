import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Inline text links. Size and line height come from the surrounding text.
 *   brand: semibold brand green, underlined ("Change", "Sign in", "Forgot password?")
 *   muted: inherits the text colour, underlined (legal: "Terms", "Privacy policy")
 *   subtle: semibold muted grey ("Remove")
 *   danger: semibold error orange ("Cancel subscription")
 *   inverse: semibold white, on evergreen ("Manage" on a feature card)
 */
export const textLinkVariants = cva(
  "underline decoration-1 underline-offset-auto transition-colors",
  {
    variants: {
      tone: {
        brand: "font-semibold text-brand hover:text-primary dark:hover:text-text",
        muted: "text-inherit hover:text-text",
        subtle: "font-semibold text-text-muted hover:text-text",
        danger: "font-semibold text-error hover:text-text",
        inverse: "font-semibold text-text-inverse hover:text-accent",
      },
    },
    defaultVariants: { tone: "brand" },
  },
);

export type TextLinkVariantProps = VariantProps<typeof textLinkVariants>;
