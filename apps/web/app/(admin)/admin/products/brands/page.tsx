import type { Metadata } from "next";
import Link from "next/link";

import { Button, Icon } from "@repo/ui/atoms";
import { AdminPageHeader, SectionTabs } from "@repo/ui/organisms";

import { saveBrand } from "../../../../_actions/admin-catalog";
import { catalogTabs, sampleBrands } from "../../../../_content/admin-catalog";
import { BrandEditors, BrandsTable } from "../../_components/catalog";

export const metadata: Metadata = { title: "Brands" };

type SearchParams = Promise<{ brand?: string; all?: string }>;

/** /admin/products/brands (Paper "Jofak - Admin" → Brands). Sample data; saving changes nothing yet. */
export default async function AdminBrandsPage({ searchParams }: { searchParams: SearchParams }) {
  const { brand: picked, all } = await searchParams;
  const brand = sampleBrands.find((item) => item.id === picked) ?? sampleBrands[1]!;
  const brands = all ? sampleBrands : sampleBrands.slice(0, 7);
  const noLogo = sampleBrands.filter((item) => item.mark.tone === "empty").length;

  return (
    <>
      <AdminPageHeader
        layout="inline"
        title="Brands"
        description={
          <>
            <span className="md:hidden">
              {sampleBrands.length} brands · {noLogo} needs a logo
            </span>
            <span className="hidden md:inline">Makers you stock · shown on product pages and as a filter on the storefront</span>
          </>
        }
        actions={
          <Button asChild size="sm" className="hidden h-11 gap-2 md:inline-flex">
            <Link href="/admin/products/brands/new">
              <Icon name="plus" size={14} strokeWidth={2.2} /> New brand
            </Link>
          </Button>
        }
      />
      <SectionTabs linkAs={Link} aria-label="Catalog" tabs={catalogTabs} activeHref="/admin/products/brands" />

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <BrandsTable
          brands={brands}
          total={sampleBrands.length}
          selectedId={brand.id}
          showAllHref="/admin/products/brands?all=1"
          className="xl:flex-1"
        />
        <BrandEditors
          key={brand.id}
          picked={Boolean(picked)}
          name={brand.name}
          slug={brand.slug}
          mark={brand.mark}
          hasLogo={brand.mark.tone !== "empty"}
          count={brand.count}
          productsHref={`/admin/products?brand=${brand.id}`}
          action={saveBrand}
          fields={{ brand: brand.id }}
          className="xl:w-90 xl:shrink-0"
        />
      </div>

      <Button asChild size="sm" className="fixed right-4 bottom-24 z-20 size-13 rounded-full px-0 shadow-card md:hidden">
        <Link href="/admin/products/brands/new" aria-label="New brand">
          <Icon name="plus" size={18} strokeWidth={2.2} />
        </Link>
      </Button>
    </>
  );
}
