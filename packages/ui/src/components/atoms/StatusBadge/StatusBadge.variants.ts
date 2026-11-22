import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * StatusBadge tones (Paper Account): info "Packing" / "Pickup scheduled", success "Delivered" /
 * "Verified", neutral "Refunded", warning "Paused" / "Not verified", accent "Out for delivery".
 */
export const statusBadgeVariants = cva("inline-flex w-fit shrink-0 items-center rounded-full font-sans font-semibold whitespace-nowrap", {
  variants: {
    tone: {
      info: "bg-info/12 text-info",
      success: "bg-sage-100 text-brand",
      neutral: "bg-surface text-text-muted",
      warning: "bg-tint-sun text-warning-text",
      accent: "bg-accent text-on-accent",
    },
    size: {
      sm: "gap-1.5 px-2.5 py-1 text-xs leading-xs",
      md: "gap-1.5 px-3 py-1.25 text-sm leading-xs",
    },
  },
  defaultVariants: { tone: "info", size: "md" },
});

export const statusBadgeDotVariants = cva("shrink-0 rounded-full", {
  variants: {
    tone: {
      info: "bg-info",
      success: "bg-brand",
      neutral: "bg-text-muted",
      warning: "bg-warning",
      accent: "bg-primary dark:bg-on-accent",
    },
    size: { sm: "size-1.5", md: "size-1.75" },
  },
  defaultVariants: { tone: "info", size: "md" },
});

export type StatusBadgeVariantProps = VariantProps<typeof statusBadgeVariants>;
