"use server";

/*
 * Account actions. Placeholders until the account and orders APIs exist
 * (docs/03-customer-account.md): they read the form and change nothing.
 */

export async function signOut(): Promise<void> {
  // TODO: end the session once auth is wired up.
}

/** Cancel order (ACC-FR cancellations): only before packing starts. */
export async function cancelOrder(formData: FormData): Promise<void> {
  const order = String(formData.get("order") ?? "");
  const reason = String(formData.get("reason") ?? "");
  if (!order || !reason) return;
  // TODO: cancel the order and refund the payment.
}

/** Return request (Phase 2): the items, reasons and photos. */
export async function submitReturn(formData: FormData): Promise<void> {
  const items = formData.getAll("items").map(String);
  if (items.length === 0) return;
  // TODO: create the return.
}
