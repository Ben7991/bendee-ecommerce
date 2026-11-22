import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { metricTileValueVariants, type MetricTileVariantProps } from "./MetricTile.variants";

/**
 * MetricTile (molecule): a number and what it counts on a quiet surface ("4 · Orders placed")
 * for the account overview. Compact on mobile (three across), larger from 768px.
 */
export interface MetricTileProps extends Omit<ComponentProps<"div">, "children">, MetricTileVariantProps {
  value: ReactNode;
  label: ReactNode;
  /** Shorter label for mobile ("Orders"). */
  compactLabel?: ReactNode;
}

export function MetricTile({ value, label, compactLabel, tone, className, ...props }: MetricTileProps) {
  return (
    <div data-slot="metric-tile" className={cn("flex min-w-0 flex-col gap-0.5 rounded-lg bg-surface-subtle px-3.5 py-3 font-sans md:gap-1 md:p-5", className)} {...props}>
      <p className={metricTileValueVariants({ tone })}>{value}</p>
      <p className="text-xs leading-xs text-text-muted md:text-sm">
        {compactLabel ? (
          <>
            <span className="md:hidden">{compactLabel}</span>
            <span className="hidden md:inline">{label}</span>
          </>
        ) : (
          label
        )}
      </p>
    </div>
  );
}
