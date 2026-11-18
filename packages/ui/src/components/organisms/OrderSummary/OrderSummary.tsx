import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Button, Icon } from "../../atoms";
import { PaymentMethods } from "../../molecules";

export interface OrderTotals {
  /** e.g. "Subtotal · 4 items". */
  subtotalLabel: string;
  /** Pre-formatted money: "GHS 1,394.00". */
  subtotal: string;
  /** e.g. "Discount (JOFAK10)". */
  discountLabel?: string;
  /** e.g. "− GHS 139.40". */
  discount?: string;
  /** e.g. "Free" or "GHS 25.00". */
  delivery: string;
  total: string;
  /** e.g. "Includes VAT & levies of GHS 225.40". */
  taxNote: string;
  /** e.g. "You save GHS 425.40". */
  savings?: string;
}

/**
 * OrderSummary (organism): the cart's summary card: discount code and delivery (as slots),
 * totals, the checkout button and payment methods.
 *   mobile: one column, no checkout button (the page shows a sticky CheckoutBar)
 *   tablet: two columns (code + delivery | totals + checkout)
 *   desktop: the 440px sidebar
 */
export interface OrderSummaryProps extends Omit<ComponentProps<"section">, "title"> {
  totals: OrderTotals;
  /** Usually an <AppliedCode> (or a code entry form). */
  discount?: ReactNode;
  /** Usually a <DeliveryCard>. */
  delivery?: ReactNode;
  checkoutHref: string;
  checkoutLabel?: string;
  title?: string;
  linkAs?: LinkComponent;
}

export function OrderSummary({
  totals,
  discount,
  delivery,
  checkoutHref,
  checkoutLabel = "Checkout securely",
  title = "Order summary",
  linkAs: Link = "a",
  className,
  ...props
}: OrderSummaryProps) {
  const row = "flex justify-between gap-3 text-base leading-4.5";
  return (
    <section
      data-slot="order-summary"
      aria-labelledby="order-summary-title"
      className={cn(
        "flex flex-col gap-5 rounded-lg border border-border-subtle bg-surface-subtle p-5 font-sans",
        "md:flex-row md:items-start md:gap-8 md:rounded-2xl md:p-6",
        "xl:w-110 xl:shrink-0 xl:flex-col xl:items-stretch xl:gap-5 xl:p-8",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-5 md:flex-1 xl:contents">
        <h2 id="order-summary-title" className="text-2xl leading-2xl font-medium tracking-snug text-text md:leading-8">
          {title}
        </h2>
        {discount}
        {delivery}
      </div>

      <div className="flex flex-col gap-5 md:flex-1 xl:contents">
        <dl className="flex flex-col gap-3 pt-2">
          <div className={row}>
            <dt className="text-text-secondary">{totals.subtotalLabel}</dt>
            <dd className="font-medium text-text">{totals.subtotal}</dd>
          </div>
          {totals.discount && (
            <div className={row}>
              <dt className="text-text-secondary">{totals.discountLabel}</dt>
              <dd className="font-medium text-success">{totals.discount}</dd>
            </div>
          )}
          <div className={row}>
            <dt className="text-text-secondary">Delivery</dt>
            <dd className={cn("font-semibold", totals.delivery === "Free" ? "text-success" : "text-text")}>{totals.delivery}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-t border-border pt-4">
            <dt className="text-xl leading-base font-semibold text-text">Total</dt>
            <dd className="text-3xl leading-3xl font-medium tracking-tight text-text xl:leading-10">{totals.total}</dd>
          </div>
          <div className="flex justify-between gap-3 text-xs leading-xs md:flex-col md:items-start md:gap-1 xl:flex-row xl:items-center xl:gap-3">
            <dt className="sr-only">Tax and savings</dt>
            <dd className="text-text-muted">{totals.taxNote}</dd>
            {totals.savings && <dd className="font-semibold text-success">{totals.savings}</dd>}
          </div>
        </dl>
        <Button asChild size="xl" className="hidden h-14 w-full md:inline-flex">
          <Link href={checkoutHref}>
            <Icon name="padlock" size={18} />
            {checkoutLabel}
          </Link>
        </Button>
        <PaymentMethods />
      </div>
    </section>
  );
}
