import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, ProductThumb, StatusChip, type ProductThumbProps, type StatusChipProps } from "../../atoms";

type Tone = NonNullable<StatusChipProps["tone"]>;

export interface AdminReturn {
  /** "RTN-0418". */
  id: string;
  href: string;
  /** "2h ago", "1 day". */
  age: string;
  /** Needs a decision: amber row, card on mobile. */
  attention?: boolean;
  customer: { name: string; tag?: string; guest?: boolean };
  order: { number: string; href: string };
  item: { name: string; quantity: number; image?: ReactNode; tint?: ProductThumbProps["tint"] };
  reason: { label: string; tone: Tone };
  /** Photos the customer sent. */
  photos?: number;
  /** "Refund", "Exchange". */
  wants: string;
  /** "GHS 80". */
  value: string;
  /** "Awaiting item" with "Drop-off at Osu store" under it. */
  status: { label: string; tone: Tone; note?: string; compactNote?: string };
  /** The next step: a link (Review, opens the return) or a one-click step posted to `action` (Received, Inspect, Refund). */
  next: { label: string; href?: string; intent?: string; primary?: boolean };
}

/**
 * ReturnTable (organism): returns in progress (Paper Jofak - Admin → Returns). From 1440px a
 * table: return and age, customer and order, item, reason (with photo count), what they want,
 * value, status and the next step. Tablet: a row per return. Mobile: returns needing a decision
 * as amber cards, then the rest in a list. Next steps without a link post `return` and `intent`
 * to `action`.
 */
export interface ReturnTableProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  returns: AdminReturn[];
  action?: string | ((formData: FormData) => void | Promise<void>);
  fields?: Record<string, string>;
  /** From 1440px: "6 open returns · customers are notified by SMS at every step". */
  summary?: string;
  /** "View closed". */
  footerLink?: { label: string; href: string };
  /** Mobile heading for returns that don't need a decision. */
  otherHeading?: string;
  emptyMessage?: string;
  "aria-label"?: string;
}

const head = "py-2.5 pr-3.5 text-left text-11 leading-4 font-semibold tracking-label text-text-muted uppercase";

