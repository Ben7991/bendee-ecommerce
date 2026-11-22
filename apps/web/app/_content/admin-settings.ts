/*
 * Admin settings (Paper "Jofak - Admin" → Settings). Kept in server memory (globalThis, shared by
 * pages and server actions in dev) so saving changes what the pages show. It resets when the
 * server restarts. TODO: read and write the settings service once it exists.
 */

export interface Zone {
  id: string;
  name: string;
  areas: string;
  areaCount: number;
  standard: { on: boolean; fee: number; eta: string };
  express: { on: boolean; fee: number; cutoff: string };
  freeOver: number | null;
  surcharge: string;
  cod: boolean;
}

export interface TaxComponent {
  id: string;
  name: string;
  full: string;
  rate: number;
  since: string;
  ended?: string;
  compounds: boolean;
}

interface Settings {
  savedAt: string;
  profile: {
    storeName: string;
    smsSender: string;
    tagline: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    gps: string;
    registeredName: string;
    tin: string;
  };
  payments: {
    mode: "live" | "test";
    methods: Record<"momo" | "telecel" | "at" | "card" | "cod", boolean>;
    codLimit: number;
    codOtp: boolean;
    guest: boolean;
    offerAccount: boolean;
    expireMins: string;
  };
  delivery: { zones: Zone[]; holidays: { name: string; date: string }[] };
  taxes: { components: TaxComponent[]; inclusive: boolean };
  notifications: {
    messages: Record<string, { sms: boolean | "always"; email: boolean | null }>;
    templates: Record<string, Template>;
    tests: { message: string; channel: "sms" | "email"; to: string; at: string }[];
  };
  seo: {
    templates: Record<SeoTab, { title: string; description: string; image: string; toggle?: boolean; hidden?: string[] }>;
    home: { title: string; description: string };
    rebuiltAt: string;
  };
  tracking: { meta: boolean; google: boolean };
}

export interface Template {
  enabled: boolean;
  body: string;
  subject?: string;
  editedBy: string;
  editedOn: string;
}

export type SeoTab = "products" | "categories" | "brands" | "collections" | "pages";

const seed = (): Settings => ({
  savedAt: "10:42",
  profile: {
    storeName: "Jofak",
    smsSender: "JOFAK",
    tagline: "Everyday wellness, delivered across Ghana",
    email: "hello@jofak.com",
    phone: "30 000 0000",
    whatsapp: "20 000 0000",
    address: "Oxford Street, Osu, Accra",
    gps: "GhanaPost GPS · GA-000-0000",
    registeredName: "Jofak Wellness Ltd",
    tin: "C00••••••••",
  },
  payments: {
    mode: "live",
    methods: { momo: true, telecel: true, at: true, card: true, cod: true },
    codLimit: 600,
    codOtp: true,
    guest: true,
    offerAccount: true,
    expireMins: "60",
  },
  delivery: {
    zones: [
      { id: "accra-central", name: "Accra Central", areas: "Osu, Airport, East Legon, Cantonments", areaCount: 18, standard: { on: true, fee: 25, eta: "1 – 2 working days" }, express: { on: true, fee: 45, cutoff: "12:00 · Mon–Sat" }, freeOver: 300, surcharge: "GHS 5 per kg over 5 kg", cod: true },
      { id: "greater-accra", name: "Greater Accra", areas: "Tema, Madina, Adenta, Kasoa", areaCount: 26, standard: { on: true, fee: 45, eta: "2 – 3 working days" }, express: { on: false, fee: 0, cutoff: "" }, freeOver: 300, surcharge: "GHS 5 per kg over 5 kg", cod: true },
      { id: "kumasi", name: "Kumasi & Ashanti", areas: "Kumasi, Obuasi, Ejisu", areaCount: 12, standard: { on: true, fee: 60, eta: "2 – 4 working days" }, express: { on: false, fee: 0, cutoff: "" }, freeOver: 300, surcharge: "GHS 5 per kg over 5 kg", cod: false },
      { id: "rest", name: "Rest of Ghana", areas: "Regional capitals in 14 regions", areaCount: 14, standard: { on: true, fee: 60, eta: "3 – 5 working days" }, express: { on: false, fee: 0, cutoff: "" }, freeOver: null, surcharge: "GHS 5 per kg over 5 kg", cod: false },
    ],
    holidays: [
      { name: "Christmas Day", date: "Fri 25 Dec" },
      { name: "Boxing Day", date: "Sat 26 Dec" },
      { name: "New Year’s Day", date: "Fri 1 Jan" },
      { name: "Independence Day", date: "Sat 6 Mar" },
    ],
  },
  taxes: {
    inclusive: true,
    components: [
      { id: "vat", name: "VAT", full: "Value added tax", rate: 15, since: "Since 1 Jan 2026", compounds: false },
      { id: "nhil", name: "NHIL", full: "National Health Insurance Levy", rate: 2.5, since: "Since 1 Jan 2026", compounds: false },
      { id: "getfund", name: "GETFund levy", full: "Ghana Education Trust Fund", rate: 2.5, since: "Since 1 Jan 2026", compounds: false },
      { id: "covid", name: "COVID-19 levy", full: "Kept for orders placed before it ended", rate: 1, since: "Ended 31 Dec 2025", ended: "31 Dec 2025", compounds: false },
    ],
  },
  notifications: {
    messages: Object.fromEntries(CUSTOMER_MESSAGES.map((message) => [message.id, { sms: message.sms, email: message.email }])),
    templates: {},
    tests: [],
  },
  seo: {
    templates: {
      products: { title: "{name} – {brand} | Jofak", description: "description", image: "photo" },
      categories: { title: "{name} supplements in Ghana | Jofak", description: "intro", image: "banner", toggle: true },
      brands: { title: "Shop {name} in Ghana | Jofak", description: "story", image: "logo" },
      collections: { title: "{name} {offer} | Jofak", description: "intro", image: "cover", toggle: false },
      pages: { title: "{title} | Jofak", description: "text", image: "card", hidden: ["Terms of sale", "Cookie settings"] },
    },
    home: {
      title: "Jofak · Everyday wellness, delivered across Ghana",
      description: "Vitamins, greens, sleep and beauty supplements from brands you trust. Pay with MoMo or card, or on delivery in Accra. Free delivery over GHS 300.",
    },
    rebuiltAt: "Today 10:05",
  },
  tracking: { meta: true, google: true },
});

