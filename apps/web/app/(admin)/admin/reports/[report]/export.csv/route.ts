import { isReport, periodOf, reportCsv } from "../../../../../_content/admin-reports";

/** GET /admin/reports/[report]/export.csv?period=30 — the report's main table as CSV. */
export async function GET(request: Request, { params }: { params: Promise<{ report: string }> }) {
  const { report } = await params;
  if (!isReport(report)) return new Response("Not found", { status: 404 });
  const period = periodOf(new URL(request.url).searchParams.get("period") ?? undefined);
  return new Response(reportCsv(report, period), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="jofak-${report}-${period}d.csv"`,
    },
  });
}
