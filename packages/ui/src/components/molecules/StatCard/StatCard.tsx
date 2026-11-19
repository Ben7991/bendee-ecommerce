import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { statCardVariants, type StatCardVariantProps } from "./StatCard.variants";

/**
 * StatCard (molecule): one big figure with a short line under it ("18,000+ orders delivered
 * across all 16 regions") on a soft tint. Use two or three in a row; not for live metrics.
 */
export interface StatCardProps extends Omit<ComponentProps<"div">, "children">, StatCardVariantProps {
  value: ReactNode;
  label: ReactNode;
}

export function StatCard({ value, label, tone, className, ...props }: StatCardProps) {
  return (
    <div data-slot="stat-card" className={cn(statCardVariants({ tone }), className)} {...props}>
      <p className="text-3xl leading-3xl font-medium tracking-snug text-primary dark:text-text">{value}</p>
      <p className="text-sm leading-sm text-text-secondary">{label}</p>
    </div>
  );
}
