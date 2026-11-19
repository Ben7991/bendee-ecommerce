/*
 * Sample collections (Paper "Jofak" → Collection, Collections Hub; docs/01 §3.2, SF-FR-08a).
 * Static until GET /api/collections exists. Only the Harmattan reset has its own copy in Paper;
 * the other slugs the site links to get a plain collection page.
 */

type Tint = "sage" | "amber" | "lavender" | "sun";

export interface CollectionData {
  slug: string;
  name: string;
  eyebrow: string;
  /** Title before the serif accent word, and the word itself. */
  title: [string, string];
  description: string;
  compactDescription?: string;
  deal?: string;
  ends?: string;
  products: { id: string; tint: Tint }[];
  note?: { quote: string; compactQuote: string; author: string; role: string; action: string; endedAction: string; href: string };
  endedNote?: { title: string; description: string };
}

export const harmattan: CollectionData = {
  slug: "harmattan-reset",
  name: "Harmattan reset",
  eyebrow: "Dry season collection",
  title: ["The Harmattan", "reset"],
  description: "Dry air, dust and cold mornings take it out of you. Twelve picks for skin, immunity and steady energy until the rains come back.",
  compactDescription: "Twelve picks for skin, immunity and steady energy through the dry season.",
  deal: "Up to 20% off",
  ends: "Sat 31 Jan",
  products: [
    { id: "ashwagandha", tint: "amber" },
    { id: "greens", tint: "sage" },
    { id: "energy", tint: "lavender" },
  ],
  note: {
    quote: "Start with the greens and a probiotic for immunity, add magnesium if the cold mornings are wrecking your sleep.",
    compactQuote: "Start with greens and a probiotic, add magnesium if cold mornings wreck your sleep.",
    author: "Efua A.",
    role: "Jofak nutritionist",
    action: "Get the 3-pack · save 25%",
    endedAction: "Shop the 3-pack",
    href: "/collections/bundles",
  },
  endedNote: { title: "This sale ended on Sat 31 Jan", description: "Prices are back to normal. 9 of the 12 picks are still in stock below." },
};

/** Collections the site links to without their own Paper copy: name, eyebrow and line. */
const plain: Record<string, [string, [string, string], string]> = {
  "sleep-stress": ["Sleep & stress", ["Sleep", "better"], "Magnesium, ashwagandha and calming blends for slower evenings and deeper sleep."],
  "focus-energy": ["Focus & energy", ["Steady", "energy"], "Clean energy and focus support, without the 3pm crash."],
  "gut-digestion": ["Gut & digestion", ["Happy", "gut"], "Probiotics, greens and fibre for everyday digestion."],
  immunity: ["Immunity", ["Everyday", "immunity"], "Vitamins and greens to keep you going through the season."],
  "daily-essentials": ["Daily essentials", ["Daily", "essentials"], "The basics worth taking every day."],
  adaptogens: ["Adaptogens", ["The", "adaptogens"], "Ashwagandha and friends for stress and balance."],
  "strength-recovery": ["Strength & recovery", ["Strength &", "recovery"], "Support for training, muscles and rest days."],
  "skin-hair": ["Skin & hair", ["Skin &", "hair"], "Collagen, biotin and greens for skin and hair from the inside."],
  "womens-health": ["Women's health", ["Women's", "health"], "Formulas for every stage, picked with our nutritionist."],
  bestsellers: ["Bestsellers", ["Our", "bestsellers"], "What Accra and Kumasi keep reordering."],
  bundles: ["Bundles", ["Routine", "bundles"], "Three-product routines that save you up to 25%."],
  "new-arrivals": ["New arrivals", ["New", "arrivals"], "Fresh on the shelf this month, from greens powders to sea moss."],
  "under-100": ["Under GHS 100", ["Under", "GHS 100"], "Daily basics that won't stretch the budget."],
  "valentines-gifts": ["Valentine's gift sets", ["Valentine's", "gift sets"], "Wrapped, with a handwritten note. Delivered to them, not you."],
  "school-term-immunity": ["School term immunity", ["School term", "immunity"], "Kids' vitamins and immune support for the new term."],
};

export function findCollection(slug: string): CollectionData | undefined {
  if (slug === harmattan.slug) return harmattan;
  const entry = plain[slug];
  if (!entry) return undefined;
  const [name, title, description] = entry;
  return { slug, name, eyebrow: "Collection", title, description, products: harmattan.products };
}

export interface HubCard {
  slug: string;
  name: string;
  tint: "citrus" | "sage" | "amber" | "sun" | "lavender" | "surface";
  image: string;
  badge?: string;
  meta: string;
  compactMeta?: string;
  deal?: boolean;
  description: string;
  count: number;
}

/** Live, listed collections after the featured one (Paper: Collections Hub → Live now). */
export const liveCollections: HubCard[] = [
  {
    slug: "valentines-gifts",
    name: "Valentine's gift sets",
    tint: "citrus",
    image: "magnesium",
    badge: "15% off gift sets",
    meta: "Ends Sat 14 Feb",
    compactMeta: "15% off · Ends Sat 14 Feb",
    deal: true,
    description: "Wrapped, with a handwritten note. Delivered to them, not you.",
    count: 8,
  },
  { slug: "new-arrivals", name: "New arrivals", tint: "sage", image: "greens", meta: "Updated every Monday", description: "Fresh on the shelf this month, from greens powders to sea moss.", count: 14 },
  { slug: "under-100", name: "Under GHS 100", tint: "amber", image: "energy", meta: "Everyday prices", description: "Daily basics that won't stretch the budget.", count: 22 },
  {
    slug: "sleep-stress",
    name: "Sleep better",
    tint: "sun",
    image: "ashwagandha",
    badge: "Buy 2, save 10%",
    meta: "Ends Sun 8 Feb",
    compactMeta: "Buy 2, save 10% · Ends Sun 8 Feb",
    deal: true,
    description: "Magnesium, ashwagandha and calming teas for slower evenings.",
    count: 9,
  },
  { slug: "bestsellers", name: "Bestsellers", tint: "lavender", image: "magnesium", meta: "Updated weekly", description: "What Accra and Kumasi keep reordering.", count: 16 },
  { slug: "school-term-immunity", name: "School term immunity", tint: "surface", image: "greens", meta: "Staff picks", description: "Kids' vitamins and immune support for the new term.", count: 11 },
];

export const needs = [
  { label: "Sleep & stress", href: "/collections/sleep-stress" },
  { label: "Immunity", href: "/collections/immunity" },
  { label: "Energy", href: "/collections/focus-energy" },
  { label: "Gut health", href: "/collections/gut-digestion" },
  { label: "Skin & hair", href: "/collections/skin-hair" },
  { label: "Women's health", href: "/collections/womens-health" },
];
