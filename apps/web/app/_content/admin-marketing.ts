import type { FlowChannel, FlowEditorProps, FlowSettings } from "@repo/ui/organisms";
import type { Automation, MarketingMessage, MarketingSummaryProps, OrderSource, Tracker, TrackingEvent } from "@repo/ui/organisms";

/*
 * Admin marketing (Paper "Jofak - Admin" → Marketing, Abandoned cart flow). Flow settings live in
 * server memory (globalThis, shared by pages and server actions in dev), so saving or switching a
 * flow off changes the overview. Figures are sample data scaled to the chosen period. It resets
 * when the server restarts. TODO: read the messaging and analytics services once they exist.
 */

export type MarketingPeriod = "7" | "30" | "90";
export const PERIODS = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];
export const periodOf = (value?: string): MarketingPeriod => (value === "7" || value === "90" ? value : "30");
const scale = (amount: number, period: MarketingPeriod) => Math.round((amount * Number(period)) / 30);
const ghs = (amount: number) => `GHS ${amount.toLocaleString("en-GB")}`;

type FlowSlug = "abandoned-cart" | "payment-retry";

interface FlowRecord {
  slug: FlowSlug;
  name: string;
  since: string;
  settings: FlowSettings;
  /** 30-day sample figures. */
  funnel: { enrolled: number; delivered: number; clicked: number; ordered: number; recovered: number; skipped: number };
  tests: number;
}

const seed: FlowRecord[] = [
  {
    slug: "abandoned-cart",
    name: "Abandoned cart reminder",
    since: "2026-09-02",
    settings: {
      enabled: true,
      conditions: { idle: "60", minCart: "50", contact: "", quiet: "7" },
      headline: "You left something behind",
      body: "Hi {first_name}, you left {items} in your Jofak cart. We've kept them for you. Order before 4pm and it reaches {area} tomorrow.",
      button: "Complete your order",
      channels: ["whatsapp", "sms", "email"],
      quietHours: "21-08",
      frequency: "1",
      credit: "7",
    },
    funnel: { enrolled: 245, delivered: 238, clicked: 81, ordered: 27, recovered: 6840, skipped: 41 },
    tests: 0,
  },
  {
    slug: "payment-retry",
    name: "MoMo payment retry",
    since: "2026-10-06",
    settings: {
      enabled: true,
      conditions: { wait: "10", method: "", amount: "0" },
      headline: "Having trouble? Retry payment",
      body: "Hi {first_name}, your MoMo payment for {items} didn't go through. Tap below to try again — your order is held for 2 hours.",
      button: "Retry payment",
      channels: ["sms", "whatsapp"],
      quietHours: "off",
      frequency: "2",
      credit: "1",
    },
    funnel: { enrolled: 64, delivered: 64, clicked: 40, ordered: 31, recovered: 4120, skipped: 0 },
    tests: 0,
  },
];

const memory = globalThis as typeof globalThis & { __jofakMarketing?: { flows: FlowRecord[] } };
const store = () => (memory.__jofakMarketing ??= { flows: structuredClone(seed) });
const findFlow = (slug: string) => store().flows.find((flow) => flow.slug === slug);

const CHANNEL_LABEL: Record<FlowChannel, string> = { whatsapp: "WhatsApp", sms: "SMS", email: "email" };
const capital = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
const channelList = (channels: FlowChannel[]) =>
  channels.length ? capital(channels.map((channel) => CHANNEL_LABEL[channel]).join(", then ")) : "No channels on";
const after = (minutes: string) => (minutes === "60" ? "1 hour" : minutes === "120" ? "2 hours" : `${minutes} min`);

