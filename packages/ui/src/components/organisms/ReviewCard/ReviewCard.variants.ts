import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Testimonial cards: surface (sage-grey) or accent (lime). */
export const reviewCardVariants = cva("flex flex-col justify-between gap-10 rounded-xl p-8", {
  variants: {
    tone: {
      surface: "bg-surface",
      accent: "bg-accent",
    },
  },
  defaultVariants: { tone: "surface" },
});

export type ReviewCardVariantProps = VariantProps<typeof reviewCardVariants>;
