"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { inventoryStaff, recordAdjustment, recordReceipt } from "../_content/admin-inventory";

/*
 * Admin inventory actions. They change the in-memory sample store (see _content/admin-inventory),
 * refresh the inventory pages and close the panel by going back to the list it opened from.
 * TODO: call the inventory API once it exists, with the signed-in staff member.
 */

const numberOf = (value: FormDataEntryValue | null) => {
  const parsed = Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

/** Refresh the figures, lists and history, then only ever send people back into the inventory pages. */
function done(formData: FormData): never {
  revalidatePath("/admin/inventory", "layout");
  const returnTo = String(formData.get("returnTo") ?? "");
  redirect(returnTo.startsWith("/admin/inventory") ? returnTo : "/admin/inventory");
}

/** Receive stock: a supplier delivery, one `quantity:<id>` / `cost:<id>` pair per line. */
export async function receiveStock(formData: FormData): Promise<void> {
  const lines = [...formData.keys()]
    .filter((key) => key.startsWith("quantity:"))
    .map((key) => {
      const variantId = key.slice("quantity:".length);
      return { variantId, quantity: Math.floor(numberOf(formData.get(key))), unitCost: numberOf(formData.get(`cost:${variantId}`)) };
    })
    .filter((line) => line.quantity > 0);
  if (lines.length > 0) {
    recordReceipt({
      supplier: String(formData.get("supplier") ?? "") || undefined,
      invoice: String(formData.get("invoice") ?? "").trim() || undefined,
      lines,
      by: inventoryStaff,
    });
  }
  done(formData);
}

/** Adjust stock: remove or add units with a reason, or set a counted level. */
export async function adjustStock(formData: FormData): Promise<void> {
  const variantId = String(formData.get("variant") ?? "");
  const mode = String(formData.get("mode") ?? "");
  if (variantId && (mode === "remove" || mode === "add" || mode === "count")) {
    recordAdjustment({
      variantId,
      mode,
      quantity: Math.floor(numberOf(formData.get("quantity"))),
      counted: Math.floor(numberOf(formData.get("counted"))),
      reason: String(formData.get("reason") ?? ""),
      order: String(formData.get("order") ?? "") || undefined,
      note: String(formData.get("note") ?? "").trim() || undefined,
      by: inventoryStaff,
    });
  }
  done(formData);
}
