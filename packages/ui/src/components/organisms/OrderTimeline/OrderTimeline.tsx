import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

export interface OrderTimelineStep {
  label: string;
  /** Mobile label, e.g. "Packing your order". */
  compactLabel?: string;
  time: string;
  /** Mobile time, e.g. "Sat 14 Nov" when the label already says "by 6pm". */
  compactTime?: string;
  state: "done" | "current" | "todo";
  /** Leave out of the mobile list (Paper's mobile shows paid · packing · delivered). */
  hideOnMobile?: boolean;
}

function Dot({ state, small }: { state: OrderTimelineStep["state"]; small?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full",
        small ? "size-5.5" : "size-7",
        state === "done" && "bg-brand text-text-inverse",
        state === "current" && "border-4 border-sage-200 bg-primary",
        state === "todo" && "border-2 border-border bg-bg",
      )}
    >
      {state === "done" && <Icon name="check" size={small ? 11 : 14} strokeWidth={3} />}
    </span>
  );
}

/**
 * OrderTimeline (organism): an order's progress card on the confirmation page.
 *   768 up: four stops across with a connecting line, then actions under a rule
 *   mobile: a vertical list (stops marked `hideOnMobile` left out), then `compactActions`
 */
export interface OrderTimelineProps extends Omit<ComponentProps<"section">, "children"> {
  steps: OrderTimelineStep[];
  actions?: ReactNode;
  compactActions?: ReactNode;
  label?: string;
}

export function OrderTimeline({ steps, actions, compactActions, label = "Order progress", className, ...props }: OrderTimelineProps) {
  return (
    <section
      data-slot="order-timeline"
      aria-label={label}
      className={cn("flex flex-col gap-4 rounded-md border border-border-subtle bg-bg p-5 font-sans md:gap-6 md:rounded-xl md:p-8", className)}
      {...props}
    >
      <ol className="hidden items-start md:flex">
        {steps.map((step, index) => {
          const last = index === steps.length - 1;
          return (
            <li key={step.label} aria-current={step.state === "current" ? "step" : undefined} className={cn("flex flex-col gap-3", last ? "w-37.5 shrink-0" : "flex-1")}>
              <span className="flex items-center">
                <Dot state={step.state} />
                {!last && <span aria-hidden className={cn("h-0.75 flex-1", step.state === "done" ? "bg-brand" : "bg-border")} />}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className={cn("text-base leading-sm font-semibold", step.state === "todo" ? "text-text-muted" : "text-text")}>{step.label}</span>
                <span className="text-sm leading-xs text-text-muted">{step.time}</span>
              </span>
            </li>
          );
        })}
      </ol>
      <ol className="flex flex-col gap-4 md:hidden">
        {steps
          .filter((step) => !step.hideOnMobile)
          .map((step) => (
            <li key={step.label} aria-current={step.state === "current" ? "step" : undefined} className="flex items-center gap-3">
              <Dot state={step.state} small />
              <span className={cn("flex-1 text-sm leading-sm", step.state === "todo" ? "text-text-muted" : "font-semibold text-text")}>
                {step.compactLabel ?? step.label}
              </span>
              <span className="text-xs leading-xs text-text-muted">{step.compactTime ?? step.time}</span>
            </li>
          ))}
      </ol>
      {actions && <div className="hidden gap-3 border-t border-border-subtle pt-5 md:flex">{actions}</div>}
      {compactActions && <div className="flex flex-col md:hidden">{compactActions}</div>}
    </section>
  );
}
