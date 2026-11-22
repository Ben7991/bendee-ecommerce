/*
 * Admin reports (Paper "Jofak - Admin" → Reports). Sample figures for the 30 days to 14 Nov
 * 2026, scaled for 7 or 90 days, with filters that reshape them. Read-only: nothing here changes.
 * TODO: query the analytics warehouse once it exists.
 */

export const REPORTS = [
  { slug: "sales", label: "Sales" },
  { slug: "funnel", label: "Funnel" },
  { slug: "products", label: "Products" },
  { slug: "abandonment", label: "Abandonment" },
  { slug: "inventory", label: "Inventory" },
  { slug: "discounts", label: "Discounts" },
  { slug: "tax", label: "Tax & payments" },
  { slug: "customers", label: "Customers" },
] as const;

export type ReportSlug = (typeof REPORTS)[number]["slug"];
export const isReport = (value: string): value is ReportSlug => REPORTS.some((report) => report.slug === value);

export type Period = "7" | "30" | "90";
export const PERIODS = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];
export const COMPARES = [
  { value: "previous", label: "vs previous period" },
  { value: "year", label: "vs same period last year" },
];
export const periodOf = (value?: string): Period => (value === "7" || value === "90" ? value : "30");
export const compareOf = (value?: string) => (value === "year" ? "year" : "previous");

/** The last day in the sample. */
const END = new Date("2026-11-14T12:00:00");
const DAY = 86_400_000;
const fmtDay = (date: Date, year = false) => date.toLocaleDateString("en-GB", { day: "numeric", month: "short", ...(year ? { year: "numeric" } : {}) });

export function rangeLabel(period: Period, compare: string) {
  const start = new Date(END.getTime() - (Number(period) - 1) * DAY);
  const against = compare === "year" ? "the same days last year" : `the previous ${period} days`;
  return {
    full: `${fmtDay(start)} – ${fmtDay(END, true)} · compared with ${against} · Accra time`,
    tablet: `${fmtDay(start)} – ${fmtDay(END, true)} · vs ${compare === "year" ? "last year" : `previous ${period} days`}`,
    mobile: `${fmtDay(start)} – ${fmtDay(END)} · vs ${compare === "year" ? "last year" : `previous ${period} days`}`,
  };
}

/** Scale a 30-day figure to the period. */
export const scaled = (value: number, period: Period) => Math.round((value * Number(period)) / 30);
export const ghs = (value: number) => `GHS ${Math.round(value).toLocaleString("en-GB")}`;
export const num = (value: number) => Math.round(value).toLocaleString("en-GB");

/* ---------------- Sales ---------------- */

const SALES_DAYS = [
  2800, 2650, 3150, 2950, 3500, 3300, 3700, 3550, 3900, 4100, 3850, 4300, 4150, 4550, 4400, 4800, 4650, 5120, 4350, 4700, 4500, 4650, 4400, 4600, 4750, 4500,
  4700, 4900, 4650, 4800,
];
const PREV_DAYS = SALES_DAYS.map((value, index) => Math.round(value * 0.84 + Math.sin(index) * 160));

export const SALES_BY = {
  category: [
    ["Sleep & stress", 31814],
    ["Greens & superfoods", 24102],
    ["Beauty from within", 17353],
    ["Vitamins & minerals", 13497],
    ["Energy & sports", 9642],
  ],
  payment: [
    ["MTN MoMo", 52680],
    ["Visa & Mastercard", 15140],
    ["Telecel Cash", 11880],
    ["Pay on delivery", 12088],
    ["AirtelTigo Money", 4620],
  ],
  zone: [
    ["Greater Accra", 58300],
    ["Kumasi & Ashanti", 17400],
    ["Takoradi & Western", 9200],
    ["Tema", 7100],
    ["Rest of Ghana", 4408],
  ],
  source: [
    ["WhatsApp shares", 29900],
    ["Instagram & Facebook ads", 23100],
    ["Google search", 17350],
    ["Direct", 12530],
    ["Recovery messages", 13528],
  ],
  device: [
    ["Mobile", 71300],
    ["Desktop", 21200],
    ["Tablet", 3908],
  ],
  returning: [
    ["New customers", 52060],
    ["Returning customers", 44348],
  ],
} as const;
export type SalesBy = keyof typeof SALES_BY;
export const SALES_BY_TABS: { value: SalesBy; label: string }[] = [
  { value: "category", label: "Category" },
  { value: "payment", label: "Payment" },
  { value: "zone", label: "Zone" },
  { value: "source", label: "Source" },
  { value: "device", label: "Device" },
  { value: "returning", label: "New vs returning" },
];

