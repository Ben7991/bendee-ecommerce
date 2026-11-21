import { collectionMatches, type CollectionMode, type CollectionRule, type RuleProduct } from "@repo/ui/lib";
import type { AdminCollection, CollectionBanner, MatchedProduct, SavedView, SettingRow, VisibilityToggle } from "@repo/ui/organisms";

import { findCollection } from "./collections";

/*
 * Collections for /admin/collections and /admin/collections/[slug] (Paper "Jofak - Admin" →
 * Collections), until the catalog API exists. They live in a store kept in server memory (on
 * globalThis, shared by pages and server actions in dev), so saving in the editor changes the
 * list, the hub banner and what matches. It resets when the server restarts.
 */

/** "Today" for the sample: schedules and "added N days ago" are measured from here. */
const TODAY = new Date("2026-11-15T12:00:00");

/** The products rules can match, with packshots for tiles. */
interface PoolProduct extends RuleProduct {
  image: string;
  tint: MatchedProduct["tint"];
  inStock: boolean;
  salePrice?: number;
  sold: number;
}

const pool: PoolProduct[] = [
  {
    id: "grn-30",
    name: "Greens Daily",
    tags: ["skin", "greens", "hydration"],
    category: "Beauty from within › Collagen",
    price: 140,
    onSale: false,
    addedDaysAgo: 12,
    image: "greens",
    tint: "sage",
    inStock: true,
    sold: 96,
  },
  {
    id: "ash-60",
    name: "Ashwagandha · 60",
    tags: ["calm", "sleep", "skin"],
    category: "Sleep & stress",
    price: 145,
    salePrice: 116,
    onSale: true,
    addedDaysAgo: 120,
    image: "ashwagandha",
    tint: "amber",
    inStock: true,
    sold: 71,
  },
  {
    id: "enr-bry",
    name: "Energy B · Berry",
    tags: ["energy", "hydration"],
    category: "Energy & focus",
    price: 58,
    onSale: false,
    addedDaysAgo: 40,
    image: "energy",
    tint: "citrus",
    inStock: true,
    sold: 64,
  },
  {
    id: "pro-30",
    name: "Daily Probiotic",
    tags: ["gut", "skin"],
    category: "Gut health",
    price: 90,
    onSale: false,
    addedDaysAgo: 22,
    image: "probiotic",
    tint: "sage",
    inStock: false,
    sold: 40,
  },
  {
    id: "mag-30",
    name: "Magnesium Sleep",
    tags: ["sleep", "calm"],
    category: "Sleep & stress",
    price: 80,
    onSale: false,
    addedDaysAgo: 75,
    image: "magnesium",
    tint: "lavender",
    inStock: true,
    sold: 58,
  },
  {
    id: "enr-cit",
    name: "Energy B · Citrus",
    tags: ["energy"],
    category: "Energy & focus",
    price: 58,
    onSale: true,
    salePrice: 49,
    addedDaysAgo: 18,
    image: "energy",
    tint: "amber",
    inStock: true,
    sold: 33,
  },
  {
    id: "ash-120",
    name: "Ashwagandha · 120",
    tags: ["calm", "sleep"],
    category: "Sleep & stress",
    price: 250,
    onSale: false,
    addedDaysAgo: 200,
    image: "ashwagandha",
    tint: "amber",
    inStock: true,
    sold: 21,
  },
  {
    id: "col-pep",
    name: "Collagen Peptides",
    tags: ["skin", "collagen"],
    category: "Beauty from within › Collagen",
    price: 210,
    onSale: true,
    salePrice: 168,
    addedDaysAgo: 8,
    image: "nmnh",
    tint: "lavender",
    inStock: true,
    sold: 52,
  },
  {
    id: "hya-caps",
    name: "Hyaluronic Acid",
    tags: ["skin", "hydration"],
    category: "Beauty from within",
    price: 130,
    onSale: false,
    addedDaysAgo: 28,
    image: "probiotic",
    tint: "citrus",
    inStock: false,
    sold: 18,
  },
  {
    id: "vit-c",
    name: "Vitamin C 1000",
    tags: ["immunity", "skin"],
    category: "Immunity",
    price: 75,
    onSale: true,
    salePrice: 60,
    addedDaysAgo: 55,
    image: "energy",
    tint: "sage",
    inStock: true,
    sold: 88,
  },
  {
    id: "sea-moss",
    name: "Sea Moss Gel",
    tags: ["greens", "immunity"],
    category: "Immunity",
    price: 120,
    onSale: false,
    addedDaysAgo: 5,
    image: "greens",
    tint: "sage",
    inStock: true,
    sold: 29,
  },
  {
    id: "omega",
    name: "Omega-3 Fish Oil",
    tags: ["heart", "skin"],
    category: "Heart & joints",
    price: 160,
    onSale: true,
    salePrice: 136,
    addedDaysAgo: 90,
    image: "nmnh",
    tint: "amber",
    inStock: true,
    sold: 47,
  },
];

