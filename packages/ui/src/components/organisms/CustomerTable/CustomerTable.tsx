import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, Initials, StatusChip, type InitialsProps, type StatusChipProps } from "../../atoms";

export interface CustomerTag {
  label: string;
  /** VIP accent, Repeat success, New info, Inactive warning, others neutral. */
  tone: NonNullable<StatusChipProps["tone"]>;
}

export interface AdminCustomer {
  id: string;
  name: string;
  href: string;
  /** Masked: "020 ••• 1187". */
  phone: string;
  /** "Spintex, Accra". */
  location: string;
  /** Tablet: a shorter area ("East Legon"). */
  compactLocation?: string;
  /** The initials disc tint; guests get a dashed person instead. */
  tone?: InitialsProps["tone"];
  /** Checked out without an account. */
  guest?: boolean;
  tags: CustomerTag[];
  orders: number;
  /** "GHS 6,120". */
  spent: string;
  /** "Today, 09:40", "10 Nov". */
  lastOrder: string;
  /** Tablet and mobile: "Today". */
  compactLastOrder?: string;
  /** Days since the last order, for inactive customers (amber "105 days ago"). */
  inactiveDays?: number;
  /** Consent channels: "SMS", "WA". Empty shows "None". */
  marketing: string[];
}

/**
 * CustomerTable (organism): the customer list (Paper Jofak - Admin → Customers). From 1440px a
 * table with tags, orders, total spent, last order, location and marketing consent; on tablet the
 * first tag and the area fold under the name; on mobile a list of rows with orders, last order
 * and total spent. Phone numbers come masked. Each row links to the customer. The footer shows
 * the range with Previous and Next links.
 */
export interface CustomerTableProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  customers: AdminCustomer[];
  /** "1–8". */
  range: string;
  /** "1,284". */
  total: string;
  /** From 1440px, after the range: "phone numbers are masked; opening a profile is logged". */
  note?: string;
  previousHref?: string;
  nextHref?: string;
  emptyMessage?: string;
  "aria-label"?: string;
}

const head = "py-2.5 pr-4 text-left text-11 leading-4 font-semibold tracking-label text-text-muted uppercase";

function Avatar({ customer }: { customer: AdminCustomer }) {
  if (customer.guest) {
    return (
      <span aria-hidden className="flex size-10.5 shrink-0 items-center justify-center rounded-full border-field border-dashed border-border text-evergreen-300 md:size-9.5">
        <Icon name="user" size={16} strokeWidth={1.5} />
      </span>
    );
  }
  return <Initials name={customer.name} size="row" tone={customer.tone ?? "sage"} />;
}

function Name({ customer, linkAs: LinkAs }: { customer: AdminCustomer; linkAs: LinkComponent }) {
  return (
    <LinkAs href={customer.href} className="text-14 leading-5 font-semibold text-text after:absolute after:inset-0 hover:underline">
      {customer.name}
    </LinkAs>
  );
}

function Marketing({ channels }: { channels: string[] }) {
  if (!channels.length) return <span className="text-xs leading-5 text-text-muted">None</span>;
  return (
    <span className="flex gap-1">
      {channels.map((channel) => (
        <span key={channel} className="rounded-6 bg-sage-100 px-1.5 py-px text-11 leading-5 font-semibold text-brand">
          {channel}
        </span>
      ))}
    </span>
  );
}

const lower = (value: string) => (/^(Today|Yesterday)/.test(value) ? value.charAt(0).toLowerCase() + value.slice(1) : value);

