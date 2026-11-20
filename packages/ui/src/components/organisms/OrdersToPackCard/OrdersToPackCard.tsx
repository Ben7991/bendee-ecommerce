import { useId, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, StatusChip } from "../../atoms";

export interface OrderToPack {
  number: string;
  href: string;
  /** "08:42", "Yesterday". */
  placed: string;
  customer: string;
  area: string;
  /** A risk note shown in red with a flag ("2 failed deliveries"); replaces the area. */
  flag?: string;
  items: number;
  payment: { label: string; tone: "success" | "warning" | "error" | "neutral" };
  delivery: string;
  total: string;
}

/**
 * OrdersToPackCard (organism): the dashboard's packing queue (Paper Jofak - Admin → Orders to
 * pack). A table from 768px (Items and Delivery from 1440px); on mobile, rows with the customer
 * first and a full-width "Print pick list" button.
 */
export interface OrdersToPackCardProps extends Omit<ComponentProps<"section">, "title"> {
  linkAs?: LinkComponent;
  title?: ReactNode;
  count: number;
  orders: OrderToPack[];
  viewAllHref: string;
  printHref: string;
  /** Rows shown on mobile. */
  compactLimit?: number;
}

const itemsLabel = (count: number) => `${count} ${count === 1 ? "item" : "items"}`;

export function OrdersToPackCard({
  linkAs: LinkAs = "a",
  title = "Orders to pack",
  count,
  orders,
  viewAllHref,
  printHref,
  compactLimit = 4,
  className,
  ...props
}: OrdersToPackCardProps) {
  const titleId = useId();
  const head = "px-0 py-2.5 text-left text-xs leading-xs font-semibold tracking-label text-text-muted uppercase";

  return (
    <section
      data-slot="orders-to-pack-card"
      aria-labelledby={titleId}
      className={cn("flex min-w-0 flex-col overflow-clip rounded-lg border border-border-subtle font-sans", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-4.5 md:px-6 md:py-5">
        <div className="flex items-center gap-2.5">
          <h2 id={titleId} className="text-lg leading-base font-semibold tracking-compact text-text">
            {title}
          </h2>
          <StatusChip size="count">
            {count}
            <span className="sr-only"> orders</span>
          </StatusChip>
        </div>
        <div className="flex items-center gap-2">
          <LinkAs
            href={printHref}
            className="hidden h-9 items-center rounded-full border border-border px-3.5 text-sm leading-xs font-semibold text-text transition-colors hover:bg-surface-subtle md:flex"
          >
            Print pick list
          </LinkAs>
          <LinkAs href={viewAllHref} className="flex h-9 items-center px-3.5 text-sm leading-xs font-semibold text-brand hover:underline">
            View all orders
          </LinkAs>
        </div>
      </div>

      <table className="hidden w-full border-collapse md:table">
        <thead className="bg-surface-subtle">
          <tr>
            <th scope="col" className={cn(head, "w-28 pl-6")}>
              Order
            </th>
            <th scope="col" className={head}>
              Customer
            </th>
            <th scope="col" className={cn(head, "hidden w-20 xl:table-cell")}>
              Items
            </th>
            <th scope="col" className={cn(head, "w-34")}>
              Payment
            </th>
            <th scope="col" className={cn(head, "hidden w-28 xl:table-cell")}>
              Delivery
            </th>
            <th scope="col" className={cn(head, "w-31 pr-6 text-right")}>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.number} className="border-t border-border-subtle transition-colors hover:bg-surface-subtle">
              <td className="py-3.5 pl-6">
                <LinkAs href={order.href} className="block text-14 leading-sm font-semibold text-text hover:underline">
                  {order.number}
                </LinkAs>
                <span className="text-xs leading-xs text-text-muted">{order.placed}</span>
              </td>
              <td className="py-3.5 pr-4">
                <span className="flex items-center gap-1.5 text-14 leading-sm font-medium text-text">
                  {order.customer}
                  {order.flag && <Icon name="flag" size={14} label="Flagged" className="text-error" />}
                </span>
                <span className={cn("text-xs leading-xs", order.flag ? "text-error" : "text-text-muted")}>{order.flag ?? order.area}</span>
              </td>
              <td className="hidden py-3.5 text-14 leading-sm text-text-secondary xl:table-cell">{order.items}</td>
              <td className="py-3.5">
                <StatusChip tone={order.payment.tone}>{order.payment.label}</StatusChip>
              </td>
              <td className="hidden py-3.5 text-sm leading-sm text-text-secondary xl:table-cell">{order.delivery}</td>
              <td className="py-3.5 pr-6 text-right text-14 leading-sm font-semibold text-text">{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="flex flex-col md:hidden">
        {orders.slice(0, compactLimit).map((order) => (
          <li key={order.number} className="border-t border-border-subtle">
            <LinkAs href={order.href} className="flex items-center gap-3 px-5 py-3.5">
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex items-center gap-1.5 text-base leading-sm font-semibold text-text">
                  {order.customer}
                  {order.flag && <Icon name="flag" size={14} label="Flagged" className="text-error" />}
                </span>
                <span className={cn("text-xs leading-xs", order.flag ? "text-error" : "text-text-muted")}>
                  {order.flag
                    ? `${order.number} · ${order.flag}`
                    : `${order.number} · ${order.placed} · ${order.delivery === "Pickup" ? "Pickup" : itemsLabel(order.items)}`}
                </span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-14 leading-sm font-semibold text-text">{order.total}</span>
                <StatusChip tone={order.payment.tone} size="sm">
                  {order.payment.label}
                </StatusChip>
              </span>
            </LinkAs>
          </li>
        ))}
        <li className="px-5 pt-1.5 pb-4.5">
          <LinkAs
            href={printHref}
            className="flex h-11 items-center justify-center rounded-full border border-border text-14 leading-4.5 font-semibold text-text transition-colors hover:bg-surface-subtle"
          >
            Print pick list for {count} orders
          </LinkAs>
        </li>
      </ul>
    </section>
  );
}
