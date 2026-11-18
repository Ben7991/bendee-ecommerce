import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Round icon buttons. Header sizes step 42 → 44 → 46px across mobile/tablet/desktop. */
export const iconButtonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-muted",
  {
    variants: {
      variant: {
        outline: "border border-border bg-bg text-text hover:bg-surface-subtle",
        solid: "bg-primary text-on-primary hover:bg-primary-hover",
        plain: "bg-bg text-text hover:bg-surface-subtle",
      },
      size: {
        xs: "size-8",
        sm: "size-8.5",
        md: "size-9",
        lg: "size-12",
        header: "size-10.5 md:size-11 xl:size-11.5",
      },
    },
    defaultVariants: { variant: "outline", size: "header" },
  },
);

export type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;
