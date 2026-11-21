import type {
  ContentPageDraft,
  ContentPageLink,
  HeaderMenuItem,
  HomeBlock,
  HomeBlockKind,
  MenuColumn,
  MenuFooterExtras,
  MenuTarget,
  MenuValue,
} from "@repo/ui/organisms";

import { collectionNames } from "./admin-collections";

/*
 * Admin content (Paper "Jofak - Admin" → Content): the home page blocks, info pages and menus.
 * Each keeps a draft and a live copy in server memory (globalThis, shared by pages and server
 * actions in dev): editors save drafts, Publish copies them live. It resets when the server
 * restarts. TODO: read and write the CMS once it exists.
 */

/** "Today" for the sample, as in the other admin areas. */
const TODAY = new Date("2026-11-15T12:00:00");

interface SlideData {
  id: string;
  name: string;
  look: "image" | "code" | "text";
  mark?: string;
  eyebrow: string;
  headline: string;
  button: string;
  collection: string;
  alt: string;
  showFrom: string;
  hideAfter: string;
  /** Packshot names in public/placeholders. */
  images?: string[];
}

interface BlockData {
  id: string;
  kind: HomeBlockKind;
  title: string;
  visible: boolean;
  text?: string;
  items?: string[];
  collection?: string;
  count?: number;
  showFrom?: string;
  hideAfter?: string;
  slides?: SlideData[];
}

interface PageData extends ContentPageDraft {
  shortTitle: string;
  /** Under the title in the list: "7-day window", "14 questions". */
  detail?: string;
}

interface Store {
  home: { draft: BlockData[]; live: BlockData[] };
  pages: { slug: string; draft: PageData; live: PageData; editedAt: string }[];
  menus: { header: { draft: HeaderMenuItem[]; live: HeaderMenuItem[] }; footer: { draft: FooterData; live: FooterData } };
}

interface FooterData {
  columns: MenuColumn[];
  extras: MenuFooterExtras;
}

const liveHome: BlockData[] = [
  { id: "announcement", kind: "announcement", title: "Announcement bar", visible: true, text: "Same-day delivery in Accra before 12pm" },
  {
    id: "hero",
    kind: "carousel",
    title: "Hero carousel",
    visible: true,
    slides: [
      {
        id: "glow",
        name: "Harmattan glow",
        look: "image",
        eyebrow: "Up to 20% off",
        headline: "Glow through the Harmattan",
        button: "Shop the edit",
        collection: "Harmattan glow",
        alt: "",
        showFrom: "2026-11-01T00:00",
        hideAfter: "2026-12-15T23:59",
        images: ["greens", "ashwagandha"],
      },
      {
        id: "greens20",
        name: "20% off Greens Daily",
        look: "code",
        mark: "GREENS20",
        eyebrow: "Code GREENS20",
        headline: "20% off Greens Daily",
        button: "Shop Greens Daily",
        collection: "New arrivals",
        alt: "A tub of Greens Daily",
        showFrom: "2026-11-15T00:00",
        hideAfter: "2026-11-30T23:59",
        images: ["greens"],
      },
    ],
  },
  { id: "why", kind: "why", title: "Why Jofak bar", visible: true, items: ["Pay with MoMo", "Accra in 24h", "Easy returns"] },
  { id: "need", kind: "categories", title: "Shop by need", visible: true, count: 6 },
  { id: "rail-glow", kind: "rail", title: "Product rail · Harmattan glow", visible: true, collection: "Harmattan glow", count: 8 },
  { id: "promo", kind: "promo", title: "Promo strip", visible: true, text: "Free delivery over GHS 300" },
  { id: "rail-new", kind: "rail", title: "Product rail · New arrivals", visible: true, collection: "New arrivals", count: 9 },
  {
    id: "independence",
    kind: "banner",
    title: "Independence Day banner",
    visible: true,
    text: "Happy Independence Day — 20% off sitewide",
    showFrom: "2026-03-01T00:00",
    hideAfter: "2026-03-07T23:59",
  },
];

// The draft adds a scheduled December slide to the hero.
const draftHome: BlockData[] = liveHome.map((block) =>
  block.id === "hero"
    ? {
        ...block,
        slides: [
          ...block.slides!,
          {
            id: "gifting",
            name: "December gifting",
            look: "text",
            mark: "Gifting",
            eyebrow: "Gift sets",
            headline: "Gifts that keep them well",
            button: "Shop gifts",
            collection: "December gifting",
            alt: "Wrapped Jofak gift boxes",
            showFrom: "2026-12-01T00:00",
            hideAfter: "2026-12-31T23:59",
          },
        ],
      }
    : block,
);

