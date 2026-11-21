import type { MoreMenuItem, ActivityEvent, DialogSwitch, FulfilmentStep, OrderItemsTotals } from "@repo/ui/organisms";
import type { ReasonOption } from "@repo/ui/molecules";
import type { PaymentBrand, StatusChipProps } from "@repo/ui/atoms";

import { sampleOrders } from "./admin-orders";

/*
 * /admin/orders/[number] sample data (Paper "Jofak - Admin" → Order detail, Cancel order, Refund).
 * JFK-251477 (flagged COD, processing) is written out as in the design; the other sample orders
 * are built from their list rows. Paper's refund example (JFK-251482) is "To pack" in the list
 * design, so the refund flow shows on the list's delivered MoMo order, JFK-251463.
 */

type Tint = "sage" | "amber" | "lavender" | "sun";

export interface DetailLine {
  id: string;
  /** Placeholder packshot (public/placeholders/<image>.png). */
  image: string;
  tint: Tint;
  name: string;
  detail: string;
  compactDetail: string;
  quantity: number;
  unitPrice: number;
  picked?: boolean;
}

export type PrimaryAction =
  { kind: "advance"; intent: string; label: string; icon: "packCheck" | "box" | "truck" | "check" } | { kind: "refund" } | null;

export interface OrderDetail {
  number: string;
  status: { label: string; tone: NonNullable<StatusChipProps["tone"]> };
  payment: { label: string; compactLabel: string };
  meta: string;
  placed: string;
  total: string;
  flag?: { title: string; compactTitle: string; body: string; compactBody: string };
  steps: FulfilmentStep[];
  pickable: boolean;
  lines: DetailLine[];
  totals: OrderItemsTotals;
  events: ActivityEvent[];
  customer: {
    name: string;
    slug: string;
    stats: string;
    compactStats: string;
    phone: { masked: string; full: string };
    email: { masked: string; full: string };
  };
  delivery: {
    method: string;
    compactMethod: string;
    street: string;
    area: string;
    compactArea: string;
    gps?: { code: string; mapsHref: string };
    landmark?: string;
    note?: string;
    tracking: boolean;
  };
  paymentCard: { tone: "due" | "paid" | "pending"; status: string; method: string; amount: string; note: string };
  primary: PrimaryAction;
  /** Shown as "Edit order · locked once processing starts" when editing isn't possible. */
  editLocked: boolean;
  cancel?: { summary: string; money: { title: string; body: string }; switches: DialogSwitch[] };
  refund?: {
    summary: string;
    compactSummary: string;
    paid: number;
    deliveryFee: number;
    method: { brand: PaymentBrand; name: string; detail: string };
  };
}

export const cancelReasons: ReasonOption[] = [
  { value: "customer", label: "Customer asked to cancel" },
  { value: "unreachable", label: "Couldn't reach customer" },
  { value: "stock", label: "Out of stock" },
  { value: "fraud", label: "Suspected fraud" },
  { value: "other", label: "Other" },
];

export const refundReasons: ReasonOption[] = [
  { value: "damaged", label: "Damaged on arrival" },
  { value: "wrong", label: "Wrong item" },
  { value: "missing", label: "Missing item" },
  { value: "mind", label: "Changed mind" },
  { value: "other", label: "Other" },
];

/** Refunds above this need an admin's approval (docs/04, refunds). */
export const refundApprovalThreshold = 300;

