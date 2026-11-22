import type { OrderSource } from "./SourceBreakdown";

/** Paper sample sources (Jofak - Admin → Marketing → Orders by source). */
export const sampleSources: OrderSource[] = [
  { label: "WhatsApp shares", share: 31, tone: "primary" },
  { label: "Instagram & Facebook ads", share: 24, tone: "brand" },
  { label: "Google search", share: 18, tone: "strong" },
  { label: "Direct", share: 13, tone: "soft" },
  { label: "Recovery messages", share: 14, tone: "accent" },
];
