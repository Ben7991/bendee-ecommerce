"use server";

/*
 * Admin order actions. Placeholders until the admin orders API exists
 * (docs/04-admin-catalog-inventory.md): they read the form and change nothing.
 */

/** Bulk bar on /admin/orders: print pick lists, mark packed or start processing. */
export async function bulkUpdateOrders(formData: FormData): Promise<void> {
  const intent = String(formData.get("intent") ?? "");
  const orders = formData.getAll("order").map(String);
  if (!intent || orders.length === 0) return;
  // TODO: apply `intent` to `orders` once the admin API is wired up.
}