const memory = globalThis as typeof globalThis & { __jofakSettings?: Settings };
/** The settings, adding any section a newer seed has that the kept copy lacks (dev reloads). */
export const settings = (): Settings => {
  const fresh = seed();
  const kept = (memory.__jofakSettings ??= fresh);
  for (const key of Object.keys(fresh) as (keyof Settings)[]) if (kept[key] === undefined) Object.assign(kept, { [key]: fresh[key] });
  return kept;
};

const now = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Accra" });
const text = (form: FormData, key: string, fallback: string) => {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, 200) : fallback;
};
const on = (form: FormData, key: string) => form.get(key) === "on";
const amount = (form: FormData, key: string, fallback: number) => {
  const value = Number(form.get(key));
  return Number.isFinite(value) && value >= 0 ? value : fallback;
};

/** The automatic messages to customers, in the order the Notifications page lists them. */
export const CUSTOMER_MESSAGES = [
  { id: "login-code", title: "Login code", description: "6-digit code when a customer signs in", sms: "always" as const, email: null, delivered: "98.6%" },
  { id: "order-confirmed", title: "Order confirmed", description: "After payment, or when a pay-on-delivery order is confirmed", sms: true, email: true, delivered: "98.9%" },
  { id: "payment-failed", title: "Payment didn’t go through", description: "Link to try again · sent 10 min after a failed MoMo or card payment", sms: true, email: false, delivered: "97.2%" },
  { id: "handed-to-courier", title: "Handed to courier", description: "When staff mark the order handed to the courier", sms: true, email: true, delivered: "98.4%" },
  { id: "ready-for-pickup", title: "Ready for pickup", description: "Order is waiting at Jofak Osu", sms: true, email: false, delivered: "99.1%" },
  { id: "delivered", title: "Delivered", description: "Thank-you note with a link to review", sms: true, email: false, delivered: "98.0%" },
  { id: "returns", title: "Return & refund updates", description: "Approved, item received, refund sent to MoMo or card", sms: true, email: true, delivered: "99.3%" },
];

const DEFAULT_SMS: Record<string, string> = {
  "login-code": "Your Jofak code is {code}. It expires in 10 minutes. Never share it with anyone.",
  "order-confirmed": "Hi {first_name}, thanks for your Jofak order {order_number} (GHS {order_total}). We’ll text you when it’s on its way.",
  "payment-failed": "Hi {first_name}, your payment for {order_number} didn’t go through. Try again: {payment_link} or call {store_phone}",
  "handed-to-courier": "Hi {first_name}, your Jofak order {order_number} is on its way with {courier}. Track it: {tracking_link}",
  "ready-for-pickup": "Hi {first_name}, order {order_number} is ready at Jofak Osu, Oxford Street. Questions? {store_phone}",
  delivered: "Hi {first_name}, your order {order_number} was delivered. Enjoy! Tell us how it went: {review_link}",
  returns: "Hi {first_name}, update on your return for {order_number}: {return_status}. Questions? {store_phone}",
};

