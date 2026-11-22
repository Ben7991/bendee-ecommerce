import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * StickyActionBar (organism): a bar fixed to the bottom of mobile screens with the step's main
 * button and a one-line note. Hidden from 768px. Leave about 110px under the page for it.
 */
export interface StickyActionBarProps extends Omit<ComponentProps<"div">, "children"> {
  /** Usually one full-width Button. */
  action: ReactNode;
  note?: ReactNode;
}

export function StickyActionBar({ action, note, className, ...props }: StickyActionBarProps) {
  return (
    <div
      data-slot="sticky-action-bar"
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 flex flex-col gap-2 border-t border-border-subtle bg-bg px-5 pt-3 pb-8 font-sans shadow-bar md:hidden",
        className,
      )}
      {...props}
    >
      {action}
      {note && <p className="text-center text-xs leading-xs text-text-muted">{note}</p>}
    </div>
  );
}
