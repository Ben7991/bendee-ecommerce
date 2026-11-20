import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { sparklineVariants, type SparklineVariantProps } from "./Sparkline.variants";

const WIDTH = 72;
const HEIGHT = 24;
const INSET = 2;

/** Turns values into an SVG path across a 72×24 box (higher values sit higher). */
export function sparklinePath(values: number[]): string {
  if (values.length === 0) return "";
  const min = Math.min(...values);
  const range = Math.max(...values) - min || 1;
  const step = values.length > 1 ? (WIDTH - INSET * 2) / (values.length - 1) : 0;
  return values
    .map((value, index) => {
      const x = INSET + index * step;
      const y = HEIGHT - INSET - ((value - min) / range) * (HEIGHT - INSET * 2);
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

/**
 * Sparkline (atom): a tiny 72×24 trend line next to a KPI. Decorative: say the trend in text
 * (the delta chip) next to it. Not a chart: no axes, no values.
 */
export interface SparklineProps extends Omit<ComponentProps<"svg">, "children" | "values">, SparklineVariantProps {
  /** The series, oldest first. */
  values: number[];
}

export function Sparkline({ values, tone, className, ...props }: SparklineProps) {
  return (
    <svg
      data-slot="sparkline"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      aria-hidden
      focusable="false"
      className={cn(sparklineVariants({ tone }), className)}
      {...props}
    >
      <path d={sparklinePath(values)} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
