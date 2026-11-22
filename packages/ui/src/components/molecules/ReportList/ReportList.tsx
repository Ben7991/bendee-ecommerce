import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { REPORT_FILL, type ReportTone } from "../ReportBars";

export interface ReportListRow {
  id: string;
  /** "1"…"5" for a ranking. */
  rank?: string;
  /** A coloured dot before the title (customer groups). */
  dot?: ReportTone;
  title: ReactNode;
  sub?: ReactNode;
  value?: ReactNode;
  valueTone?: "error" | "warning" | "brand" | "muted";
  /** After the value: a button or link. */
  aside?: ReactNode;
  /** Amber background (needs attention). */
  highlight?: boolean;
  /** Monospace value (amounts on a receipt-like list). */
  mono?: boolean;
  /** A bold total row above a rule (compact lists). */
  total?: boolean;
}

/**
 * ReportList (molecule): rows of a report panel — a ranking (Top products), counts (Why payments
 * failed, Zero-result searches) or items to act on (Slow movers, No sales) — each with a title,
 * an optional line under it and a value on the right, divided by hairlines. `compact` rows are
 * label/value pairs without dividers (payment method success rates).
 */
export interface ReportListProps extends Omit<ComponentProps<"ul">, "children"> {
  rows: ReportListRow[];
  compact?: boolean;
}

const VALUE = { error: "text-error", warning: "text-warning-text", brand: "text-brand", muted: "font-regular text-text-muted" } as const;

export function ReportList({ rows, compact = false, className, ...props }: ReportListProps) {
  if (compact) {
    return (
      <ul data-slot="report-list" className={cn("flex flex-col gap-2", className)} {...props}>
        {rows.map((row) => (
          <li key={row.id} className={cn("flex justify-between gap-3 text-sm leading-4.5", row.total && "mt-1 border-t border-border-subtle pt-3")}>
            <span className={row.total ? "font-semibold text-text" : "text-text-secondary"}>{row.title}</span>
            <span className={cn("font-semibold text-text", row.mono && "font-mono font-regular", row.total && "font-semibold", row.valueTone && VALUE[row.valueTone])}>{row.value}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul data-slot="report-list" className={cn("flex flex-col", className)} {...props}>
      {rows.map((row) => (
        <li
          key={row.id}
          className={cn(
            "flex items-center gap-3 border-t border-border-subtle py-2.5 first:border-t-0 first:pt-0 md:py-3",
            row.highlight && "-mx-2.5 rounded-sm border-t-0 bg-tint-sun px-2.5 first:pt-2.5 md:-mx-2.5 md:px-2.5",
          )}
        >
          {row.rank && <span className="w-4 shrink-0 text-xs leading-xs text-text-muted">{row.rank}</span>}
          {row.dot && <span aria-hidden className={cn("size-2 shrink-0 rounded-3", REPORT_FILL[row.dot])} />}
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm leading-4.5 font-semibold text-text md:text-14 md:leading-5">{row.title}</span>
            {row.sub && <span className={cn("text-xs leading-xs", row.highlight ? "text-warning-text" : "text-text-muted")}>{row.sub}</span>}
          </span>
          {row.value !== undefined && (
            <span className={cn("shrink-0 text-right text-sm leading-4.5 font-semibold text-text md:text-14 md:leading-5", row.valueTone && VALUE[row.valueTone])}>{row.value}</span>
          )}
          {row.aside && <span className="shrink-0">{row.aside}</span>}
        </li>
      ))}
    </ul>
  );
}
