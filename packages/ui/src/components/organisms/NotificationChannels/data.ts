import type { NotificationChannel } from "./NotificationChannels";

export const CHANNELS: NotificationChannel[] = [
  { id: "sms", name: "SMS", compactName: "SMS · Arkesel", icon: "chat", detail: "Arkesel · sender JOFAK", compactDetail: "JOFAK · GHS 412.60 credit", tabletDetail: "Sender JOFAK · GHS 412.60 credit (~13,700 SMS)", row: { label: "Credit left", value: "GHS 412.60 · ~13,700 SMS" } },
  { id: "email", name: "Email", compactName: "Email · Resend", icon: "mail", detail: "Resend · from hello@jofak.com", compactDetail: "hello@jofak.com · verified", row: { label: "Domain", value: "jofak.com verified", tone: "brand" } },
  { id: "whatsapp", name: "WhatsApp", compactName: "WhatsApp", icon: "chat", detail: "Order updates on WhatsApp, with SMS as backup", compactDetail: "SMS backup after 5 min", soon: true },
];
