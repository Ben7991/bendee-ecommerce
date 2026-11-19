import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Display headings. Wrap the one accent word per view in <em>: it renders in
 * Instrument Serif italic, brand green (or lime on feature surfaces).
 * Sizes step across mobile 390 → tablet 768 → desktop 1440 as in Paper.
 */
export const headingVariants = cva(
  "font-sans font-medium [&_em]:font-serif [&_em]:font-regular [&_em]:italic [&_em]:tracking-subtle",
  {
    variants: {
      size: {
        /** Hero: 44/46 → 64/64 → 80/80. */
        hero: "text-4xl leading-4xl tracking-display md:text-64 md:leading-16 xl:text-6xl xl:leading-6xl [&_em]:tracking-compact",
        /** Section titles: 32/34 → 44/46 → 52/56. */
        section: "text-3xl leading-3xl tracking-tight md:text-4xl md:leading-4xl xl:text-5xl xl:leading-5xl",
        /** Feature banners (quiz, newsletter): 32/34 → 44/46 → 56/58. */
        feature: "text-3xl leading-3xl tracking-tight md:text-4xl md:leading-4xl xl:text-56 xl:leading-14.5",
        /** Auth page titles: 36/40 → 44/46. The accent word keeps the title's tracking. */
        auth: "text-36 leading-10 tracking-tight md:text-4xl md:leading-4xl [&_em]:tracking-tight",
        /** Account page titles ("Your orders"): 40/44 → 52/56. */
        account: "text-40 leading-11 tracking-tight md:text-5xl md:leading-5xl",
        /** Account detail titles ("Order JFK-250184"): 32/34 → 44/46. */
        detail: "text-3xl leading-3xl tracking-tight md:text-4xl md:leading-4xl",
        /** Dialog and sheet titles: 32/34 at every breakpoint. */
        dialog: "text-3xl leading-3xl tracking-snug [&_em]:tracking-snug",
      },
      tone: {
        default: "text-text [&_em]:text-brand",
        inverse: "text-text-inverse [&_em]:text-accent",
      },
    },
    defaultVariants: { size: "section", tone: "default" },
  },
);

export type HeadingVariantProps = VariantProps<typeof headingVariants>;
