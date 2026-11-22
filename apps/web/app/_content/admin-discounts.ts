import { discountDay, discountValueLabel, type DiscountRules, type DiscountType } from "@repo/ui/lib";
import type { AdminDiscount, AdminStat, SavedView } from "@repo/ui/organisms";

import { collectionNames, ruleCategories } from "./admin-collections";

/*
 * Admin discounts (Paper "Jofak - Admin" → Discounts, Discount editor). Sample data kept in server
 * memory (globalThis, shared by pages and server actions in dev), so saving, pausing, duplicating
 * and extending in the admin change the list. It resets when the server restarts.
 * TODO: read and write the promotions API once it exists.
 */

/** "Today" for the sample, as in the other admin areas: days left are measured from here. */
const TODAY = new Date("2026-11-15T12:00:00");
const DAY = 24 * 60 * 60 * 1000;

interface DiscountRecord {
  /** URL id; codes keep their first code even if renamed. */
  id: string;
  rules: DiscountRules;
  /** Internal note ("Greens Daily launch push"). */
  note: string;
  paused: boolean;
  /** Overrides the derived conditions ("Buy 2+ Magnesium Sleep"). */
  conditions?: string;
  uses: number;
  revenue: number;
  cost: number;
  newCustomers: number;
  rejected: number;
}

/** Products the editor can target, with the sample cart price and packshot. */
export const discountProducts = [
  { name: "Greens Daily", note: "All 2 variants · GHS 140 – 260", cart: "Greens Daily · 60 serv.", price: 260, image: "greens" },
  { name: "Magnesium Sleep", note: "1 variant · GHS 80", cart: "Magnesium Sleep · 30 caps", price: 80, image: "magnesium" },
  { name: "Ashwagandha", note: "2 sizes · GHS 145 – 250", cart: "Ashwagandha · 120", price: 250, image: "ashwagandha" },
  { name: "Energy B", note: "2 flavours · GHS 58", cart: "Energy B · Berry", price: 58, image: "energy" },
  { name: "Daily Probiotic", note: "1 variant · GHS 90", cart: "Daily Probiotic · 30", price: 90, image: "probiotic" },
  { name: "Collagen Peptides", note: "1 variant · GHS 210", cart: "Collagen Peptides", price: 210, image: "nmnh" },
];

const base: DiscountRules = {
  method: "code",
  code: "",
  name: "",
  batch: null,
  type: "percentage",
  value: 10,
  cap: null,
  scope: "order",
  targets: [],
  excludeSale: false,
  minSpend: null,
  eligibility: "everyone",
  totalUses: null,
  perCustomer: null,
  combine: false,
  startsAt: "2026-11-15T00:00",
  endsAt: null,
};

const stats = (uses: number, revenue: number, cost: number, newCustomers = 0, rejected = 0) => ({ uses, revenue, cost, newCustomers, rejected });

function expired(code: string, note: string, type: DiscountType, value: number, startsAt: string, endsAt: string, uses: number, revenue: number): DiscountRecord {
  return {
    id: code,
    note,
    paused: false,
    rules: { ...base, code, type, value, startsAt, endsAt },
    ...stats(uses, revenue, Math.round(revenue * 0.1)),
  };
}

