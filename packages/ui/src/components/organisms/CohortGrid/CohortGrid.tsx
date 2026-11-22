import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

export interface CohortRow {
  /** "June 2026"; mobile shows `compactLabel` ("Jun"). */
  label: string;
  compactLabel: string;
  /** "182 customers". */
  sub: string;
  /** Percent who came back in month 1, 2…; null where the month hasn't happened. */
  values: (number | null)[];
}

/** Darker green for stronger retention. */
function shade(value: number) {
  if (value >= 30) return "bg-primary text-on-primary";
  if (value >= 27) return "bg-brand text-on-primary";
  if (value >= 22) return "bg-evergreen-500 text-on-primary";
  if (value >= 18) return "bg-evergreen-300 text-text";
  if (value >= 15) return "bg-sage-200 text-text";
  return "bg-sage-100 text-text";
}

/**
 * CohortGrid (organism): retention by first-order month (Paper Jofak - Admin → Reports →
 * Customers → Do customers come back?): one row per cohort, one cell per month after the first
 * order, shaded darker the more customers came back; months still to come are dashed. Mobile
 * shortens the labels and drops the "%".
 */
export interface CohortGridProps extends Omit<ComponentProps<"section">, "title"> {
  title: ReactNode;
  description?: ReactNode;
  compactDescription?: ReactNode;
  rows: CohortRow[];
  /** Column count (months). */
  months: number;
  /** The finding underneath (tablet and desktop). */
  note?: ReactNode;
}

export function CohortGrid({ title, description, compactDescription, rows, months, note, className, ...props }: CohortGridProps) {
  const head = "text-11 leading-3.5 font-semibold tracking-eyebrow text-text-muted uppercase";
  return (
    <section data-slot="cohort-grid" className={cn("flex min-w-0 flex-col gap-3.5 rounded-18 border border-border-subtle p-4 font-sans md:gap-4 md:rounded-lg md:px-6 md:py-5", className)} {...props}>
      <div className="flex flex-col gap-0.5 md:gap-1">
        <h2 className="text-base leading-5 font-semibold tracking-compact text-text md:text-17 md:leading-6">{title}</h2>
        {description && (
          <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5">
            {compactDescription ? (
              <>
                <span className="md:hidden">{compactDescription}</span>
                <span className="hidden md:inline">{description}</span>
              </>
            ) : (
              description
            )}
          </p>
        )}
      </div>
      <table className="w-full border-separate border-spacing-1.5 md:border-spacing-x-1.5 md:border-spacing-y-1.5">
        <thead>
          <tr>
            <th scope="col" className={cn(head, "w-12 text-left md:w-36")}>
              <span className="hidden md:inline">First order</span>
              <span className="sr-only md:hidden">First order</span>
            </th>
            {Array.from({ length: months }, (_, index) => (
              <th key={index} scope="col" className={cn(head, "text-center")}>
                <span className="md:hidden">M{index + 1}</span>
                <span className="hidden md:inline">Month {index + 1}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="pr-1 text-left">
                <span className="text-sm leading-4.5 font-semibold text-text md:hidden">{row.compactLabel}</span>
                <span className="hidden flex-col md:flex">
                  <span className="text-sm leading-4.5 font-semibold text-text">{row.label}</span>
                  <span className="text-xs leading-xs font-regular text-text-muted">{row.sub}</span>
                </span>
              </th>
              {Array.from({ length: months }, (_, index) => {
                const value = row.values[index];
                return (
                  <td
                    key={index}
                    className={cn(
                      "h-9.5 rounded-8 text-center text-sm leading-4.5 font-semibold md:h-9.5",
                      value === null || value === undefined ? "border border-dashed border-border text-text-muted" : shade(value),
                    )}
                  >
                    {value === null || value === undefined ? (
                      "—"
                    ) : (
                      <>
                        {value}
                        <span className="hidden md:inline">%</span>
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {note && <p className="hidden text-sm leading-4.5 text-text-secondary md:block">{note}</p>}
    </section>
  );
}
