import type { AutomationsPanelProps } from "./AutomationsPanel";

/** Paper sample flows (Jofak - Admin → Marketing). */
export const samplePanel: AutomationsPanelProps = {
  rules: "Quiet hours 21:00–08:00 · max 1 message per customer per day",
  automations: [
    {
      href: "/admin/marketing/abandoned-cart",
      name: "Abandoned cart reminder",
      icon: "cart",
      tint: "accent",
      status: { label: "Live", tone: "success" },
      description: "1 message, 1 hour after a cart goes quiet · WhatsApp, then SMS, then email",
      summary: "Live · 27 orders · GHS 6,840",
      funnel: [
        { label: "Enrolled", value: "245" },
        { label: "Delivered", value: "238" },
        { label: "Clicked", value: "81", note: "34%" },
        { label: "Ordered", value: "27 · GHS 6,840", compactLabel: "Ordered · GHS 6,840", compactValue: "27", goal: true },
      ],
    },
    {
      href: "/admin/marketing/payment-retry",
      name: "MoMo payment retry",
      icon: "phoneAlert",
      tint: "sun",
      status: { label: "Live", tone: "success" },
      description: "“Having trouble? Retry payment” 10 min after a failed or ignored MoMo prompt",
      summary: "Live · 31 paid · GHS 4,120",
      result: { value: "31 of 64 paid", note: "GHS 4,120 recovered" },
    },
  ],
  comingSoon: [
    { name: "Back in stock", note: "Coming soon · 38 waiting" },
    { name: "Win-back", note: "Coming soon · no order in 90 days" },
    { name: "Review request", note: "Coming soon · after delivery" },
  ],
  comingSoonNote: "Back in stock, win-back and review requests are coming soon",
};
