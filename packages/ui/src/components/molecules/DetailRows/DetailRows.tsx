import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { detailLabelVariants, detailRowVariants, type DetailRowsVariantProps } from "./DetailRows.variants";

/**
 * DetailRows (molecule): label / value rows for account details ("Phone · +233 24 412 7781 ·
 * Verified"). `badge` sits after the value (under it on narrow `lg` rows), `action` on the
 * right ("Change number", a TextLink). `muted` greys a placeholder value ("Not added").
 */
export interface DetailRow {
  label: ReactNode;
  value: ReactNode;
  muted?: boolean;
  badge?: ReactNode;
  action?: ReactNode;
}

export interface DetailRowsProps extends Omit<ComponentProps<"dl">, "children">, DetailRowsVariantProps {
  rows: DetailRow[];
}

export function DetailRows({ rows, size, className, ...props }: DetailRowsProps) {
  const lg = size === "lg";
  return (
    <dl data-slot="detail-rows" className={cn("flex flex-col font-sans", className)} {...props}>
      {rows.map((row, index) => (
        <div key={index} className={detailRowVariants({ size })}>
          <dt className={detailLabelVariants({ size })}>{row.label}</dt>
          <dd className="flex min-w-0 flex-1 items-center gap-3">
            <span className={cn("flex min-w-0 flex-1 gap-1.5", lg ? "flex-col items-start md:flex-row md:items-center md:gap-3" : "items-center gap-3")}>
              <span className={cn("min-w-0 text-base leading-sm break-words", row.muted ? "text-text-muted" : "text-text", !lg && "flex-1 md:text-base")}>
                {row.value}
              </span>
              {row.badge}
            </span>
            {row.action && <span className="shrink-0 text-sm leading-xs">{row.action}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
