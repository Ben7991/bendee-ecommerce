import type { Metadata } from "next";

import { AuditView, type AuditFilters } from "./_view";

export const metadata: Metadata = { title: "Audit log" };

/** /admin/settings/audit (Paper "Jofak - Admin" → Settings → Audit log). */
export default async function AdminAuditPage({ searchParams }: { searchParams: Promise<AuditFilters> }) {
  return <AuditView filters={await searchParams} />;
}
