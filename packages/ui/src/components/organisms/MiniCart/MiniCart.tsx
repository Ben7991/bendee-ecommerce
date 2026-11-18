"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, type MouseEvent, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Button, CountBadge, Eyebrow, Icon, IconButton } from "../../atoms";
import { FreeDeliveryBar, SuggestionRow, type SuggestionRowProps } from "../../molecules";
import { CartLine, type CartLineData } from "../CartLine";
import { EmptyState, type EmptyStateProps } from "../EmptyState";

export interface MiniCartTotals {
  subtotalLabel: string;
  subtotal: string;
  discountLabel?: string;
  discount?: string;
  /** e.g. "Delivery · East Legon, tomorrow". */
  deliveryLabel: string;
  delivery: string;
  total: string;
  taxNote: string;
}

/**
 * MiniCart (organism): the bag button and the cart panel it opens, on Radix Dialog.
 *   mobile 390:    bottom sheet (124px from the top) with a grab handle
 *   tablet/desktop: 440 / 460px drawer from the right
 * With no `items` it shows the empty state and `suggestions`. Drop it into SiteHeader's `bag`
 * slot. Quantity and remove are wired by the app through `onQuantityChange` / `onRemove`.
 */
export interface MiniCartProps {
  items: CartLineData[];
  images?: Record<string, ReactNode>;
  totals?: MiniCartTotals;
  freeDelivery?: { message: ReactNode; value: number };
  /** Confirmation strip, e.g. <><strong>Daily Greens Powder</strong> added to your cart</>. */
  added?: ReactNode;
  /** Number on the bag button (usually the item count). */
  count?: number;
  cartHref?: string;
  checkoutHref?: string;
  empty?: Pick<EmptyStateProps, "title" | "description" | "primaryAction" | "secondaryAction" | "note">;
  suggestions?: Omit<SuggestionRowProps, "linkAs">[];
  suggestionsTitle?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  linkAs?: LinkComponent;
  triggerClassName?: string;
  className?: string;
}

