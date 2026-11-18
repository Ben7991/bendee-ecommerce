import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * SavedToolbar (organism): the bar above the favourites grid (Paper Favourites → Toolbar).
 *   mobile:  sticky; the action ("Add 5 to cart") and sort side by side, a short summary below
 *   tablet:  sort on the left, action on the right, the summary below
 *   desktop: summary on the left, sort and action on the right
 * For the shop's results bar (filters, applied chips) use ListingToolbar.
 */
export interface SavedToolbarProps extends ComponentProps<"div"> {
  /** "6 saved · 5 in stock · GHS 2,280 together" (from 768px). */
  summary: ReactNode;
  /** Mobile summary, e.g. "5 in stock · GHS 2,280 together". */
  compactSummary?: ReactNode;
  /** PillSelect inline (from 768px). */
  sort?: ReactNode;
  /** PillSelect block (mobile). */
  compactSort?: ReactNode;
  /** Primary button, full width on mobile. */
  action?: ReactNode;
}

export function SavedToolbar({ summary, compactSummary, sort, compactSort, action, className, ...props }: SavedToolbarProps) {
  return (
    <div
      data-slot="saved-toolbar"
      className={cn(
        "sticky top-0 z-30 flex flex-col gap-3 border-b border-border-subtle bg-bg px-5 pt-4 pb-3 font-sans",
        "md:static md:gap-4 md:px-0 md:pt-0 md:pb-4 xl:flex-row xl:items-center xl:justify-between xl:gap-6",
        className,
      )}
      {...props}
    >
      <div className="flex gap-2 md:items-center md:justify-between xl:order-2">
        {sort && <div className="hidden md:order-1 md:block">{sort}</div>}
        {compactSort && <div className="order-2 flex-1 md:hidden">{compactSort}</div>}
        {action && <div className="order-1 flex flex-1 md:order-2 md:flex-none">{action}</div>}
      </div>
      <p className="text-sm leading-xs text-text-muted xl:order-1 xl:text-base xl:leading-4.5 [&_strong]:font-semibold [&_strong]:text-text">
        {compactSummary ? (
          <>
            <span className="md:hidden">{compactSummary}</span>
            <span className="hidden md:inline">{summary}</span>
          </>
        ) : (
          summary
        )}
      </p>
    </div>
  );
}
