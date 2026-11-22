import { auditCsv, auditEntries } from "../../../../../_content/admin-team";

/** /admin/settings/audit/export.csv — the filtered audit log as CSV. */
export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const csv = auditCsv(auditEntries({ q: params.get("q") ?? undefined, who: params.get("who") ?? undefined, area: params.get("area") ?? undefined, days: params.get("days") ?? undefined }));
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="jofak-audit-log.csv"' } });
}
