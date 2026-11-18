import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * ProductLayout (template): the top of a product page (Paper PDP → Breadcrumb Row, Product Main).
 *   mobile:  gallery edge to edge, buy box under it (20px gutter); no breadcrumbs
 *   tablet:  breadcrumbs, then gallery and buy box stacked
 *   desktop: a 700px gallery beside the buy box
 * Everything after (benefits, details, reviews, rails) goes in `children`.
 */
export interface ProductLayoutProps extends ComponentProps<"div"> {
  breadcrumbs?: ReactNode;
  /** "‹ Back to results" on the right of the breadcrumbs. */
  backLink?: ReactNode;
  gallery: ReactNode;
  buyBox: ReactNode;
}

export function ProductLayout({ breadcrumbs, backLink, gallery, buyBox, className, children, ...props }: ProductLayoutProps) {
  return (
    <div data-slot="product-layout" className={cn("flex flex-col", className)} {...props}>
      {(breadcrumbs || backLink) && (
        <div className="hidden items-center justify-between gap-4 px-8 pb-5 md:flex xl:px-14 xl:pt-2 xl:pb-6">
          {breadcrumbs}
          {backLink}
        </div>
      )}
      <div className="flex flex-col md:gap-8 md:px-8 md:pb-14 xl:flex-row xl:items-start xl:gap-14 xl:px-14 xl:pb-18">
        <div className="min-w-0 xl:w-175 xl:shrink-0">{gallery}</div>
        <div className="min-w-0 px-5 pt-6 md:p-0 xl:flex-1">{buyBox}</div>
      </div>
      {children}
    </div>
  );
}
