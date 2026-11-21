import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

export interface AdminStat {
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
  /** Amber tile: worth acting on ("No order in 90+ days", "Running low"); citrus: urgent ("Out of stock"). */
  tone?: "warning" | "error";
  /** Mobile tile: a shorter label ("Low"). */
  compactLabel?: ReactNode;
  /** Mobile tile: a shorter value ("48.9k"). */
  compactValue?: ReactNode;
  /** Leave out of the mobile tiles. */
  hideOnMobile?: boolean;
}

/**
 * AdminStats (organism): a strip of headline figures in one outlined panel with hairline
 * dividers (Paper Jofak - Admin → Customers, Inventory). `variant="summary"` heads a list (two by
 * two on tablet, one row from 1440px); on mobile it is hidden (the page description carries it)
 * or, with `mobile="tiles"`, a row of small tinted tiles. `variant="profile"` heads a customer
 * (two by two on mobile, one row from 768px, notes from 1440px). Give it an aria-label.
 */
export interface AdminStatsProps extends Omit<ComponentProps<"section">, "children"> {
  stats: AdminStat[];
  variant?: "summary" | "profile";
  /** Summary on mobile: hidden, or small tiles. */
  mobile?: "hidden" | "tiles";
}

const TILE = { warning: "bg-tint-sun", error: "bg-tint-citrus", none: "bg-surface-subtle" } as const;
const TEXT = { warning: "text-warning-text", error: "text-error" } as const;

export function AdminStats({ stats, variant = "summary", mobile = "hidden", className, ...props }: AdminStatsProps) {
  const profile = variant === "profile";
  const tiles = !profile && mobile === "tiles";
  const strip = (
    <section
      data-slot="admin-stats"
      className={cn(
        "grid gap-px overflow-clip border border-border-subtle bg-border-subtle font-sans",
        profile ? "grid-cols-2 rounded-md md:grid-cols-4 md:rounded-18 xl:rounded-lg" : "hidden grid-cols-2 rounded-lg md:grid xl:grid-cols-4",
        className,
      )}
      {...props}
    >
      {stats.map((stat, index) => {
        const warning = stat.tone === "warning";
        const tinted = stat.tone ? TEXT[stat.tone] : undefined;
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
          <div key={index} className={cn("flex flex-col gap-1.5 px-5.5 py-4.5", stat.tone ? TILE[stat.tone] : "bg-bg")}>
            <p className={cn("text-sm leading-4.5", tinted ?? "text-text-muted")}>{stat.label}</p>
            <p className="flex items-baseline gap-2">
              <span className="flex items-baseline gap-1">
                {stat.currency && <span className="text-base leading-4.5 font-semibold text-text-muted">{stat.currency}</span>}
                <span className={cn("text-28 leading-8.5 font-semibold tracking-snug", tinted ?? "text-text")}>{stat.value}</span>
              </span>
              {note}
            </p>
          </div>
        );
      })}
    </section>
  );
  if (!tiles) return strip;
  return (
    <>
      <ul aria-label={props["aria-label"]} className={cn("flex gap-2 font-sans md:hidden", className)}>
        {stats
          .filter((stat) => !stat.hideOnMobile)
          .map((stat, index) => (
            <li key={index} className={cn("flex min-w-0 flex-1 basis-0 flex-col rounded-md px-3.5 py-3", TILE[stat.tone ?? "none"])}>
              <span className={cn("truncate text-xs leading-xs", stat.tone ? TEXT[stat.tone] : "text-text-muted")}>{stat.compactLabel ?? stat.label}</span>
              <span className={cn("text-lg leading-6 font-semibold", stat.tone ? TEXT[stat.tone] : "text-text")}>{stat.compactValue ?? stat.value}</span>
            </li>
          ))}
      </ul>
      {strip}
    </>
  );
}
