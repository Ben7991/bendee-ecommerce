"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { useId, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * FaqList (organism): the FAQ page body (Paper Content page → FAQ): a filter box over grouped
 * questions that open and close (Radix Accordion, several at once). Typing filters questions by
 * their text and `searchText`; groups with no match hide, and `emptyMessage` shows when nothing
 * is left. Open questions get a filled − button and a semibold title.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: ReactNode;
  /** Plain-text version of the answer (and synonyms) for the filter. */
  searchText?: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export interface FaqListProps extends Omit<ComponentProps<"section">, "children"> {
  groups: FaqGroup[];
  /** Ids of the questions open on load. */
  defaultOpen?: string[];
  placeholder?: string;
  /** Shorter placeholder below 768px. */
  compactPlaceholder?: string;
  /** Shown when the filter matches nothing. */
  emptyMessage?: ReactNode;
}

const matches = (item: FaqItem, query: string) =>
  `${item.question} ${item.searchText ?? ""}`.toLowerCase().includes(query);

export function FaqList({
  groups,
  defaultOpen = [],
  placeholder = 'Search questions, e.g. "refund" or "Kumasi"',
  compactPlaceholder = "Search questions",
  emptyMessage = "No questions match that. Try another word, or message us on WhatsApp.",
  className,
  ...props
}: FaqListProps) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const needle = query.trim().toLowerCase();
  const shown = groups
    .map((group) => ({ ...group, items: needle ? group.items.filter((item) => matches(item, needle)) : group.items }))
    .filter((group) => group.items.length > 0);

  return (
    <section data-slot="faq-list" aria-label="Frequently asked questions" className={cn("flex flex-col gap-8 font-sans md:gap-10", className)} {...props}>
      <div
        role="search"
        className="relative flex h-13 shrink-0 items-center gap-3 rounded-full border border-border bg-bg px-5 transition-colors focus-within:border-brand focus-within:ring-1 focus-within:ring-brand"
      >
        <Icon name="search" size={18} className="shrink-0 text-text-muted" />
        <label htmlFor={inputId} className="sr-only">
          Search questions
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
          className="h-full w-0 min-w-0 flex-1 bg-transparent text-md leading-base text-text outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
        {/* A responsive placeholder: the input's own can't change with the viewport. */}
        {!query && (
          <span aria-hidden className="pointer-events-none absolute top-1/2 left-12.5 -translate-y-1/2 truncate pr-5 text-md leading-base text-text-muted">
            <span className="md:hidden">{compactPlaceholder}</span>
            <span className="hidden md:inline">{placeholder}</span>
          </span>
        )}
      </div>

      <Accordion.Root type="multiple" value={open} onValueChange={setOpen} className="flex flex-col gap-8 md:gap-10">
        {shown.map((group) => (
          <div key={group.title} className="flex flex-col">
            <h2 className="pb-2 text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase">{group.title}</h2>
            {group.items.map((item) => (
              <Accordion.Item key={item.id} value={item.id} className="border-t border-border-subtle last:border-b">
                <Accordion.Header asChild>
                  <h3>
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-md leading-base font-medium text-text data-[state=open]:pb-2.5 data-[state=open]:font-semibold md:text-lg">
                      {item.question}
                      <span
                        aria-hidden
                        className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-colors group-hover:bg-surface-subtle group-data-[state=open]:border-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-on-primary dark:text-text"
                      >
                        <Icon name="plus" size={14} strokeWidth={2.4} className="group-data-[state=open]:hidden" />
                        <Icon name="minus" size={14} strokeWidth={2.4} className="hidden group-data-[state=open]:block" />
                      </span>
                    </Accordion.Trigger>
                  </h3>
                </Accordion.Header>
                <Accordion.Content className="pb-5 text-base leading-base text-text-secondary md:pr-12 md:text-md md:leading-6.5 [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-2 dark:[&_a]:text-text">
                  {item.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </div>
        ))}
      </Accordion.Root>

      {shown.length === 0 && (
        <p role="status" className="text-md leading-base text-text-secondary">
          {emptyMessage}
        </p>
      )}
    </section>
  );
}