export function MiniCart({
  items,
  images = {},
  totals,
  freeDelivery,
  added,
  count = items.length,
  cartHref = "/cart",
  checkoutHref = "/checkout",
  empty,
  suggestions = [],
  suggestionsTitle = "Popular right now",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  onQuantityChange,
  onRemove,
  linkAs: Link = "a",
  triggerClassName,
  className,
}: MiniCartProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = openProp ?? uncontrolled;
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setUncontrolled(next);
    onOpenChange?.(next);
  };
  const isEmpty = items.length === 0;
  // Following any link inside the panel closes it (the app's router handles the navigation).
  const closeOnLink = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a[href]")) setOpen(false);
  };
  const row = "flex justify-between gap-3 text-sm leading-xs";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <IconButton variant="solid" label={count ? `Bag, ${count} items` : "Bag"} className={triggerClassName}>
          <Icon name="bag" />
          <CountBadge count={count} />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          data-slot="mini-cart-overlay"
          className="fixed inset-0 z-50 bg-evergreen-950/55 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65"
        />
        <Dialog.Content
          data-slot="mini-cart"
          aria-describedby={undefined}
          onClick={closeOnLink}
          className={cn(
            "fixed inset-x-0 top-31 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-2xl bg-bg font-sans text-text shadow-panel-up outline-none dark:bg-surface",
            "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
            "md:inset-y-0 md:right-0 md:left-auto md:w-110 md:rounded-l-2xl md:rounded-tr-none md:shadow-panel-left xl:w-115",
            "md:data-[state=closed]:animate-panel-out md:data-[state=open]:animate-panel-in",
            className,
          )}
        >
          <span aria-hidden className="absolute top-2 left-1/2 h-1.25 w-10 -translate-x-1/2 rounded-full bg-border md:hidden" />

          <div className="flex shrink-0 items-center justify-between px-5 pt-5 pb-4 md:px-6 md:pt-6">
            <Dialog.Title className="flex items-baseline gap-2">
              <span className="text-2xl leading-2xl font-medium tracking-snug text-text">Your cart</span>
              <span className="text-sm leading-xs text-text-muted">
                {count} {count === 1 ? "item" : "items"}
              </span>
            </Dialog.Title>
            <Dialog.Close asChild>
              <IconButton label="Close cart" size="md" className="size-10">
                <Icon name="close" size={16} />
              </IconButton>
            </Dialog.Close>
          </div>

          {isEmpty ? (
            <div className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto px-5 pb-6 md:px-6">
              {empty && (
                <EmptyState
                  size="panel"
                  icon="bagLeaf"
                  linkAs={Link}
                  {...empty}
                />
              )}
              {suggestions.length > 0 && (
                <section aria-labelledby="mini-cart-suggestions" className="flex flex-col gap-3 border-t border-border-subtle pt-5">
                  <Eyebrow size="sm" id="mini-cart-suggestions">
                    {suggestionsTitle}
                  </Eyebrow>
                  {suggestions.map((suggestion) => (
                    <SuggestionRow key={suggestion.href} linkAs={Link} {...suggestion} />
                  ))}
                </section>
              )}
            </div>
          ) : (
            <>
              {added && (
                <p
                  role="status"
                  className="mx-5 flex shrink-0 items-center gap-3 rounded-md bg-primary px-4 py-3 text-sm leading-sm text-text-inverse md:mx-6 [&_strong]:font-semibold"
                >
                  <span aria-hidden className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <Icon name="check" size={12} strokeWidth={3} />
                  </span>
                  <span className="flex-1">{added}</span>
                </p>
              )}

              <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 pt-4 md:px-6">
                {freeDelivery && <FreeDeliveryBar variant="inline" message={freeDelivery.message} value={freeDelivery.value} />}
                <ul aria-label="Items in your cart">
                  {items.map((item) => (
                    <li key={item.id} className="border-b border-border-subtle last:border-b-0">
                      <CartLine
                        item={item}
                        image={images[item.id]}
                        layout="compact"
                        dense
                        linkAs={Link}
                        onQuantityChange={(quantity) => onQuantityChange?.(item.id, quantity)}
                        onRemove={() => onRemove?.(item.id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {totals && (
                <div className="flex shrink-0 flex-col gap-3 border-t border-border-subtle bg-surface-subtle px-5 pt-5 pb-8 md:px-6 md:pb-6">
                  <dl className="flex flex-col gap-3">
                    <div className={row}>
                      <dt className="text-text-secondary">{totals.subtotalLabel}</dt>
                      <dd className="text-text">{totals.subtotal}</dd>
                    </div>
                    {totals.discount && (
                      <div className={row}>
                        <dt className="text-text-secondary">{totals.discountLabel}</dt>
                        <dd className="font-semibold text-brand">{totals.discount}</dd>
                      </div>
                    )}
                    <div className={row}>
                      <dt className="text-text-secondary">{totals.deliveryLabel}</dt>
                      <dd className={cn("font-semibold", totals.delivery === "Free" ? "text-brand" : "text-text")}>{totals.delivery}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 border-t border-border pt-2">
                      <dt className="text-md leading-sm font-semibold text-text">Total</dt>
                      <dd className="text-2xl leading-2xl font-medium tracking-snug text-text">{totals.total}</dd>
                    </div>
                  </dl>
                  <p className="text-xs leading-xs text-text-muted">{totals.taxNote}</p>
                  <div className="flex gap-3 pt-2">
                    <Button asChild size="md" variant="secondary" className="h-11.5 basis-5/12">
                      <Link href={cartHref}>View cart</Link>
                    </Button>
                    <Button asChild size="md" className="h-11.5 basis-7/12">
                      <Link href={checkoutHref}>
                        <Icon name="padlock" size={16} />
                        Checkout
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