export function salesReport(period: Period, grain: string, by: SalesBy) {
  const days = SALES_DAYS.slice(-Number(period === "90" ? 30 : period));
  const factor = period === "90" ? 3 : 1;
  const series = grain === "week" ? weekly(days) : days;
  const previous = grain === "week" ? weekly(PREV_DAYS.slice(-days.length)) : PREV_DAYS.slice(-days.length);
  const current = series.map((value) => value * factor);
  const before = previous.map((value) => value * factor);
  const best = current.indexOf(Math.max(...current));
  const top = Math.max(...current, ...before);
  const max = Math.ceil(top / 2000) * 2000;
  const total = scaled(96408, period);
  const parts = SALES_BY[by];
  const sum = parts.reduce((acc, [, value]) => acc + value, 0);
  return {
    kpis: [
      { label: "Gross revenue", value: ghs(total), delta: { text: "14.2%", direction: "up" as const, good: true }, trend: [4, 7, 6, 11, 9, 14, 13, 17], tone: "dark" as const },
      { label: "Net sales", value: ghs(scaled(94948, period)), delta: { text: "13.6%", direction: "up" as const, good: true }, trend: [5, 6, 5, 7, 6, 8, 8, 10] },
      { label: "Orders", value: num(scaled(412, period)), delta: { text: "9.8%", direction: "up" as const, good: true }, trend: [5, 4, 6, 6, 7, 6, 8, 9] },
      { label: "Avg. order value", value: "GHS 234", delta: { text: "4.0%", direction: "up" as const, good: true }, trend: [6, 6, 7, 6, 7, 7, 8, 8] },
      { label: "Units sold", value: num(scaled(1036, period)), delta: { text: "11.3%", direction: "up" as const, good: true }, trend: [5, 6, 5, 7, 7, 8, 8, 9] },
      { label: "Conversion", value: "2.8%", delta: { text: "0.2 pts", direction: "down" as const, good: false }, trend: [9, 8, 9, 7, 6, 7, 5, 6] },
      { label: "Refunds", value: ghs(scaled(1460, period)), delta: { text: "6.1%", direction: "down" as const, good: true }, trend: [8, 8, 9, 8, 7, 7, 6, 6] },
    ],
    chart: {
      current,
      previous: before,
      max,
      yTicks: [max, (max * 2) / 3, max / 3, 0].map((value) => (value ? `${Math.round(value / 1000)}k` : "0")),
      highlight: best,
      xLabels: xLabels(period, grain),
      legend: { current: `This period · ${ghs(total)}`, previous: `Previous ${period} days · ${ghs(scaled(84420, period))}` },
      best: `${grain === "week" ? "best week" : "best day Sat 8 Nov"}, ${ghs(Math.max(...current))}`,
    },
    payments: {
      attempts: scaled(1084, period),
      segments: [
        { label: "Succeeded", value: scaled(954, period), tone: "success" as const },
        { label: "Failed", value: scaled(87, period), tone: "error" as const },
        { label: "Abandoned", value: scaled(43, period), tone: "warning" as const },
      ],
      methods: [
        { id: "momo", title: "MTN MoMo", value: "91%" },
        { id: "card", title: "Card", value: "89%" },
        { id: "telecel", title: "Telecel Cash", value: "84%" },
        { id: "at", title: "AirtelTigo Money", value: "68%", valueTone: "error" as const },
      ],
    },
    by: parts.map(([label, value]) => ({
      label,
      value: `${ghs(scaled(value, period))} · ${Math.round((value / sum) * 100)}%`,
      compactValue: ghs(scaled(value, period)),
      share: (value / parts[0]![1]) * 100,
    })),
    topProducts: [
      ["Greens Daily · 30 servings", 142, 9940],
      ["Ashwagandha Calm · 60 caps", 118, 7080],
      ["Magnesium Sleep · Gummies", 84, 6720],
      ["Collagen Glow · 30 sachets", 58, 5220],
      ["Energy B-Complex · Citrus", 88, 4400],
    ].map(([title, units, revenue], index) => ({
      id: String(index),
      rank: String(index + 1),
      title: title as string,
      sub: `${num(scaled(units as number, period))} units`,
      value: ghs(scaled(revenue as number, period)),
    })),
  };
}

function weekly(days: number[]) {
  const weeks: number[] = [];
  for (let index = 0; index < days.length; index += 7) weeks.push(days.slice(index, index + 7).reduce((sum, value) => sum + value, 0));
  return weeks;
}

function xLabels(period: Period, grain: string) {
  const span = Number(period);
  const count = 5;
  return Array.from({ length: count }, (_, index) => fmtDay(new Date(END.getTime() - ((span - 1) * (count - 1 - index)) / (count - 1) * DAY))).map((label) =>
    grain === "week" ? `w/c ${label}` : label,
  );
}

