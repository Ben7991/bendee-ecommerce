import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * PaginationBar (organism): "Page 1 of 2", numbered page links and a per-page picker under the
 * grid (tablet and desktop; mobile uses LoadMore). Pages are real links (`hrefFor`) so crawlers
 * can follow them. Long ranges collapse to 1 … 4 5 6 … 12.
 */
export interface PaginationBarProps extends ComponentProps<"nav"> {
  page: number;
  pageCount: number;
  hrefFor: (page: number) => string;
  /** "Show [24] per page": a PillSelect from the app. */
  perPage?: ReactNode;
  linkAs?: LinkComponent;
}

const circle = "flex size-11 shrink-0 items-center justify-center rounded-full font-sans text-base leading-4.5 transition-colors";

export function PaginationBar({ page, pageCount, hrefFor, perPage, linkAs: Link = "a", className, ...props }: PaginationBarProps) {
  const arrow = (direction: "previous" | "next") => {
    const target = direction === "previous" ? page - 1 : page + 1;
    const icon = <Icon name={direction === "previous" ? "chevronLeft" : "chevronRight"} size={16} />;
    const label = direction === "previous" ? "Previous page" : "Next page";
    if (target < 1 || target > pageCount) {
      return (
        <span aria-hidden className={cn(circle, "border border-border text-text opacity-50")}>
          {icon}
        </span>
      );
    }
    return (
      <Link href={hrefFor(target)} aria-label={label} className={cn(circle, "border border-border text-text hover:bg-surface-subtle")}>
        {icon}
      </Link>
    );
  };

  return (
    <nav
      data-slot="pagination-bar"
      aria-label="Pagination"
      className={cn("hidden items-center justify-between gap-4 border-t border-border-subtle pt-8 md:mt-4 md:flex", className)}
      {...props}
    >
      <p className="font-sans text-sm leading-xs text-text-muted">
        Page {page} of {pageCount}
      </p>
      <ul className="flex items-center gap-2">
        <li>{arrow("previous")}</li>
        {pageItems(page, pageCount).map((item, index) =>
          item === "gap" ? (
            <li key={`gap-${index}`} aria-hidden className={cn(circle, "text-text-muted")}>
              …
            </li>
          ) : (
            <li key={item}>
              {item === page ? (
                <span aria-current="page" className={cn(circle, "bg-primary font-semibold text-text-inverse")}>
                  <span className="sr-only">Page {item}, current page</span>
                  <span aria-hidden>{item}</span>
                </span>
              ) : (
                <Link href={hrefFor(item)} aria-label={`Page ${item}`} className={cn(circle, "font-medium text-text hover:bg-surface")}>
                  {item}
                </Link>
              )}
            </li>
          ),
        )}
        <li>{arrow("next")}</li>
      </ul>
      <div className="flex items-center gap-2 font-sans text-sm leading-xs text-text-muted">
        {perPage && (
          <>
            <span aria-hidden>Show</span>
            {perPage}
            <span aria-hidden>per page</span>
          </>
        )}
      </div>
    </nav>
  );
}

/** 1 … 4 5 6 … 12: first, last, and the current page with one neighbour each side. */
function pageItems(page: number, pageCount: number): Array<number | "gap"> {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
  const pages = new Set([1, pageCount, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pageCount));
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((n, index) => (index > 0 && n - sorted[index - 1]! > 1 ? (["gap", n] as const) : [n]));
}
