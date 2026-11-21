import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CollectionDetailsCard,
  CollectionEditorHeader,
  CollectionMatchesCard,
  CollectionScheduleCard,
  CollectionSeoCard,
  CollectionVisibilityCard,
  ProductEditorForm,
} from "@repo/ui/organisms";

import { saveCollectionAction } from "../../../../_actions/admin-collections";
import { findCollectionEditor, ruleCategories, ruleProducts } from "../../../../_content/admin-collections";
import { placeholderSrc } from "../../../../_lib/placeholder";
import { ProductsCard } from "../../_components/collections";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ saved?: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  return { title: findCollectionEditor(slug)?.name ?? "Collection" };
}

function packshot(image: string | undefined, sizes: string) {
  const src = image && placeholderSrc(`${image}.png`);
  return src ? <Image src={src} alt="" fill sizes={sizes} className="object-cover" /> : undefined;
}

const SHOTS = ["h-21 w-14.5 bg-sage-100", "h-24 w-14.5 bg-tint-amber", "h-19 w-14.5 bg-tint-citrus"];

/** /admin/collections/[slug] (Paper "Jofak - Admin" → Collection editor). Saves to the in-memory sample collections. */
export default async function AdminCollectionPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { slug } = await params;
  const { saved } = await searchParams;
  const collection = findCollectionEditor(slug);
  if (!collection) notFound();

  const banner =
    collection.banner.kind === "images" ? (
      <span className="flex h-full items-end justify-center gap-1.5 px-3.5">
        {collection.banner.images.slice(0, 3).map((image, index) => (
          <span key={index} className={`relative shrink-0 overflow-hidden rounded-t-10 ${SHOTS[index]}`}>
            {packshot(image, "58px")}
          </span>
        ))}
      </span>
    ) : collection.banner.kind === "text" ? (
      <span className="self-center text-2xl font-semibold text-text-inverse">{collection.banner.text}</span>
    ) : undefined;

  return (
    <ProductEditorForm key={saved ?? "loaded"} variant="light" action={saveCollectionAction.bind(null, collection.slug)}>
      <CollectionEditorHeader
        linkAs={Link}
        backHref="/admin/collections"
        name={collection.name}
        status={collection.status}
        featured={collection.featured}
        urlPrefix="jofak.com/collections/"
        slug={collection.slug}
        viewHref={collection.viewHref}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:flex xl:items-start xl:gap-6">
        <div className="contents xl:flex xl:min-w-0 xl:flex-1 xl:flex-col xl:gap-4">
          <CollectionDetailsCard id="details" defaultValue={collection.details} banner={banner} className="md:col-span-2" />
          <ProductsCard
            products={ruleProducts}
            categories={ruleCategories}
            defaultMode={collection.products.mode}
            defaultMatch={collection.products.match}
            defaultRules={collection.products.rules}
            defaultPicked={collection.products.picked}
            matchesHref={`/collections/${collection.slug}`}
            className="md:col-span-2"
          />
          <CollectionMatchesCard
            linkAs={Link}
            count={collection.matches.count}
            note={collection.matches.note}
            products={collection.matches.tiles.map(({ image, ...tile }) => ({ ...tile, image: packshot(image, "160px") }))}
            seeAllHref={collection.viewHref}
            className="hidden md:col-span-2 md:flex"
          />
        </div>
        <div className="contents xl:flex xl:w-85 xl:shrink-0 xl:flex-col xl:gap-4">
          <CollectionVisibilityCard toggles={collection.toggles} rows={collection.rows} className="md:self-start xl:self-auto" />
          <CollectionScheduleCard id="schedule" defaultValue={collection.schedule} />
          <CollectionSeoCard id="seo" domain="jofak.com" defaultValue={collection.seo} className="md:col-span-2" />
        </div>
      </div>
    </ProductEditorForm>
  );
}