/** The original text for a message, used for new templates and Restore default. */
export function defaultTemplate(id: string, channel: "sms" | "email"): Omit<Template, "editedBy" | "editedOn"> {
  const message = CUSTOMER_MESSAGES.find((item) => item.id === id);
  const sms = DEFAULT_SMS[id] ?? "";
  if (channel === "sms") return { enabled: true, body: sms };
  return {
    enabled: true,
    subject: `${message?.title ?? "Update"} · {order_number}`,
    body: `${sms.replace(/ \{\w+_link\}$/, "")}\n\nYou can see your order any time in your Jofak account.\n\nThe Jofak team`,
  };
}

export function template(id: string, channel: "sms" | "email"): Template {
  return settings().notifications.templates[`${id}:${channel}`] ?? { ...defaultTemplate(id, channel), editedBy: "Kojo Ansah", editedOn: "3 Nov" };
}

export const TEMPLATE_TOKENS = ["first_name", "order_number", "order_total", "courier", "tracking_link", "delivery_area", "store_phone"];

export const TEMPLATE_SAMPLE: Record<string, string> = {
  first_name: "Efua",
  order_number: "JFK-251496",
  order_total: "214.00",
  courier: "Swift Courier",
  tracking_link: "jfk.gh/t/8KQ2",
  delivery_area: "East Legon",
  store_phone: "030 000 0000",
  payment_link: "jfk.gh/p/8KQ2",
  review_link: "jfk.gh/r/8KQ2",
  code: "482913",
  return_status: "refund sent to MoMo",
};

export const SETTINGS_NAV = [
  {
    label: "Store",
    items: [
      { href: "/admin/settings/store", label: "Store profile", note: "Name, contact, business details" },
      { href: "/admin/settings/taxes", label: "Taxes", note: "VAT 15% · NHIL · GETFund" },
    ],
  },
  {
    label: "Selling",
    items: [
      { href: "/admin/settings/payments", label: "Payments & checkout", note: "Paystack · 5 methods on" },
      { href: "/admin/settings/delivery", label: "Delivery & pickup", note: "4 zones · Jofak Osu pickup" },
      { href: "/admin/settings/notifications", label: "Notifications", note: "SMS and email to customers" },
    ],
  },
  {
    label: "Growth",
    items: [
      { href: "/admin/settings/seo", label: "SEO defaults", note: "Titles and share images" },
      { href: "/admin/settings/tracking", label: "Tracking pixels", note: "Meta, Google, TikTok" },
    ],
  },
  {
    label: "Team",
    items: [
      { href: "/admin/settings/staff", label: "Staff & roles", count: 6, note: "Who can do what" },
      { href: "/admin/settings/audit", label: "Audit log", note: "Every change, who and when" },
    ],
  },
];

export function saveProfile(form: FormData) {
  const store = settings();
  const p = store.profile;
  store.profile = {
    ...p,
    storeName: text(form, "storeName", p.storeName) || p.storeName,
    tagline: text(form, "tagline", p.tagline),
    email: text(form, "email", p.email),
    phone: text(form, "phone", p.phone),
    whatsapp: text(form, "whatsapp", p.whatsapp),
    address: text(form, "address", p.address),
    gps: text(form, "gps", p.gps),
    registeredName: text(form, "registeredName", p.registeredName),
  };
  store.savedAt = now();
}

export function savePayments(form: FormData) {
  const store = settings();
  const p = store.payments;
  store.payments = {
    mode: form.get("mode") === "test" ? "test" : "live",
    methods: { momo: on(form, "momo"), telecel: on(form, "telecel"), at: on(form, "at"), card: on(form, "card"), cod: on(form, "cod") },
    codLimit: amount(form, "codLimit", p.codLimit),
    codOtp: on(form, "codOtp"),
    guest: on(form, "guest"),
    offerAccount: on(form, "offerAccount"),
    expireMins: ["30", "60", "120"].includes(String(form.get("expireMins"))) ? String(form.get("expireMins")) : p.expireMins,
  };
  store.savedAt = now();
}