/* ---------------- Funnel ---------------- */

const FUNNEL = [
  ["Session started", 14710],
  ["Product viewed", 8240],
  ["Added to cart", 2060],
  ["Checkout started", 1105],
  ["Delivery info added", 842],
  ["Payment initiated", 618],
  ["Order placed", 412],
] as const;

export function funnelReport(period: Period, device: string) {
  const share = device === "mobile" ? 0.78 : device === "desktop" ? 0.19 : 1;
  const rateBoost = device === "desktop" ? 1.5 : device === "mobile" ? 0.86 : 1;
  const values = FUNNEL.map(([, value], index) => Math.round(scaled(value, period) * share * (index === 0 ? 1 : Math.pow(rateBoost, index / 6))));
  const first = values[0]!;
  let biggest = 1;
  let biggestDrop = 0;
  values.forEach((value, index) => {
    if (!index) return;
    const drop = 1 - value / values[index - 1]!;
    if (drop > biggestDrop) {
      biggestDrop = drop;
      biggest = index;
    }
  });
  const steps = FUNNEL.map(([name], index) => {
    const value = values[index]!;
    const before = index ? values[index - 1]! : value;
    const lost = before - value;
    const pct = before ? (lost / before) * 100 : 0;
    return {
      name,
      sessions: num(value),
      rate: `${((value / first) * 100).toFixed(index ? 1 : 0)}%`,
      reached: (value / first) * 100,
      dropped: index ? (lost / first) * 100 : 0,
      biggest: index === biggest,
      drop: index ? { text: index === biggest ? `−${pct.toFixed(1)}%` : `−${num(lost)} · ${pct.toFixed(1)}%`, compact: `${num(lost)} dropped · ${pct.toFixed(1)}%${index === biggest ? " — biggest leak" : ""}` } : undefined,
    };
  });
  const orders = values[values.length - 1]!;
  return {
    description: `${num(first)} sessions → ${num(orders)} orders · ${((orders / first) * 100).toFixed(1)}% overall conversion (▼ 0.2 pts)`,
    compactDescription: `${num(first)} sessions → ${num(orders)} orders · ${((orders / first) * 100).toFixed(1)}% (▼ 0.2 pts)`,
    steps,
    leak: { step: FUNNEL[biggest]![0], share: Math.round(biggestDrop * 100) },
    devices: [
      { label: "Mobile · 78% of sessions", value: "2.4%", share: 57 },
      { label: "Desktop · 19%", value: "4.2%", share: 100 },
      { label: "Tablet · 3%", value: "3.1%", share: 74 },
    ],
    searches: {
      total: scaled(3940, period),
      zero: scaled(212, period),
      rows: [
        ["“collagen”", 48],
        ["“baobab oil”", 31],
        ["“prekese tea”", 22],
        ["“magnesium glycinate”", 17],
      ].map(([title, count], index) => ({ id: String(index), title: title as string, value: `${scaled(count as number, period)} searches`, valueTone: "muted" as const })),
    },
  };
}

/* ---------------- Products ---------------- */

const PRODUCTS = [
  { name: "Greens Daily · 30 servings", category: "Greens & superfoods", brand: "Asaase Botanicals", thumb: "sage", views: 3120, atc: 14.2, bought: 4.4, units: 142, revenue: 9940, returns: 0.7 },
  { name: "Ashwagandha Calm · 60 caps", category: "Sleep & stress", brand: "Adinkra Apothecary", thumb: "lavender", views: 2480, atc: 13.1, bought: 4.6, units: 118, revenue: 7080, returns: 0.8 },
  { name: "Magnesium Sleep · Gummies", category: "Sleep & stress", brand: "Harmattan Labs", thumb: "amber", views: 1960, atc: 12.4, bought: 4.1, units: 84, revenue: 6720, returns: 1.2 },
  { name: "Collagen Glow · 30 sachets", category: "Beauty from within", brand: "Kente Naturals", thumb: "citrus", views: 2610, atc: 5.0, bought: 2.1, units: 58, revenue: 5220, returns: 3.4 },
  { name: "Energy B-Complex · Citrus", category: "Energy & sports", brand: "Sunbird Nutrition", thumb: "sun", views: 2140, atc: 4.1, bought: 1.9, units: 88, revenue: 4400, returns: 1.1 },
  { name: "Daily Probiotic · 30 caps", category: "Vitamins & minerals", brand: "Coastline Labs", thumb: "sage", views: 1520, atc: 11.8, bought: 4.0, units: 76, revenue: 4180, returns: 1.3 },
];
export const PRODUCT_CATEGORIES = ["Greens & superfoods", "Sleep & stress", "Beauty from within", "Energy & sports", "Vitamins & minerals"];
export const PRODUCT_BRANDS = [...new Set(PRODUCTS.map((product) => product.brand))];
export const PRODUCT_SORTS = [
  { value: "revenue", label: "Revenue" },
  { value: "views", label: "Views" },
  { value: "atc", label: "Add-to-cart" },
  { value: "returns", label: "Returns" },
];

