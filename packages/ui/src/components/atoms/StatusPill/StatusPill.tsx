import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * StatusPill (atom): a caps status label with a dot ("Scheduled maintenance · in progress").
 * Amber for anything temporary or in progress. Pass `compact` text for mobile when it's long.
 */
export interface StatusPillProps extends Omit<ComponentProps<"p">, "children"> {
  label: string;
  compactLabel?: string;
}

export function StatusPill({ label, compactLabel, className, ...props }: StatusPillProps) {
  return (
    <p
      data-slot="status-pill"
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full bg-tint-sun px-3 py-1.25 font-sans text-11 leading-xs font-semibold tracking-wide text-warning-text uppercase",
        "md:gap-2 md:px-3.5 md:py-1.5 md:text-xs",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-warning md:size-1.75" />
      {compactLabel ? (
        <>
          <span className="md:hidden">{compactLabel}</span>
          <span className="hidden md:inline">{label}</span>
        </>
      ) : (
        label
      )}
    </p>
  );
}
