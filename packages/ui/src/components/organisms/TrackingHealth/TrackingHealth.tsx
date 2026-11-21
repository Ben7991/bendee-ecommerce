import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";

export interface Tracker {
  name: string;
  /** Letter on the tile ("M", "G", "T"). */
  initial: string;
  /** "Last Purchase event 6 min ago", "3 purchases missed yesterday". */
  detail: string;
  status: "healthy" | "check" | "soon";
}

export interface TrackingEvent {
  id: string;
  /** "10:42". */
  time: string;
  /** "Purchase · JFK-251502 · GHS 236". */
  label: string;
  tracker: string;
  received: boolean;
}

/**
 * TrackingHealth (organism): ad pixel health (Paper Jofak - Admin → Marketing → Ad tracking): one
 * row per tracker — healthy, needs a check (amber), or coming soon (dashed) — with Debug events,
 * which can show the latest events and whether each tracker got them. Mobile shows only `alert`
 * (an amber card: "Google tag missed 3 purchases" with Check), or nothing when all is well.
 */
export interface TrackingHealthProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  trackers: Tracker[];
  debug?: { href: string; label?: string };
  /** Shown under the trackers (Debug events open). */
  events?: TrackingEvent[];
  alert?: { title: string; note: string; href: string; action?: string };
}

const TILE = { healthy: "bg-tint-info text-info", check: "bg-tint-sun text-warning-text", soon: "border border-dashed border-border text-text-muted" } as const;

export function TrackingHealth({ linkAs: LinkAs = "a", trackers, debug, events, alert, className, ...props }: TrackingHealthProps) {
  return (
    <section data-slot="tracking-health" id="tracking" aria-label="Ad tracking" className={cn("scroll-mt-24 font-sans", className)} {...props}>
      {alert && (
        <div className="flex items-center gap-3 rounded-md bg-tint-sun p-3.5 md:hidden">
          <span aria-hidden className="size-2 shrink-0 rounded-full bg-warning" />
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-14 leading-5 font-semibold text-text">{alert.title}</span>
            <span className="text-xs leading-xs text-warning-text">{alert.note}</span>
          </span>
          <LinkAs href={alert.href} className="shrink-0 text-sm leading-4.5 font-semibold text-text">
            {alert.action ?? "Check"}
          </LinkAs>
        </div>
      )}

      <div className={cn("flex-col overflow-clip rounded-lg border border-border-subtle md:flex", events ? "mt-3.5 flex md:mt-0" : "hidden")}>
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-md leading-5.5 font-semibold text-text">Ad tracking</h2>
          {debug && (
            <LinkAs href={debug.href} className="text-sm leading-4.5 font-semibold text-brand hover:underline">
              {debug.label ?? "Debug events"}
            </LinkAs>
          )}
        </div>
        <ul className="flex flex-col">
          {trackers.map((tracker) => (
            <li key={tracker.name} className="flex items-center gap-3 border-t border-border-subtle px-5 py-3">
              <span aria-hidden className={cn("flex size-8 shrink-0 items-center justify-center rounded-9 text-sm leading-xs font-bold", TILE[tracker.status])}>
                {tracker.initial}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className={cn("text-14 leading-5 font-semibold", tracker.status === "soon" ? "text-text-secondary" : "text-text")}>{tracker.name}</span>
                <span className={cn("text-xs leading-xs", tracker.status === "check" ? "font-semibold text-warning-text" : "text-text-muted")}>{tracker.detail}</span>
              </span>
              {tracker.status !== "soon" && (
                <span className={cn("flex shrink-0 items-center gap-1.5 text-xs leading-xs font-semibold", tracker.status === "healthy" ? "text-brand" : "text-warning-text")}>
                  <span aria-hidden className={cn("size-2 rounded-full", tracker.status === "healthy" ? "bg-brand" : "bg-warning")} />
                  {tracker.status === "healthy" ? "Healthy" : "Check"}
                </span>
              )}
            </li>
          ))}
        </ul>
        {events && (
          <div className="flex flex-col gap-2 border-t border-border-subtle bg-surface-subtle px-5 py-4">
            <h3 className="text-xs leading-xs font-semibold tracking-overline text-text-muted uppercase">Latest events</h3>
            <ul className="flex flex-col gap-2">
              {events.map((event) => (
                <li key={event.id} className="flex items-center gap-2.5 text-xs leading-xs">
                  <span className="w-10 shrink-0 font-mono text-text-muted">{event.time}</span>
                  <span className="min-w-0 flex-1 truncate text-text">{event.label}</span>
                  <span className={cn("shrink-0 font-semibold", event.received ? "text-brand" : "text-warning-text")}>
                    {event.tracker} · {event.received ? "received" : "missed"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
