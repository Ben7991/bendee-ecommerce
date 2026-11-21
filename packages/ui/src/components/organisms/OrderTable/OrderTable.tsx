"use client";

import { useId, useState, type ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Checkbox, Icon, StatusChip, type StatusChipProps } from "../../atoms";

export interface AdminOrder {
  id: string;
  number: string;
  href: string;
  /** "Today, 08:42". */
  placed: string;
  customer: string;
  /** Masked: "024 ••• 4521". */
  phone: string;
  /** A risk note in red with a flag, shown instead of the phone ("2 failed deliveries"). */
  flag?: string;
  items: number;
  /** For the selection summary. */
  amount: number;
  /** "GHS 412.00". */
  total: string;
  payment: {
    method: string;
    /** Mobile: "MoMo", "COD". */
    compactMethod?: string;
    /** "Paid", "To collect", "Awaiting approval". */
    status: string;
    tone: "paid" | "due" | "pending";
  };
  status: { label: string; tone: NonNullable<StatusChipProps["tone"]>; note?: string };
  delivery: { method: string; area: string; compactArea?: string };
}

export interface BulkAction {
  value: string;
  label: string;
  primary?: boolean;
}

const PAYMENT = {
  paid: { dot: "bg-brand", text: "text-brand", strong: "font-semibold text-brand" },
  due: { dot: "bg-warning", text: "text-warning-text", strong: "font-semibold text-warning-text" },
  pending: { dot: "bg-evergreen-300", text: "text-text-muted", strong: "text-text-secondary" },
} as const;

/** 1 2 3 … 129: the first pages near the start, then the current page with neighbours. */
function pageItems(page: number, pageCount: number): Array<number | "gap"> {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
  const pages = new Set([1, pageCount, page - 1, page, page + 1, ...(page <= 2 ? [2, 3] : [])]);
  const sorted = [...pages].filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b);
  return sorted.flatMap((n, index) => (index > 0 && n - sorted[index - 1]! > 1 ? (["gap", n] as const) : [n]));
}

