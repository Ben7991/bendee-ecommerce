import type { AdminBrand, AdminProduct, CategoryNode, SavedView, SectionTab, SortOption } from "@repo/ui/organisms";

/*
 * Catalog sample data for /admin/products, /admin/products/categories and /admin/products/brands
 * (Paper "Jofak - Admin" → Categories, Brands & Products). Static until the catalog API exists.
 */

export const catalogTabs: SectionTab[] = [
  { href: "/admin/products", label: "All products", compactLabel: "Products", count: 48 },
  { href: "/admin/products/categories", label: "Categories", count: 19 },
  { href: "/admin/products/brands", label: "Brands", count: 12 },
];

export const productsSummary = { total: 48, runningLow: 6, draftsToFix: 1, page: 1, pageCount: 6, range: "1–8" };

export type ProductFilter = "active" | "draft" | "scheduled" | "archived" | "low";

const view = (filter?: ProductFilter) =>
  filter ? (filter === "low" ? "/admin/products?stock=low" : `/admin/products?status=${filter}`) : "/admin/products";

export const productViews: (SavedView & { filter?: ProductFilter })[] = [
  { href: view(), label: "All", count: 48 },
  { filter: "active", href: view("active"), label: "Active", count: 41 },
  { filter: "low", href: view("low"), label: "Low stock", count: 6, warning: true, mobileOnly: true },
  { filter: "draft", href: view("draft"), label: "Drafts", count: 3 },
  { filter: "scheduled", href: view("scheduled"), label: "Scheduled", count: 1, hideOnMobile: true },
  { filter: "archived", href: view("archived"), label: "Archived", count: 3, hideOnMobile: true },
];

