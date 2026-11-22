import type { InitialsProps, PaymentBrand, StatusChipProps } from "@repo/ui/atoms";
import type { AdminReturn, ReturnMethod, ReturnStage, ReturnStep, ReturnTimelineEvent, SavedView } from "@repo/ui/organisms";

import { recordReturnStock } from "./admin-inventory";

/*
 * Returns sample data for /admin/returns and /admin/returns/[id] (Paper "Jofak - Admin" →
 * Returns), until the returns API exists. Returns move through their stages in a store kept in
 * server memory (on globalThis, shared by pages and server actions in dev); writing off or
 * restocking an item also logs it in Inventory → Movements. It resets when the server restarts.
 */

type Tone = NonNullable<StatusChipProps["tone"]>;
export type ReturnStageKey = "requested" | "awaiting" | "received" | "inspected" | "closed";

interface SampleReturn {
  id: string;
  order: string;
  customer: { name: string; slug: string; tag?: string; guest?: boolean; tone?: InitialsProps["tone"]; stats: string; pastReturns: string };
  /** Inventory variant id, for restocks and write-offs. */
  variantId: string;
  /** "Magnesium Sleep". */
  itemName: string;
  /** "Magnesium Sleep · Gummies". */
  itemFull: string;
  /** Placeholder packshot id. */
  image: string;
  tint?: "sage" | "amber" | "lavender" | "surface";
  quantity: number;
  bought: number;
  /** What they paid for the returned units. */
  paid: number;
  discount?: string;
  reason: { label: string; tone: Tone };
  photos: number;
  quote: string;
  compactQuote?: string;
  wants: "Refund" | "Exchange";
  payment: { method: string; short: string; compact: string; brand?: PaymentBrand; cod?: boolean };
  deliveryFee: number;
  /** "today 08:12". */
  requested: string;
  age: string;
  /** Day of the 7-day window. */
  day: number;
  stage: ReturnStageKey;
  method?: "dropoff" | "pickup" | "none";
  pickupDate?: string;
  inspection?: "ok" | "failed";
  outcome?: "refunded" | "rejected" | "exchanged";
  refunded?: number;
  closedOn?: string;
  timeline: ReturnTimelineEvent[];
}

const efuaStats = { stats: "14 orders · GHS 3,940 lifetime", pastReturns: "1 in 14 orders" };

