"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  addHomeBlock,
  createPage,
  publishHome,
  publishMenu,
  publishPage,
  reorderHome,
  saveHomeBlock,
  saveMenu,
  savePage,
  type MenuKind,
} from "../_content/admin-content";

/*
 * Admin content actions. Editors autosave drafts here; Publish copies drafts live. They change
 * the in-memory sample content (see _content/admin-content). TODO: call the CMS once it exists.
 */

const refresh = () => revalidatePath("/admin/content", "layout");

export async function saveHomeBlockAction(json: string): Promise<void> {
  saveHomeBlock(json);
  refresh();
}

export async function reorderHomeAction(ids: string[]): Promise<void> {
  reorderHome(ids);
  refresh();
}

export async function addHomeBlockAction(): Promise<void> {
  const id = addHomeBlock();
  refresh();
  redirect(`/admin/content?block=${id}`);
}

export async function publishHomeAction(): Promise<void> {
  publishHome();
  refresh();
}

export async function savePageAction(slug: string, json: string): Promise<void> {
  savePage(slug, json);
  refresh();
}

export async function createPageAction(): Promise<void> {
  const slug = createPage();
  refresh();
  redirect(`/admin/content/pages/${slug}`);
}

export async function publishPageAction(slug: string): Promise<void> {
  publishPage(slug);
  refresh();
}

export async function saveMenuAction(kind: MenuKind, json: string): Promise<void> {
  saveMenu(kind, json);
  refresh();
}

export async function publishMenuAction(kind: MenuKind): Promise<void> {
  publishMenu(kind);
  refresh();
}