export const ruleProducts: RuleProduct[] = pool.map(({ id, name, tags, category, price, onSale, addedDaysAgo }) => ({
  id,
  name,
  tags,
  category,
  price,
  onSale,
  addedDaysAgo,
}));
export const ruleCategories = [...new Set(pool.flatMap((product) => [product.category, product.category.split(" › ")[0]!]))].sort();

interface SampleCollection {
  slug: string;
  name: string;
  deal: string;
  description: string;
  /** Hub card line. */
  blurb: string;
  mode: CollectionMode;
  match: "any" | "all";
  rules: CollectionRule[];
  picked: string[];
  /** Only for rule-based collections that should hide out-of-stock items. */
  active: boolean;
  listed: boolean;
  featured: boolean;
  startsAt: string;
  endsAt?: string;
  banner:
    | { kind: "images"; images: string[]; tint: "sage" | "sun" | "lavender" | "citrus" | "surface" }
    | { kind: "text"; text: string; compactText?: string; tint: "sun" | "surface"; serif?: boolean }
    | { kind: "none" };
  seo: { title: string; description: string };
  /** Last 7 days, from analytics. */
  views?: string;
  revenue?: string;
  /** Hub card footer for ended collections. */
  reuse?: string;
}

const seed: SampleCollection[] = [
  {
    slug: "harmattan-glow",
    name: "Harmattan glow",
    deal: "Up to 20% off",
    description: "Dry season, dry skin. Collagen, greens and hydration picks to keep you glowing through the Harmattan.",
    blurb: "Skin & hydration",
    mode: "rules",
    match: "any",
    rules: [
      { field: "tag", value: ["skin", "hydration"] },
      { field: "category", value: ["Beauty from within › Collagen"] },
      { field: "sale", value: ["yes"] },
    ],
    picked: [],
    active: true,
    listed: true,
    featured: true,
    startsAt: "2026-11-01T00:00",
    endsAt: "2026-12-15T23:59",
    banner: { kind: "images", images: ["greens", "ashwagandha", "energy"], tint: "sage" },
    seo: {
      title: "Harmattan glow – up to 20% off | Jofak",
      description: "Collagen, greens and hydration picks for the dry season. Delivered across Accra in 24h.",
    },
    views: "3,412",
    revenue: "GHS 14,280",
  },
  {
    slug: "new-arrivals",
    name: "New arrivals",
    deal: "",
    description: "Fresh on the shelf this month.",
    blurb: "Added in the last 30 days",
    mode: "rules",
    match: "any",
    rules: [{ field: "added", value: ["30"] }],
    picked: [],
    active: true,
    listed: true,
    featured: false,
    startsAt: "2026-01-01T00:00",
    banner: { kind: "images", images: ["probiotic", "greens"], tint: "sage" },
    seo: { title: "New arrivals | Jofak", description: "The newest supplements on Jofak, delivered across Accra." },
  },
  {
    slug: "under-150",
    name: "Under GHS 150",
    deal: "",
    description: "Everyday prices.",
    blurb: "Price up to GHS 150, in stock",
    mode: "rules",
    match: "all",
    rules: [{ field: "price", value: ["150"] }],
    picked: [],
    active: true,
    listed: true,
    featured: false,
    startsAt: "2026-01-01T00:00",
    banner: { kind: "text", text: "≤ GHS 150", compactText: "≤150", tint: "sun" },
    seo: { title: "Supplements under GHS 150 | Jofak", description: "Daily basics that won't stretch the budget." },
  },
  {
    slug: "sleep-calm",
    name: "Sleep & calm",
    deal: "",
    description: "Hand-picked wind-down routine.",
    blurb: "Hand-picked wind-down routine",
    mode: "manual",
    match: "any",
    rules: [],
    picked: ["mag-30", "ash-60", "ash-120", "omega", "vit-c", "pro-30"],
    active: true,
    listed: true,
    featured: false,
    startsAt: "2026-03-01T00:00",
    banner: { kind: "images", images: ["magnesium", "ashwagandha"], tint: "lavender" },
    seo: { title: "Sleep & calm | Jofak", description: "Magnesium, ashwagandha and friends for a better night." },
  },
  {
    slug: "energy-for-the-day",
    name: "Energy for the day",
    deal: "",
    description: "Used in the home rail.",
    blurb: "Used in home rail",
    mode: "manual",
    match: "any",
    rules: [],
    picked: ["enr-bry", "enr-cit", "grn-30", "vit-c", "sea-moss", "omega", "col-pep"],
    active: true,
    listed: false,
    featured: false,
    startsAt: "2026-02-01T00:00",
    banner: { kind: "images", images: ["energy", "greens"], tint: "citrus" },
    seo: { title: "Energy for the day | Jofak", description: "Morning energy picks." },
  },
  {
    slug: "december-gifting",
    name: "December gifting",
    deal: "Free gift wrap",
    description: "Gift sets under GHS 400.",
    blurb: "Gift sets under GHS 400",
    mode: "manual",
    match: "any",
    rules: [],
    picked: ["col-pep", "omega", "ash-120", "mag-30", "grn-30", "vit-c", "sea-moss", "hya-caps"],
    active: true,
    listed: true,
    featured: false,
    startsAt: "2026-12-01T00:00",
    endsAt: "2026-12-31T23:59",
    banner: { kind: "none" },
    seo: { title: "December gifting | Jofak", description: "Wellness gift sets, wrapped free." },
  },
  {
    slug: "independence-day-sale",
    name: "Independence Day sale",
    deal: "Up to 15% off",
    description: "Ended 7 Mar · link sends shoppers to the hub.",
    blurb: "Link sends shoppers to the hub",
    mode: "rules",
    match: "any",
    rules: [{ field: "sale", value: ["yes"] }],
    picked: [],
    active: true,
    listed: true,
    featured: false,
    startsAt: "2026-03-01T00:00",
    endsAt: "2026-03-07T23:59",
    banner: { kind: "text", text: "6 March", tint: "surface", serif: true },
    seo: { title: "Independence Day sale | Jofak", description: "Celebrate 6 March with savings." },
    reuse: "Reuse for 2027",
  },
];

