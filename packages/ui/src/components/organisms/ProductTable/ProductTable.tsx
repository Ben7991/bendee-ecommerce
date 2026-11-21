"use client";

import { useState, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Checkbox, Icon, StatusChip, type StatusChipProps } from "../../atoms";
import { TablePagination, type TablePaginationProps } from "../../molecules";

type Tint = "sage" | "amber" | "lavender" | "sun" | "citrus" | "surface";

export interface AdminProduct {
  id: string;
  name: string;
  href: string;
  /** Packshot (next/image with `fill`); without one, a dashed "add a photo" tile or a bottle tile in `tint`. */
  image?: ReactNode;
  tint?: Tint;
  missingImage?: boolean;
  /** "2 variants". */
  variants?: string;
  brand?: { label: string; href: string };
  /** A problem in red instead of variants and brand ("2 things to fix before publishing"). */
  issue?: string;
  /** Mobile: a shorter issue ("Needs a photo and a category"). */
  compactIssue?: string;
  /** A quiet line instead (archived: "Archived 2 Oct · URL redirects to Iron & B12"). */
  note?: string;
  status: { label: string; tone: NonNullable<StatusChipProps["tone"]>; note?: string };
  /** Null: "No category · Choose one". */
  category: { name: string; parent: string } | null;
  stock: { label: string; detail?: string; tone: "error" | "warning" | "ok" | "muted" };
  /** "GHS 145–260"; mobile "GHS 145+". */
  price: string;
  compactPrice?: string;
  /** Units sold in the last 30 days; null shows a dash. */
  sold: number | null;
  archived?: boolean;
}

export interface ProductBulkAction {
  value: string;
  label: string;
  primary?: boolean;
}

const TINT: Record<Tint, string> = {
  sage: "bg-sage-100",
  amber: "bg-tint-amber",
  lavender: "bg-tint-lavender",
  sun: "bg-tint-sun",
  citrus: "bg-tint-citrus text-error",
  surface: "bg-surface text-text-muted",
};

const STOCK = {
  error: "font-semibold text-error",
  warning: "font-semibold text-warning-text",
  ok: "font-semibold text-text",
  muted: "text-text-muted",
} as const;

function Thumb({ product, size }: { product: AdminProduct; size: "md" | "lg" }) {
  const box = size === "lg" ? "size-14 rounded-14" : "size-12 rounded-sm";
  if (product.image) {
    return <span className={cn("relative shrink-0 overflow-hidden", box, TINT[product.tint ?? "sage"])}>{product.image}</span>;
  }
  if (product.missingImage) {
    return (
      <span className={cn("flex shrink-0 items-center justify-center border-field border-dashed border-border text-evergreen-300", box)}>
        <Icon name="image" size={18} strokeWidth={1.6} />
      </span>
    );
  }
  return (
    <span className={cn("flex shrink-0 items-center justify-center", box, TINT[product.tint ?? "surface"])}>
      <Icon name="bottle" size={20} />
    </span>
  );
}

/**
 * ProductTable (organism): the admin catalog (Paper Jofak - Admin → Products). Product, status,
 * category, stock (red when a variant is sold out, amber when low), price and units sold in 30
 * days. Category and Sold drop out on tablet; mobile shows cards. Selecting rows shows a bulk
 * bar whose buttons submit `bulkAction` with `intent` and one `product` per id.
 */
export interface ProductTableProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  products: AdminProduct[];
  bulkActions?: ProductBulkAction[];
  bulkAction?: string | ((formData: FormData) => void | Promise<void>);
  pagination?: Omit<TablePaginationProps, "linkAs">;
  emptyMessage?: string;
  "aria-label"?: string;
}