const seed: SampleReturn[] = [
  {
    id: "RTN-0418",
    order: "JFK-251455",
    customer: { name: "Efua Boateng", slug: "efua-boateng", tag: "VIP", tone: "sage", ...efuaStats },
    variantId: "mag-30",
    itemName: "Magnesium Sleep",
    itemFull: "Magnesium Sleep · Gummies",
    image: "magnesium",
    tint: "sage",
    quantity: 1,
    bought: 1,
    paid: 80,
    discount: "after 10% discount",
    reason: { label: "Damaged", tone: "error" },
    photos: 2,
    quote: "The lid was cracked when it arrived and some gummies had spilled into the bag. I'd like a refund please.",
    compactQuote: "The lid was cracked when it arrived and some gummies had spilled into the bag.",
    wants: "Refund",
    payment: { method: "MTN 024 ••• 4521 via Paystack", short: "MoMo", compact: "MoMo · 024 ••• 4521", brand: "mtn" },
    deliveryFee: 25,
    requested: "today 08:12",
    age: "2h ago",
    day: 2,
    stage: "requested",
    timeline: [
      { id: "t1", title: "Return requested with 2 photos", detail: "Today 08:12 · by customer" },
      { id: "t2", title: "Order delivered", detail: "13 Nov 15:40 · delivery partner" },
      { id: "t3", title: "Order placed · paid by MoMo", detail: "12 Nov 19:05" },
    ],
  },
  {
    id: "RTN-0417",
    order: "JFK-251448",
    customer: {
      name: "Kwame Mensah",
      slug: "kwame-mensah",
      tone: "amber",
      stats: "6 orders · GHS 1,280 lifetime",
      pastReturns: "None before",
    },
    variantId: "enr-bry",
    itemName: "Energy B · Berry",
    itemFull: "Energy B-Complex · Berry",
    image: "energy",
    tint: "lavender",
    quantity: 2,
    bought: 2,
    paid: 116,
    reason: { label: "Wrong flavour", tone: "neutral" },
    photos: 0,
    quote: "I ordered Citrus but got Berry. Can I swap them for Citrus?",
    wants: "Exchange",
    payment: { method: "Visa •••• 4417 via Paystack", short: "Card", compact: "Card · •••• 4417" },
    deliveryFee: 25,
    requested: "today 05:20",
    age: "5h ago",
    day: 1,
    stage: "requested",
    timeline: [
      { id: "t1", title: "Exchange requested", detail: "Today 05:20 · by customer" },
      { id: "t2", title: "Order delivered", detail: "14 Nov 11:05 · delivery partner" },
    ],
  },
  {
    id: "RTN-0415",
    order: "JFK-251440",
    customer: { name: "Ama Owusu", slug: "ama-owusu", tone: "citrus", stats: "1 order · GHS 210 lifetime", pastReturns: "None before" },
    variantId: "grn-30",
    itemName: "Greens Daily",
    itemFull: "Greens Daily · 30 servings",
    image: "greens",
    quantity: 1,
    bought: 1,
    paid: 70,
    reason: { label: "Changed mind", tone: "neutral" },
    photos: 0,
    quote: "Not for me after all, it's still sealed.",
    wants: "Refund",
    payment: { method: "MTN 024 ••• 7703 via Paystack", short: "MoMo", compact: "MoMo · 024 ••• 7703", brand: "mtn" },
    deliveryFee: 20,
    requested: "yesterday 16:40",
    age: "1 day",
    day: 3,
    stage: "awaiting",
    method: "dropoff",
    timeline: [
      { id: "t1", title: "Approved · drop-off at Osu store", detail: "Yesterday 17:02 · Abena M." },
      { id: "t2", title: "Return requested", detail: "Yesterday 16:40 · by customer" },
    ],
  },
  {
    id: "RTN-0414",
    order: "JFK-251431",
    customer: { name: "Yaw Darko", slug: "yaw-darko", tone: "info", stats: "4 orders · GHS 860 lifetime", pastReturns: "None before" },
    variantId: "pro-30",
    itemName: "Daily Probiotic",
    itemFull: "Daily Probiotic · 30 caps",
    image: "probiotic",
    tint: "lavender",
    quantity: 1,
    bought: 2,
    paid: 90,
    reason: { label: "Not as described", tone: "neutral" },
    photos: 1,
    quote: "The label says 20 billion CFU but the site said 30 billion.",
    wants: "Refund",
    payment: { method: "MTN 027 ••• 6610 via Paystack", short: "MoMo", compact: "MoMo · 027 ••• 6610", brand: "mtn" },
    deliveryFee: 30,
    requested: "13 Nov 10:15",
    age: "2 days",
    day: 4,
    stage: "awaiting",
    method: "pickup",
    pickupDate: "16 Nov",
    timeline: [
      { id: "t1", title: "Approved · partner pickup booked for 16 Nov", detail: "13 Nov 12:30 · Kofi A." },
      { id: "t2", title: "Return requested with 1 photo", detail: "13 Nov 10:15 · by customer" },
    ],
  },
  {
    id: "RTN-0413",
    order: "JFK-251419",
    customer: { name: "Kofi Asante", slug: "kofi-asante", tone: "sage", stats: "2 orders · GHS 340 lifetime", pastReturns: "None before" },
    variantId: "ash-60",
    itemName: "Ashwagandha · 60",
    itemFull: "Ashwagandha Calm · 60 caps",
    image: "ashwagandha",
    tint: "amber",
    quantity: 1,
    bought: 1,
    paid: 145,
    reason: { label: "Changed mind", tone: "neutral" },
    photos: 0,
    quote: "Bought the wrong size, I wanted the 120 caps.",
    wants: "Refund",
    payment: { method: "Telecel 050 ••• 3390 via Paystack", short: "Telecel Cash", compact: "Telecel · 050 ••• 3390", brand: "telecel" },
    deliveryFee: 35,
    requested: "12 Nov 09:40",
    age: "3 days",
    day: 5,
    stage: "received",
    method: "dropoff",
    timeline: [
      { id: "t1", title: "Item received at Osu store", detail: "Yesterday 14:10 · Abena M." },
      { id: "t2", title: "Approved · drop-off at Osu store", detail: "12 Nov 11:00 · Abena M." },
      { id: "t3", title: "Return requested", detail: "12 Nov 09:40 · by customer" },
    ],
  },
  {
    id: "RTN-0412",
    order: "JFK-251397",
    customer: { name: "Nana Adjei", slug: "nana-adjei", guest: true, stats: "2 orders · guest checkout", pastReturns: "None before" },
    variantId: "pro-30",
    itemName: "Daily Probiotic",
    itemFull: "Daily Probiotic · 30 caps",
    image: "probiotic",
    tint: "lavender",
    quantity: 1,
    bought: 1,
    paid: 90,
    reason: { label: "Wrong item sent", tone: "neutral" },
    photos: 1,
    quote: "I ordered Magnesium Sleep but got Probiotic.",
    wants: "Refund",
    payment: {
      method: "Paid cash on delivery · refund to MoMo 050 ••• 2268",
      short: "MoMo",
      compact: "MoMo · 050 ••• 2268",
      brand: "mtn",
      cod: true,
    },
    deliveryFee: 25,
    requested: "11 Nov 18:20",
    age: "4 days",
    day: 6,
    stage: "inspected",
    method: "pickup",
    inspection: "ok",
    timeline: [
      { id: "t1", title: "Inspected · sealed, restocked +1", detail: "Yesterday 17:20 · Kofi A." },
      { id: "t2", title: "Item collected by delivery partner", detail: "14 Nov 13:05 · delivery partner" },
      { id: "t3", title: "Approved · partner pickup", detail: "12 Nov 09:15 · Abena M." },
      { id: "t4", title: "Return requested with 1 photo", detail: "11 Nov 18:20 · by customer" },
    ],
  },
  {
    id: "RTN-0411",
    order: "JFK-251388",
    customer: {
      name: "Akosua Frimpong",
      slug: "akosua-frimpong",
      tag: "VIP",
      tone: "lavender",
      stats: "22 orders · GHS 6,120 lifetime",
      pastReturns: "2 in 22 orders",
    },
    variantId: "grn-30",
    itemName: "Greens Daily",
    itemFull: "Greens Daily · 30 servings",
    image: "greens",
    quantity: 1,
    bought: 3,
    paid: 70,
    reason: { label: "Damaged", tone: "error" },
    photos: 1,
    quote: "Tub was dented and the seal broken.",
    wants: "Refund",
    payment: { method: "MTN 020 ••• 1187 via Paystack", short: "MoMo", compact: "MoMo · 020 ••• 1187", brand: "mtn" },
    deliveryFee: 25,
    requested: "10 Nov 12:00",
    age: "5 days",
    day: 7,
    stage: "closed",
    method: "none",
    outcome: "refunded",
    refunded: 70,
    closedOn: "10 Nov",
    timeline: [
      { id: "t1", title: "Refunded GHS 70 to MoMo · no return needed", detail: "10 Nov 14:30 · Abena M." },
      { id: "t2", title: "Return requested with 1 photo", detail: "10 Nov 12:00 · by customer" },
    ],
  },
  {
    id: "RTN-0409",
    order: "JFK-251370",
    customer: {
      name: "Abena Owusu-Ansah",
      slug: "abena-owusu-ansah",
      tone: "neutral",
      stats: "3 orders · GHS 520 lifetime",
      pastReturns: "1 in 3 orders",
    },
    variantId: "enr-cit",
    itemName: "Energy B · Citrus",
    itemFull: "Energy B-Complex · Citrus",
    image: "energy",
    tint: "amber",
    quantity: 1,
    bought: 1,
    paid: 58,
    reason: { label: "Changed mind", tone: "neutral" },
    photos: 0,
    quote: "Opened it but don't like the taste.",
    wants: "Refund",
    payment: { method: "MTN 026 ••• 5104 via Paystack", short: "MoMo", compact: "MoMo · 026 ••• 5104", brand: "mtn" },
    deliveryFee: 25,
    requested: "8 Nov 09:10",
    age: "7 days",
    day: 7,
    stage: "closed",
    outcome: "rejected",
    closedOn: "8 Nov",
    timeline: [
      { id: "t1", title: "Rejected · opened supplements can't be returned", detail: "8 Nov 11:45 · Kofi A." },
      { id: "t2", title: "Return requested", detail: "8 Nov 09:10 · by customer" },
    ],
  },
];