export const money = (amount: number) => `GHS ${amount.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const short = (amount: number) => `GHS ${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;

const STEPS = ["Confirmed", "Processing", "Packed", "Handed to courier", "Delivered"] as const;

/** The five fulfilment steps with `current` at `index` (or all done) and the given details. */
function steps(
  index: number,
  details: Partial<Record<(typeof STEPS)[number], { detail: string; compactDetail?: string }>>,
): FulfilmentStep[] {
  return STEPS.map((label, position) => ({
    label,
    state: position < index ? "done" : position === index ? "current" : "upcoming",
    detail: details[label]?.detail ?? (position === index + 1 ? "Next step" : undefined),
    compactDetail: details[label]?.compactDetail,
  }));
}

function totalsFor(
  lines: DetailLine[],
  delivery: { label: string; compactLabel: string; fee: number },
  total: string,
  compactTotalLabel: string,
  discount?: { code: string; amount: number },
): OrderItemsTotals {
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const grand = subtotal - (discount?.amount ?? 0) + delivery.fee;
  return {
    subtotalLabel: `Subtotal · ${count} ${count === 1 ? "item" : "items"}`,
    compactSubtotalLabel: "Subtotal",
    subtotal: money(subtotal),
    discount: discount && { code: discount.code, amount: money(discount.amount) },
    delivery: { label: delivery.label, compactLabel: delivery.compactLabel, amount: money(delivery.fee) },
    total,
    compactTotalLabel,
    // Ghana VAT, NHIL and GETFund are included in prices (15% + 2.5% + 2.5% of the pre-tax amount).
    tax: { label: "Includes VAT, NHIL and GETFund", amount: money(grand - grand / 1.22) },
  };
}

const moreItems = (order: OrderDetail): MoreMenuItem[] => [
  { label: "Customer profile", href: `/admin/customers/${order.customer.slug}`, icon: "user" },
  { label: "Print invoice", href: `/admin/orders/${order.number}/invoice`, icon: "receipt" },
  {
    label: `All orders from ${order.customer.name.split(" ")[0]}`,
    href: `/admin/orders?q=${encodeURIComponent(order.customer.name)}`,
    icon: "box",
  },
];

/* ---------- JFK-251477: flagged high-value COD, processing (the design's example) ---------- */

const amaLines: DetailLine[] = [
  {
    id: "ash",
    image: "ashwagandha",
    tint: "amber",
    name: "Ashwagandha Calm",
    detail: "60 capsules · SKU JF-ASH-60 · Shelf B2",
    compactDetail: "60 caps · Shelf B2 · ×1",
    quantity: 1,
    unitPrice: 145,
    picked: true,
  },
  {
    id: "mag",
    image: "magnesium",
    tint: "sage",
    name: "Magnesium Sleep",
    detail: "Gummies · SKU JF-MAG-30 · Shelf A4",
    compactDetail: "Gummies · Shelf A4 · ×1",
    quantity: 1,
    unitPrice: 160,
    picked: true,
  },
  {
    id: "pro",
    image: "probiotic",
    tint: "lavender",
    name: "Daily Probiotic",
    detail: "30 capsules · SKU JF-PRO-30 · Shelf B1",
    compactDetail: "30 caps · Shelf B1 · ×1",
    quantity: 1,
    unitPrice: 180,
  },
  {
    id: "grn",
    image: "greens",
    tint: "sage",
    name: "Greens Daily",
    detail: "Powder, 30 servings · SKU JF-GRN-30 · Shelf C3",
    compactDetail: "Powder · Shelf C3 · ×1",
    quantity: 1,
    unitPrice: 96,
  },
];

const ama: OrderDetail = {
  number: "JFK-251477",
  status: { label: "Processing", tone: "warning" },
  payment: { label: "Cash on delivery · to collect", compactLabel: "COD · to collect" },
  meta: "Placed today at 07:58 on the website · 4 items · Same-day delivery",
  placed: "Today, 07:58",
  total: "GHS 596.00",
  flag: {
    title: "Flagged for review: high-value cash on delivery",
    compactTitle: "Flagged: high-value COD",
    body: "Two failed deliveries to this phone in the last 60 days, and the order is over the GHS 500 COD limit. Call the customer to confirm before handing it over.",
    compactBody: "2 failed deliveries to this phone and over the GHS 500 limit. Call before handing over.",
  },
  steps: steps(1, {
    Confirmed: { detail: "COD verified by SMS · 07:58", compactDetail: "07:58" },
    Processing: { detail: "Started by Abena · 08:05", compactDetail: "Abena · 08:05" },
    "Handed to courier": { detail: "Add tracking no." },
    Delivered: { detail: "Due by 18:00" },
  }),
  pickable: true,
  lines: amaLines,
  totals: totalsFor(
    amaLines,
    { label: "Same-day delivery · Madina", compactLabel: "Same-day delivery", fee: 35 },
    "GHS 596.00",
    "Total · COD to collect",
    { code: "WELCOME20", amount: 20 },
  ),
  events: [
    {
      id: "note",
      title: "Abena Mensah",
      detail: "added a note",
      author: "Abena Mensah",
      time: "08:12",
      note: "Called Ama. She'll be home after 2pm and has the cash ready. Hand to courier after lunch.",
      compactNote: "Called Ama. She'll be home after 2pm and has the cash ready.",
    },
    { id: "processing", title: "Processing started", detail: "by Abena Mensah", compactDetail: "by Abena", time: "08:05", tone: "warning" },
    { id: "flagged", title: "Flagged automatically", detail: "· COD over GHS 500, 2 failed deliveries", time: "07:58", tone: "error" },
    { id: "sms", title: "SMS sent", detail: "· order confirmation to 024 ••• 5530", time: "07:58", tone: "muted" },
    { id: "placed", title: "Order placed", detail: "· cash on delivery confirmed with SMS code", time: "07:58", tone: "brand" },
  ],
  customer: {
    name: "Ama Boateng",
    slug: "ama-boateng",
    stats: "4 orders · GHS 1,820 spent · since Mar 2026",
    compactStats: "4 orders",
    phone: { masked: "024 ••• 5530", full: "024 418 5530" },
    email: { masked: "a•••••@gmail.com", full: "ama.boateng@gmail.com" },
  },
  delivery: {
    method: "Same day",
    compactMethod: "Same day · by 18:00",
    street: "House 14, Firestone Road",
    area: "Madina, Accra · Greater Accra",
    compactArea: "Madina, Accra · Behind the Total station",
    gps: { code: "GM-071-4472", mapsHref: "https://www.google.com/maps/search/?api=1&query=GM-071-4472" },
    landmark: "Behind the Total station, Zongo junction",
    note: "Please call when you reach the gate.",
    tracking: true,
  },
  paymentCard: {
    tone: "due",
    status: "Not collected",
    method: "Cash on delivery · to collect",
    amount: "GHS 596.00",
    note: "Customer confirmed with an SMS code at checkout. The courier collects cash or MoMo on delivery.",
  },
  primary: { kind: "advance", intent: "pack", label: "Mark packed", icon: "packCheck" },
  editLocked: true,
  cancel: {
    summary: "Ama Boateng · GHS 596.00 · Cash on delivery",
    money: { title: "Nothing to refund", body: "This is a cash-on-delivery order and no money has been collected yet." },
    switches: [
      {
        name: "restock",
        label: "Return 4 items to stock",
        detail: "Ashwagandha Calm, Magnesium Sleep, Daily Probiotic, Greens Daily",
        defaultChecked: true,
      },
      {
        name: "notify",
        label: "Text the customer",
        detail: "“Your Jofak order JFK-251477 has been cancelled as you asked.”",
        defaultChecked: true,
      },
    ],
  },
};

/* ---------- The other sample orders, built from their list rows ---------- */

const POOL = [
  {
    image: "magnesium",
    tint: "sage",
    name: "Magnesium Sleep",
    detail: "Gummies · SKU JF-MAG-30 · Shelf A4",
    compactDetail: "Gummies · Shelf A4",
  },
  {
    image: "probiotic",
    tint: "lavender",
    name: "Daily Probiotic",
    detail: "30 capsules · SKU JF-PRO-30 · Shelf B1",
    compactDetail: "30 caps · Shelf B1",
  },
  {
    image: "greens",
    tint: "sage",
    name: "Greens Daily",
    detail: "Powder, 30 servings · SKU JF-GRN-30 · Shelf C3",
    compactDetail: "Powder · Shelf C3",
  },
  {
    image: "energy",
    tint: "sun",
    name: "Energy B-Complex",
    detail: "Citrus · SKU JF-ENR-CIT · Shelf A2",
    compactDetail: "Citrus · Shelf A2",
  },
  {
    image: "ashwagandha",
    tint: "amber",
    name: "Ashwagandha Calm",
    detail: "60 capsules · SKU JF-ASH-60 · Shelf B2",
    compactDetail: "60 caps · Shelf B2",
  },
] as const;

const STREETS = ["Palm Avenue", "Lagos Avenue", "Kofi Annan Street", "Liberation Road", "Mango Tree Close", "Cocoa Lane", "Ridge Road"];

const FEES: Record<string, number> = { "Same day": 35, "Next day": 25, Courier: 30, Pickup: 0 };

/** Step index per list status. */
const PROGRESS: Record<string, number> = {
  "Pending payment": 0,
  "To pack": 1,
  Processing: 1,
  Packed: 2,
  "Ready for pickup": 3,
  "Out for delivery": 3,
  "Delivery failed": 3,
  Delivered: 5,
};

const NEXT: Record<string, PrimaryAction> = {
  "To pack": { kind: "advance", intent: "process", label: "Start processing", icon: "box" },
  Processing: { kind: "advance", intent: "pack", label: "Mark packed", icon: "packCheck" },
  Packed: { kind: "advance", intent: "handover", label: "Hand to courier", icon: "truck" },
  "Out for delivery": { kind: "advance", intent: "deliver", label: "Mark delivered", icon: "check" },
  "Ready for pickup": { kind: "advance", intent: "deliver", label: "Mark collected", icon: "check" },
};

function fromListRow(row: (typeof sampleOrders)[number]): OrderDetail {
  const fee = FEES[row.delivery.method] ?? 0;
  const subtotal = row.amount - fee;
  // Spread the subtotal over the item count so the lines add up to the list total.
  const each = Math.floor((subtotal / row.items) * 100) / 100;
  const lines: DetailLine[] = Array.from({ length: row.items }, (_, index) => {
    const product = POOL[(Number(row.number.slice(-2)) + index) % POOL.length]!;
    const unitPrice = index === row.items - 1 ? Math.round((subtotal - each * (row.items - 1)) * 100) / 100 : each;
    return { id: `${index}`, ...product, compactDetail: `${product.compactDetail} · ×1`, quantity: 1, unitPrice };
  });
  const first = row.customer.split(" ")[0]!;
  const paid = row.payment.tone === "paid";
  const cod = row.payment.method === "Cash on delivery";
  const status = row.status.label;
  const progress = PROGRESS[status] ?? 0;
  const brand: PaymentBrand | undefined = row.payment.method.includes("MTN")
    ? "mtn"
    : row.payment.method.includes("Telecel")
      ? "telecel"
      : row.payment.method.includes("AirtelTigo")
        ? "airteltigo"
        : undefined;
  const canCancel = progress <= 2 && status !== "Delivered";
  const itemNames = lines.map((line) => line.name).join(", ");

  return {
    number: row.number,
    status: row.status,
    payment: {
      label: `${row.payment.status} · ${row.payment.method}`,
      compactLabel: `${row.payment.status} · ${row.payment.compactMethod ?? row.payment.method}`,
    },
    meta: `Placed ${row.placed.toLowerCase().startsWith("today") || row.placed.startsWith("Yesterday") ? row.placed.toLowerCase().replace(",", " at") : `${row.placed}`} on the website · ${row.items} ${row.items === 1 ? "item" : "items"} · ${row.delivery.method}`,
    placed: row.placed,
    total: row.total,
    steps: steps(progress, {
      Confirmed: { detail: paid ? `Paid · ${row.placed}` : cod ? "COD verified by SMS" : "Awaiting payment" },
      ...(status === "Delivery failed" ? { "Handed to courier": { detail: row.status.note ?? "Delivery failed" } } : {}),
      ...(row.status.note && status !== "Delivery failed" ? { [STEPS[Math.min(progress, 4)]!]: { detail: row.status.note } } : {}),
    }),
    pickable: status === "To pack" || status === "Processing",
    lines,
    totals: totalsFor(
      lines,
      { label: `${row.delivery.method} · ${row.delivery.compactArea ?? row.delivery.area}`, compactLabel: row.delivery.method, fee },
      row.total,
      cod ? "Total · COD to collect" : paid ? "Total · paid" : "Total",
    ),
    events: [
      ...(row.status.note
        ? [{ id: "status", title: status, detail: `· ${row.status.note}`, time: row.placed.split(", ").pop()!, tone: "warning" as const }]
        : []),
      {
        id: "placed",
        title: "Order placed",
        detail: cod ? "· cash on delivery confirmed with SMS code" : "on the website",
        time: row.placed.split(", ").pop()!,
        tone: "brand",
      },
    ],
    customer: {
      name: row.customer,
      slug: row.customer.toLowerCase().replace(/\s+/g, "-"),
      stats: "2 orders · since 2026",
      compactStats: "2 orders",
      phone: { masked: row.phone, full: row.phone.replace("•••", "555") },
      email: { masked: `${first[0]!.toLowerCase()}•••••@gmail.com`, full: `${first.toLowerCase()}@gmail.com` },
    },
    delivery: {
      method: row.delivery.method,
      compactMethod: row.delivery.method,
      street:
        row.delivery.method === "Pickup"
          ? "Osu store, Oxford Street"
          : `House ${(Number(row.number.slice(-3)) % 40) + 3}, ${STREETS[Number(row.number.slice(-1)) % STREETS.length]}`,
      area: row.delivery.area,
      compactArea: row.delivery.area,
      tracking: row.delivery.method !== "Pickup" && progress >= 1 && progress <= 3,
    },
    paymentCard: paid
      ? { tone: "paid", status: "Paid", method: row.payment.method, amount: row.total, note: "Paid via Paystack." }
      : cod
        ? {
            tone: "due",
            status: "Not collected",
            method: "Cash on delivery · to collect",
            amount: row.total,
            note: "The courier collects cash or MoMo on delivery.",
          }
        : {
            tone: "pending",
            status: row.payment.status,
            method: row.payment.method,
            amount: row.total,
            note: "Waiting for the customer to approve the payment on their phone.",
          },
    primary: status === "Delivered" && paid ? { kind: "refund" } : (NEXT[status] ?? null),
    editLocked: progress >= 1,
    cancel: canCancel
      ? {
          summary: `${row.customer} · ${row.total} · ${row.payment.method}`,
          money: paid
            ? {
                title: `${row.total} goes back to ${row.payment.method}`,
                body: "Refunded to the original payment method via Paystack, usually within minutes.",
              }
            : {
                title: "Nothing to refund",
                body: cod
                  ? "This is a cash-on-delivery order and no money has been collected yet."
                  : "The payment was never approved, so no money was taken.",
              },
          switches: [
            {
              name: "restock",
              label: `Return ${row.items} ${row.items === 1 ? "item" : "items"} to stock`,
              detail: itemNames,
              defaultChecked: true,
            },
            {
              name: "notify",
              label: "Text the customer",
              detail: `“Your Jofak order ${row.number} has been cancelled.”`,
              defaultChecked: true,
            },
          ],
        }
      : undefined,
    refund:
      paid && brand
        ? {
            summary: `${row.customer} · Paid ${row.total} with ${row.payment.method} · ${status}`,
            compactSummary: `${row.customer} · ${row.total} · ${row.payment.method}`,
            paid: row.amount,
            deliveryFee: fee,
            method: { brand, name: row.payment.method, detail: `${row.phone} · via Paystack` },
          }
        : undefined,
  };
}

const written: Record<string, OrderDetail> = { [ama.number]: ama };

/** The order with this number, or undefined. */
export function findOrderDetail(number: string): (OrderDetail & { more: MoreMenuItem[] }) | undefined {
  const row = sampleOrders.find((order) => order.number === number);
  const detail = written[number] ?? (row ? fromListRow(row) : undefined);
  return detail && { ...detail, more: moreItems(detail) };
}

export const lineAmount = (line: DetailLine) => ({
  quantityLabel: `${line.quantity} × ${money(line.unitPrice)}`,
  lineTotal: money(line.unitPrice * line.quantity),
  compactLineTotal: short(line.unitPrice * line.quantity),
});
