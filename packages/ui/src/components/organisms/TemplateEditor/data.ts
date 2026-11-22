import type { TemplateEditorProps } from "./TemplateEditor";

export const TEMPLATE_ARGS: TemplateEditorProps = {
  breadcrumb: "Notifications › Messages to customers",
  title: "Handed to courier",
  channel: "sms",
  channels: [
    { label: "SMS", href: "?channel=sms", active: true },
    { label: "Email", href: "?channel=email" },
    { label: "WhatsApp · soon", href: "#", soon: true },
  ],
  defaultValue: { enabled: true, body: "Hi {first_name}, your Jofak order {order_number} is on its way with {courier}. Track it: {tracking_link}" },
  defaultBody: "Hi {first_name}, your order {order_number} is on its way.",
  tokens: ["first_name", "order_number", "order_total", "courier", "tracking_link", "delivery_area", "store_phone"],
  sample: { first_name: "Efua", order_number: "JFK-251496", courier: "Swift Courier", tracking_link: "jfk.gh/t/8KQ2" },
  sender: "JOFAK",
  lastEdited: "Last edited by Kojo Ansah · 3 Nov",
  testTo: "024 412 7781",
  cancelHref: "/settings/notifications",
};
