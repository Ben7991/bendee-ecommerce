"use server";

/**
 * Newsletter sign-up. Placeholder until the marketing/notifications service exists
 * (docs/06-seo-marketing.md): it validates the address and stores nothing.
 */
export async function subscribeToNewsletter(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
  // TODO: send to the newsletter provider once it is chosen.
}
