import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * ListSearch (molecule): the search above a simple admin list ("Name, phone or email", Paper
 * Jofak - Admin → Customers) with a Filters link. A GET form, so the query lands in the URL.
 * From 768px Filters is its own pill beside the field; on mobile it is an icon inside the field.
 * For lists with filter pills and sort, use FilterBar. Takes the router link as `linkAs` (two
 * links, like TablePagination).
 */
export interface ListSearchProps extends Omit<ComponentProps<"form">, "children"> {
  linkAs?: LinkComponent;
  /** Accessible name of the input. */
  label?: string;
  placeholder?: string;
  defaultQuery?: string;
  queryName?: string;
  /** Where Filters goes; no link, no Filters. */
  filtersHref?: string;
  /** Hidden inputs to keep (the saved view). */
  keep?: Record<string, string>;
  /** Classes for the field (its width from 1440px, say `xl:w-70`). */
  fieldClassName?: string;
}

export function ListSearch({
  linkAs: LinkAs = "a",
  label = "Search",
  placeholder = "Search",
  defaultQuery,
  queryName = "q",
  filtersHref,
  keep = {},
  fieldClassName,
  method = "get",
  className,
  ...props
}: ListSearchProps) {
  return (
    <form data-slot="list-search" role="search" method={method} className={cn("flex gap-2 font-sans", className)} {...props}>
      {Object.entries(keep).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <label
        className={cn(
          "flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-full border border-border px-4 focus-within:border-brand md:h-10 md:px-3.5 xl:h-9.5 xl:flex-none",
          fieldClassName,
        )}
      >
        <Icon name="search" size={16} strokeWidth={1.5} className="text-text-muted md:size-3.75" />
        <input
          type="search"
          name={queryName}
          defaultValue={defaultQuery}
          placeholder={placeholder}
          aria-label={label}
          className="min-w-0 flex-1 bg-transparent text-14 leading-sm text-text outline-none placeholder:text-text-muted md:text-sm md:leading-4"
        />
        {filtersHref && (
          <LinkAs href={filtersHref} aria-label="Filters" className="text-text hover:text-brand md:hidden">
            <Icon name="filter" size={16} strokeWidth={1.5} />
          </LinkAs>
        )}
      </label>
      {filtersHref && (
        <LinkAs
          href={filtersHref}
          className="hidden h-10 shrink-0 items-center gap-2 rounded-full border border-border px-3.5 text-sm leading-4 font-semibold text-text hover:bg-surface-subtle md:flex xl:h-9.5"
        >
          <Icon name="filter" size={14} strokeWidth={1.5} />
          Filters
        </LinkAs>
      )}
    </form>
  );
}
