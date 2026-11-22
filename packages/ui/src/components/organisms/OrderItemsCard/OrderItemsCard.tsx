"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Checkbox, StatusChip } from "../../atoms";

export interface OrderItemLine {
  id: string;
  name: string;
  /** "60 capsules · SKU JF-ASH-60 · Shelf B2". */
  detail: string;
  /** Mobile: "60 caps · Shelf B2 · ×1". */
  compactDetail?: string;
  /** "1 × GHS 145.00". */
  quantityLabel: string;
  /** "GHS 145.00". */
  lineTotal: string;
  /** Mobile: "GHS 145". */
  compactLineTotal?: string;
  tint?: "sage" | "amber" | "lavender" | "sun";
  image?: ReactNode;
  picked?: boolean;
}

export interface OrderItemsTotals {
  /** "Subtotal · 4 items" (mobile: "Subtotal"). */
  subtotalLabel: string;
  compactSubtotalLabel?: string;
  subtotal: string;
  discount?: { code: string; amount: string };
  delivery: { label: string; compactLabel?: string; amount: string };
  total: string;
  /** Mobile: "Total · COD to collect". */
  compactTotalLabel?: string;
  /** "Includes VAT, NHIL and GETFund" and its amount. */
  tax?: { label: string; amount: string };
}

const TINT = { sage: "bg-sage-100", amber: "bg-tint-amber", lavender: "bg-tint-lavender", sun: "bg-tint-sun" } as const;

/**
 * OrderItemsCard (organism): an order's lines and totals (Paper Jofak - Admin → Order detail →
 * Items). With `pickable`, each line has a tick for the packer and the header counts "2 of 4
 * picked" (the ticks submit as `picked` with a surrounding form). Compact lines on mobile.
 */
export interface OrderItemsCardProps extends Omit<ComponentProps<"section">, "children"> {
  items: OrderItemLine[];
  totals: OrderItemsTotals;
  pickable?: boolean;
  hint?: string;
}

export function OrderItemsCard({ items, totals, pickable = false, hint = "Tick each item as you pick it", className, ...props }: OrderItemsCardProps) {
  const titleId = useId();
  const [picked, setPicked] = useState(() => new Set(items.filter((item) => item.picked).map((item) => item.id)));
  const toggle = (id: string) => {
    const next = new Set(picked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setPicked(next);
  };
  const row = "flex justify-between gap-3";

  return (
    <section
      data-slot="order-items-card"
      aria-labelledby={titleId}
      className={cn("flex flex-col overflow-clip rounded-lg border border-border-subtle font-sans", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3.5 md:px-6 md:py-4.5">
        <div className="flex items-center gap-2.5">
          <h2 id={titleId} className="text-md leading-5.5 font-semibold text-text md:text-lg md:leading-base md:tracking-compact">
            Items
          </h2>
          {pickable && (
            <StatusChip tone="neutral" size="count" className="text-text-secondary" role="status">
              {picked.size} of {items.length} picked
            </StatusChip>
          )}
        </div>
        {pickable && <p className="hidden text-sm leading-sm text-text-muted md:block">{hint}</p>}
      </div>

      <ul>
        {items.map((item) => {
          const isPicked = picked.has(item.id);
          return (
            <li key={item.id} className="flex items-center gap-3 border-t border-border-subtle px-4 py-3 md:gap-3.5 md:px-6 md:py-3.5">
              {pickable && (
                <Checkbox
                  name="picked"
                  value={item.id}
                  checked={isPicked}
                  onCheckedChange={() => toggle(item.id)}
                  aria-label={`Picked ${item.name}`}
                  className="size-6 rounded-6 data-[state=checked]:border-brand data-[state=checked]:bg-brand md:size-5"
                />
              )}
              <span className={cn("relative size-11 shrink-0 overflow-hidden rounded-10 md:size-13 md:rounded-sm", TINT[item.tint ?? "sage"])}>{item.image}</span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-14 leading-sm font-semibold text-text">{item.name}</span>
                <span className="text-xs leading-xs text-text-muted">
                  {item.compactDetail ? (
                    <>
                      <span className="md:hidden">{item.compactDetail}</span>
                      <span className="hidden md:inline">{item.detail}</span>
                    </>
                  ) : (
                    item.detail
                  )}
                </span>
              </span>
              <span className="hidden w-27.5 shrink-0 text-right text-sm leading-sm text-text-secondary md:block">{item.quantityLabel}</span>
              <span className="shrink-0 text-right text-14 leading-sm font-semibold text-text md:w-24">
                <span className="md:hidden">{item.compactLineTotal ?? item.lineTotal}</span>
                <span className="hidden md:inline">{item.lineTotal}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <dl className="flex flex-col gap-1.5 border-t border-border-subtle bg-surface-subtle px-4 py-3.5 text-sm leading-4.5 text-text-secondary md:gap-2 md:px-6 md:pt-4.5 md:pb-5 md:text-14 md:leading-sm">
        <div className={row}>
          <dt>
            <span className="md:hidden">{totals.compactSubtotalLabel ?? totals.subtotalLabel}</span>
            <span className="hidden md:inline">{totals.subtotalLabel}</span>
          </dt>
          <dd>{totals.subtotal}</dd>
        </div>
        {totals.discount && (
          <div className={row}>
            <dt>
              <span className="hidden md:inline">Discount </span>
              <span className="text-text-secondary md:text-xs md:font-semibold md:text-text">{totals.discount.code}</span>
            </dt>
            <dd className="text-brand">−{totals.discount.amount}</dd>
          </div>
        )}
        <div className={row}>
          <dt>
            <span className="md:hidden">{totals.delivery.compactLabel ?? totals.delivery.label}</span>
            <span className="hidden md:inline">{totals.delivery.label}</span>
          </dt>
          <dd>{totals.delivery.amount}</dd>
        </div>
        <div aria-hidden className="my-1 hidden h-px bg-border-subtle md:block" />
        <div className={cn(row, "items-baseline pt-1 text-base leading-5.5 font-semibold text-text md:pt-0")}>
          <dt>
            <span className="md:hidden">{totals.compactTotalLabel ?? "Total"}</span>
            <span className="hidden md:inline md:text-md md:leading-base">Total</span>
          </dt>
          <dd className="md:text-22 md:leading-lg md:tracking-compact">{totals.total}</dd>
        </div>
        {totals.tax && (
          <div className={cn(row, "hidden text-xs leading-xs text-text-muted md:flex")}>
            <dt>{totals.tax.label}</dt>
            <dd>{totals.tax.amount}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
