import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Button, Icon } from "../../atoms";

/**
 * CheckoutBar (organism): the "Total · Checkout" bar fixed to the bottom of the mobile cart.
 * Hidden from 768px. Leave room for it under the page (about 92px).
 */
export interface CheckoutBarProps extends Omit<ComponentProps<"div">, "children"> {
  /** e.g. "Total · 4 items". */
  label: string;
  total: string;
  checkoutHref: string;
  checkoutLabel?: string;
  linkAs?: LinkComponent;
}

export function CheckoutBar({ label, total, checkoutHref, checkoutLabel = "Checkout", linkAs: Link = "a", className, ...props }: CheckoutBarProps) {
  return (
    <div
      data-slot="checkout-bar"
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-border-subtle bg-bg px-5 pt-3 pb-8 font-sans shadow-bar md:hidden",
        className,
      )}
      {...props}
    >
      <p className="flex shrink-0 flex-col gap-0.5">
        <span className="text-xs leading-xs text-text-muted">{label}</span>
        <span className="text-xl leading-base font-semibold whitespace-pre text-text">{total}</span>
      </p>
      <Button asChild size="md" className="h-11.5 flex-1">
        <Link href={checkoutHref}>
          <Icon name="padlock" size={16} />
          {checkoutLabel}
        </Link>
      </Button>
    </div>
  );
}
