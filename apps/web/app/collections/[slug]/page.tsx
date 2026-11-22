import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge, Button, Icon, TextLink } from "@repo/ui/atoms";
import { BreadcrumbItem, Breadcrumbs, ChipGroup, NoticeBanner, PillSelect, StaffNote } from "@repo/ui/molecules";
import { AnnouncementBar, CollectionHero, FilterDialog, FilterPanel, ListingToolbar, ProductGrid, PromoStrip } from "@repo/ui/organisms";
import { ListingLayout, StorefrontShell } from "@repo/ui/templates";

import { Packshot, StorefrontFooter, StorefrontHeader, StorefrontSearch } from "../../_components/storefront-chrome";
import { findCollection } from "../../_content/collections";
import { announcements } from "../../_content/site";
import { facets, shopProducts, sortChips, sortOptions } from "../../_content/shop";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const collection = findCollection((await params).slug);
  if (!collection) return {};
  return {
    title: collection.name,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
  };
}

const collectionSorts = [{ value: "staff", label: "Staff picks" }, ...sortOptions.filter((option) => option.value !== "featured")];

/**
 * /collections/[slug] (Paper: Collection — Harmattan reset, and Collection — Ended). Static
 * sample collections; ?state=ended shows the Harmattan reset after its deal. The filters and sort
 * don't filter yet (as on /shop).
 */
export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ state?: string }>;
}) {
  const { slug } = await params;
  const { state } = await searchParams;
  const collection = findCollection(slug);
  if (!collection) notFound();

  const ended = Boolean(collection.deal) && state === "ended";
  const href = `/collections/${collection.slug}`;
  const products = shopProducts;
  const clearAll = (
    <TextLink asChild tone="brand" className="text-sm leading-xs font-semibold">
      <Link href={href}>Clear all</Link>
    </TextLink>
  );

  const chips = (
    <>
      {collection.deal && !ended && (
        <Badge variant="accent" size="lg" className="font-bold">
          {collection.deal}
        </Badge>
      )}
      {collection.ends && (
        <Badge variant="outline" size="lg" className="border-white/28 font-semibold">
          <Icon name="clock" size={14} />
          {ended ? (
            <>
              <span className="md:hidden">Sale ended 31 Jan</span>
              <span className="hidden md:inline">Sale ended {collection.ends}</span>
            </>
          ) : (
            `Ends ${collection.ends}`
          )}
        </Badge>
      )}
      <Badge variant="outline" size="lg" className="hidden border-white/28 font-semibold md:inline-flex">
        {products.length} products
      </Badge>
    </>
  );

  return (
    <StorefrontShell framed="page" announcement={<AnnouncementBar items={announcements} />} footer={<StorefrontFooter />}>
      <CollectionHero
        header={<StorefrontHeader activeHref="/collections" className="px-5 pt-1 md:px-8 md:pt-5 md:pb-4 xl:px-10 xl:py-5" />}
        search={<StorefrontSearch trigger="bar" />}
        breadcrumbs={
          <Breadcrumbs>
            <BreadcrumbItem asChild>
              <Link href="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem asChild>
              <Link href="/collections">Collections</Link>
            </BreadcrumbItem>
            <BreadcrumbItem current>{collection.name}</BreadcrumbItem>
          </Breadcrumbs>
        }
        eyebrow={collection.eyebrow}
        title={
          <>
            {collection.title[0]} <em>{collection.title[1]}</em>
          </>
        }
        description={collection.description}
        compactDescription={collection.compactDescription}
        chips={chips}
        products={collection.products.map((product) => ({
          ...product,
          image: <Packshot id={product.id} alt="" sizes="(min-width: 768px) 210px, 110px" />,
        }))}
      >
        {ended && collection.endedNote && (
          <NoticeBanner
            title={collection.endedNote.title}
            description={collection.endedNote.description}
            action={
              <Button asChild size="xs" variant="secondary" className="gap-2 border-sun-200 py-3 md:py-2.5">
                <Link href="/collections">
                  See current offers <Icon name="arrowRight" size={14} />
                </Link>
              </Button>
            }
          />
        )}
        {collection.note && (
          <StaffNote
            quote={collection.note.quote}
            compactQuote={collection.note.compactQuote}
            author={collection.note.author}
            role={collection.note.role}
            action={
              <Button asChild size="sm" className="gap-2">
                <Link href={collection.note.href}>
                  {ended ? collection.note.endedAction : collection.note.action}
                  <Icon name="arrowRight" size={14} className="hidden md:block" />
                </Link>
              </Button>
            }
          />
        )}
      </CollectionHero>

      <ListingLayout
        sidebar={<FilterPanel title="Filters" clearAction={clearAll} facets={facets} />}
        toolbar={
          <ListingToolbar
            range={`1–${products.length}`}
            total={products.length}
            filters={
              <FilterDialog
                appliedCount={0}
                summary={`${products.length} products`}
                submitLabel="Show products"
                className="xl:hidden"
                sort={<ChipGroup type="single" required variant="primary" aria-label="Sort by" options={sortChips} defaultValue="featured" />}
              >
                <FilterPanel facets={facets} />
              </FilterDialog>
            }
            sort={<PillSelect label="Sort products" prefix="Sort:" options={collectionSorts} />}
            compactSort={<PillSelect label="Sort products" variant="block" options={collectionSorts} />}
          />
        }
      >
        <ProductGrid
          products={products}
          linkAs={Link}
          images={Object.fromEntries(
            products.map((product) => [
              product.id,
              <Packshot key={product.id} id={product.id} alt={product.name} sizes="(min-width: 1440px) 320px, (min-width: 768px) 334px, 170px" />,
            ]),
          )}
          promo={
            <PromoStrip
              eyebrow="Subscribe & save"
              title={
                <>
                  Build a 3-product routine, <em>save 20%</em> every month.
                </>
              }
              action={
                <Button asChild arrow variant="accent" size="md" className="gap-3.5 font-semibold">
                  <Link href="/collections/bundles">Build my bundle</Link>
                </Button>
              }
            />
          }
        />
      </ListingLayout>
    </StorefrontShell>
  );
}