export function productsReport(period: Period, category?: string, brand?: string, sort = "revenue") {
  const key = (["revenue", "views", "atc", "returns"].includes(sort) ? sort : "revenue") as "revenue" | "views" | "atc" | "returns";
  const rows = PRODUCTS.filter((product) => (!category || product.category === category) && (!brand || product.brand === brand)).sort((a, b) => b[key] - a[key]);
  return {
    rows: rows.map((product) => {
      const weak = product.atc < 8;
      return {
        id: product.name,
        tone: weak ? ("error" as const) : undefined,
        lead: { title: product.name, sub: `${product.category} · ${product.brand}`, thumb: product.thumb },
        cells: {
          views: num(scaled(product.views, period)),
          atc: { bar: (product.atc / 16.7) * 100, barTone: weak ? ("error" as const) : ("brand" as const), text: `${product.atc.toFixed(1)}%`, tone: weak ? ("error" as const) : ("strong" as const) },
          bought: `${product.bought.toFixed(1)}%`,
          units: num(scaled(product.units, period)),
          revenue: { text: ghs(scaled(product.revenue, period)), tone: "strong" as const },
          returns: product.returns > 3 ? { text: `${product.returns.toFixed(1)}%`, tone: "error" as const } : `${product.returns.toFixed(1)}%`,
        },
        mobile: {
          value: ghs(scaled(product.revenue, period)),
          meta: [
            { text: `${num(scaled(product.views, period))} views` },
            { text: `${product.atc.toFixed(1)}% add to cart`, tone: weak ? ("error" as const) : ("strong" as const) },
            product.returns > 3 ? { text: `${product.returns.toFixed(1)}% returned`, tone: "error" as const } : { text: `${num(scaled(product.units, period))} units` },
          ],
        },
      };
    }),
    kpis: [
      { label: "Product views", value: num(scaled(21630, period)), delta: { text: "8.1%", direction: "up" as const, good: true } },
      { label: "Add-to-cart rate", value: "9.5%", delta: { text: "0.6 pts", direction: "down" as const, good: false } },
      { label: "Products that sold", value: "46", suffix: "of 48", note: `${num(scaled(1036, period))} units` },
      { label: "Return rate", value: "1.4%", delta: { text: "0.3 pts", direction: "down" as const, good: true }, note: "better", compactNote: "" },
    ],
    unsold: [
      { id: "moringa", title: "Moringa Leaf Powder · 200 g", sub: "412 views · last sale 21 Sep", value: "34 in stock", compact: "34 left" },
      { id: "shea", title: "Shea Night Balm · 50 ml", sub: "96 views · never sold", value: "20 in stock", compact: "20 left" },
    ],
  };
}

/* ---------------- Abandonment ---------------- */

