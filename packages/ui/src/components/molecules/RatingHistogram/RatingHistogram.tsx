import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * RatingHistogram (molecule): the 5★ → 1★ bars under a review average. `shares` are whole
 * percentages, five-star first.
 */
export interface RatingHistogramProps extends Omit<ComponentProps<"dl">, "children"> {
  /** [5★, 4★, 3★, 2★, 1★] as percentages. */
  shares: [number, number, number, number, number];
}

export function RatingHistogram({ shares, className, ...props }: RatingHistogramProps) {
  return (
    <dl data-slot="rating-histogram" className={cn("flex flex-col gap-2 font-sans text-sm leading-xs", className)} {...props}>
      {shares.map((share, index) => {
        const stars = 5 - index;
        return (
          <div key={stars} className="flex items-center gap-3">
            <dt className="w-7 shrink-0 text-text">
              {stars} ★<span className="sr-only"> stars</span>
            </dt>
            <dd className="flex min-w-0 flex-1 items-center gap-3">
              <span aria-hidden className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-border-subtle">
                <span className="block h-full rounded-full bg-brand" style={{ width: `${Math.max(0, Math.min(100, share))}%` }} />
              </span>
              <span className="w-10 shrink-0 text-right text-text-muted">{share}%</span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
