/*
 * Which products a collection holds (Paper Jofak - Admin → Collection editor): shared by the
 * CollectionProductsCard (live count while editing) and the app (saved collections), so both
 * agree. Plain functions, safe on the server.
 */

export type RuleField = "tag" | "category" | "price" | "added" | "sale";

export interface CollectionRule {
  field: RuleField;
  /** Tags: several; category: a category label; price: max GHS; added: days; sale: "yes" | "no". */
  value: string[];
}

/** A product as rules see it. */
export interface RuleProduct {
  id: string;
  name: string;
  tags: string[];
  /** "Beauty from within › Collagen". */
  category: string;
  price: number;
  onSale: boolean;
  /** Days since it was added. */
  addedDaysAgo: number;
}

export type CollectionMode = "manual" | "rules";

/** Products a collection holds: the picked ones, or those matching any / all rules. */
export function collectionMatches<T extends RuleProduct>(products: T[], mode: CollectionMode, match: "any" | "all", rules: CollectionRule[], picked: string[]): T[] {
  if (mode === "manual") return products.filter((product) => picked.includes(product.id));
  const usable = rules.filter((rule) => rule.value.some((value) => value.trim() !== ""));
  if (usable.length === 0) return [];
  const test = (product: T, rule: CollectionRule) => {
    const [first = ""] = rule.value;
    switch (rule.field) {
      case "tag":
        return rule.value.some((tag) => product.tags.includes(tag.trim().toLowerCase()));
      case "category":
        return product.category === first || product.category.startsWith(`${first} ›`);
      case "price":
        return product.price <= Number(first);
      case "added":
        return product.addedDaysAgo <= Number(first);
      case "sale":
        return product.onSale === (first === "yes");
    }
  };
  return products.filter((product) => (match === "all" ? usable.every((rule) => test(product, rule)) : usable.some((rule) => test(product, rule))));
}
