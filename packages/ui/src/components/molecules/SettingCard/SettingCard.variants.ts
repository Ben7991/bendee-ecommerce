import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * SettingCard tones (Paper Account → Privacy & data):
 *   default: outlined, sage icon tile
 *   danger:  a faint error wash and edge ("Delete my account")
 */
export const settingCardVariants = cva("flex flex-col gap-4 rounded-lg p-4.5 font-sans md:p-6", {
  variants: {
    tone: {
      default: "border border-border-subtle",
      danger: "border border-error/30 bg-error/4",
    },
  },
  defaultVariants: { tone: "default" },
});

export const settingCardIconVariants = cva("flex size-11 shrink-0 items-center justify-center rounded-sm", {
  variants: {
    tone: {
      default: "bg-sage-50 text-brand",
      danger: "bg-error/10 text-error",
    },
  },
  defaultVariants: { tone: "default" },
});

export type SettingCardVariantProps = VariantProps<typeof settingCardVariants>;
