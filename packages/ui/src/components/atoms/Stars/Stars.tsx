import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../Icon";

/** Stars (atom): a row of five stars for testimonials. Colour follows `currentColor`. */
export interface StarsProps extends Omit<ComponentProps<"span">, "children"> {
  /** Whole stars filled, 0–5. */
  value?: number;
}

export function Stars({ value = 5, className, ...props }: StarsProps) {
  const filled = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <span
      data-slot="stars"
      role="img"
      aria-label={`${filled} out of 5 stars`}
      className={cn("inline-flex gap-0.75 text-brand", className)}
      {...props}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Icon key={index} name="star" size={16} className={index < filled ? undefined : "opacity-subtle"} />
      ))}
    </span>
  );
}
