import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { statusChipVariants, type StatusChipVariantProps } from "./StatusChip.variants";

/**
 * StatusChip (atom): a small tinted pill for a state or a number in the admin ("Paid · MoMo",
 * "Cash on delivery", "+8.8%", "9"). The text says the state; colour only reinforces it.
 * For storefront product flags use Badge.
 */
export interface StatusChipProps extends ComponentProps<"span">, StatusChipVariantProps {}

export function StatusChip({ className, tone, size, ...props }: StatusChipProps) {
  return <span data-slot="status-chip" className={cn(statusChipVariants({ tone, size }), className)} {...props} />;
}
