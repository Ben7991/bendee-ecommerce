"use server";

/**
 * The Contact page's "Send us a message" form. Placeholder until support messages have a home
 * (helpdesk or the notifications service): it checks the required fields and stores nothing.
 */
export async function sendContactMessage(formData: FormData): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").replace(/\s/g, "");
  const message = String(formData.get("message") ?? "").trim();
  if (!name || !/^\d{9,10}$/.test(phone) || !message) return;
  // TODO: send to the support inbox once it exists.
}
