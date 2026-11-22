import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { textVariants, type TextVariantProps } from "./Text.variants";

/**
 * Text (atom): a small paragraph in Jofak's note styles. <strong> inside turns semibold and
 * full-contrast (e.g. a countdown or an email address).
 */
export interface TextProps extends ComponentProps<"p">, TextVariantProps {}

export function Text({ className, size, tone, align, ...props }: TextProps) {
  return <p data-slot="text" className={cn(textVariants({ size, tone, align }), className)} {...props} />;
}
