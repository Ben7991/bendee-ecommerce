import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Icon } from "@repo/ui/atoms";
import { ListSearch, SelectPill } from "@repo/ui/molecules";
import { AdminPageHeader, CollectionFeature, CollectionGrid, SavedViews, SectionTabs } from "@repo/ui/organisms";

import { createCollectionAction } from "../../../_actions/admin-collections";
import {
  collectionViews,
  collectionsSummary,
  featuredCollection,
  findCollections,
  type CollectionsView,
} from "../../../_content/admin-collections";
import { placeholderSrc } from "../../../_lib/placeholder";

export const metadata: Metadata = { title: "Collections" };

type SearchParams = Promise<{ view?: string; q?: string; sort?: string }>;

function packshot(image: string, sizes: string) {
  const src = placeholderSrc(`${image}.png`);
  return src ? <Image src={src} alt="" fill sizes={sizes} className="object-cover" /> : null;
}

const SORTS = [
  { value: "", label: "Hub order" },
  { value: "name", label: "Name A–Z" },
  { value: "size", label: "Most products" },
];

/** /admin/collections (Paper "Jofak - Admin" → Collections). Sample collections kept in server memory; the editor saves them. */
export default async function AdminCollectionsPage({ searchParams }: { searchParams: SearchParams }) {
  const { view: viewParam, q, sort } = await searchParams;
  const view: CollectionsView = viewParam === "live" || viewParam === "other" ? viewParam : "all";
  const views = collectionViews();
  const active = views.find((item) => item.view === view)!;
  const summary = collectionsSummary();
  const featured = featuredCollection();
  let cards = findCollections({ view, q });
  if (sort === "name") cards = [...cards].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "size") cards = [...cards].sort((a, b) => Number.parseInt(b.footer) - Number.parseInt(a.footer));

  const tints = ["sage", "amber", "citrus"] as const;

  return (
    <>
      <AdminPageHeader
        layout="inline"
        title="Collections"
        description={
          <>
            <span className="xl:hidden">
              {summary.live} live · {summary.scheduled} scheduled · {summary.ended} ended
            </span>
            <span className="hidden xl:inline">Curated and rule-based groups of products · shown on the Offers &amp; collections hub</span>
          </>
        }
        actions={
          <form action={createCollectionAction} className="hidden md:block">
            <button
              type="submit"
              className="flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-14 leading-4.5 font-semibold text-on-primary hover:bg-primary-hover"
            >
              <Icon name="plus" size={14} strokeWidth={2.2} className="hidden xl:inline-block" />
              New collection
            </button>
          </form>
        }
      />

      <div className="flex flex-col gap-4 md:gap-6">
        <SectionTabs
          linkAs={Link}
          aria-label="Collection views"
          tabs={views.map((item) => ({
            href: item.href,
            label: item.label,
            compactLabel: `${item.view === "other" ? "Other" : item.label} ${item.count}`,
          }))}
          activeHref={active.href}
          className="md:hidden"
        />
        {featured && view !== "other" && (
          <CollectionFeature
            linkAs={Link}
            title={featured.name}
            description={featured.description}
            compactDescription={featured.compactDescription}
            stats={featured.stats}
            editHref={`/admin/collections/${featured.slug}`}
            packshots={featured.images.map((image, index) => ({ image: packshot(image, "110px"), tint: tints[index % 3] }))}
          />
        )}
        <div className="hidden items-center gap-2.5 md:flex xl:justify-between">
          <SavedViews linkAs={Link} variant="segmented" fill={false} aria-label="Collection views" views={views} activeHref={active.href} />
          <ListSearch
            linkAs={Link}
            action="/admin/collections"
            label="Search collections"
            placeholder="Search collections"
            defaultQuery={q}
            keep={view !== "all" ? { view } : {}}
            className="min-w-0 flex-1 xl:flex-none"
            fieldClassName="xl:w-70"
          >
            <SelectPill label="Sort" name="sort" defaultValue={sort ?? ""} options={SORTS} autoSubmit className="hidden xl:flex" />
          </ListSearch>
        </div>
      </div>

      <CollectionGrid
        linkAs={Link}
        collections={cards.map((card) => ({
          ...card,
          banner:
            card.banner.kind === "images"
              ? { ...card.banner, images: (card.banner.images as string[]).map((image) => packshot(image, "64px")) }
              : card.banner,
        }))}
        emptyMessage={q ? `No collections match “${q}”.` : "No collections here."}
      />

      {/* Mobile: new collection. */}
      <form action={createCollectionAction} className="fixed right-4 bottom-24 z-30 md:hidden">
        <button
          type="submit"
          aria-label="New collection"
          className="flex size-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-card"
        >
          <Icon name="plus" size={22} strokeWidth={2} />
        </button>
      </form>
    </>
  );
}
