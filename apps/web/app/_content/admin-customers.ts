import type {
  AccountAction,
  AdminCustomer,
  BoughtProduct,
  ConsentChannel,
  CustomerActivityEvent,
  CustomerAddress,
  CustomerOrder,
  CustomerStat,
  CustomerTag,
  MoreMenuItem,
  SavedView,
} from "@repo/ui/organisms";

import { findOrders } from "./admin-orders";

/*
 * Customer sample data for /admin/customers and /admin/customers/[slug] (Paper "Jofak - Admin" →
 * Customers, Customer detail). Static until the customers API exists. Efua Boateng's profile is
 * written out; the others are built from their list row.
 */

export const customersSummary = {
  total: "1,284",
  orderedRecently: 312,
  repeatShare: "38%",
  averageValue: "612",
  range: "1–8",
  pages: 161,
};

export const customerStats: CustomerStat[] = [
  { label: "Total customers", value: customersSummary.total, note: "+86 this month", compactNote: "+86" },
  { label: "Repeat customers", value: customersSummary.repeatShare, note: "+3 pts" },
  { label: "Avg. lifetime value", value: customersSummary.averageValue, currency: "GHS" },
  { label: "No order in 90+ days", value: "211", tone: "warning" },
];

export type CustomerSegment = "repeat" | "vip" | "new" | "inactive";

const segmentHref = (segment?: CustomerSegment) => (segment ? `/admin/customers?segment=${segment}` : "/admin/customers");

export const customerViews: (SavedView & { segment?: CustomerSegment })[] = [
  { href: segmentHref(), label: "All", count: "1,284" },
  { segment: "repeat", href: segmentHref("repeat"), label: "Repeat", count: 488 },
  { segment: "vip", href: segmentHref("vip"), label: "VIP", count: 42 },
  { segment: "new", href: segmentHref("new"), label: "New", count: 86 },
  { segment: "inactive", href: segmentHref("inactive"), label: "Inactive", count: 211, warning: true },
];

interface SampleCustomer extends Omit<AdminCustomer, "href"> {
  slug: string;
  email: string;
  segments: CustomerSegment[];
  since: string;
}

const VIP: CustomerTag = { label: "VIP", tone: "accent" };
const REPEAT: CustomerTag = { label: "Repeat", tone: "success" };
const NEW: CustomerTag = { label: "New", tone: "info" };
const INACTIVE: CustomerTag = { label: "Inactive", tone: "warning" };

