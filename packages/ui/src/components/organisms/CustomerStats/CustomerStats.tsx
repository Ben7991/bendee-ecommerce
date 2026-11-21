import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

export interface CustomerStat {
  label: ReactNode;
  value: ReactNode;
  /** Small prefix before the value ("GHS"). */
  currency?: string;
  /** Under the value (profile, from 1440px) or beside it (summary): "Top 5% of customers", "+86 this month". */
  note?: ReactNode;
  /** Tablet summary: a shorter note ("+86"). */
  compactNote?: ReactNode;
  /** Brand notes are good news or links; muted are facts. */
  noteTone?: "brand" | "muted";
  /** Amber tile: worth acting on ("No order in 90+ days"). */
  tone?: "warning";
}

/**
 * CustomerStats (organism): a strip of customer figures in one outlined panel with hairline
 * dividers (Paper Jofak - Admin → Customers). `variant="summary"` heads the customer list (two by
 * two on tablet, one row from 1440px, hidden on mobile where the page description carries it);
 * `variant="profile"` heads a customer (two by two on mobile, one row from 768px, notes from
 * 1440px). Give it an aria-label.
 */
export interface CustomerStatsProps extends Omit<ComponentProps<"section">, "children"> {
  stats: CustomerStat[];
  variant?: "summary" | "profile";
}

export function CustomerStats({ stats, variant = "summary", className, ...props }: CustomerStatsProps) {
  const profile = variant === "profile";
  return (
    <section
      data-slot="customer-stats"
      className={cn(
        "grid gap-px overflow-clip border border-border-subtle bg-border-subtle font-sans",
        profile ? "grid-cols-2 rounded-md md:grid-cols-4 md:rounded-18 xl:rounded-lg" : "hidden grid-cols-2 rounded-lg md:grid xl:grid-cols-4",
        className,
      )}
      {...props}
    >
      {stats.map((stat, index) => {
        const warning = stat.tone === "warning";
        const note = stat.note && (
          <span
            className={cn(
              "text-xs leading-xs",
              warning ? "text-warning-text" : stat.noteTone === "muted" ? "text-text-muted" : "font-semibold text-brand",
            )}
          >
            {stat.compactNote ? (
              <>
                <span className="xl:hidden">{stat.compactNote}</span>
                <span className="hidden xl:inline">{stat.note}</span>
              </>
            ) : (
              stat.note
            )}
          </span>
        );

        if (profile) {
          return (
            <div key={index} className="flex flex-col bg-bg px-3.5 py-3 md:gap-0.5 md:px-4 md:py-3.5 xl:gap-1 xl:px-5.5 xl:py-4">
              <p className="text-xs leading-xs text-text-muted xl:text-sm xl:leading-4.5">{stat.label}</p>
              <p className="text-lg leading-6.5 font-semibold text-text md:text-xl md:leading-7 md:tracking-compact xl:text-2xl xl:leading-8 xl:tracking-snug">
                {stat.currency && (
                  <span className="xl:mr-1 xl:text-14 xl:leading-4.5 xl:tracking-normal xl:text-text-muted">{stat.currency} </span>
                )}
                {stat.value}
              </p>
              {note && <p className="hidden xl:block">{note}</p>}
            </div>
          );
        }

        return (
          <div key={index} className={cn("flex flex-col gap-1.5 px-5.5 py-4.5", warning ? "bg-tint-sun" : "bg-bg")}>
            <p className={cn("text-sm leading-4.5", warning ? "text-warning-text" : "text-text-muted")}>{stat.label}</p>
            <p className="flex items-baseline gap-2">
              <span className="flex items-baseline gap-1">
                {stat.currency && <span className="text-base leading-4.5 font-semibold text-text-muted">{stat.currency}</span>}
                <span className={cn("text-28 leading-8.5 font-semibold tracking-snug", warning ? "text-warning-text" : "text-text")}>{stat.value}</span>
              </span>
              {note}
            </p>
          </div>
        );
      })}
    </section>
  );
}
