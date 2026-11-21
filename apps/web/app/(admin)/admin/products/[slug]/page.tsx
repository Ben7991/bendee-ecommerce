import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  ProductDetailsCard,
  ProductEditorForm,
  ProductEditorHeader,
  ProductMediaCard,
  ProductReadyCard,
  ProductSeoCard,
  ProductStatsCard,
} from "@repo/ui/organisms";
import Link from "next/link";

import { saveProduct } from "../../../../_actions/admin-catalog";
import { editorCategories, editorTaxes, findProductEditor, sampleBrands } from "../../../../_content/admin-catalog";
import { placeholderSrc } from "../../../../_lib/placeholder";
import { OrganisationCard, StatusCard, VariantsCard } from "../../_components/catalog";
import { MoreMenu } from "../../_components/order-detail";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = findProductEditor((await params).slug);
  return { title: product ? `Edit ${product.name}` : "Product" };
}

const packshot = (id: string | undefined, sizes: string, className = "object-cover") => {
  const src = id && placeholderSrc(`${id}.png`);
  return src ? <Image src={src} alt="" fill sizes={sizes} className={className} /> : null;
};

/** /admin/products/[slug] (Paper "Jofak - Admin" → Product editor). Sample data; Save changes nothing yet. */
export default async function AdminProductEditorPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = findProductEditor(slug);
  if (!product) notFound();

  const checks = [
    { label: "At least one image", done: product.media.length > 0 },
    { label: "Every variant has a price and SKU", done: product.variants.every((variant) => Number(variant.price) > 0 && variant.sku) },
    { label: "Main category chosen", done: Boolean(product.category) },
    { label: "Description written", done: product.description.replace(/<[^>]+>/g, "").trim().length > 0 },
  ];

  return (
    <ProductEditorForm action={saveProduct} aria-label={`Edit ${product.name}`}>
      <input type="hidden" name="product" value={product.slug} />
      <ProductEditorHeader
        linkAs={Link}
        backHref="/admin/products"
        name={product.name}
        image={packshot(product.image, "56px")}
        status={product.statusChip}
        meta={product.meta}
        previewHref={`/products/${product.slug}`}
        duplicateHref={`/admin/products/new?from=${product.slug}`}
        more={
          <MoreMenu
            items={[
              { label: "View stock in Inventory", href: `/admin/inventory?q=${product.slug}`, icon: "warehouse" },
              { label: "Orders with this product", href: `/admin/orders?q=${encodeURIComponent(product.name)}`, icon: "box" },
              { label: "Archive product", href: `/admin/products/${product.slug}/archive`, icon: "close" },
            ]}
          />
        }
      />

      {/*
       * One grid reordered per breakpoint: mobile and tablet put the side cards (status, ready,
       * organisation, last 30 days) first, two by two on tablet; from 1440px they form the right column.
       */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:flex xl:items-start">
        <div className="contents xl:flex xl:min-w-0 xl:flex-1 xl:flex-col xl:gap-5">
          <ProductDetailsCard name={product.name} description={product.description} className="order-5 md:col-span-2 xl:order-none" />
          <ProductMediaCard
            images={product.media.map((item, index) => ({
              id: item.id,
              tint: item.tint,
              alt: `${product.name}, image ${index + 1}`,
              image: packshot(product.image, index === 0 ? "200px" : "94px"),
            }))}
            className="order-6 md:col-span-2 xl:order-none"
          />
          <VariantsCard
            options={product.options}
            variants={product.variants.map((variant) => ({ ...variant, image: packshot(product.image, "36px") }))}
            editOptionsHref={`/admin/products/${product.slug}/options`}
            addOptionHref={`/admin/products/${product.slug}/options/new`}
            className="order-7 md:col-span-2 xl:order-none"
          />
          <ProductSeoCard
            title={product.seo.title}
            slug={product.slug}
            description={product.seo.description}
            className="order-8 md:col-span-2 xl:order-none"
          />
        </div>
        <div className="contents xl:flex xl:w-85 xl:shrink-0 xl:flex-col xl:gap-4">
          <StatusCard
            status={product.status}
            scheduleHref={`/admin/products/${product.slug}/schedule`}
            className="order-1 md:self-start xl:order-none xl:self-auto"
          />
          <OrganisationCard
            categories={[{ value: "", label: "Choose a category" }, ...editorCategories]}
            category={product.category}
            alsoIn={product.alsoIn}
            brands={[
              { value: "", label: "No brand", mark: { tone: "empty" } },
              ...sampleBrands.map((brand) => ({ value: brand.id, label: brand.name, mark: brand.mark })),
            ]}
            brand={product.brand}
            tags={product.tags}
            taxes={editorTaxes}
            tax={product.tax}
            manageCategoriesHref="/admin/products/categories"
            manageBrandsHref="/admin/products/brands"
            className="order-3 xl:order-none"
          />
          <ProductReadyCard checks={checks} className="order-2 md:self-start xl:order-none xl:self-auto" />
          <ProductStatsCard
            stats={product.stats}
            reportsHref={`/admin/reports?product=${product.slug}`}
            className="order-4 md:self-start xl:order-none xl:self-auto"
          />
        </div>
      </div>
    </ProductEditorForm>
  );
}