const sampleCustomers: SampleCustomer[] = [
  {
    id: "c-1",
    slug: "akosua-frimpong",
    name: "Akosua Frimpong",
    phone: "020 ••• 1187",
    email: "ak•••@yahoo.com",
    location: "Spintex, Accra",
    tone: "lavender",
    tags: [VIP, { label: "Wholesale", tone: "neutral" }],
    orders: 22,
    spent: "GHS 6,120",
    lastOrder: "10 Nov",
    marketing: ["SMS", "WA"],
    segments: ["repeat", "vip"],
    since: "Jun 2024",
  },
  {
    id: "c-2",
    slug: "efua-boateng",
    name: "Efua Boateng",
    phone: "024 ••• 4521",
    email: "ef•••@gmail.com",
    location: "Osu, Accra",
    tone: "sage",
    tags: [VIP],
    orders: 14,
    spent: "GHS 3,940",
    lastOrder: "Today, 09:40",
    compactLastOrder: "Today",
    marketing: ["SMS", "WA"],
    segments: ["repeat", "vip"],
    since: "Mar 2025",
  },
  {
    id: "c-3",
    slug: "kwame-mensah",
    name: "Kwame Mensah",
    phone: "055 ••• 0932",
    email: "kw•••@gmail.com",
    location: "East Legon, Accra",
    compactLocation: "East Legon",
    tone: "amber",
    tags: [REPEAT],
    orders: 6,
    spent: "GHS 1,280",
    lastOrder: "Today, 08:15",
    compactLastOrder: "Today",
    marketing: ["SMS"],
    segments: ["repeat"],
    since: "Jan 2025",
  },
  {
    id: "c-4",
    slug: "yaw-darko",
    name: "Yaw Darko",
    phone: "027 ••• 6610",
    email: "ya•••@gmail.com",
    location: "Asokwa, Kumasi",
    compactLocation: "Kumasi",
    tone: "info",
    tags: [REPEAT],
    orders: 4,
    spent: "GHS 860",
    lastOrder: "12 Nov",
    marketing: [],
    segments: ["repeat"],
    since: "Apr 2025",
  },
  {
    id: "c-5",
    slug: "ama-owusu",
    name: "Ama Owusu",
    phone: "024 ••• 7703",
    email: "am•••@gmail.com",
    location: "Comm. 25, Tema",
    compactLocation: "Tema",
    tone: "citrus",
    tags: [NEW],
    orders: 1,
    spent: "GHS 210",
    lastOrder: "Yesterday",
    marketing: ["WA"],
    segments: ["new"],
    since: "Nov 2025",
  },
  {
    id: "c-6",
    slug: "nana-adjei",
    name: "Nana Adjei",
    phone: "050 ••• 2268",
    email: "na•••@gmail.com",
    location: "Madina, Accra",
    compactLocation: "Madina",
    guest: true,
    tags: [],
    orders: 2,
    spent: "GHS 345",
    lastOrder: "3 Nov",
    marketing: [],
    segments: [],
    since: "Sep 2025",
  },
  {
    id: "c-7",
    slug: "kofi-asante",
    name: "Kofi Asante",
    phone: "054 ••• 3390",
    email: "ko•••@outlook.com",
    location: "Takoradi",
    tone: "sage",
    tags: [],
    orders: 2,
    spent: "GHS 340",
    lastOrder: "28 Oct",
    marketing: ["SMS"],
    segments: [],
    since: "Aug 2025",
  },
  {
    id: "c-8",
    slug: "abena-owusu-ansah",
    name: "Abena Owusu-Ansah",
    phone: "026 ••• 5104",
    email: "ab•••@gmail.com",
    location: "Cape Coast",
    tone: "neutral",
    tags: [INACTIVE],
    orders: 3,
    spent: "GHS 520",
    lastOrder: "2 Aug",
    inactiveDays: 105,
    marketing: ["SMS", "WA"],
    segments: ["inactive"],
    since: "Feb 2025",
  },
];

const toRow = ({ slug, email: _email, segments: _segments, since: _since, ...customer }: SampleCustomer): AdminCustomer => ({
  ...customer,
  href: `/admin/customers/${slug}`,
});

export function findCustomers({ segment, q }: { segment?: CustomerSegment; q?: string }): AdminCustomer[] {
  const query = q?.trim().toLowerCase();
  return sampleCustomers
    .filter((customer) => !segment || customer.segments.includes(segment))
    .filter((customer) => {
      if (!query) return true;
      const digits = query.replace(/\D/g, "");
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        (digits.length > 0 && customer.phone.replace(/\D/g, "").includes(digits))
      );
    })
    .map(toRow);
}

export interface CustomerDetail {
  slug: string;
  name: string;
  tone: AdminCustomer["tone"];
  tag?: CustomerTag;
  meta: string;
  compactMeta: string;
  mobileMeta: string;
  stats: CustomerStat[];
  orders: CustomerOrder[];
  orderCount: number;
  buysMost: (Omit<BoughtProduct, "image"> & { image?: string })[];
  events: (Omit<CustomerActivityEvent, "body" | "compactBody"> & { body: string; compactBody?: string })[];
  phone: { masked: string; full: string };
  email: { masked: string; full: string };
  address: CustomerAddress;
  consent: ConsentChannel[];
  consentNote: string;
  tags: CustomerTag[];
  account: AccountAction[];
  more: MoreMenuItem[];
}

const account = (slug: string): AccountAction[] => [
  { label: "Export customer data", compactLabel: "Export data", href: `/admin/customers/${slug}/export` },
  { label: "Resend verification", href: `/admin/customers/${slug}/verify` },
  { label: "Disable account", href: `/admin/customers/${slug}/disable`, danger: true },
  { label: "Delete data on request", compactLabel: "Delete data", href: `/admin/customers/${slug}/delete`, danger: true },
];

const more = (slug: string): MoreMenuItem[] => [
  { label: "View all orders", href: `/admin/orders?q=${slug}`, icon: "box" },
  { label: "Export customer data", href: `/admin/customers/${slug}/export`, icon: "export" },
  { label: "Resend verification", href: `/admin/customers/${slug}/verify`, icon: "undo" },
  { label: "Disable account", href: `/admin/customers/${slug}/disable`, icon: "closeCircle", tone: "danger" },
  { label: "Delete data on request", href: `/admin/customers/${slug}/delete`, icon: "warning", tone: "danger" },
];

