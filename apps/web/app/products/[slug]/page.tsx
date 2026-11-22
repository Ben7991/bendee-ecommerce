import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Badge, Button, CountBadge, Icon, IconButton, Price, TextLink } from "@repo/ui/atoms";
import {
  BackLink,
  BreadcrumbItem,
  Breadcrumbs,
  ChipGroup,
  ChoiceCards,
  DeliveryEstimator,
  NotifyForm,
  OptionPicker,
  PillSelect,
  ShareLinks,
  StockStatus,
} from "@repo/ui/molecules";
import {
  AnnouncementBar,
  BenefitCards,
  CustomerReview,
  ProductBuyBox,
  ProductDetails,
  ProductGallery,
  ProductReviews,
  StickyBuyBar,
  SupplementFacts,
} from "@repo/ui/organisms";
import { ProductLayout, StorefrontShell } from "@repo/ui/templates";

import { ProductRail } from "../../_components/product-rail";
import { Packshot, Photo, StorefrontFooter, StorefrontHeader, StorefrontMiniCart } from "../../_components/storefront-chrome";
import { delivery, deliveryReturns, sampleProducts } from "../../_content/product";
import { shopProducts } from "../../_content/shop";
import { announcements } from "../../_content/site";

const siteUrl = "https://jofak.com";

export function generateStaticParams() {
  return sampleProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = sampleProducts.find((item) => item.slug === slug);
  if (!product) return {};
  return { title: product.name, description: product.description, alternates: { canonical: `/products/${product.slug}` } };
}

const cardsById = (ids: string[]) => ids.map((id) => shopProducts.find((product) => product.id === id)!);
const railImages = (ids: string[]) =>
  Object.fromEntries(ids.map((id) => [id, <Packshot key={id} id={id} alt="" sizes="(min-width: 768px) 312px, 170px" />]));

