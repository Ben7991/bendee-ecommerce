import type { FlowEditorProps } from "./FlowEditor";

const minutes = [15, 30, 60, 120].map((value) => ({ value: String(value), label: `${value} min` }));

/** The abandoned cart flow from Paper (Jofak - Admin → Abandoned cart flow), for stories and tests. */
export const sampleFlow: FlowEditorProps = {
  backHref: "/admin/marketing",
  title: "Abandoned cart reminder",
  status: { label: "Live since 2 Sep", tone: "success" },
  summary: "Live · 27 orders · GHS 6,840 in 30 days",
  defaultValue: {
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
  preview: {
    sample: { first_name: "Akua", items: "Greens Daily and Ashwagandha Calm", area: "East Legon" },
    cart: { title: "Greens Daily + 1 more", note: "Cart total GHS 236" },
    time: "10:42",
    footnote: "The link restores this exact cart on any phone for 14 days, and is tagged utm_source=recovery so the order counts here.",
  },
  stats: {
    steps: [
      { label: "Enrolled", value: 245 },
      { label: "Delivered", value: 238 },
      { label: "Clicked", value: 81 },
      { label: "Ordered", value: 27, goal: true },
    ],
    recovered: "GHS 6,840",
    note: "41 carts skipped: no phone or email",
  },
};
