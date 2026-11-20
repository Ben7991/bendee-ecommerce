import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

export interface PaymentMethodHealth {
  name: string;
  /** Share of all payment attempts, 0–100: the slice size. */
  share: number;
  /** Success rate shown on the right ("94%"). */
  successRate: string;
  tone: "primary" | "warning" | "brand" | "muted";
  /** Below the healthy threshold: the rate turns amber. */
  degraded?: boolean;
}

const SLICE = {
  primary: { stroke: "stroke-primary dark:stroke-brand", dot: "bg-primary dark:bg-brand" },
  warning: { stroke: "stroke-warning", dot: "bg-warning" },
  brand: { stroke: "stroke-evergreen-500", dot: "bg-evergreen-500" },
  muted: { stroke: "stroke-evergreen-300", dot: "bg-evergreen-300" },
} as const;

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 3;

/**
 * PaymentHealthCard (organism): how payments are doing (Paper Jofak - Admin → Payment health).
 * A donut whose slices are each method's share of payments, the overall success rate in the
 * centre, each method's success rate beside it and an optional amber alert.
 */
export interface PaymentHealthCardProps extends Omit<ComponentProps<"section">, "title"> {
  title?: ReactNode;
  /** "Last 24 hours · 412 payment attempts". */
  summary?: ReactNode;
  /** Overall success rate ("90%"). */
  rate: string;
  rateLabel?: string;
  methods: PaymentMethodHealth[];
  alert?: ReactNode;
}

export function PaymentHealthCard({
  title = "Payment health",
  summary,
  rate,
  rateLabel = "succeeded",
  methods,
  alert,
  className,
  ...props
}: PaymentHealthCardProps) {
  const titleId = useId();
  const slices = methods.map((method, index) => {
    const length = (method.share / 100) * CIRCUMFERENCE;
    const offset = methods.slice(0, index).reduce((sum, earlier) => sum + (earlier.share / 100) * CIRCUMFERENCE, 0);
    return { method, dash: Math.max(0, length - GAP), offset };
  });

  return (
    <section
      data-slot="payment-health-card"
      aria-labelledby={titleId}
      className={cn("flex flex-col gap-4.5 rounded-lg bg-surface-subtle p-5 font-sans md:p-6", className)}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <h2 id={titleId} className="text-lg leading-base font-semibold tracking-compact text-text">
          {title}
        </h2>
        {summary && <p className="text-sm leading-sm text-text-muted">{summary}</p>}
      </div>

      <div className="flex items-center gap-5">
        <div className="relative size-32 shrink-0">
          <svg viewBox="0 0 128 128" aria-hidden className="size-32 -rotate-90 fill-none" strokeWidth="14">
            <circle cx="64" cy="64" r={RADIUS} className="stroke-border-subtle" />
            {slices.map(({ method, dash, offset: start }) => (
              <circle
                key={method.name}
                cx="64"
                cy="64"
                r={RADIUS}
                className={SLICE[method.tone].stroke}
                strokeDasharray={`${dash.toFixed(1)} ${CIRCUMFERENCE.toFixed(1)}`}
                strokeDashoffset={(-start).toFixed(1)}
              />
            ))}
          </svg>
          <p className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-28 leading-8 font-semibold tracking-tight text-text">{rate}</span>
            <span className="text-11 leading-3.5 font-medium text-text-muted">{rateLabel}</span>
          </p>
        </div>

        <ul className="grid min-w-0 flex-1 grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-x-6 xl:grid-cols-1">
          {methods.map((method) => (
            <li key={method.name} className="flex items-start gap-2">
              <span aria-hidden className={cn("mt-1.5 size-2 shrink-0 rounded-full", SLICE[method.tone].dot)} />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm leading-sm font-medium text-text">{method.name}</span>
                <span className="text-xs leading-xs text-text-muted">{method.share}% of payments</span>
              </span>
              <span className={cn("text-sm leading-sm", method.degraded ? "font-bold text-warning" : "font-semibold text-text")}>
                <span className="sr-only">Success rate </span>
                {method.successRate}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {alert && (
        <p role="status" className="mt-auto flex gap-2.5 rounded-14 bg-tint-sun px-3.5 py-3 text-sm leading-4.5 text-warning-text">
          <Icon name="warning" size={16} className="mt-0.5" />
          <span>{alert}</span>
        </p>
      )}
    </section>
  );
}
