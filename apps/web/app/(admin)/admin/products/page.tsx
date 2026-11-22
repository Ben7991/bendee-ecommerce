import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button, Icon } from "@repo/ui/atoms";
import { FilterButton } from "@repo/ui/molecules";
import { AdminPageHeader, FilterBar, SavedViews, SectionTabs } from "@repo/ui/organisms";

import { bulkUpdateProducts } from "../../../_actions/admin-catalog";
import { catalogTabs, findProducts, productBulkActions, productSort, productViews, productsSummary } from "../../../_content/admin-catalog";
import { placeholderSrc } from "../../../_lib/placeholder";
import { ProductsTable } from "../_components/catalog";

export const metadata: Metadata = { title: "Products" };

type SearchParams = Promise<{ status?: string; stock?: string; q?: string; sort?: string }>;

/** /admin/products (Paper "Jofak - Admin" → Products). Sample data; filters narrow the eight sample products. */
export default async function AdminProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const { status, stock, q, sort } = await searchParams;
  const filter = stock === "low" ? "low" : status;
  const active = productViews.find((item) => item.filter === filter) ?? productViews[0]!;
  const products = findProducts({ filter: active.filter, q });
  const narrowed = Boolean(active.filter || q);
  const base = active.filter ? `${active.href}&` : "/admin/products?";
  const keep: Record<string, string> = active.filter ? (active.filter === "low" ? { stock: "low" } : { status: active.filter }) : {};

  return (
    <>
      <AdminPageHeader
        layout="inline"
        title="Products"
        description={
          <>
            {productsSummary.total} products · <strong className="font-semibold text-text">{productsSummary.runningLow} running low</strong>
            <span className="hidden md:inline"> · {productsSummary.draftsToFix} draft needs fixing</span>
          </>
        }
        actions={
          <>
            <Button asChild variant="secondary" size="sm" className="hidden h-11 gap-2 md:inline-flex">
              <a href="/admin/products/export.csv" download>
                <Icon name="export" size={16} /> Export
              </a>
            </Button>
            <Button asChild size="sm" className="size-11 gap-2 px-0 md:w-auto md:px-5">
              <Link href="/admin/products/new" aria-label="Add product">
                <Icon name="plus" size={14} strokeWidth={2.2} />
                <span className="hidden md:inline">Add product</span>
              </Link>
            </Button>
          </>
        }
      />

      {/* Mobile puts search before the status chips; tablet and desktop put the pills first. */}
      <div className="flex flex-col gap-4 md:gap-5">
        <SectionTabs linkAs={Link} aria-label="Catalog" tabs={catalogTabs} activeHref="/admin/products" />
        <SavedViews
          linkAs={Link}
          variant="pills"
          aria-label="Product status"
          views={productViews}
          activeHref={active.href}
          className="order-2 md:order-none"
        />
        <FilterBar
          action="/admin/products"
          keep={keep}
          searchLabel="Search products"
          placeholder="Search by name or SKU"
          compactPlaceholder="Name or SKU"
          defaultQuery={q}
          sort={{ defaultValue: sort ?? "best-selling", options: productSort }}
          searchClassName="xl:w-80"
          className="order-1 md:order-none"
        >
          <FilterButton label="Category" />
          <FilterButton label="Stock" />
          <FilterButton label="Brand" />
        </FilterBar>
      </div>

      <ProductsTable
        products={products.map(({ image, slug, brand, filters: _filters, ...product }) => ({
          ...product,
          href: `/admin/products/${slug}`,
          brand: brand && { label: brand.label, href: `/admin/products/brands?brand=${brand.slug}` },
          image:
            image && placeholderSrc(`${image}.png`) ? (
              <Image src={placeholderSrc(`${image}.png`)!} alt="" fill sizes="56px" className="object-cover" />
            ) : undefined,
        }))}
        bulkActions={productBulkActions}
        bulkAction={bulkUpdateProducts}
        emptyMessage={q ? `No products match “${q}”.` : "No products in this view."}
        pageHrefBase={base}
        pagination={
          narrowed
            ? { page: 1, pageCount: 1, range: products.length ? `1–${products.length}` : "0", total: String(products.length) }
            : {
                page: productsSummary.page,
                pageCount: productsSummary.pageCount,
                range: productsSummary.range,
                total: String(productsSummary.total),
              }
        }
      />
    </>
  );
}