export function CustomerTable({
  linkAs: LinkAs = "a",
  customers,
  range,
  total,
  note,
  previousHref,
  nextHref,
  emptyMessage = "No customers in this view.",
  "aria-label": ariaLabel = "Customers",
  className,
  ...props
}: CustomerTableProps) {
  const empty = customers.length === 0;
  const pill = "flex h-8 items-center rounded-full border border-border px-3 text-sm leading-sm";

  return (
    <section
      data-slot="customer-table"
      aria-label={ariaLabel}
      className={cn("flex flex-col overflow-clip rounded-18 border border-border-subtle font-sans md:rounded-lg", className)}
      {...props}
    >
      {empty && <p className="px-6 py-12 text-center text-14 leading-sm text-text-muted">{emptyMessage}</p>}

      {/* Desktop: the full table. */}
      {!empty && (
        <table className="hidden w-full border-collapse xl:table">
          <thead className="bg-surface-subtle">
            <tr>
              <th scope="col" className={cn(head, "pl-6")}>
                Customer
              </th>
              <th scope="col" className={cn(head, "w-41.5")}>
                Tags
              </th>
              <th scope="col" className={cn(head, "w-19 text-right")}>
                Orders
              </th>
              <th scope="col" className={cn(head, "w-31.5 text-right")} aria-sort="descending">
                Total spent ↓
              </th>
              <th scope="col" className={cn(head, "w-31.5")}>
                Last order
              </th>
              <th scope="col" className={cn(head, "w-36.5")}>
                Location
              </th>
              <th scope="col" className={cn(head, "w-26.5")}>
                Marketing
              </th>
              <th scope="col" className="w-10 pr-6">
                <span className="sr-only">Open</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="group relative border-t border-border-subtle hover:bg-surface-subtle">
                <td className="py-3 pr-4 pl-6">
                  <span className="flex min-w-0 items-center gap-3">
                    <Avatar customer={customer} />
                    <span className="flex min-w-0 flex-col">
                      <span className="flex items-baseline gap-1">
                        <Name customer={customer} linkAs={LinkAs} />
                        {customer.guest && <span className="text-xs leading-xs font-medium text-text-muted">· Guest</span>}
                      </span>
                      <span className="text-xs leading-xs text-text-muted">{customer.phone}</span>
                    </span>
                  </span>
                </td>
                <td className="py-3 pr-4">
                  {customer.tags.length ? (
                    <span className="flex flex-wrap gap-1">
                      {customer.tags.map((tag) => (
                        <StatusChip key={tag.label} tone={tag.tone} size="tag" className={cn(tag.tone === "neutral" && "text-text-secondary")}>
                          {tag.label}
                        </StatusChip>
                      ))}
                    </span>
                  ) : (
                    <span className="text-xs leading-5 text-text-muted">—</span>
                  )}
                </td>
                <td className="py-3 pr-4 text-right text-14 leading-5 text-text">{customer.orders}</td>
                <td className="py-3 pr-4 text-right text-14 leading-5 font-semibold text-text">{customer.spent}</td>
                <td className="py-3 pr-4 text-sm text-text-secondary">
                  {customer.inactiveDays ? (
                    <span className="flex flex-col">
                      <span className="leading-4.5">{customer.lastOrder}</span>
                      <span className="text-11 leading-3.5 text-warning-text">{customer.inactiveDays} days ago</span>
                    </span>
                  ) : (
                    <span className="leading-5">{customer.lastOrder}</span>
                  )}
                </td>
                <td className="py-3 pr-4 text-sm leading-5 text-text-secondary">{customer.location}</td>
                <td className="py-3 pr-4">
                  <Marketing channels={customer.marketing} />
                </td>
                <td className="py-3 pr-6">
                  <Icon name="chevronRight" size={16} strokeWidth={1.6} className="text-evergreen-300 group-hover:text-text" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Tablet: tag and area under the name. */}
      {!empty && (
        <table className="hidden w-full border-collapse md:table xl:hidden">
          <thead className="bg-surface-subtle">
            <tr>
              <th scope="col" className={cn(head, "pl-4.5 pr-3")}>
                Customer
              </th>
              <th scope="col" className={cn(head, "w-15.5 pr-3 text-right")}>
                Orders
              </th>
              <th scope="col" className={cn(head, "w-26 pr-3 text-right")} aria-sort="descending">
                Spent ↓
              </th>
              <th scope="col" className={cn(head, "w-26 pr-3")}>
                Last order
              </th>
              <th scope="col" className="w-8 pr-4.5">
                <span className="sr-only">Open</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => {
              const tag = customer.tags[0];
              return (
                <tr key={customer.id} className="group relative border-t border-border-subtle hover:bg-surface-subtle">
                  <td className="py-3 pr-3 pl-4.5">
                    <span className="flex min-w-0 items-center gap-3">
                      <Avatar customer={customer} />
                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="flex items-center gap-1.5">
                          <Name customer={customer} linkAs={LinkAs} />
                          {customer.guest && <span className="text-xs leading-xs font-medium text-text-muted">· Guest</span>}
                          {tag && (
                            <StatusChip tone={tag.tone} size="sm" className="py-px leading-3.75">
                              {tag.label}
                            </StatusChip>
                          )}
                        </span>
                        <span className="text-xs leading-xs text-text-muted">
                          {customer.phone} · {customer.compactLocation ?? customer.location}
                        </span>
                      </span>
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-right text-14 leading-5 text-text">{customer.orders}</td>
                  <td className="py-3 pr-3 text-right text-14 leading-5 font-semibold text-text">{customer.spent}</td>
                  <td className="py-3 pr-3 text-sm text-text-secondary">
                    {customer.inactiveDays ? (
                      <span className="flex flex-col">
                        <span className="leading-4.5">{customer.compactLastOrder ?? customer.lastOrder}</span>
                        <span className="text-11 leading-3.5 text-warning-text">{customer.inactiveDays} days</span>
                      </span>
                    ) : (
                      <span className="leading-5">{customer.compactLastOrder ?? customer.lastOrder}</span>
                    )}
                  </td>
                  <td className="py-3 pr-4.5">
                    <Icon name="chevronRight" size={14} strokeWidth={1.6} className="text-evergreen-300 group-hover:text-text" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Mobile: rows. */}
      {!empty && (
        <ul className="md:hidden">
          {customers.map((customer) => {
            const tag = customer.tags[0];
            const last = customer.compactLastOrder ?? customer.lastOrder;
            const count = `${customer.orders} ${customer.orders === 1 ? "order" : "orders"}`;
            return (
              <li key={customer.id} className="relative flex items-center gap-3 border-border-subtle px-3.5 py-3 not-first:border-t active:bg-surface-subtle">
                <Avatar customer={customer} />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate">
                      <Name customer={customer} linkAs={LinkAs} />
                    </span>
                    {customer.guest && <span className="shrink-0 text-xs leading-xs font-medium text-text-muted">· Guest</span>}
                    {tag && (
                      <StatusChip tone={tag.tone} size="sm" className="px-1.5 py-0 text-10 leading-4 font-bold">
                        {tag.label}
                      </StatusChip>
                    )}
                  </span>
                  <span className={cn("text-xs leading-xs", customer.inactiveDays ? "text-warning-text" : "text-text-muted")}>
                    {count} · {customer.inactiveDays ? `inactive ${customer.inactiveDays} days` : `last ${lower(last)}`}
                  </span>
                </span>
                <span className="shrink-0 text-14 leading-4.5 font-semibold text-text">{customer.spent}</span>
              </li>
            );
          })}
        </ul>
      )}

      <nav aria-label="Pagination" className="flex items-center justify-between gap-4 border-t border-border-subtle px-4.5 py-3.5 xl:px-6">
        <p className="text-sm leading-4.5 text-text-muted">
          <span className="hidden xl:inline">Showing </span>
          {range} of {total}
          {note && <span className="hidden xl:inline"> · {note}</span>}
        </p>
        <span className="flex gap-1.5">
          {previousHref ? (
            <LinkAs href={previousHref} className={cn(pill, "hidden font-semibold text-text hover:bg-surface-subtle xl:flex")}>
              Previous
            </LinkAs>
          ) : (
            <span aria-disabled className={cn(pill, "hidden text-text-muted xl:flex")}>
              Previous
            </span>
          )}
          {nextHref && (
            <LinkAs
              href={nextHref}
              className="text-sm leading-4.5 font-semibold text-text hover:underline xl:flex xl:h-8 xl:items-center xl:rounded-full xl:border xl:border-border xl:px-3 xl:hover:bg-surface-subtle xl:hover:no-underline"
            >
              Next
            </LinkAs>
          )}
        </span>
      </nav>
    </section>
  );
}
