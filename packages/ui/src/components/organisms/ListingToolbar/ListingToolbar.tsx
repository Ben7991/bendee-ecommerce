import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * ListingToolbar (organism): the bar above the product grid (Paper PLP → Toolbar).
 *   mobile:  sticky; Filters + sort buttons side by side, then "41 results" and the applied chips
 *   tablet:  Filters on the left, sort on the right; "Showing 1–24 of 41", chips and Clear all below
 *   desktop: one row, "Showing 1–24 of 41" and chips on the left, sort on the right (the
 *            filters are in the sidebar)
 */
export interface ListingToolbarProps extends ComponentProps<"div"> {
  /** Range shown, e.g. "1–24". */
  range: string;
  total: number;
  /** Replaces "Showing 1–24 of 41" from 768px, e.g. "Showing 8 results". */
  summary?: ReactNode;
  /** FilterDialog (its trigger hides itself on desktop). */
  filters?: ReactNode;
  /** Sort control from 768px (PillSelect inline). */
  sort?: ReactNode;
  /** Sort control on mobile (PillSelect block). */
  compactSort?: ReactNode;
  /** Applied FilterChips. */
  chips?: ReactNode;
  /** "Clear all" (tablet only; on desktop it sits in the sidebar). */
  clearAction?: ReactNode;
}

export function ListingToolbar({ range, total, summary, filters, sort, compactSort, chips, clearAction, className, ...props }: ListingToolbarProps) {
  return (
    <div
      data-slot="listing-toolbar"
      className={cn(
        "sticky top-0 z-30 flex flex-col gap-3 border-b border-border-subtle bg-bg px-5 pt-4 pb-3 font-sans",
        "md:static md:gap-4 md:px-0 md:pt-0 md:pb-4 xl:flex-row xl:items-center xl:justify-between xl:gap-6",
        className,
      )}
      {...props}
    >
      <div className="flex gap-2 md:items-center md:justify-between xl:order-2">
        {filters && <div className="flex-1 md:flex-none xl:hidden">{filters}</div>}
        {compactSort && <div className="flex-1 md:hidden">{compactSort}</div>}
        {sort && <div className="hidden md:block">{sort}</div>}
      </div>

      <div className="flex min-w-0 items-center justify-between gap-3 md:justify-start xl:order-1">
        <p className="shrink-0 text-sm leading-xs text-text-muted xl:text-base xl:leading-4.5">
          <span className="md:hidden">
            <strong className="font-semibold text-text">{total}</strong> results
          </span>
          <span className="hidden md:inline [&_strong]:font-semibold [&_strong]:text-text">
            {summary ?? (
              <>
                Showing <strong>{range}</strong> of <strong>{total}</strong>
              </>
            )}
          </span>
        </p>
        {chips && (
          <>
            <span aria-hidden className="hidden h-4.5 w-px shrink-0 bg-border-subtle md:block xl:h-5" />
            <div className="scrollbar-none flex min-w-0 gap-1.5 overflow-x-auto md:gap-3">{chips}</div>
          </>
        )}
        {clearAction && <div className="hidden shrink-0 md:block xl:hidden">{clearAction}</div>}
      </div>
    </div>
  );
}