const seed: DiscountRecord[] = [
  {
    id: "WELCOME10",
    note: "New customer welcome",
    paused: false,
    rules: { ...base, code: "WELCOME10", value: 10, eligibility: "new", startsAt: "2026-01-01T00:00" },
    ...stats(148, 31200, 3120, 148, 22),
  },
  {
    id: "free-delivery-300",
    note: "Free delivery over GHS 300",
    paused: false,
    rules: { ...base, method: "automatic", name: "Free delivery over GHS 300", type: "delivery", value: 0, minSpend: 300, startsAt: "2026-03-01T00:00" },
    ...stats(126, 48900, 3150, 31, 0),
  },
  {
    id: "GREENS20",
    note: "Greens Daily launch push",
    paused: false,
    rules: {
      ...base,
      code: "GREENS20",
      value: 20,
      cap: 60,
      scope: "products",
      targets: ["Greens Daily"],
      excludeSale: true,
      totalUses: 200,
      perCustomer: 1,
      startsAt: "2026-11-15T00:00",
      endsAt: "2026-11-30T23:59",
    },
    ...stats(64, 8960, 1790, 23, 11),
  },
  {
    id: "AKOS",
    note: "Influencer batch · Akosua Fit",
    paused: false,
    rules: { ...base, code: "AKOS-", batch: 40, value: 15, perCustomer: 1, startsAt: "2026-11-01T00:00", endsAt: "2026-12-31T23:59" },
    ...stats(27, 5940, 890, 19, 3),
  },
  {
    id: "sleep-stack",
    note: "Sleep stack",
    paused: false,
    conditions: "Buy 2+ Magnesium Sleep",
    rules: { ...base, method: "automatic", name: "Sleep stack", type: "fixed", value: 30, scope: "products", targets: ["Magnesium Sleep"], startsAt: "2026-10-01T00:00" },
    ...stats(39, 3020, 1170, 6, 0),
  },
  {
    id: "VIPTHANKS",
    note: "Thank-you for VIP customers",
    paused: false,
    rules: { ...base, code: "VIPTHANKS", type: "fixed", value: 50, minSpend: 400, eligibility: "vip", perCustomer: 1, startsAt: "2026-11-01T00:00", endsAt: "2026-11-18T23:59" },
    ...stats(8, 4220, 400, 0, 2),
  },
  {
    id: "DECEMBER",
    note: "December gifting",
    paused: false,
    rules: { ...base, code: "DECEMBER", type: "fixed", value: 50, minSpend: 400, startsAt: "2026-12-01T00:00", endsAt: "2026-12-31T23:59" },
    ...stats(0, 0, 0),
  },
  expired("NEWYEAR26", "New year, new routine", "percentage", 15, "2026-01-01T00:00", "2026-01-15T23:59", 212, 38400),
  expired("LOVE14", "Valentine's bundle", "fixed", 40, "2026-02-07T00:00", "2026-02-14T23:59", 64, 12800),
  expired("INDEPENDENCE", "Independence Day sale", "percentage", 20, "2026-03-01T00:00", "2026-03-07T23:59", 158, 27100),
  expired("EASTER15", "Easter weekend", "percentage", 15, "2026-04-03T00:00", "2026-04-06T23:59", 71, 11900),
  expired("MOTHERSDAY", "Mother's Day gifts", "fixed", 30, "2026-05-01T00:00", "2026-05-10T23:59", 96, 19400),
  expired("GUTWEEK", "Gut health week", "percentage", 10, "2026-05-18T00:00", "2026-05-24T23:59", 38, 4100),
  expired("FATHERSDAY", "Father's Day", "fixed", 30, "2026-06-12T00:00", "2026-06-21T23:59", 52, 9800),
  expired("MIDYEAR20", "Mid-year sale", "percentage", 20, "2026-06-25T00:00", "2026-07-05T23:59", 233, 44700),
  expired("REPUBLIC", "Republic Day", "percentage", 10, "2026-07-01T00:00", "2026-07-01T23:59", 29, 3600),
  expired("BACK2SCHOOL", "Back to school energy", "percentage", 15, "2026-08-24T00:00", "2026-09-07T23:59", 87, 10200),
  expired("SLEEPWEEK", "World Sleep Week", "percentage", 20, "2026-09-14T00:00", "2026-09-20T23:59", 44, 6300),
  expired("FOUNDERS", "Founders' Day", "fixed", 25, "2026-09-21T00:00", "2026-09-21T23:59", 18, 2900),
  expired("GLOW25", "Harmattan glow preview", "percentage", 25, "2026-10-10T00:00", "2026-10-20T23:59", 61, 9700),
  expired("FARMERS", "Farmers' Day", "fixed", 20, "2026-11-04T00:00", "2026-11-06T23:59", 12, 1500),
];

interface DiscountStore {
  discounts: DiscountRecord[];
}

const memory = globalThis as typeof globalThis & { __jofakDiscounts?: DiscountStore };
const store = (): DiscountStore => (memory.__jofakDiscounts ??= { discounts: structuredClone(seed) });

const ghs = (amount: number) => `GHS ${amount.toLocaleString("en-GB")}`;

type Phase = "live" | "ending" | "scheduled" | "expired" | "paused";
export type DiscountsView = "active" | "scheduled" | "expired";

const limitOf = (rules: DiscountRules) => rules.batch ?? rules.totalUses;

function daysLeft(record: DiscountRecord): number | null {
  return record.rules.endsAt ? Math.floor((new Date(record.rules.endsAt).getTime() - TODAY.getTime()) / DAY) : null;
}

