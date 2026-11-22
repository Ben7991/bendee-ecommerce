import type { BulkAction, AdminOrder, SavedView, SortOption } from "@repo/ui/organisms";

/*
 * /admin/orders sample data (Paper "Jofak - Admin" → Orders). Static until the admin orders API
 * exists; the views and search filter these ten orders, the counts are the design's.
 */

export const ordersSummary = { total: "1,284", needAction: 25, page: 1, pageCount: 129, range: "1–10" };

export type OrderViewSlug = "to-pack" | "ready-for-pickup" | "out-for-delivery" | "cod-to-collect" | "flagged";

const viewHref = (slug?: OrderViewSlug) => (slug ? `/admin/orders?view=${slug}` : "/admin/orders");

export const orderViews: (SavedView & { slug?: OrderViewSlug })[] = [
  { href: viewHref(), label: "All", count: "1,284" },
  { slug: "to-pack", href: viewHref("to-pack"), label: "To pack", count: 9 },
  { slug: "ready-for-pickup", href: viewHref("ready-for-pickup"), label: "Ready for pickup", count: 5 },
  { slug: "out-for-delivery", href: viewHref("out-for-delivery"), label: "Out for delivery", count: 11 },
  { slug: "cod-to-collect", href: viewHref("cod-to-collect"), label: "COD to collect", count: 6 },
  { slug: "flagged", href: viewHref("flagged"), label: "Flagged", count: 2, alert: true },
];

export const sortOptions: SortOption[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "total", label: "Highest total" },
];

export const bulkActions: BulkAction[] = [
  { value: "print", label: "Print pick lists" },
  { value: "pack", label: "Mark packed" },
  { value: "process", label: "Start processing", primary: true },
];

type SampleOrder = Omit<AdminOrder, "id" | "href"> & { views: OrderViewSlug[] };

const sample: SampleOrder[] = [
  {
    number: "JFK-251482",
    placed: "Today, 08:42",
    customer: "Kwame Asante",
    phone: "024 ••• 4521",
    items: 3,
    amount: 412,
    total: "GHS 412.00",
    payment: { method: "MTN MoMo", compactMethod: "MoMo", status: "Paid", tone: "paid" },
    status: { label: "To pack", tone: "info" },
    delivery: { method: "Same day", area: "East Legon, Accra", compactArea: "East Legon" },
    views: ["to-pack"],
  },
  {
    number: "JFK-251481",
    placed: "Today, 08:31",
    customer: "Nana Yeboah",
    phone: "020 ••• 7710",
    items: 2,
    amount: 238,
    total: "GHS 238.00",
    payment: { method: "Card", status: "Paid", tone: "paid" },
    status: { label: "To pack", tone: "info" },
    delivery: { method: "Pickup", area: "Osu store" },
    views: ["to-pack"],
  },
  {
    number: "JFK-251480",
    placed: "Today, 08:20",
    customer: "Esi Addo",
    phone: "050 ••• 2268",
    items: 1,
    amount: 96,
    total: "GHS 96.00",
    payment: { method: "Telecel Cash", status: "Awaiting approval", tone: "pending" },
    status: { label: "Pending payment", tone: "neutral" },
    delivery: { method: "Next day", area: "Asokwa, Kumasi" },
    views: [],
  },
  {
    number: "JFK-251479",
    placed: "Today, 08:15",
    customer: "Efua Owusu",
    phone: "055 ••• 0193",
    items: 1,
    amount: 168,
    total: "GHS 168.00",
    payment: { method: "Cash on delivery", compactMethod: "COD", status: "To collect", tone: "due" },
    status: { label: "To pack", tone: "info" },
    delivery: { method: "Courier", area: "Adum, Kumasi", compactArea: "Adum" },
    views: ["to-pack", "cod-to-collect"],
  },
  {
    number: "JFK-251477",
    placed: "Today, 07:58",
    customer: "Ama Boateng",
    phone: "024 ••• 7781",
    flag: "2 failed deliveries",
    items: 4,
    amount: 596,
    total: "GHS 596.00",
    payment: { method: "Cash on delivery", compactMethod: "COD", status: "To collect", tone: "due" },
    status: { label: "Processing", tone: "warning" },
    delivery: { method: "Same day", area: "Madina, Accra", compactArea: "Madina" },
    views: ["cod-to-collect", "flagged"],
  },
  {
    number: "JFK-251475",
    placed: "Today, 07:40",
    customer: "Kofi Agyeman",
    phone: "024 ••• 8836",
    items: 2,
    amount: 310,
    total: "GHS 310.00",
    payment: { method: "MTN MoMo", compactMethod: "MoMo", status: "Paid", tone: "paid" },
    status: { label: "Packed", tone: "warning" },
    delivery: { method: "Same day", area: "Spintex, Accra", compactArea: "Spintex" },
    views: [],
  },
  {
    number: "JFK-251471",
    placed: "Yesterday, 18:05",
    customer: "Adwoa Sarpong",
    phone: "027 ••• 3054",
    items: 5,
    amount: 642.5,
    total: "GHS 642.50",
    payment: { method: "AirtelTigo Money", compactMethod: "AT Money", status: "Paid", tone: "paid" },
    status: { label: "Out for delivery", tone: "lavender", note: "Handed to courier" },
    delivery: { method: "Same day", area: "Comm. 25, Tema", compactArea: "Tema" },
    views: ["out-for-delivery"],
  },
  {
    number: "JFK-251468",
    placed: "Yesterday, 16:22",
    customer: "Yaw Darko",
    phone: "054 ••• 6627",
    items: 2,
    amount: 245,
    total: "GHS 245.00",
    payment: { method: "Card", status: "Paid", tone: "paid" },
    status: { label: "Ready for pickup", tone: "lavender", note: "Code sent by SMS" },
    delivery: { method: "Pickup", area: "Osu store" },
    views: ["ready-for-pickup"],
  },
  {
    number: "JFK-251463",
    placed: "Fri, 13 Nov",
    customer: "Akua Asante",
    phone: "024 ••• 1189",
    items: 1,
    amount: 129,
    total: "GHS 129.00",
    payment: { method: "MTN MoMo", compactMethod: "MoMo", status: "Paid", tone: "paid" },
    status: { label: "Delivered", tone: "success" },
    delivery: { method: "Next day", area: "Cape Coast" },
    views: [],
  },
  {
    number: "JFK-251460",
    placed: "Fri, 13 Nov",
    customer: "Kojo Ampofo",
    phone: "059 ••• 4402",
    flag: undefined,
    items: 3,
    amount: 384,
    total: "GHS 384.00",
    payment: { method: "Cash on delivery", compactMethod: "COD", status: "Not collected", tone: "pending" },
    status: { label: "Delivery failed", tone: "error", note: "Retry Mon, 16 Nov" },
    delivery: { method: "Same day", area: "Kasoa" },
    views: ["flagged"],
  },
];

export const sampleOrders: (AdminOrder & { views: OrderViewSlug[] })[] = sample.map((order) => ({
  ...order,
  id: order.number,
  href: `/admin/orders/${order.number}`,
}));

/** The ten sample orders narrowed by the saved view and the search text. */
export function findOrders({ view, q }: { view?: string; q?: string }) {
  const query = q?.trim().toLowerCase();
  return sampleOrders.filter(
    (order) =>
      (!view || order.views.includes(view as OrderViewSlug)) &&
      (!query || [order.number, order.customer, order.phone].some((field) => field.toLowerCase().includes(query))),
  );
}
