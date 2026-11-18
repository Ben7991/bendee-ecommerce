import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Pill-shaped native selects from the PLP toolbar. */
export const pillSelectVariants = cva(
  "relative inline-flex items-center rounded-full border border-border bg-bg font-sans text-text transition-colors hover:bg-surface-subtle has-[select:focus-visible]:outline-2 has-[select:focus-visible]:outline-offset-2 has-[select:focus-visible]:outline-brand",
  {
    variants: {
      variant: {
        /** "Sort: Featured ⌄" (tablet and desktop toolbar). */
        inline: "gap-2 px-4 py-2.5 text-sm leading-xs",
        /** "24 ⌄" per-page picker. */
        compact: "gap-1.5 px-3 py-2 text-sm leading-xs",
        /** "Featured ⇅" full-width on mobile. */
        block: "w-full justify-center gap-2 p-3 text-base leading-4.5",
      },
    },
    defaultVariants: { variant: "inline" },
  },
);

export type PillSelectVariantProps = VariantProps<typeof pillSelectVariants>;
