import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Small running text: form notes, legal lines, helper copy. Headings use Heading; body copy
 * inside organisms keeps its own classes.
 */
export const textVariants = cva("font-sans [&_strong]:font-semibold [&_strong]:text-text", {
  variants: {
    size: {
      /** 12/16: legal, footnotes. */
      xs: "text-xs leading-xs",
      /** 13/16: inline notes beside fields (timers). */
      sm: "text-sm leading-xs",
      /** 13/20: sentences with a link ("Already have an account?"). */
      body: "text-sm leading-sm",
      /** 22/30 → 26/36: the opening paragraph of a content page; the <em> word is serif. */
      lead: "text-22 leading-2xl tracking-compact md:text-2xl md:leading-9 [&_em]:font-serif [&_em]:text-brand",
    },
    tone: {
      muted: "text-text-muted",
      secondary: "text-text-secondary",
      default: "text-text",
    },
    align: {
      start: "",
      center: "text-center",
    },
  },
  defaultVariants: { size: "body", tone: "secondary", align: "start" },
});

export type TextVariantProps = VariantProps<typeof textVariants>;
