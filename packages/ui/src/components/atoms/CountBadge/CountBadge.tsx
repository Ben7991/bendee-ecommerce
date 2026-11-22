import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * CountBadge (atom): the lime count bubble pinned to a header icon button.
 * Decorative: put the count in the parent button's label ("Bag, 3 items"). Hidden when 0.
 * 18px on mobile, 20px with a ring from tablet up.
 */
export interface CountBadgeProps extends Omit<ComponentProps<"span">, "children"> {
  count: number;
  /** Counts above this show as "max+". */
  max?: number;
}

export function CountBadge({ count, max = 99, className, ...props }: CountBadgeProps) {
  if (count <= 0) return null;
  return (
    <span
      data-slot="count-badge"
      aria-hidden
      className={cn(
        "absolute -top-0.5 -right-0.5 flex size-4.5 items-center justify-center rounded-full bg-accent font-sans text-10 leading-3 font-bold text-on-accent",
        "md:-top-0.75 md:-right-0.75 md:size-auto md:h-5 md:min-w-5 md:border-2 md:border-bg md:px-1.25 md:text-11",
        className,
      )}
      {...props}
    >
      {count > max ? `${max}+` : count}
    </span>
  );
}
