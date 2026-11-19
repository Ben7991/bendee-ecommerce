import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * RateTable (molecule): the "Area · Fee · Arrives" delivery table (Paper Content page →
 * Delivery & returns). A real table: the area is the row header, the fee is bold (brand green
 * when `free`), the time sits right-aligned. Narrow fixed columns on mobile.
 */
export interface RateRow {
  area: ReactNode;
  fee: ReactNode;
  arrives: ReactNode;
  /** Shows the fee in brand green ("Free"). */
  free?: boolean;
}

export interface RateTableProps extends Omit<ComponentProps<"table">, "children"> {
  rows: RateRow[];
  /** Read by screen readers. */
  caption: string;
  columns?: { area: string; fee: string; arrives: string };
}

const head = "py-3 text-left text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase";
const cell = "py-3 text-sm leading-sm md:py-3.5 md:text-base";

export function RateTable({
  rows,
  caption,
  columns = { area: "Area", fee: "Fee", arrives: "Arrives" },
  className,
  ...props
}: RateTableProps) {
  return (
    <div data-slot="rate-table" className={cn("overflow-hidden rounded-md border border-border-subtle", className)}>
      <table className="w-full border-collapse font-sans" {...props}>
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface-subtle">
          <tr className="border-b border-border-subtle">
            <th scope="col" className={cn(head, "pl-3.5 md:pl-5")}>
              {columns.area}
            </th>
            <th scope="col" className={cn(head, "w-16 md:w-30")}>
              {columns.fee}
            </th>
            <th scope="col" className={cn(head, "w-18 pr-3.5 text-right md:w-35 md:pr-5")}>
              {columns.arrives}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-border-subtle last:border-0">
              <th scope="row" className={cn(cell, "pl-3.5 text-left font-regular text-text md:pl-5")}>
                {row.area}
              </th>
              <td className={cn(cell, "font-semibold", row.free ? "text-success" : "text-text")}>{row.fee}</td>
              <td className={cn(cell, "pr-3.5 text-right text-text-secondary md:pr-5")}>{row.arrives}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
