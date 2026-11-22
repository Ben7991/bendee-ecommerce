import type { ComponentProps } from "react";

import { type LinkComponent } from "../../../lib";
import { AdminCard } from "../../molecules";

/**
 * ProductStatsCard (organism): how the product did in the last 30 days (units sold, revenue,
 * margin) with a link to Reports (Paper Jofak - Admin → Product editor → Last 30 days).
 */
export interface ProductStatsCardProps extends Omit<ComponentProps<"section">, "children" | "title"> {
  linkAs?: LinkComponent;
  title?: string;
  stats: { value: string; label: string }[];
  reportsHref?: string;
}

export function ProductStatsCard({ linkAs: LinkAs = "a", title = "Last 30 days", stats, reportsHref, ...props }: ProductStatsCardProps) {
  return (
    <AdminCard data-slot="product-stats-card" title={title} variant="eyebrow" {...props}>
      <dl className="flex gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-1 flex-col-reverse">
            <dt className="text-xs leading-xs text-text-muted">{stat.label}</dt>
            <dd className="text-22 leading-lg font-semibold tracking-snug text-text">{stat.value}</dd>
          </div>
        ))}
      </dl>
      {reportsHref && (
        <LinkAs href={reportsHref} className="text-sm leading-xs font-semibold text-brand hover:underline">
          View in Reports
        </LinkAs>
      )}
    </AdminCard>
  );
}
