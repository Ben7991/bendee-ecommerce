import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * Divider (atom): a hairline rule, optionally with a short label in the middle ("OR",
 * "or with email"). Decorative: the label is not announced as a separator by itself.
 */
export interface DividerProps extends ComponentProps<"div"> {
  label?: string;
}

export function Divider({ label, className, ...props }: DividerProps) {
  return (
    <div
      data-slot="divider"
      role={label ? undefined : "separator"}
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      <span aria-hidden className="h-px flex-1 bg-border-subtle" />
      {label && (
        <>
          <span className="font-sans text-xs leading-xs text-text-muted">{label}</span>
          <span aria-hidden className="h-px flex-1 bg-border-subtle" />
        </>
      )}
    </div>
  );
}
