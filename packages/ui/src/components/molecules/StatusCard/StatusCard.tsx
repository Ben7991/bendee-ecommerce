import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { ProgressBar } from "../../atoms";

/**
 * StatusCard (molecule): "Expected back" card for maintenance: a time, time left, a progress
 * bar and when it started / was updated. Mobile uses the `short` copy. It only displays what
 * it's given; the app works out the times.
 */
export interface StatusCardProps extends Omit<ComponentProps<"div">, "children"> {
  label?: string;
  /** e.g. "6:00 AM GMT · Sat 15 Nov". */
  value: string;
  /** e.g. { full: "about 2h 15m left", short: "~2h 15m" }. */
  remaining: { full: string; short: string };
  /** 0–100. */
  progress: number;
  /** e.g. "Started 2:00 AM". */
  started: string;
  /** e.g. { full: "Last updated 3:45 AM", short: "updated 3:45 AM" }. */
  updated: { full: string; short: string };
}

export function StatusCard({ label = "Expected back", value, remaining, progress, started, updated, className, ...props }: StatusCardProps) {
  return (
    <div
      data-slot="status-card"
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-border-subtle p-4.5 text-left font-sans",
        "md:gap-3.5 md:rounded-xl md:px-6 md:py-5.5",
        className,
      )}
      {...props}
    >
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs leading-xs text-text-muted">{label}</p>
          <p className="text-md leading-sm font-semibold text-text md:text-xl md:leading-2xl">{value}</p>
        </div>
        <p className="text-xs leading-xs font-semibold text-brand md:text-sm">
          <span className="md:hidden">{remaining.short}</span>
          <span className="hidden md:inline">{remaining.full}</span>
        </p>
      </div>
      <ProgressBar value={progress} label="Maintenance progress" className="bg-sage-100 md:h-2" />
      <p className="text-xs leading-xs text-text-muted md:hidden">
        {started} · {updated.short}
      </p>
      <div className="hidden justify-between text-xs leading-xs text-text-muted md:flex">
        <p>{started}</p>
        <p>{updated.full}</p>
      </div>
    </div>
  );
}
