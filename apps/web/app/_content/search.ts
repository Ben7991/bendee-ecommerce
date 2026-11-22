import type { CategoryTileProps } from "@repo/ui/molecules";
import type { FilterFacet, ProductCardData, SearchDialogCategory, SearchDialogProduct, SearchTip } from "@repo/ui/organisms";

import { facets as shopFacets, shopProducts } from "./shop";

/*
 * Sample search for the static search page and overlay (Paper "Jofak" → Search). There's no
 * search API yet (docs/01-storefront-discovery.md §3.5); this matches the sample catalog in
 * memory. Replace with the search service when it exists.
 */

/** Extra words each sample product matches, beyond its name and details. */
const keywords: Record<string, string[]> = {
  ashwagandha: ["stress", "sleep", "adaptogen", "anxiety", "calm", "tablets"],
  energy: ["stress", "focus", "caffeine", "fatigue", "energy", "capsules"],
  nmnh: ["stress", "cellular", "nad", "ageing", "energy", "capsules"],
  greens: ["stress", "gut", "superfood", "spirulina", "ashwagandha", "powder"],
  probiotic: ["stress", "gut", "digestion", "mood", "bloating", "capsules"],
  magnesium: ["stress", "sleep", "relax", "cramps", "capsules"],
};

const words = (text: string) => text.toLowerCase().split(/[^a-z0-9+]+/).filter(Boolean);

const searchText = (product: ProductCardData) => [product.name, product.details, ...(keywords[product.id] ?? [])].join(" ").toLowerCase();

/** Products whose name, details or keywords contain every word of the query; sold out last. */
export function searchProducts(query: string): ProductCardData[] {
  const terms = words(query);
  if (terms.length === 0) return [];
  return shopProducts
    .filter((product) => terms.every((term) => searchText(product).includes(term)))
    .sort((a, b) => Number(a.soldOut ?? false) - Number(b.soldOut ?? false));
}

const vocabulary = [...new Set(shopProducts.flatMap((product) => words(searchText(product))))].filter((word) => word.length > 3);

function distance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let previous = row[0]!;
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const current = row[j]!;
      row[j] = Math.min(row[j]! + 1, row[j - 1]! + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length]!;
}

/** "ashwaganda gumies" → "ashwagandha gummies"-style correction, when it finds something. */
export function didYouMean(query: string): { query: string; count: number } | null {
  const corrected = words(query)
    .map((word) => {
      if (vocabulary.includes(word)) return word;
      const best = vocabulary
        .map((candidate) => ({ candidate, d: distance(word, candidate) }))
        .sort((a, b) => a.d - b.d)[0];
      return best && best.d <= 2 ? best.candidate : null;
    })
    .filter((word): word is string => word !== null)
    .join(" ");
  if (!corrected || corrected === words(query).join(" ")) return null;
  const count = searchProducts(corrected).length;
  return count ? { query: corrected, count } : null;
}

/** Facets for search results: the shop's, with nothing applied. */
export const searchFacets: FilterFacet[] = shopFacets.map((facet) => {
  if (facet.kind === "price") return { ...facet, defaultValue: undefined };
  return { ...facet, defaultValue: undefined } as FilterFacet;
});

export const searchSorts = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

/** Related links for a query (sample: only "stress" has a curated set). */
export function relatedFor(query: string) {
  if (!words(query).includes("stress")) return [];
  return [
    { label: "Sleep & Stress", href: "/collections/sleep-stress", count: 14 },
    { label: "Adaptogens", href: "/collections/adaptogens", count: 6 },
    { label: "Magnesium", href: "/search?q=magnesium", count: 3 },
    { label: "Journal: Stress & sleep", href: "/journal/stress-and-sleep", external: true },
  ];
}

type Tint = NonNullable<CategoryTileProps["tint"]>;

export const popularCategories: { label: string; href: string; count: number; tint: Tint }[] = [
  { label: "Sleep & Stress", href: "/collections/sleep-stress", count: 14, tint: "sage" },
  { label: "Focus & Energy", href: "/collections/focus-energy", count: 12, tint: "sun" },
  { label: "Gut & Digestion", href: "/collections/gut-digestion", count: 9, tint: "lavender" },
  { label: "Immunity", href: "/collections/immunity", count: 11, tint: "amber" },
  { label: "Daily Essentials", href: "/collections/daily-essentials", count: 18, tint: "citrus" },
];

export const searchTips: (Omit<SearchTip, "action"> & { action?: { label: string; href: string } })[] = [
  { icon: "searchTip", title: "Search tips", text: "Check the spelling, use fewer words, or search by goal like “sleep”, “energy” or “gut health”." },
  {
    icon: "heartSoft",
    title: "Not sure what you need?",
    text: "Take our 60-second quiz and get a routine matched to your goals.",
    action: { label: "Take the wellness quiz", href: "/quiz" },
  },
  {
    icon: "chatBubble",
    title: "Looking for something we don't stock?",
    text: "Tell us on WhatsApp and we'll let you know if it's coming.",
    action: { label: "Request a product", href: "/pages/contact" },
  },
];

/* The overlay. */

export const searchSuggestions = [
  "stress",
  "stress and sleep",
  "stress relief gummies",
  "strength & recovery",
  "sleep",
  "sleep gummies",
  "magnesium",
  "gut health",
  "greens powder",
  "energy",
  "ashwagandha",
  "probiotic",
];

export const recentSearches = ["magnesium", "vitamin d3"];

export const overlayProducts: SearchDialogProduct[] = shopProducts.map((product) => ({
  id: product.id,
  name: product.name,
  href: product.href,
  meta: `${product.details.split(" · ")[0]} · ★ ${product.rating.toFixed(1)}`,
  price: product.price,
  compareAt: product.compareAt,
  soldOut: product.soldOut,
  tint: product.tint,
  keywords: keywords[product.id],
}));

export const overlayCategories: SearchDialogCategory[] = [
  { label: "Sleep & Stress", href: "/collections/sleep-stress", count: 14, tint: "sage", keywords: ["sleep", "stress", "calm", "relax"] },
  { label: "Adaptogens", href: "/collections/adaptogens", count: 6, tint: "amber", keywords: ["stress", "ashwagandha", "rhodiola"] },
  { label: "Strength & Recovery", href: "/collections/strength-recovery", count: 5, tint: "lavender", keywords: ["strength", "recovery", "muscle"] },
  { label: "Focus & Energy", href: "/collections/focus-energy", count: 12, tint: "sun", keywords: ["energy", "focus"] },
  { label: "Gut & Digestion", href: "/collections/gut-digestion", count: 9, tint: "sage", keywords: ["gut", "digestion", "probiotic"] },
];
