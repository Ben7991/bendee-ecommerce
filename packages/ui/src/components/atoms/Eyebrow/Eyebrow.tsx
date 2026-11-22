import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { eyebrowVariants, type EyebrowVariantProps } from "./Eyebrow.variants";

/** Eyebrow (atom): the brand-coloured caps label that introduces a section. */
export interface EyebrowProps extends ComponentProps<"p">, EyebrowVariantProps {}

export function Eyebrow({ className, tone, size, ...props }: EyebrowProps) {
  return <p data-slot="eyebrow" className={cn(eyebrowVariants({ tone, size }), className)} {...props} />;
}
