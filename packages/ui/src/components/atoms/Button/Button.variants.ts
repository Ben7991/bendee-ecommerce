import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Pill buttons from Paper. With `arrow`, the label sits next to a round arrow badge
 * (hero CTAs, "View all products", quiz CTA) and the right padding tightens around it.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-sans whitespace-nowrap select-none transition-colors disabled:pointer-events-none disabled:opacity-muted",
  {
    variants: {
      variant: {
        primary: "bg-primary text-text-inverse font-medium hover:bg-primary-hover",
        secondary: "border border-border bg-bg text-text font-medium hover:bg-surface-subtle",
        accent: "bg-accent text-on-accent font-semibold hover:bg-sage-200 dark:hover:bg-accent/85",
        outline: "border border-border text-text font-medium hover:bg-surface",
      },
      size: {
        xs: "gap-2 px-4 py-2.5 text-sm leading-xs font-semibold",
        sm: "gap-2 px-4.5 py-3 text-14 leading-4.5 font-semibold",
        md: "gap-2 px-5.5 py-3.5 text-base leading-4.5 font-semibold",
        lg: "gap-3.5 px-6.5 py-3 text-md leading-sm",
      },
      arrow: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { arrow: true, size: "sm", class: "gap-2.5 py-1.5 pr-1.5 pl-4.5 font-medium" },
      { arrow: true, size: "md", class: "gap-3 py-2 pr-2 pl-5.5 font-medium" },
      { arrow: true, size: "lg", class: "gap-3.5 py-2 pr-2 pl-6.5" },
    ],
    defaultVariants: { variant: "primary", size: "lg", arrow: false },
  },
);

/** The round arrow badge inside an arrow button. */
export const buttonArrowVariants = cva("flex shrink-0 items-center justify-center rounded-full", {
  variants: {
    variant: {
      primary: "bg-accent text-on-accent",
      secondary: "bg-surface text-text",
      accent: "bg-primary text-accent",
      outline: "bg-surface text-text",
    },
    size: {
      xs: "size-7",
      sm: "size-8",
      md: "size-8.5",
      lg: "size-10",
    },
  },
  defaultVariants: { variant: "primary", size: "lg" },
});

export const BUTTON_ARROW_ICON_SIZE = { xs: 12, sm: 13, md: 14, lg: 16 } as const;

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