export function saveZone(id: string, form: FormData) {
  const store = settings();
  const zone = store.delivery.zones.find((item) => item.id === id);
  if (!zone) return;
  zone.standard = { on: on(form, "standard"), fee: amount(form, "standardFee", zone.standard.fee), eta: text(form, "standardEta", zone.standard.eta) };
  zone.express = { on: on(form, "express"), fee: amount(form, "expressFee", zone.express.fee), cutoff: text(form, "expressCutoff", zone.express.cutoff) };
  const free = String(form.get("freeOver") ?? "").trim();
  zone.freeOver = free === "" ? null : amount(form, "freeOver", zone.freeOver ?? 0);
  zone.surcharge = text(form, "surcharge", zone.surcharge);
  zone.cod = on(form, "cod");
  store.savedAt = now();
}

export function addZone(): string {
  const store = settings();
  let n = 1;
  while (store.delivery.zones.some((zone) => zone.id === `zone-${n}`)) n += 1;
  const id = `zone-${n}`;
  store.delivery.zones.push({ id, name: `New zone ${n}`, areas: "No areas yet", areaCount: 0, standard: { on: true, fee: 50, eta: "2 – 4 working days" }, express: { on: false, fee: 0, cutoff: "" }, freeOver: null, surcharge: "", cod: false });
  store.savedAt = now();
  return id;
}

export function saveTaxes(form: FormData) {
  const store = settings();
  store.taxes.inclusive = on(form, "inclusive");
  for (const component of store.taxes.components) {
    if (component.ended) continue;
    const rate = Number(form.get(`rate-${component.id}`));
    if (Number.isFinite(rate) && rate >= 0 && rate <= 50) component.rate = rate;
  }
  store.savedAt = now();
}

/** The Taxes example: a GHS 70 shelf price split into its parts. */
export function taxExample(price = 70) {
  const live = settings().taxes.components.filter((component) => !component.ended);
  const total = live.reduce((sum, component) => sum + component.rate, 0);
  const inclusive = settings().taxes.inclusive;
  const before = inclusive ? price / (1 + total / 100) : price;
  const parts = live.map((component) => ({ id: component.id, title: `${component.name.replace(" levy", "")} ${component.rate}%`, value: ((before * component.rate) / 100).toFixed(2) }));
  const taxes = parts.reduce((sum, part) => sum + Number(part.value), 0);
  return { total, before: before.toFixed(2), parts, pays: (inclusive ? price : price + taxes).toFixed(2), taxes: taxes.toFixed(2) };
}

export function saveNotifications(form: FormData) {
  const store = settings();
  for (const message of CUSTOMER_MESSAGES) {
    const current = store.notifications.messages[message.id];
    if (!current) continue;
    if (current.sms !== "always") current.sms = on(form, `sms:${message.id}`);
    if (current.email !== null) current.email = on(form, `email:${message.id}`);
  }
  store.savedAt = now();
}

export function saveTemplate(id: string, channel: "sms" | "email", form: FormData) {
  const store = settings();
  const current = template(id, channel);
  const body = typeof form.get("body") === "string" ? String(form.get("body")).slice(0, 1000) : current.body;
  store.notifications.templates[`${id}:${channel}`] = {
    enabled: on(form, "enabled"),
    body: body.trim() || current.body,
    subject: channel === "email" ? text(form, "subject", current.subject ?? "") : undefined,
    editedBy: "Abena Mensah",
    editedOn: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Africa/Accra" }).replace("Sept", "Sep"),
  };
  const message = store.notifications.messages[id];
  if (message && message.sms !== "always" && channel === "sms") message.sms = on(form, "enabled");
  if (message && message.email !== null && channel === "email") message.email = on(form, "enabled");
  store.savedAt = now();
}

export function recordTest(id: string, channel: "sms" | "email", form: FormData) {
  settings().notifications.tests.unshift({ message: id, channel, to: text(form, "testTo", ""), at: now() });
}

export const SEO_TABS: SeoTab[] = ["products", "categories", "brands", "collections", "pages"];

export function saveSeo(tab: SeoTab, form: FormData) {
  const store = settings();
  const current = store.seo.templates[tab];
  store.seo.templates[tab] = {
    ...current,
    title: text(form, "title", current.title) || current.title,
    description: text(form, "description", current.description),
    image: text(form, "image", current.image),
    ...(current.toggle !== undefined && { toggle: on(form, "toggle") }),
    ...(current.hidden && { hidden: form.getAll("hidden").map(String).filter(Boolean) }),
  };
  store.seo.home = { title: text(form, "homeTitle", store.seo.home.title), description: text(form, "homeDescription", store.seo.home.description) };
  store.savedAt = now();
}

export function rebuildSitemap() {
  settings().seo.rebuiltAt = `Today ${now()}`;
}

export function saveTracking(form: FormData) {
  const store = settings();
  store.tracking = { meta: on(form, "meta"), google: on(form, "google") };
  store.savedAt = now();
}