const consent = (channels: string[]): ConsentChannel[] => [
  { channel: "sms", label: "SMS offers", compactLabel: "SMS", badge: "SMS", on: channels.includes("SMS") },
  { channel: "whatsapp", label: "WhatsApp", on: channels.includes("WA") },
  { channel: "email", label: "Email", on: false },
];

const efua: CustomerDetail = {
  slug: "efua-boateng",
  name: "Efua Boateng",
  tone: "sage",
  tag: VIP,
  meta: "Customer since 4 Mar 2025 · Account active · Phone verified",
  compactMeta: "Since 4 Mar 2025 · Active · Phone verified",
  mobileMeta: "Since Mar 2025 · Active · Verified",
  stats: [
    { label: "Lifetime value", value: "3,940", currency: "GHS", note: "Top 5% of customers" },
    { label: "Orders", value: "14", note: "1 partly refunded", noteTone: "muted" },
    { label: "Average order", value: "281", currency: "GHS", note: "Orders every ~19 days", noteTone: "muted" },
    { label: "Last order", value: "Today", note: "JFK-251490 · 09:40" },
  ],
  orders: [
    {
      number: "JFK-251490",
      href: "/admin/orders/JFK-251490",
      items: "3 × Greens Daily",
      status: { label: "To pack", tone: "info" },
      date: "Today",
      total: "GHS 210",
    },
    {
      number: "JFK-251402",
      href: "/admin/orders/JFK-251402",
      items: "Magnesium Sleep, Greens Daily",
      status: { label: "Delivered", tone: "success" },
      date: "1 Nov",
      total: "GHS 345",
    },
    {
      number: "JFK-251301",
      href: "/admin/orders/JFK-251301",
      items: "2 × Greens Daily",
      status: { label: "Delivered", tone: "success" },
      date: "18 Oct",
      total: "GHS 280",
    },
    {
      number: "JFK-251188",
      href: "/admin/orders/JFK-251188",
      items: "Ashwagandha Calm, Probiotic",
      status: { label: "Part refund", tone: "error" },
      date: "2 Oct",
      total: "GHS 300",
    },
  ],
  orderCount: 14,
  buysMost: [
    { id: "greens", name: "Greens Daily", detail: "9 tubs · every ~4 wks", image: "greens" },
    { id: "magnesium", name: "Magnesium Sleep", detail: "5 jars", image: "magnesium", tint: "sage" },
    { id: "ashwagandha", name: "Ashwagandha", detail: "3 bottles", image: "ashwagandha", tint: "amber" },
  ],
  events: [
    {
      id: "e-1",
      kind: "note",
      author: "Abena M.",
      time: "6 Nov",
      body: "Prefers delivery after 4pm. Gate is the blue one opposite Koala, Osu.",
      compactBody: "Prefers delivery after 4pm. Blue gate opposite Koala, Osu.",
    },
    {
      id: "e-2",
      kind: "tag",
      time: "1 Nov",
      body: "Tagged {VIP} automatically after spending over GHS 3,000",
      compactBody: "Tagged {VIP} automatically",
    },
    {
      id: "e-3",
      kind: "refund",
      time: "5 Oct",
      body: "Refund of {GHS 70} on JFK-251188 to MoMo by Kofi A.",
      wideOnly: true,
    },
  ],
  phone: { masked: "024 ••• 4521", full: "024 555 4521" },
  email: { masked: "ef•••@gmail.com", full: "efua.boateng@gmail.com" },
  address: {
    lines: ["Blue gate opposite Koala, Oxford St", "Osu, Accra · Greater Accra"],
    compact: "Blue gate opposite Koala, Oxford St, Osu, Accra",
    ghanaPost: "GA-039-5521",
    mapsHref: "https://maps.google.com/?q=GA-039-5521",
    more: { label: "+1 more", compactLabel: "+1", href: "/admin/customers/efua-boateng/addresses" },
  },
  consent: consent(["SMS", "WA"]),
  consentNote: "Opted in at checkout, 4 Mar 2025. Only the customer can turn consent on.",
  tags: [VIP, { label: "Greens subscriber", tone: "neutral" }],
  account: account("efua-boateng"),
  more: more("efua-boateng"),
};

