import type { Metadata } from "next";
import Link from "next/link";

import { Button, TextLink } from "@repo/ui/atoms";
import { CategoryTile, PillSelect, RelatedLink, RelatedLinks, SearchField } from "@repo/ui/molecules";
import {
  AnnouncementBar,
  FilterDialog,
  FilterPanel,
  ListingToolbar,
  PopularCategories,
  ProductGrid,
  PromoStrip,
  SearchHeading,
  SearchTips,
} from "@repo/ui/organisms";
import { ListingLayout, StorefrontShell } from "@repo/ui/templates";

import { ProductRail } from "../_components/product-rail";
import { Packshot, StorefrontFooter, StorefrontHeader } from "../_components/storefront-chrome";
import { popularProducts } from "../_content/errors";
import { didYouMean, popularCategories, relatedFor, searchFacets, searchProducts, searchSorts, searchTips } from "../_content/search";
import { announcements } from "../_content/site";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q?.trim() ? `Search: ${q.trim()}` : "Search", robots: { index: false } };
}

const cardImages = (ids: string[], sizes: string) =>
  Object.fromEntries(ids.map((id) => [id, <Packshot key={id} id={id} alt="" sizes={sizes} />]));

/**
 * /search?q=, search results (Paper: Search results, Search — No results). Matches the sample
 * catalog in memory (see _content/search.ts); the filters and sort don't filter yet.
 */
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = searchProducts(query);
  const suggestion = query && results.length === 0 ? didYouMean(query) : null;
  const related = relatedFor(query);
  const plural = (count: number) => `${count} ${count === 1 ? "result" : "results"}`;

  const header = <StorefrontHeader activeHref="/shop" className="px-5 pt-1 md:px-8 md:pt-5 md:pb-4 xl:px-10 xl:py-5" />;
  const field = <SearchField key={query} defaultValue={query} submitLabel="Search" autoFocus={!query} />;

  const categories = (
    <PopularCategories>
      {popularCategories.map((category) => (
        <CategoryTile key={category.href} asChild tint={category.tint} count={category.count}>
          <Link href={category.href}>{category.label}</Link>
        </CategoryTile>
      ))}
    </PopularCategories>
  );
  const bestsellers = (
    <ProductRail
      eyebrow="Bestsellers"
      title="Customers love these"
      products={popularProducts}
      images={cardImages(
        popularProducts.map((product) => product.id),
        "(min-width: 768px) 312px, 170px",
      )}
      className="md:pt-0 xl:pt-0"
    />
  );

  return (
    <StorefrontShell framed="page" announcement={<AnnouncementBar items={announcements} />} footer={<StorefrontFooter />}>
      {!query ? (
        <>
          <SearchHeading
            header={header}
            search={field}
            title={
              <>
                Search <em>Jofak</em>
              </>
            }
            description="Find supplements by name, ingredient or goal."
          />
          {categories}
          {bestsellers}
        </>
      ) : results.length === 0 ? (
        <>
          <SearchHeading
            header={header}
            search={field}
            title={
              <>
                No results for <em>“{query}”</em>
              </>
            }
            description={
              suggestion ? (
                <>
                  Did you mean <Link href={`/search?q=${encodeURIComponent(suggestion.query)}`}>{suggestion.query}</Link>? We have{" "}
                  {suggestion.count} {suggestion.count === 1 ? "match" : "matches"}.
                </>
              ) : (
                "Try another word, or start from a category below."
              )
            }
          />
          <SearchTips
            tips={searchTips.map(({ action, ...tip }) => ({
              ...tip,
              action: action && (
                <TextLink asChild className="text-sm leading-xs">
                  <Link href={action.href}>{action.label}</Link>
                </TextLink>
              ),
            }))}
            compactTips={[
              "Check the spelling or use fewer words",
              "Search by goal: “sleep”, “energy”, “gut”",
              <>
                <Link href="/quiz">Take the wellness quiz</Link> for a matched routine
              </>,
            ]}
          />
          {categories}
          {bestsellers}
        </>
      ) : (
        <>
          <SearchHeading
            header={header}
            search={field}
            title={
              <>
                {plural(results.length)} for <em>“{query}”</em>
              </>
            }
            description={
              <>
                <span className="md:hidden">Matching names, ingredients and benefits.</span>
                <span className="hidden md:inline">Matching product names, ingredients and benefits.</span>
              </>
            }
            related={
              related.length > 0 && (
                <RelatedLinks>
                  {related.map((link) => (
                    <RelatedLink key={link.href} asChild count={link.count} external={link.external} itemClassName={link.external ? "hidden md:block" : undefined}>
                      <Link href={link.href}>{link.label}</Link>
                    </RelatedLink>
                  ))}
                </RelatedLinks>
              )
            }
          />
          <ListingLayout
            className="xl:pt-12"
            sidebar={
              <FilterPanel
                title="Filters"
                clearAction={
                  <TextLink asChild className="text-sm leading-xs">
                    <Link href={`/search?q=${encodeURIComponent(query)}`}>Clear all</Link>
                  </TextLink>
                }
                facets={searchFacets}
              />
            }
            toolbar={
              <ListingToolbar
                range={`1–${results.length}`}
                total={results.length}
                summary={
                  <>
                    Showing <strong>{results.length}</strong> {results.length === 1 ? "result" : "results"}
                  </>
                }
                filters={
                  <FilterDialog summary={plural(results.length)} submitLabel={`Show ${plural(results.length)}`} className="xl:hidden">
                    <FilterPanel facets={searchFacets} />
                  </FilterDialog>
                }
                sort={<PillSelect label="Sort results" prefix="Sort:" options={searchSorts} />}
                compactSort={<PillSelect label="Sort results" variant="block" options={searchSorts} />}
              />
            }
          >
            <ProductGrid
              products={results}
              linkAs={Link}
              images={cardImages(
                results.map((product) => product.id),
                "(min-width: 1440px) 320px, (min-width: 768px) 334px, 170px",
              )}
              promo={
                results.length > 3 && (
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
                )
              }
            />
          </ListingLayout>
        </>
      )}
    </StorefrontShell>
  );
}
