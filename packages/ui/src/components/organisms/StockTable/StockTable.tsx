import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, ProductThumb, ProgressBar, type ProductThumbProps } from "../../atoms";

export interface StockItem {
  id: string;
  /** "Ashwagandha Calm · 60 caps". */
  name: string;
  /** Mobile: "Ashwagandha Calm · 60". */
  compactName?: string;
  /** "JF-ASH-60 · Shelf B2". */
  detail: string;
  /** Packshot (next/image with `fill`). */
  image?: ReactNode;
  tint?: ProductThumbProps["tint"];
  /** False: stock isn't counted (made to order). */
  tracked?: boolean;
  onHand: number;
  reserved: number;
  available: number;
  alertAt: number;
  /** "GHS 140". */
  value: string;
  /** Sold out, at or under the alert level, or fine. */
  status: "out" | "low" | "ok";
  /** Fill of the level bar, 0–100. */
  level: number;
  /** Row action: Receive (brand), Adjust, Track. */
  action: { label: string; href: string; tone?: "brand" };
}

const TEXT = { out: "text-error", low: "text-warning-text", ok: "text-text" } as const;
const BAR = { out: "error", low: "warning", ok: "brand" } as const;
const LABEL = { out: "Sold out", low: "Low", ok: "" } as const;

/**
 * StockTable (organism): stock levels per variant (Paper Jofak - Admin → Inventory → Stock
 * levels). From 1440px on hand, reserved, available with a level bar, alert level, value at cost
 * and an action; tablet keeps on hand, available and the action; mobile a list with the
 * available count. Sold-out rows are tinted; low and sold-out rows offer Receive. Items whose
 * stock isn't tracked say so and offer Track. Without a packshot, a plain item tile shows.
 */
export interface StockTableProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  items: StockItem[];
  emptyMessage?: string;
  "aria-label"?: string;
}

const head = "py-2.5 pr-4 text-left text-xs leading-xs font-semibold tracking-label text-text-muted uppercase";

function Available({ item }: { item: StockItem }) {
  return (
    <span className="flex flex-col gap-1.5">
      <span className={cn("text-14 leading-5 font-bold", TEXT[item.status])}>
        {item.available}
        {item.status !== "ok" && ` · ${LABEL[item.status]}`}
      </span>
      <ProgressBar size="xs" tone={BAR[item.status]} value={Math.max(2, item.level)} label={`${item.name} stock level`} />
    </span>
  );
}

export function StockTable({ linkAs: LinkAs = "a", items, emptyMessage = "No variants in this view.", "aria-label": ariaLabel = "Stock levels", className, ...props }: StockTableProps) {
  const thumb = (item: StockItem) =>
    item.tracked === false || !item.image ? (
      <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-surface text-text-muted md:size-11">
        <Icon name="hexagon" size={20} />
      </span>
    ) : (
      <ProductThumb size="stock" bleed tint={item.tint ?? "surface"} image={item.image} />
    );

  const action = (item: StockItem, mobile = false) => (
    <LinkAs
      href={item.action.href}
      aria-label={`${item.action.label} ${item.name}`}
      className={cn(
        "font-semibold hover:underline",
        mobile ? "text-xs leading-xs" : "text-sm leading-4",
        item.action.tone === "brand" ? "text-brand" : "text-text-secondary",
      )}
    >
      {item.action.label}
    </LinkAs>
  );

  const name = (item: StockItem) => (
    <span className="flex min-w-0 items-center gap-3">
      {thumb(item)}
      <span className="flex min-w-0 flex-col">
        <span className="text-14 leading-5 font-semibold text-text">{item.name}</span>
        <span className="text-xs leading-xs text-text-muted">{item.detail}</span>
      </span>
    </span>
  );

  const rowTone = (item: StockItem) => (item.status === "out" ? "bg-tint-citrus/45" : undefined);

  return (
    <section
      data-slot="stock-table"
      aria-label={ariaLabel}
      className={cn("flex flex-col overflow-clip rounded-18 border border-border-subtle font-sans md:rounded-lg", className)}
      {...props}
    >
      {items.length === 0 && <p className="px-6 py-12 text-center text-14 leading-sm text-text-muted">{emptyMessage}</p>}

      {items.length > 0 && (
        <table className="hidden w-full border-collapse md:table">
          <thead className="bg-surface-subtle">
            <tr>
              <th scope="col" className={cn(head, "pl-6")}>
                Variant
              </th>
              <th scope="col" className={cn(head, "w-23 text-right")}>
                On hand
              </th>
              <th scope="col" className={cn(head, "hidden w-24 text-right xl:table-cell")}>
                Reserved
              </th>
              <th scope="col" className={cn(head, "w-41.5")}>
                Available
              </th>
              <th scope="col" className={cn(head, "hidden w-22 text-right xl:table-cell")}>
                Alert at
              </th>
              <th scope="col" className={cn(head, "hidden w-29 text-right xl:table-cell")}>
                Value
              </th>
              <th scope="col" className="w-24 pr-6">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) =>
              item.tracked === false ? (
                <tr key={item.id} className="border-t border-border-subtle">
                  <td className="py-3 pr-4 pl-6">{name(item)}</td>
                  <td colSpan={2} className="py-3 pr-4 text-sm leading-5 text-text-muted xl:hidden">
                    Stock not tracked for this item
                  </td>
                  <td colSpan={5} className="hidden py-3 pr-4 text-sm leading-5 text-text-muted xl:table-cell">
                    Stock not tracked for this item
                  </td>
                  <td className="py-3 pr-6 text-right">{action(item)}</td>
                </tr>
              ) : (
                <tr key={item.id} className={cn("border-t border-border-subtle", rowTone(item))}>
                  <td className="py-3 pr-4 pl-6">{name(item)}</td>
                  <td className="py-3 pr-4 text-right text-14 leading-5 text-text-secondary">{item.onHand}</td>
                  <td className={cn("hidden py-3 pr-4 text-right text-14 leading-5 xl:table-cell", item.reserved ? "text-text-secondary" : "text-text-muted")}>
                    {item.reserved}
                  </td>
                  <td className="py-3 pr-4">
                    <Available item={item} />
                  </td>
                  <td className="hidden py-3 pr-4 text-right text-sm leading-5 text-text-muted xl:table-cell">{item.alertAt}</td>
                  <td className="hidden py-3 pr-4 text-right text-sm leading-5 text-text-secondary xl:table-cell">{item.value}</td>
                  <td className="py-3 pr-6 text-right">{action(item)}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}

      {/* Mobile: a list. */}
      {items.length > 0 && (
        <ul className="md:hidden">
          {items.map((item) => (
            <li key={item.id} className={cn("flex items-center gap-3 border-border-subtle px-4 py-3.5 not-first:border-t", rowTone(item))}>
              {thumb(item)}
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-14 leading-5 font-semibold text-text">{item.compactName ?? item.name}</span>
                <span className="text-xs leading-xs text-text-muted">
                  {item.tracked === false
                    ? "Stock not tracked"
                    : `${item.onHand} on hand · ${item.reserved ? `${item.reserved} reserved` : `alert at ${item.alertAt}`}`}
                </span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-0.5">
                {item.tracked !== false && <span className={cn("text-lg leading-5.5 font-bold", TEXT[item.status])}>{item.available}</span>}
                {action(item, true)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