/** A plausible profile from a list row, for the customers whose profile isn't written out. */
function fromRow(customer: SampleCustomer): CustomerDetail {
  const amount = Number(customer.spent.replace(/\D/g, ""));
  const average = Math.round(amount / Math.max(customer.orders, 1)).toLocaleString("en-GH");
  const last = customer.compactLastOrder ?? customer.lastOrder;
  const status = customer.guest ? "Guest checkout" : "Account active";
  const area = customer.location.split(",")[0]!;
  return {
    slug: customer.slug,
    name: customer.name,
    tone: customer.tone ?? "sage",
    tag: customer.tags[0],
    meta: `Customer since ${customer.since} · ${status}${customer.guest ? "" : " · Phone verified"}`,
    compactMeta: `Since ${customer.since} · ${customer.guest ? "Guest" : "Active"}`,
    mobileMeta: `Since ${customer.since} · ${customer.guest ? "Guest" : "Active"}`,
    stats: [
      { label: "Lifetime value", value: customer.spent.replace("GHS ", ""), currency: "GHS" },
      { label: "Orders", value: String(customer.orders), noteTone: "muted" },
      { label: "Average order", value: average, currency: "GHS", noteTone: "muted" },
      {
        label: "Last order",
        value: last,
        note: customer.inactiveDays ? `${customer.inactiveDays} days ago` : undefined,
        noteTone: customer.inactiveDays ? "muted" : undefined,
      },
    ],
    orders: [
      {
        number: "JFK-251472",
        href: "/admin/orders/JFK-251472",
        items: "Greens Daily",
        status: { label: customer.inactiveDays ? "Delivered" : "To pack", tone: customer.inactiveDays ? "success" : "info" },
        date: last,
        total: `GHS ${average}`,
      },
    ],
    orderCount: customer.orders,
    buysMost: [
      { id: "greens", name: "Greens Daily", detail: `${customer.orders} ${customer.orders === 1 ? "tub" : "tubs"}`, image: "greens" },
    ],
    events: [],
    phone: { masked: customer.phone, full: customer.phone.replace("•••", "555") },
    email: { masked: customer.email, full: customer.email.replace("•••", "") },
    address: { lines: [customer.location], compact: customer.location, mapsHref: `https://maps.google.com/?q=${encodeURIComponent(area)}` },
    consent: consent(customer.marketing),
    consentNote: "Only the customer can turn consent on.",
    tags: customer.tags,
    account: account(customer.slug),
    more: more(customer.slug),
  };
}

const slugOf = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

/** A customer known only from the order list (order detail links to them): built from their orders. */
function fromOrders(slug: string): CustomerDetail | undefined {
  const orders = findOrders({}).filter((order) => slugOf(order.customer) === slug);
  const [latest] = orders;
  if (!latest) return undefined;
  const spent = orders.reduce((sum, order) => sum + order.amount, 0);
  const detail = fromRow({
    id: `o-${slug}`,
    slug,
    name: latest.customer,
    phone: latest.phone,
    email: `${slug.slice(0, 2)}•••@gmail.com`,
    location: latest.delivery.area,
    compactLocation: latest.delivery.compactArea,
    tone: "sage",
    tags: orders.length > 1 ? [REPEAT] : [NEW],
    orders: orders.length,
    spent: `GHS ${spent.toLocaleString("en-GH")}`,
    lastOrder: latest.placed,
    compactLastOrder: latest.placed.split(", ")[0],
    marketing: ["SMS"],
    segments: [],
    since: "2026",
  });
  return {
    ...detail,
    orders: orders.map((order) => ({
      number: order.number,
      href: `/admin/orders/${order.number}`,
      items: `${order.items} ${order.items === 1 ? "item" : "items"}`,
      status: { label: order.status.label, tone: order.status.tone },
      date: order.placed.split(", ")[0]!,
      total: order.total.replace(/\.00$/, ""),
    })),
  };
}

export function findCustomerDetail(slug: string): CustomerDetail | undefined {
  if (slug === efua.slug) return efua;
  const customer = sampleCustomers.find((item) => item.slug === slug);
  return customer ? fromRow(customer) : fromOrders(slug);
}
