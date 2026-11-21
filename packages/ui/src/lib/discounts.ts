/*
 * Discount rules shared by the admin discount editor (client) and the app's sample store (server):
 * the value label ("20% off"), the plain-words summary and the checkout preview maths.
 */

export type DiscountMethod = "code" | "automatic";
export type DiscountType = "percentage" | "fixed" | "delivery" | "bxgy";
export type DiscountScope = "order" | "products" | "collections" | "categories";
export type DiscountEligibility = "everyone" | "new" | "returning" | "vip";

export interface DiscountRules {
  method: DiscountMethod;
  /** The code customers type (code method), or the batch prefix ("AKOS-") with `batch`. */
  code: string;
  /** Automatic offers: the name shown at checkout ("Free delivery over GHS 300"). */
  name: string;
  /** Bulk codes: how many single-use codes share the prefix. */
  batch: number | null;
  type: DiscountType;
  /** Percent (percentage) or GHS (fixed); ignored for free delivery. */
  value: number;
  /** Percentage: the most it takes off, in GHS. */
  cap: number | null;
  scope: DiscountScope;
  /** Product, collection or category names, by scope. */
  targets: string[];
  excludeSale: boolean;
  minSpend: number | null;
  eligibility: DiscountEligibility;
  totalUses: number | null;
  perCustomer: number | null;
  combine: boolean;
  /** "2026-11-15T00:00" (datetime-local, Accra time). */
  startsAt: string;
  endsAt: string | null;
}

export const ELIGIBILITY_LABELS: Record<DiscountEligibility, string> = {
  everyone: "Everyone",
  new: "New customers",
  returning: "Returning customers",
  vip: "VIP segment",
};

const ghs = (amount: number) => `GHS ${amount.toLocaleString("en-GB")}`;

/** "30 Nov" from a datetime-local value. */
export function discountDay(value: string, year = false): string {
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", ...(year ? { year: "numeric" } : {}) });
}

/** "20% off", "GHS 50 off", "Free delivery", "Buy X get Y". */
export function discountValueLabel(rules: Pick<DiscountRules, "type" | "value">): string {
  if (rules.type === "percentage") return `${rules.value}% off`;
  if (rules.type === "fixed") return `${ghs(rules.value)} off`;
  if (rules.type === "delivery") return "Free delivery";
  return "Buy X get Y";
}

function list(names: string[]): string {
  if (names.length <= 2) return names.join(" and ");
  return `${names.length} items`;
}

/** What it applies to, for a sentence: "Greens Daily", "the whole order", "the Glow collection". */
export function discountTarget(rules: Pick<DiscountRules, "scope" | "targets">): string {
  if (rules.scope === "order" || rules.targets.length === 0) return "the whole order";
  if (rules.scope === "collections") {
    return rules.targets.length === 1 ? `the ${rules.targets[0]} collection` : `${rules.targets.length} collections`;
  }
  if (rules.scope === "categories") return rules.targets.length > 2 ? `${rules.targets.length} categories` : list(rules.targets);
  return rules.targets.length > 2 ? `${rules.targets.length} products` : list(rules.targets);
}

export interface DiscountSummary {
  /** Text before the code ("20% off Greens Daily, up to GHS 60, for anyone with code "). */
  before: string;
  /** The code, set in mono (code method only). */
  code?: string;
  /** Text after the code (". Once per customer, 200 uses in total, until 30 Nov."). */
  after: string;
  /** Stacking: "Doesn't stack with free delivery or other codes." */
  note: string;
}

/**
 * The editor's "In plain words" card. `short` (mobile) drops who it is for and "in total":
 * "20% off Greens Daily, up to GHS 60. Once per customer, 200 uses, until 30 Nov."
 */
export function describeDiscount(rules: DiscountRules, { short = false } = {}): DiscountSummary {
  const who =
    rules.eligibility === "everyone" ? "anyone" : rules.eligibility === "vip" ? "VIP customers" : ELIGIBILITY_LABELS[rules.eligibility].toLowerCase();
  let lead =
    rules.type === "delivery"
      ? `Free delivery${rules.scope === "order" ? "" : ` on ${discountTarget(rules)}`}`
      : `${discountValueLabel(rules)} ${discountTarget(rules)}`;
  if (rules.type === "percentage" && rules.cap) lead += `, up to ${ghs(rules.cap)}`;
  if (rules.minSpend) lead += `, on orders over ${ghs(rules.minSpend)}`;

  const limits = [
    rules.perCustomer === 1 ? "Once per customer" : rules.perCustomer ? `Up to ${rules.perCustomer} times per customer` : null,
    rules.method === "code" && rules.batch
      ? `${rules.batch} single-use codes`
      : rules.totalUses
        ? `${rules.totalUses} uses${short ? "" : " in total"}`
        : null,
    rules.endsAt ? `until ${discountDay(rules.endsAt)}` : null,
  ].filter(Boolean) as string[];
  const tail = limits.length ? `${limits.join(", ")}.` : "No limits on uses.";
  const capital = tail.charAt(0).toUpperCase() + tail.slice(1);

  const note = rules.combine
    ? "Stacks with other discounts at checkout."
    : rules.type === "delivery"
      ? "Doesn't stack with other discounts."
      : "Doesn't stack with free delivery or other codes.";

  if (short || rules.method === "automatic") {
    const auto = rules.method === "automatic" && !short ? `, applied automatically${who === "anyone" ? "" : ` for ${who}`}` : "";
    return { before: `${lead}${auto}. ${capital}`, after: "", note };
  }
  const code = rules.batch ? `${rules.code}••••` : rules.code || "your code";
  return { before: `${lead}, for ${who} with code `, code, after: `. ${capital}`, note };
}

export interface CheckoutLine {
  label: string;
  amount: number;
  /** The discount line (shown with the code chip, in brand green). */
  discount?: boolean;
}

/** The "At checkout" sample: one item and delivery, with the discount taken off. */
export function checkoutPreview(
  rules: DiscountRules,
  item: { label: string; price: number },
  delivery: { label: string; fee: number },
): { lines: CheckoutLine[]; total: number } {
  const eligible = rules.minSpend ? item.price >= rules.minSpend : true;
  let off = 0;
  if (eligible) {
    if (rules.type === "percentage") off = Math.round((item.price * rules.value) / 100);
    if (rules.type === "percentage" && rules.cap) off = Math.min(off, rules.cap);
    if (rules.type === "fixed") off = Math.min(rules.value, item.price);
    if (rules.type === "delivery") off = delivery.fee;
  }
  const lines: CheckoutLine[] = [
    { label: item.label, amount: item.price },
    { label: rules.method === "code" ? rules.code || "CODE" : rules.name || "Automatic", amount: -off, discount: true },
    { label: delivery.label, amount: delivery.fee },
  ];
  return { lines, total: item.price + delivery.fee - off };
}