/** The design's figures beyond the sample (30 days of closed returns). */
const DESIGN = { closed: 18, refunded: 1460 };

interface ReturnStore {
  returns: SampleReturn[];
  seq: number;
}

const memory = globalThis as typeof globalThis & { __jofakReturns?: ReturnStore };
const store = (): ReturnStore => (memory.__jofakReturns ??= { returns: structuredClone(seed), seq: 0 });

const STAFF = "Abena M.";
const money = (value: number) => `GHS ${value.toLocaleString("en-GH", { maximumFractionDigits: 2 })}`;
const clock = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Accra" });

const href = (id: string) => `/admin/returns/${id}`;
const orderHref = (order: string) => `/admin/orders?q=${order}`;

/* List. */

export const returnReasons = [
  { value: "", label: "Reason" },
  ...[...new Set(seed.map((item) => item.reason.label))].map((label) => ({ value: label.toLowerCase().replace(/\s+/g, "-"), label })),
];

const reasonKey = (item: SampleReturn) => item.reason.label.toLowerCase().replace(/\s+/g, "-");

function statusOf(item: SampleReturn): AdminReturn["status"] {
  switch (item.stage) {
    case "requested":
      return { label: "Requested", tone: "warning" };
    case "awaiting":
      return item.method === "pickup"
        ? {
            label: "Awaiting item",
            tone: "lavender",
            note: `Partner pickup · ${item.pickupDate ?? "to book"}`,
            compactNote: `Pickup ${item.pickupDate ?? ""}`.trim(),
          }
        : { label: "Awaiting item", tone: "lavender", note: "Drop-off at Osu store", compactNote: "Drop-off" };
    case "received":
      return { label: "Received", tone: "info", compactNote: money(item.paid) };
    case "inspected":
      return item.inspection === "failed"
        ? { label: "Inspected · not OK", tone: "error", note: "Written off", compactNote: money(item.paid) }
        : {
            label: "Inspected · OK",
            tone: "success",
            note: `Restocked +${item.quantity}${item.payment.cod ? ` · COD → ${item.payment.short}` : ""}`,
            compactNote: money(item.paid),
          };
    case "closed":
      return item.outcome === "rejected"
        ? { label: "Rejected", tone: "error", note: item.closedOn, compactNote: item.closedOn }
        : item.outcome === "exchanged"
          ? { label: "Exchanged", tone: "success", note: item.closedOn, compactNote: item.closedOn }
          : {
              label: "Refunded",
              tone: "neutral",
              note: `${money(item.refunded ?? item.paid)} · ${item.closedOn}`,
              compactNote: money(item.refunded ?? item.paid),
            };
  }
}