export const productSort: SortOption[] = [
  { value: "best-selling", label: "Best selling" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name A–Z" },
  { value: "stock", label: "Lowest stock" },
];

export const productBulkActions = [
  { value: "archive", label: "Archive" },
  { value: "draft", label: "Set to draft" },
  { value: "activate", label: "Set active", primary: true },
];

export interface SampleProduct extends Omit<AdminProduct, "image" | "href" | "brand"> {
  slug: string;
  /** Placeholder packshot id (public/placeholders/<image>.png). */
  image?: string;
  brand?: { label: string; slug: string };
  filters: ProductFilter[];
}

export const sampleProducts: SampleProduct[] = [
  {
    id: "ash",
    slug: "ashwagandha-calm",
    name: "Ashwagandha Calm",
    image: "ashwagandha",
    tint: "amber",
    variants: "2 variants",
    brand: { label: "Adinkra Apothecary", slug: "adinkra-apothecary" },
    status: { label: "Active", tone: "success" },
    category: { name: "Ashwagandha", parent: "Sleep & stress" },
    stock: { label: "60 caps sold out", detail: "120 caps: 18 left", tone: "error" },
    price: "GHS 145–260",
    compactPrice: "GHS 145+",
    sold: 86,
    filters: ["active", "low"],
  },
  {
    id: "enr",
    slug: "energy-b-complex",
    name: "Energy B-Complex",
    image: "energy",
    tint: "sage",
    variants: "3 flavours",
    brand: { label: "Sunbird Nutrition", slug: "sunbird-nutrition" },
    status: { label: "Active", tone: "success" },
    category: { name: "Energy & sports", parent: "Top level" },
    stock: { label: "Citrus: 5 left", detail: "142 across others", tone: "warning" },
    price: "GHS 116.00",
    compactPrice: "GHS 116",
    sold: 71,
    filters: ["active", "low"],
  },
  {
    id: "mag",
    slug: "magnesium-sleep-gummies",
    name: "Magnesium Sleep Gummies",
    image: "magnesium",
    tint: "sage",
    variants: "1 variant",
    brand: { label: "Harmattan Labs", slug: "harmattan-labs" },
    status: { label: "Active", tone: "success" },
    category: { name: "Sleep aids", parent: "Sleep & stress" },
    stock: { label: "3 left", detail: "~2 days of sales", tone: "warning" },
    price: "GHS 160.00",
    compactPrice: "GHS 160",
    sold: 64,
    filters: ["active", "low"],
  },
  {
    id: "pro",
    slug: "daily-probiotic",
    name: "Daily Probiotic",
    image: "probiotic",
    tint: "lavender",
    variants: "2 variants",
    brand: { label: "Coastline Labs", slug: "coastline-labs" },
    status: { label: "Active", tone: "success" },
    category: { name: "Probiotics", parent: "Gut health" },
    stock: { label: "30 caps: 4 left", detail: "60 caps: 37 left", tone: "warning" },
    price: "GHS 180–320",
    compactPrice: "GHS 180+",
    sold: 52,
    filters: ["active", "low"],
  },
  {
    id: "grn",
    slug: "greens-daily",
    name: "Greens Daily",
    image: "greens",
    tint: "sage",
    variants: "1 variant",
    brand: { label: "Asaase Botanicals", slug: "asaase-botanicals" },
    status: { label: "Active", tone: "success" },
    category: { name: "Greens & superfoods", parent: "Top level" },
    stock: { label: "124 in stock", detail: "~3 months", tone: "ok" },
    price: "GHS 96.00",
    compactPrice: "GHS 96",
    sold: 40,
    filters: ["active"],
  },
  {
    id: "vit",
    slug: "vitamin-c-zinc",
    name: "Vitamin C + Zinc",
    missingImage: true,
    issue: "2 things to fix before publishing",
    compactIssue: "Needs a photo and a category",
    status: { label: "Draft", tone: "neutral" },
    category: null,
    stock: { label: "60 in stock", tone: "muted" },
    price: "GHS 88.00",
    compactPrice: "GHS 88",
    sold: null,
    filters: ["draft"],
  },
  {
    id: "col",
    slug: "collagen-glow",
    name: "Collagen Glow",
    tint: "citrus",
    variants: "2 flavours",
    brand: { label: "Kente Naturals", slug: "kente-naturals" },
    status: { label: "Scheduled", tone: "lavender", note: "Goes live Fri, 20 Nov" },
    category: { name: "Collagen", parent: "Beauty from within" },
    stock: { label: "200 in stock", tone: "ok" },
    price: "GHS 210.00",
    compactPrice: "GHS 210",
    sold: null,
    filters: ["scheduled"],
  },
  {
    id: "iron",
    slug: "iron-folate-for-women",
    name: "Iron + Folate for Women",
    tint: "surface",
    note: "Archived 2 Oct · URL redirects to Iron & B12",
    status: { label: "Archived", tone: "neutral" },
    category: { name: "Iron & B12", parent: "Vitamins & minerals" },
    stock: { label: "0 in stock", tone: "muted" },
    price: "GHS 75.00",
    sold: null,
    archived: true,
    filters: ["archived"],
  },
];

/** The sample products narrowed by a view and search text. */
export function findProducts({ filter, q }: { filter?: ProductFilter; q?: string }) {
  const query = q?.trim().toLowerCase();
  return sampleProducts.filter(
    (product) =>
      (!filter || product.filters.includes(filter)) &&
      (!query || product.name.toLowerCase().includes(query) || product.slug.includes(query)),
  );
}

/* ---------- Categories ---------- */

export interface SampleCategory extends CategoryNode {
  slug: string;
  description?: string;
  /** Placeholder packshot for the banner. */
  banner?: string;
  children?: SampleCategory[];
}

export const sampleCategories: SampleCategory[] = [
  {
    id: "vitamins",
    slug: "vitamins-minerals",
    name: "Vitamins & minerals",
    count: 34,
    description: "Everyday vitamins and minerals, from multivitamins to iron and zinc.",
    children: [
      { id: "multivitamins", slug: "multivitamins", name: "Multivitamins", count: 12 },
      { id: "iron-b12", slug: "iron-b12", name: "Iron & B12", count: 8 },
      { id: "vitamin-c", slug: "vitamin-c", name: "Vitamin C", count: 7 },
      { id: "zinc", slug: "zinc", name: "Zinc", count: 7 },
    ],
  },
  {
    id: "beauty",
    slug: "beauty-from-within",
    name: "Beauty from within",
    count: 18,
    description: "Collagen and nutrients for skin, hair and nails.",
    children: [
      {
        id: "collagen",
        slug: "collagen",
        name: "Collagen",
        count: 7,
        banner: "ashwagandha",
        description: "Marine and bovine collagen powders and capsules for skin, hair and joints.",
        children: [{ id: "marine-collagen", slug: "marine-collagen", name: "Marine collagen", count: 3 }],
      },
      { id: "skin-hair", slug: "skin-hair", name: "Skin & hair", count: 11 },
    ],
  },
  {
    id: "sleep",
    slug: "sleep-stress",
    name: "Sleep & stress",
    count: 14,
    children: [
      { id: "ashwagandha", slug: "ashwagandha", name: "Ashwagandha", count: 5, banner: "ashwagandha" },
      { id: "sleep-aids", slug: "sleep-aids", name: "Sleep aids", count: 9, banner: "magnesium" },
    ],
  },
  {
    id: "gut",
    slug: "gut-health",
    name: "Gut health",
    count: 12,
    children: [
      { id: "probiotics", slug: "probiotics", name: "Probiotics", count: 8, banner: "probiotic" },
      { id: "fibre", slug: "fibre", name: "Fibre", count: 4 },
    ],
  },
  { id: "greens", slug: "greens-superfoods", name: "Greens & superfoods", count: 9, banner: "greens" },
  {
    id: "energy",
    slug: "energy-sports",
    name: "Energy & sports",
    count: 15,
    banner: "energy",
    children: [
      { id: "electrolytes", slug: "electrolytes", name: "Electrolytes", count: 6 },
      { id: "pre-workout", slug: "pre-workout", name: "Pre-workout", count: 0, hidden: true },
    ],
  },
];

/** A category with its parent chain, or undefined. */
export function findCategory(
  id: string,
  nodes: SampleCategory[] = sampleCategories,
  trail: SampleCategory[] = [],
): { category: SampleCategory; trail: SampleCategory[] } | undefined {
  for (const node of nodes) {
    if (node.id === id) return { category: node, trail };
    const found = node.children && findCategory(id, node.children, [...trail, node]);
    if (found) return found;
  }
  return undefined;
}

/** Categories that can be a parent (levels 1 and 2), as select options. */
export const parentOptions = [
  { value: "", label: "Top level" },
  ...sampleCategories.flatMap((node) => [
    { value: node.id, label: node.name },
    ...(node.children ?? []).map((child) => ({ value: child.id, label: `${node.name} › ${child.name}` })),
  ]),
];

/* ---------- Brands ---------- */

export const sampleBrands: AdminBrand[] = [
  {
    id: "adinkra-apothecary",
    name: "Adinkra Apothecary",
    slug: "adinkra-apothecary",
    mark: { tone: "amber", monogram: "A", serif: true, italic: true },
    count: 5,
  },
  { id: "asaase-botanicals", name: "Asaase Botanicals", slug: "asaase-botanicals", mark: { tone: "primary", icon: "leaf" }, count: 9 },
  { id: "coastline-labs", name: "Coastline Labs", slug: "coastline-labs", mark: { tone: "info", monogram: "CL" }, count: 7 },
  { id: "harmattan-labs", name: "Harmattan Labs", slug: "harmattan-labs", mark: { tone: "sun", icon: "sun", round: true }, count: 6 },
  {
    id: "kente-naturals",
    name: "Kente Naturals",
    slug: "kente-naturals",
    mark: { tone: "lavender", monogram: "K", serif: true },
    count: 4,
  },
  { id: "sunbird-nutrition", name: "Sunbird Nutrition", slug: "sunbird-nutrition", mark: { tone: "citrus", monogram: "S" }, count: 8 },
  { id: "volta-vitality", name: "Volta Vitality", slug: "volta-vitality", mark: { tone: "empty" }, count: 0, note: "No logo yet" },
  { id: "akosombo-organics", name: "Akosombo Organics", slug: "akosombo-organics", mark: { tone: "sun", monogram: "AO" }, count: 3 },
  { id: "bole-wellness", name: "Bole Wellness", slug: "bole-wellness", mark: { tone: "info", monogram: "B", serif: true }, count: 2 },
  { id: "ga-roots", name: "Ga Roots", slug: "ga-roots", mark: { tone: "amber", monogram: "GR" }, count: 2 },
  { id: "nkabom-health", name: "Nkabom Health", slug: "nkabom-health", mark: { tone: "lavender", monogram: "N" }, count: 1 },
  { id: "shea-and-sun", name: "Shea & Sun", slug: "shea-and-sun", mark: { tone: "citrus", icon: "sun" }, count: 1 },
];

/* ---------- Product editor ---------- */

export interface EditorVariant {
  id: string;
  name: string;
  sku: string;
  tint: "sage" | "amber" | "lavender" | "sun" | "citrus";
  price: string;
  was?: string;
  cost: string;
  stock: number;
  low?: boolean;
}

export interface ProductEditorData {
  slug: string;
  name: string;
  status: "active" | "draft" | "archived";
  statusChip: { label: string; tone: "success" | "neutral" | "lavender" };
  meta: string;
  /** Placeholder packshot id. */
  image?: string;
  description: string;
  media: { id: string; tint: "sage" | "amber" | "lavender" | "sun" | "citrus" }[];
  options: { name: string; values: string[] }[];
  variants: EditorVariant[];
  seo: { title: string; description: string };
  category: string;
  alsoIn: string[];
  brand: string;
  tags: string[];
  tax: string;
  stats: { value: string; label: string }[];
}

/** Category options for the editor: every category, nested ones as "Parent › Child". */
export const editorCategories = sampleCategories.flatMap((node) => [
  { value: node.id, label: node.name },
  ...(node.children ?? []).flatMap((child) => [
    { value: child.id, label: `${node.name} › ${child.name}` },
    ...(child.children ?? []).map((leaf) => ({ value: leaf.id, label: `${node.name} › ${child.name} › ${leaf.name}` })),
  ]),
]);

export const editorTaxes = [
  { value: "standard", label: "Standard (VAT + levies)" },
  { value: "zero", label: "Zero-rated" },
  { value: "exempt", label: "Exempt" },
];

const energy: ProductEditorData = {
  slug: "energy-b-complex",
  name: "Energy B-Complex",
  status: "active",
  statusChip: { label: "Active", tone: "success" },
  meta: "Live since 2 Sep · last edited by Abena, today 09:14",
  image: "energy",
  description:
    "<p>All eight B vitamins in one chewable tablet to help turn food into steady energy, without the crash of another coffee.</p><ul><li>Supports normal energy release and reduced tiredness</li><li>Vegan, no added sugar · 30 tablets, one a day</li></ul>",
  media: [
    { id: "energy-1", tint: "sun" },
    { id: "energy-2", tint: "citrus" },
    { id: "energy-3", tint: "lavender" },
    { id: "energy-4", tint: "sage" },
  ],
  options: [{ name: "Flavour", values: ["Citrus", "Berry", "Mango"] }],
  variants: [
    { id: "cit", name: "Citrus", sku: "JF-ENR-CIT", tint: "citrus", price: "116.00", cost: "GHS 58.00", stock: 5, low: true },
    { id: "bry", name: "Berry", sku: "JF-ENR-BRY", tint: "lavender", price: "116.00", cost: "GHS 58.00", stock: 88 },
    { id: "mng", name: "Mango", sku: "JF-ENR-MNG", tint: "sun", price: "99.00", was: "116.00", cost: "GHS 58.00", stock: 54 },
  ],
  seo: {
    title: "Energy B-Complex Chewables, 30 Tablets",
    description:
      "All eight B vitamins in one chewable to help turn food into steady energy. Vegan, no added sugar. Same-day delivery in Accra.",
  },
  category: "energy",
  alsoIn: ["multivitamins"],
  brand: "sunbird-nutrition",
  tags: ["vegan", "chewable", "sugar-free"],
  tax: "standard",
  stats: [
    { value: "71", label: "units sold" },
    { value: "8,236", label: "GHS revenue" },
    { value: "50%", label: "margin" },
  ],
};

/** The editor data for a product slug: Energy B-Complex as designed, the rest from their list rows. */
export function findProductEditor(slug: string): ProductEditorData | undefined {
  if (slug === energy.slug) return energy;
  const row = sampleProducts.find((product) => product.slug === slug);
  if (!row) return undefined;
  const price = row.price.replace(/^GHS\s*/, "").split("–")[0]!;
  const category = row.category && editorCategories.find((option) => option.label.endsWith(row.category!.name));
  const status = row.status.label === "Archived" ? "archived" : row.status.label === "Active" ? "active" : "draft";
  return {
    slug: row.slug,
    name: row.name,
    status,
    statusChip: {
      label: row.status.label,
      tone: row.status.tone === "success" ? "success" : row.status.tone === "lavender" ? "lavender" : "neutral",
    },
    meta:
      row.note ??
      row.status.note ??
      (status === "draft" ? "Draft · last edited by Abena, yesterday" : "Live · last edited by Kofi, last week"),
    image: row.image,
    description: row.issue ? "" : `<p>${row.name} from ${row.brand?.label ?? "our own range"}.</p>`,
    media: row.image ? [{ id: `${row.id}-1`, tint: row.tint === "citrus" || row.tint === "surface" ? "sage" : (row.tint ?? "sage") }] : [],
    options: [],
    variants: [
      {
        id: "default",
        name: row.variants?.split(" ")[0] === "1" || !row.variants ? "Default" : "Standard",
        sku: `JF-${row.id.toUpperCase()}`,
        tint: "sage",
        price: Number(price).toFixed(2),
        cost: `GHS ${(Number(price) / 2).toFixed(2)}`,
        stock: Number(row.stock.label.match(/\d+/)?.[0] ?? 0),
        low: row.stock.tone === "warning" || row.stock.tone === "error",
      },
    ],
    seo: { title: row.name, description: row.issue ? "" : `${row.name}. Same-day delivery in Accra.` },
    category: category?.value ?? "",
    alsoIn: [],
    brand: sampleBrands.find((brand) => brand.name === row.brand?.label)?.id ?? "",
    tags: [],
    tax: "standard",
    stats: [
      { value: String(row.sold ?? 0), label: "units sold" },
      { value: row.sold ? (row.sold * Number(price)).toLocaleString("en-GH") : "0", label: "GHS revenue" },
      { value: row.sold ? "50%" : "—", label: "margin" },
    ],
  };
}
