import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { ProductThumb, StatusBadge, type StatusBadgeProps } from "../../atoms";
import type { OrderThumb } from "../ActiveOrderCard";

/**
 * OrderHistory (organism): past orders in one ruled card (Paper Account → Orders).
 *   768 up: number and date, status, packshots, total and an action per row
 *   mobile: under a "Past orders" label, the first packshot, the main product, a one-line
 *           summary and a round action (reorder) or a chevron
 * `refunded` strikes the total through and fades the packshots.
 */
export interface OrderHistoryRow {
  id: string;
  number: string;
  /** "28 Oct 2026 · 2 items". */
  meta: ReactNode;
  status: Pick<StatusBadgeProps, "label" | "tone">;
  items: OrderThumb[];
  total: ReactNode;
  refunded?: boolean;
  /** "Reorder" button or "Details" link (768 up). */
  action?: ReactNode;
  /** Mobile: the main product ("Greens + Probiotic"). */
  compactTitle: ReactNode;
  /** Mobile: "<status> · 28 Oct · GHS 930". */
  compactMeta: ReactNode;
  /** Mobile: a round IconButton or a chevron link. */
  compactAction?: ReactNode;
}

export interface OrderHistoryProps extends Omit<ComponentProps<"section">, "children"> {
  rows: OrderHistoryRow[];
  /** Mobile heading. */
  label?: string;
}

export function OrderHistory({ rows, label = "Past orders", className, ...props }: OrderHistoryProps) {
  return (
    <section data-slot="order-history" aria-label={label} className={cn("flex flex-col gap-3 font-sans", className)} {...props}>
      <h2 className="pt-2 text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase md:hidden">{label}</h2>
      <ul className="flex flex-col overflow-hidden rounded-lg border border-border-subtle">
        {rows.map((row) => (
          <li key={row.id} className="border-b border-border-subtle last:border-0">
            {/* Mobile */}
            <div className="flex items-center gap-3 p-4 md:hidden">
              {row.items[0] && <ProductThumb tint={row.items[0].tint} image={row.items[0].image} dimmed={row.refunded} />}
              <div className="flex min-w-0 flex-1 flex-col gap-0.75">
                <p className={cn("truncate text-sm leading-sm font-semibold", row.refunded ? "text-text-muted" : "text-text")}>{row.compactTitle}</p>
                <p className="text-xs leading-xs text-text-muted [&_strong]:font-semibold">{row.compactMeta}</p>
              </div>
              {row.compactAction}
            </div>

            {/* 768 up */}
            <div className="hidden items-center gap-4 px-6 py-5 md:flex xl:gap-6">
              <div className="flex w-36 shrink-0 flex-col gap-1 xl:w-55">
                <p className="text-md leading-sm font-semibold text-text">{row.number}</p>
                <p className="text-sm leading-xs text-text-muted">{row.meta}</p>
              </div>
              <div className="w-27 shrink-0 xl:w-37.5">
                <StatusBadge {...row.status} />
              </div>
              <div className="flex min-w-0 flex-1 gap-1.5">
                {row.items.slice(0, 3).map((item) => (
                  <ProductThumb key={item.id} tint={item.tint} image={item.image} dimmed={row.refunded} />
                ))}
              </div>
              <p className={cn("w-24 shrink-0 text-right text-md leading-sm xl:w-32.5", row.refunded ? "text-text-muted line-through" : "font-semibold text-text")}>
                {row.total}
              </p>
              <div className="flex w-30 shrink-0 justify-end text-sm leading-xs">{row.action}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
