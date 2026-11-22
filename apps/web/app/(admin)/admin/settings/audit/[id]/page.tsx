import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { team } from "../../../../../_content/admin-team";
import { AuditView, type AuditFilters } from "../_view";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  return { title: `${team().audit.find((entry) => entry.id === id)?.title ?? "Entry"} · Audit log` };
}

/** /admin/settings/audit/[id] (Paper "Jofak - Admin" → Settings → Audit entry; the log with it selected from 1280px). */
export default async function AdminAuditEntryPage({ params, searchParams }: { params: Params; searchParams: Promise<AuditFilters> }) {
  const { id } = await params;
  if (!team().audit.some((entry) => entry.id === id)) notFound();
  return <AuditView filters={await searchParams} selectedId={id} entryPage />;
}
