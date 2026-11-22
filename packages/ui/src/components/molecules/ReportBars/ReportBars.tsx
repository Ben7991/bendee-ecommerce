import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

export type ReportTone = "primary" | "brand" | "strong" | "soft" | "accent" | "warning" | "error";

export const REPORT_FILL: Record<ReportTone, string> = {
  primary: "bg-primary",
  brand: "bg-brand",
  strong: "bg-evergreen-500",
  soft: "bg-evergreen-300",
  accent: "bg-accent",
  warning: "bg-warning",
  error: "bg-error",
};

export interface ReportBar {
  label: ReactNode;
  /** Right of the label: "GHS 31,814 · 33%". */
  value: ReactNode;
  /** Bar length, 0–100. */
  share: number;
  tone?: ReportTone;
  /** Error or warning colour for the value. */
  valueTone?: "error" | "warning";
  /** Mobile shows a shorter value ("GHS 31,814"). */
  compactValue?: ReactNode;
}

/**
 * ReportBars (molecule): labelled horizontal bars (Paper Jofak - Admin → Reports: Sales by,
 * Conversion by device, Abandonment by zone, Lifetime value by channel). `mobileLimit` keeps the
 * first few on mobile with `more` (e.g. "Show all 6") under them.
 */
export interface ReportBarsProps extends Omit<ComponentProps<"ul">, "children"> {
  bars: ReportBar[];
  mobileLimit?: number;
  more?: ReactNode;
  /** `thin` bars are 6px (customers' lifetime value); default 8px. */
  size?: "default" | "thin";
}

export function ReportBars({ bars, mobileLimit, more, size = "default", className, ...props }: ReportBarsProps) {
  return (
    <div className="flex flex-col gap-3.5">
      <ul data-slot="report-bars" className={cn("flex flex-col gap-3 md:gap-3.5", className)} {...props}>
        {bars.map((bar, index) => (
          <li key={index} className={cn("flex flex-col gap-1.5", mobileLimit !== undefined && index >= mobileLimit && "hidden md:flex")}>
            <span className="flex justify-between gap-3 text-sm leading-4.5 text-text">
              <span className="min-w-0">{bar.label}</span>
              <span className={cn("shrink-0 font-semibold", bar.valueTone === "error" ? "text-error" : bar.valueTone === "warning" ? "text-warning-text" : "text-text")}>
                {bar.compactValue ? (
                  <>
                    <span className="md:hidden">{bar.compactValue}</span>
                    <span className="hidden md:inline">{bar.value}</span>
                  </>
                ) : (
                  bar.value
                )}
              </span>
            </span>
            <span aria-hidden className={cn("flex rounded-full bg-surface-subtle", size === "thin" ? "h-1.5" : "h-2")}>
              <span className={cn("rounded-full", REPORT_FILL[bar.tone ?? "brand"])} style={{ width: `${Math.max(0, Math.min(100, bar.share))}%` }} />
            </span>
          </li>
        ))}
      </ul>
      {more && <div className="md:hidden">{more}</div>}
    </div>
  );
}