function nextOf(item: SampleReturn): AdminReturn["next"] {
  switch (item.stage) {
    case "requested":
      return { label: "Review", href: href(item.id), primary: true };
    case "awaiting":
      return { label: "Received", intent: "received" };
    case "received":
      return { label: "Inspect", href: href(item.id) };
    case "inspected":
      return item.wants === "Exchange"
        ? { label: "Close", intent: "exchange", primary: true }
        : { label: "Refund", intent: "refund", primary: true };
    case "closed":
      return { label: "View", href: href(item.id) };
  }
}

export type ReturnRow = Omit<AdminReturn, "item"> & { item: Omit<AdminReturn["item"], "image"> & { image: string } };

const toRow = (item: SampleReturn): ReturnRow => ({
  id: item.id,
  href: href(item.id),
  age: item.age,
  attention: item.stage === "requested",
  customer: { name: item.customer.name, tag: item.customer.tag, guest: item.customer.guest },
  order: { number: item.order, href: orderHref(item.order) },
  item: { name: item.itemName, quantity: item.quantity, image: item.image, tint: item.tint },
  reason: item.reason,
  photos: item.photos || undefined,
  wants: item.wants,
  value: money(item.paid),
  status: statusOf(item),
  next: nextOf(item),
});

export type ReturnView = "open" | "closed" | "all";

