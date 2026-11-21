import type { DiscountRules } from "../../../lib";
import type { DiscountEditorProps } from "./DiscountEditor";

/** GREENS20 from Paper (Jofak - Admin → Discount editor), for stories and tests. */
export const greens20: DiscountRules = {
  method: "code",
  code: "GREENS20",
  name: "",
  batch: null,
  type: "percentage",
  value: 20,
  cap: 60,
  scope: "products",
  targets: ["Greens Daily"],
  excludeSale: true,
  minSpend: null,
  eligibility: "everyone",
  totalUses: 200,
  perCustomer: 1,
  combine: false,
  startsAt: "2026-11-15T00:00",
  endsAt: "2026-11-30T23:59",
};

export const editorProps: DiscountEditorProps = {
  backHref: "/admin/discounts",
  title: "GREENS20",
  status: { label: "Live · 15 days left", tone: "success" },
  defaultValue: greens20,
  internalNote: "Greens Daily launch push",
  products: [
    { name: "Greens Daily", note: "All 2 variants · GHS 140 – 260" },
    { name: "Magnesium Sleep", note: "1 variant · GHS 80" },
  ],
  collections: ["Harmattan glow", "Sleep better"],
  categories: ["Energy & focus", "Gut health"],
  preview: { item: { label: "Greens Daily · 60 serv.", price: 260 }, delivery: { label: "Delivery · Accra", fee: 25 } },
  usage: { uses: 64, revenue: "GHS 8,960" },
  performance: { revenue: "GHS 8,960", cost: "GHS 1,790", newCustomers: 23, rejected: 11, ordersHref: "/admin/orders?discount=GREENS20" },
};