interface CollectionStore {
  collections: SampleCollection[];
}

const memory = globalThis as typeof globalThis & { __jofakCollections?: CollectionStore };
const store = (): CollectionStore => (memory.__jofakCollections ??= { collections: structuredClone(seed) });

const dayMonth = (value: string) => new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
const dayMonthYear = (value: string) => new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

type Phase = "live" | "scheduled" | "ended" | "off";

function phaseOf(item: SampleCollection): Phase {
  if (!item.active) return "off";
  if (new Date(item.startsAt) > TODAY) return "scheduled";
  if (item.endsAt && new Date(item.endsAt) < TODAY) return "ended";
  return "live";
}

/** What a collection holds; rule-based ones leave out-of-stock items on the store. */
function contents(item: SampleCollection) {
  const all = collectionMatches(pool, item.mode, item.match, item.rules, item.picked);
  return {
    all,
    shown: item.mode === "rules" ? all.filter((product) => product.inStock) : all,
    hidden: all.filter((product) => !product.inStock),
  };
}

function statusOf(item: SampleCollection) {
  const phase = phaseOf(item);
  switch (phase) {
    case "live":
      return { label: item.endsAt ? `Live · ends ${dayMonth(item.endsAt)}` : "Live", compactLabel: "Live", tone: "success" as const };
    case "scheduled":
      return { label: `Starts ${dayMonth(item.startsAt)}`, compactLabel: dayMonth(item.startsAt), tone: "info" as const };
    case "ended":
      return { label: "Ended", tone: "neutral" as const };
    case "off":
      return { label: "Off", tone: "neutral" as const };
  }
}

/* List. */

export type CollectionsView = "all" | "live" | "other";

export interface CollectionCard extends Omit<AdminCollection, "banner"> {
  banner: CollectionBanner | { kind: "images"; images: string[]; tint: "sage" | "sun" | "lavender" | "citrus" | "surface" };
}

