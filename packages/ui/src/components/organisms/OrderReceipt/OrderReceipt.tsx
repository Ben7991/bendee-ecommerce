import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { PaymentBadge, TextLink, type PaymentBrand } from "../../atoms";
import { OrderItemRow, type OrderItemRowProps } from "../../molecules";

/**
 * OrderReceipt (organism): what was ordered, where it's going and how it was paid
 * (order confirmation).
 *   768 up: "Delivering to" and "Payment" cards side by side, then the items card
 *   mobile: one card of label/value rows ending in "Total paid"
 */
export interface OrderReceiptProps extends Omit<ComponentProps<"div">, "children"> {
  delivery: { name: string; phone: string; address: string; landmark?: string; method: string; short: string };
  payment: { brand: PaymentBrand; label: string; amount: string; when: string; note?: string; short: string };
  items: Array<Omit<OrderItemRowProps, "image"> & { id: string; image?: ReactNode }>;
  /** e.g. "In this order · 4 items". */
  itemsTitle: string;
  /** Mobile items value, e.g. "4 items". */
  itemsShort: string;
  /** e.g. "Subtotal GHS 1,394.00 · JOFAK10 −GHS 139.40 · Delivery free". */
  totalsLine: string;
  total: string;
  receiptHref?: string;
  itemsHref?: string;
  linkAs?: LinkComponent;
}

const card = "flex flex-col rounded-lg border border-border-subtle bg-bg font-sans";
const caps = "text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase";

export function OrderReceipt({
  delivery,
  payment,
  items,
  itemsTitle,
  itemsShort,
  totalsLine,
  total,
  receiptHref,
  itemsHref,
  linkAs: Link = "a",
  className,
  ...props
}: OrderReceiptProps) {
  const row = "flex justify-between gap-3 text-sm leading-sm";
  return (
    <div data-slot="order-receipt" className={cn("flex flex-col gap-3 md:w-full md:gap-6", className)} {...props}>
      {/* Mobile */}
      <dl className={cn(card, "gap-3 rounded-md p-5 md:hidden")}>
        <div className={row}>
          <dt className="text-text-muted">Delivering to</dt>
          <dd className="text-right text-text">{delivery.short}</dd>
        </div>
        <div className={row}>
          <dt className="text-text-muted">Paid with</dt>
          <dd className="text-text">{payment.short}</dd>
        </div>
        <div className={row}>
          <dt className="text-text-muted">Items</dt>
          <dd className="text-text">
            {itemsShort}
            {itemsHref && (
              <>
                {" · "}
                <TextLink asChild>
                  <Link href={itemsHref}>View</Link>
                </TextLink>
              </>
            )}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3 border-t border-border-subtle pt-3">
          <dt className="text-base leading-sm font-semibold text-text">Total paid</dt>
          <dd className="text-xl leading-base font-semibold text-text">{total}</dd>
        </div>
      </dl>

      {/* Tablet and desktop */}
      <div className="hidden gap-6 md:flex">
        <section aria-label="Delivering to" className={cn(card, "flex-1 basis-0 gap-3 p-6")}>
          <h2 className={caps}>Delivering to</h2>
          <p className="text-base leading-base text-text">
            <strong className="font-semibold">{delivery.name}</strong> · {delivery.phone}
            <br />
            {delivery.address}
            {delivery.landmark && (
              <>
                <br />
                <span className="text-text-muted">{delivery.landmark}</span>
              </>
            )}
          </p>
          <p className="text-sm leading-xs font-semibold text-brand">{delivery.method}</p>
        </section>
        <section aria-label="Payment" className={cn(card, "flex-1 basis-0 gap-3 p-6")}>
          <h2 className={caps}>Payment</h2>
          <p className="flex items-center gap-2 text-base leading-base text-text">
            <PaymentBadge brand={payment.brand} size="xs" className="px-1.75 py-0.75 text-11 leading-3.5" />
            {payment.label}
          </p>
          <p className="text-base leading-base text-text">
            <strong className="font-semibold">{payment.amount}</strong> · {payment.when}
          </p>
          {payment.note && <p className="text-sm leading-xs text-text-muted">{payment.note}</p>}
        </section>
      </div>
      <section aria-label={itemsTitle} className={cn(card, "hidden gap-5 px-8 py-6 md:flex")}>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className={caps}>{itemsTitle}</h2>
          {receiptHref && (
            <TextLink asChild className="text-sm leading-xs">
              <Link href={receiptHref}>Download receipt</Link>
            </TextLink>
          )}
        </div>
        <ul className="flex flex-col gap-4">
          {items.map(({ id, ...item }) => (
            <li key={id}>
              <OrderItemRow {...item} />
            </li>
          ))}
        </ul>
        <p className="flex items-baseline justify-between gap-3 border-t border-border-subtle pt-4">
          <span className="text-base leading-sm text-text-secondary">{totalsLine}</span>
          <span className="text-xl leading-base font-semibold text-text">{total}</span>
        </p>
      </section>
    </div>
  );
}
