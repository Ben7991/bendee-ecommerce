import { redirect } from "next/navigation";

import { firstPageSlug } from "../../../../_content/admin-content";

/** /admin/content/pages: open the page with draft changes, or the first page. */
export default function AdminContentPagesIndex() {
  redirect(`/admin/content/pages/${firstPageSlug()}`);
}
