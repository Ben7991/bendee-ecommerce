"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@repo/ui/lib";
import {
  BrandEditor,
  BrandTable,
  CategoryEditor,
  CategoryTree,
  ProductOrganisationCard,
  ProductStatusCard,
  ProductTable,
  ProductVariantsCard,
  type BrandEditorProps,
  type BrandTableProps,
  type CategoryEditorProps,
  type CategoryTreeProps,
  type ProductOrganisationCardProps,
  type ProductStatusCardProps,
  type ProductTableProps,
  type ProductVariantsCardProps,
} from "@repo/ui/organisms";

import { reorderCategories } from "../../../_actions/admin-catalog";

/**
 * Client boundary for the catalog's client organisms: next/link and page links are passed here,
 * because a server component can't hand a component or a function to a client component.
 */
export function ProductsTable({
  pagination,
  pageHrefBase,
  ...props
}: Omit<ProductTableProps, "linkAs" | "pagination"> & {
  pagination?: Omit<NonNullable<ProductTableProps["pagination"]>, "hrefFor">;
  /** "/admin/products?status=active&" — `page=N` is appended. */
  pageHrefBase: string;
}) {
  return (
    <ProductTable {...props} linkAs={Link} pagination={pagination && { ...pagination, hrefFor: (page) => `${pageHrefBase}page=${page}` }} />
  );
}

/** True below 768px (the mobile layout), after mount. */
function useMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return mobile;
}

export function CategoriesTree(props: Omit<CategoryTreeProps, "linkAs" | "hrefFor" | "onReorder">) {
  return (
    <CategoryTree
      {...props}
      linkAs={Link}
      hrefFor={(id) => `/admin/products/categories?category=${id}`}
      onReorder={(parentId, ids) => void reorderCategories(parentId, ids)}
    />
  );
}

/**
 * The category editor: a card from 768px; on mobile a bottom sheet that opens when a category is
 * picked (`?category=`) and goes back to the tree when closed.
 */
export function CategoryEditors({
  picked,
  ...props
}: Omit<CategoryEditorProps, "linkAs" | "presentation" | "open" | "onOpenChange"> & { picked: boolean }) {
  const mobile = useMobile();
  const router = useRouter();
  return (
    <>
      <CategoryEditor {...props} linkAs={Link} className={cn("hidden md:flex", props.className)} />
      <CategoryEditor
        {...props}
        linkAs={Link}
        presentation="sheet"
        open={mobile && picked}
        onOpenChange={(open) => !open && router.push("/admin/products/categories", { scroll: false })}
      />
    </>
  );
}

export function BrandsTable(props: Omit<BrandTableProps, "linkAs" | "hrefFor">) {
  return <BrandTable {...props} linkAs={Link} hrefFor={(id) => `/admin/products/brands?brand=${id}`} />;
}

/** The brand editor: a card from 768px; a bottom sheet on mobile once a brand is picked. */
export function BrandEditors({
  picked,
  ...props
}: Omit<BrandEditorProps, "linkAs" | "presentation" | "open" | "onOpenChange"> & { picked: boolean }) {
  const mobile = useMobile();
  const router = useRouter();
  return (
    <>
      <BrandEditor {...props} linkAs={Link} className={cn("hidden md:block", props.className)} />
      <BrandEditor
        {...props}
        linkAs={Link}
        presentation="sheet"
        open={mobile && picked}
        onOpenChange={(open) => !open && router.push("/admin/products/brands", { scroll: false })}
      />
    </>
  );
}

export function VariantsCard(props: Omit<ProductVariantsCardProps, "linkAs">) {
  return <ProductVariantsCard {...props} linkAs={Link} />;
}

export function StatusCard(props: Omit<ProductStatusCardProps, "linkAs">) {
  return <ProductStatusCard {...props} linkAs={Link} />;
}

export function OrganisationCard(props: Omit<ProductOrganisationCardProps, "linkAs">) {
  return <ProductOrganisationCard {...props} linkAs={Link} />;
}
