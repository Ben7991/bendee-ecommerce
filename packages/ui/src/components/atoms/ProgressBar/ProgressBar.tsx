import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/** ProgressBar (atom): a thin brand-green track, e.g. quiz progress. */
export interface ProgressBarProps extends Omit<ComponentProps<"div">, "children"> {
  /** 0–100. */
  value: number;
  /** Accessible name, e.g. "Quiz progress". */
  label: string;
}

export function ProgressBar({ value, label, className, ...props }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      data-slot="progress-bar"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-surface", className)}
      {...props}
    >
      <div className="h-full rounded-full bg-brand" style={{ width: `${clamped}%` }} />
    </div>
  );
}
