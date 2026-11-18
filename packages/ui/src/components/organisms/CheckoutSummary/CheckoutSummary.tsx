"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, TextLink } from "../../atoms";
import { OrderItemRow, type OrderItemRowProps } from "../../molecules";

export interface CheckoutSummaryTotals {
  subtotalLabel: string;
  subtotal: string;
  discountLabel?: string;
  discount?: string;
  deliveryLabel: string;
  delivery: string;
  total: string;
  taxNote: string;
  savings?: string;
}

/**
 * CheckoutSummary (organism): "Your order" during checkout.
 *   sidebar: the 440px card beside the steps (desktop)
 *   strip:   "Show order summary · 4 items   GHS 1,254.60" under the header (mobile, tablet);
 *            opens the same summary in place
 */
export interface CheckoutSummaryProps extends Omit<ComponentProps<"aside">, "children"> {
  variant?: "sidebar" | "strip";
  items: Array<Omit<OrderItemRowProps, "image"> & { id: string; image?: ReactNode }>;
  totals: CheckoutSummaryTotals;
  /** e.g. "Magnesium Bisglycinate is sold out and isn't in this order." */
  note?: ReactNode;
  code?: { code: string; description: string };
  itemCount: number;
  editCartHref?: string;
  assurances?: Array<{ icon: "shield" | "returns"; label: string }>;
  linkAs?: LinkComponent;
}

function SummaryBody({
  items,
  totals,
  note,
  code,
  assurances = [
    { icon: "shield", label: "Payments secured by Paystack" },
    { icon: "returns", label: "30-day returns on unopened products" },
  ],
}: Pick<CheckoutSummaryProps, "items" | "totals" | "note" | "code" | "assurances">) {
  const row = "flex justify-between gap-3 text-base leading-sm";
  return (
    <>
      <ul className="flex flex-col gap-4">
        {items.map(({ id, ...item }) => (
          <li key={id}>
            <OrderItemRow {...item} />
          </li>
        ))}
      </ul>
      {note && <p className="rounded-sm bg-surface-subtle p-3 text-xs leading-xs text-text-muted">{note}</p>}
      {code && (
        <p className="flex items-center gap-2 rounded-sm border border-dashed border-brand bg-sage-50 px-4 py-3 text-sm leading-xs text-text">
          <Icon name="tag" size={14} className="text-brand" />
          <span className="flex-1">
            <strong className="font-semibold">{code.code}</strong> · {code.description}
          </span>
          <button type="button" className="text-xs leading-xs text-text-muted underline decoration-1 hover:text-text">
            Remove<span className="sr-only"> code {code.code}</span>
          </button>
        </p>
      )}
      <dl className="flex flex-col gap-3 border-t border-border-subtle pt-4">
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
      </dl>
      <dl className="flex flex-col gap-1.5 border-t border-border pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-lg leading-base font-semibold text-text">Total</dt>
          <dd className="text-3xl leading-3xl font-medium tracking-snug text-text">{totals.total}</dd>
        </div>
        <div className="flex justify-between gap-3 text-xs leading-xs">
          <dt className="sr-only">Tax and savings</dt>
          <dd className="text-text-muted">{totals.taxNote}</dd>
          {totals.savings && <dd className="font-semibold text-brand">{totals.savings}</dd>}
        </div>
      </dl>
      <ul className="flex flex-col gap-3 border-t border-border-subtle pt-4">
        {assurances.map((assurance) => (
          <li key={assurance.label} className="flex items-center gap-3 text-sm leading-xs text-text-secondary">
            <Icon name={assurance.icon} size={16} className="text-brand" />
            {assurance.label}
          </li>
        ))}
      </ul>
    </>
  );
}

export function CheckoutSummary({
  variant = "sidebar",
  items,
  totals,
  note,
  code,
  itemCount,
  editCartHref = "/cart",
  assurances,
  linkAs: Link = "a",
  className,
  ...props
}: CheckoutSummaryProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const body = <SummaryBody items={items} totals={totals} note={note} code={code} assurances={assurances} />;

  if (variant === "strip") {
    return (
      <aside data-slot="checkout-summary" data-variant="strip" aria-label="Order summary" className={cn("font-sans", className)} {...props}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-3 border-t border-border-subtle bg-sage-50 px-5 py-3 md:px-10"
        >
          <span className="flex items-center gap-2 text-sm leading-xs font-semibold text-brand">
            <Icon name="bag" size={16} />
            {open ? "Hide" : "Show"} order summary · {itemCount} items
            <Icon name="chevronDown" size={12} strokeWidth={2.4} className={cn("transition-transform", open && "rotate-180")} />
          </span>
          <span className="text-base leading-sm font-semibold text-text">{totals.total}</span>
        </button>
        <div id={panelId} hidden={!open} className="border-b border-border-subtle bg-bg px-5 py-5 md:px-10">
          <div className="flex flex-col gap-5">{body}</div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      data-slot="checkout-summary"
      data-variant="sidebar"
      aria-labelledby="checkout-summary-title"
      className={cn("flex w-110 shrink-0 flex-col gap-5 rounded-xl border border-border-subtle bg-bg p-8 font-sans", className)}
      {...props}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="checkout-summary-title" className="text-2xl leading-2xl font-medium tracking-snug text-text">
          Your order
        </h2>
        <TextLink asChild className="text-sm leading-xs">
          <Link href={editCartHref}>Edit cart</Link>
        </TextLink>
      </div>
      {body}
    </aside>
  );
}
