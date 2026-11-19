import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../Icon";
import { statusBadgeDotVariants, statusBadgeVariants, type StatusBadgeVariantProps } from "./StatusBadge.variants";

/**
 * StatusBadge (atom): a soft pill with a dot (or a check) saying where something stands:
 * an order ("Packing", "Delivered"), a subscription ("Paused"), a contact ("Verified").
 * For caps maintenance labels use StatusPill.
 */
export interface StatusBadgeProps extends Omit<ComponentProps<"span">, "children">, StatusBadgeVariantProps {
  label: string;
  /** dot (default), check ("Verified") or none ("Not verified"). */
  marker?: "dot" | "check" | "none";
}

export function StatusBadge({ label, tone, size, marker = "dot", className, ...props }: StatusBadgeProps) {
  return (
    <span data-slot="status-badge" className={cn(statusBadgeVariants({ tone, size }), marker === "check" && "gap-1 pr-2.5 pl-2", className)} {...props}>
      {marker === "dot" && <span aria-hidden className={statusBadgeDotVariants({ tone, size })} />}
      {marker === "check" && <Icon name="check" size={11} strokeWidth={3.2} />}
      {label}
    </span>
  );
}
