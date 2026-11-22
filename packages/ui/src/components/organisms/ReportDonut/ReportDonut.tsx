import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

export interface DonutSegment {
  label: string;
  value: number;
  tone: "success" | "error" | "warning";
}

const STROKE = { success: "stroke-success", error: "stroke-error", warning: "stroke-warning" } as const;
const DOT = { success: "bg-success", error: "bg-error", warning: "bg-warning" } as const;

/**
 * ReportDonut (organism): a donut with its legend (Paper Jofak - Admin → Reports → Payment
 * health): segments drawn clockwise from the top, the headline share in the middle, each
 * segment's count beside it, then anything else (`children`: success by method, an alert).
 */
export interface ReportDonutProps extends Omit<ComponentProps<"section">, "title"> {
  title: ReactNode;
  description?: ReactNode;
  segments: DonutSegment[];
  /** Middle: "88%" over "succeeded". */
  center: { value: string; label: string };
}

const R = 54;
const C = 2 * Math.PI * R;

export function ReportDonut({ title, description, segments, center, className, children, ...props }: ReportDonutProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1;
  const arcs = segments.map((segment, index) => ({
    segment,
    length: (segment.value / total) * C,
    offset: (segments.slice(0, index).reduce((sum, item) => sum + item.value, 0) / total) * C,
  }));
  return (
    <section data-slot="report-donut" className={cn("flex min-w-0 flex-col gap-4 rounded-18 border border-border-subtle p-4 font-sans md:rounded-lg md:px-6 md:py-5", className)} {...props}>
      <div className="flex flex-col gap-0.5 md:gap-1">
        <h2 className="text-base leading-5 font-semibold tracking-compact text-text md:text-17 md:leading-6">{title}</h2>
        {description && <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5">{description}</p>}
      </div>
      <div className="flex items-center gap-5">
        <div className="relative size-33 shrink-0">
          <svg viewBox="0 0 132 132" role="img" aria-label={segments.map((segment) => `${segment.label} ${segment.value}`).join(", ")} className="size-full -rotate-90">
            {arcs.map(({ segment, length, offset }) => (
              <circle key={segment.label} cx="66" cy="66" r={R} fill="none" strokeWidth="16" className={STROKE[segment.tone]} strokeDasharray={`${length} ${C}`} strokeDashoffset={-offset} />
            ))}
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-24 leading-lg font-semibold tracking-snug text-text">{center.value}</span>
            <span className="text-11 leading-3.5 text-text-muted">{center.label}</span>
          </span>
        </div>
        <ul className="flex min-w-0 flex-1 flex-col gap-2.5">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-2 text-sm leading-4.5">
              <span aria-hidden className={cn("size-2 shrink-0 rounded-full", DOT[segment.tone])} />
              <span className="flex-1 text-text-secondary">{segment.label}</span>
              <span className="font-semibold text-text">{segment.value.toLocaleString("en-GB")}</span>
            </li>
          ))}
        </ul>
      </div>
      {children && <div className="flex flex-col gap-4 border-t border-border-subtle pt-3">{children}</div>}
    </section>
  );
}