/**
 * /products/[slug], the product page (Paper: PDP — Desktop / Tablet / Mobile). Static sample data
 * for now (one page per sample product); Add to cart, Notify me and Write a review don't do
 * anything yet.
 */
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = sampleProducts.find((item) => item.slug === slug);
  if (!product) notFound();

  const savePercent = product.compareAt ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100) : 0;
  const badges: { label: string; variant: "solid" | "light" }[] = [
    ...(product.soldOut ? [] : product.badges),
    ...(savePercent ? [{ label: `Save ${savePercent}%`, variant: "light" as const }] : []),
  ];
  const shareUrl = `${siteUrl}/products/${product.slug}?utm_source=share&utm_medium=pdp`;
  const routine = cardsById(product.routineIds);
  const viewed = cardsById(product.viewedIds);
  const packshot = (file: string, alt: string) => <Packshot id={file} alt={alt} sizes="(min-width: 768px) 350px, 230px" />;

  const sections: { id: string; title: string; content: ReactNode; defaultOpen?: boolean; mobileOnly?: boolean }[] = [
    {
      id: "description",
      title: "Description",
      defaultOpen: true,
      content: product.details.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
    },
    { id: "supplement-facts", title: "Supplement facts", mobileOnly: true, content: <SupplementFacts bare {...product.facts} /> },
    { id: "how-to-use", title: "How to use", content: <p>{product.details.howToUse}</p> },
    { id: "specifications", title: "Specifications", content: <p>{product.details.specifications}</p> },
    { id: "delivery-returns", title: "Delivery & returns", content: <p>{deliveryReturns}</p> },
  ];
  const photoSizes = "(min-width: 1440px) 600px, 100vw";

  return (
    <StorefrontShell framed="page" announcement={<AnnouncementBar items={announcements} />} footer={<StorefrontFooter />} className="pb-24 md:pb-0">
      <StorefrontHeader activeHref="/shop" className="hidden md:flex md:px-8 md:pt-5 md:pb-4 xl:px-10 xl:py-5" />

      <ProductLayout
        breadcrumbs={
          <Breadcrumbs>
            <BreadcrumbItem asChild>
              <Link href="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem asChild>
              <Link href="/shop">Shop</Link>
            </BreadcrumbItem>
            <BreadcrumbItem asChild>
              <Link href={product.category.href}>{product.category.label}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem current>{product.name}</BreadcrumbItem>
          </Breadcrumbs>
        }
        backLink={
          <BackLink asChild>
            <Link href="/shop">
              <span className="xl:hidden">Back</span>
              <span className="hidden xl:inline">Back to results</span>
            </Link>
          </BackLink>
        }
        gallery={
          <ProductGallery
            label={`${product.name} images`}
            badges={badges}
            toolbar={
              <div className="flex items-center justify-between">
                <IconButton asChild label="Back to the shop" variant="plain">
                  <Link href="/shop">
                    <Icon name="chevronLeft" />
                  </Link>
                </IconButton>
                <div className="flex items-center gap-2">
                  <IconButton label={`Save ${product.name} to favourites`} variant="plain">
                    <Icon name="heart" />
                  </IconButton>
                  <IconButton asChild label="Favourites, 6 items">
                    <Link href="/wishlist">
                      <Icon name="heart" />
                      <CountBadge count={6} />
                    </Link>
                  </IconButton>
                  <StorefrontMiniCart />
                </div>
              </div>
            }
            items={[
              { id: "front", label: "Front of the pack", image: packshot(product.id, `${product.name}, front`) },
              ...(product.gallery.back
                ? [{ id: "back", label: "Back of the pack", image: packshot(`${product.id}-back`, `${product.name}, back`) }]
                : []),
              { id: "lifestyle", label: "Morning ritual", kind: "photo" as const, image: <Photo file="lifestyle.jpg" alt="A morning wellness routine at home" sizes={photoSizes} /> },
              ...(product.gallery.video
                ? [{ id: "video", label: "How it mixes (video)", kind: "video" as const, image: <Photo file="ritual.jpg" alt="" sizes={photoSizes} /> }]
                : []),
              { id: "how-to-use", label: "How to use", kind: "howto" as const, caption: product.details.howToUse },
            ]}
          />
        }
        buyBox={
          <ProductBuyBox
            eyebrow={product.eyebrow}
            sku={product.sku}
            name={product.name}
            title={
              <>
                {product.title[0]} <em>{product.title[1]}</em>
              </>
            }
            rating={{ value: product.rating.value, count: product.rating.count, href: "#reviews" }}
            socialProof={product.socialProof}
            description={product.description}
            price={product.price}
            compareAt={product.compareAt}
            priceNote={`Price includes VAT · or 3 payments of GHS ${Math.round(product.price / 3)} with MoMo`}
            compactPriceNote="Price includes VAT"
            options={
              <>
                {product.flavours && <OptionPicker label="Flavour" options={product.flavours} />}
                <OptionPicker label="Size" variant="card" options={product.sizes} />
              </>
            }
            purchase={
              <ChoiceCards
                aria-label="Purchase type"
                defaultValue="once"
                className="gap-2"
                options={[
                  { value: "once", title: "One-time purchase", aside: <Price amount={product.price} size="md" /> },
                  {
                    value: "subscribe",
                    title: "Subscribe & save 20%",
                    badge: (
                      <Badge variant="accent" size="sm">
                        Popular
                      </Badge>
                    ),
                    description: "Delivered every 30 days · skip or cancel anytime",
                    aside: <Price amount={product.subscribePrice} size="md" />,
                  },
                ]}
              />
            }
            stock={<StockStatus tone={product.stock.tone} label={product.stock.label} note={product.stock.note} />}
            soldOut={product.soldOut}
            soldOutAction={<NotifyForm label="Get a text when it's back" className="md:items-stretch" />}
            buyNow={
              <Button asChild variant="accent" size="lg" className="w-full py-3.75 font-semibold">
                <Link href="/checkout">Buy now with MoMo</Link>
              </Button>
            }
            delivery={
              <DeliveryEstimator
                location={delivery.location}
                options={delivery.options}
                note={delivery.note}
                action={
                  <TextLink asChild className="text-sm leading-xs">
                    <Link href="/account/addresses">Change</Link>
                  </TextLink>
                }
              />
            }
            share={<ShareLinks url={shareUrl} message={`${product.name} on Jofak:`} note="FDA disclaimer applies*" />}
          />
        }
      >
        <BenefitCards
          className="px-8 pb-14 xl:px-14 xl:pb-18"
          benefits={product.benefits.map((benefit) =>
            benefit.featured
              ? {
                  ...benefit,
                  text: (
                    <>
                      {benefit.text} <Link href="/pages/lab-results">View certificate</Link>
                    </>
                  ),
                }
              : benefit,
          )}
        />

        <ProductDetails
          className="px-5 pt-8 md:px-8 md:pt-0 md:pb-14 xl:px-14 xl:pb-18"
          sections={sections}
          aside={<SupplementFacts {...product.facts} className="md:rounded-xl" />}
        />

        <ProductReviews
          id="reviews"
          title={
            <>
              Loved by <em>{product.rating.count.toLocaleString("en-GH")}</em> routines
            </>
          }
          average={product.rating.value}
          count={product.rating.count}
          shares={product.rating.shares}
          writeAction={
            <Button asChild variant="secondary" size="md" className="w-full">
              <Link href={`/products/${product.slug}/review`}>Write a review</Link>
            </Button>
          }
          compactWriteAction={
            <TextLink asChild className="text-sm leading-xs">
              <Link href={`/products/${product.slug}/review`}>Write a review</Link>
            </TextLink>
          }
          filters={
            <ChipGroup
              type="single"
              required
              variant="primary"
              aria-label="Filter reviews"
              defaultValue="all"
              options={[
                { value: "all", label: "All" },
                { value: "photos", label: "With photos (214)" },
                { value: "verified", label: "Verified only" },
              ]}
            />
          }
          sort={
            <PillSelect
              variant="compact"
              prefix="Sort:"
              label="Sort reviews"
              className="px-3.5"
              options={[
                { value: "helpful", label: "Most helpful" },
                { value: "newest", label: "Newest" },
                { value: "rating-high", label: "Highest rated" },
                { value: "rating-low", label: "Lowest rated" },
              ]}
            />
          }
          reviews={product.reviews.map((review, index) => (
            <CustomerReview
              key={review.author}
              review={review}
              photos={
                index === 0
                  ? [
                      <Photo key="photo" file="lifestyle.jpg" alt={`${review.author}'s photo`} sizes="72px" />,
                      <Packshot key="pack" id={product.id} alt="" sizes="72px" />,
                    ]
                  : []
              }
            />
          ))}
          moreAction={
            <TextLink asChild className="text-sm leading-xs">
              <Link href={`/products/${product.slug}/reviews`}>Show more reviews</Link>
            </TextLink>
          }
          compactMoreAction={
            <Button asChild variant="secondary" size="md" className="w-full">
              <Link href={`/products/${product.slug}/reviews`}>See all {product.rating.count.toLocaleString("en-GH")} reviews</Link>
            </Button>
          }
        />

        <ProductRail
          eyebrow="Pairs well with"
          label="Complete your routine"
          title={
            <>
              Complete your <em>routine</em>
            </>
          }
          products={routine}
          images={railImages(product.routineIds)}
          className="pt-8 md:pt-14 xl:pt-18"
        />
        <ProductRail
          eyebrow="Just for you"
          label="Viewed products"
          title={
            <>
              Viewed <em>products</em>
            </>
          }
          description="Pick up where you left off — based on your browsing on this device."
          divided
          action={
            <TextLink asChild className="text-sm leading-xs">
              <Link href="/account/history">
                <span className="md:hidden">Clear</span>
                <span className="hidden md:inline">Clear history</span>
              </Link>
            </TextLink>
          }
          products={viewed}
          images={railImages(product.viewedIds)}
          className="md:pt-0 md:pb-14 xl:pt-6 xl:pb-18"
        />
      </ProductLayout>

      <StickyBuyBar
        price={product.price}
        compareAt={product.compareAt}
        actions={
          product.soldOut ? (
            <Button asChild size="md" className="flex-1 px-3">
              <a href="#notify">Notify me when it&apos;s back</a>
            </Button>
          ) : (
            <>
              <Button variant="secondary" size="md" className="flex-1 px-3">
                Add to cart
              </Button>
              <Button asChild size="md" className="flex-1 px-3">
                <Link href="/checkout">Buy now</Link>
              </Button>
            </>
          )
        }
      />
    </StorefrontShell>
  );
}
