import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button, Icon } from "@repo/ui/atoms";
import { AdminPageHeader, SectionTabs } from "@repo/ui/organisms";

import { saveCategory } from "../../../../_actions/admin-catalog";
import { catalogTabs, findCategory, parentOptions, sampleCategories } from "../../../../_content/admin-catalog";
import { placeholderSrc } from "../../../../_lib/placeholder";
import { CategoriesTree, CategoryEditors } from "../../_components/catalog";

export const metadata: Metadata = { title: "Categories" };

type SearchParams = Promise<{ category?: string }>;

/** /admin/products/categories (Paper "Jofak - Admin" → Categories). Sample data; saving and reordering change nothing yet. */
export default async function AdminCategoriesPage({ searchParams }: { searchParams: SearchParams }) {
  const { category: picked } = await searchParams;
  const found = (picked && findCategory(picked)) || findCategory(sampleCategories[0]!.id)!;
  const { category, trail } = found;
  const parent = trail.at(-1);
  const banner = category.banner && placeholderSrc(`${category.banner}.png`);
  const subcategories = category.children?.length ?? 0;

  return (
    <>
      <AdminPageHeader
        layout="inline"
        title="Categories"
        description={
          <>
            <span className="md:hidden">19 categories · hold the handle to move</span>
            <span className="hidden md:inline xl:hidden">Drag to reorder or nest · up to 3 levels</span>
            <span className="hidden xl:inline">The shop-by-need tree on the storefront · drag to reorder or nest, up to 3 levels</span>
          </>
        }
        actions={
          <Button asChild size="sm" className="hidden h-11 gap-2 md:inline-flex">
            <Link href="/admin/products/categories/new">
              <Icon name="plus" size={14} strokeWidth={2.2} /> New category
            </Link>
          </Button>
        }
      />
      <SectionTabs linkAs={Link} aria-label="Catalog" tabs={catalogTabs} activeHref="/admin/products/categories" />

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <CategoriesTree
          nodes={sampleCategories}
          selectedId={category.id}
          defaultExpanded={["beauty", "collagen", "sleep", "energy", ...trail.map((node) => node.id)]}
          newHref="/admin/products/categories/new"
          className="xl:flex-1"
        />
        <CategoryEditors
          key={category.id}
          picked={Boolean(picked)}
          trail={trail.length ? `${trail.map((node) => node.name).join(" › ")} ›` : "Top level"}
          defaultValue={{
            name: category.name,
            slug: category.slug,
            parent: parent?.id ?? "",
            description: category.description,
            active: !category.hidden,
          }}
          parents={parentOptions.filter((option) => option.value !== category.id)}
          banner={{
            image: banner ? <Image src={banner} alt="" width={36} height={48} className="h-12 w-9 rounded-t-6 object-cover" /> : undefined,
          }}
          seo={{ title: `${category.name} supplements in Ghana | Jofak`, href: `/admin/products/categories/${category.id}/seo` }}
          addSubcategoryHref={trail.length < 2 ? `/admin/products/categories/new?parent=${category.id}` : undefined}
          deleteNote={
            category.count > 0 || subcategories > 0
              ? {
                  title: `Delete ${category.name}?`,
                  body: `Move its ${category.count} products${subcategories ? ` and ${category.children!.map((child) => child.name).join(", ")}` : ""} first. Categories with products can be hidden, not deleted.`,
                  action: { label: "Move products…", href: `/admin/products?category=${category.id}` },
                }
              : undefined
          }
          action={saveCategory}
          fields={{ category: category.id }}
          className="xl:w-100 xl:shrink-0"
        />
      </div>
    </>
  );
}
