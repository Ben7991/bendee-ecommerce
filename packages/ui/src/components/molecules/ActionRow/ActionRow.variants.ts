import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Quiet text actions with an icon under the order detail's side cards (Paper Jofak - Admin →
 * Order detail): `danger` for "Cancel order", `muted` for a locked action ("Edit order · locked").
 */
export const actionRowVariants = cva(
  "flex w-full items-center gap-2.5 py-2 text-left font-sans text-14 leading-4.5 font-semibold transition-colors disabled:cursor-not-allowed",
  {
    variants: {
      tone: {
        default: "text-text hover:text-brand",
        danger: "text-error hover:underline",
        muted: "text-text-muted",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export type ActionRowVariantProps = VariantProps<typeof actionRowVariants>;