export function findReturns({
  view = "open",
  stage,
  reason,
  q,
}: {
  view?: ReturnView;
  stage?: string;
  reason?: string;
  q?: string;
}): ReturnRow[] {
  const term = q?.trim().toLowerCase();
  return store()
    .returns.filter((item) => (view === "all" ? true : view === "closed" ? item.stage === "closed" : item.stage !== "closed"))
    .filter((item) => !stage || item.stage === stage)
    .filter((item) => !reason || reasonKey(item) === reason)
    .filter((item) => !term || [item.id, item.order, item.customer.name].some((field) => field.toLowerCase().includes(term)))
    .map(toRow);
}

export function returnsSummary() {
  const all = store().returns;
  const count = (stage: ReturnStageKey) => all.filter((item) => item.stage === stage).length;
  const seedClosed = seed.filter((item) => item.stage === "closed");
  const closed = all.filter((item) => item.stage === "closed");
  const refundedNow = closed.reduce((sum, item) => sum + (item.outcome === "refunded" ? (item.refunded ?? 0) : 0), 0);
  const refundedSeed = seedClosed.reduce((sum, item) => sum + (item.outcome === "refunded" ? (item.refunded ?? 0) : 0), 0);
  const awaiting = all.filter((item) => item.stage === "awaiting");
  const inspected = all.filter((item) => item.stage === "inspected");
  const requested = all.filter((item) => item.stage === "requested");
  return {
    requested: count("requested"),
    awaiting: count("awaiting"),
    received: count("received"),
    inspected: count("inspected"),
    open: all.length - closed.length,
    closed: DESIGN.closed + closed.length - seedClosed.length,
    refunded: DESIGN.refunded + refundedNow - refundedSeed,
    dropoffs: awaiting.filter((item) => item.method === "dropoff").length,
    pickups: awaiting.filter((item) => item.method === "pickup").length,
    readyToRefund: inspected.reduce((sum, item) => sum + (item.wants === "Refund" ? item.paid : 0), 0),
    oldest: requested.at(-1)?.age.replace(" ago", ""),
  };
}

export function returnStages(): ReturnStage[] {
  const s = returnsSummary();
  return [
    {
      key: "requested",
      label: "Requested",
      count: s.requested,
      badge: s.requested ? "Needs decision" : undefined,
      note: s.oldest ? `Oldest ${s.oldest} · reply within 24h` : "Nothing waiting",
      href: "/admin/returns?stage=requested",
      tone: s.requested ? "attention" : undefined,
    },
    {
      key: "awaiting",
      label: "Awaiting item",
      compactLabel: "Awaiting",
      count: s.awaiting,
      note: `${s.dropoffs} drop-off · ${s.pickups} partner pickup`,
      href: "/admin/returns?stage=awaiting",
    },
    {
      key: "received",
      label: "To inspect",
      compactLabel: "Inspect",
      count: s.received,
      note: s.received ? "Received recently" : "Nothing to inspect",
      href: "/admin/returns?stage=received",
    },
    {
      key: "inspected",
      label: "To refund",
      compactLabel: "Refund",
      count: s.inspected,
      note: `${money(s.readyToRefund)} ready`,
      href: "/admin/returns?stage=inspected",
    },
    {
      key: "closed",
      label: "Closed · 30 days",
      count: s.closed,
      note: `${money(s.refunded)} refunded`,
      href: "/admin/returns?view=closed",
      tone: "closed",
    },
  ];
}

