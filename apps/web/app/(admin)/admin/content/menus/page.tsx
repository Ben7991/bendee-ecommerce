import { redirect } from "next/navigation";

/** /admin/content/menus: the header menu first. */
export default function AdminContentMenusIndex() {
  redirect("/admin/content/menus/header");
}
