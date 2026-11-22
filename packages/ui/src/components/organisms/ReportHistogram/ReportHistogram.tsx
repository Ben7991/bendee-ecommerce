import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

export interface HistogramBin {
  label: string;
  value: number;
  /** The bin to draw attention to (dark green, bold label). */
  highlight?: boolean;
}

/**
 * ReportHistogram (organism): counts in bins with a marker line (Paper Jofak - Admin → Reports →
 * Discounts: order values around the free-delivery line). Each column shows its count; the
 * highlighted bin is dark green; `markerBefore` draws a line before that bin. A finding sits
 * underneath (`children`).
 */
export interface ReportHistogramProps extends Omit<ComponentProps<"section">, "title"> {
  title: ReactNode;
  description?: ReactNode;
  bins: HistogramBin[];
  /** Index of the bin the marker line sits before. */
  markerBefore?: number;
}

export function ReportHistogram({ title, description, bins, markerBefore, className, children, ...props }: ReportHistogramProps) {
  const max = Math.max(1, ...bins.map((bin) => bin.value));
  return (
    <section data-slot="report-histogram" className={cn("flex min-w-0 flex-col gap-4 rounded-18 border border-border-subtle p-4 font-sans md:rounded-lg md:px-6 md:py-5", className)} {...props}>
      <div className="flex flex-col gap-0.5 md:gap-1">
        <h2 className="text-base leading-5 font-semibold tracking-compact text-text md:text-17 md:leading-6">{title}</h2>
        {description && <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5">{description}</p>}
      </div>
      <figure className="flex flex-col gap-2">
        <div className="flex h-36 items-end gap-1.5 border-b border-border-subtle md:h-40 md:gap-2.5">
          {bins.map((bin, index) => (
            <div key={bin.label} className="flex h-full min-w-0 flex-1 items-end gap-1.5 md:gap-2.5">
              {markerBefore === index && <span aria-hidden className="h-full w-0.5 shrink-0 bg-text" />}
              <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
                <span className="text-xs leading-xs font-semibold text-text-secondary">{bin.value}</span>
                <span className={cn("w-full rounded-t-6", bin.highlight ? "bg-brand" : "bg-evergreen-300")} style={{ height: `${(bin.value / max) * 75}%` }} />
              </div>
            </div>
          ))}
        </div>
        <figcaption className="sr-only">{bins.map((bin) => `${bin.label}: ${bin.value}`).join(", ")}</figcaption>
        <div aria-hidden className="flex gap-1.5 md:gap-2.5">
          {bins.map((bin, index) => (
            <span key={bin.label} className={cn("min-w-0 flex-1 text-center text-10 leading-3.5 md:text-11", bin.highlight ? "font-semibold text-text" : "text-text-muted", markerBefore === index && "ml-2 md:ml-3")}>
              {bin.label}
            </span>
          ))}
        </div>
      </figure>
      {children && <div className="text-sm leading-4.5 text-text-secondary">{children}</div>}
    </section>
  );
}
