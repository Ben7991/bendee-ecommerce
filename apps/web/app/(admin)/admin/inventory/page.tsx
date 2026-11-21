import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@repo/ui/atoms";
import { ListSearch } from "@repo/ui/molecules";
import { SavedViews, SectionTabs, StockTable } from "@repo/ui/organisms";

import { findStock, inventoryTabs, stockViews, type StockFilter } from "../../../_content/admin-inventory";
import { placeholderSrc } from "../../../_lib/placeholder";
import { InventoryPanels } from "./_panels";

export const metadata: Metadata = { title: "Inventory" };

type SearchParams = Promise<{ stock?: string; q?: string; receive?: string; adjust?: string; mode?: string }>;

/** /admin/inventory: stock levels (Paper "Jofak - Admin" → Inventory). Sample data; Receive and Adjust open from the URL and change the in-memory sample stock. */
export default async function AdminInventoryPage({ searchParams }: { searchParams: SearchParams }) {
  const { stock, q, receive, adjust, mode } = await searchParams;
  const views = stockViews();
  const filter: StockFilter | undefined = stock === "low" || stock === "out" ? stock : undefined;
  const active = views.find((view) => view.filter === filter) ?? views[0]!;
  // The list URL without a panel open: row actions add ?receive / ?adjust to it, closing returns to it.
  const params = new URLSearchParams({ ...(filter && { stock: filter }), ...(q && { q }) }).toString();
  const base = `/admin/inventory${params ? `?${params}` : ""}`;
  const items = findStock({ filter, q, base });

  const search = (className?: string, fieldClassName?: string) => (
    <ListSearch
      linkAs={Link}
      action="/admin/inventory"
      label="Search stock"
      placeholder="Product, SKU or barcode"
      defaultQuery={q}
      keep={filter ? { stock: filter } : {}}
      className={className}
      fieldClassName={fieldClassName}
    />
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <SectionTabs
          linkAs={Link}
          aria-label="Inventory"
          tabs={inventoryTabs}
          activeHref="/admin/inventory"
          trailing={
            <>
              {search("min-w-0 flex-1 xl:flex-none", "xl:w-65")}
              <SavedViews
                linkAs={Link}
                variant="segmented"
                fill={false}
                aria-label="Stock filter"
                views={views}
                activeHref={active.href}
                className="hidden md:block"
              />
            </>
          }
        />
        {search("md:hidden")}
      </div>

      <StockTable
        linkAs={Link}
        items={items.map(({ image, ...item }) => ({
          ...item,
          image:
            image && placeholderSrc(`${image}.png`) ? (
              <Image src={placeholderSrc(`${image}.png`)!} alt="" fill sizes="48px" className="object-cover" />
            ) : undefined,
        }))}
        emptyMessage={q ? `No variants match “${q}”.` : "No variants in this view."}
      />

      <Button asChild size="lg" className="h-12 w-full md:hidden">
        <Link href={`${base}${base.includes("?") ? "&" : "?"}receive=new`} scroll={false}>
          Receive stock
        </Link>
      </Button>

      <InventoryPanels receive={receive} adjust={adjust} mode={mode} closeHref={base} />
    </>
  );
}
