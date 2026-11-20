import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Sparkline, StatusChip, type SparklineProps, type StatusChipProps } from "../../atoms";
import { kpiTileMutedVariants, kpiTileVariants, type KpiTileVariantProps } from "./KpiTile.variants";

export interface KpiDelta {
  /** "+12.4%", "−0.4 pts". */
  label: string;
  tone: "up" | "down";
}

/**
 * KpiTile (molecule): one headline number on the admin dashboard ("Orders · 37 · +8.8% · 34 last
 * Sunday") with an optional currency, change chip and sparkline. On mobile it drops the
 * comparison line and sparkline. Put tiles in KpiGroup; use `tone="feature"` for one tile only.
 */
export interface KpiTileProps extends Omit<ComponentProps<"div">, "children">, KpiTileVariantProps {
  label: ReactNode;
  value: ReactNode;
  /** Small prefix before the value ("GHS"). */
  currency?: string;
  delta?: KpiDelta;
  /** What the delta compares with ("vs last Sunday"); from 768px. */
  comparison?: ReactNode;
  /** Sparkline values, oldest first; from 768px. */
  trend?: number[];
}

export function KpiTile({ label, value, currency, delta, comparison, trend, tone, className, ...props }: KpiTileProps) {
  const feature = tone === "feature";
  const deltaTone: StatusChipProps["tone"] = delta?.tone === "down" ? "error" : feature ? "accent" : "success";
  const sparkTone: SparklineProps["tone"] = delta?.tone === "down" ? "error" : feature ? "accent" : "brand";
  const muted = kpiTileMutedVariants({ tone });

  return (
    <div data-slot="kpi-tile" className={cn(kpiTileVariants({ tone }), className)} {...props}>
      <p className={cn("text-sm leading-sm font-medium", muted)}>{label}</p>
      <p className="flex items-baseline gap-1.5">
        {currency && <span className={cn("text-base leading-4.5 font-semibold", muted)}>{currency}</span>}
        <span
          className={cn(
            "text-2xl leading-8 font-semibold tracking-tight md:text-34 md:leading-10",
            feature ? "text-text-inverse" : "text-text",
          )}
        >
          {value}
        </span>
      </p>
      {(delta || comparison || trend) && (
        <div className="flex items-center justify-between">
          <p className="flex min-w-0 items-center gap-2">
            {delta && (
              <StatusChip tone={deltaTone} size="count" className="font-bold">
                {delta.label}
              </StatusChip>
            )}
            {comparison && <span className={cn("hidden truncate text-xs leading-xs md:inline", muted)}>{comparison}</span>}
          </p>
          {trend && <Sparkline values={trend} tone={sparkTone} className="hidden md:inline-block" />}
        </div>
      )}
    </div>
  );
}
