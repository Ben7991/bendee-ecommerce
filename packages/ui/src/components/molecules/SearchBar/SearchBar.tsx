import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Button, Icon } from "../../atoms";

/**
 * SearchBar (molecule): a pill search form that GETs `action?q=…`. The Search button shows
 * from 768px; on mobile Enter submits. Width: full on mobile, set it from 768px with className.
 */
export interface SearchBarProps extends Omit<ComponentProps<"form">, "children"> {
  action?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  defaultValue?: string;
}

export function SearchBar({
  action = "/search",
  name = "q",
  placeholder = "Search supplements, goals or ingredients",
  label = "Search the shop",
  defaultValue,
  className,
  ...props
}: SearchBarProps) {
  return (
    <form
      data-slot="search-bar"
      role="search"
      action={action}
      method="get"
      className={cn(
        "flex h-13 shrink-0 items-center gap-2.5 rounded-full border-field border-border bg-bg px-4.5 transition-colors",
        "focus-within:border-brand md:h-14.5 md:gap-3 md:pr-2 md:pl-5.5",
        className,
      )}
      {...props}
    >
      <Icon name="search" className="size-4.5 text-text-muted md:size-5" />
      <input
        type="search"
        name={name}
        aria-label={label}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-full w-0 min-w-0 flex-1 bg-transparent font-sans text-base leading-sm text-text outline-none placeholder:text-text-muted md:text-md"
      />
      <Button type="submit" size="xs" className="hidden px-5 py-2.75 md:inline-flex">
        Search
      </Button>
    </form>
  );
}