const DELIVERY_TABLE = (rows: [string, string, string][]) =>
  `<table><thead><tr><th>Area</th><th>Arrives</th><th>Fee</th></tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;

const page = (slug: string, title: string, shortTitle: string, body: string, seoTitle: string, seoDescription: string, detail?: string): PageData => ({
  title,
  shortTitle,
  address: slug,
  body,
  visible: true,
  seoTitle,
  seoDescription,
  detail,
});

const deliveryLive = page(
  "delivery",
  "Delivery & pickup",
  "Delivery & pickup",
  `<h2>How fast will my order arrive?</h2><p>We work with trusted courier partners across Ghana. Orders placed before 12pm are handed to the courier the same day.</p>${DELIVERY_TABLE([
    ["Greater Accra", "Next day", "GHS 20"],
    ["Kumasi, Takoradi, Tema", "2–3 days", "GHS 40"],
    ["Rest of Ghana", "3–5 days", "GHS 55"],
  ])}<p>Free delivery on orders over GHS 300. You can also pick up from our Osu store at no cost</p>`,
  "Delivery & pickup across Ghana | Jofak",
  "Next-day delivery in Accra, 2–5 days elsewhere. Free over GHS 300.",
);

const seedPages: Store["pages"] = [
  {
    slug: "about",
    editedAt: "2026-10-02",
    ...twin(
      page(
        "about",
        "About Jofak",
        "About",
        "<h2>Wellness, delivered in Ghana</h2><p>Jofak brings trusted supplements to your door, with honest labels and help from real people.</p>",
        "About Jofak | Supplements delivered in Ghana",
        "Who we are and how we choose every product we sell.",
      ),
    ),
  },
  {
    slug: "delivery",
    editedAt: "2026-10-02",
    live: deliveryLive,
    draft: {
      ...deliveryLive,
      body: deliveryLive.body.replace("GHS 20", "GHS 25").replace("GHS 40", "GHS 45").replace("GHS 55", "GHS 60"),
    },
  },
  {
    slug: "returns",
    editedAt: "2026-09-14",
    ...twin(
      page(
        "returns",
        "Returns & refunds",
        "Returns",
        "<h2>Changed your mind?</h2><p>Return unopened items within 7 days of delivery for a full refund to MoMo or card.</p>",
        "Returns & refunds | Jofak",
        "Return unopened items within 7 days for a full refund.",
        "7-day window",
      ),
    ),
  },
  {
    slug: "faq",
    editedAt: "2026-09-30",
    ...twin(
      page(
        "faq",
        "FAQ",
        "FAQ",
        "<details open><summary>Do you deliver outside Accra?</summary><p>Yes — to every region, in 2–5 days.</p></details><details><summary>Can I pay on delivery?</summary><p>Cash on delivery is available in Greater Accra.</p></details>",
        "Questions & answers | Jofak",
        "Delivery, payment, returns and product questions answered.",
        "14 questions",
      ),
    ),
  },
  {
    slug: "privacy",
    editedAt: "2026-08-12",
    ...twin(page("privacy", "Privacy policy", "Privacy", "<h2>Your data</h2><p>We only use your details to deliver orders and, if you agree, to send offers.</p>", "Privacy policy | Jofak", "How Jofak collects, uses and protects your data.")),
  },
  {
    slug: "terms",
    editedAt: "2026-08-12",
    ...twin(page("terms", "Terms of sale", "Terms", "<h2>Buying from Jofak</h2><p>Prices are in Ghana cedis and include VAT. Orders are confirmed once paid.</p>", "Terms of sale | Jofak", "The terms that apply when you buy from Jofak.")),
  },
];

function twin(data: PageData) {
  return { draft: structuredClone(data), live: structuredClone(data) };
}

const liveHeader: HeaderMenuItem[] = [
  {
    id: "need",
    label: "Shop by need",
    url: "/collections",
    auto: ["Vitamins & minerals", "Beauty from within", "Sleep & stress", "Gut health", "Greens & superfoods", "Energy & sports"],
    computer: true,
    phone: true,
  },
  {
    id: "collections",
    label: "Shop collections",
    url: "/collections",
    display: "cards",
    computer: true,
    phone: true,
    children: [
      { id: "glow", label: "Harmattan glow", url: "/collections/harmattan-glow", computer: true, phone: true },
      { id: "new", label: "New arrivals", url: "/collections/new-arrivals", computer: true, phone: true },
      { id: "under-150", label: "Under GHS 150", url: "/collections/under-ghs-150", computer: true, phone: true },
    ],
  },
  { id: "brands", label: "Brands", url: "/brands", computer: true, phone: true },
  { id: "gifts", label: "Gifts", url: "/collections/december-gifting", computer: true, phone: true, showFrom: "2026-12-01T00:00" },
  { id: "delivery", label: "Delivery & pickup", url: "/pages/delivery", computer: true, phone: true },
  { id: "track", label: "Track my order", url: "/track", computer: false, phone: true },
];

const liveFooter: FooterData = {
  columns: [
    {
      id: "shop",
      title: "Shop",
      links: [
        { id: "all", label: "All products", url: "/shop" },
        { id: "arrivals", label: "New arrivals", url: "/collections/new-arrivals" },
        { id: "f-brands", label: "Brands", url: "/brands" },
        { id: "f-collections", label: "Collections", url: "/collections" },
      ],
    },
    {
      id: "help",
      title: "Help",
      links: [
        { id: "f-delivery", label: "Delivery", url: "/pages/delivery" },
        { id: "returns", label: "Returns & refunds policy", url: "/pages/returns" },
        { id: "f-track", label: "Track my order", url: "/track" },
        { id: "f-faq", label: "FAQ", url: "/pages/faq" },
        { id: "whatsapp", label: "WhatsApp us", url: "/contact" },
      ],
    },
    {
      id: "jofak",
      title: "Jofak",
      links: [
        { id: "about", label: "About us", url: "/pages/about" },
        { id: "privacy", label: "Privacy policy", url: "/pages/privacy" },
        { id: "terms", label: "Terms of sale", url: "/pages/terms" },
        { id: "cookies", label: "Cookie settings", url: "/cookies" },
      ],
    },
  ],
  extras: { newsletter: true, payments: true, socials: { instagram: "@jofak.gh", tiktok: "@jofak.gh", facebook: "" } },
};

const seed = (): Store => ({
  home: { draft: structuredClone(draftHome), live: structuredClone(liveHome) },
  pages: structuredClone(seedPages),
  menus: {
    header: { live: structuredClone(liveHeader), draft: structuredClone(liveHeader).map((item) => (item.id === "collections" ? { ...item, label: "Collections" } : item)) },
    footer: {
      live: structuredClone(liveFooter),
      draft: {
        ...structuredClone(liveFooter),
        columns: liveFooter.columns.map((column) => ({ ...column, links: column.links.map((link) => (link.id === "returns" ? { ...link, label: "Returns" } : link)) })),
      },
    },
  },
});

const memory = globalThis as typeof globalThis & { __jofakContent?: Store };
const store = () => (memory.__jofakContent ??= seed());

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const day = (value: string) => new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

/* ---------------- Home page ---------------- */

export interface HomeBlockRow extends Omit<HomeBlock, "slides"> {
  slides?: (Omit<SlideData, "images"> & { images?: string[] })[];
}

function summaryOf(block: BlockData): { summary: string; compactSummary?: string } {
  switch (block.kind) {
    case "announcement":
    case "promo":
      return { summary: `“${block.text}”`, compactSummary: block.text };
    case "carousel": {
      const slides = block.slides ?? [];
      const later = slides.filter((slide) => slide.showFrom && new Date(slide.showFrom) > TODAY);
      return { summary: `${slides.length} ${slides.length === 1 ? "slide" : "slides"}${later[0] ? ` · ${later.length} starts ${day(later[0].showFrom)}` : ""}` };
    }
    case "why":
      return { summary: (block.items ?? []).join(" · ") };
    case "categories":
      return { summary: `Category tiles · ${block.count} top-level categories`, compactSummary: `${block.count} category tiles` };
    case "rail":
      return { summary: `Collection · ${block.count} products`, compactSummary: `${block.count} products` };
    case "banner":
      return { summary: block.hideAfter && new Date(block.hideAfter) < TODAY ? `Ended ${day(block.hideAfter)} · hidden automatically` : `“${block.text}”` };
  }
}

export function homeBlocks(): HomeBlockRow[] {
  const { draft, live } = store().home;
  return draft.map((block) => {
    const published = live.find((item) => item.id === block.id);
    const ended = block.kind === "banner" && block.hideAfter && new Date(block.hideAfter) < TODAY;
    return {
      ...block,
      ...summaryOf(block),
      state: ended ? "ended" : published && same(published, block) ? "live" : "unpublished",
    };
  });
}

export function homeChanges(): number {
  const { draft, live } = store().home;
  const edited = draft.filter((block) => !same(block, live.find((item) => item.id === block.id))).length;
  const removed = live.filter((block) => !draft.some((item) => item.id === block.id)).length;
  const reordered = same(
    draft.map((block) => block.id).filter((blockId) => live.some((item) => item.id === blockId)),
    live.map((block) => block.id).filter((blockId) => draft.some((item) => item.id === blockId)),
  )
    ? 0
    : 1;
  return edited + removed + reordered;
}

export function saveHomeBlock(json: string): void {
  const next = JSON.parse(json) as BlockData;
  const home = store().home;
  const index = home.draft.findIndex((block) => block.id === next.id);
  if (index < 0) return;
  // Keep only data fields (the client sends summaries and media too).
  const previous = home.draft[index]!;
  home.draft[index] = {
    id: previous.id,
    kind: previous.kind,
    title: String(next.title ?? previous.title).slice(0, 80) || previous.title,
    visible: Boolean(next.visible),
    text: next.text,
    items: next.items,
    collection: next.collection,
    count: next.count,
    showFrom: next.showFrom,
    hideAfter: next.hideAfter,
    slides: next.slides?.map((slide) => {
      const before = previous.slides?.find((item) => item.id === slide.id);
      return { ...slide, images: before?.images ?? slide.images?.filter((image) => typeof image === "string") };
    }),
  };
}

export function reorderHome(ids: string[]): void {
  const home = store().home;
  const byId = new Map(home.draft.map((block) => [block.id, block]));
  const ordered = ids.map((blockId) => byId.get(blockId)).filter((block): block is BlockData => Boolean(block));
  if (ordered.length === home.draft.length) home.draft = ordered;
}

export function addHomeBlock(): string {
  const home = store().home;
  const id = `promo-${home.draft.length + 1}`;
  home.draft.splice(home.draft.length - 1, 0, { id, kind: "promo", title: "Promo strip", visible: true, text: "New message for shoppers" });
  return id;
}

export function publishHome(): void {
  const home = store().home;
  home.live = structuredClone(home.draft);
}

export const homeCollections = () => [...new Set([...collectionNames(), "December gifting"])];

/* ---------------- Pages ---------------- */

export function pageLinks(): ContentPageLink[] {
  return store().pages.map((entry) => ({
    slug: entry.slug,
    title: entry.draft.title,
    shortTitle: entry.draft.shortTitle,
    note: `/pages/${entry.draft.address} · ${entry.draft.detail ?? `edited ${day(entry.editedAt)}`}`,
    draft: !same(entry.draft, entry.live),
  }));
}

export function findPage(slug: string) {
  const entry = store().pages.find((item) => item.slug === slug);
  if (!entry) return undefined;
  const changed = !same(entry.draft, entry.live);
  return {
    slug: entry.slug,
    title: entry.draft.title,
    changed,
    draft: entry.draft as ContentPageDraft,
    liveNote: `Live version from ${day(entry.editedAt)} stays up until you publish.${slug === "delivery" ? " Linked from the footer menu and checkout." : ""}`,
    warning:
      slug === "delivery"
        ? { title: "Check before publishing", text: "Fees here don't update automatically. Delivery fees in Settings were last changed 9 Nov." }
        : undefined,
  };
}

/** Removes scripts, styles, event handlers and javascript: links from page HTML. */
function clean(html: string): string {
  return html
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|style|iframe|object|embed)[^>]*\/?>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, '$1="#"');
}

export function savePage(slug: string, json: string): void {
  const entry = store().pages.find((item) => item.slug === slug);
  if (!entry) return;
  const next = JSON.parse(json) as Partial<ContentPageDraft>;
  entry.draft = {
    ...entry.draft,
    title: String(next.title ?? entry.draft.title).slice(0, 120),
    address: String(next.address ?? entry.draft.address).replace(/[^a-z0-9-]/g, "") || entry.draft.address,
    body: clean(String(next.body ?? entry.draft.body)),
    visible: Boolean(next.visible),
    seoTitle: String(next.seoTitle ?? "").slice(0, 120),
    seoDescription: String(next.seoDescription ?? "").slice(0, 300),
  };
}

export function createPage(): string {
  const pages = store().pages;
  let n = 1;
  while (pages.some((entry) => entry.slug === `new-page-${n}`)) n += 1;
  const slug = `new-page-${n}`;
  const data = page(slug, "New page", "New page", "<h2>Heading</h2><p>Write something for shoppers.</p>", "", "");
  pages.push({ slug, editedAt: TODAY.toISOString().slice(0, 10), draft: { ...data, visible: false }, live: { ...data, visible: false, body: "" } });
  return slug;
}

export function publishPage(slug: string): void {
  const entry = store().pages.find((item) => item.slug === slug);
  if (!entry) return;
  entry.live = structuredClone(entry.draft);
  entry.editedAt = TODAY.toISOString().slice(0, 10);
}

export const firstPageSlug = () => store().pages.find((entry) => !same(entry.draft, entry.live))?.slug ?? store().pages[0]!.slug;

/* ---------------- Menus ---------------- */

export type MenuKind = "header" | "footer";

const flatHeader = (items: HeaderMenuItem[]): HeaderMenuItem[] => items.flatMap((item) => [item, ...(item.children ? flatHeader(item.children) : [])]);

function menuChangeCount(kind: MenuKind): number {
  const menu = store().menus[kind];
  if (kind === "header") {
    const live = flatHeader(menu.live as HeaderMenuItem[]);
    const draft = flatHeader(menu.draft as HeaderMenuItem[]);
    const changed = draft.filter((item) => !same({ ...item, children: undefined }, { ...live.find((entry) => entry.id === item.id), children: undefined })).length;
    return changed + live.filter((item) => !draft.some((entry) => entry.id === item.id)).length;
  }
  const live = menu.live as FooterData;
  const draft = menu.draft as FooterData;
  const links = (data: FooterData) => data.columns.flatMap((column) => column.links.map((link) => ({ ...link, column: column.id })));
  const changed = links(draft).filter((link) => !same(link, links(live).find((entry) => entry.id === link.id))).length;
  return changed + links(live).filter((link) => !links(draft).some((entry) => entry.id === link.id)).length + (same(draft.extras, live.extras) ? 0 : 1);
}

export function menuChoices() {
  const { header, footer } = store().menus;
  const headerChanges = menuChangeCount("header");
  const footerChanges = menuChangeCount("footer");
  const links = footer.draft.columns.reduce((sum, column) => sum + column.links.length, 0);
  const changes = (count: number) => (count ? `${count} unpublished ${count === 1 ? "change" : "changes"}` : "published");
  return [
    { kind: "header" as const, href: "/admin/content/menus/header", title: "Header menu", note: `${header.draft.length} items · ${changes(headerChanges)}`, changed: headerChanges > 0, count: headerChanges },
    { kind: "footer" as const, href: "/admin/content/menus/footer", title: "Footer menu", note: `${footer.draft.columns.length} columns · ${links} links · ${changes(footerChanges)}`, changed: footerChanges > 0, count: footerChanges },
  ];
}

export function findMenu(kind: MenuKind): { value: MenuValue; published: Record<string, string> } {
  const menus = store().menus;
  if (kind === "header") {
    return {
      value: { kind: "header", items: structuredClone(menus.header.draft) },
      published: Object.fromEntries(flatHeader(menus.header.live).map((item) => [item.id, item.label])),
    };
  }
  return {
    value: { kind: "footer", ...structuredClone(menus.footer.draft) },
    published: Object.fromEntries(menus.footer.live.columns.flatMap((column) => column.links.map((link) => [link.id, link.label]))),
  };
}

export function saveMenu(kind: MenuKind, json: string): void {
  const next = JSON.parse(json) as MenuValue;
  const menus = store().menus;
  if (kind === "header" && next.kind === "header") menus.header.draft = next.items;
  if (kind === "footer" && next.kind === "footer") menus.footer.draft = { columns: next.columns.slice(0, 4), extras: next.extras };
}

export function publishMenu(kind: MenuKind): void {
  const menu = store().menus[kind];
  menu.live = structuredClone(menu.draft) as never;
}

export const menuChanges = (kind: MenuKind) => menuChangeCount(kind);

export function menuTargets(): MenuTarget[] {
  return [
    { kind: "Page", label: "All products", url: "/shop" },
    { kind: "Page", label: "All collections", url: "/collections" },
    { kind: "Page", label: "All brands", url: "/brands" },
    { kind: "Page", label: "Order tracking", url: "/track" },
    { kind: "Page", label: "Contact & WhatsApp", url: "/contact" },
    { kind: "Page", label: "Cookie settings", url: "/cookies" },
    ...store().pages.map((entry) => ({ kind: "Page" as const, label: entry.draft.title, url: `/pages/${entry.draft.address}` })),
    ...homeCollections().map((name) => ({ kind: "Collection" as const, label: name, url: `/collections/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` })),
  ];
}

/* ---------------- Tabs ---------------- */

export function contentTabs() {
  return [
    { href: "/admin/content", label: "Home page", compactLabel: "Home page" },
    { href: "/admin/content/pages", label: "Pages", count: store().pages.length, compactLabel: "Pages" },
    { href: "/admin/content/menus", label: "Menus", count: 2, compactLabel: "Menus" },
  ];
}
