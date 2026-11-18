"use client";

import { useRef, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Button, Icon } from "../../atoms";

/**
 * SearchField (molecule): the big evergreen-edged search box of the search page and overlay
 * (Paper Search → Search field). A GET form (`action?q=…`); × clears the text, and the Search
 * button shows from 768px when `submitLabel` is set. `trailing` goes before the × (e.g. an Esc
 * hint). For the compact header/hero search use SearchBar.
 */
export interface SearchFieldProps extends Omit<ComponentProps<"form">, "children" | "onChange"> {
  action?: string;
  name?: string;
  placeholder?: string;
  /** Accessible name of the input. */
  label?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  /** "Search": the submit button, from 768px. */
  submitLabel?: string;
  trailing?: ReactNode;
  autoFocus?: boolean;
  /** Classes for the × button (e.g. `md:hidden` when a close button takes its place). */
  clearClassName?: string;
}

export function SearchField({
  action = "/search",
  name = "q",
  placeholder = "Search supplements, goals or ingredients",
  label = "Search the shop",
  defaultValue = "",
  value: valueProp,
  onValueChange,
  submitLabel,
  trailing,
  autoFocus,
  clearClassName,
  className,
  ...props
}: SearchFieldProps) {
  const input = useRef<HTMLInputElement>(null);
  const [inner, setInner] = useState(defaultValue);
  const value = valueProp ?? inner;
  const set = (next: string) => {
    if (valueProp === undefined) setInner(next);
    onValueChange?.(next);
  };

  return (
    <form
      data-slot="search-field"
      role="search"
      action={action}
      method="get"
      className={cn(
        "flex h-13 shrink-0 items-center gap-2.5 rounded-full border-2 border-primary bg-bg pr-2 pl-4.5 font-sans transition-colors focus-within:border-brand",
        "md:h-16 md:gap-3.5 md:pr-2.5 md:pl-6",
        className,
      )}
      {...props}
    >
      <Icon name="search" size={22} className="size-4.5 text-text md:size-5.5" />
      <input
        ref={input}
        type="search"
        name={name}
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => set(event.target.value)}
        autoFocus={autoFocus}
        autoComplete="off"
        enterKeyHint="search"
        className="h-full w-0 min-w-0 flex-1 bg-transparent text-md leading-sm text-text outline-none placeholder:text-text-muted md:text-xl md:leading-2xl [&::-webkit-search-cancel-button]:appearance-none"
      />
      {trailing}
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            set("");
            input.current?.focus();
          }}
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full bg-surface text-text-muted transition-colors hover:bg-sage-100 hover:text-text",
            clearClassName,
          )}
        >
          <Icon name="close" size={14} strokeWidth={2.4} className="size-3 md:size-3.5" />
        </button>
      )}
      {submitLabel && (
        <Button type="submit" size="md" className="hidden px-6 py-3.25 leading-sm md:inline-flex">
          {submitLabel}
        </Button>
      )}
    </form>
  );
}
