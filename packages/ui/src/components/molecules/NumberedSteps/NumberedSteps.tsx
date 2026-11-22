import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/** NumberedSteps (molecule): a short numbered list on a soft panel ("1 Unlock your phone…"). */
export interface NumberedStepsProps extends Omit<ComponentProps<"div">, "title"> {
  items: ReactNode[];
  /** Small caps heading, e.g. "Usually one of these". */
  title?: string;
  /** Smaller text (mobile). */
  compact?: boolean;
  /** surface (default): a quiet box with ringed numbers. outline: a bordered card with a plain title and sage number discs ("How it works", subscriptions). */
  variant?: "surface" | "outline";
}

export function NumberedSteps({ items, title, compact = false, variant = "surface", className, ...props }: NumberedStepsProps) {
  const outline = variant === "outline";
  return (
    <div
      data-slot="numbered-steps"
      className={cn("flex flex-col font-sans", outline ? "gap-3.5 rounded-xl border border-border-subtle p-5.5" : "gap-3 rounded-md bg-surface-subtle p-5", className)}
      {...props}
    >
      {title && (
        <p className={outline ? "text-md leading-sm font-semibold text-text" : "text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase"}>{title}</p>
      )}
      <ol className={cn("flex flex-col", outline ? "gap-3.5" : "gap-3")}>
        {items.map((item, index) => (
          <li key={index} className={cn("flex gap-3", outline ? "items-start gap-2.5" : "items-center")}>
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-xs leading-xs",
                outline ? "bg-sage-100 font-semibold text-primary dark:text-text" : "border border-border bg-bg font-bold text-text",
              )}
            >
              {index + 1}
            </span>
            <span className={cn(outline ? "text-sm leading-sm text-text-secondary" : "text-text", !outline && (compact ? "text-sm leading-sm" : "text-base leading-sm"))}>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