export function abandonmentReport(period: Period) {
  const carts = scaled(1648, period);
  const parts = [
    ["Cart only · never started checkout", 955, "soft"],
    ["Contact details", 263, "strong"],
    ["Delivery · saw the delivery fee", 224, "warning"],
    ["Payment started, not finished", 119, "warningSoft"],
    ["Payment failed", 87, "error"],
  ] as const;
  const total = parts.reduce((sum, [, value]) => sum + value, 0);
  return {
    kpis: [
      { label: "Cart abandonment", value: "80.0%", delta: { text: "1.1 pts", direction: "up" as const, good: false }, note: `${num(carts)} carts` },
      { label: "Checkout abandonment", value: "62.7%", delta: { text: "0.8 pts", direction: "down" as const, good: true }, note: `${num(scaled(693, period))} checkouts` },
      { label: "Value left in carts", value: ghs(scaled(298540, period)), note: "Avg cart GHS 181" },
      { label: "Recovered", value: ghs(scaled(21340, period)), note: `${num(scaled(110, period))} carts · 9.8% recovery rate`, tone: "dark" as const },
    ],
    where: parts.map(([label, value, tone]) => ({ label, value: num(scaled(value, period)), share: (value / total) * 100, tone })),
    reminders: [
      { id: "sent", title: "Reminders sent", value: num(scaled(1120, period)) },
      { id: "split", title: "· SMS 760 · Email 360", value: "only with consent", valueTone: "muted" as const },
      { id: "clicked", title: "Link clicked", value: `14.2% · ${num(scaled(159, period))}` },
      { id: "recovered", title: "Carts recovered", value: `${num(scaled(110, period))} · 9.8%` },
      { id: "cost", title: "Code COMEBACK5 cost", value: ghs(scaled(640, period)) },
    ],
    recovered: ghs(scaled(21340, period)),
    zones: [
      { label: "Accra Central · GHS 25", value: "54%", share: 54 },
      { label: "Greater Accra · GHS 45", value: "63%", share: 63 },
      { label: "Kumasi & Ashanti · GHS 60", value: "71%", share: 71, tone: "warning" as const },
      { label: "Rest of Ghana · GHS 60, no free delivery", value: "78%", share: 78, tone: "error" as const, valueTone: "error" as const },
    ],
    failures: [
      { id: "momo", title: "MoMo prompt not approved in time", sub: "Mostly AirtelTigo Money", value: num(scaled(41, period)) },
      { id: "funds", title: "Not enough money in wallet", value: num(scaled(22, period)) },
      { id: "pin", title: "Wrong MoMo PIN", value: num(scaled(14, period)) },
      { id: "card", title: "Card declined by bank", value: num(scaled(10, period)) },
    ],
    followUps: [
      { id: "adwoa", name: "Adwoa Nyarko", contact: "024 ••• ••18 · today 09:12", items: "Collagen Glow × 3, Greens Daily", left: { label: "Payment failed", tone: "error" as const }, reminder: "SMS · clicked", value: "GHS 640" },
      { id: "kwabena", name: "Kwabena Darko", contact: "055 ••• ••02 · yesterday", items: "Ashwagandha Calm × 2, Magnesium Sleep × 2", left: { label: "Delivery fee", tone: "warning" as const }, reminder: "SMS · sent", value: "GHS 520" },
      { id: "guest", name: "Guest", contact: "020 ••• ••77 · yesterday", items: "Greens Daily × 4", left: { label: "Payment started", tone: "neutral" as const }, reminder: "SMS · sent", value: "GHS 280" },
      { id: "selorm", name: "Selorm Agbeko", contact: "selorm@•••.com · 12 Nov", items: "Daily Probiotic, Energy B-Complex", left: { label: "Recovered", tone: "success" as const }, reminder: "Email · ordered", value: "GHS 105", order: "JFK-251524" },
    ],
  };
}

/* ---------------- Inventory ---------------- */

export const INVENTORY_LOCATIONS = [
  { value: "osu", label: "Jofak Osu" },
  { value: "all", label: "All locations" },
];

export function inventoryReport(category?: string) {
  const low = [
    { name: "Greens Daily · 60 servings", sub: "Asaase Botanicals · since 12 Nov", category: "Greens & superfoods", onHand: 0, perDay: 1.6, restock: "PO due 19 Nov" },
    { name: "Ashwagandha Calm · 120 caps", sub: "Adinkra Apothecary · since 14 Nov", category: "Sleep & stress", onHand: 0, perDay: 0.9, restock: "Not ordered" },
    { name: "Collagen Glow · 30 sachets", sub: "Kente Naturals", category: "Beauty from within", onHand: 9, perDay: 1.9, restock: "PO due 21 Nov" },
    { name: "Energy B-Complex · Citrus", sub: "Sunbird Nutrition", category: "Energy & sports", onHand: 14, perDay: 2.9, restock: "Not ordered" },
    { name: "Greens Daily · 30 servings", sub: "Asaase Botanicals · best seller", category: "Greens & superfoods", onHand: 38, perDay: 4.7, restock: "PO due 19 Nov" },
    { name: "Magnesium Sleep · Gummies", sub: "Harmattan Labs", category: "Sleep & stress", onHand: 22, perDay: 2.8, restock: "Not ordered" },
  ].filter((row) => !category || row.category === category);
  const turnover = [
    ["Sleep & stress", 28400, 9.1, 40],
    ["Greens & superfoods", 24100, 8.4, 43],
    ["Gut health", 17460, 6.3, 58],
    ["Vitamins & minerals", 22700, 5.6, 65],
    ["Energy & sports", 18300, 5.1, 72],
    ["Beauty from within", 31900, 4.2, 87],
  ] as const;
  return {
    kpis: [
      { label: "Stock value at cost", value: "GHS 142,860", note: "GHS 238,100 at selling price" },
      { label: "Units on hand", value: "3,412", note: "across 112 variants" },
      { label: "Stock turnover", value: "6.4×", suffix: "a year", delta: { text: "0.5× vs last period", direction: "up" as const, good: true } },
      { label: "Days of stock left", value: "57 days", note: "at 30-day sales speed" },
      { label: "Needs attention", value: "6 low · 2 out", note: "2 slow movers", tone: "sun" as const },
    ],
    low: low.map((row) => {
      const days = row.onHand / row.perDay;
      const out = row.onHand === 0;
      const tone = days <= 5 ? ("error" as const) : ("warning" as const);
      return {
        id: row.name,
        lead: { title: row.name, sub: row.sub },
        cells: {
          onHand: { text: num(row.onHand), tone: out ? ("error" as const) : ("strong" as const) },
          perDay: row.perDay.toFixed(1),
          days: out ? { chip: { label: "Out of stock", tone: "error" as const } } : { bar: Math.min(100, (days / 30) * 100), barTone: tone, text: `${Math.round(days)} days`, tone },
          restock: row.restock === "Not ordered" ? { text: "Not ordered", tone: "warning" as const } : row.restock,
        },
        mobile: {
          value: out ? "Out" : `${Math.round(days)} days`,
          meta: [{ text: `${row.onHand} on hand` }, { text: `${row.perDay.toFixed(1)}/day` }, { text: row.restock, tone: row.restock === "Not ordered" ? ("warning" as const) : undefined }],
        },
      };
    }),
    turnover: turnover.map(([name, value, rate, days]) => ({
      id: name,
      lead: { title: name },
      cells: {
        value: ghs(value),
        turnover: { bar: (rate / 10) * 100, barTone: rate < 5 ? ("warning" as const) : ("brand" as const), text: `${rate.toFixed(1)}×`, tone: rate < 5 ? ("warning" as const) : ("strong" as const) },
        days: rate < 5 ? { text: String(days), tone: "warning" as const } : String(days),
      },
      mobile: { value: `${rate.toFixed(1)}×`, meta: [{ text: ghs(value) }, { text: `${days} days` }] },
    })),
    slow: [
      { id: "moringa", title: "Moringa Leaf Powder · 200 g", sub: "34 units · ~410 days of stock", value: "GHS 1,190" },
      { id: "shea", title: "Shea Night Balm · 50 ml", sub: "20 units · never sold", value: "GHS 900" },
    ],
  };
}

