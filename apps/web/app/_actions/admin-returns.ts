"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { advanceReturn } from "../_content/admin-returns";

/*
 * Admin return actions. They move the in-memory sample returns along (see _content/admin-returns)
 * and refresh Returns and Inventory. TODO: call the returns API (and the payment provider for
 * refunds) once it exists, with the signed-in staff member.
 */

/** A step on a return, from the list (one-click) or the return page (with the decision). */
export async function updateReturn(formData: FormData): Promise<void> {
  const id = String(formData.get("return") ?? "");
  const intent = String(formData.get("intent") ?? "");
  if (id && intent) {
    advanceReturn({
      id,
      intent,
      method: String(formData.get("method") ?? "") || undefined,
      includeFee: formData.get("deliveryFee") === "on",
      message: String(formData.get("message") ?? "").trim() || undefined,
    });
    revalidatePath("/admin/returns", "layout");
    revalidatePath("/admin/inventory", "layout");
  }
  const returnTo = String(formData.get("returnTo") ?? "");
  if (returnTo.startsWith("/admin/returns")) redirect(returnTo);
}
