import Link from "next/link";
import type { ComponentProps } from "react";

import { AnnouncementBar, EmptyState } from "@repo/ui/organisms";
import { StorefrontShell } from "@repo/ui/templates";

import { ProductRail } from "../../_components/product-rail";
import { Packshot, StorefrontFooter, StorefrontHeader } from "../../_components/storefront-chrome";
import { popularProducts } from "../../_content/errors";
import { announcements } from "../../_content/site";

/**
 * Pages with nothing in the cart (Paper: Cart — Empty, Cart link expired): an EmptyState, then
 * "Start with a bestseller". The header's mini-cart is empty too.
 */
export function CartDeadEnd(props: Omit<ComponentProps<typeof EmptyState>, "linkAs" | "size">) {
  return (
    <StorefrontShell framed={false} announcement={<AnnouncementBar items={announcements} />} footer={<StorefrontFooter />}>
      <StorefrontHeader emptyCart className="px-5 pt-1 md:px-8 md:pt-5 md:pb-4 xl:px-10 xl:py-5" />
      <EmptyState linkAs={Link} {...props} />
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