/* ---------------- Discounts ---------------- */

export function discountsReport(period: Period) {
  const rows = [
    { code: "COMEBACK5", sub: "5% off · sent in cart reminders", status: { label: "Active", tone: "success" as const }, uses: 64, revenue: 11780, cost: 640, avg: 184, ret: 18.4 },
    { code: "WELCOME10", sub: "10% off a first order", status: { label: "Active", tone: "success" as const }, uses: 41, revenue: 9840, cost: 1090, avg: 240, ret: 9.0 },
    { code: "Free delivery over GHS 300", sub: "Automatic · not in Rest of Ghana", status: { label: "Automatic", tone: "neutral" as const }, uses: 22, revenue: 8140, cost: 990, avg: 370, ret: 8.2, auto: true },
    { code: "SLEEPWELL15", sub: "15% off Sleep & stress", status: { label: "Ends 30 Nov", tone: "warning" as const }, uses: 14, revenue: 4060, cost: 720, avg: 290, ret: 5.6 },
    { code: "HARMATTAN20", sub: "20% off Beauty from within · scheduled", status: { label: "Starts 1 Dec", tone: "neutral" as const, dashed: true }, scheduled: true },
  ];
  return {
    kpis: [
      { label: "Orders with a discount", value: num(scaled(141, period)), suffix: `of ${num(scaled(412, period))}`, note: "34% of orders" },
      { label: "Revenue from those orders", value: ghs(scaled(33820, period)), delta: { text: "18.2%", direction: "up" as const, good: true } },
      { label: "Discount cost", value: ghs(scaled(3440, period)), note: "10.2% of discounted sales" },
      { label: "Avg order · with vs without", compactLabel: "Avg order with discount", value: "GHS 240", suffix: "vs 231", note: "+4% bigger with a discount", noteTone: "brand" as const },
    ],
    rows: rows.map((row) => ({
      id: row.code,
      lead: { title: row.code, sub: row.sub, mono: !row.auto, muted: row.scheduled },
      cells: row.scheduled
        ? { status: { chip: row.status }, uses: "—", revenue: "—", cost: "—", avg: "—", ret: "—" }
        : {
            status: { chip: row.status },
            uses: { text: num(scaled(row.uses!, period)), tone: "strong" as const },
            revenue: { text: ghs(scaled(row.revenue!, period)), tone: "strong" as const },
            cost: ghs(scaled(row.cost!, period)),
            avg: ghs(row.avg!),
            ret: { bar: (row.ret! / 18.4) * 100, barTone: row.ret! < 6 ? ("warning" as const) : ("brand" as const), text: row.ret!.toFixed(1), tone: row.ret! < 6 ? ("warning" as const) : ("strong" as const) },
          },
      mobile: row.scheduled
        ? { value: row.status.label, meta: [{ text: row.sub }] }
        : { value: ghs(scaled(row.revenue!, period)), meta: [{ text: `${num(scaled(row.uses!, period))} uses` }, { text: `GHS ${row.ret!.toFixed(1)} per GHS 1`, tone: row.ret! < 6 ? ("warning" as const) : ("strong" as const) }] },
    })),
    bins: [
      ["<100", 52],
      ["100–199", 88],
      ["200–249", 96],
      ["250–299", 38],
      ["300–349", 71, true],
      ["350–499", 44],
      ["500+", 23],
    ].map(([label, value, highlight]) => ({ label: label as string, value: scaled(value as number, period), highlight: Boolean(highlight) })),
  };
}

