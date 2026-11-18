import Image from "next/image";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@repo/ui/organisms";

import { subscribeToNewsletter } from "../_actions/newsletter";
import { footerColumns, navLinks } from "../_content/home";
import { menu } from "../_content/menu";
import { placeholderSrc } from "../_lib/placeholder";
import { SiteMenu } from "./site-menu";

/** The storefront header with the menu drawer, as on Home. */
export function StorefrontHeader({ activeHref, className }: { activeHref?: string; className?: string }) {
  return (
    <SiteHeader
      linkAs={Link}
      navLinks={navLinks}
      activeHref={activeHref}
      favouritesCount={6}
      bagCount={3}
      className={className}
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

/** A dev-only product packshot (see _lib/placeholder.ts); nothing when it's missing. */
export function Packshot({ id, alt, sizes }: { id: string; alt: string; sizes: string }) {
  const src = placeholderSrc(`${id}.png`);
  return src ? <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" /> : null;
}
