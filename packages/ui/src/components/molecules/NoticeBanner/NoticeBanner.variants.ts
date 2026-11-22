import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** NoticeBanner tones (Paper Collection → Ended): sun for "this sale ended". */
export const noticeBannerVariants = cva("flex flex-col gap-3 rounded-lg p-4 font-sans md:flex-row md:items-center md:gap-4 md:rounded-xl md:px-6 md:py-4.5", {
  variants: {
    tone: {
      sun: "bg-tint-sun [&_[data-slot=notice-banner-icon]]:text-warning-text",
    },
  },
  defaultVariants: { tone: "sun" },
});

export type NoticeBannerVariantProps = VariantProps<typeof noticeBannerVariants>;
