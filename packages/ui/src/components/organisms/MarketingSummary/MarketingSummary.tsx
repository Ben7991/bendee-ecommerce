import type { ComponentProps } from "react";

import { cn } from "../../../lib";

export interface MarketingFigure {
  label: string;
  /** Tablet: a shorter label ("Recovery rate", "Abandoned"). */
  compactLabel?: string;
  value: string;
  note: string;
  /** Tablet: a shorter note ("58 orders saved", "carts · 41 no contact"). */
  compactNote?: string;
}

/**
 * MarketingSummary (organism): the marketing headline figures (Paper Jofak - Admin → Marketing).
 * From 1440px four cards — dark recovered revenue with its change, cart recovery rate with a bar
 * and target tick, abandoned carts, and marketing consent; tablet keeps the first three, compact;
 * mobile is one dark card with the rate and abandoned carts underneath.
 */
export interface MarketingSummaryProps extends Omit<ComponentProps<"section">, "children"> {
  revenue: MarketingFigure & { delta?: string };
  /** `progress` and `target` are 0–100 on the bar; `ahead` colours the tablet note green. */
  rate: MarketingFigure & { progress: number; target: number; ahead?: boolean };
  abandoned: MarketingFigure;
  consent: MarketingFigure;
}

const LABEL = "text-xs leading-xs font-semibold xl:text-sm xl:leading-4.5";
const VALUE = "text-28 leading-3xl font-semibold tracking-snug xl:text-30 xl:leading-9";

function Swap({ short, full }: { short?: string; full: string }) {
  if (!short) return <>{full}</>;
  return (
    <>
      <span className="xl:hidden">{short}</span>
      <span className="hidden xl:inline">{full}</span>
    </>
  );
}

function Delta({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-accent px-1.75 py-px text-11 leading-4 font-bold text-on-accent xl:px-2 xl:py-0.5 xl:text-xs xl:leading-xs">
      {children}
    </span>
  );
}

export function MarketingSummary({ revenue, rate, abandoned, consent, className, ...props }: MarketingSummaryProps) {
  return (
    <section data-slot="marketing-summary" className={cn("font-sans", className)} {...props}>
      {/* Mobile: one dark card. */}
      <div className="flex flex-col gap-1.5 rounded-18 bg-primary p-4.5 md:hidden">
        <p className="text-xs leading-xs font-semibold text-text-inverse-muted">{revenue.label}</p>
        <p className="flex items-baseline gap-2">
          <span className="text-3xl leading-9.5 font-semibold tracking-tight text-text-inverse">{revenue.value}</span>
          {revenue.delta && <Delta>{revenue.delta}</Delta>}
        </p>
        <p className="flex gap-4 border-t border-white/12 pt-2 text-xs leading-xs text-text-inverse-muted">
          <span>
            <span className="font-semibold text-text-inverse">{rate.value}</span> recovery rate
          </span>
          <span>
            <span className="font-semibold text-text-inverse">{abandoned.value}</span> carts abandoned
          </span>
        </p>
      </div>

      {/* Tablet and desktop: cards. */}
      <div className="hidden gap-2.5 md:flex">
        <div className="flex min-w-0 flex-3 basis-0 flex-col gap-1.5 rounded-18 bg-primary p-4.5 xl:justify-between xl:gap-3 xl:rounded-lg xl:px-5.5 xl:py-5">
          <p className={cn(LABEL, "text-text-inverse-muted")}>{revenue.label}</p>
          <p className="flex items-baseline gap-2 xl:gap-2.5">
            <span className="text-28 leading-3xl font-semibold tracking-snug text-text-inverse xl:text-40 xl:leading-11 xl:tracking-tight">
              {revenue.value}
            </span>
            {revenue.delta && <Delta>{revenue.delta}</Delta>}
          </p>
          <p className="text-xs leading-xs text-text-inverse-muted xl:text-sm xl:leading-4.5">
            <Swap short={revenue.compactNote} full={revenue.note} />
          </p>
        </div>

        <div className="flex min-w-0 flex-2 basis-0 flex-col gap-1.5 rounded-18 border border-border-subtle p-4.5 xl:rounded-lg xl:px-5.5 xl:py-5">
          <p className={cn(LABEL, "text-text-secondary")}>
            <Swap short={rate.compactLabel} full={rate.label} />
          </p>
          <p className={cn(VALUE, "text-text")}>{rate.value}</p>
          <p className={cn("text-xs leading-xs font-semibold xl:hidden", rate.ahead ? "text-brand" : "text-warning-text")}>{rate.compactNote}</p>
          <div className="hidden flex-col gap-1.25 xl:flex">
            <div
              role="progressbar"
              aria-label={`${rate.label}, target ${rate.target}%`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(rate.progress)}
              className="relative h-1.5 rounded-full bg-surface-subtle"
            >
              <div className="h-full rounded-full bg-brand" style={{ width: `${Math.min(100, rate.progress)}%` }} />
              <span aria-hidden className="absolute -top-0.75 h-3 w-0.5 bg-text" style={{ left: `${rate.target}%` }} />
            </div>
            <p className="text-xs leading-xs text-text-muted">{rate.note}</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-2 basis-0 flex-col gap-1.5 rounded-18 bg-surface-subtle p-4.5 xl:rounded-lg xl:border xl:border-border-subtle xl:bg-transparent xl:px-5.5 xl:py-5">
          <p className={cn(LABEL, "text-text-secondary")}>
            <Swap short={abandoned.compactLabel} full={abandoned.label} />
          </p>
          <p className={cn(VALUE, "text-text")}>{abandoned.value}</p>
          <p className="text-xs leading-xs text-text-muted">
            <Swap short={abandoned.compactNote} full={abandoned.note} />
          </p>
        </div>

        <div className="hidden min-w-0 flex-2 basis-0 flex-col gap-1.5 rounded-lg bg-surface-subtle px-5.5 py-5 xl:flex">
          <p className={cn(LABEL, "text-text-secondary")}>{consent.label}</p>
          <p className={cn(VALUE, "text-text")}>{consent.value}</p>
          <p className="text-xs leading-xs text-text-muted">{consent.note}</p>
        </div>
      </div>
    </section>
  );
}