const money = (amount: number, currency: string) =>
  `${currency} ${amount.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * OrderTable (organism): the admin order list (Paper Jofak - Admin → Orders). Select rows with
 * the checkboxes to get the dark bulk bar ("3 selected · GHS 818.00 · 6 items"); its buttons
 * submit `bulkAction` with the chosen `intent` and one `order` per selected id. All columns from
 * 1440px; Items, Payment and Delivery drop out on tablet; on mobile, cards and a Load more link.
 */
export interface OrderTableProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  orders: AdminOrder[];
  currency?: string;
  bulkActions?: BulkAction[];
  /** Server action (or URL) the bulk buttons submit to. */
  bulkAction?: string | ((formData: FormData) => void | Promise<void>);
  pagination?: {
    page: number;
    pageCount: number;
    /** "1–10". */
    range: string;
    /** "1,284". */
    total: string;
    hrefFor: (page: number) => string;
    perPage?: { value: number; options: number[]; name?: string };
  };
  loadMoreHref?: string;
  /** Cards shown on mobile. */
  compactLimit?: number;
  /** Shown when there are no orders ("No orders match your search"). */
  emptyMessage?: string;
  "aria-label"?: string;
}

export function OrderTable({
  linkAs: LinkAs = "a",
  orders,
  currency = "GHS",
  bulkActions = [],
  bulkAction,
  pagination,
  loadMoreHref,
  compactLimit = 6,
  emptyMessage = "No orders match these filters.",
  "aria-label": ariaLabel = "Orders",
  className,
  ...props
}: OrderTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const bulkId = useId();
  const chosen = orders.filter((order) => selected.has(order.id));
  const all = orders.length > 0 && chosen.length === orders.length;
  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };
  const head = "py-2.5 text-left text-xs leading-xs font-semibold tracking-label text-text-muted uppercase";
  const cell = "py-3.5 pr-4 align-middle";

  return (
    <section data-slot="order-table" aria-label={ariaLabel} className={cn("flex flex-col gap-4 font-sans", className)} {...props}>
      <div className="hidden overflow-clip rounded-lg border border-border-subtle md:block">
        {chosen.length > 0 && (
          <form
            id={bulkId}
            action={bulkAction}
            aria-label="Bulk actions"
            className="flex items-center gap-3 bg-text py-2.5 pr-4 pl-6 dark:bg-primary"
          >
            {chosen.map((order) => (
              <input key={order.id} type="hidden" name="order" value={order.id} />
            ))}
            <Checkbox
              checked={all ? true : "indeterminate"}
              onCheckedChange={() => setSelected(new Set())}
              aria-label="Clear selection"
              className="border-accent bg-accent text-on-accent data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent"
            />
            <p className="text-14 leading-sm font-semibold text-text-inverse" role="status">
              {chosen.length} selected
            </p>
            <p className="hidden text-sm leading-sm text-text-inverse-muted xl:block">
              {money(
                chosen.reduce((sum, order) => sum + order.amount, 0),
                currency,
              )}{" "}
              · {chosen.reduce((sum, order) => sum + order.items, 0)} items
            </p>
            <span className="flex-1" />
            {bulkActions.map((action) => (
              <button
                key={action.value}
                type={bulkAction ? "submit" : "button"}
                name="intent"
                value={action.value}
                className={cn(
                  "flex h-8.5 shrink-0 items-center rounded-full px-3.5 text-sm leading-xs font-semibold transition-colors",
                  action.primary ? "bg-accent text-on-accent hover:bg-sage-200" : "bg-white/12 text-text-inverse hover:bg-white/20",
                )}
              >
                {action.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              aria-label="Clear selection"
              className="flex size-8.5 shrink-0 items-center justify-center rounded-full text-text-inverse-muted hover:text-text-inverse"
            >
              <Icon name="close" size={14} strokeWidth={2} />
            </button>
          </form>
        )}

        <table className="w-full border-collapse">
          <thead className="bg-surface-subtle">
            <tr className="border-b border-border-subtle">
              <th scope="col" className="w-14.5 py-2.5 pr-4 pl-6">
                <Checkbox
                  checked={all ? true : chosen.length > 0 ? "indeterminate" : false}
                  onCheckedChange={() => setSelected(all ? new Set() : new Set(orders.map((order) => order.id)))}
                  aria-label="Select all orders on this page"
                  className="align-middle"
                />
              </th>
              <th scope="col" className={cn(head, "w-32 pr-4")}>
                Order
              </th>
              <th scope="col" className={cn(head, "pr-4")}>
                Customer
              </th>
              <th scope="col" className={cn(head, "hidden w-15 pr-4 xl:table-cell")}>
                Items
              </th>
              <th scope="col" className={cn(head, "hidden w-41 pr-4 xl:table-cell")}>
                Payment
              </th>
              <th scope="col" className={cn(head, "w-41 pr-4")}>
                Status
              </th>
              <th scope="col" className={cn(head, "hidden w-41.5 pr-4 xl:table-cell")}>
                Delivery
              </th>
              <th scope="col" className={cn(head, "w-31 pr-6 text-right")}>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-14 leading-sm text-text-muted">
                  {emptyMessage}
                </td>
              </tr>
            )}
            {orders.map((order) => {
              const isSelected = selected.has(order.id);
              const payment = PAYMENT[order.payment.tone];
              return (
                <tr
                  key={order.id}
                  aria-selected={isSelected}
                  className={cn(
                    "border-b border-border-subtle transition-colors last:border-b-0",
                    isSelected ? "bg-sage-50" : "hover:bg-surface-subtle",
                  )}
                >
                  <td className="py-3.5 pr-4 pl-6 align-middle">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggle(order.id)}
                      aria-label={`Select order ${order.number}`}
                      className="align-middle"
                    />
                  </td>
                  <td className={cell}>
                    <LinkAs href={order.href} className="block text-14 leading-sm font-semibold text-text hover:underline">
                      {order.number}
                    </LinkAs>
                    <span className="text-xs leading-xs text-text-muted">{order.placed}</span>
                  </td>
                  <td className={cell}>
                    <span className="flex items-center gap-1.5 text-14 leading-sm font-medium text-text">
                      {order.customer}
                      {order.flag && <Icon name="flag" size={14} label="Flagged" className="text-error" />}
                    </span>
                    <span className={cn("text-xs leading-xs", order.flag ? "text-error" : "text-text-muted")}>{order.flag ?? order.phone}</span>
                  </td>
                  <td className={cn(cell, "hidden text-14 leading-sm text-text-secondary xl:table-cell")}>{order.items}</td>
                  <td className={cn(cell, "hidden xl:table-cell")}>
                    <span className="block text-sm leading-sm font-medium text-text">{order.payment.method}</span>
                    <span className={cn("flex items-center gap-1.25 text-xs leading-xs", payment.text)}>
                      <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", payment.dot)} />
                      {order.payment.status}
                    </span>
                  </td>
                  <td className={cell}>
                    <span className="flex flex-col items-start gap-1">
                      <StatusChip tone={order.status.tone} size="lg">
                        {order.status.label}
                      </StatusChip>
                      {order.status.note && <span className="text-xs leading-xs text-text-muted">{order.status.note}</span>}
                    </span>
                  </td>
                  <td className={cn(cell, "hidden xl:table-cell")}>
                    <span className="block text-sm leading-sm font-medium text-text">{order.delivery.method}</span>
                    <span className="text-xs leading-xs text-text-muted">{order.delivery.area}</span>
                  </td>
                  <td className="py-3.5 pr-6 text-right align-middle text-14 leading-sm font-semibold text-text">{order.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {pagination && (
          <nav
            aria-label="Pagination"
            className="flex items-center justify-between gap-4 border-t border-border-subtle bg-surface-subtle px-6 py-3.5"
          >
            <p className="text-sm leading-sm text-text-muted">
              Showing <strong className="font-semibold text-text">{pagination.range}</strong> of {pagination.total}
            </p>
            <ul className="flex items-center gap-1">
              <li>
                <PageArrow direction="previous" pagination={pagination} LinkAs={LinkAs} />
              </li>
              {pageItems(pagination.page, pagination.pageCount).map((item, index) =>
                item === "gap" ? (
                  <li key={`gap-${index}`} aria-hidden className="flex size-8 items-center justify-center text-sm text-text-muted">
                    …
                  </li>
                ) : (
                  <li key={item}>
                    {item === pagination.page ? (
                      <span
                        aria-current="page"
                        className="flex size-8 items-center justify-center rounded-full bg-primary text-sm leading-xs font-semibold text-text-inverse"
                      >
                        <span className="sr-only">Page </span>
                        {item}
                      </span>
                    ) : (
                      <LinkAs
                        href={pagination.hrefFor(item)}
                        aria-label={`Page ${item}`}
                        className="flex size-8 items-center justify-center rounded-full text-sm leading-xs font-medium text-text-secondary transition-colors hover:bg-surface"
                      >
                        {item}
                      </LinkAs>
                    )}
                  </li>
                ),
              )}
              <li>
                <PageArrow direction="next" pagination={pagination} LinkAs={LinkAs} />
              </li>
            </ul>
            {pagination.perPage ? (
              <form method="get" className="relative hidden items-center gap-1.5 text-sm leading-sm xl:flex">
                <label htmlFor={`${bulkId}-per-page`} className="text-text-muted">
                  Rows per page
                </label>
                <select
                  id={`${bulkId}-per-page`}
                  name={pagination.perPage.name ?? "limit"}
                  defaultValue={pagination.perPage.value}
                  onChange={(event) => event.currentTarget.form?.requestSubmit()}
                  className="cursor-pointer appearance-none bg-transparent pr-4.5 font-semibold text-text outline-none field-sizing-content"
                >
                  {pagination.perPage.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <Icon name="chevronDown" size={12} strokeWidth={2.2} className="pointer-events-none absolute right-0 text-text-muted" />
              </form>
            ) : (
              <span className="hidden xl:block" />
            )}
          </nav>
        )}
      </div>

      {/* Mobile: cards. */}
      {orders.length === 0 && (
        <p className="rounded-lg border border-border-subtle px-4 py-10 text-center text-14 leading-sm text-text-muted md:hidden">{emptyMessage}</p>
      )}
      <ul className={cn("flex-col overflow-clip rounded-lg border border-border-subtle md:hidden", orders.length ? "flex" : "hidden")}>
        {orders.slice(0, compactLimit).map((order) => {
          const payment = PAYMENT[order.payment.tone];
          const area = order.delivery.compactArea ?? order.delivery.area;
          return (
            <li key={order.id} className="border-border-subtle not-last:border-b">
              <LinkAs href={order.href} className="flex flex-col gap-2.5 p-4">
                <span className="flex items-start justify-between gap-3">
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 text-base leading-sm font-semibold text-text">
                      {order.customer}
                      {order.flag && <Icon name="flag" size={14} label="Flagged" className="text-error" />}
                    </span>
                    <span className={cn("text-xs leading-xs", order.flag ? "text-error" : "text-text-muted")}>
                      {order.flag
                        ? `${order.number} · ${order.flag}`
                        : `${order.number} · ${order.placed} · ${order.items} ${order.items === 1 ? "item" : "items"}`}
                    </span>
                  </span>
                  <span className="shrink-0 text-base leading-sm font-semibold text-text">{order.total}</span>
                </span>
                <span className="flex flex-wrap items-center gap-2 text-xs leading-xs">
                  <StatusChip tone={order.status.tone} size="lg">
                    {order.status.label}
                  </StatusChip>
                  {order.status.note ? (
                    <span className="text-text-secondary">{order.status.note}</span>
                  ) : (
                    <span className="text-text-secondary">
                      {order.payment.compactMethod ?? order.payment.method} ·{" "}
                      <span className={payment.strong}>
                        {order.payment.tone === "pending" ? order.payment.status.toLowerCase() : order.payment.status}
                      </span>
                    </span>
                  )}
                  {order.payment.tone !== "pending" && (
                    <span className="text-text-muted">
                      · {order.status.note ? area : `${order.delivery.method}, ${area}`}
                    </span>
                  )}
                </span>
              </LinkAs>
            </li>
          );
        })}
      </ul>
      {loadMoreHref && (
        <LinkAs
          href={loadMoreHref}
          className="flex h-11 items-center justify-center rounded-full border border-border text-14 leading-4.5 font-semibold text-text transition-colors hover:bg-surface-subtle md:hidden"
        >
          Load more orders
        </LinkAs>
      )}
    </section>
  );
}

function PageArrow({
  direction,
  pagination,
  LinkAs,
}: {
  direction: "previous" | "next";
  pagination: NonNullable<OrderTableProps["pagination"]>;
  LinkAs: LinkComponent;
}) {
  const target = direction === "previous" ? pagination.page - 1 : pagination.page + 1;
  const icon = <Icon name={direction === "previous" ? "chevronLeft" : "chevronRight"} size={14} strokeWidth={2} />;
  const box = "flex size-8 items-center justify-center rounded-full";
  if (target < 1 || target > pagination.pageCount) {
    return (
      <span aria-hidden className={cn(box, "text-evergreen-300")}>
        {icon}
      </span>
    );
  }
  return (
    <LinkAs
      href={pagination.hrefFor(target)}
      aria-label={direction === "previous" ? "Previous page" : "Next page"}
      className={cn(box, "text-text transition-colors hover:bg-surface")}
    >
      {icon}
    </LinkAs>
  );
}
