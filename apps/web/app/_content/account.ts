import type { ProductThumbProps, StatusBadgeProps } from "@repo/ui/atoms";

/*
 * Sample account data for the static account pages (Paper "Jofak" → Account). There is no
 * account API yet (docs/03-customer-account.md); nothing here is saved and buttons don't change
 * anything. Delivery is by an outside courier, so tracking links point at their page.
 */

type Tint = ProductThumbProps["tint"];
type Status = Pick<StatusBadgeProps, "label" | "tone">;

export const customer = {
  name: "Ama Mensah",
  firstName: "Ama",
  phone: "+233 24 412 7781",
  email: "ama.mensah@gmail.com",
  memberSince: "Member since March 2025 · Accra",
};

export type AccountSection = "overview" | "orders" | "subscriptions" | "favourites" | "addresses" | "profile" | "privacy";

/** The account navigation, in Paper's order. */
export const accountSections: { slug: AccountSection; label: string; href: string; badge?: string; hint?: string }[] = [
  { slug: "overview", label: "Overview", href: "/account" },
  { slug: "orders", label: "Orders", href: "/account/orders", badge: "1 active" },
  { slug: "subscriptions", label: "Subscriptions", href: "/account/subscriptions" },
  { slug: "favourites", label: "Favourites", href: "/wishlist" },
  { slug: "addresses", label: "Addresses", href: "/account/addresses", hint: "3 saved" },
  { slug: "profile", label: "Profile & preferences", href: "/account/profile" },
  { slug: "privacy", label: "Privacy & data", href: "/account/privacy" },
];

// TODO: the WhatsApp business chat (https://wa.me/<number>) once the number is known.
export const whatsappHref = "https://wa.me/233200000000";

export interface OrderLine {
  id: string;
  /** Packshot file in public/placeholders (dev only). */
  image: string;
  tint: Tint;
  name: string;
  detail: string;
  price: string;
  quantity: number;
}

export type OrderFilter = "all" | "in-progress" | "delivered" | "cancelled";

export interface Order {
  number: string;
  placed: string;
  placedShort: string;
  itemCount: string;
  status: Status;
  filter: Exclude<OrderFilter, "all">;
  total: string;
  totalShort: string;
  lines: OrderLine[];
  /** The main product, for the mobile list. */
  headline: string;
  refunded?: boolean;
}

const line = (id: string, image: string, tint: Tint, name: string, detail: string, price: string, quantity = 1): OrderLine => ({
  id,
  image,
  tint,
  name,
  detail,
  price,
  quantity,
});

export const activeOrder = {
  number: "JFK-250184",
  placed: "Placed 13 Nov 2026 · 4 items",
  placedTablet: "13 Nov 2026 · 4 items",
  compactMeta: "13 Nov · 4 items · GHS 1,254.60",
  status: { label: "Packing", tone: "info" } satisfies Status,
  total: "GHS 1,254.60",
  arrivingDay: "tomorrow, Sat 14 Nov",
  area: "East Legon",
  /** Placed, packing, on the way, delivered. */
  stage: 1,
  lines: [
    line("greens", "greens.png", "sage", "Daily Greens Powder", "Lemon lime · 25 servings", "GHS 450"),
    line("ashwagandha", "ashwagandha.png", "amber", "Ashwagandha Tablets", "Subscribe & save · every 30 days", "GHS 304"),
    line("energy", "energy.png", "lavender", "Energy Capsules", "30 capsules · GHS 320 each", "GHS 640", 2),
  ],
};

export const pastOrders: Order[] = [
  {
    number: "JFK-249702",
    placed: "28 Oct 2026",
    placedShort: "28 Oct",
    itemCount: "2 items",
    status: { label: "Delivered", tone: "success" },
    filter: "delivered",
    total: "GHS 930.00",
    totalShort: "GHS 930",
    headline: "Greens + Probiotic",
    lines: [line("greens", "greens.png", "sage", "Daily Greens Powder", "", "GHS 450"), line("probiotic", "probiotic.png", "sun", "Probiotic", "", "GHS 480")],
  },
  {
    number: "JFK-248911",
    placed: "2 Oct 2026",
    placedShort: "2 Oct",
    itemCount: "1 item",
    status: { label: "Delivered", tone: "success" },
    filter: "delivered",
    total: "GHS 650.00",
    totalShort: "GHS 650",
    headline: "NMNH 650mg",
    lines: [line("nmnh", "nmnh.png", "sun", "NMNH 650mg", "", "GHS 650")],
  },
  {
    number: "JFK-247530",
    placed: "14 Sep 2026",
    placedShort: "14 Sep",
    itemCount: "1 item",
    status: { label: "Refunded", tone: "neutral" },
    filter: "cancelled",
    total: "GHS 380.00",
    totalShort: "GHS 380",
    headline: "Ashwagandha Tablets",
    refunded: true,
    lines: [line("ashwagandha", "ashwagandha.png", "amber", "Ashwagandha Tablets", "", "GHS 380")],
  },
];