export function ProductTable({
  linkAs: LinkAs = "a",
  products,
  bulkActions = [],
  bulkAction,
  pagination,
  emptyMessage = "No products match these filters.",
  "aria-label": ariaLabel = "Products",
  className,
  ...props
}: ProductTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const chosen = products.filter((product) => selected.has(product.id));
  const all = products.length > 0 && chosen.length === products.length;
  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };
  const head = "py-2.5 pr-4 text-left text-xs leading-xs font-semibold tracking-label text-text-muted uppercase";

  const subline = (product: AdminProduct, withCategory: boolean) =>
    product.issue ? (
      <span className="text-xs leading-xs text-error">{product.issue}</span>
    ) : product.note ? (
      <span className="text-xs leading-xs text-text-muted">{product.note}</span>
    ) : (
      <>
        {withCategory && product.category && <span className="text-xs leading-xs text-text-muted xl:hidden">{product.category.name}</span>}
        <span className="text-xs leading-xs text-text-muted">
          {product.variants && <span className="hidden xl:inline">{product.variants} · </span>}
          {product.brand && (
            <LinkAs href={product.brand.href} className="font-semibold text-brand hover:underline">
              {product.brand.label}
            </LinkAs>
          )}
        </span>
      </>
    );

  return (
    <section data-slot="product-table" aria-label={ariaLabel} className={cn("font-sans", className)} {...props}>
      <div className="hidden overflow-clip rounded-lg border border-border-subtle md:block">
        {chosen.length > 0 && (
          <form action={bulkAction} aria-label="Bulk actions" className="flex items-center gap-3 bg-text py-2.5 pr-4 pl-6 dark:bg-primary">
            {chosen.map((product) => (
              <input key={product.id} type="hidden" name="product" value={product.id} />
            ))}
            <p role="status" className="text-14 leading-sm font-semibold text-text-inverse">
              {chosen.length} selected
            </p>
            <span className="flex-1" />
            {bulkActions.map((action) => (
              <button
                key={action.value}
                type={bulkAction ? "submit" : "button"}
                name="intent"
                value={action.value}
                className={cn(
                  "flex h-8.5 items-center rounded-full px-3.5 text-sm leading-xs font-semibold transition-colors",
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
              className="flex size-8.5 items-center justify-center rounded-full text-text-inverse-muted hover:text-text-inverse"
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
                  onCheckedChange={() => setSelected(all ? new Set() : new Set(products.map((product) => product.id)))}
                  aria-label="Select all products on this page"
                  className="align-middle"
                />
              </th>
              <th scope="col" className={head}>
                Product
              </th>
              <th scope="col" className={cn(head, "w-39")}>
                Status
              </th>
              <th scope="col" className={cn(head, "hidden w-36.5 xl:table-cell")}>
                Category
              </th>
              <th scope="col" className={cn(head, "w-39")}>
                Stock
              </th>
              <th scope="col" className={cn(head, "w-34 text-right xl:pr-4")}>
                Price
              </th>
              <th scope="col" className={cn(head, "hidden w-24 pr-6 text-right xl:table-cell")}>
                Sold 30d
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-14 leading-sm text-text-muted">
                  {emptyMessage}
                </td>
              </tr>
            )}
            {products.map((product) => {
              const isSelected = selected.has(product.id);
              const muted = product.archived;
              return (
                <tr
                  key={product.id}
                  aria-selected={isSelected}
                  className={cn("border-b border-border-subtle transition-colors last:border-b-0", isSelected ? "bg-sage-50" : "hover:bg-surface-subtle")}
                >
                  <td className="py-3 pr-4 pl-6 align-middle">
                    <Checkbox checked={isSelected} onCheckedChange={() => toggle(product.id)} aria-label={`Select ${product.name}`} className="align-middle" />
                  </td>
                  <td className="py-3 pr-4 align-middle">
                    <span className={cn("flex items-center gap-3", muted && "opacity-muted")}>
                      <Thumb product={product} size="md" />
                      <span className="flex min-w-0 flex-col">
                        <LinkAs href={product.href} className="text-14 leading-sm font-semibold text-text hover:underline">
                          {product.name}
                        </LinkAs>
                        {subline(product, true)}
                      </span>
                    </span>
                  </td>
                  <td className="py-3 pr-4 align-middle">
                    <span className="flex flex-col items-start gap-1">
                      <StatusChip tone={product.status.tone} size="lg">
                        {product.status.label}
                      </StatusChip>
                      {product.status.note && <span className="text-xs leading-xs text-text-muted">{product.status.note}</span>}
                    </span>
                  </td>
                  <td className="hidden py-3 pr-4 align-middle text-sm leading-4.5 xl:table-cell">
                    {product.category ? (
                      <span className={cn("flex flex-col", muted ? "text-text-muted" : "text-text")}>
                        <span className="font-semibold">{product.category.name}</span>
                        <span className="text-xs text-text-muted">{product.category.parent}</span>
                      </span>
                    ) : (
                      <span className="flex flex-col font-semibold text-error">
                        No category
                        <LinkAs href={product.href} className="text-xs text-brand hover:underline">
                          Choose one
                        </LinkAs>
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4 align-middle text-sm leading-sm">
                    <span className={cn("block", STOCK[product.stock.tone])}>{product.stock.label}</span>
                    {product.stock.detail && <span className="text-xs leading-xs text-text-muted">{product.stock.detail}</span>}
                  </td>
                  <td className={cn("py-3 pr-6 text-right align-middle text-14 leading-sm xl:pr-4", muted ? "text-text-muted" : "font-semibold text-text")}>{product.price}</td>
                  <td className={cn("hidden py-3 pr-6 text-right align-middle text-14 leading-sm xl:table-cell", product.sold === null ? "text-text-muted" : "text-text-secondary")}>
                    {product.sold ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {pagination && <TablePagination linkAs={LinkAs} {...pagination} />}
      </div>

      {/* Mobile: cards. */}
      {products.length === 0 ? (
        <p className="rounded-lg border border-border-subtle px-4 py-10 text-center text-14 leading-sm text-text-muted md:hidden">{emptyMessage}</p>
      ) : (
        <ul className="flex flex-col overflow-clip rounded-lg border border-border-subtle md:hidden">
          {products.map((product) => (
            <li key={product.id} className="border-border-subtle not-last:border-b">
              <LinkAs href={product.href} className="flex gap-3 px-4 py-3.5">
                <Thumb product={product} size="lg" />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="flex justify-between gap-2">
                    <span className="text-base leading-sm font-semibold text-text">{product.name}</span>
                    <span className="shrink-0 text-14 leading-sm font-semibold text-text">{product.compactPrice ?? product.price}</span>
                  </span>
                  {product.issue ? (
                    <span className="text-xs leading-xs text-error">{product.compactIssue ?? product.issue}</span>
                  ) : (
                    <span className={cn("text-xs leading-xs", product.stock.tone === "ok" ? "text-text-muted" : STOCK[product.stock.tone])}>
                      {product.stock.label}
                      {product.stock.detail && ` · ${product.stock.detail}`}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <StatusChip tone={product.status.tone} size="sm" className="px-2">
                      {product.status.label}
                    </StatusChip>
                    {product.status.note ? (
                      <span className="text-xs leading-xs text-text-muted">{product.status.note}</span>
                    ) : (
                      product.brand && <span className="text-xs leading-xs font-semibold text-brand">{product.brand.label}</span>
                    )}
                  </span>
                </span>
              </LinkAs>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
