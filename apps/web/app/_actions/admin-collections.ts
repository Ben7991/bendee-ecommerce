"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createCollection, saveCollection } from "../_content/admin-collections";

/*
 * Admin collection actions. They change the in-memory sample collections (see
 * _content/admin-collections). TODO: call the catalog API once it exists.
 */

/** Collection editor: save every field, then reload the editor (at the new address if the slug changed). */
export async function saveCollectionAction(slug: string, formData: FormData): Promise<void> {
  const saved = saveCollection(slug, formData);
  revalidatePath("/admin/collections", "layout");
  // `saved` remounts the form so it counts changes from the saved values.
  redirect(saved ? `/admin/collections/${saved}?saved=${Date.now()}` : "/admin/collections");
}

/** New collection: an empty hand-picked draft, opened in the editor. */
export async function createCollectionAction(): Promise<void> {
  const slug = createCollection();
  revalidatePath("/admin/collections", "layout");
  redirect(`/admin/collections/${slug}`);
}