function phaseOf(record: DiscountRecord): Phase {
  const { rules } = record;
  const limit = limitOf(rules);
  if (new Date(rules.startsAt) > TODAY) return "scheduled";
  if ((rules.endsAt && new Date(rules.endsAt) < TODAY) || (limit && record.uses >= limit)) return "expired";
  if (record.paused) return "paused";
  const left = daysLeft(record);
  return left !== null && left <= 3 ? "ending" : "live";
}

const viewOf = (phase: Phase): DiscountsView => (phase === "scheduled" ? "scheduled" : phase === "expired" ? "expired" : "active");

const STATUS = {
  live: { label: "Live", tone: "success" },
  ending: { label: "Ending soon", tone: "warning" },
  scheduled: { label: "Scheduled", tone: "info" },
  expired: { label: "Expired", tone: "neutral" },
  paused: { label: "Paused", tone: "neutral" },
} as const;

const leftLabel = (days: number) => (days <= 0 ? "Ends today" : `${days} ${days === 1 ? "day" : "days"} left`);

function conditionsOf(record: DiscountRecord): string {
  const { rules } = record;
  if (record.conditions) return record.conditions;
  if (rules.batch) return "Each code single-use";
  if (rules.eligibility === "new") return "First order only";
  if (rules.eligibility === "vip") return `VIP segment${rules.minSpend ? ` · over ${ghs(rules.minSpend)}` : ""}`;
  if (rules.eligibility === "returning") return "Returning customers";
  if (rules.scope !== "order" && rules.targets.length) return `${rules.targets.length > 1 ? `${rules.targets.length} ${rules.scope}` : rules.targets[0]} only`;
  if (rules.minSpend) return `Orders over ${ghs(rules.minSpend)}`;
  return "Any order";
}

/** A short condition for tablet and mobile notes ("VIP only", "over GHS 300"). */
function shortConditionOf(record: DiscountRecord): string {
  const { rules } = record;
  if (record.conditions) return record.conditions.replace(/^Buy /, "");
  if (rules.eligibility === "vip") return "VIP only";
  if (rules.eligibility === "new") return "First order";
  if (rules.method === "automatic" && rules.minSpend) return `over ${ghs(rules.minSpend)}`;
  return conditionsOf(record);
}

const titleOf = (record: DiscountRecord) =>
  record.rules.method === "automatic" ? record.rules.name || "Untitled offer" : record.rules.batch ? `${record.rules.code}••••` : record.rules.code || "NEW CODE";

function toRow(record: DiscountRecord): AdminDiscount & { image?: string } {
  const { rules } = record;
  const phase = phaseOf(record);
  const auto = rules.method === "automatic";
  const left = daysLeft(record);
  const limit = limitOf(rules);
  const ends = rules.endsAt
    ? {
        date: discountDay(rules.endsAt),
        left: phase === "expired" ? "Ended" : phase === "scheduled" ? `Starts ${discountDay(rules.startsAt)}` : left !== null ? leftLabel(left) : undefined,
      }
    : undefined;
  const ending = phase === "ending";
  const endNote = ending && left !== null ? `ends in ${left} ${left === 1 ? "day" : "days"}` : rules.endsAt ? `ends ${discountDay(rules.endsAt)}` : "no end date";
  const product = rules.scope === "products" && rules.targets.length === 1 ? discountProducts.find((item) => item.name === rules.targets[0]) : undefined;
  return {
    href: `/admin/discounts/${record.id}`,
    method: rules.method,
    title: titleOf(record),
    batch: rules.batch ? `${rules.batch} codes` : undefined,
    note: auto ? "Automatic · no code needed" : record.note,
    compactNote: auto ? `Automatic · ${endNote}` : `${shortConditionOf(record)} · ${endNote}`,
    mobileNote: auto ? `Automatic · ${shortConditionOf(record)}` : `${shortConditionOf(record)} · ${record.uses} used`,
    value: discountValueLabel(rules),
    compactValue: rules.type === "delivery" ? "Free deliv." : undefined,
    mobileValue: rules.type === "delivery" ? "Free" : undefined,
    conditions: conditionsOf(record),
    image: product?.image,
    uses: record.uses,
    limit: limit ?? undefined,
    usesNote: rules.perCustomer ? `${rules.perCustomer} per customer` : "no limit",
    revenue: ghs(record.revenue),
    ends,
    status: STATUS[phase],
    endingSoon: ending,
  };
}

