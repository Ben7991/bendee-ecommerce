import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Sparkline } from "../../atoms";

export interface ReportKpi {
  label: string;
  /** Mobile: "Customers" for "Customers who ordered". */
  compactLabel?: string;
  value: string;
  /** Muted after the value: "of 48", "a year", "vs 231". */
  suffix?: string;
  /** Change: ▲/▼ is drawn from `direction`; `good` picks green or red. */
  delta?: { text: string; direction: "up" | "down"; good: boolean };
  /** A plain line instead of (or after) the delta: "1,036 units". */
  note?: ReactNode;
  /** Mobile: a shorter note. */
  compactNote?: ReactNode;
  /** Note colour: brand (good news) or warning; default muted. */
  noteTone?: "brand" | "warning" | "muted";
  /** Sparkline values (compact variant). */
  trend?: number[];
  /** Dark evergreen headline, amber "needs attention", or soft grey. */
  tone?: "dark" | "sun" | "muted";
}

/**
 * ReportKpis (organism): the headline figures across the top of a report (Paper Jofak - Admin →
 * Reports). `variant="compact"` (Sales) is a row of small tiles with a change and a sparkline;
 * `standard` cards are larger with a change or a note. Tiles share the row from 768px (wrapping
 * four to a row on tablet) and sit two by two on mobile, an odd last one full width.
 */
export interface ReportKpisProps extends Omit<ComponentProps<"section">, "children"> {
  kpis: ReportKpi[];
  variant?: "compact" | "standard";
}

const SURFACE = { dark: "bg-primary", sun: "bg-tint-sun", muted: "bg-surface-subtle", none: "border border-border-subtle" } as const;

export function ReportKpis({ kpis, variant = "standard", className, ...props }: ReportKpisProps) {
  const compact = variant === "compact";
  return (
    <section
      data-slot="report-kpis"
      className={cn("grid grid-cols-2 gap-2.5 font-sans md:flex md:flex-wrap", compact ? "md:gap-2 xl:gap-2.5" : "md:gap-3", className)}
      {...props}
    >
      {kpis.map((kpi, index) => {
        const dark = kpi.tone === "dark";
        const sun = kpi.tone === "sun";
        const deltaTone = dark ? "text-accent" : kpi.delta?.good ? "text-success" : "text-error";
        const odd = kpis.length % 2 === 1 && index === kpis.length - 1;
        return (
          <div
            key={kpi.label}
            className={cn(
              "flex min-w-0 flex-col md:min-w-36 md:flex-1 md:basis-36",
              compact ? "gap-2 rounded-md p-4" : "gap-1 rounded-md px-4 py-3.5 md:gap-1.5 md:rounded-18 md:px-4.5 md:py-4",
              SURFACE[kpi.tone ?? "none"],
              odd && "col-span-2",
            )}
          >
            <p
              className={cn(
                compact ? "text-xs leading-xs font-medium" : "text-xs leading-xs md:text-sm md:leading-4.5",
                dark ? "text-text-inverse-muted" : sun ? "text-warning-text" : compact ? "text-text-muted" : "text-text-secondary",
              )}
            >
              {kpi.compactLabel ? (
                <>
                  <span className="md:hidden">{kpi.compactLabel}</span>
                  <span className="hidden md:inline">{kpi.label}</span>
                </>
              ) : (
                kpi.label
              )}
            </p>
            <p
              className={cn(
                "font-semibold tracking-snug whitespace-nowrap",
                compact ? "text-xl leading-lg" : "text-xl leading-lg md:text-24 md:leading-2xl",
                dark ? "text-text-inverse" : "text-text",
              )}
            >
              {kpi.value}
              {kpi.suffix && <span className={cn("ml-1 text-sm font-medium md:text-base", dark ? "text-text-inverse-muted" : "text-text-muted")}>{kpi.suffix}</span>}
            </p>
            {(kpi.delta || kpi.note || kpi.trend) && (
              <div className="flex items-center justify-between gap-2">
                <p className={cn("text-xs leading-xs font-semibold whitespace-nowrap", kpi.delta ? deltaTone : dark ? "text-accent" : sun ? "text-warning-text" : kpi.noteTone === "brand" ? "text-brand" : kpi.noteTone === "warning" ? "text-warning-text" : "text-text-muted")}>
                  {kpi.delta && (
                    <>
                      {kpi.delta.direction === "up" ? "▲" : "▼"} {kpi.delta.text}
                    </>
                  )}
                  {kpi.delta && kpi.note && " · "}
                  {kpi.compactNote ? (
                    <>
                      <span className="md:hidden">{kpi.compactNote}</span>
                      <span className="hidden md:inline">{kpi.note}</span>
                    </>
                  ) : (
                    kpi.note
                  )}
                </p>
                {kpi.trend && <Sparkline values={kpi.trend} tone={dark ? "accent" : kpi.delta?.good === false ? "error" : "brand"} className="h-5 w-14" />}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
