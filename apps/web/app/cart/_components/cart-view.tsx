import Link from "next/link";
import type { ReactNode } from "react";

import { TextLink } from "@repo/ui/atoms";
import { AppliedCode, BackLink, DeliveryCard, FreeDeliveryBar, Notice } from "@repo/ui/molecules";
import { AnnouncementBar, CartLines, CheckoutBar, OrderSummary, PageHeading } from "@repo/ui/organisms";
import { CartLayout, StorefrontShell } from "@repo/ui/templates";

import { ProductRail } from "../../_components/product-rail";
import { Packshot, StorefrontFooter, StorefrontHeader } from "../../_components/storefront-chrome";
import { appliedCode, cartCount, cartLines, delivery, orderTotals, priceDrop, routineProductIds } from "../../_content/cart";
import { popularProducts } from "../../_content/errors";
import { announcements } from "../../_content/site";

const routine = routineProductIds.map((id) => popularProducts.find((product) => product.id === id)!);

/**
 * The full cart (Paper: Cart — Desktop / Tablet / Mobile, and Cart recovered). Static sample
 * data: steppers, Remove and the code's Remove button don't change anything yet.
 */
export function CartView({ title, description }: { title: ReactNode; description: ReactNode }) {
  return (
    <StorefrontShell
      framed="sides"
      announcement={<AnnouncementBar items={announcements} />}
      footer={<StorefrontFooter />}
      className="pb-23 md:pb-0"
    >
      <StorefrontHeader className="px-5 pt-1 md:px-8 md:pt-5 md:pb-4 xl:px-10 xl:py-5" />
      <PageHeading
        title={title}
        description={description}
        action={
          <BackLink asChild tone="brand">
            <Link href="/shop">Continue shopping</Link>
          </BackLink>
        }
      />
      <CartLayout
        notices={
          <>
            <FreeDeliveryBar
              value={100}
              progressLabel="GHS 500 / GHS 500"
              message={
                <>
                  <strong>
                    <span className="md:hidden">Free delivery unlocked</span>
                    <span className="hidden md:inline">You&apos;ve unlocked free delivery</span>
                  </strong>{" "}
                  to Accra · East Legon
                </>
              }
            />
            <Notice title={priceDrop.title} compactTitle={priceDrop.compactTitle} compactText={priceDrop.compactText}>
              {priceDrop.text}
            </Notice>
          </>
        }
        lines={
          <CartLines
            linkAs={Link}
            items={cartLines}
            images={Object.fromEntries(
              cartLines.map((line) => [line.id, <Packshot key={line.id} id={line.id} alt="" sizes="(min-width: 768px) 72px, 62px" />]),
            )}
          />
        }
        summary={
          <OrderSummary
            linkAs={Link}
            checkoutHref="/checkout"
            totals={orderTotals}
            discount={<AppliedCode code={appliedCode.code} description={appliedCode.description} />}
            delivery={
              <DeliveryCard
                location={delivery.location}
                detail={delivery.detail}
                action={
                  <TextLink asChild className="text-sm leading-xs">
                    <Link href="/account/addresses">Change</Link>
                  </TextLink>
                }
              />
            }
          />
        }
      />
      <ProductRail
        eyebrow="Customers also added"
        label="Complete your routine"
        title={
          <>
            Complete your <em>routine</em>
          </>
        }
        products={routine}
        className="xl:pt-6"
        images={Object.fromEntries(
          routine.map((product) => [
            product.id,
            <Packshot key={product.id} id={product.id} alt={product.name} sizes="(min-width: 768px) 344px, 170px" />,
          ]),
        )}
      />
      <CheckoutBar linkAs={Link} label={`Total · ${cartCount} items`} total={orderTotals.total} checkoutHref="/checkout" />
    </StorefrontShell>
  );
}
