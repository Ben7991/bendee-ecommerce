import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { badgeVariants, type BadgeVariantProps } from "./Badge.variants";

/** Badge (atom): a small pill label. Not interactive — use Button for actions. */
export interface BadgeProps extends ComponentProps<"span">, BadgeVariantProps {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
