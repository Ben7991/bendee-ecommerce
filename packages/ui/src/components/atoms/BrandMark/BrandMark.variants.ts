import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Brand logo tiles (Paper Jofak - Admin → Brands). Without an uploaded logo a brand shows a
 * monogram or icon on a tint; `empty` is the dashed "no logo yet" tile.
 */
export const brandMarkVariants = cva("relative flex shrink-0 items-center justify-center overflow-hidden", {
  variants: {
    tone: {
      amber: "bg-tint-amber text-skin-700 dark:text-text",
      info: "bg-tint-info text-info",
      lavender: "bg-tint-lavender text-lavender-text",
      citrus: "bg-tint-citrus text-error",
      sun: "bg-tint-sun text-warning",
      primary: "bg-primary text-accent",
      empty: "border border-dashed border-border bg-surface-subtle text-evergreen-300",
      plain: "bg-bg",
    },
    size: {
      sm: "size-10 rounded-10",
      lg: "size-21 rounded-18",
    },
    round: { true: "rounded-full", false: "" },
  },
  defaultVariants: { tone: "amber", size: "sm", round: false },
});

export type BrandMarkVariantProps = VariantProps<typeof brandMarkVariants>;
