import type { ComponentProps } from "react";

import { cn } from "../../../lib";

export interface FactRow {
  name: string;
  /** "60 mg". */
  amount?: string;
  /** "67%", or "†" when not established. */
  dailyValue?: string;
}

/**
 * SupplementFacts (organism): the label-style nutrition panel (Paper PDP → Supplement Facts):
 * a heavy rule under the title and after the last row. `bare` drops the frame, for use inside an
 * accordion on mobile.
 */
export interface SupplementFactsProps extends ComponentProps<"div"> {
  title?: string;
  /** "Serving size 1 scoop (9.4 g) · 25 servings per container". */
  serving: string;
  rows: FactRow[];
  footnote?: string;
  bare?: boolean;
}

export function SupplementFacts({
  title = "Supplement Facts",
  serving,
  rows,
  footnote,
  bare = false,
  className,
  ...props
}: SupplementFactsProps) {
  return (
    <div
      data-slot="supplement-facts"
      className={cn("flex flex-col font-sans text-text", !bare && "rounded-xl border border-border p-8", className)}
      {...props}
    >
      <div className="flex flex-col gap-1 border-b-6 border-text pb-4">
        {bare ? (
          <p className="text-xl leading-base font-bold tracking-tight">{title}</p>
        ) : (
          <h2 className="text-3xl leading-10 font-bold tracking-tight">{title}</h2>
        )}
        <p className="text-sm leading-xs text-text-secondary">{serving}</p>
      </div>
      <table className="w-full text-sm leading-xs">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-2.5 text-left font-semibold">
              Amount per serving
            </th>
            <th scope="col" className="py-2.5 text-right font-semibold">
              % DV
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.name} className={index === rows.length - 1 ? "border-b-6 border-text" : "border-b border-border-subtle"}>
              <th scope="row" className="py-2.5 text-left font-regular">
                {row.name} {row.amount && <span className="text-text-muted">{row.amount}</span>}
              </th>
              <td className="py-2.5 text-right">{row.dailyValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {footnote && <p className="pt-3 text-xs leading-xs text-text-muted">{footnote}</p>}
    </div>
  );
}
