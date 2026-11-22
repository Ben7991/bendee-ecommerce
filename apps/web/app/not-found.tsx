import type { Metadata } from "next";
import Link from "next/link";

import { AnnouncementBar, NotFoundHero } from "@repo/ui/organisms";
import { StorefrontShell } from "@repo/ui/templates";

import { Packshot, StorefrontFooter, StorefrontHeader } from "./_components/storefront-chrome";
import { ProductRail } from "./_components/product-rail";
import { notFoundQuickLinks, popularProducts } from "./_content/errors";
import { announcements } from "./_content/site";

export const metadata: Metadata = { title: "Page not found" };

/** 404 for every unknown URL and notFound() call (Paper: Errors → 404). */
export default function NotFound() {
  return (
    <StorefrontShell framed={false} announcement={<AnnouncementBar items={announcements} />} footer={<StorefrontFooter />}>
      <StorefrontHeader className="px-5 pt-1 md:px-8 md:pt-5 md:pb-4 xl:px-10 xl:py-5" />
      <NotFoundHero
        linkAs={Link}
        eyebrow="Page not found"
        title={
          <>
            This page has <em>wandered off</em>
          </>
        }
        description={{
          short: "The link may be old, or the product may have moved. Try a search or pick up from one of these.",
          full: "The link may be old, or the product may have moved. Search for what you need, or pick up from one of these.",
        }}
        primaryAction={{ label: "Back to homepage", href: "/" }}
        secondaryAction={{ label: "Shop all supplements", href: "/shop" }}
        quickLinks={notFoundQuickLinks}
      />
      <ProductRail
        eyebrow="Popular right now"
        title="Start with a bestseller"
        products={popularProducts}
        images={Object.fromEntries(
          popularProducts.map((product) => [
            product.id,
            <Packshot key={product.id} id={product.id} alt={product.name} sizes="(min-width: 768px) 344px, 170px" />,
          ]),
        )}
      />
    </StorefrontShell>
  );
}