export function returnViews(): (SavedView & { view: ReturnView })[] {
  const s = returnsSummary();
  return [
    { view: "open", href: "/admin/returns", label: "Open", count: s.open },
    { view: "closed", href: "/admin/returns?view=closed", label: "Closed", count: s.closed },
    { view: "all", href: "/admin/returns?view=all", label: "All" },
  ];
}

/* Detail. */

const LABELS = ["Requested", "Approved", "Item back", "Inspected", "Refunded"];

function stepsOf(item: SampleReturn): { steps: ReturnStep[]; next?: string } {
  const at = (current: number): ReturnStep[] =>
    LABELS.map((label, index) => ({ label, state: index < current ? "done" : index === current ? "current" : "upcoming" }));
  switch (item.stage) {
    case "requested":
      return { steps: at(0), next: "approve or reject" };
    case "awaiting":
      return { steps: at(2), next: item.method === "pickup" ? "partner pickup" : "customer drops it off" };
    case "received":
      return { steps: at(3), next: "inspect it" };
    case "inspected":
      return { steps: at(4), next: item.wants === "Exchange" ? "send the replacement" : "refund" };
    case "closed":
      return item.outcome === "rejected"
        ? {
            steps: LABELS.map((label, index) => ({
              label: index === 1 ? "Rejected" : label,
              state: index === 0 ? "done" : index === 1 ? "current" : "upcoming",
            })),
          }
        : {
            steps: LABELS.map((label, index) => ({
              label: index === 4 && item.outcome === "exchanged" ? "Exchanged" : label,
              state: "done",
            })),
          };
  }
}

const METHODS = (item: SampleReturn): ReturnMethod[] => [
  {
    value: "dropoff",
    label: "Drop-off",
    mobileLabel: "Drop-off at Osu store",
    description: "Customer brings it to Main store, Osu",
    compactDescription: "At Main store, Osu",
  },
  {
    value: "pickup",
    label: "Partner pickup",
    mobileLabel: "Delivery partner pickup",
    description: "Book with the delivery partner, then add the date",
    compactDescription: "Book, then add date",
  },
  {
    value: "none",
    label: "No return needed",
    mobileLabel: "No return needed",
    description: item.photos ? "Photos are enough. Refund now, item is written off" : "Refund now, item is written off",
    compactDescription: "Write off, refund now",
    mobileDescription: `Logged as ${item.reason.label === "Damaged" ? "Damaged" : "written off"} · refund now`,
    note: `No stock comes back, so ${item.quantity} ${item.quantity === 1 ? "unit is" : "units are"} logged as ${item.reason.label === "Damaged" ? "Damaged" : "written off"} in inventory with this return as the reference.`,
    compactNote: `${item.quantity} ${item.quantity === 1 ? "unit" : "units"} will be logged in inventory, referencing ${item.id}.`,
  },
];

export interface ReturnDetail {
  id: string;
  stage: ReturnStageKey;
  status: { label: string; compactLabel?: string; tone: Tone };
  meta: string;
  compactMeta: string;
  mobileMeta: string;
  order: string;
  orderHref: string;
  progress: ReturnType<typeof stepsOf>;
  request: {
    item: { name: string; compactName: string; detail: string; compactDetail: string; image: string; tint?: SampleReturn["tint"] };
    reason: SampleReturn["reason"];
    quote: string;
    compactQuote?: string;
    photos: { image: string; href: string }[];
    wants: string;
  };
  decision?: { methods: ReturnMethod[]; defaultMethod: string; hint: string; defaultMessage: string };
  /** Absent for exchanges. */
  refund?: {
    lines: { label: string; amount: number }[];
    deliveryFee?: number;
    defaultIncludeFee?: boolean;
    locked?: boolean;
    method: string;
    shortMethod: string;
    compactMethod: string;
    brand?: PaymentBrand;
  };
  customer: { name: string; tone?: InitialsProps["tone"]; tag?: string; stats: string; profileHref: string; pastReturns: string };
  timeline: ReturnTimelineEvent[];
  primary?: { label: string; intent: string; icon?: "check" | "box" | "undo" };
  secondary?: { label: string; intent: string };
}

