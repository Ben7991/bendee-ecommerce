import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";

export interface RevenueDay {
  /** "Mon", "Today". */
  label: string;
  /** Shorter label on mobile ("Sun"). */
  compactLabel?: string;
  value: number;
  /** For screen readers and the flag: "GHS 4,820". */
  display: string;
  /** Shorter flag on mobile ("4,820"). */
  compactDisplay?: string;
  /** Today: evergreen bar with the value flag. */
  current?: boolean;
}

/**
 * RevenueChart (organism): revenue per day as bars, today highlighted with its value
 * (Paper Jofak - Admin → Revenue, last 7 days). The scale runs from 0 to `max` with
 * `ticks` labels. Screen readers get the same numbers as a table.
 */
export interface RevenueChartProps extends Omit<ComponentProps<"section">, "title"> {
  title?: ReactNode;
  /** "GHS 35,260 total · 271 orders". */
  summary?: ReactNode;
  days: RevenueDay[];
  max: number;
  /** Axis labels, top to bottom ("8k" … "0"). */
  ticks: string[];
  legend?: { current: string; earlier: string };
}

export function RevenueChart({
  title = "Revenue, last 7 days",
  summary,
  days,
  max,
  ticks,
  legend = { current: "Today so far", earlier: "Earlier days" },
  className,
  ...props
}: RevenueChartProps) {
  const titleId = useId();
  return (
    <section
      data-slot="revenue-chart"
      aria-labelledby={titleId}
      className={cn("flex min-w-0 flex-col gap-5 rounded-lg border border-border-subtle p-5 font-sans md:p-6", className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 id={titleId} className="text-lg leading-base font-semibold tracking-compact text-text">
            {title}
          </h2>
          {summary && <p className="text-sm leading-sm text-text-muted">{summary}</p>}
        </div>
        <ul aria-hidden className="hidden items-center gap-4 text-xs leading-xs text-text-muted md:flex">
          <li className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-3 bg-primary" />
            {legend.current}
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-3 bg-sage-200" />
            {legend.earlier}
          </li>
        </ul>
      </div>

      <div aria-hidden className="flex gap-2 md:gap-3">
        <div className="-mt-2 flex h-41.5 w-7 shrink-0 flex-col justify-between text-right text-xs leading-xs text-text-muted md:h-66">
          {ticks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <div className="relative flex h-37.5 items-end justify-between gap-2 border-b border-border px-1 md:h-62 md:gap-4.5 md:px-2">
            {ticks.slice(0, -1).map((tick, index) => (
              <span
                key={tick}
                className="pointer-events-none absolute inset-x-0 border-t border-border-subtle"
                style={{ top: `${(index / (ticks.length - 1)) * 100}%` }}
              />
            ))}
            {days.map((day) => (
              <span
                key={day.label}
                className={cn("relative min-w-0 flex-1 rounded-t-8 rounded-b-2", day.current ? "bg-primary" : "bg-sage-200")}
                style={{ height: `${Math.min(100, (day.value / max) * 100)}%` }}
              >
                {day.current && (
                  <span className="absolute -top-8.5 left-1/2 -translate-x-1/2 rounded-8 bg-accent px-2 py-1 text-xs leading-xs font-semibold whitespace-nowrap text-on-accent">
                    <span className="md:hidden">{day.compactDisplay ?? day.display}</span>
                    <span className="hidden md:inline">{day.display}</span>
                  </span>
                )}
              </span>
            ))}
          </div>
          <div className="flex justify-between gap-2 px-1 text-center text-xs leading-xs md:gap-4.5 md:px-2">
            {days.map((day) => (
              <span key={day.label} className={cn("min-w-0 flex-1", day.current ? "font-semibold text-text" : "text-text-muted")}>
                <span className="md:hidden">{day.compactLabel ?? day.label}</span>
                <span className="hidden md:inline">{day.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day.label}>
              <th scope="row">{day.label}</th>
              <td>{day.display}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
