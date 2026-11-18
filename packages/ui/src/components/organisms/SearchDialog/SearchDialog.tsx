"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, type MouseEvent, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Button, formatPrice, Icon, IconButton } from "../../atoms";
import { CategoryTile, SearchField, type CategoryTileProps } from "../../molecules";

const THUMB_TINTS = {
  sage: "bg-sage-100",
  amber: "bg-tint-amber",
  lavender: "bg-tint-lavender",
  sun: "bg-tint-sun",
} as const;

export interface SearchDialogProduct {
  id: string;
  name: string;
  href: string;
  /** "Stress & vitality · ★ 4.8". */
  meta: string;
  price: number;
  compareAt?: number;
  soldOut?: boolean;
  tint: keyof typeof THUMB_TINTS;
  /** Extra words this product should match ("stress", "sleep"). */
  keywords?: string[];
}

export interface SearchDialogCategory {
  label: string;
  href: string;
  count: number;
  tint: CategoryTileProps["tint"];
  keywords?: string[];
}

/**
 * SearchDialog (organism): the search overlay (Paper Search overlay), on Radix Dialog.
 * Typing narrows the suggestions (the typed part muted, the rest bold), products and categories it
 * was given; Enter or "See all results" goes to `action?q=…`. Recent searches can be removed.
 *   mobile:  full screen with Cancel
 *   tablet:  a panel from the top; suggestions beside products, categories underneath
 *   desktop: suggestions · products · categories in three columns
 * The trigger is the header's search button (`trigger="icon"`) or a search-bar lookalike
 * (`trigger="bar"`).
 */
export interface SearchDialogProps {
  suggestions: string[];
  recent?: string[];
  products: SearchDialogProduct[];
  categories: SearchDialogCategory[];
  /** Product thumbnails keyed by product id. */
  images?: Record<string, ReactNode>;
  action?: string;
  placeholder?: string;
  trigger?: "icon" | "bar";
  triggerClassName?: string;
  linkAs?: LinkComponent;
}

const heading = "font-sans text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase";
const matches = (query: string, ...texts: (string | undefined)[]) => texts.some((text) => text?.toLowerCase().includes(query));