export function findDiscounts({ view = "active", q, type }: { view?: DiscountsView; q?: string; type?: string }) {
  const query = q?.trim().toLowerCase();
  return store()
    .discounts.filter((record) => viewOf(phaseOf(record)) === view)
    .filter((record) => !type || record.rules.type === type)
    .filter((record) => !query || [record.rules.code, record.rules.name, record.note].some((text) => text.toLowerCase().includes(query)))
    .map(toRow);
}

export function discountViews(): (SavedView & { view: DiscountsView })[] {
  const counts = { active: 0, scheduled: 0, expired: 0 };
  for (const record of store().discounts) counts[viewOf(phaseOf(record))] += 1;
  return [
    { view: "active", href: "/admin/discounts", label: "Active", count: counts.active },
    { view: "scheduled", href: "/admin/discounts?view=scheduled", label: "Scheduled", count: counts.scheduled },
    { view: "expired", href: "/admin/discounts?view=expired", label: "Expired", count: counts.expired },
  ];
}

/** Orders in the last 30 days, for "31% of orders used one". */
const ORDERS_30D = 1329;

export function discountStats(): { stats: AdminStat[]; live: number; redeemed: number; scheduled: number } {
  const all = store().discounts;
  const live = all.filter((record) => ["live", "ending"].includes(phaseOf(record)));
  const codes = live.filter((record) => record.rules.method === "code").length;
  const redeemed = live.reduce((sum, record) => sum + record.uses, 0);
  const revenue = live.reduce((sum, record) => sum + record.revenue, 0);
  const cost = live.reduce((sum, record) => sum + record.cost, 0);
  const short = (amount: number) => `GHS ${(amount / 1000).toFixed(1)}k`;
  return {
    live: live.length,
    redeemed,
    scheduled: all.filter((record) => phaseOf(record) === "scheduled").length,
    stats: [
      { label: "Live now", value: String(live.length), note: `${codes} codes · ${live.length - codes} automatic`, tone: "accent" },
      {
        label: "Redemptions · 30 days",
        compactLabel: "Redeemed · 30d",
        value: String(redeemed),
        note: `${Math.round((redeemed / ORDERS_30D) * 100)}% of orders used one`,
      },
      {
        label: "Discounted revenue",
        compactLabel: "Revenue",
        value: ghs(revenue),
        compactValue: short(revenue),
        note: `Avg order ${ghs(redeemed ? Math.round(revenue / redeemed) : 0)} vs 198 without`,
        noteTone: "muted",
      },
      {
        label: "Cost of discounts",
        compactLabel: "Cost",
        value: ghs(cost),
        compactValue: short(cost),
        note: `${revenue ? ((cost / revenue) * 100).toFixed(1) : "0"}% of discounted revenue`,
        noteTone: "muted",
        tone: "muted",
      },
    ],
  };
}

/** The next scheduled discount, for the table footer. */
export function nextScheduled() {
  const next = store()
    .discounts.filter((record) => phaseOf(record) === "scheduled")
    .sort((a, b) => a.rules.startsAt.localeCompare(b.rules.startsAt))[0];
  if (!next) return undefined;
  const { rules } = next;
  const summary = `${discountValueLabel(rules)}${rules.minSpend ? ` over ${ghs(rules.minSpend)}` : ""} · starts ${discountDay(rules.startsAt)}`;
  return { title: titleOf(next), summary };
}

function editorStatus(record: DiscountRecord): { label: string; tone: (typeof STATUS)[Phase]["tone"] } {
  const phase = phaseOf(record);
  const left = daysLeft(record);
  const { rules } = record;
  const label =
    phase === "scheduled"
      ? `Scheduled · starts ${discountDay(rules.startsAt)}`
      : phase === "expired"
        ? rules.endsAt && new Date(rules.endsAt) < TODAY
          ? `Expired · ended ${discountDay(rules.endsAt)}`
          : "Expired · all uses taken"
        : phase === "paused"
          ? "Paused"
          : left !== null
            ? `${STATUS[phase].label} · ${leftLabel(left).toLowerCase()}`
            : "Live · no end date";
  return { label, tone: STATUS[phase].tone };
}

