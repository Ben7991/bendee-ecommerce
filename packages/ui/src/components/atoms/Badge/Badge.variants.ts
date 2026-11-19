import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Small pill labels: product flags, counts, benefit chips. */
export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-sans whitespace-nowrap",
  {
    variants: {
      variant: {
        /** "Bestseller", "−18%": evergreen with lime text. */
        solid: "bg-primary font-semibold text-accent",
        /** "Staff pick", "New": white with evergreen text. */
        light: "bg-bg font-semibold text-primary dark:text-brand",
        /** "6 products": white with body text. */
        neutral: "bg-bg font-semibold text-text",
        /** "Deeper sleep" on feature cards. */
        accent: "bg-accent font-semibold text-on-accent",
        /** "8 products" on feature cards. */
        glass: "bg-white/10 font-medium text-text-inverse",
        /** "Sold out": body-text pill with inverse text. */
        inverse: "bg-text font-semibold text-text-inverse dark:text-bg",
        /** "Only 3 left": amber text straight on the tile. */
        warning: "font-semibold text-warning-text",
        /** "Phone", "Google": sign-in methods on the account overview. */
        bordered: "border border-border bg-bg font-semibold text-text",
        /** "Less stress" on feature cards. */
        outline: "border border-white/25 font-medium text-text-inverse",
      },
      size: {
        sm: "px-2.25 py-1 text-10 leading-3",
        md: "px-3 py-1.5 text-xs leading-xs",
        lg: "px-3.5 py-2 text-sm leading-xs",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
