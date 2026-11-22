"use server";

/*
 * Admin customer actions. Placeholders until the admin customers API exists: they read their
 * input and change nothing.
 */

/** Notes & activity composer: a staff-only note on the customer. */
export async function addCustomerNote(formData: FormData): Promise<void> {
  const customer = String(formData.get("customer") ?? "");
  const note = String(formData.get("note") ?? "").trim();
  if (!customer || !note) return;
  // TODO: save the note with the staff member's name.
}

/** Contact card "Show": log that a staff member revealed the customer's phone and email. */
export async function logCustomerContactReveal(customer: string): Promise<void> {
  if (!customer) return;
  // TODO: write an audit log entry (who, when, which customer).
}

/** Marketing consent switch: staff can only turn a channel off. */
export async function updateCustomerConsent(customer: string, channel: string, on: boolean): Promise<void> {
  if (!customer || !channel || on) return;
  // TODO: record the opt-out and stop messages on `channel`.
}

/** Tags card ×: remove a tag from the customer. */
export async function removeCustomerTag(formData: FormData): Promise<void> {
  const customer = String(formData.get("customer") ?? "");
  const tag = String(formData.get("tag") ?? "");
  if (!customer || !tag) return;
  // TODO: remove the tag (automatic tags like VIP may come back on the next order).
}