function toCard(item: SampleCollection): CollectionCard {
  const phase = phaseOf(item);
  const { all } = contents(item);
  const kind = item.mode === "rules" ? ("Rule-based" as const) : ("Manual" as const);
  const count = `${all.length} ${all.length === 1 ? "product" : "products"}`;
  const notes = [
    item.blurb,
    !item.listed && phase !== "ended" ? "hidden from hub" : undefined,
    item.deal && phase === "scheduled" ? `deal label “${item.deal}”` : undefined,
  ].filter(Boolean);
  const status = statusOf(item);
  const banner: CollectionCard["banner"] =
    item.banner.kind === "none" ? { kind: "empty", uploadHref: `/admin/collections/${item.slug}#details` } : item.banner;
  return {
    id: item.slug,
    name: item.name,
    href: `/admin/collections/${item.slug}`,
    status: { ...status, label: phase === "live" ? "Live" : status.label },
    description: phase === "ended" && item.endsAt ? `Ended ${dayMonth(item.endsAt)} · ${item.blurb.toLowerCase()}` : notes.join(" · "),
    compactDescription:
      phase === "ended" && item.endsAt ? `Ended ${dayMonth(item.endsAt)} · ${item.blurb.toLowerCase()}` : notes.slice(0, 2).join(" · "),
    footer: phase === "ended" && item.reuse ? item.reuse : count,
    kind,
    summary: [
      kind,
      item.mode === "manual" ? String(all.length) : count,
      !item.listed ? "hidden from hub" : undefined,
      item.banner.kind === "none" ? "no banner yet" : undefined,
    ]
      .filter(Boolean)
      .join(" · "),
    banner,
    ended: phase === "ended",
  };
}

export function findCollections({ view = "all", q }: { view?: CollectionsView; q?: string }): CollectionCard[] {
  const term = q?.trim().toLowerCase();
  return store()
    .collections.filter((item) => !item.featured || phaseOf(item) !== "live")
    .filter((item) => (view === "all" ? true : view === "live" ? phaseOf(item) === "live" : phaseOf(item) !== "live"))
    .filter((item) => !term || [item.name, item.blurb, item.slug].some((field) => field.toLowerCase().includes(term)))
    .map(toCard);
}

export function collectionsSummary() {
  const all = store().collections;
  const count = (phase: Phase) => all.filter((item) => phaseOf(item) === phase).length;
  return { total: all.length, live: count("live"), scheduled: count("scheduled"), ended: count("ended") + count("off") };
}

export function collectionViews(): (SavedView & { view: CollectionsView })[] {
  const s = collectionsSummary();
  return [
    { view: "all", href: "/admin/collections", label: "All", count: s.total },
    { view: "live", href: "/admin/collections?view=live", label: "Live", count: s.live },
    { view: "other", href: "/admin/collections?view=other", label: "Scheduled & ended", count: s.scheduled + s.ended },
  ];
}

export function featuredCollection() {
  const item = store().collections.find((entry) => entry.featured && phaseOf(entry) === "live");
  if (!item) return undefined;
  const { all } = contents(item);
  const kind = item.mode === "rules" ? "rule-based" : "hand-picked";
  const deal = item.deal ? `${item.deal} · ` : "";
  return {
    slug: item.slug,
    name: item.name,
    description: `${deal}${item.blurb.toLowerCase()} · ${kind} · ${all.length} products`,
    compactDescription: `${deal}${all.length} products${item.endsAt ? ` · ends ${dayMonth(item.endsAt)}` : ""}`,
    stats: [
      ...(item.endsAt ? [{ label: "Ends", value: dayMonth(item.endsAt) }] : []),
      ...(item.views ? [{ label: "Views · 7 days", value: item.views }] : []),
      ...(item.revenue ? [{ label: "Revenue · 7 days", value: item.revenue }] : []),
    ],
    images: item.banner.kind === "images" ? item.banner.images : all.slice(0, 3).map((product) => product.image),
  };
}

/* Editor. */

