import type { CheckoutSummaryTotals, OrderTimelineStep } from "@repo/ui/organisms";

import { appliedCode, orderTotals } from "./cart";

/*
 * Sample order for the static checkout screens (Paper "Jofak" → Checkout). There's no checkout
 * API yet; replace with the real checkout session (docs/02-cart-checkout.md) when it exists.
 */

export const checkoutSteps = ["Contact", "Delivery", "Payment", "Review & pay"];

export const orderNumber = "JFK-250184";

export const checkoutItems = [
  { id: "greens", name: "Daily Greens Powder", detail: "Lemon lime · 25 servings", price: "GHS 450", quantity: 1, tint: "sage" as const },
  { id: "ashwagandha", name: "Ashwagandha Tablets", detail: "Subscribe & save · every 30 days", price: "GHS 304", quantity: 1, tint: "amber" as const },
  { id: "energy", name: "Energy Capsules", detail: "30 capsules · GHS 320 each", price: "GHS 640", quantity: 2, tint: "lavender" as const },
];

export const itemCount = 4;

export const checkoutTotals: CheckoutSummaryTotals = {
  subtotalLabel: orderTotals.subtotalLabel,
  subtotal: orderTotals.subtotal,
  discountLabel: orderTotals.discountLabel,
  discount: orderTotals.discount,
  deliveryLabel: "Delivery · Standard",
  delivery: "Free",
  total: orderTotals.total,
  taxNote: orderTotals.taxNote,
  savings: orderTotals.savings,
};

export const soldOutNote = "Magnesium Bisglycinate is sold out and isn't in this order.";
export const checkoutCode = appliedCode;

export const assurances = [
  { icon: "shield" as const, label: "Payments secured by Paystack" },
  { icon: "returns" as const, label: "30-day returns on unopened products" },
];

export const contact = {
  detail: "Ama Mensah · +233 24 412 7781 · ama.mensah@example.com",
  compactDetail: "Ama Mensah · +233 24 412 7781",
};

export const deliveryDone = {
  detail: "14 Lagos Avenue, East Legon, Accra · Opposite the Shell filling station, blue gate",
  compactDetail: "14 Lagos Ave, East Legon, Accra",
  meta: "Standard · arrives tomorrow, Sat 14 Nov · Free",
  compactMeta: "Standard · tomorrow, Sat 14 Nov · Free",
};

export const paymentDone = {
  detail: "Mobile Money · +233 24 412 7781",
  compactDetail: "MTN MoMo · +233 24 412 7781",
};

export const regions = [
  { value: "greater-accra", label: "Greater Accra" },
  { value: "ashanti", label: "Ashanti" },
  { value: "western", label: "Western" },
];
export const cities = [
  { value: "accra", label: "Accra" },
  { value: "tema", label: "Tema" },
];
export const areas = [
  { value: "east-legon", label: "East Legon" },
  { value: "osu", label: "Osu" },
  { value: "airport-residential", label: "Airport Residential" },
];

export const addressDefaults = {
  region: "greater-accra",
  city: "accra",
  area: "east-legon",
  street: "14 Lagos Avenue",
  landmark: "Opposite the Shell filling station, blue gate",
  method: "standard",
};

export const wallet = {
  number: "24 412 7781",
  detected: { full: "MTN number detected · same as your contact number", short: "MTN number detected" },
};

export const momoPrompt = {
  amount: "GHS 1,254.60",
  number: "024 412 7781",
  timeLeft: "2:41 left",
  resendIn: "0:18",
};

export const timeline: OrderTimelineStep[] = [
  { label: "Order paid", time: "Today, 10:42", state: "done" },
  { label: "Packing", compactLabel: "Packing your order", time: "Today", state: "current" },
  { label: "Out for delivery", time: "Sat 14 Nov", state: "todo", hideOnMobile: true },
  { label: "Delivered", compactLabel: "Delivered by 6pm", time: "By 6pm, Sat 14 Nov", compactTime: "Sat 14 Nov", state: "todo" },
];

export const receipt = {
  delivery: {
    name: "Ama Mensah",
    phone: "+233 24 412 7781",
    address: "14 Lagos Avenue, East Legon, Accra",
    landmark: "Opposite the Shell filling station, blue gate",
    method: "Standard delivery · Free",
    short: "14 Lagos Ave, East Legon",
  },
  payment: {
    brand: "mtn" as const,
    label: "MoMo ···· 7781",
    amount: "GHS 1,254.60 paid",
    when: "today, 10:42",
    note: "Includes VAT & levies of GHS 225.40 · You saved GHS 425.40",
    short: "MTN MoMo ···· 7781",
  },
  itemsTitle: "In this order · 4 items",
  itemsShort: "4 items",
  totalsLine: "Subtotal GHS 1,394.00 · JOFAK10 −GHS 139.40 · Delivery free",
  total: "GHS 1,254.60",
};
