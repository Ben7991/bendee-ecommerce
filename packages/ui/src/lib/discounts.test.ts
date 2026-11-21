import { checkoutPreview, describeDiscount, discountValueLabel, type DiscountRules } from "./discounts";

const rules: DiscountRules = {
  method: "code",
  code: "GREENS20",
  name: "",
  batch: null,
  type: "percentage",
  value: 20,
  cap: 60,
  scope: "products",
  targets: ["Greens Daily"],
  excludeSale: false,
  minSpend: null,
  eligibility: "everyone",
  totalUses: 200,
  perCustomer: 1,
  combine: false,
  startsAt: "2026-11-15T00:00",
  endsAt: "2026-11-30T23:59",
};

describe("discounts", () => {
  it("labels values", () => {
    expect(discountValueLabel({ type: "fixed", value: 50 })).toBe("GHS 50 off");
    expect(discountValueLabel({ type: "delivery", value: 0 })).toBe("Free delivery");
  });

  it("describes a code discount like Paper", () => {
    const summary = describeDiscount(rules);
    expect(`${summary.before}${summary.code}${summary.after}`).toBe(
      "20% off Greens Daily, up to GHS 60, for anyone with code GREENS20. Once per customer, 200 uses in total, until 30 Nov.",
    );
    expect(describeDiscount(rules, { short: true }).before).toBe("20% off Greens Daily, up to GHS 60. Once per customer, 200 uses, until 30 Nov.");
  });

  it("caps the checkout discount", () => {
    const preview = checkoutPreview(rules, { label: "Greens", price: 260 }, { label: "Delivery", fee: 25 });
    expect(preview.lines[1]!.amount).toBe(-52);
    expect(preview.total).toBe(233);
    expect(checkoutPreview({ ...rules, value: 50 }, { label: "Greens", price: 260 }, { label: "Delivery", fee: 25 }).total).toBe(225);
  });
});