export function findReturnDetail(id: string): ReturnDetail | undefined {
  const item = store().returns.find((entry) => entry.id === id);
  if (!item) return undefined;
  const first = item.customer.name.split(" ")[0];
  const statusLabel =
    item.stage === "requested"
      ? { label: "Requested · needs decision", compactLabel: "Requested", tone: "warning" as Tone }
      : { label: statusOf(item).label, tone: statusOf(item).tone };
  const exchange = item.wants === "Exchange";
  const refundLabel = exchange ? "exchange" : `refund to ${item.payment.short}`;

  let primary: ReturnDetail["primary"];
  let secondary: ReturnDetail["secondary"];
  if (item.stage === "requested") {
    primary = { label: exchange ? "Approve exchange" : "Approve & refund {amount}", intent: "approve", icon: "check" };
    secondary = { label: "Reject", intent: "reject" };
  } else if (item.stage === "awaiting") {
    primary = { label: "Mark as received", intent: "received", icon: "box" };
  } else if (item.stage === "received") {
    primary = { label: `Inspection OK · restock ${item.quantity}`, intent: "inspect-ok", icon: "check" };
    secondary = { label: "Not OK · write off", intent: "inspect-failed" };
  } else if (item.stage === "inspected") {
    primary = exchange
      ? { label: "Mark exchange sent", intent: "exchange", icon: "check" }
      : { label: "Refund {amount}", intent: "refund", icon: "undo" };
  }

  return {
    id: item.id,
    stage: item.stage,
    status: statusLabel,
    meta: `${item.customer.name} · order ${item.order} · requested ${item.requested} · day ${item.day} of 7 in the return window`,
    compactMeta: `${item.customer.name}${item.customer.tag ? ` ${item.customer.tag}` : ""} · ${item.order} · ${item.requested} · day ${item.day} of 7`,
    mobileMeta: `${item.customer.name} · ${item.order} · day ${item.day} of 7`,
    order: item.order,
    orderHref: orderHref(item.order),
    progress: stepsOf(item),
    request: {
      item: {
        name: item.itemFull,
        compactName: `${item.itemName} × ${item.quantity}`,
        detail: `${item.quantity} of ${item.bought} bought · paid ${money(item.paid)}${item.discount ? ` ${item.discount}` : ""}`,
        compactDetail: `Paid ${money(item.paid)} · wants ${refundLabel}`,
        image: item.image,
        tint: item.tint,
      },
      reason: item.reason,
      quote: item.quote,
      compactQuote: item.compactQuote,
      photos: Array.from({ length: item.photos }, (_, index) => ({
        image: item.image,
        href: `/placeholders/${item.image}.png#photo-${index + 1}`,
      })),
      wants: exchange ? "Exchange for another variant" : `Refund to ${item.payment.short} (original method)`,
    },
    decision:
      item.stage === "requested"
        ? {
            methods: METHODS(item),
            defaultMethod: item.photos && item.reason.tone === "error" ? "none" : "dropoff",
            hint: "Customer is told by SMS",
            defaultMessage:
              item.photos && item.reason.tone === "error"
                ? `Sorry about that, ${first}. No need to send it back, your ${exchange ? "replacement" : "refund"} is on its way.`
                : "",
          }
        : undefined,
    refund: exchange
      ? undefined
      : {
          lines: [{ label: `${item.itemName} × ${item.quantity}`, amount: item.paid }],
          deliveryFee: item.deliveryFee,
          locked: item.stage === "closed",
          defaultIncludeFee: item.stage === "closed" && (item.refunded ?? 0) > item.paid,
          method: item.payment.method,
          shortMethod: item.payment.short,
          compactMethod: item.payment.compact,
          brand: item.payment.brand,
        },
    customer: {
      name: item.customer.name,
      tone: item.customer.tone,
      tag: item.customer.tag,
      stats: item.customer.stats,
      profileHref: `/admin/customers/${item.customer.slug}`,
      pastReturns: item.customer.pastReturns,
    },
    timeline: item.timeline.map((event, index) => ({ ...event, current: index === 0 && item.stage !== "closed" })),
    primary,
    secondary,
  };
}

