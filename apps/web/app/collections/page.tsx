import type { Metadata } from "next";
import Link from "next/link";

import { Badge, Button, Heading, Icon } from "@repo/ui/atoms";
import { BreadcrumbItem, Breadcrumbs, CollectionCard, FilterPill, FilterPills } from "@repo/ui/molecules";
import { AnnouncementBar, CollectionHero } from "@repo/ui/organisms";
import { StorefrontShell } from "@repo/ui/templates";

import { Packshot, StorefrontFooter, StorefrontHeader, StorefrontSearch } from "../_components/storefront-chrome";
import { harmattan, liveCollections, needs } from "../_content/collections";
import { announcements } from "../_content/site";

export const metadata: Metadata = {
  title: "Offers & collections",
  description: "Seasonal sales, staff picks and everyday edits from Jofak. New ones land every few weeks.",
  alternates: { canonical: "/collections" },
};

/**
 * /collections, Offers & collections (Paper: Collections Hub; docs/01 SF-FR-08a): the featured
 * collection as a banner, cards for the other live collections, then shop-by-need links. Static.
 */
export default function CollectionsHubPage() {
  return (
    <StorefrontShell framed="page" announcement={<AnnouncementBar items={announcements} />} footer={<StorefrontFooter />}>
      <CollectionHero
        variant="featured"
        header={<StorefrontHeader activeHref="/collections" className="px-5 pt-1 md:px-8 md:pt-5 md:pb-4 xl:px-10 xl:py-5" />}
        search={<StorefrontSearch trigger="bar" />}
        heading={{
          breadcrumbs: (
            <Breadcrumbs>
              <BreadcrumbItem asChild>
                <Link href="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem current>Collections</BreadcrumbItem>
            </Breadcrumbs>
          ),
          title: "Offers & collections",
          description: "Seasonal sales, staff picks and everyday edits. New ones land every few weeks, so check back.",
        }}
        eyebrow="Featured · Dry season sale"
        title={
          <>
            {harmattan.title[0]} <em>{harmattan.title[1]}</em>
          </>
        }
        description={harmattan.description}
        compactDescription={harmattan.compactDescription}
        chips={
          <>
            <Badge variant="accent" size="lg" className="font-bold">
              {harmattan.deal}
            </Badge>
            <Badge variant="outline" size="lg" className="border-white/28 font-semibold">
              <Icon name="clock" size={14} /> Ends {harmattan.ends}
            </Badge>
          </>
        }
        action={
          <Button asChild size="xs" variant="secondary" className="gap-2 border-0 px-5 py-3 text-primary dark:text-text">
            <Link href={`/collections/${harmattan.slug}`}>
              Shop the collection <Icon name="arrowRight" size={14} />
            </Link>
          </Button>
        }
        products={harmattan.products.map((product) => ({
          ...product,
          image: <Packshot id={product.id} alt="" sizes="(min-width: 768px) 210px, 110px" />,
        }))}
      />

      <section aria-labelledby="live-now" className="flex flex-col gap-5 px-5 pt-10 pb-12 md:gap-7 md:px-10 md:pt-14 md:pb-18 xl:px-14">
        <div className="flex items-baseline justify-between gap-4 font-sans">
          <div className="flex items-baseline gap-3">
            <Heading id="live-now" as="h2" size="detail" className="text-28 leading-9 md:text-3xl md:leading-3xl">
              Live now
            </Heading>
            <p className="text-sm leading-xs text-text-muted md:text-base">{liveCollections.length} collections</p>
          </div>
          <p className="hidden text-sm leading-xs text-text-muted md:block">Offers end at midnight on the date shown</p>
        </div>

        <ul className="grid gap-3 md:grid-cols-2 md:gap-x-6 md:gap-y-10 xl:grid-cols-3">
          {liveCollections.map((card) => (
            <li key={card.slug}>
              <CollectionCard
                asChild
                tint={card.tint}
                image={<Packshot id={card.image} alt="" sizes="(min-width: 768px) 200px, 84px" />}
                badge={card.badge}
                meta={card.meta}
                compactMeta={card.compactMeta}
                metaTone={card.deal ? "deal" : "quiet"}
                description={card.description}
                count={`${card.count} products`}
              >
                <Link href={`/collections/${card.slug}`}>{card.name}</Link>
              </CollectionCard>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex flex-col gap-4 border-t border-border-subtle pt-6 md:mt-4 md:pt-8 xl:flex-row xl:items-center xl:justify-between xl:gap-8">
          <h2 className="shrink-0 font-sans text-lg leading-lg font-medium text-text">Looking for something specific?</h2>
          <FilterPills aria-label="Shop by need" className="[&_ul]:flex-wrap xl:[&_ul]:justify-end">
            {needs.map((need) => (
              <FilterPill key={need.href} asChild className="py-2.5 font-medium text-text">
                <Link href={need.href}>{need.label}</Link>
              </FilterPill>
            ))}
          </FilterPills>
        </div>
      </section>
    </StorefrontShell>
  );
}
