import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Round icon badges above page titles (auth: key, lock, mail). */
export const iconBadgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full",
  {
    variants: {
      size: {
        md: "size-16",
        /** 72px (Track an order). */
        lg: "size-18",
      },
      tone: {
        sage: "bg-sage-100 text-primary dark:text-brand",
        /** Lime disc with an evergreen icon (Track an order). */
        accent: "bg-accent text-on-accent",
      },
    },
    defaultVariants: { size: "md", tone: "sage" },
  },
);

export type IconBadgeVariantProps = VariantProps<typeof iconBadgeVariants>;
