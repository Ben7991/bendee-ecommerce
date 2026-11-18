import type { Metadata } from "next";
import Link from "next/link";

import { Button, formatPrice, Icon, TextLink } from "@repo/ui/atoms";
import { BreadcrumbItem, Breadcrumbs, CategoryPill, CategoryPills, PillSelect } from "@repo/ui/molecules";
import { AnnouncementBar, CategoryHero, EmptyState, ProductGrid, SavedToolbar } from "@repo/ui/organisms";
import { StorefrontShell } from "@repo/ui/templates";

import { Packshot, StorefrontFooter, StorefrontHeader, StorefrontSearch } from "../_components/storefront-chrome";
import { favourites, favouriteSorts, statusFilters, type FavouriteStatus } from "../_content/favourites";
import { announcements } from "../_content/site";

export const metadata: Metadata = { title: "Your favourites", robots: { index: false } };

/**
 * /wishlist, the shopper's favourites (Paper: Favourites — Desktop / Tablet / Mobile, and the
 * empty versions). Static sample data for now: ?status= filters the sample list and ?state=empty
 * shows the empty page (until there's a real wishlist); hearts, sort and Add to cart don't change
 * anything yet.
 */
export default async function FavouritesPage({ searchParams }: { searchParams: Promise<{ status?: string; state?: string }> }) {
  const { status: statusParam, state } = await searchParams;
  const saved = state === "empty" ? [] : favourites;
  const status = statusFilters.some((filter) => filter.value === statusParam) ? (statusParam as FavouriteStatus) : "all";
  const shown = status === "all" ? saved : saved.filter((item) => item.status === status);
  const inStock = saved.filter((item) => !item.product.soldOut);
  const together = formatPrice(inStock.reduce((sum, item) => sum + item.product.price, 0));
  const empty = saved.length === 0;

  return (
    <StorefrontShell framed="page" announcement={<AnnouncementBar items={announcements} />} footer={<StorefrontFooter />}>
      <CategoryHero
        header={
          <StorefrontHeader
            favourites={saved.length}
            favouritesActive
            className="px-5 pt-1 md:px-8 md:pt-5 md:pb-4 xl:px-10 xl:py-5"
          />
        }
        search={<StorefrontSearch trigger="bar" />}
        breadcrumbs={
          <Breadcrumbs>
            <BreadcrumbItem asChild>
              <Link href="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem current>Favourites</BreadcrumbItem>
          </Breadcrumbs>
        }
        title={
          <>
            Your <em>favourites</em>
          </>
        }
        description={
          empty
            ? "Products you've hearted live here, ready when you are."
            : "Everything you've hearted, in one place. We'll text you if a price drops or something comes back in stock."
        }
        compactDescription={empty ? "Products you've hearted live here." : `${saved.length} saved · we'll text you about price drops`}
        count={empty ? undefined : saved.length}
        countLabel="saved"
        pills={
          empty ? undefined : (
            <CategoryPills aria-label="Filter favourites">
              {statusFilters.map((filter) => (
                <CategoryPill
                  key={filter.value}
                  asChild
                  compactCount
                  active={filter.value === status}
                  count={filter.value === "all" ? saved.length : saved.filter((item) => item.status === filter.value).length}
                >
                  <Link href={filter.value === "all" ? "/wishlist" : `/wishlist?status=${filter.value}`} scroll={false}>
                    {filter.label}
                  </Link>
                </CategoryPill>
              ))}
            </CategoryPills>
          )
        }
      />

      {empty ? (
        <EmptyState
          linkAs={Link}
          icon="heart"
          title="Nothing saved yet"
          description="See something you like but not ready to buy? Tap the heart and it'll wait for you here."
          primaryAction={{ label: "Shop bestsellers", href: "/collections/bestsellers" }}
          secondaryAction={{ label: "Take the wellness quiz", href: "/quiz" }}
          noteIcon="user"
          note={
            <>
              Not signed in? Hearts are saved on this device.{" "}
              <TextLink asChild>
                <Link href="/auth/sign-in">Sign in</Link>
              </TextLink>{" "}
              to keep them on every device.
            </>
          }
          className="xl:pb-24"
        />
      ) : (
        <div className="flex flex-col md:gap-6 md:px-8 md:pt-8 md:pb-14 xl:px-14 xl:pt-10 xl:pb-18">
          <SavedToolbar
            summary={
              <>
                <strong>{saved.length}</strong> saved · {inStock.length} in stock · <strong>{together}</strong> together
              </>
            }
            compactSummary={`${inStock.length} in stock · ${together} together`}
            sort={<PillSelect label="Sort favourites" prefix="Sort:" options={favouriteSorts} />}
            compactSort={<PillSelect label="Sort favourites" variant="block" options={favouriteSorts} />}
            action={
              <Button size="xs" className="h-11 w-full gap-2 md:h-auto md:w-auto md:px-4.5 md:py-2.75">
                <Icon name="bag" size={14} />
                <span className="md:hidden">Add {inStock.length} to cart</span>
                <span className="hidden md:inline">Add {inStock.length} in stock to cart</span>
              </Button>
            }
          />
          <ProductGrid
            products={shown.map((item) => item.product)}
            saved
            compactNotify="icon"
            linkAs={Link}
            className="p-5 md:p-0"
            images={Object.fromEntries(
              shown.map(({ product }) => [
                product.id,
                <Packshot key={product.id} id={product.id} alt={product.name} sizes="(min-width: 1440px) 420px, (min-width: 768px) 334px, 170px" />,
              ]),
            )}
          />
        </div>
      )}
    </StorefrontShell>
  );
}
