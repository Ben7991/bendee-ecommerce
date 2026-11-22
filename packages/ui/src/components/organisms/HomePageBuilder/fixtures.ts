import type { HomeBlock } from "./HomePageBuilder";

/** The Jofak home page blocks from Paper (Jofak - Admin → Home page builder). */
export const sampleBlocks: HomeBlock[] = [
  { id: "announcement", kind: "announcement", title: "Announcement bar", summary: "“Same-day delivery in Accra before 12pm”", compactSummary: "Same-day delivery in Accra", state: "live", visible: true, text: "Same-day delivery in Accra before 12pm" },
  {
    id: "hero",
    kind: "carousel",
    title: "Hero carousel",
    summary: "3 slides · 1 starts 1 Dec",
    state: "unpublished",
    visible: true,
    slides: [
      { id: "s1", name: "Harmattan glow", look: "image", eyebrow: "Up to 20% off", headline: "Glow through the Harmattan", button: "Shop the edit", collection: "Harmattan glow", alt: "", showFrom: "2026-11-01T00:00", hideAfter: "2026-12-15T23:59" },
      { id: "s2", name: "20% off Greens Daily", look: "code", mark: "GREENS20", eyebrow: "Code GREENS20", headline: "20% off Greens Daily", button: "Shop Greens", collection: "New arrivals", alt: "Greens Daily tub", showFrom: "", hideAfter: "2026-11-30T23:59" },
      { id: "s3", name: "December gifting", look: "text", mark: "Gifting", eyebrow: "", headline: "Gifts that keep giving", button: "Shop gifts", collection: "December gifting", alt: "Gift boxes", showFrom: "2099-12-01T00:00", hideAfter: "" },
    ],
  },
  { id: "why", kind: "why", title: "Why Jofak bar", summary: "Pay with MoMo · Accra in 24h · Easy returns", compactSummary: "MoMo · Accra in 24h · Returns", state: "live", visible: true, items: ["Pay with MoMo", "Accra in 24h", "Easy returns"] },
  { id: "categories", kind: "categories", title: "Shop by need", summary: "Category tiles · 6 top-level categories", compactSummary: "6 category tiles", state: "live", visible: true, count: 6 },
  { id: "banner", kind: "banner", title: "Independence Day banner", summary: "Ended 7 Mar · hidden automatically", state: "ended", visible: false, text: "Happy Independence Day" },
];
