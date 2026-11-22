import { redirect } from "next/navigation";

/** /admin/reports: the sales report first. */
export default function AdminReportsIndex() {
  redirect("/admin/reports/sales");
}
