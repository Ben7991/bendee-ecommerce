import type { CartLineData, MiniCartTotals, OrderTotals } from "@repo/ui/organisms";

/*
 * Sample cart for the static cart screens (Paper "Jofak" → Cart). There's no cart API yet;
 * replace with the real cart (docs/02-cart-checkout.md) when it exists.
 */

export const cartLines: CartLineData[] = [
  {
    id: "greens",
    name: "Daily Greens Powder",
    href: "/products/daily-greens-powder",
    details: "Lemon lime · 25 servings · One-time purchase",
    compactDetails: "Lemon lime · 25 servings · One-time",
    unitPrice: 450,
    compareAtUnitPrice: 520,
    quantity: 1,
    lineTotal: 450,
    compareAtLineTotal: 520,
    tint: "sage",
    action: { label: "Switch to subscribe & save 20%", href: "/products/daily-greens-powder?plan=subscribe" },
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha Tablets",
    href: "/products/ashwagandha-tablets",
    details: "120 tablets · Subscribe & save 20% · Every 30 days",
    compactDetails: "120 tablets · Subscribe & save · Every 30 days",
    unitPrice: 304,
    compareAtUnitPrice: 380,
    quantity: 1,
    lineTotal: 304,
    compareAtLineTotal: 380,
    tint: "amber",
    action: { label: "Change frequency", href: "/account/subscriptions", inMiniCart: true },
  },
  {
    id: "energy",
    name: "Energy Capsules",
    href: "/products/energy-capsules",
    details: "30 capsules · One-time purchase",
    compactDetails: "30 capsules · One-time · GHS 320 each",
    unitPrice: 320,
    compareAtUnitPrice: 390,
    quantity: 2,
    lineTotal: 640,
    compareAtLineTotal: 780,
    tint: "lavender",
    action: { label: "Switch to subscribe & save 20%", href: "/products/energy-capsules?plan=subscribe" },
  },
  {
    id: "magnesium",
    name: "Magnesium Bisglycinate",
    href: "/products/magnesium-bisglycinate",
    details: "",
    unitPrice: 340,
    quantity: 1,
    lineTotal: 0,
    tint: "sage",
    soldOut: true,
    action: { label: "Notify me when it's back", href: "/products/magnesium-bisglycinate#notify", inMiniCart: true },
  },
];

export const cartCount = cartLines.length;

export const orderTotals: OrderTotals = {
  subtotalLabel: "Subtotal · 4 items",
  subtotal: "GHS 1,394.00",
  discountLabel: "Discount (JOFAK10)",
  discount: "− GHS 139.40",
  delivery: "Free",
  total: "GHS 1,254.60",
  taxNote: "Includes VAT & levies of GHS 225.40",
  savings: "You save GHS 425.40",
};

export const miniCartTotals: MiniCartTotals = {
  subtotalLabel: "Subtotal · 4 items",
  subtotal: "GHS 1,394.00",
  discountLabel: "Discount (JOFAK10)",
  discount: "− GHS 139.40",
  deliveryLabel: "Delivery · East Legon, tomorrow",
  delivery: "Free",
  total: "GHS 1,254.60",
  taxNote: "Includes VAT & levies of GHS 225.40",
};

export const appliedCode = { code: "JOFAK10", description: "10% off order" };

export const delivery = {
  location: "Accra · East Legon",
  detail: "Standard delivery · arrives tomorrow, Sat 14 Nov",
};

export const priceDrop = {
  title: "Good news — a price dropped since you added it",
  compactTitle: "Good news — a price dropped",
  text: "Energy Capsules is now GHS 320 (was GHS 390). Your total has been updated.",
  compactText: "Energy Capsules is now GHS 320 (was GHS 390). Your total is updated.",
};

/** "Complete your routine" under the cart. */
export const routineProductIds = ["nmnh", "probiotic"];

/** "Popular right now" in the empty mini-cart. */
export const miniCartSuggestions = [
  { id: "ashwagandha", name: "Ashwagandha Tablets", href: "/products/ashwagandha-tablets", meta: "★ 4.8 · GHS 380", tint: "amber" as const },
  { id: "energy", name: "Energy Capsules", href: "/products/energy-capsules", meta: "★ 4.9 · GHS 320", tint: "lavender" as const },
  { id: "greens", name: "Daily Greens Powder", href: "/products/daily-greens-powder", meta: "★ 4.9 · GHS 450", tint: "sage" as const },
];
