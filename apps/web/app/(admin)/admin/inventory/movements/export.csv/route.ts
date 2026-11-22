import { findMovements, movementViews, type MovementType } from "../../../../../_content/admin-inventory";

/** One CSV field: quoted when it holds a comma, quote or line break. */
const field = (value: string | number) => {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

/**
 * GET /admin/inventory/movements/export.csv: the stock history the Movements tab shows, with the
 * same type, period and search filters, as a CSV download.
 */
export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const type = movementViews.find((view) => view.type === params.get("type"))?.type as MovementType | undefined;
  const period = params.get("period") ?? "7d";
  const days = findMovements({ type, q: params.get("q") ?? undefined, period, page: 2 });

  const rows = [
    ["Day", "Time", "Variant", "Change", "Type", "On hand before", "On hand after", "Reference", "Note", "By"],
    ...days.flatMap((day) =>
      day.movements.map((movement) => [
        day.label,
        movement.time,
        movement.name,
        movement.change > 0 ? `+${movement.change}` : String(movement.change),
        movement.type.label,
        movement.before,
        movement.after,
        movement.reference?.label ?? "",
        (movement.note ?? "").replace(/^“|”$/g, ""),
        movement.by,
      ]),
    ),
  ];

  const csv = rows.map((row) => row.map(field).join(",")).join("\r\n");
  return new Response(`${csv}\r\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="stock-movements-${period}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
