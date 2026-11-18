import type { ComponentProps } from "react";

import { cn } from "../../../lib";

const RING = { "sage-50": "bg-sage-50", "sage-100": "bg-sage-100" } as const;
const CORE = { sage: "bg-sage-100 text-primary dark:text-brand", accent: "bg-accent text-primary" } as const;

/**
 * Medallion (atom): a big emblem in two concentric circles, for error and status pages.
 * Size both circles with `className` (outer) and `coreClassName` (inner); put the icon or mark
 * in `children`. Decorative.
 */
export interface MedallionProps extends ComponentProps<"span"> {
  ring?: keyof typeof RING;
  core?: keyof typeof CORE;
  coreClassName?: string;
}

export function Medallion({ ring = "sage-50", core = "sage", coreClassName, className, children, ...props }: MedallionProps) {
  return (
    <span
      data-slot="medallion"
      aria-hidden
      className={cn("flex shrink-0 items-center justify-center rounded-full", RING[ring], className)}
      {...props}
    >
      <span className={cn("flex items-center justify-center rounded-full", CORE[core], coreClassName)}>{children}</span>
    </span>
  );
}
