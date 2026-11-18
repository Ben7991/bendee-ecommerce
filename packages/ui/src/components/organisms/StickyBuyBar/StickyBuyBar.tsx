import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { formatPrice } from "../../atoms";

/**
 * StickyBuyBar (organism): the PDP's buy bar fixed to the bottom of mobile screens: price, then
 * "Add to cart" and "Buy now" (Paper PDP — Mobile → Sticky Buy Bar). Hidden from 768px, where the
 * buy box has these. Leave about 96px under the page for it.
 */
export interface StickyBuyBarProps extends Omit<ComponentProps<"div">, "children"> {
  price: number;
  compareAt?: number;
  /** Two Buttons: secondary "Add to cart" and primary "Buy now" (each `flex-1`). */
  actions: ReactNode;
}

export function StickyBuyBar({ price, compareAt, actions, className, ...props }: StickyBuyBarProps) {
  const onSale = compareAt !== undefined && compareAt > price;
  return (
    <div
      data-slot="sticky-buy-bar"
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-border-subtle bg-bg px-5 pt-3 pb-8 font-sans shadow-bar md:hidden",
        className,
      )}
      {...props}
    >
      <p className="flex shrink-0 flex-col gap-0.5">
        <span className="text-xl leading-base font-semibold text-text">
          {onSale && <span className="sr-only">Now </span>}
          {formatPrice(price)}
        </span>
        {onSale && (
          <s className="text-xs leading-xs text-text-muted">
            <span className="sr-only">was </span>
            {formatPrice(compareAt)}
          </s>
        )}
      </p>
      <div className="flex min-w-0 flex-1 gap-3">{actions}</div>
    </div>
  );
}
