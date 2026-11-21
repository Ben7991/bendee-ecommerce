import type { MenuEditorProps, MenuTarget, MenuValue } from "./MenuEditor";

export const sampleTargets: MenuTarget[] = [
  { kind: "Page", label: "All collections", url: "/collections" },
  { kind: "Page", label: "All brands", url: "/brands" },
  { kind: "Page", label: "Delivery & pickup", url: "/pages/delivery" },
  { kind: "Page", label: "Returns & refunds", url: "/pages/returns" },
  { kind: "Collection", label: "Harmattan glow", url: "/collections/harmattan-glow" },
  { kind: "Collection", label: "New arrivals", url: "/collections/new-arrivals" },
];

export const sampleHeader: MenuValue = {
  kind: "header",
  items: [
    { id: "need", label: "Shop by need", url: "/collections", auto: ["Vitamins & minerals", "Sleep & stress"], computer: true, phone: true },
    {
      id: "collections",
      label: "Collections",
      url: "/collections",
      display: "cards",
      computer: true,
      phone: true,
      children: [
        { id: "glow", label: "Harmattan glow", url: "/collections/harmattan-glow", computer: true, phone: true },
        { id: "new", label: "New arrivals", url: "/collections/new-arrivals", computer: true, phone: true },
      ],
    },
    { id: "brands", label: "Brands", url: "/brands", computer: true, phone: true },
    { id: "track", label: "Track my order", url: "/pages/delivery", computer: false, phone: true },
  ],
};

export const sampleFooter: MenuValue = {
  kind: "footer",
  columns: [
    { id: "shop", title: "Shop", links: [{ id: "all", label: "All collections", url: "/collections" }] },
    { id: "help", title: "Help", links: [{ id: "returns", label: "Returns", url: "/pages/returns" }] },
  ],
  extras: { newsletter: true, payments: true, socials: { instagram: "@jofak.gh", tiktok: "@jofak.gh", facebook: "" } },
};

export const headerProps: Omit<MenuEditorProps, "onSave"> = {
  defaultValue: sampleHeader,
  published: { collections: "Shop collections", need: "Shop by need", brands: "Brands", track: "Track my order", glow: "Harmattan glow", new: "New arrivals" },
  targets: sampleTargets,
  selectedId: "collections",
};
