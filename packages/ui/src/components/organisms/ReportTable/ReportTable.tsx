import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { StatusChip, type StatusChipProps } from "../../atoms";
import { REPORT_FILL, type ReportTone } from "../../molecules";

export interface ReportColumn {
  key: string;
  label: string;
  /** A width class ("w-20"); the first column grows. */
  width?: string;
  align?: "left" | "right";
  /** Drop the column below 1440px (tablet keeps the rest). */
  wide?: boolean;
}

export interface ReportCellValue {
  text?: ReactNode;
  tone?: "strong" | "muted" | "error" | "warning" | "brand";
  /** A bar before the text, 0–100. */
  bar?: number;
  barTone?: ReportTone;
  chip?: { label: string; tone: NonNullable<StatusChipProps["tone"]>; dashed?: boolean };
  /** A button or link. */
  action?: ReactNode;
  /** Monospace (codes, rates). */
  mono?: boolean;
  /** Struck through (an ended rate). */
  strike?: boolean;
}

export type ReportCell = ReactNode | ReportCellValue;

export interface ReportRow {
  id: string;
  /** First column: title, line under it, and optionally a tinted thumb, a dot or mono text. */
  lead: { title: ReactNode; sub?: ReactNode; thumb?: string; dot?: ReportTone; mono?: boolean; muted?: boolean; subTone?: "warning" };
  cells: Record<string, ReportCell>;
  /** Tinted row: citrus (problem), sun (worth a look) or sage (the one being edited). */
  tone?: "error" | "warning" | "selected";
  /** Makes the row a link (to edit it). */
  href?: string;
  /** Only shown from 1280px (a detail row the smaller layouts leave out). */
  wide?: boolean;
  /** Mobile: the value on the right and the line under the title. */
  mobile?: { value?: ReactNode; meta?: { text: ReactNode; tone?: "strong" | "error" | "warning" | "brand" }[]; action?: ReactNode };
}

const TEXT = { strong: "font-semibold text-text", muted: "text-text-muted", error: "font-semibold text-error", warning: "font-semibold text-warning-text", brand: "font-semibold text-brand" } as const;
const THUMB: Record<string, string> = { sage: "bg-sage-100", lavender: "bg-tint-lavender", amber: "bg-tint-amber", citrus: "bg-tint-citrus", sun: "bg-tint-sun" };
const ROW_TONE = { error: "bg-tint-citrus/40", warning: "bg-tint-sun", selected: "bg-sage-50" } as const;

function isValue(cell: ReportCell): cell is ReportCellValue {
  return typeof cell === "object" && cell !== null && !("$$typeof" in (cell as object)) && !Array.isArray(cell);
}

function Cell({ cell }: { cell: ReportCell }) {
  if (!isValue(cell)) return <>{cell}</>;
  return (
    <span className="inline-flex items-center gap-2">
      {cell.bar !== undefined && (
        <span aria-hidden className="flex h-1.5 w-22.5 shrink-0 rounded-full bg-surface-subtle">
          <span className={cn("rounded-full", REPORT_FILL[cell.barTone ?? "brand"])} style={{ width: `${Math.max(0, Math.min(100, cell.bar))}%` }} />
        </span>
      )}
      {cell.chip && (
        <StatusChip tone={cell.chip.tone} className={cn("px-2 py-0.5 text-xs leading-4.5", cell.chip.dashed && "border border-dashed border-border bg-transparent")}>
          {cell.chip.label}
        </StatusChip>
      )}
      {cell.text !== undefined && <span className={cn(cell.tone ? TEXT[cell.tone] : undefined, cell.mono && "font-mono", cell.strike && "line-through")}>{cell.text}</span>}
      {cell.action}
    </span>
  );
}

/**
 * ReportTable (organism): a report table in a card (Paper Jofak - Admin → Reports: Product
 * performance, Running low, Discount performance, By month for filing…): title, line under it, a
 * link, small-caps column heads and rows whose cells are text, bars, chips or buttons. Problem
 * rows are tinted. `wide` columns drop below 1440px; mobile turns each row into a title with a
 * value and one line of details (`mobile`).
 */
export interface ReportTableProps extends Omit<ComponentProps<"section">, "title"> {
  linkAs?: LinkComponent;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  columns: ReportColumn[];
  rows: ReportRow[];
  tone?: "plain" | "muted";
  emptyMessage?: string;
  /** Small print under the rows. */
  footer?: ReactNode;
}

