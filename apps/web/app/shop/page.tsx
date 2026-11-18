import type { Metadata } from "next";
import Link from "next/link";

import { Button, Icon, TextLink } from "@repo/ui/atoms";
import {
  BreadcrumbItem,
  Breadcrumbs,
  CategoryPill,
  CategoryPills,
  ChipGroup,
  FilterChip,
  LoadMore,
  PillSelect,
} from "@repo/ui/molecules";
import {
  AnnouncementBar,
  CategoryHero,
  FilterDialog,
  FilterPanel,
  ListingToolbar,
  PaginationBar,
  ProductGrid,
  PromoStrip,
} from "@repo/ui/organisms";
import { ListingLayout, StorefrontShell } from "@repo/ui/templates";

import { Packshot, StorefrontFooter, StorefrontHeader, StorefrontSearch } from "../_components/storefront-chrome";
import { announcements } from "../_content/site";
import { appliedFilters, facets, goals, listing, perPageOptions, shopProducts, sortChips, sortOptions } from "../_content/shop";

export const metadata: Metadata = {
  title: "Shop all supplements",
  description: "Clinically-dosed, third-party tested formulas for sleep, focus, gut health and everyday vitality.",
  alternates: { canonical: "/shop" },
};

/**
 * /shop, the product listing (Paper: PLP — Desktop / Tablet / Mobile, and the filter sheet and
 * drawer). Static sample data for now: the filters, sort and per-page controls don't filter yet.
 */
export default async function ShopPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams;
  const page = Math.min(listing.pageCount, Math.max(1, Number(pageParam) || 1));
  const from = (page - 1) * listing.perPage + 1;
  const to = Math.min(page * listing.perPage, listing.results);
  const hrefFor = (target: number) => (target === 1 ? "/shop" : `/shop?page=${target}`);

  const clearAll = (
    <TextLink asChild tone="brand" className="text-sm leading-xs font-semibold">
      <Link href="/shop">Clear all</Link>
    </TextLink>
  );

  return (
    <StorefrontShell framed="page" announcement={<AnnouncementBar items={announcements} />} footer={<StorefrontFooter />}>
      <CategoryHero
        header={<StorefrontHeader activeHref="/shop" className="px-5 pt-1 md:px-8 md:pt-5 md:pb-4 xl:px-10 xl:py-5" />}
        search={<StorefrontSearch trigger="bar" />}
        breadcrumbs={
          <Breadcrumbs>
            <BreadcrumbItem asChild>
              <Link href="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem asChild>
              <Link href="/shop">Shop</Link>
            </BreadcrumbItem>
            <BreadcrumbItem current itemClassName="hidden md:flex">
              All supplements
            </BreadcrumbItem>
          </Breadcrumbs>
        }
        title={
          <>
            All <em>supplements</em>
          </>
        }
        description="Clinically-dosed, third-party tested formulas for sleep, focus, gut health and everyday vitality."
        compactDescription={`${listing.total} products · tested for purity & potency`}
        count={listing.total}
        pills={
          <CategoryPills aria-label="Shop by goal">
            {goals.map((goal) => (
              <CategoryPill key={goal.href} asChild active={goal.href === "/shop"} count={goal.count}>
                <Link href={goal.href}>{goal.label}</Link>
              </CategoryPill>
            ))}
          </CategoryPills>
        }
      />

      <ListingLayout
        sidebar={<FilterPanel title="Filters" clearAction={clearAll} facets={facets} />}
        toolbar={
          <ListingToolbar
            range={`${from}–${to}`}
            total={listing.results}
            filters={
              <FilterDialog
                appliedCount={appliedFilters.length}
                summary={`${appliedFilters.length} applied · ${listing.results} results`}
                submitLabel={`Show ${listing.results} results`}
                className="xl:hidden"
                sort={<ChipGroup type="single" required variant="primary" aria-label="Sort by" options={sortChips} defaultValue="featured" />}
              >
                <FilterPanel facets={facets} />
              </FilterDialog>
            }
            sort={<PillSelect label="Sort products" prefix="Sort:" options={sortOptions} />}
            compactSort={<PillSelect label="Sort products" variant="block" options={sortOptions} />}
            chips={appliedFilters.map((filter) => (
              <FilterChip key={filter.label} asChild aria-label={`Remove filter: ${filter.label}`}>
                <Link href={filter.href}>
                  <span className="md:hidden">{filter.compactLabel}</span>
                  <span className="hidden md:inline">{filter.label}</span>
                </Link>
              </FilterChip>
            ))}
            clearAction={clearAll}
          />
        }
        footer={
          <>
            <PaginationBar
              page={page}
              pageCount={listing.pageCount}
              hrefFor={hrefFor}
              linkAs={Link}
              perPage={<PillSelect variant="compact" label="Products per page" options={perPageOptions} />}
            />
            {page < listing.pageCount && (
              <LoadMore
                shown={to}
                total={listing.results}
                className="md:hidden"
                action={
                  <Button asChild variant="secondary" size="md" className="w-full">
                    <Link href={hrefFor(page + 1)} scroll={false}>
                      Load more
                      <Icon name="chevronDown" size={16} />
                    </Link>
                  </Button>
                }
              />
            )}
          </>
        }
      >
        <ProductGrid
          products={shopProducts}
          linkAs={Link}
          images={Object.fromEntries(
            shopProducts.map((product) => [
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