/* Changes: what each step does. */

function note(item: SampleReturn, title: string) {
  const state = store();
  state.seq += 1;
  item.timeline.unshift({ id: `log-${state.seq}`, title, detail: `Today ${clock()} · ${STAFF}` });
}

function close(item: SampleReturn, outcome: NonNullable<SampleReturn["outcome"]>, refunded?: number) {
  item.stage = "closed";
  item.outcome = outcome;
  item.refunded = refunded;
  item.closedOn = "Today";
  item.age = "just now";
}

/** One step on a return: approve (with a method), reject, received, inspect-ok / inspect-failed, refund, exchange. */
export function advanceReturn({
  id,
  intent,
  method,
  includeFee,
  message,
}: {
  id: string;
  intent: string;
  method?: string;
  includeFee?: boolean;
  message?: string;
}) {
  const item = store().returns.find((entry) => entry.id === id);
  if (!item) return;
  const refundTotal = item.paid + (includeFee ? item.deliveryFee : 0);
  const told = message ? " · message sent" : "";

  if (item.stage === "requested" && intent === "approve") {
    if (method === "none") {
      recordReturnStock({
        variantId: item.variantId,
        quantity: item.quantity,
        kind: "writeoff",
        returnId: item.id,
        note: `${item.reason.label} · not returned`,
        by: STAFF,
      });
      if (item.wants === "Exchange") {
        note(item, `Approved · no return needed, replacement sent${told}`);
        close(item, "exchanged");
      } else {
        note(item, `Refunded ${money(refundTotal)} to ${item.payment.short} · no return needed${told}`);
        close(item, "refunded", refundTotal);
      }
      return;
    }
    item.method = method === "pickup" ? "pickup" : "dropoff";
    item.stage = "awaiting";
    if (item.method === "pickup") item.pickupDate = "to book";
    note(item, `Approved · ${item.method === "pickup" ? "partner pickup" : "drop-off at Osu store"}${told}`);
    return;
  }
  if (intent === "reject" && (item.stage === "requested" || item.stage === "received")) {
    note(item, `Rejected${told}`);
    close(item, "rejected");
    return;
  }
  if (item.stage === "awaiting" && intent === "received") {
    item.stage = "received";
    note(item, item.method === "pickup" ? "Item collected by delivery partner" : "Item received at Osu store");
    return;
  }
  if (item.stage === "received" && (intent === "inspect-ok" || intent === "inspect-failed")) {
    const ok = intent === "inspect-ok";
    item.stage = "inspected";
    item.inspection = ok ? "ok" : "failed";
    recordReturnStock({
      variantId: item.variantId,
      quantity: item.quantity,
      kind: ok ? "restock" : "writeoff",
      returnId: item.id,
      note: ok ? undefined : "Failed inspection",
      by: STAFF,
    });
    note(item, ok ? `Inspected · restocked +${item.quantity}` : "Inspected · not OK, written off");
    return;
  }
  if (item.stage === "inspected" && intent === "refund") {
    note(item, `Refunded ${money(refundTotal)} to ${item.payment.short}`);
    close(item, "refunded", refundTotal);
    return;
  }
  if (item.stage === "inspected" && intent === "exchange") {
    note(item, "Replacement sent");
    close(item, "exchanged");
  }
}
