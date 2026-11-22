"use client";

import { useId, type ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

/** 1 2 3 … 129: the first pages near the start, then the current page with neighbours. */
function pageItems(page: number, pageCount: number): Array<number | "gap"> {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
  const pages = new Set([1, pageCount, page - 1, page, page + 1, ...(page <= 2 ? [2, 3] : [])]);
  const sorted = [...pages].filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b);
  return sorted.flatMap((n, index) => (index > 0 && n - sorted[index - 1]! > 1 ? (["gap", n] as const) : [n]));
}

/**
 * TablePagination (molecule): the footer of an admin table: "Showing 1–10 of 1,284", page links
 * (32px circles, 1 2 3 … 129) and an optional "Rows per page" select from 1440px. Pages are real
 * links. It renders several links, so unlike other molecules it takes the router link as `linkAs`.
 */
export interface TablePaginationProps extends Omit<ComponentProps<"nav">, "children"> {
  linkAs?: LinkComponent;
  page: number;
  pageCount: number;
  /** "1–10". */
  range: string;
  /** "1,284". */
  total: string;
  hrefFor: (page: number) => string;
  perPage?: { value: number; options: number[]; name?: string };
}

export function TablePagination({ linkAs: LinkAs = "a", page, pageCount, range, total, hrefFor, perPage, className, ...props }: TablePaginationProps) {
  const perPageId = useId();
  const arrow = (direction: "previous" | "next") => {
    const target = direction === "previous" ? page - 1 : page + 1;
    const icon = <Icon name={direction === "previous" ? "chevronLeft" : "chevronRight"} size={14} strokeWidth={2} />;
    const box = "flex size-8 items-center justify-center rounded-full";
    if (target < 1 || target > pageCount) {
      return (
        <span aria-hidden className={cn(box, "text-evergreen-300")}>
          {icon}
        </span>
      );
    }
    return (
      <LinkAs href={hrefFor(target)} aria-label={direction === "previous" ? "Previous page" : "Next page"} className={cn(box, "text-text transition-colors hover:bg-surface")}>
        {icon}
      </LinkAs>
    );
  };

  return (
    <nav
      data-slot="table-pagination"
      aria-label="Pagination"
      className={cn("flex items-center justify-between gap-4 border-t border-border-subtle bg-surface-subtle px-6 py-3.5 font-sans", className)}
      {...props}
    >
      <p className="text-sm leading-sm text-text-muted">
        Showing <strong className="font-semibold text-text">{range}</strong> of {total}
      </p>
      <ul className="flex items-center gap-1">
        <li>{arrow("previous")}</li>
        {pageItems(page, pageCount).map((item, index) =>
          item === "gap" ? (
            <li key={`gap-${index}`} aria-hidden className="flex size-8 items-center justify-center text-sm text-text-muted">
              …
            </li>
          ) : (
            <li key={item}>
              {item === page ? (
                <span aria-current="page" className="flex size-8 items-center justify-center rounded-full bg-primary text-sm leading-xs font-semibold text-text-inverse">
                  <span className="sr-only">Page </span>
                  {item}
                </span>
              ) : (
                <LinkAs
                  href={hrefFor(item)}
                  aria-label={`Page ${item}`}
                  className="flex size-8 items-center justify-center rounded-full text-sm leading-xs font-medium text-text-secondary transition-colors hover:bg-surface"
                >
                  {item}
                </LinkAs>
              )}
            </li>
          ),
        )}
        <li>{arrow("next")}</li>
      </ul>
      {perPage ? (
        <form method="get" className="relative hidden items-center gap-1.5 text-sm leading-sm xl:flex">
          <label htmlFor={perPageId} className="text-text-muted">
            Rows per page
          </label>
          <select
            id={perPageId}
            name={perPage.name ?? "limit"}
            defaultValue={perPage.value}
            onChange={(event) => event.currentTarget.form?.requestSubmit()}
            className="cursor-pointer appearance-none bg-transparent pr-4.5 font-semibold text-text outline-none field-sizing-content"
          >
            {perPage.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Icon name="chevronDown" size={12} strokeWidth={2.2} className="pointer-events-none absolute right-0 text-text-muted" />
        </form>
      ) : null}
    </nav>
  );
}
