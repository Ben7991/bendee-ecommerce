"use server";

/*
 * Admin catalog actions. Placeholders until the catalog API exists
 * (docs/04-admin-catalog-inventory.md): they read the form and change nothing.
 */

/** Products bulk bar: archive, set to draft or set active. */
export async function bulkUpdateProducts(formData: FormData): Promise<void> {
  const intent = String(formData.get("intent") ?? "");
  const products = formData.getAll("product").map(String);
  if (!intent || products.length === 0) return;
  // TODO: apply `intent` to `products`.
}

/** Category editor: name, slug, parent, description, active and an optional banner file. */
export async function saveCategory(formData: FormData): Promise<void> {
  const category = String(formData.get("category") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!category || !name) return;
  // TODO: save the category.
}

/** Category tree drag and drop: the new order of one parent's children. */
export async function reorderCategories(parentId: string | null, orderedIds: string[]): Promise<void> {
  if (orderedIds.length === 0) return;
  void parentId;
  // TODO: store the order (it's the store menu order).
}

/** Brand editor: save, remove the logo or delete (only when no products use it). */
export async function saveBrand(formData: FormData): Promise<void> {
  const brand = String(formData.get("brand") ?? "");
  const intent = String(formData.get("intent") ?? "save");
  if (!brand) return;
  void intent;
  // TODO: save, remove the logo or delete the brand.
}

/** Product editor: everything in the form (details, media order and files, variants, SEO, status, organisation). */
export async function saveProduct(formData: FormData): Promise<void> {
  const product = String(formData.get("product") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!product || !name) return;
  // TODO: save the product; prices arrive as `price:<variant>` and `was:<variant>`.
}
