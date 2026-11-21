"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { saveFlow } from "../_content/admin-marketing";

/*
 * Admin marketing actions. They change the in-memory sample flows (see _content/admin-marketing).
 * TODO: call the messaging service once it exists.
 */

/** Flow editor save (and Send test, sent as `intent=test`), then reload the editor. */
export async function saveFlowAction(slug: string, formData: FormData): Promise<void> {
  const found = saveFlow(slug, formData);
  revalidatePath("/admin/marketing", "layout");
  if (!found) redirect("/admin/marketing");
  // `saved` remounts the form so it counts changes from the saved values.
  const test = formData.get("intent") === "test" ? "&test=sent" : "";
  redirect(`/admin/marketing/${slug}?saved=${Date.now()}${test}`);
}
