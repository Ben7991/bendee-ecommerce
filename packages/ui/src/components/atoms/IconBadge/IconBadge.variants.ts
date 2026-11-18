import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Round icon badges above page titles (auth: key, lock, mail). */
export const iconBadgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full bg-sage-100 text-primary dark:text-brand",
  {
    variants: {
      size: {
        md: "size-16",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type IconBadgeVariantProps = VariantProps<typeof iconBadgeVariants>;
