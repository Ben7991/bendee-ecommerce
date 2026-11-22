import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * ReportCard (molecule): the shell of a report panel (Paper Jofak - Admin → Reports): a title,
 * an optional one-line explanation, an action (a link like "See all 10 ›" or chips) and the
 * content. `tone="muted"` is the soft grey panel (Cart reminders, Slow movers). Mobile tightens
 * the padding and radius.
 */
export interface ReportCardProps extends Omit<ComponentProps<"section">, "title"> {
  title: ReactNode;
  description?: ReactNode;
  /** Top right: a link or a toggle. */
  action?: ReactNode;
  tone?: "plain" | "muted";
  /** Keep the action under the title on mobile (chips). */
  stackAction?: boolean;
}

export function ReportCard({ title, description, action, tone = "plain", stackAction = false, className, children, ...props }: ReportCardProps) {
  return (
    <section
      data-slot="report-card"
      className={cn(
        "flex min-w-0 flex-col gap-3.5 rounded-18 p-4 font-sans md:gap-4 md:rounded-lg md:px-6 md:py-5",
        tone === "muted" ? "bg-surface-subtle" : "border border-border-subtle",
        className,
      )}
      {...props}
    >
      <div className={cn("flex justify-between gap-3", stackAction ? "flex-col md:flex-row md:items-start" : "items-start")}>
        <div className="flex min-w-0 flex-col gap-0.5 md:gap-1">
          <h2 className="text-base leading-5 font-semibold tracking-compact text-text md:text-17 md:leading-6">{title}</h2>
          {description && <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  );
}
