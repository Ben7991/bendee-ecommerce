import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Logo lockups from Paper: header (26 → 28 → 34px mark), footer (30px), compact (22px). */
export const logoVariants = cva("inline-flex items-center font-sans font-bold tracking-snug", {
  variants: {
    tone: {
      default: "text-primary dark:text-text",
      inverse: "text-text-inverse",
    },
    size: {
      header: "gap-2 text-22 leading-lg md:text-xl md:leading-base xl:gap-2.5 xl:text-22 xl:leading-lg",
      footer: "gap-2.5 text-22 leading-lg",
      compact: "gap-2 text-17 leading-5.5",
      /** Menu drawer top bar: 26px mark at every breakpoint. */
      menu: "gap-2 text-22 leading-lg",
      /** Auth pages: 22px mark on the mobile bar, 26px on the tablet banner, 28px on the desktop panel. */
      auth: "gap-2 text-19 leading-base md:text-22 md:leading-lg",
      /** Minimal header (error pages): 24px mark / 20px type on mobile, 28 / 24 from 768px. */
      minimal: "gap-2 text-xl leading-base md:text-24 md:leading-lg",
    },
  },
  defaultVariants: { tone: "default", size: "header" },
});

export const logoMarkVariants = cva("shrink-0", {
  variants: {
    size: {
      header: "size-6.5 md:size-7 xl:size-8.5",
      footer: "size-7.5",
      compact: "size-5.5",
      menu: "size-6.5",
      auth: "size-5.5 md:size-6.5 xl:size-7",
      minimal: "size-6 md:size-7",
    },
  },
  defaultVariants: { size: "header" },
});

export type LogoVariantProps = VariantProps<typeof logoVariants>;
