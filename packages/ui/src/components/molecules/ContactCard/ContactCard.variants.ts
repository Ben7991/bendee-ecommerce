import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * ContactCard tones (Paper Contact us → channel cards):
 *   default: outlined, sage icon disc
 *   feature: the evergreen WhatsApp card with a lime icon disc (one per page)
 */
export const contactCardVariants = cva("flex flex-col gap-3.5 rounded-xl p-6 font-sans", {
  variants: {
    tone: {
      default: "border border-border",
      feature: "bg-feature",
    },
  },
  defaultVariants: { tone: "default" },
});

export const contactCardIconVariants = cva("flex size-11 shrink-0 items-center justify-center rounded-full", {
  variants: {
    tone: {
      default: "bg-sage-100 text-primary dark:text-text",
      feature: "bg-accent text-on-accent",
    },
  },
  defaultVariants: { tone: "default" },
});

export const contactCardTitleVariants = cva("text-xl leading-lg font-semibold", {
  variants: {
    tone: {
      default: "text-text",
      feature: "text-text-inverse",
    },
  },
  defaultVariants: { tone: "default" },
});

export const contactCardDetailVariants = cva("text-base leading-sm", {
  variants: {
    tone: {
      default: "text-text-secondary",
      feature: "text-text-inverse-muted",
    },
  },
  defaultVariants: { tone: "default" },
});

export type ContactCardVariantProps = VariantProps<typeof contactCardVariants>;
