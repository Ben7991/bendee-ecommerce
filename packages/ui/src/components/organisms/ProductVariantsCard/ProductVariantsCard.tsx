"use client";

import { useState, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { AdminCard } from "../../molecules";

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  image?: ReactNode;
  tint?: "sage" | "amber" | "lavender" | "sun" | "citrus";
  /** Current price, e.g. "120.00". */
  price: string;
  /** Compare-at price ("116.00"); empty when not on sale. */
  was?: string;
  /** "GHS 58.00". */
  cost: string;
  stock: number;
  /** Amber stock (running low). */
  low?: boolean;
}

const TINT = { sage: "bg-sage-100", amber: "bg-tint-amber", lavender: "bg-tint-lavender", sun: "bg-tint-sun", citrus: "bg-tint-citrus" } as const;

/**
 * ProductVariantsCard (organism): options (Flavour: Citrus · Berry · Mango) and one row per
 * variant with SKU, price, was (compare-at) price, cost and stock (Paper Jofak - Admin → Product
 * editor → Options and variants). Edited prices are highlighted. Was and Cost show from 1440px,
 * SKU from 768px. Posts `price:<id>` and `was:<id>`.
 */
export interface ProductVariantsCardProps extends Omit<ComponentProps<"section">, "children" | "title"> {
  linkAs?: LinkComponent;
  options: ProductOption[];
  variants: ProductVariant[];
  currency?: string;
  editOptionsHref?: string;
  addOptionHref?: string;
}

export function ProductVariantsCard({ linkAs: LinkAs = "a", options, variants, currency = "GHS", editOptionsHref, addOptionHref, ...props }: ProductVariantsCardProps) {
  const [prices, setPrices] = useState<Record<string, string>>(() => Object.fromEntries(variants.map((variant) => [variant.id, variant.price])));
  const head = "py-2 pr-3 text-left text-11 leading-xs font-semibold tracking-label text-text-muted uppercase";
  const box = "flex h-9 items-center gap-1 rounded-10 border border-border bg-bg px-2.5 focus-within:border-brand";

  return (
    <AdminCard
      data-slot="product-variants-card"
      title="Options and variants"
      flush
      meta={
        <button
          type="button"
          onClick={(event) => event.currentTarget.closest("section")?.querySelector<HTMLInputElement>("input[data-price]")?.focus()}
          className="font-semibold text-brand hover:underline"
        >
          Edit all prices
        </button>
      }
      {...props}
    >
      <div className="flex flex-col gap-3.5 px-4.5 pt-3.5 pb-4.5 md:px-6">
        {options.map((option) => (
          <div key={option.name} className="flex items-center gap-2.5 rounded-14 bg-surface-subtle px-3.5 py-3">
            <span className="shrink-0 text-sm leading-sm font-semibold text-text md:w-17.5">{option.name}</span>
            <span className="flex flex-1 flex-wrap gap-1.5">
              {option.values.map((value) => (
                <span key={value} className="rounded-full border border-border bg-bg px-3 py-1 text-sm leading-4.5 font-medium text-text">
                  {value}
                </span>
              ))}
            </span>
            {editOptionsHref && (
              <LinkAs href={editOptionsHref} className="text-sm leading-sm font-semibold text-text-secondary hover:text-text">
                Edit
              </LinkAs>
            )}
          </div>
        ))}
        {addOptionHref && options.length < 3 && (
          <LinkAs href={addOptionHref} className="text-sm leading-sm font-semibold text-brand hover:underline">
            <span className="md:hidden">+ Add option (e.g. Size)</span>
            <span className="hidden md:inline">+ Add another option (up to 3, e.g. Size)</span>
          </LinkAs>
        )}
      </div>

      <table className="w-full border-collapse">
        <thead className="border-t border-border-subtle bg-surface-subtle">
          <tr>
            <th scope="col" className={cn(head, "pl-4.5 md:pl-6")}>
              Variant
            </th>
            <th scope="col" className={cn(head, "hidden w-33 md:table-cell")}>
              SKU
            </th>
            <th scope="col" className={cn(head, "w-29")}>
              Price
            </th>
            <th scope="col" className={cn(head, "hidden w-27 xl:table-cell")}>
              Was
            </th>
            <th scope="col" className={cn(head, "hidden w-24 xl:table-cell")}>
              Cost
            </th>
            <th scope="col" className={cn(head, "w-19 pr-4.5 text-right md:pr-6")}>
              Stock
            </th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => {
            const edited = prices[variant.id] !== variant.price;
            return (
              <tr key={variant.id} className="border-t border-border-subtle">
                <td className="py-3 pr-3 pl-4.5 md:pl-6">
                  <span className="flex items-center gap-2.5">
                    <span className={cn("relative size-9 shrink-0 overflow-hidden rounded-10", TINT[variant.tint ?? "sage"])}>{variant.image}</span>
                    <span className="flex flex-col">
                      <span className="text-14 leading-sm font-semibold text-text">{variant.name}</span>
                      {variant.was && <span className="text-xs leading-xs text-brand">On sale</span>}
                    </span>
                  </span>
                </td>
                <td className="hidden py-3 pr-3 text-sm leading-sm text-text-secondary md:table-cell">{variant.sku}</td>
                <td className="py-3 pr-3">
                  <label className={cn(box, edited && "border-field border-primary bg-sage-50 dark:border-brand")}>
                    <span className="text-xs leading-xs text-text-muted">{currency}</span>
                    <input
                      data-price
                      aria-label={`Price of ${variant.name}`}
                      name={`price:${variant.id}`}
                      inputMode="decimal"
                      value={prices[variant.id]}
                      onChange={(event) => setPrices({ ...prices, [variant.id]: event.target.value })}
                      className={cn("w-full min-w-0 bg-transparent text-14 leading-4.5 text-text outline-none", edited && "font-semibold")}
                    />
                  </label>
                </td>
                <td className="hidden py-3 pr-3 xl:table-cell">
                  <label className={box}>
                    <input
                      aria-label={`Was price of ${variant.name}`}
                      name={`was:${variant.id}`}
                      inputMode="decimal"
                      defaultValue={variant.was}
                      placeholder="—"
                      className={cn("w-full min-w-0 bg-transparent text-sm leading-xs text-text-muted outline-none placeholder:text-text-muted", variant.was && "line-through")}
                    />
                  </label>
                </td>
                <td className="hidden py-3 pr-3 text-sm leading-sm text-text-secondary xl:table-cell">{variant.cost}</td>
                <td className={cn("py-3 pr-4.5 text-right text-14 leading-sm md:pr-6", variant.low ? "font-bold text-warning-text" : "font-semibold text-text")}>{variant.stock}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AdminCard>
  );
}
