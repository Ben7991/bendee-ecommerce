import type { ChipOption, PillSelectOption } from "@repo/ui/molecules";
import type { FilterFacet, ProductCardData } from "@repo/ui/organisms";

import { popularProducts } from "./errors";
import { bestsellers } from "./home";

/*
 * Sample listing for the static shop page (Paper "Jofak" → Product Listing). There's no catalog
 * API yet, so the counts, applied filters and results are the design's; controls don't filter.
 * Replace with the catalog search (docs/01-storefront-discovery.md §3.3) when it exists.
 */

export const listing = { total: 64, results: 41, perPage: 24, pageCount: 2 };

export const goals = [
  { label: "All", href: "/shop", count: 64 },
  { label: "Sleep & Stress", href: "/collections/sleep-stress", count: 14 },
  { label: "Focus & Energy", href: "/collections/focus-energy", count: 12 },
  { label: "Gut & Digestion", href: "/collections/gut-digestion", count: 9 },
  { label: "Immunity", href: "/collections/immunity", count: 11 },
  { label: "Daily Essentials", href: "/collections/daily-essentials", count: 18 },
];

export const sortOptions: PillSelectOption[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best selling" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

/** The same sorts as chips in the tablet filter drawer. */
export const sortChips: ChipOption[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best selling" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
];

export const perPageOptions: PillSelectOption[] = [
  { value: "24", label: "24" },
  { value: "48", label: "48" },
];

export const facets: FilterFacet[] = [
  {
    kind: "checkboxes",
    id: "type",
    label: "Product type",
    options: [
      { value: "capsules", label: "Capsules", count: 28 },
      { value: "tablets", label: "Tablets", count: 9 },
      { value: "powders", label: "Powders", count: 12 },
      { value: "gummies", label: "Gummies", count: 8 },
      { value: "liquids", label: "Liquids & drops", count: 7 },
    ],
  },
  {
    kind: "price",
    id: "price",
    label: "Price (GHS)",
    min: 0,
    max: 800,
    defaultValue: [150, 700],
    presets: [
      { value: "0-200", label: "Under 200" },
      { value: "200-400", label: "200 – 400" },
      { value: "400-", label: "400+" },
    ],
  },
  {
    kind: "chips",
    id: "diet",
    label: "Dietary",
    defaultValue: ["vegan"],
    options: [
      { value: "vegan", label: "Vegan" },
      { value: "sugar-free", label: "Sugar free" },
      { value: "gluten-free", label: "Gluten free" },
      { value: "non-gmo", label: "Non-GMO" },
    ],
  },
  {
    kind: "switches",
    id: "availability",
    options: [
      { value: "in-stock", label: "In stock only" },
      { value: "on-sale", label: "On sale" },
    ],
  },
];

/** Applied filters shown as chips; each links to the listing without it. */
export const appliedFilters = [
  { label: "GHS 150 – 700", compactLabel: "GHS 150–700", href: "/shop?diet=vegan" },
  { label: "Vegan", compactLabel: "Vegan", href: "/shop?price=150-700" },
];

const byId = (id: string) => [...bestsellers, ...popularProducts].find((product) => product.id === id)!;

const magnesium: ProductCardData = {
  id: "magnesium",
  name: "Magnesium Bisglycinate",
  shortName: "Magnesium",
  details: "Rest · relax · reset · 90 capsules",
  shortDetails: "90 capsules",
  href: "/products/magnesium-bisglycinate",
  notifyHref: "/products/magnesium-bisglycinate#notify",
  price: 340,
  rating: 4.8,
  reviewCount: 1876,
  badge: { label: "Sold out", variant: "inverse" },
  tint: "sage",
  soldOut: true,
};

/** Results in Paper's order (sold out last). */
export const shopProducts: ProductCardData[] = [
  byId("ashwagandha"),
  byId("energy"),
  byId("nmnh"),
  byId("greens"),
  byId("probiotic"),
  magnesium,
];
