"use client";

import { useId, useRef, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

export interface SortOption {
  value: string;
  label: string;
}

/**
 * FilterBar (organism): search, filter pills and sort above an admin list (Paper Jofak - Admin →
 * Orders filter bar). One GET form, so the query and sort land in the URL. One row from 1440px;
 * search on its own row on tablet; on mobile the pills and sort fold behind a filter button that
 * shows how many filters are applied. Pass FilterButtons as children.
 */
export interface FilterBarProps extends Omit<ComponentProps<"form">, "children"> {
  /** Accessible name of the search input. */
  searchLabel?: string;
  placeholder?: string;
  /** Shorter placeholder below 768px. */
  compactPlaceholder?: string;
  defaultQuery?: string;
  queryName?: string;
  /** FilterButtons. */
  children?: ReactNode;
  appliedCount?: number;
  sort?: { name?: string; options: SortOption[]; defaultValue?: string };
  /** Hidden inputs to keep (the saved view). */
  keep?: Record<string, string>;
}

export function FilterBar({
  searchLabel = "Search",
  placeholder = "Search",
  compactPlaceholder,
  defaultQuery,
  queryName = "q",
  children,
  appliedCount = 0,
  sort,
  keep = {},
  method = "get",
  className,
  ...props
}: FilterBarProps) {
  const [open, setOpen] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const filtersId = useId();
  const sortId = useId();

  return (
    <form
      ref={form}
      data-slot="filter-bar"
      role="search"
      method={method}
      className={cn("flex flex-col gap-3 font-sans xl:flex-row xl:items-center xl:gap-2", className)}
      {...props}
    >
      {Object.entries(keep).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <div className="flex gap-2 xl:w-85 xl:shrink-0">
        <label className="relative flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-full border border-border px-3.5 focus-within:border-brand md:h-10">
          <Icon name="search" size={16} strokeWidth={1.5} className="text-text-muted" />
          {/* One input; the placeholder is drawn below so it can be shorter on mobile. */}
          <input
            type="search"
            name={queryName}
            defaultValue={defaultQuery}
            placeholder=" "
            aria-label={searchLabel}
            className="peer min-w-0 flex-1 bg-transparent text-14 leading-sm text-text outline-none"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-3.5 left-10 hidden items-center truncate text-14 leading-sm text-text-muted peer-placeholder-shown:flex md:peer-placeholder-shown:hidden"
          >
            {compactPlaceholder ?? placeholder}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-3.5 left-10 hidden items-center truncate text-14 leading-sm text-text-muted md:peer-placeholder-shown:flex"
          >
            {placeholder}
          </span>
        </label>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={filtersId}
          aria-label={appliedCount ? `Filters, ${appliedCount} applied` : "Filters"}
          className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-text transition-colors hover:bg-surface-subtle md:hidden"
        >
          <Icon name="filter" size={18} />
          {appliedCount > 0 && (
            <span
              aria-hidden
              className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1.25 text-10 leading-3 font-bold text-text-inverse"
            >
              {appliedCount}
            </span>
          )}
        </button>
      </div>

      <div id={filtersId} className={cn("flex-1 flex-wrap items-center gap-2 md:flex", open ? "flex" : "hidden")}>
        {children}
        {sort && (
          <label htmlFor={sortId} className="relative ml-auto flex items-center gap-1.5 text-sm leading-sm">
            <span className="text-text-muted">Sort by</span>
            <select
              id={sortId}
              name={sort.name ?? "sort"}
              defaultValue={sort.defaultValue}
              onChange={() => form.current?.requestSubmit()}
              className="cursor-pointer appearance-none bg-transparent pr-4.5 font-semibold text-text outline-none field-sizing-content"
            >
              {sort.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon name="chevronDown" size={12} strokeWidth={2.2} className="pointer-events-none absolute right-0 text-text-muted" />
          </label>
        )}
      </div>
    </form>
  );
}