export const orderFilters: { value: OrderFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "in-progress", label: "In progress" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

/** JFK-250184 in detail (Paper: Order detail, Order tracking, Cancel order). */
export const orderDetail = {
  number: "JFK-250184",
  placed: "Placed Fri 13 Nov 2026, 10:42 · Paid with MTN MoMo •••• 7781",
  payment: "MTN MoMo •••• 7781",
  address: {
    line: "14 Lagos Avenue, East Legon, Accra",
    short: "14 Lagos Ave, East Legon",
    detail: "Opposite the Shell filling station, blue gate · Ama Mensah, +233 24 412 7781",
    shortDetail: "Opposite the Shell filling station, blue gate",
  },
  totals: [
    { label: "Subtotal", value: "GHS 1,394.00" },
    { label: "Discount (JOFAK10)", value: "− GHS 139.40", highlight: true },
    { label: "Delivery · Standard", value: "Free", highlight: true },
    { label: "VAT & levies (included)", value: "GHS 225.40" },
  ],
  total: "GHS 1,254.60",
  // TODO: the courier's tracking page for this parcel.
  trackingHref: "/orders/track?token=sample",
};

export const cancelReasons = [
  { value: "mistake", label: "Ordered by mistake" },
  { value: "change", label: "Want to change items or quantity" },
  { value: "slow", label: "Delivery is too slow" },
  { value: "cheaper", label: "Found it cheaper elsewhere" },
  { value: "other", label: "Something else" },
];

export const subscriptions = {
  active: {
    name: "Ashwagandha Tablets",
    image: "ashwagandha.png",
    meta: "120 tablets · Qty 1 · Every 30 days · since Jun 2026",
    price: "GHS 304",
    compareAt: "GHS 380",
    next: { date: "Tue 25 Nov", when: "in 11 days", detail: "MoMo prompt on 23 Nov · then 25 Dec" },
    settings: [
      { label: "Deliver to", value: "Home · East Legon", href: "/account/addresses" },
      { label: "Pay with", value: "MTN MoMo •••• 7781", href: "/account/subscriptions?change=payment" },
      { label: "Frequency", value: "Every 30 days", href: "/account/subscriptions?change=frequency" },
    ],
    upcoming: [
      { date: "Tue 25 Nov", detail: "MoMo prompt on 23 Nov", highlight: true },
      { date: "Thu 25 Dec", detail: "Scheduled" },
      { date: "Sat 24 Jan", detail: "Scheduled" },
    ],
  },
  paused: {
    name: "Daily Greens Powder",
    image: "greens.png",
    meta: "Lemon lime · Every 60 days · GHS 360 · resumes Thu 1 Jan",
    compactMeta: "Every 60 days · resumes Thu 1 Jan",
  },
  saved: { amount: "GHS 228", detail: "Across 6 deliveries since June", compactDetail: "6 deliveries since June" },
  howItWorks: [
    "We send a MoMo prompt 2 days before each delivery. Approve it to confirm.",
    "Skip or change anything up to 48 hours before.",
    "Free delivery on every subscription order.",
  ],
};

export const addresses = [
  {
    id: "home",
    label: "Home",
    icon: "home",
    isDefault: true,
    lines: ["Ama Mensah · +233 24 412 7781", "14 Lagos Avenue, East Legon", "Accra, Greater Accra"],
    note: "Opposite the Shell filling station, blue gate",
  },
  {
    id: "work",
    label: "Work",
    icon: "briefcase",
    isDefault: false,
    lines: ["Ama Mensah · +233 24 412 7781", "Airport City, Ridge Tower, 4th floor", "Accra, Greater Accra"],
    note: "Ask for reception · GA-145-2290",
  },
  {
    id: "mum",
    label: "Mum's place",
    icon: "heart",
    isDefault: false,
    lines: ["Akosua Mensah · +233 20 118 4402", "Ahodwo, near Ahodwo roundabout", "Kumasi, Ashanti"],
    note: "Yellow house behind the Total station",
  },
] as const;

export const returnRequest = {
  order: "JFK-250184",
  windowCloses: "Return window closes Sat 21 Nov",
  reasons: [
    { value: "damaged", label: "Arrived damaged" },
    { value: "wrong", label: "Not what I ordered" },
    { value: "expired", label: "Close to or past its expiry date" },
    { value: "unopened", label: "Changed my mind (unopened)" },
  ],
  items: [
    {
      id: "greens",
      name: "Daily Greens Powder",
      image: "greens.png",
      tint: "sage" as Tint,
      detail: "Lemon lime · paid GHS 405.00 after discount",
      compactDetail: "Paid GHS 405.00",
      quantity: "Qty 1 of 1",
      compactQuantity: "1 of 1",
    },
    { id: "ashwagandha", name: "Ashwagandha Tablets", image: "ashwagandha.png", tint: "amber" as Tint, detail: "Unopened items only" },
    { id: "energy", name: "Energy Capsules", image: "energy.png", tint: "lavender" as Tint, detail: "2 bought · choose how many" },
  ],
  refund: "GHS 405.00",
  payment: "MTN MoMo •••• 7781",
};

export const returnStatus = {
  rma: "RMA-1042",
  order: "JFK-250184",
  status: { label: "Pickup scheduled", tone: "info" } satisfies Status,
  window: "Tue 17 Nov, 10:00–14:00 · East Legon. Pack it in any bag — the courier brings a label.",
  item: { name: "Daily Greens Powder × 1", detail: "Damaged · refund to MoMo", price: "GHS 405", image: "greens.png" },
  steps: [
    { title: "Return requested", time: "Mon 09:15", state: "done" },
    { title: "Approved", time: "Mon 14:40", state: "done" },
    { title: "Pickup", time: "Tue 10–14:00", state: "current" },
    { title: "Received & checked", state: "upcoming" },
    { title: "Refunded", time: "Within 3 days", state: "upcoming" },
  ] as const,
  refund: "GHS 405.00",
};