export function findDiscountEditor(id: string) {
  const record = store().discounts.find((entry) => entry.id === id);
  if (!record) return undefined;
  const { rules } = record;
  const product = discountProducts.find((item) => rules.scope === "products" && rules.targets.includes(item.name)) ?? discountProducts[0]!;
  return {
    id: record.id,
    title: titleOf(record),
    status: editorStatus(record),
    paused: record.paused,
    note: record.note,
    rules,
    preview: { item: { label: product.cart, price: product.price }, delivery: { label: "Delivery · Accra", fee: 25 } },
    usage: { uses: record.uses, revenue: ghs(record.revenue) },
    performance: {
      revenue: ghs(record.revenue),
      cost: ghs(record.cost),
      newCustomers: record.newCustomers,
      rejected: record.rejected,
      ordersHref: `/admin/orders?q=${encodeURIComponent(rules.method === "code" ? rules.code : rules.name)}`,
    },
    collections: collectionNames(),
    categories: ruleCategories,
  };
}

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const amount = (form: FormData, key: string) => {
  const value = text(form, key);
  return value === "" || Number.isNaN(Number(value)) ? null : Math.max(0, Number(value));
};

function parseRules(form: FormData, previous: DiscountRules): DiscountRules {
  const method = text(form, "method") === "automatic" ? "automatic" : "code";
  const type = (["percentage", "fixed", "delivery"] as const).find((option) => option === text(form, "type")) ?? previous.type;
  const scope = (["order", "products", "collections", "categories"] as const).find((option) => option === text(form, "scope")) ?? previous.scope;
  const eligibility = (["everyone", "new", "returning", "vip"] as const).find((option) => option === text(form, "eligibility")) ?? previous.eligibility;
  let targets: string[] = [];
  try {
    const parsed: unknown = JSON.parse(text(form, "targets") || "[]");
    if (Array.isArray(parsed)) targets = parsed.filter((item): item is string => typeof item === "string");
  } catch {
    targets = previous.targets;
  }
  const value = amount(form, "value") ?? previous.value;
  return {
    method,
    code: text(form, "code").toUpperCase().replace(/\s/g, "") || previous.code,
    name: text(form, "name") || previous.name,
    batch: amount(form, "batch"),
    type,
    value: type === "percentage" ? Math.min(100, value) : value,
    cap: type === "percentage" ? amount(form, "cap") : null,
    scope,
    targets: scope === "order" ? [] : targets,
    excludeSale: text(form, "excludeSale") === "true",
    minSpend: amount(form, "minSpend"),
    eligibility,
    totalUses: amount(form, "totalUses"),
    perCustomer: amount(form, "perCustomer"),
    combine: text(form, "combine") === "true",
    startsAt: text(form, "startsAt") || previous.startsAt,
    endsAt: text(form, "endsAt") || null,
  };
}

/** Editor save. `intent=pause` also toggles paused; `intent=duplicate` saves a paused copy. Returns the id to open. */
export function saveDiscount(id: string, form: FormData): string | undefined {
  const all = store().discounts;
  const record = all.find((entry) => entry.id === id);
  if (!record) return undefined;
  const rules = parseRules(form, record.rules);
  const intent = text(form, "intent");
  if (intent === "duplicate") {
    const copy: DiscountRecord = {
      ...structuredClone(record),
      id: uniqueId(`${record.id}-copy`),
      rules: { ...rules, code: rules.method === "code" ? `${rules.code}COPY` : rules.code, name: rules.method === "automatic" ? `${rules.name} (copy)` : rules.name },
      note: `Copy of ${record.note}`,
      paused: true,
      ...stats(0, 0, 0),
    };
    all.splice(all.indexOf(record) + 1, 0, copy);
    return copy.id;
  }
  record.rules = rules;
  if (intent === "pause") record.paused = !record.paused;
  return record.id;
}

function uniqueId(stem: string): string {
  const all = store().discounts;
  let id = stem;
  for (let n = 2; all.some((entry) => entry.id === id); n += 1) id = `${stem}-${n}`;
  return id;
}

/** Create discount: a paused 10%-off draft with a fresh code, opened in the editor. */
export function createDiscount(): string {
  const all = store().discounts;
  let n = 1;
  while (all.some((entry) => entry.rules.code === `NEWCODE${n}`)) n += 1;
  const id = uniqueId(`new-${n}`);
  all.unshift({ id, note: "Draft", paused: true, rules: { ...base, code: `NEWCODE${n}` }, ...stats(0, 0, 0) });
  return id;
}

/** Mobile "Extend": push the end date back a week. */
export function extendDiscount(id: string): void {
  const record = store().discounts.find((entry) => entry.id === id);
  if (!record?.rules.endsAt) return;
  const end = new Date(new Date(record.rules.endsAt).getTime() + 7 * DAY);
  const pad = (value: number) => String(value).padStart(2, "0");
  record.rules.endsAt = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}T${pad(end.getHours())}:${pad(end.getMinutes())}`;
}