export function SearchDialog({
  suggestions,
  recent: recentProp = [],
  products,
  categories,
  images = {},
  action = "/search",
  placeholder = "Search supplements…",
  trigger = "icon",
  triggerClassName,
  linkAs: Link = "a",
}: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(recentProp);
  const q = query.trim().toLowerCase();
  const hrefFor = (term: string) => `${action}?q=${encodeURIComponent(term)}`;

  const shownSuggestions = q ? suggestions.filter((suggestion) => suggestion.toLowerCase().startsWith(q)).slice(0, 4) : [];
  const shownProducts = (q ? products.filter((product) => matches(q, product.name, product.meta, ...(product.keywords ?? []))) : products).slice(0, 4);
  const shownCategories = (q ? categories.filter((category) => matches(q, category.label, ...(category.keywords ?? []))) : categories).slice(0, 3);

  // Following a link inside the dialog closes it.
  const closeOnLink = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {trigger === "icon" ? (
          <IconButton label="Search" className={cn("data-[state=open]:border-brand data-[state=open]:bg-sage-100", triggerClassName)}>
            <Icon name="search" />
          </IconButton>
        ) : (
          <button
            type="button"
            className={cn(
              "flex h-11 w-full items-center gap-3 rounded-full border border-border bg-bg px-4 text-left font-sans text-base leading-4.5 text-text-muted",
              triggerClassName,
            )}
          >
            <Icon name="search" className="text-text-muted" />
            {placeholder}
          </button>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-evergreen-950/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65" />
        <Dialog.Content
          data-slot="search-dialog"
          aria-describedby={undefined}
          onClick={closeOnLink}
          className={cn(
            "fixed inset-0 z-50 overflow-y-auto bg-bg font-sans text-text outline-none data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
            "md:bottom-auto md:max-h-dvh md:rounded-b-2xl md:shadow-modal",
          )}
        >
          <Dialog.Title className="sr-only">Search</Dialog.Title>
          <div className="mx-auto flex w-full max-w-360 flex-col">
            <div className="flex items-center gap-2.5 border-b border-border-subtle px-5 pt-3 pb-3.5 md:border-0 md:px-8 md:pt-6 md:pb-0 xl:px-14 xl:pt-8">
              <SearchField
                action={action}
                placeholder={placeholder}
                value={query}
                onValueChange={setQuery}
                autoFocus
                clearClassName="md:hidden"
                className="h-12 min-w-0 flex-1 pr-1.5 pl-4 md:h-16 md:pr-3 md:pl-6"
                trailing={
                  <>
                    <kbd className="hidden rounded-6 border border-border px-2 py-1 font-sans text-xs leading-xs font-semibold text-text-muted md:inline">
                      Esc
                    </kbd>
                    <Dialog.Close asChild>
                      <IconButton label="Close search" variant="plain" className="hidden size-10 bg-surface hover:bg-sage-100 md:inline-flex">
                        <Icon name="close" size={14} strokeWidth={2.4} />
                      </IconButton>
                    </Dialog.Close>
                  </>
                }
              />
              <Dialog.Close className="shrink-0 rounded-sm text-base leading-sm font-semibold text-text md:hidden">Cancel</Dialog.Close>
            </div>

            <div className="flex flex-col gap-5.5 px-5 py-4 md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-6 md:px-8 md:pt-6 md:pb-8 xl:flex-nowrap xl:gap-10 xl:px-14">
              {(shownSuggestions.length > 0 || recent.length > 0) && (
                <div className="flex flex-col gap-1.5 md:w-55 md:shrink-0 xl:w-65">
                  {shownSuggestions.length > 0 && (
                    <section aria-label="Suggestions" className="flex flex-col md:gap-1.5">
                      <h2 className={cn(heading, "hidden pb-1.5 md:block")}>Suggestions</h2>
                      <ul className="flex flex-col md:gap-1.5">
                        {shownSuggestions.map((suggestion, index) => (
                          <li key={suggestion} className="flex items-center border-b border-border-subtle md:border-0">
                            <Link
                              href={hrefFor(suggestion)}
                              className={cn(
                                "flex min-w-0 flex-1 items-center gap-2.5 py-3 text-base leading-sm text-text-muted md:rounded-sm md:px-3 md:py-2.25 md:hover:bg-surface-subtle",
                                index === 0 && "md:bg-surface-subtle",
                              )}
                            >
                              <Icon name="search" size={14} className="text-text-muted" />
                              <span className="truncate">
                                {suggestion.slice(0, q.length)}
                                <strong className="font-semibold text-text">{suggestion.slice(q.length)}</strong>
                              </span>
                            </Link>
                            <button
                              type="button"
                              aria-label={`Search for “${suggestion}”`}
                              onClick={() => setQuery(suggestion)}
                              className="flex size-8 shrink-0 items-center justify-center text-text-muted md:hidden"
                            >
                              <Icon name="arrowUpLeft" size={14} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                  {recent.length > 0 && (
                    <section aria-label="Recent searches" className={cn("flex flex-col gap-1.5", q && "hidden md:flex")}>
                      <h2 className={cn(heading, "pb-1.5 md:pt-4.5")}>Recent</h2>
                      <ul className="flex flex-col">
                        {recent.map((term) => (
                          <li key={term} className="flex items-center justify-between gap-2 md:px-3">
                            <Link href={hrefFor(term)} className="flex min-w-0 flex-1 items-center gap-2.5 py-2 text-base leading-sm text-text-secondary hover:text-text">
                              <Icon name="clock" size={14} className="text-text-muted" />
                              <span className="truncate">{term}</span>
                            </Link>
                            <button
                              type="button"
                              aria-label={`Remove “${term}” from recent searches`}
                              onClick={() => setRecent((items) => items.filter((item) => item !== term))}
                              className="flex size-6 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-surface"
                            >
                              <Icon name="close" size={12} strokeWidth={2.4} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              )}

              {shownProducts.length > 0 && (
                <section aria-label="Products" className="flex min-w-0 flex-col gap-1.5 md:flex-1">
                  <h2 className={cn(heading, "pb-1.5")}>Products</h2>
                  <ul className="flex flex-col gap-2 md:gap-1.5">
                    {shownProducts.map((product) => (
                      <li key={product.id}>
                        <Link href={product.href} className="flex items-center gap-3.5 rounded-md md:p-2 md:hover:bg-surface-subtle">
                          <span
                            className={cn(
                              "relative flex size-13 shrink-0 items-center justify-center overflow-hidden rounded-sm md:size-14",
                              product.soldOut ? "bg-surface opacity-60" : THUMB_TINTS[product.tint],
                            )}
                          >
                            <span className={cn("relative h-14 w-11 md:h-16 md:w-12", product.soldOut && "opacity-45")}>{images[product.id]}</span>
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <span className={cn("truncate text-base leading-sm font-semibold", product.soldOut ? "text-text-muted" : "text-text")}>
                              {product.name}
                            </span>
                            <span className="truncate text-sm leading-xs text-text-muted">
                              {product.soldOut ? "Sold out · notify me when back" : product.meta}
                            </span>
                          </span>
                          <span className="flex shrink-0 items-baseline gap-1.5">
                            <span className={cn("text-md leading-sm font-semibold", product.soldOut ? "text-text-muted" : "text-text")}>
                              {formatPrice(product.price)}
                            </span>
                            {product.compareAt !== undefined && product.compareAt > product.price && (
                              <s className="hidden text-xs leading-xs text-text-muted md:inline">
                                <span className="sr-only">was </span>
                                {formatPrice(product.compareAt)}
                              </s>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="flex flex-col gap-5.5 md:w-full md:gap-4 xl:w-75 xl:shrink-0 xl:gap-2.5">
                {shownCategories.length > 0 && (
                  <section aria-label="Categories" className="flex flex-col gap-2.5">
                    <h2 className={cn(heading, "xl:pb-0.5")}>Categories</h2>
                    <ul className="flex flex-wrap gap-2 md:flex-nowrap md:gap-2.5 xl:flex-col">
                      {shownCategories.map((category) => (
                        <li key={category.href} className="md:flex-1">
                          <CategoryTile
                            asChild
                            variant="row"
                            compactCount
                            tint={category.tint}
                            count={category.count}
                            className="md:flex-col md:items-start md:gap-0.5 md:px-4 md:py-3 xl:flex-row xl:items-center xl:py-3.5"
                          >
                            <Link href={category.href}>{category.label}</Link>
                          </CategoryTile>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {q && (
                  <Button asChild size="md" className="w-full gap-2 xl:mt-2">
                    <Link href={hrefFor(query.trim())}>
                      See all results for “{query.trim()}”
                      <Icon name="arrowRight" size={14} />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
