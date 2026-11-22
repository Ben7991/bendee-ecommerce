import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * ListingLayout (template): the body of a product listing (Paper PLP → Body).
 *   mobile/tablet: toolbar, results, then pagination or load-more
 *   desktop:       a 272px filter sidebar on the left of the same column
 * The toolbar is edge to edge on mobile (it is sticky); results and footer get the 20px gutter.
 */
export interface ListingLayoutProps extends ComponentProps<"div"> {
  /** FilterPanel, desktop only. */
  sidebar?: ReactNode;
  toolbar?: ReactNode;
  /** PaginationBar and/or LoadMore. */
  footer?: ReactNode;
}

export function ListingLayout({ sidebar, toolbar, footer, className, children, ...props }: ListingLayoutProps) {
  return (
    <div
      data-slot="listing-layout"
      className={cn("flex flex-col md:px-8 md:pt-8 md:pb-14 xl:flex-row xl:items-start xl:gap-10 xl:px-14 xl:pt-10 xl:pb-18", className)}
      {...props}
    >
      {sidebar && <aside className="hidden w-68 shrink-0 xl:block">{sidebar}</aside>}
      <div className="flex min-w-0 flex-1 flex-col md:gap-6">
        {toolbar}
        <div className="p-5 md:p-0">{children}</div>
        {footer && <div className="px-5 pt-4 pb-10 md:p-0">{footer}</div>}
      </div>
    </div>
  );
}
