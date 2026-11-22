"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createDiscount, extendDiscount, saveDiscount } from "../_content/admin-discounts";

/*
 * Admin discount actions. They change the in-memory sample discounts (see
 * _content/admin-discounts). TODO: call the promotions API once it exists.
 */

/** Editor save (and Pause / Duplicate, sent as `intent`), then reload the editor it should show. */
export async function saveDiscountAction(id: string, formData: FormData): Promise<void> {
  const open = saveDiscount(id, formData);
  revalidatePath("/admin/discounts", "layout");
  // `saved` remounts the form so it counts changes from the saved values.
  redirect(open ? `/admin/discounts/${open}?saved=${Date.now()}` : "/admin/discounts");
}

/** Create discount: a paused draft, opened in the editor. */
export async function createDiscountAction(): Promise<void> {
  const id = createDiscount();
  revalidatePath("/admin/discounts", "layout");
  redirect(`/admin/discounts/${id}`);
}

/** Mobile ending-soon card: one more week. */
export async function extendDiscountAction(id: string): Promise<void> {
  extendDiscount(id);
  revalidatePath("/admin/discounts", "layout");
}
