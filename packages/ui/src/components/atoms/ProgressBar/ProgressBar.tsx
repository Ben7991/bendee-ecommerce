import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * ProgressBar (atom): a thin brand-green track, e.g. quiz progress. `size="xs"` is the 4px admin
 * stock level bar; `tone` colours it amber (low) or red (sold out).
 */
export interface ProgressBarProps extends Omit<ComponentProps<"div">, "children"> {
  /** 0–100. */
  value: number;
  /** Accessible name, e.g. "Quiz progress". */
  label: string;
  tone?: "brand" | "warning" | "error";
  size?: "sm" | "xs";
}

const FILL = { brand: "bg-brand", warning: "bg-warning", error: "bg-error" } as const;

export function ProgressBar({ value, label, tone = "brand", size = "sm", className, ...props }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      data-slot="progress-bar"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn("w-full overflow-hidden rounded-full", size === "xs" ? "h-1 bg-border-subtle" : "h-1.5 bg-surface", className)}
      {...props}
    >
      <div className={cn("h-full rounded-full", FILL[tone])} style={{ width: `${clamped}%` }} />
    </div>
  );
}
