import type { KpiTileProps, SegmentedOption } from "@repo/ui/molecules";
import type { LowStockItem, OrderToPack, PaymentMethodHealth, RevenueDay } from "@repo/ui/organisms";

/*
 * /admin dashboard sample data (Paper "Jofak - Admin" → Dashboard; spec docs/05-analytics-reporting.md).
 * Static until the admin analytics API exists.
 */

export const greeting = {
  eyebrow: "Sunday, 15 November · Accra",
  title: "Good morning,",
  name: "Abena",
};

export const ranges: SegmentedOption[] = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "custom", label: "Custom", hideOnMobile: true },
];

export const kpis: (KpiTileProps & { id: string })[] = [
  {
    id: "revenue",
    tone: "feature",
    label: "Revenue today",
    currency: "GHS",
    value: "4,820.00",
    delta: { label: "+12.4%", tone: "up" },
    comparison: "vs last Sunday",
    trend: [5, 8, 6, 13, 11, 16, 14, 20, 21],
  },
  {
    id: "orders",
    label: "Orders",
    value: "37",
    delta: { label: "+8.8%", tone: "up" },
    comparison: "34 last Sunday",
    trend: [6, 5, 10, 8, 13, 11, 16, 14, 18],
  },
  {
    id: "aov",
    label: "Average order",
    currency: "GHS",
    value: "130.27",
    delta: { label: "+3.3%", tone: "up" },
    comparison: "vs last Sunday",
    trend: [10, 12, 9, 11, 10, 14, 12, 15, 15],
  },
  {
    id: "conversion",
    label: "Conversion rate",
    value: "2.8%",
    delta: { label: "−0.4 pts", tone: "down" },
    comparison: "1,322 sessions",
    trend: [16, 18, 15, 16, 12, 14, 10, 11, 9],
  },
];

export const attention = {
  updated: "Updated 2 min ago",
  toPack: { value: "9", href: "/admin/orders?view=to-pack" },
  pickup: { value: "5", href: "/admin/orders?view=ready-for-pickup" },
  outForDelivery: { value: "11", href: "/admin/orders?view=out-for-delivery" },
  failedPayments: { value: "3", href: "/admin/orders?view=failed-payments" },
  codToRemit: { amount: "1,240", href: "/admin/orders?view=cod-to-collect" },
};

export const revenue = {
  summary: "GHS 35,260 total · 271 orders",
  max: 8000,
  ticks: ["8k", "6k", "4k", "2k", "0"],
  days: [
    { label: "Mon", value: 3940, display: "GHS 3,940" },
    { label: "Tue", value: 4450, display: "GHS 4,450" },
    { label: "Wed", value: 3610, display: "GHS 3,610" },
    { label: "Thu", value: 5230, display: "GHS 5,230" },
    { label: "Fri", value: 6290, display: "GHS 6,290" },
    { label: "Sat", value: 7100, display: "GHS 7,100" },
    {
      label: "Today",
      compactLabel: "Sun",
      value: 4820,
      display: "GHS 4,820",
      compactDisplay: "4,820",
      current: true,
    },
  ] satisfies RevenueDay[],
};

export const payments = {
  summary: "Last 24 hours · 412 payment attempts",
  rate: "90%",
  methods: [
    { name: "MTN MoMo", share: 52, successRate: "94%", tone: "primary" },
    {
      name: "Telecel Cash",
      share: 18,
      successRate: "68%",
      tone: "warning",
      degraded: true,
    },
    { name: "AirtelTigo Money", share: 12, successRate: "91%", tone: "brand" },
    { name: "Card", share: 18, successRate: "97%", tone: "muted" },
  ] satisfies PaymentMethodHealth[],
  alert: {
    headline: "Telecel Cash is below 70%",
    body: " since 09:00. Likely a network issue, so customers are being offered other methods.",
  },
};

const orderHref = (number: string) => `/admin/orders/${number}`;

const orders: Omit<OrderToPack, "href">[] = [
  {
    number: "JFK-251482",
    placed: "08:42",
    customer: "Kwame Asante",
    area: "East Legon, Accra",
    items: 3,
    payment: { label: "Paid · MoMo", tone: "success" },
    delivery: "Same day",
    total: "GHS 412.00",
  },
  {
    number: "JFK-251479",
    placed: "08:15",
    customer: "Efua Owusu",
    area: "Adum, Kumasi",
    items: 1,
    payment: { label: "Cash on delivery", tone: "warning" },
    delivery: "Courier",
    total: "GHS 168.00",
  },
  {
    number: "JFK-251477",
    placed: "07:58",
    customer: "Ama Boateng",
    area: "Airport Hills, Accra",
    flag: "2 failed deliveries",
    items: 4,
    payment: { label: "Cash on delivery", tone: "warning" },
    delivery: "Same day",
    total: "GHS 596.00",
  },
  {
    number: "JFK-251474",
    placed: "Yesterday",
    customer: "Yaw Darko",
    area: "Osu, Accra",
    items: 2,
    payment: { label: "Paid · Card", tone: "success" },
    delivery: "Pickup",
    total: "GHS 245.00",
  },
  {
    number: "JFK-251470",
    placed: "Yesterday",
    customer: "Akosua Frimpong",
    area: "Tema Comm. 25",
    items: 2,
    payment: { label: "Paid · MoMo", tone: "success" },
    delivery: "Next day",
    total: "GHS 289.00",
  },
];

export const ordersToPack = {
  count: 9,
  orders: orders.map((order): OrderToPack => ({
    ...order,
    href: orderHref(order.number),
  })),
};

export const lowStock = {
  count: 6,
  items: [
    {
      id: "ashwagandha",
      name: "Ashwagandha Calm",
      detail: "60 capsules · JF-ASH-60",
      href: "/admin/inventory/JF-ASH-60",
      left: 0,
      forecast: "Sold out",
      tint: "amber",
    },
    {
      id: "magnesium",
      name: "Magnesium Sleep",
      detail: "Gummies · JF-MAG-30",
      href: "/admin/inventory/JF-MAG-30",
      left: 3,
      forecast: "~2 days",
      tint: "sage",
    },
    {
      id: "probiotic",
      name: "Daily Probiotic",
      detail: "30 capsules · JF-PRO-30",
      href: "/admin/inventory/JF-PRO-30",
      left: 4,
      forecast: "~4 days",
      tint: "lavender",
    },
    {
      id: "energy",
      name: "Energy B-Complex",
      detail: "Citrus · JF-ENR-CIT",
      href: "/admin/inventory/JF-ENR-CIT",
      left: 5,
      forecast: "~6 days",
      tint: "sun",
    },
  ] satisfies Omit<LowStockItem, "image">[],
};
