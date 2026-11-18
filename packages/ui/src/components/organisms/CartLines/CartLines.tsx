import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { CartLine, type CartLineData } from "../CartLine";

/**
 * CartLines (organism): the cart's product list, with Product · Quantity · Total headings from
 * 768px. Mobile shows compact lines without the headings.
 */
export interface CartLinesProps extends Omit<ComponentProps<"div">, "children"> {
  items: CartLineData[];
  images?: Record<string, ReactNode>;
  linkAs?: LinkComponent;
}

export function CartLines({ items, images = {}, linkAs, className, ...props }: CartLinesProps) {
  return (
    <div data-slot="cart-lines" className={cn("flex flex-col xl:gap-5", className)} {...props}>
      <div
        aria-hidden
        className="hidden items-center gap-5 border-b border-border-subtle py-3 font-sans text-sm leading-xs font-semibold tracking-wide text-text-muted uppercase md:flex"
      >
        <span className="flex-1">Product</span>
        <span className="w-34 shrink-0">Quantity</span>
        <span className="w-27.5 shrink-0 text-right">Total</span>
      </div>
      <ul aria-label="Items in your cart">
        {items.map((item) => (
          <li key={item.id} className="border-b border-border-subtle last:border-b-0 md:last:border-b">
            <CartLine item={item} image={images[item.id]} linkAs={linkAs} />
          </li>
        ))}
      </ul>
    </div>
  );
}
