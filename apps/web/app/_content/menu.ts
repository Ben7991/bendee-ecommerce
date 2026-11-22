import type { MenuDrawerProps } from "@repo/ui/organisms";

/*
 * Site menu (mobile and tablet drawer). Static until the catalogue and accounts exist;
 * copy matches the Paper "Jofak" Menu page. Shown signed out: there is no auth yet.
 */
export const menu = {
  primaryLinks: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections", badge: "Sale" },
  ],
  needs: [
    { label: "Sleep & stress", href: "/collections/sleep-stress" },
    { label: "Immunity", href: "/collections/immunity" },
    { label: "Energy", href: "/collections/focus-energy" },
    { label: "Gut health", href: "/collections/gut-digestion" },
    { label: "Skin & hair", href: "/collections/skin-hair" },
    { label: "Women's health", href: "/collections/womens-health" },
  ],
  promo: {
    href: "/collections/harmattan-reset",
    eyebrow: "Ends Sat 31 Jan",
    title: "The Harmattan reset",
    description: "Up to 20% off · 12 picks",
  },
  secondaryLinks: [
    { label: "Favourites", href: "/wishlist", icon: "heart", meta: "6 on this device" },
    { label: "Track an order", href: "/orders/track", icon: "truck" },
    { label: "Help & FAQ", href: "/pages/faq", icon: "help" },
  ],
  signInHref: "/auth/sign-in",
  createAccountHref: "/auth/sign-up",
  // TODO: point at the WhatsApp business chat (https://wa.me/<number>) once the number is known.
  help: { prompt: "Need help?", label: "Chat on WhatsApp", href: "/pages/contact" },
} satisfies Omit<MenuDrawerProps, "linkAs">;