/* ---------------- Tax & payments ---------------- */

export function taxReport(period: Period) {
  const months = [
    { month: "November 2026", sub: "1–14 Nov so far", sales: 31200, vat: 4680, nhil: 780, getfund: 780, total: 6240, status: { label: "Month in progress", tone: "neutral" as const } },
    { month: "October 2026", sub: "382 orders", sales: 66900, vat: 10035, nhil: 1673, getfund: 1673, total: 13381, status: { label: "Due 30 Nov", tone: "warning" as const } },
    { month: "September 2026", sub: "351 orders", sales: 61400, vat: 9210, nhil: 1535, getfund: 1535, total: 12280, status: { label: "Filed 29 Oct", tone: "success" as const } },
    { month: "August 2026", sub: "334 orders", sales: 58200, vat: 8730, nhil: 1455, getfund: 1455, total: 11640, status: { label: "Filed 26 Sep", tone: "success" as const } },
  ];
  const methods = [
    ["MTN MoMo", 236, 52680, 1027, 91],
    ["Visa & Mastercard", 56, 15140, 301, 89],
    ["Telecel Cash", 54, 11880, 232, 84],
    ["AirtelTigo Money", 22, 4620, 90, 68],
  ] as const;
  return {
    taxKpis: [
      { label: "Total tax · 16 Oct – 14 Nov", compactLabel: "Total tax", value: ghs(scaled(13926, period)), note: `on ${ghs(scaled(83550, period))} of taxable sales`, tone: "dark" as const },
      { label: "VAT · 15%", value: ghs(scaled(10444, period)) },
      { label: "NHIL · 2.5%", value: ghs(scaled(1741, period)) },
      { label: "GETFund · 2.5%", value: ghs(scaled(1741, period)) },
      { label: "Exempt sales", value: ghs(scaled(11398, period)) },
    ],
    months: months.map((row) => ({
      id: row.month,
      lead: { title: row.month, sub: row.sub },
      cells: { sales: ghs(row.sales), vat: num(row.vat), nhil: num(row.nhil), getfund: num(row.getfund), total: { text: ghs(row.total), tone: "strong" as const }, status: { chip: row.status } },
      mobile: { value: ghs(row.total), meta: [{ text: `${ghs(row.sales)} before tax` }, { text: row.status.label, tone: row.status.tone === "warning" ? ("warning" as const) : row.status.tone === "success" ? ("brand" as const) : undefined }] },
    })),
    payKpis: [
      { label: "Collected online", value: ghs(scaled(84320, period)), note: `${num(scaled(368, period))} orders` },
      { label: "Paystack fees", value: ghs(scaled(1650, period)), note: "1.96% of online sales" },
      { label: "Paid into bank", value: ghs(scaled(80140, period)), note: `${num(scaled(27, period))} payouts · all matched`, noteTone: "brand" as const },
      { label: "Waiting for payout", value: "GHS 2,530", note: "Next payout Tue 17 Nov", tone: "muted" as const },
    ],
    methods: methods.map(([name, orders, collected, fees, success]) => ({
      id: name,
      lead: { title: name },
      cells: { orders: num(scaled(orders, period)), collected: { text: ghs(scaled(collected, period)), tone: "strong" as const }, fees: ghs(scaled(fees, period)), success: { text: `${success}%`, tone: success < 70 ? ("error" as const) : ("strong" as const) } },
      mobile: { value: ghs(scaled(collected, period)), meta: [{ text: `${num(scaled(orders, period))} orders` }, { text: `${success}% success`, tone: success < 70 ? ("error" as const) : undefined }] },
    })),
    delivery: {
      orders: scaled(44, period),
      total: ghs(scaled(12080, period)),
      segments: [
        { label: "Paid to Jofak by courier", value: ghs(scaled(9320, period)), share: 77, tone: "brand" as const },
        { label: "Collected, not yet paid to us", value: ghs(scaled(1440, period)), share: 12, tone: "warning" as const, valueTone: "warning" as const },
        { label: `Not delivered yet · ${scaled(5, period)} orders`, value: ghs(scaled(1320, period)), share: 11, tone: "track" as const },
      ],
    },
  };
}