function describe(flow: FlowRecord): string {
  const { settings } = flow;
  if (flow.slug === "payment-retry") return `“${settings.headline}” ${after(settings.conditions.wait ?? "10")} after a failed or ignored MoMo prompt`;
  return `1 message, ${after(settings.conditions.idle ?? "60")} after a cart goes quiet · ${channelList(settings.channels)}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2 Sep" (ICU writes "Sept"). */
const sinceLabel = (date: string) => {
  const [, month, day] = date.split("-").map(Number);
  return `${day} ${MONTHS[month! - 1]}`;
};

/** Overview: headline figures. */
export function marketingSummary(period: MarketingPeriod): MarketingSummaryProps {
  const [cart, retry] = store().flows as [FlowRecord, FlowRecord];
  const live = (flow: FlowRecord, amount: number) => (flow.settings.enabled ? scale(amount, period) : 0);
  const recovered = live(cart, cart.funnel.recovered) + live(retry, retry.funnel.recovered);
  const saved = live(cart, cart.funnel.ordered) + live(retry, retry.funnel.ordered);
  const abandoned = scale(286, period);
  const ordered = live(cart, cart.funnel.ordered);
  const rate = abandoned ? (ordered / abandoned) * 100 : 0;
  return {
    revenue: {
      label: "Recovered revenue",
      value: ghs(recovered),
      delta: "+18%",
      note: `${saved} orders saved by abandoned-cart and payment-retry messages`,
      compactNote: `${saved} orders saved`,
    },
    rate: {
      label: "Cart recovery rate",
      compactLabel: "Recovery rate",
      value: `${rate.toFixed(1)}%`,
      progress: (rate / 15) * 100,
      target: (8 / 15) * 100,
      ahead: rate >= 8,
      note: `Target 8% · ${ordered} of ${abandoned} carts`,
      compactNote: rate >= 8 ? "Above 8% target" : "Below 8% target",
    },
    abandoned: {
      label: "Abandoned carts",
      compactLabel: "Abandoned",
      value: String(abandoned),
      note: `${ghs(scale(61200, period))} left in carts · ${scale(41, period)} no contact`,
      compactNote: `carts · ${scale(41, period)} no contact`,
    },
    consent: { label: "Marketing consent", value: "62%", note: "of visitors accept marketing cookies" },
  };
}

/** Overview: automations. */
export function automations(period: MarketingPeriod): Automation[] {
  return store().flows.map((flow) => {
    const on = flow.settings.enabled;
    const f = flow.funnel;
    const ordered = scale(f.ordered, period);
    const recovered = ghs(scale(f.recovered, period));
    const status = on ? ({ label: "Live", tone: "success" } as const) : ({ label: "Off", tone: "neutral" } as const);
    const common = { href: `/admin/marketing/${flow.slug}`, name: flow.name, status, description: describe(flow) };
    if (flow.slug === "abandoned-cart") {
      const clicked = scale(f.clicked, period);
      const delivered = scale(f.delivered, period);
      return {
        ...common,
        icon: "cart",
        tint: "accent",
        summary: `${status.label} · ${ordered} orders · ${recovered}`,
        funnel: [
          { label: "Enrolled", value: String(scale(f.enrolled, period)) },
          { label: "Delivered", value: String(delivered) },
          { label: "Clicked", value: String(clicked), note: `${delivered ? Math.round((clicked / delivered) * 100) : 0}%` },
          { label: "Ordered", value: `${ordered} · ${recovered}`, compactLabel: `Ordered · ${recovered}`, compactValue: String(ordered), goal: true },
        ],
      } satisfies Automation;
    }
    return {
      ...common,
      icon: "phoneAlert",
      tint: "sun",
      summary: `${status.label} · ${ordered} paid · ${recovered}`,
      result: { value: `${ordered} of ${scale(f.enrolled, period)} paid`, note: `${recovered} recovered` },
    } satisfies Automation;
  });
}

export const comingSoon = [
  { name: "Back in stock", note: "Coming soon · 38 waiting" },
  { name: "Win-back", note: "Coming soon · no order in 90 days" },
  { name: "Review request", note: "Coming soon · after delivery" },
];

export const quietRules = "Quiet hours 21:00–08:00 · max 1 message per customer per day";

const MESSAGES: MarketingMessage[] = [
  { id: "m1", customer: "Akua Sarpong", detail: "Cart · Greens Daily, Ashwagandha Calm", compactDetail: "WhatsApp · GHS 236", channel: "WhatsApp", amount: "GHS 236", status: { label: "Ordered · JFK-251502", compactLabel: "Ordered", tone: "success" } },
  { id: "m2", customer: "Kojo Appiah", detail: "MoMo prompt ignored · Daily Probiotic", compactDetail: "SMS · payment retry · GHS 180", channel: "SMS", amount: "GHS 180", status: { label: "Clicked · 4 min ago", compactLabel: "Clicked", tone: "lavender" } },
  { id: "m3", customer: "Esi Quartey", detail: "Cart · Magnesium Sleep Gummies × 2", compactDetail: "WhatsApp · GHS 320", channel: "WhatsApp", amount: "GHS 320", status: { label: "Delivered · 22 min", compactLabel: "Delivered", tone: "info" }, hideOnMobile: true },
  { id: "m4", customer: "Yaw Boakye", detail: "Cart · Collagen Glow · added 21:40", compactDetail: "SMS · GHS 210", channel: "SMS", amount: "GHS 210", status: { label: "Waiting · sends 08:00", compactLabel: "Sends 08:00", tone: "warning" } },
  { id: "m5", customer: "Abena Owusu", detail: "Cart · Energy B-Complex · Citrus", compactDetail: "Email · GHS 120", channel: "Email", amount: "GHS 120", status: { label: "Stopped · out of stock", compactLabel: "Stopped", tone: "neutral" } },
  { id: "m6", customer: "Kwame Mensah", detail: "Cart · Daily Probiotic × 2", compactDetail: "WhatsApp · GHS 180", channel: "WhatsApp", amount: "GHS 180", status: { label: "Ordered · JFK-251482", compactLabel: "Ordered", tone: "success" } },
  { id: "m7", customer: "Adwoa Boateng", detail: "MoMo prompt failed · Greens Daily", compactDetail: "SMS · payment retry · GHS 260", channel: "SMS", amount: "GHS 260", status: { label: "Paid · JFK-251481", compactLabel: "Paid", tone: "success" } },
  { id: "m8", customer: "Nana Asante", detail: "Cart · Ashwagandha · 120", compactDetail: "Email · GHS 250", channel: "Email", amount: "GHS 250", status: { label: "Delivered · 1 h", compactLabel: "Delivered", tone: "info" } },
];

/** Overview: Akua's order links to its order (the rest are display-only samples). */
export function recentMessages(all: boolean): MarketingMessage[] {
  const list = all ? MESSAGES : MESSAGES.slice(0, 5);
  return list.map((message) => (message.status.label.includes("JFK-") ? { ...message, href: `/admin/orders/${message.status.label.split("· ")[1]}` } : message));
}

export const orderSources: OrderSource[] = [
  { label: "WhatsApp shares", share: 31, tone: "primary" },
  { label: "Instagram & Facebook ads", share: 24, tone: "brand" },
  { label: "Google search", share: 18, tone: "strong" },
  { label: "Direct", share: 13, tone: "soft" },
  { label: "Recovery messages", share: 14, tone: "accent" },
];
export const ordersCounted = (period: MarketingPeriod) => scale(412, period);

export const trackers: Tracker[] = [
  { name: "Meta Pixel", initial: "M", detail: "Last Purchase event 6 min ago", status: "healthy" },
  { name: "Google tag · GA4", initial: "G", detail: "3 purchases missed yesterday", status: "check" },
  { name: "TikTok Pixel", initial: "T", detail: "Coming soon", status: "soon" },
];

export const trackingEvents: TrackingEvent[] = [
  { id: "e1", time: "10:42", label: "Purchase · JFK-251502 · GHS 236", tracker: "Meta", received: true },
  { id: "e2", time: "10:42", label: "Purchase · JFK-251502 · GHS 236", tracker: "GA4", received: true },
  { id: "e3", time: "Sat", label: "Purchase · JFK-251482 · GHS 180", tracker: "GA4", received: false },
  { id: "e4", time: "Sat", label: "Purchase · JFK-251481 · GHS 260", tracker: "GA4", received: false },
  { id: "e5", time: "Sat", label: "Purchase · JFK-251480 · GHS 95", tracker: "GA4", received: false },
];

/** Editor props for a flow, or undefined. */
export function findFlowEditor(slug: string): (Omit<FlowEditorProps, "linkAs" | "preview"> & { slug: FlowSlug; tests: number; preview: Omit<FlowEditorProps["preview"], "cart"> & { cart: { title: string; note: string; image: string } } }) | undefined {
  const flow = findFlow(slug);
  if (!flow) return undefined;
  const f = flow.funnel;
  const on = flow.settings.enabled;
  const common = {
    slug: flow.slug,
    tests: flow.tests,
    backHref: "/admin/marketing",
    title: flow.name,
    status: on ? ({ label: `Live since ${sinceLabel(flow.since)}`, tone: "success" } as const) : ({ label: "Off", tone: "neutral" } as const),
    defaultValue: flow.settings,
    options: {
      quietHours: [
        { value: "21-08", label: "21:00 – 08:00 Accra" },
        { value: "22-07", label: "22:00 – 07:00 Accra" },
        { value: "off", label: "No quiet hours" },
      ],
      frequency: [
        { value: "1", label: "1 message / customer / day" },
        { value: "2", label: "2 messages / customer / day" },
      ],
      credit: [
        { value: "1", label: "1 day after a click" },
        { value: "7", label: "7 days after a click" },
        { value: "14", label: "14 days after a click" },
      ],
    },
    stats: {
      steps: [
        { label: "Enrolled", value: f.enrolled },
        { label: "Delivered", value: f.delivered },
        { label: "Clicked", value: f.clicked },
        { label: flow.slug === "payment-retry" ? "Paid" : "Ordered", value: f.ordered, goal: true },
      ],
      recovered: ghs(f.recovered),
      note: f.skipped ? `${f.skipped} carts skipped: no phone or email` : "Every failed payment had a phone number",
    },
  };

  if (flow.slug === "payment-retry") {
    return {
      ...common,
      summary: `${on ? "Live" : "Off"} · ${f.ordered} paid · ${ghs(f.recovered)} in 30 days`,
      trigger: {
        icon: "phoneAlert",
        title: "A MoMo payment fails or is ignored",
        mobileTitle: "A MoMo payment fails · wait {wait}",
        conditions: [
          { key: "wait", label: "Wait", options: ["5", "10", "30"].map((value) => ({ value, label: `${value} min` })) },
          { key: "method", label: "Mobile money only", short: "mobile money only" },
          { key: "amount", label: "Order value at least", short: "order ≥ {value}", options: ["0", "50", "100"].map((value) => ({ value, label: value === "0" ? "any" : `GHS ${value}` })) },
        ],
      },
      timing: "Sends after the wait · quiet hours off for payments",
      stops: ["They pay", "They cancel the order", "The order expires after 2 h"],
      stopsSummary: "Paid, cancelled or expired after 2 h",
      preview: {
        sample: { first_name: "Kojo", items: "Daily Probiotic" },
        cart: { title: "Daily Probiotic", note: "Order total GHS 180", image: "probiotic" },
        time: "14:06",
        footnote: "The link reopens the MoMo prompt for this order; paid orders count here for 1 day after a click.",
      },
    };
  }

  const minutes = ["15", "30", "60", "120"].map((value) => ({ value, label: `${value} min` }));
  return {
    ...common,
    summary: `${on ? "Live" : "Off"} · ${f.ordered} orders · ${ghs(f.recovered)} in 30 days`,
    trigger: {
      title: "A cart or checkout goes quiet",
      mobileTitle: "A cart goes quiet for {idle}",
      conditions: [
        { key: "idle", label: "Idle for", options: minutes },
        { key: "minCart", label: "Cart value at least", short: "Cart ≥ {value}", options: ["0", "30", "50", "100"].map((value) => ({ value, label: value === "0" ? "any" : `GHS ${value}` })) },
        { key: "contact", label: "We have a phone or email", short: "we have a phone or email" },
        { key: "quiet", label: "Not messaged in the last", short: "not messaged in {value}", options: ["1", "3", "7", "14"].map((value) => ({ value, label: `${value} days` })) },
      ],
    },
    timing: "Send right away · held during quiet hours",
    laterSteps: [
      { wait: "Then wait 24 h", title: "Follow-up email with reviews", note: "Coming soon" },
      { wait: "Then wait 72 h", title: "Last nudge with a one-time 5% code", note: "Coming soon · code expires after 48 h" },
    ],
    laterSummary: { title: "Steps 2 and 3", note: "Follow-up email and one-time code · coming soon" },
    stops: ["They place an order", "They unsubscribe", "Cart is emptied", "Everything sells out"],
    stopsSummary: "Order placed, unsubscribed, cart emptied or sold out",
    preview: {
      sample: { first_name: "Akua", items: "Greens Daily and Ashwagandha Calm", area: "East Legon" },
      cart: { title: "Greens Daily + 1 more", note: "Cart total GHS 236", image: "greens" },
      time: "10:42",
      footnote: "The link restores this exact cart on any phone for 14 days, and is tagged utm_source=recovery so the order counts here.",
    },
  };
}

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
function json<T>(form: FormData, key: string, fallback: T): T {
  try {
    return JSON.parse(text(form, key)) as T;
  } catch {
    return fallback;
  }
}

/** Editor save; `intent=test` also counts a test send. Returns false for an unknown flow. */
export function saveFlow(slug: string, form: FormData): boolean {
  const flow = findFlow(slug);
  if (!flow) return false;
  const previous = flow.settings;
  const channels = json<string[]>(form, "channels", previous.channels).filter((item): item is FlowChannel => ["whatsapp", "sms", "email"].includes(item));
  flow.settings = {
    enabled: text(form, "enabled") === "true",
    conditions: { ...previous.conditions, ...json<Record<string, string>>(form, "conditions", {}) },
    headline: text(form, "headline") || previous.headline,
    body: text(form, "body") || previous.body,
    button: text(form, "button") || previous.button,
    channels,
    quietHours: text(form, "quietHours") || previous.quietHours,
    frequency: text(form, "frequency") || previous.frequency,
    credit: text(form, "credit") || previous.credit,
  };
  if (text(form, "intent") === "test") flow.tests += 1;
  return true;
}
