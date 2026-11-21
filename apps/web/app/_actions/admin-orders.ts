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

/** Order detail primary action: start processing, mark packed, hand to courier, mark delivered. */
export async function advanceOrder(formData: FormData): Promise<void> {
  const order = String(formData.get("order") ?? "");
  const intent = String(formData.get("intent") ?? "");
  if (!order || !intent) return;
  // TODO: move the order to the next fulfilment step.
}

/** Review flag: "Mark as reviewed". */
export async function markOrderReviewed(formData: FormData): Promise<void> {
  const order = String(formData.get("order") ?? "");
  if (!order) return;
  // TODO: clear the risk flag and log who reviewed it.
}

/** Activity composer: a staff note, optionally shown to the customer. */
export async function addOrderNote(formData: FormData): Promise<void> {
  const order = String(formData.get("order") ?? "");
  const note = String(formData.get("note") ?? "").trim();
  const visible = formData.get("visible") === "on";
  if (!order || !note) return;
  void visible;
  // TODO: save the note and, if visible, show it on the customer's order page.
}

/** Delivery card: the external courier's tracking number. */
export async function saveCourierTracking(formData: FormData): Promise<void> {
  const order = String(formData.get("order") ?? "");
  const tracking = String(formData.get("tracking") ?? "").trim();
  if (!order) return;
  void tracking;
  // TODO: store the tracking number.
}

/** Customer card: revealing full contact details is audit-logged (PLT-SEC-05). */
export async function logContactReveal(order: string): Promise<void> {
  if (!order) return;
  // TODO: write an audit-log entry for the signed-in staff member.
}

/** Cancel order dialog: reason, restock and notify switches. */
export async function cancelAdminOrder(formData: FormData): Promise<void> {
  const order = String(formData.get("order") ?? "");
  const reason = String(formData.get("reason") ?? "");
  if (!order || !reason) return;
  // TODO: cancel, restock if `restock` is on, text the customer if `notify` is on, refund if paid.
}

/** Refund dialog: `line` = id:qty:restock, optional `delivery`, `reason` and `amount`. */
export async function refundAdminOrder(formData: FormData): Promise<void> {
  const order = String(formData.get("order") ?? "");
  const reason = String(formData.get("reason") ?? "");
  const amount = Number(formData.get("amount"));
  if (!order || !reason || !(amount > 0)) return;
  // TODO: refund via Paystack to the original method; amounts over the threshold go for approval.
}
