import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../Icon";

/** Rating (atom): "★ 4.9 (3,214)" on product cards. */
export interface RatingProps extends Omit<ComponentProps<"span">, "children"> {
  value: number;
  count?: number;
}

export function Rating({ value, count, className, ...props }: RatingProps) {
  const formattedCount = count?.toLocaleString("en-GH");
  return (
    <span
      data-slot="rating"
      className={cn("inline-flex items-center gap-1.5 font-sans text-sm leading-xs", className)}
      {...props}
    >
      <span className="sr-only">
        Rated {value} out of 5{formattedCount ? ` from ${formattedCount} reviews` : ""}
      </span>
      <Icon name="star" size={14} className="text-brand" />
      <span aria-hidden className="font-semibold text-text">
        {value.toFixed(1)}
      </span>
      {formattedCount && (
        <span aria-hidden className="text-text-muted">
          ({formattedCount})
        </span>
      )}
    </span>
  );
}
