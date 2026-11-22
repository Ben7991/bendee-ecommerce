import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Theme switch from the Paper footers: icon-only options, the selected one also shows its label.
 * `default` sits on page backgrounds (mobile footer), `feature` on the evergreen footer.
 */
export const themeSwitchGroupVariants = cva("flex gap-0.5 rounded-full p-0.75", {
  variants: {
    tone: {
      default: "bg-surface",
      feature: "border border-white/14 bg-white/8 dark:border-white/12 dark:bg-white/5",
      /** Settings field: full width, equal labelled segments (My profile → Appearance). */
      field: "w-full bg-surface-subtle",
    },
  },
  defaultVariants: { tone: "default" },
});

export const themeSwitchItemVariants = cva(
  "flex shrink-0 items-center justify-center gap-1.5 rounded-full font-sans transition-colors",
  {
    variants: {
      tone: {
        default:
          "h-8 w-10 text-text-muted hover:text-text data-[state=on]:w-auto data-[state=on]:bg-bg data-[state=on]:px-3 data-[state=on]:text-sm data-[state=on]:leading-xs data-[state=on]:font-semibold data-[state=on]:text-text data-[state=on]:shadow-xs",
        field:
          "h-8.5 flex-1 text-sm leading-4.5 font-medium text-text-secondary hover:text-text data-[state=on]:bg-bg data-[state=on]:font-semibold data-[state=on]:text-text data-[state=on]:shadow-xs dark:data-[state=on]:bg-surface",
        feature:
          "h-6.5 w-7.5 text-text-inverse-muted hover:text-text-inverse data-[state=on]:w-auto data-[state=on]:bg-white/16 data-[state=on]:px-2.5 data-[state=on]:text-xs data-[state=on]:leading-xs data-[state=on]:font-medium data-[state=on]:text-text-inverse dark:data-[state=on]:bg-white/12",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export const themeSwitchLabelVariants = cva("font-sans", {
  variants: {
    tone: {
      default: "text-sm leading-sm text-text-muted",
      feature: "text-xs leading-xs text-text-inverse-muted dark:text-on-feature-muted",
      field: "text-sm leading-4.5 font-semibold text-text-secondary",
    },
  },
  defaultVariants: { tone: "default" },
});

export type ThemeSwitchVariantProps = VariantProps<typeof themeSwitchGroupVariants>;
