import { useId, type ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { StatusChip, type StatusChipProps } from "../../atoms";

export interface CustomerOrder {
  number: string;
  href: string;
  /** From 1440px: "3 × Greens Daily". */
  items: string;
  status: { label: string; tone: NonNullable<StatusChipProps["tone"]> };
  /** "Today", "1 Nov". */
  date: string;
  /** "GHS 210". */
  total: string;
}

/**
 * CustomerOrdersCard (organism): a customer's latest orders (Paper Jofak - Admin → Customer
 * detail → Orders): number, items (from 1440px), status, date and total, with "View all 14".
 * Tablet drops the items; mobile shows the first `mobileLimit` orders with date and total under
 * the number. Order numbers link to the order.
 */
export interface CustomerOrdersCardProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  orders: CustomerOrder[];
  viewAll?: { label: string; compactLabel?: string; href: string };
  mobileLimit?: number;
  title?: string;
}

export function CustomerOrdersCard({
  linkAs: LinkAs = "a",
  orders,
  viewAll,
  mobileLimit = 3,
  title = "Orders",
  className,
  ...props
}: CustomerOrdersCardProps) {
  const titleId = useId();
  return (
    <section
      data-slot="customer-orders-card"
      aria-labelledby={titleId}
      className={cn("flex flex-col overflow-clip rounded-md border border-border-subtle font-sans md:rounded-18 xl:rounded-lg", className)}
      {...props}
    >
      <div className="flex items-center justify-between px-3.5 py-3 md:px-4.5 md:py-3.5 xl:px-5 xl:py-4">
        <h2 id={titleId} className="text-base leading-4.5 font-semibold text-text xl:text-md xl:leading-5">
          {title}
        </h2>
        {viewAll && (
          <LinkAs href={viewAll.href} className="text-sm leading-4 font-semibold text-brand hover:underline">
            {viewAll.compactLabel ? (
              <>
                <span className="md:hidden">{viewAll.compactLabel}</span>
                <span className="hidden md:inline">{viewAll.label}</span>
              </>
            ) : (
              viewAll.label
            )}
          </LinkAs>
        )}
      </div>
      {orders.length === 0 && <p className="border-t border-border-subtle px-5 py-8 text-center text-14 leading-sm text-text-muted">No orders yet.</p>}
      <ul>
        {orders.map((order, index) => (
          <li
            key={order.number}
            className={cn(
              "relative items-center gap-2.5 border-t border-border-subtle px-3.5 py-2.75 hover:bg-surface-subtle md:flex md:gap-3 md:px-4.5 xl:gap-3.5 xl:px-5 xl:py-3",
              index < mobileLimit ? "flex" : "hidden",
            )}
          >
            <span className="flex min-w-0 flex-1 flex-col md:w-25 md:flex-none xl:w-27.5">
              <LinkAs href={order.href} className="text-14 leading-5 font-semibold text-brand after:absolute after:inset-0 hover:underline">
                {order.number}
              </LinkAs>
              <span className="text-xs leading-xs text-text-muted md:hidden">
                {order.date} · {order.total}
              </span>
            </span>
            <span className="hidden min-w-0 flex-1 truncate text-sm leading-5 text-text-secondary xl:block">{order.items}</span>
            <span className="flex md:flex-1 xl:w-27.5 xl:flex-none">
              <StatusChip tone={order.status.tone} className="px-2.25 py-0.5 leading-4 md:leading-5">
                {order.status.label}
              </StatusChip>
            </span>
            <span className="hidden w-17.5 shrink-0 text-sm leading-5 text-text-muted md:block xl:w-20">{order.date}</span>
            <span className="hidden w-20 shrink-0 text-right text-14 leading-5 font-semibold text-text md:block xl:w-22.5">{order.total}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
