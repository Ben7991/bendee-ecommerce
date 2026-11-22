import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * ReportLineChart (organism): revenue over time on a report (Paper Jofak - Admin → Reports →
 * Sales): this period as a filled green line, the comparison period dashed, y ticks, x labels and
 * the best point marked with a dashed drop line. Day / Week / Month are links (a segmented
 * control from 768px, a small menu on mobile).
 */
export interface ReportLineChartProps extends Omit<ComponentProps<"section">, "title"> {
  linkAs?: LinkComponent;
  title: ReactNode;
  description?: ReactNode;
  /** Mobile: a shorter description. */
  compactDescription?: ReactNode;
  current: number[];
  previous?: number[];
  /** Top of the y axis. */
  max: number;
  /** Top to bottom: "6k", "4k", "2k", "0". */
  yTicks: string[];
  /** Spread along the x axis; mobile shows the first, middle and last. */
  xLabels: string[];
  legend: { current: string; previous?: string };
  /** Index of the point to mark (best day). */
  highlight?: number;
  grains?: { label: string; href: string; active?: boolean }[];
}

const W = 640;
const H = 220;

function points(values: number[], max: number) {
  const step = values.length > 1 ? W / (values.length - 1) : 0;
  return values.map((value, index) => [index * step, H - (Math.max(0, value) / max) * H] as const);
}

const line = (pts: readonly (readonly [number, number])[]) => pts.map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

export function ReportLineChart({
  linkAs: LinkAs = "a",
  title,
  description,
  compactDescription,
  current,
  previous,
  max,
  yTicks,
  xLabels,
  legend,
  highlight,
  grains,
  className,
  ...props
}: ReportLineChartProps) {
  const now = points(current, max);
  const before = previous ? points(previous, max) : [];
  const marked = highlight !== undefined ? now[highlight] : undefined;
  const active = grains?.find((grain) => grain.active) ?? grains?.[0];
  const middle = Math.floor((xLabels.length - 1) / 2);

  return (
    <section data-slot="report-line-chart" className={cn("flex min-w-0 flex-col gap-3.5 rounded-18 border border-border-subtle p-4 font-sans md:gap-4 md:rounded-lg md:px-6 md:py-5", className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5 md:gap-1">
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
        {grains && (
          <>
            <nav aria-label="Group by" className="hidden gap-0.5 rounded-full bg-surface-subtle p-0.75 md:flex">
              {grains.map((grain) => (
                <LinkAs
                  key={grain.href}
                  href={grain.href}
                  aria-current={grain === active ? "page" : undefined}
                  className={cn("rounded-full px-3 py-1.25 text-xs leading-xs", grain === active ? "bg-bg font-semibold text-text shadow-xs dark:bg-surface" : "font-medium text-text-secondary hover:text-text")}
                >
                  {grain.label}
                </LinkAs>
              ))}
            </nav>
            <details className="group relative md:hidden">
              <summary className="flex h-8 cursor-pointer list-none items-center gap-1.5 rounded-full border border-border px-3 text-xs leading-xs font-semibold text-text">
                {active?.label}
                <Icon name="chevronDown" size={10} strokeWidth={1.4} className="text-text-muted" />
              </summary>
              <div className="absolute right-0 z-10 mt-1 flex w-28 flex-col rounded-sm border border-border-subtle bg-bg p-1 shadow-chip dark:bg-surface">
                {grains.map((grain) => (
                  <LinkAs key={grain.href} href={grain.href} className={cn("rounded-8 px-2.5 py-1.5 text-sm leading-4.5", grain === active ? "bg-surface-subtle font-semibold text-text" : "text-text-secondary")}>
                    {grain.label}
                  </LinkAs>
                ))}
              </div>
            </details>
          </>
        )}
      </div>

      <ul className="order-last flex flex-col gap-1 text-xs leading-xs text-text-secondary md:order-none md:flex-row md:gap-5">
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-0.75 w-4 rounded-full bg-brand" />
          {legend.current}
        </li>
        {legend.previous && (
          <li className="flex items-center gap-2">
            <span aria-hidden className="w-4 border-t-2 border-dashed border-evergreen-300" />
            {legend.previous}
          </li>
        )}
      </ul>

      <div className="flex gap-2.5">
        <div aria-hidden className="hidden w-3.5 shrink-0 flex-col justify-between text-11 leading-3.5 text-text-muted md:flex">
          {yTicks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
        <div className="relative min-w-0 flex-1">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={`${legend.current}${legend.previous ? `; ${legend.previous}` : ""}`} className="block h-36 w-full overflow-visible md:h-55">
            {yTicks.map((tick, index) => {
              const y = (index / (yTicks.length - 1)) * H;
              return <line key={tick} x1="0" x2={W} y1={y} y2={y} className="stroke-border-subtle" strokeWidth="1" vectorEffect="non-scaling-stroke" />;
            })}
            <path d={`${line(now)} L${W} ${H} L0 ${H} Z`} className="fill-brand/10" />
            {before.length > 0 && <path d={line(before)} className="fill-none stroke-evergreen-300" strokeWidth="1.6" strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />}
            <path d={line(now)} className="fill-none stroke-brand" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            {marked && <line x1={marked[0]} x2={marked[0]} y1={marked[1]} y2={H} className="stroke-text-secondary" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />}
          </svg>
          {marked && (
            <span
              aria-hidden
              className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-text bg-bg"
              style={{ left: `${(marked[0] / W) * 100}%`, top: `${(marked[1] / H) * 100}%` }}
            />
          )}
          <div aria-hidden className="mt-2.5 flex justify-between text-11 leading-3.5 text-text-muted">
            {xLabels.map((label, index) => (
              <span key={label} className={cn(index !== 0 && index !== middle && index !== xLabels.length - 1 && "hidden md:inline")}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
