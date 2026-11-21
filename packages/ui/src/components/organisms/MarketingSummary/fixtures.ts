import type { MarketingSummaryProps } from "./MarketingSummary";

/** Paper sample figures (Jofak - Admin → Marketing). */
export const sampleSummary: MarketingSummaryProps = {
    revenue: { label: "Recovered revenue", value: "GHS 10,960", delta: "+18%", note: "58 orders saved by abandoned-cart and payment-retry messages", compactNote: "58 orders saved" },
    rate: { label: "Cart recovery rate", compactLabel: "Recovery rate", value: "9.4%", progress: 62, target: 53, ahead: true, note: "Target 8% · 27 of 286 carts", compactNote: "Above 8% target" },
    abandoned: { label: "Abandoned carts", compactLabel: "Abandoned", value: "286", note: "GHS 61,200 left in carts · 41 no contact", compactNote: "carts · 41 no contact" },
    consent: { label: "Marketing consent", value: "62%", note: "of visitors accept marketing cookies" },
  };
