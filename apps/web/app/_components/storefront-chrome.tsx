import Image from "next/image";
import Link from "next/link";

import { TextLink } from "@repo/ui/atoms";
import { SiteFooter, SiteHeader } from "@repo/ui/organisms";

import { subscribeToNewsletter } from "../_actions/newsletter";
import { footerColumns, navLinks } from "../_content/home";
import { cartCount, cartLines, miniCartSuggestions, miniCartTotals } from "../_content/cart";
import { menu } from "../_content/menu";
import { overlayCategories, overlayProducts, recentSearches, searchSuggestions } from "../_content/search";
import { placeholderSrc } from "../_lib/placeholder";
import { SiteMiniCart } from "./mini-cart";
import { SiteMenu } from "./site-menu";
import { SiteSearch } from "./site-search";

/**
 * The storefront header with the menu drawer and the mini-cart. The cart is static sample data
 * for now; `emptyCart` shows the empty mini-cart (empty cart and expired-link pages).
 */
export function StorefrontHeader({
  activeHref,
  emptyCart = false,
  favourites = 6,
  favouritesActive = false,
  className,
}: {
  activeHref?: string;
  emptyCart?: boolean;
  /** Saved-items count on the heart (sample data). */
  favourites?: number;
  /** On the favourites page. */
  favouritesActive?: boolean;
  className?: string;
}) {
  return (
    <SiteHeader
      linkAs={Link}
      navLinks={navLinks}
      activeHref={activeHref}
      favouritesCount={favourites}
      favouritesActive={favouritesActive}
      className={className}
      search={<StorefrontSearch />}
      bag={<StorefrontMiniCart empty={emptyCart} />}
      menu={
        <SiteMenu
          {...menu}
          activeHref={activeHref}
          promo={{ ...menu.promo, image: <Packshot id="greens" alt="" sizes="54px" /> }}
        />
      }
    />
  );
}

/** The search overlay with the sample suggestions and catalog (Paper: Search overlay). */
export function StorefrontSearch({ trigger = "icon", className }: { trigger?: "icon" | "bar"; className?: string }) {
  return (
    <SiteSearch
      trigger={trigger}
      triggerClassName={className}
      suggestions={searchSuggestions}
      recent={recentSearches}
      products={overlayProducts}
      categories={overlayCategories}
      images={Object.fromEntries(overlayProducts.map((product) => [product.id, <Packshot key={product.id} id={product.id} alt="" sizes="48px" />]))}
    />
  );
}

/** The bag button and mini-cart on their own (the PDP's mobile toolbar). */
export function StorefrontMiniCart({ empty = false }: { empty?: boolean }) {
  if (empty) {
    return (
      <SiteMiniCart
        items={[]}
        empty={{
          title: (
            <>
              Nothing in here <em>yet</em>
            </>
          ),
          description: "Add something you love. Orders over GHS 500 ship free across Accra.",
          primaryAction: { label: "Shop bestsellers", href: "/collections/bestsellers" },
          secondaryAction: { label: "Take the wellness quiz", href: "/quiz" },
          note: (
            <>
              Saved a cart before?{" "}
              <TextLink asChild>
                <Link href="/auth/sign-in">Sign in</Link>
              </TextLink>{" "}
              to bring it back.
            </>
          ),
        }}
        suggestions={miniCartSuggestions.map(({ id, ...suggestion }) => ({
          ...suggestion,
          image: <Packshot id={id} alt="" sizes="40px" />,
        }))}
      />
    );
  }
  return (
    <SiteMiniCart
      items={cartLines}
      count={cartCount}
      totals={miniCartTotals}
      images={Object.fromEntries(cartLines.map((line) => [line.id, <Packshot key={line.id} id={line.id} alt="" sizes="52px" />]))}
      freeDelivery={{
        value: 100,
        message: (
          <>
            <strong>Free delivery unlocked</strong> to Accra · East Legon
          </>
        ),
      }}
    />
  );
}

/** The storefront footer, as on Home. */
export function StorefrontFooter() {
  return (
    <SiteFooter
      linkAs={Link}
      newsletterTitle={
        <>
          Wellness notes, <em>once a week.</em>
        </>
      }
      newsletterHint="Get 15% off your first order. Unsubscribe anytime."
      newsletterAction={subscribeToNewsletter}
      tagline="Clean, plant-powered supplements for everyday balance. Made in small batches, tested every time."
      columns={footerColumns}
      copyright="© 2026 Jofak. All rights reserved."
      shortCopyright="© 2026 Jofak"
      disclaimer="*These statements have not been evaluated by the FDA."
    />
  );
}

/** A dev-only photo that fills its frame (see _lib/placeholder.ts); nothing when it's missing. */
export function Photo({ file, alt, sizes }: { file: string; alt: string; sizes: string }) {
  const src = placeholderSrc(file);
  return src ? <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" /> : null;
}

/** A dev-only product packshot (see _lib/placeholder.ts); nothing when it's missing. */
export function Packshot({ id, alt, sizes }: { id: string; alt: string; sizes: string }) {
  const src = placeholderSrc(`${id}.png`);
  return src ? <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" /> : null;
}
