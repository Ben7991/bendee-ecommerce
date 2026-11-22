import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/** Customer avatars. Placeholder tones stand in until a photo is supplied as the child. */
export const avatarVariants = cva("relative inline-flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    tone: {
      light: "bg-gradient-skin-light",
      deep: "bg-gradient-skin-deep",
      pale: "bg-skin-100",
      medium: "bg-skin-300",
      dark: "bg-skin-700",
    },
    size: {
      sm: "size-6.5 border-2 border-bg",
      md: "size-11",
    },
  },
  defaultVariants: { tone: "light", size: "md" },
});

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;
