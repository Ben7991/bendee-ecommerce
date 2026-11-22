import type { MarketingMessage } from "./RecentMessages";

/** Paper sample messages (Jofak - Admin → Marketing → Recent messages). */
export const sampleMessages: MarketingMessage[] = [
  { id: "m1", customer: "Akua Sarpong", detail: "Cart · Greens Daily, Ashwagandha Calm", compactDetail: "WhatsApp · GHS 236", channel: "WhatsApp", amount: "GHS 236", status: { label: "Ordered · JFK-251502", compactLabel: "Ordered", tone: "success" } },
  { id: "m2", customer: "Kojo Appiah", detail: "MoMo prompt ignored · Daily Probiotic", compactDetail: "SMS · payment retry · GHS 180", channel: "SMS", amount: "GHS 180", status: { label: "Clicked · 4 min ago", compactLabel: "Clicked", tone: "lavender" } },
  { id: "m3", customer: "Esi Quartey", detail: "Cart · Magnesium Sleep Gummies × 2", compactDetail: "WhatsApp · GHS 320", channel: "WhatsApp", amount: "GHS 320", status: { label: "Delivered · 22 min", compactLabel: "Delivered", tone: "info" } },
  { id: "m4", customer: "Yaw Boakye", detail: "Cart · Collagen Glow · added 21:40", compactDetail: "SMS · GHS 210", channel: "SMS", amount: "GHS 210", status: { label: "Waiting · sends 08:00", compactLabel: "Sends 08:00", tone: "warning" } },
  { id: "m5", customer: "Abena Owusu", detail: "Cart · Energy B-Complex · Citrus", compactDetail: "Email · GHS 120", channel: "Email", amount: "GHS 120", status: { label: "Stopped · out of stock", compactLabel: "Stopped", tone: "neutral" } },
];
