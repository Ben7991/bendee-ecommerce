import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * One choice in an OptionPicker (Paper PDP → Variants). The selected one turns sage with an
 * evergreen edge (border + 1px ring, so it doesn't shift); unavailable ones are dashed and struck.
 */
export const optionVariants = cva(
  "relative flex border border-border bg-bg font-sans text-left text-text transition-colors outline-none hover:border-brand focus-visible:ring-2 focus-visible:ring-brand data-[state=checked]:border-primary data-[state=checked]:bg-sage-50 data-[state=checked]:ring-1 data-[state=checked]:ring-primary data-disabled:cursor-not-allowed data-disabled:border-dashed data-disabled:opacity-50 data-disabled:hover:border-border",
  {
    variants: {
      variant: {
        /** Flavours: a colour dot and a name. */
        swatch:
          "shrink-0 items-center gap-2 rounded-full py-2 pr-3.5 pl-2 text-sm leading-xs font-medium data-[state=checked]:font-semibold md:py-2.5 md:pr-4 md:pl-2.5",
        /** Sizes: a title and a detail line, side by side. */
        card: "min-w-0 flex-1 flex-col gap-0.5 rounded-md px-4 py-3",
      },
    },
    defaultVariants: { variant: "swatch" },
  },
);

export type OptionVariantProps = VariantProps<typeof optionVariants>;