export function ReturnTable({
  linkAs: LinkAs = "a",
  returns,
  action,
  fields = {},
  summary,
  footerLink,
  otherHeading = "In progress",
  emptyMessage = "No returns here.",
  "aria-label": ariaLabel = "Returns",
  className,
  ...props
}: ReturnTableProps) {
  const next = (item: AdminReturn, size: "md" | "sm" = "md") => {
    const classes = cn(
      "flex shrink-0 items-center rounded-full font-semibold whitespace-nowrap transition-colors",
      size === "sm" ? "h-8 px-3 text-xs leading-xs" : "h-8 px-3.5 text-sm leading-5",
      item.next.primary ? "bg-primary text-on-primary hover:bg-primary-hover" : "border border-border text-text hover:bg-surface-subtle",
    );
    if (item.next.href) {
      return (
        <LinkAs href={item.next.href} aria-label={`${item.next.label} ${item.id}`} className={classes}>
          {item.next.label}
        </LinkAs>
      );
    }
    return (
      <form action={action}>
        {Object.entries(fields).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
        <input type="hidden" name="return" value={item.id} />
        <button type="submit" name="intent" value={item.next.intent} aria-label={`${item.next.label} ${item.id}`} className={classes}>
          {item.next.label}
        </button>
      </form>
    );
  };

  const thumb = (item: AdminReturn, size: "mini" | "line" | "stock") =>
    item.item.image ? (
      <ProductThumb size={size} bleed tint={item.item.tint ?? "surface"} image={item.item.image} />
    ) : (
      <span aria-hidden className={cn("flex shrink-0 items-center justify-center bg-surface text-text-muted", size === "mini" ? "size-9 rounded-10" : "size-10 rounded-10")}>
        <Icon name="bottle" size={16} />
      </span>
    );

  const reasonChip = (item: AdminReturn, withPhotos = false) => (
    <StatusChip tone={item.reason.tone} size="sm" className={cn("py-0.5", item.reason.tone === "neutral" && "text-text-secondary")}>
      {item.reason.label}
      {withPhotos && item.photos ? ` · ${item.photos} photos` : ""}
    </StatusChip>
  );

  const statusChip = (item: AdminReturn) => (
    <StatusChip tone={item.status.tone} size="sm" className="py-0.5">
      {item.status.label}
    </StatusChip>
  );

  const customer = (item: AdminReturn) => (
    <>
      {item.customer.name}
      {item.customer.tag && <span className="ml-1 text-11 font-bold text-brand">{item.customer.tag}</span>}
      {item.customer.guest && <span className="text-xs font-medium text-text-muted"> · Guest</span>}
    </>
  );

  const attention = returns.filter((item) => item.attention);
  const others = returns.filter((item) => !item.attention);

  return (
    <section data-slot="return-table" aria-label={ariaLabel} className={cn("flex flex-col gap-3 font-sans md:gap-0 md:overflow-clip md:rounded-lg md:border md:border-border-subtle", className)} {...props}>
      {returns.length === 0 && <p className="px-6 py-12 text-center text-14 leading-sm text-text-muted">{emptyMessage}</p>}

      {/* Desktop: table. */}
      {returns.length > 0 && (
        <table className="hidden w-full border-collapse xl:table">
          <thead className="bg-surface-subtle">
            <tr>
              <th scope="col" className={cn(head, "w-30 pl-5")}>
                Return
              </th>
              <th scope="col" className={head}>
                Customer · order
              </th>
              <th scope="col" className={cn(head, "w-53.5")}>
                Item
              </th>
              <th scope="col" className={cn(head, "w-36")}>
                Reason
              </th>
              <th scope="col" className={cn(head, "w-23.5")}>
                Wants
              </th>
              <th scope="col" className={cn(head, "w-21 text-right")}>
                Value
              </th>
              <th scope="col" className={cn(head, "w-41")}>
                Status
              </th>
              <th scope="col" className="w-29 pr-5">
                <span className="sr-only">Next step</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {returns.map((item) => (
              <tr key={item.id} className={cn("border-t border-border-subtle", item.attention && "bg-tint-sun/30")}>
                <td className="py-3 pr-3.5 pl-5">
                  <LinkAs href={item.href} className="block text-14 leading-5 font-semibold text-text hover:underline">
                    {item.id}
                  </LinkAs>
                  <span className={cn("text-xs leading-xs", item.attention ? "text-warning-text" : "text-text-muted")}>{item.age}</span>
                </td>
                <td className="py-3 pr-3.5">
                  <span className="block text-14 leading-5 font-semibold text-text">{customer(item)}</span>
                  <LinkAs href={item.order.href} className="text-xs leading-xs font-semibold text-brand hover:underline">
                    {item.order.number}
                  </LinkAs>
                </td>
                <td className="py-3 pr-3.5">
                  <span className="flex items-center gap-2.5">
                    {thumb(item, "mini")}
                    <span className="text-sm leading-5 text-text">
                      {item.item.name} × {item.item.quantity}
                    </span>
                  </span>
                </td>
                <td className="py-3 pr-3.5">
                  <span className="flex items-center gap-1.5">
                    <StatusChip tone={item.reason.tone} className={cn("px-2 leading-5", item.reason.tone === "neutral" && "text-text-secondary")}>
                      {item.reason.label}
                    </StatusChip>
                    {item.photos ? (
                      <span className="flex items-center gap-1 text-xs leading-5 text-text-muted" aria-label={`${item.photos} photos`}>
                        <Icon name="camera" size={14} />
                        {item.photos}
                      </span>
                    ) : null}
                  </span>
                </td>
                <td className="py-3 pr-3.5 text-sm leading-5 text-text-secondary">{item.wants}</td>
                <td className="py-3 pr-3.5 text-right text-14 leading-5 font-semibold text-text">{item.value}</td>
                <td className="py-3 pr-3.5">
                  <span className="flex flex-col gap-0.5">
                    <StatusChip tone={item.status.tone} className="px-2.25 leading-5">
                      {item.status.label}
                    </StatusChip>
                    {item.status.note && <span className="text-11 leading-3.5 text-text-muted">{item.status.note}</span>}
                  </span>
                </td>
                <td className="py-3 pr-5">
                  <span className="flex justify-end">{next(item)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Tablet: rows. */}
      {returns.length > 0 && (
        <ul className="hidden md:block xl:hidden">
          {returns.map((item) => (
            <li key={item.id} className={cn("relative flex items-center gap-3.5 border-border-subtle px-4.5 py-3.5 not-first:border-t", item.attention && "bg-tint-sun/30")}>
              {thumb(item, "line")}
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <LinkAs href={item.href} className="truncate text-14 leading-5 text-text after:absolute after:inset-0 hover:underline">
                  <span className="font-bold">{item.id}</span> · {item.customer.name}
                </LinkAs>
                <span className="flex min-w-0 items-center gap-1.5 text-xs leading-xs text-text-muted">
                  {item.attention ? reasonChip(item, true) : statusChip(item)}
                  <span className="truncate">
                    {item.attention ? `${item.item.name} × ${item.item.quantity} · ${item.wants.toLowerCase()}` : (item.status.note ?? `${item.item.name} × ${item.item.quantity}`)}
                  </span>
                </span>
              </span>
              <span className="flex shrink-0 flex-col items-end">
                <span className="text-14 leading-5 font-semibold text-text">{item.value}</span>
                {item.attention && <span className="text-11 leading-3.5 text-warning-text">{item.age}</span>}
              </span>
              <span className="relative z-1">{next(item)}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Mobile: decisions first, then the rest. */}
      {attention.length > 0 && (
        <div className="flex flex-col gap-2.5 md:hidden">
          <h3 className="text-xs leading-xs font-semibold tracking-label text-warning-text uppercase">Needs a decision</h3>
          <ul className="flex flex-col gap-3">
            {attention.map((item) => (
              <li key={item.id} className="relative flex flex-col gap-2.5 rounded-18 border-field border-warning bg-tint-sun/30 p-3.5">
                <span className="flex items-center gap-3">
                  {thumb(item, "stock")}
                  <span className="flex min-w-0 flex-1 flex-col">
                    <LinkAs href={item.href} className="truncate text-14 leading-5 font-semibold text-text after:absolute after:inset-0">
                      {item.id} · {item.customer.name}
                    </LinkAs>
                    <span className="truncate text-xs leading-xs text-text-muted">
                      {item.item.name} × {item.item.quantity} · wants {item.wants.toLowerCase()}
                    </span>
                  </span>
                  <span className="shrink-0 text-14 leading-4.5 font-semibold text-text">{item.value}</span>
                </span>
                <span className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-1.5">
                    {reasonChip(item, true)}
                    <span className="text-11 leading-3.5 text-warning-text">{item.age}</span>
                  </span>
                  <span className="relative z-1">{next(item)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {others.length > 0 && (
        <div className="flex flex-col gap-2.5 md:hidden">
          <h3 className="text-xs leading-xs font-semibold tracking-label text-text-muted uppercase">{otherHeading}</h3>
          <ul className="overflow-clip rounded-18 border border-border-subtle">
            {others.map((item) => (
              <li key={item.id} className="relative flex items-center gap-3 border-border-subtle px-3.5 py-3 not-first:border-t">
                <span className="flex min-w-0 flex-1 flex-col gap-0.75">
                  <LinkAs href={item.href} className="truncate text-14 leading-5 font-semibold text-text after:absolute after:inset-0">
                    {item.id} · {item.customer.name}
                  </LinkAs>
                  <span className="flex min-w-0 items-center gap-1.5 text-xs leading-xs text-text-muted">
                    {statusChip(item)}
                    <span className="truncate">{item.status.compactNote ?? item.status.note ?? item.value}</span>
                  </span>
                </span>
                <span className="relative z-1">{next(item, "sm")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {returns.length > 0 && (summary || footerLink) && (
        <div className="hidden items-center justify-between gap-4 border-t border-border-subtle px-5 py-3.5 xl:flex">
          <p className="text-sm leading-4.5 text-text-muted">{summary}</p>
          {footerLink && (
            <LinkAs href={footerLink.href} className="text-sm leading-4.5 font-semibold text-text hover:underline">
              {footerLink.label}
            </LinkAs>
          )}
        </div>
      )}
    </section>
  );
}
