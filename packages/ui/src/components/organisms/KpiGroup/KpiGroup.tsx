import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * KpiGroup (organism): the dashboard's headline numbers in one outlined panel with hairline
 * dividers (Paper Jofak - Admin → KPIs). Two by two up to 1440px, one row from there.
 * Children are KpiTiles; give it an aria-label ("Today at a glance").
 */
export type KpiGroupProps = ComponentProps<"section">;

export function KpiGroup({ className, children, ...props }: KpiGroupProps) {
  return (
    <section
      data-slot="kpi-group"
      className={cn(
        "grid grid-cols-2 gap-px overflow-clip rounded-lg border border-border-subtle bg-border-subtle xl:grid-cols-4",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
