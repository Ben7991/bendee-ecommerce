"use client";

import { useState, type ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { BrandMark, Icon, type BrandMarkProps } from "../../atoms";

export interface AdminBrand {
  id: string;
  name: string;
  /** "adinkra-apothecary": shown as /b/<slug>. */
  slug: string;
  mark: Omit<BrandMarkProps, "size">;
  count: number;
  /** "No logo yet" (amber). */
  note?: string;
}

/**
 * BrandTable (organism): the brands you stock (Paper Jofak - Admin → Brands): logo, name, web
 * address and product count, with find and A–Z / most products sorting. The selected brand shows
 * "Editing"; rows link to `hrefFor(id)`. A simple list with chevrons on mobile.
 */
export interface BrandTableProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  brands: AdminBrand[];
  total: number;
  selectedId?: string;
  hrefFor: (id: string) => string;
  showAllHref?: string;
  "aria-label"?: string;
}

export function BrandTable({
  linkAs: LinkAs = "a",
  brands,
  total,
  selectedId,
  hrefFor,
  showAllHref,
  "aria-label": ariaLabel = "Brands",
  className,
  ...props
}: BrandTableProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"az" | "count">("az");
  const shown = brands
    .filter((brand) => brand.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => (sort === "az" ? a.name.localeCompare(b.name) : b.count - a.count));
  const head = "text-11 leading-xs font-semibold tracking-label text-text-muted uppercase";

  return (
    <section data-slot="brand-table" aria-label={ariaLabel} className={cn("flex flex-col overflow-clip rounded-lg border border-border-subtle font-sans", className)} {...props}>
      <div className="hidden items-center gap-2.5 bg-surface-subtle px-4 py-3 md:flex">
        <label className="flex h-9 flex-1 items-center gap-2 rounded-full border border-border bg-bg px-3 focus-within:border-brand">
          <Icon name="search" size={14} strokeWidth={1.5} className="text-text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a brand"
            aria-label="Find a brand"
            className="min-w-0 flex-1 bg-transparent text-sm leading-xs text-text outline-none placeholder:text-text-muted"
          />
        </label>
        <label className="relative flex h-9 items-center rounded-full border border-border bg-bg pr-7 pl-3">
          <span className="sr-only">Sort brands</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as "az" | "count")}
            className="cursor-pointer appearance-none bg-transparent text-sm leading-xs font-semibold text-text outline-none field-sizing-content"
          >
            <option value="az">A–Z</option>
            <option value="count">Most products</option>
          </select>
          <Icon name="chevronDown" size={10} strokeWidth={2} className="pointer-events-none absolute right-3 text-text-muted" />
        </label>
      </div>

      <table className="hidden w-full border-collapse md:table">
        <thead>
          <tr className="border-t border-border-subtle">
            <th scope="col" className={cn(head, "py-2.5 pl-4 text-left")}>
              Brand
            </th>
            <th scope="col" className={cn(head, "w-41.5 py-2.5 pl-3.5 text-left")}>
              Web address
            </th>
            <th scope="col" className={cn(head, "w-23.5 py-2.5 pl-3.5 text-right")}>
              Products
            </th>
            <th scope="col" className="w-13.5 py-2.5 pr-4">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {shown.map((brand) => {
            const selected = brand.id === selectedId;
            return (
              <tr
                key={brand.id}
                aria-selected={selected}
                className={cn(
                  "relative border-t border-border-subtle transition-colors",
                  selected ? "bg-sage-50" : "hover:bg-surface-subtle",
                )}
              >
                <td className={cn("relative py-3 pl-4", selected && "before:absolute before:inset-y-0 before:left-0 before:w-0.75 before:bg-brand")}>
                  <span className="flex items-center gap-3">
                    <BrandMark {...brand.mark} />
                    <span className="flex flex-col">
                      <LinkAs href={hrefFor(brand.id)} className="text-14 leading-sm font-semibold text-text hover:underline">
                        {brand.name}
                      </LinkAs>
                      {selected ? (
                        <span className="text-xs leading-xs font-semibold text-brand">Editing</span>
                      ) : (
                        brand.note && <span className="text-xs leading-xs font-semibold text-warning-text">{brand.note}</span>
                      )}
                    </span>
                  </span>
                </td>
                <td className="py-3 pl-3.5 text-sm leading-4.5 text-text-secondary">/b/{brand.slug}</td>
                <td className={cn("py-3 pl-3.5 text-right text-14 leading-sm font-semibold", brand.count ? "text-text" : "text-text-muted")}>{brand.count}</td>
                <td className="py-3 pr-4 text-right">
                  <LinkAs href={hrefFor(brand.id)} aria-label={`Edit ${brand.name}`} className="inline-flex text-text-muted hover:text-text">
                    <Icon name="more" size={16} />
                  </LinkAs>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ul className="flex flex-col md:hidden">
        {shown.map((brand) => (
          <li key={brand.id} className="border-border-subtle not-first:border-t">
            <LinkAs href={hrefFor(brand.id)} className="flex items-center gap-3 px-3.5 py-3">
              <BrandMark {...brand.mark} />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-base leading-sm font-semibold text-text">{brand.name}</span>
                <span className={cn("text-xs leading-xs", brand.note ? "font-semibold text-warning-text" : "text-text-muted")}>
                  {brand.note ? `${brand.note} · ` : ""}
                  {brand.count} {brand.count === 1 ? "product" : "products"}
                </span>
              </span>
              <Icon name="chevronRight" size={16} strokeWidth={1.6} className="text-text-muted" />
            </LinkAs>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center border-t border-border-subtle px-4 py-3.5 md:justify-between">
        <p className="hidden text-sm leading-4.5 text-text-muted md:block">
          Showing {shown.length} of {total} brands
        </p>
        {showAllHref && shown.length < total && (
          <LinkAs href={showAllHref} className="text-sm leading-4.5 font-semibold text-text hover:underline">
            <span className="md:hidden">Show all {total} brands</span>
            <span className="hidden md:inline">Show all</span>
          </LinkAs>
        )}
      </div>
    </section>
  );
}