/* ---------------- Customers ---------------- */

export function customersReport(period: Period) {
  return {
    kpis: [
      { label: "Customers who ordered", compactLabel: "Customers", value: num(scaled(371, period)), note: `${num(scaled(248, period))} new · ${num(scaled(123, period))} returning`, compactNote: `${num(scaled(248, period))} new · ${num(scaled(123, period))} back` },
      { label: "Repeat purchase rate", compactLabel: "Repeat rate", value: "33.2%", delta: { text: "2.4 pts", direction: "up" as const, good: true } },
      { label: "Orders per customer", value: "1.11", note: `in the last ${period} days`, compactNote: `last ${period} days` },
      { label: "Avg lifetime value", value: "GHS 612", note: "since first order · before tax", compactNote: "before tax", tone: "dark" as const },
    ],
    cohorts: [
      { label: "June 2026", compactLabel: "Jun", sub: "182 customers", values: [24, 18, 15, 13, 12] },
      { label: "July 2026", compactLabel: "Jul", sub: "205 customers", values: [26, 19, 16, 14, null] },
      { label: "August 2026", compactLabel: "Aug", sub: "231 customers", values: [27, 20, 17, null, null] },
      { label: "September 2026", compactLabel: "Sep", sub: "246 customers", values: [29, 21, null, null, null] },
      { label: "October 2026", compactLabel: "Oct", sub: "268 customers", values: [31, null, null, null, null] },
    ],
    groups: [
      { id: "champions", name: "Champions", sub: "Buy often, spend the most", dot: "primary" as const, customers: 64, avg: 1840, last: "~12 days ago" },
      { id: "loyal", name: "Loyal", sub: "Order every month or two", dot: "strong" as const, customers: 142, avg: 960, last: "~28 days ago" },
      { id: "promising", name: "Promising", sub: "Recent first order", dot: "soft" as const, customers: 318, avg: 310, last: "~20 days ago" },
      { id: "at-risk", name: "At risk", sub: "Were regulars, quiet 90+ days", dot: "warning" as const, customers: 96, avg: 720, last: "~118 days ago", risk: true },
      { id: "hibernating", name: "Hibernating", sub: "One small order, long ago", dot: "track" as const, customers: 410, avg: 180, last: "~200 days ago" },
    ],
    channels: [
      { label: "WhatsApp referral", value: "GHS 820", share: 100, tone: "primary" as const },
      { label: "Instagram", value: "GHS 680", share: 83 },
      { label: "Google search", value: "GHS 640", share: 78 },
      { label: "Direct", value: "GHS 590", share: 72 },
      { label: "TikTok", value: "GHS 410", share: 50, tone: "soft" as const },
    ],
  };
}

/* ---------------- CSV export ---------------- */

export function reportCsv(report: ReportSlug, period: Period): string {
  const rows: (string | number)[][] = [];
  if (report === "sales") {
    const data = salesReport(period, "day", "category");
    rows.push(["Metric", "Value"], ...data.kpis.map((kpi) => [kpi.label, kpi.value]), [], ["Category", "Revenue"], ...data.by.map((row) => [row.label, row.compactValue]));
  } else if (report === "funnel") {
    rows.push(["Step", "Sessions", "Rate"], ...funnelReport(period, "all").steps.map((step) => [step.name, step.sessions, step.rate]));
  } else if (report === "products") {
    rows.push(["Product", "Views", "Add to cart", "Bought", "Units", "Revenue", "Returns"], ...PRODUCTS.map((p) => [p.name, scaled(p.views, period), `${p.atc}%`, `${p.bought}%`, scaled(p.units, period), scaled(p.revenue, period), `${p.returns}%`]));
  } else if (report === "abandonment") {
    rows.push(["Where carts are left", "Carts"], ...abandonmentReport(period).where.map((row) => [row.label, row.value]));
  } else if (report === "inventory") {
    rows.push(["Variant", "On hand", "Sold per day", "Restock"], ...inventoryReport().low.map((row) => [String(row.lead.title), String((row.cells.onHand as { text: string }).text), String(row.cells.perDay), String(row.mobile.meta[2]!.text)]));
  } else if (report === "discounts") {
    rows.push(["Discount", "Status"], ...discountsReport(period).rows.map((row) => [String(row.lead.title), String(row.cells.status.chip.label)]));
  } else if (report === "tax") {
    rows.push(["Month", "Total tax", "Return"], ...taxReport(period).months.map((row) => [String(row.lead.title), String(row.cells.total.text), row.cells.status.chip.label]));
  } else {
    rows.push(["Group", "Customers", "Avg spent"], ...customersReport(period).groups.map((group) => [group.name, group.customers, group.avg]));
  }
  return rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
}
