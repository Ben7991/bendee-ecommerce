import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** StatCard tints (Paper About Jofak → Stats): sage, amber and lavender, side by side from 768px. */
export const statCardVariants = cva("flex flex-col gap-1.5 rounded-lg px-4.5 py-4 font-sans md:p-5", {
  variants: {
    tone: {
      sage: "bg-sage-100",
      amber: "bg-tint-amber",
      lavender: "bg-tint-lavender",
    },
  },
  defaultVariants: { tone: "sage" },
});

export type StatCardVariantProps = VariantProps<typeof statCardVariants>;
