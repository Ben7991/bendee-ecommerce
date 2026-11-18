import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/** NumberedSteps (molecule): a short numbered list on a soft panel ("1 Unlock your phone…"). */
export interface NumberedStepsProps extends Omit<ComponentProps<"div">, "title"> {
  items: ReactNode[];
  /** Small caps heading, e.g. "Usually one of these". */
  title?: string;
  /** Smaller text (mobile). */
  compact?: boolean;
}

export function NumberedSteps({ items, title, compact = false, className, ...props }: NumberedStepsProps) {
  return (
    <div data-slot="numbered-steps" className={cn("flex flex-col gap-3 rounded-md bg-surface-subtle p-5 font-sans", className)} {...props}>
      {title && <p className="text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase">{title}</p>}
      <ol className="flex flex-col gap-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-xs leading-xs font-bold text-text">
              {index + 1}
            </span>
            <span className={cn("text-text", compact ? "text-sm leading-sm" : "text-base leading-sm")}>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