export function ReportTable({ linkAs: LinkAs = "a", title, description, action, columns, rows, tone = "plain", emptyMessage = "Nothing here for this period.", footer, className, ...props }: ReportTableProps) {
  const [lead, ...rest] = columns;
  const head = "text-11 leading-3.5 font-semibold tracking-eyebrow text-text-muted uppercase";
  return (
    <section
      data-slot="report-table"
      className={cn(
        "flex min-w-0 flex-col rounded-18 p-4 font-sans md:rounded-lg md:px-6 md:pt-5.5 md:pb-3",
        tone === "muted" ? "bg-surface-subtle" : "border border-border-subtle",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3 pb-3 md:items-end">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="text-base leading-5 font-semibold tracking-compact text-text md:text-17 md:leading-6">{title}</h2>
          {description && <p className="hidden text-sm leading-4.5 text-text-muted md:block">{description}</p>}
        </div>
        {action && <div className="shrink-0 text-sm leading-4.5 font-semibold text-brand">{action}</div>}
      </div>

      {rows.length === 0 && <p className="border-t border-border-subtle py-8 text-center text-sm leading-4.5 text-text-muted">{emptyMessage}</p>}

      {/* Mobile rows. */}
      <ul className="flex flex-col md:hidden">
        {rows.map((row) => (
          <li
            key={row.id}
            className={cn("flex flex-col gap-1 border-t border-border-subtle py-3", row.wide && "hidden", row.tone && cn("-mx-2.5 my-0.5 rounded-sm border-t-0 px-2.5 py-2.5", ROW_TONE[row.tone]), row.tone === "selected" && "border-l-3 border-l-primary")}
          >
            <span className="flex items-start justify-between gap-3">
              <span className={cn("flex min-w-0 items-center gap-2.5 text-14 leading-5 font-semibold", row.lead.muted ? "text-text-secondary" : "text-text", row.lead.mono && "font-mono")}>
                {row.lead.dot && <span aria-hidden className={cn("size-2 shrink-0 rounded-3", REPORT_FILL[row.lead.dot])} />}
                {row.href ? <LinkAs href={row.href}>{row.lead.title}</LinkAs> : row.lead.title}
              </span>
              {row.mobile?.value !== undefined && <span className="shrink-0 text-14 leading-5 font-semibold text-text">{row.mobile.value}</span>}
              {row.mobile?.action}
            </span>
            {row.mobile?.meta ? (
              <span className={cn("flex flex-wrap gap-x-2 text-xs leading-xs text-text-muted", row.lead.dot && "pl-4.5")}>
                {row.mobile.meta.map((item, index) => (
                  <span key={index} className={item.tone ? TEXT[item.tone] : undefined}>
                    {item.text}
                  </span>
                ))}
              </span>
            ) : (
              row.lead.sub && <span className="text-xs leading-xs text-text-muted">{row.lead.sub}</span>
            )}
          </li>
        ))}
      </ul>

      {/* Tablet and desktop. */}
      {rows.length > 0 && (
        <table className="hidden w-full border-collapse md:table">
          <thead>
            <tr className="border-b border-border-subtle">
              <th scope="col" className={cn(head, "py-2 pr-3 text-left")}>
                {lead?.label}
              </th>
              {rest.map((column) => (
                <th key={column.key} scope="col" className={cn(head, "py-2 pl-3", column.width, column.align === "right" ? "text-right" : "text-left", column.wide && "hidden xl:table-cell")}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={cn("border-b border-border-subtle last:border-b-0", row.wide && "hidden xl:table-row", row.tone && ROW_TONE[row.tone])}>
                <td className={cn("py-2.5 pr-3", row.tone && "rounded-l-sm pl-2.5", row.tone === "selected" && "border-l-3 border-l-primary")}>
                  <span className="flex items-center gap-3">
                    {row.lead.thumb && <span aria-hidden className={cn("size-9 shrink-0 rounded-10", THUMB[row.lead.thumb] ?? "bg-surface")} />}
                    {row.lead.dot && <span aria-hidden className={cn("size-2.5 shrink-0 rounded-3", REPORT_FILL[row.lead.dot])} />}
                    <span className="flex min-w-0 flex-col">
                      <span className={cn("text-14 leading-5 font-semibold", row.lead.muted ? "text-text-secondary" : "text-text", row.lead.mono && "font-mono font-semibold tracking-code")}>
                        {row.href ? (
                          <LinkAs href={row.href} aria-current={row.tone === "selected" ? "page" : undefined} className="hover:underline">
                            {row.lead.title}
                          </LinkAs>
                        ) : (
                          row.lead.title
                        )}
                      </span>
                      {row.lead.sub && <span className={cn("text-xs leading-xs", row.lead.subTone === "warning" ? "text-warning-text" : "text-text-muted")}>{row.lead.sub}</span>}
                    </span>
                  </span>
                </td>
                {rest.map((column, index) => (
                  <td
                    key={column.key}
                    className={cn(
                      "py-2.5 pl-3 text-sm leading-4.5 text-text-secondary",
                      column.width,
                      column.align === "right" ? "text-right" : "text-left",
                      column.wide && "hidden xl:table-cell",
                      row.tone && index === rest.length - 1 && "rounded-r-sm pr-2.5",
                    )}
                  >
                    <Cell cell={row.cells[column.key]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {footer && <div className="pt-2 pb-1 text-xs leading-xs text-text-muted md:pb-2">{footer}</div>}
    </section>
  );
}
