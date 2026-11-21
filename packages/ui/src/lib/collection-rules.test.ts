import { collectionMatches, type RuleProduct } from "./collection-rules";

const products: RuleProduct[] = [
  { id: "a", name: "Greens", tags: ["skin"], category: "Beauty from within › Collagen", price: 140, onSale: false, addedDaysAgo: 10 },
  { id: "b", name: "Ashwagandha", tags: ["calm"], category: "Sleep & stress", price: 116, onSale: true, addedDaysAgo: 90 },
  { id: "c", name: "Energy", tags: ["hydration"], category: "Energy", price: 58, onSale: false, addedDaysAgo: 40 },
];

describe("collectionMatches", () => {
  it("matches any or all rules", () => {
    const rules = [
      { field: "tag" as const, value: ["skin", "hydration"] },
      { field: "sale" as const, value: ["yes"] },
    ];
    expect(collectionMatches(products, "rules", "any", rules, []).map((p) => p.id)).toEqual(["a", "b", "c"]);
    expect(collectionMatches(products, "rules", "all", [...rules, { field: "price", value: ["100"] }], [])).toEqual([]);
    expect(collectionMatches(products, "rules", "all", [{ field: "price", value: ["120"] }, { field: "added", value: ["60"] }], []).map((p) => p.id)).toEqual(["c"]);
    expect(collectionMatches(products, "rules", "any", [{ field: "category", value: ["Beauty from within"] }], []).map((p) => p.id)).toEqual(["a"]);
  });

  it("uses the picked products by hand, and nothing for empty rules", () => {
    expect(collectionMatches(products, "manual", "any", [], ["c", "a"]).map((p) => p.id)).toEqual(["a", "c"]);
    expect(collectionMatches(products, "rules", "any", [{ field: "tag", value: [] }], [])).toEqual([]);
  });
});