export function findCollectionEditor(slug: string) {
  const item = store().collections.find((entry) => entry.slug === slug);
  if (!item) return undefined;
  const { all, shown, hidden } = contents(item);
  const tiles: (MatchedProduct & { image?: string })[] = [...all]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 4)
    .map((product) => {
      const outOfStock = !product.inStock && item.mode === "rules";
      return {
        id: product.id,
        name: product.name,
        tint: product.tint,
        image: product.image,
        tone: outOfStock ? "hidden" : product.onSale ? "sale" : "muted",
        detail: outOfStock
          ? "Out of stock · hidden"
          : product.onSale
            ? `On sale · GHS ${product.salePrice ?? product.price}`
            : `GHS ${product.price}${product.tags[0] ? ` · tag: ${product.tags.find((tag) => item.rules.some((rule) => rule.value.includes(tag))) ?? product.tags[0]}` : ""}`,
      };
    });
  const storefront = findCollection(item.slug);
  const toggles: VisibilityToggle[] = [
    { name: "active", label: "Active", description: "Page and rails can show it", defaultChecked: item.active, hideOnMobile: true },
    { name: "listed", label: "List on Offers hub", description: "Off: reachable by link only", defaultChecked: item.listed },
    {
      name: "featured",
      label: "Featured banner",
      description: "Top of the hub · only one at a time",
      compactDescription: "Top of the hub · one at a time",
      defaultChecked: item.featured,
    },
  ];
  const rows: SettingRow[] = [
    { label: "Name & deal label", value: [item.name, item.deal].filter(Boolean).join(" · "), href: "#details" },
    {
      label: "Schedule",
      value: item.endsAt ? `${dayMonth(item.startsAt)} – ${dayMonthYear(item.endsAt)}` : `From ${dayMonthYear(item.startsAt)}`,
      href: "#schedule",
    },
    { label: "SEO", value: `/collections/${item.slug}`, href: "#seo" },
  ];
  return {
    slug: item.slug,
    name: item.name,
    status: statusOf(item),
    featured: item.featured,
    viewHref: storefront ? `/collections/${storefront.slug}` : "/collections",
    details: { name: item.name, deal: item.deal, description: item.description },
    banner: item.banner,
    products: { mode: item.mode, match: item.match, rules: item.rules, picked: item.picked },
    matches: {
      count: all.length,
      note:
        hidden.length && item.mode === "rules"
          ? `${hidden.length} out of stock ${hidden.length === 1 ? "is" : "are"} hidden on the store`
          : undefined,
      tiles,
      shown: shown.length,
    },
    toggles,
    rows,
    schedule: { startsAt: item.startsAt, endsAt: item.endsAt },
    seo: { slug: item.slug, title: item.seo.title, description: item.seo.description },
  };
}

/* Changes. */

const parseRules = (raw: string): CollectionRule[] => {
  try {
    const parsed = JSON.parse(raw) as CollectionRule[];
    return Array.isArray(parsed) ? parsed.filter((rule) => rule && typeof rule.field === "string" && Array.isArray(rule.value)) : [];
  } catch {
    return [];
  }
};

/** Save the editor's form; returns the collection's (possibly new) slug. */
export function saveCollection(slug: string, form: FormData): string | undefined {
  const all = store().collections;
  const item = all.find((entry) => entry.slug === slug);
  if (!item) return undefined;
  const text = (name: string) => String(form.get(name) ?? "").trim();

  item.name = text("name") || item.name;
  item.deal = text("deal");
  item.description = text("description");
  if (form.get("removeBanner") === "on") item.banner = { kind: "none" };
  const upload = form.get("banner");
  if (upload instanceof File && upload.size > 0 && item.banner.kind === "none") {
    // TODO: store the image; the sample keeps showing packshots for an uploaded banner.
    item.banner = {
      kind: "images",
      images: contents(item)
        .all.slice(0, 3)
        .map((product) => product.image),
      tint: "sage",
    };
  }
  item.mode = form.get("mode") === "manual" ? "manual" : "rules";
  item.match = form.get("match") === "all" ? "all" : "any";
  item.rules = parseRules(text("rules"));
  item.picked = form.getAll("product").map(String);
  item.active = form.get("active") === "on";
  item.listed = form.get("listed") === "on";
  const featured = form.get("featured") === "on";
  // Only one featured banner at a time.
  if (featured && !item.featured) all.forEach((entry) => (entry.featured = false));
  item.featured = featured;
  item.startsAt = text("startsAt") || item.startsAt;
  item.endsAt = text("endsAt") || undefined;
  item.seo = { title: text("seoTitle") || item.seo.title, description: text("seoDescription") || item.seo.description };

  const nextSlug = text("slug")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (nextSlug && nextSlug !== item.slug && !all.some((entry) => entry.slug === nextSlug)) item.slug = nextSlug;
  return item.slug;
}

/** A new, empty, hand-picked collection that starts today; returns its slug. */
export function createCollection(): string {
  const all = store().collections;
  let n = 1;
  while (all.some((entry) => entry.slug === `new-collection-${n}`)) n += 1;
  const slug = `new-collection-${n}`;
  all.unshift({
    slug,
    name: n === 1 ? "New collection" : `New collection ${n}`,
    deal: "",
    description: "",
    blurb: "Draft",
    mode: "manual",
    match: "any",
    rules: [],
    picked: [],
    active: false,
    listed: false,
    featured: false,
    startsAt: "2026-11-15T00:00",
    banner: { kind: "none" },
    seo: { title: "", description: "" },
  });
  return slug;
}
