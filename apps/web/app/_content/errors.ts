import type { ProductCardData } from "@repo/ui/organisms";

import { bestsellers } from "./home";

/* Copy for the 404 page (Paper "Jofak" → Errors). */

export const notFoundQuickLinks = [
  { label: "Bestsellers", href: "/collections/bestsellers" },
  { label: "Sleep & Stress", href: "/collections/sleep-stress" },
  { label: "Track an order", href: "/orders/track" },
  { label: "Help centre", href: "/pages/faq" },
];

const probiotic: ProductCardData = {
  id: "probiotic",
  name: "Complete Probiotic",
  shortName: "Probiotic",
  details: "9-in-1 gut support · 30 capsules",
  shortDetails: "30 capsules",
  href: "/products/complete-probiotic",
  price: 480,
  rating: 4.8,
  reviewCount: 964,
  badge: { label: "Only 3 left", variant: "warning" },
  tint: "sun",
};

const byId = (id: string) => bestsellers.find((product) => product.id === id)!;

/** "Start with a bestseller" on the 404 page, in Paper's order. */
export const popularProducts: ProductCardData[] = [
  { ...byId("ashwagandha"), shortName: "Ashwagandha" },
  byId("energy"),
  byId("nmnh"),
  probiotic,
];
