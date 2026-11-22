import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { REPORT_FILL, type ReportTone } from "../ReportBars";

export interface StackedSegment {
  label: ReactNode;
  /** Count or amount on the right ("955", "GHS 9,320"). */
  value: ReactNode;
  /** Share of the bar, 0–100 (also shown when `showShare`). */
  share: number;
  tone: ReportTone | "warningSoft" | "track";
  valueTone?: "warning" | "error";
}

const FILL: Record<StackedSegment["tone"], string> = { ...REPORT_FILL, warningSoft: "bg-warning/60", track: "bg-sage-200" };

/**
 * ReportStackedBar (molecule): one bar split into parts with a legend underneath (Paper Jofak -
 * Admin → Reports: Where carts are left, Pay on delivery, New vs returning). Each legend row has
 * a swatch, label, value and, with `showShare`, its percentage.
 */
export interface ReportStackedBarProps extends Omit<ComponentProps<"div">, "children"> {
  segments: StackedSegment[];
  showShare?: boolean;
  /** Bar height: 12px (default) or 8px (`thin`). */
  size?: "default" | "thin";
  /** Hide the legend (a bar inside a sentence). */
  legend?: boolean;
}

export function ReportStackedBar({ segments, showShare = false, size = "default", legend = true, className, ...props }: ReportStackedBarProps) {
  return (
    <div data-slot="report-stacked-bar" className={cn("flex flex-col gap-3", className)} {...props}>
      <span aria-hidden className={cn("flex gap-0.5 overflow-hidden rounded-full", size === "thin" ? "h-2" : "h-3")}>
        {segments.map((segment, index) => (
          <span key={index} className={cn("h-full", FILL[segment.tone])} style={{ width: `${segment.share}%` }} />
        ))}
      </span>
      {legend && (
        <ul className="flex flex-col">
          {segments.map((segment, index) => (
            <li key={index} className={cn("flex items-center gap-2.5 text-sm leading-4.5", showShare ? "border-t border-border-subtle py-2.5 first:border-t-0 md:text-14 md:leading-5" : "py-1")}>
              <span aria-hidden className={cn("size-2.5 shrink-0 rounded-3", FILL[segment.tone])} />
              <span className="min-w-0 flex-1 text-text">{segment.label}</span>
              <span className={cn("shrink-0 font-semibold", segment.valueTone === "warning" ? "text-warning-text" : segment.valueTone === "error" ? "text-error" : "text-text")}>
                {segment.value}
              </span>
              {showShare && <span className="w-12 shrink-0 text-right text-xs leading-xs text-text-muted">{segment.share.toFixed(1)}%</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
