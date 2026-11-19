import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Initials } from "../../atoms";

/**
 * StaffNote (molecule): a short tip from a named Jofak expert with one action ("Start with the
 * greens…" · Efua A. · Get the 3-pack), under a collection banner. A quiet surface row from 768px;
 * a white card with a full-width button on mobile (it sits on the sage wash there).
 */
export interface StaffNoteProps extends Omit<ComponentProps<"figure">, "children"> {
  quote: ReactNode;
  /** Shorter quote for mobile. */
  compactQuote?: ReactNode;
  author: string;
  /** "Jofak nutritionist". */
  role?: string;
  /** A Button. */
  action?: ReactNode;
}

export function StaffNote({ quote, compactQuote, author, role, action, className, ...props }: StaffNoteProps) {
  return (
    <figure
      data-slot="staff-note"
      className={cn(
        "flex flex-col gap-3 rounded-lg bg-bg p-4 font-sans md:flex-row md:items-center md:gap-5 md:rounded-xl md:bg-surface-subtle md:px-7 md:py-5",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3 md:items-center md:gap-5">
        <Initials name={author} className="size-9 text-sm leading-xs md:size-13 md:text-md md:leading-sm" />
        <div className="flex min-w-0 flex-col gap-0.5 md:gap-1">
          <blockquote className="text-sm leading-sm text-text md:text-base">
            {compactQuote ? (
              <>
                <span className="md:hidden">“{compactQuote}”</span>
                <span className="hidden md:inline">“{quote}”</span>
              </>
            ) : (
              <>“{quote}”</>
            )}
          </blockquote>
          <figcaption className="text-xs leading-xs text-text-muted md:text-sm">
            {author}
            {role && ` · ${role}`}
          </figcaption>
        </div>
      </div>
      {action && <div className="flex shrink-0 flex-col *:w-full md:*:w-auto">{action}</div>}
    </figure>
  );
}
