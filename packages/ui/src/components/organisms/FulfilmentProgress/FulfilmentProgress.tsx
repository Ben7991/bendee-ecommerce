import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

export interface FulfilmentStep {
  label: string;
  /** "COD verified by SMS · 07:58", "Started by Abena · 08:05", "Next step". */
  detail?: string;
  /** Shorter detail on tablet ("07:58"). */
  compactDetail?: string;
  state: "done" | "current" | "upcoming";
}

/**
 * FulfilmentProgress (organism): where an order is: Confirmed → Processing → Packed → Handed to
 * courier → Delivered (Paper Jofak - Admin → Order detail). `strip` is the outlined five-step
 * strip (tablet and desktop); `compact` is the mobile summary: five bars and "Processing · step 2
 * of 5 · Next: Packed".
 */
export interface FulfilmentProgressProps extends Omit<ComponentProps<"section">, "children"> {
  steps: FulfilmentStep[];
  variant?: "strip" | "compact";
}

export function FulfilmentProgress({ steps, variant = "strip", className, ...props }: FulfilmentProgressProps) {
  // With no current step (delivered), the summary points at the last finished one.
  const active = steps.findIndex((step) => step.state === "current");
  const currentIndex = active >= 0 ? active : Math.max(0, steps.map((step) => step.state).lastIndexOf("done"));
  const current = steps[currentIndex];
  const next = steps[currentIndex + 1];

  if (variant === "compact") {
    return (
      <section data-slot="fulfilment-progress" aria-label="Order progress" className={cn("flex flex-col gap-2 rounded-md bg-surface-subtle p-3.5 font-sans", className)} {...props}>
        <span aria-hidden className="flex gap-1">
          {steps.map((step) => (
            <span
              key={step.label}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                step.state === "done" ? "bg-brand" : step.state === "current" ? "bg-primary dark:bg-accent" : "bg-border",
              )}
            />
          ))}
        </span>
        <p className="flex justify-between gap-3 text-sm leading-4.5">
          <span className="text-text">
            <strong className="font-semibold">{current?.label}</strong> · step {currentIndex + 1} of {steps.length}
          </span>
          {next && <span className="text-text-muted">Next: {next.label}</span>}
        </p>
      </section>
    );
  }

  return (
    <section data-slot="fulfilment-progress" aria-label="Order progress" className={cn("rounded-lg border border-border-subtle px-4.5 py-5 font-sans xl:px-6", className)} {...props}>
      <ol className="flex items-start">
        {steps.map((step, index) => {
          const last = index === steps.length - 1;
          return (
            <li
              key={step.label}
              aria-current={step.state === "current" ? "step" : undefined}
              className={cn("flex flex-col gap-2.5", last ? "shrink-0" : "min-w-0 flex-1")}
            >
              <span className="flex items-center">
                {step.state === "done" ? (
                  <span className="flex size-6.5 shrink-0 items-center justify-center rounded-full bg-brand text-text-inverse dark:text-bg">
                    <Icon name="check" size={12} strokeWidth={3} />
                  </span>
                ) : step.state === "current" ? (
                  <span className="size-6.5 shrink-0 rounded-full border-6 border-accent bg-primary" />
                ) : (
                  <span className="size-6.5 shrink-0 rounded-full border-2 border-border" />
                )}
                {!last && <span className={cn("mx-2 h-0.5 flex-1", step.state === "done" ? "bg-brand" : "bg-border")} />}
              </span>
              <span className="flex flex-col pr-2">
                <span className={cn("text-14 leading-sm font-semibold", step.state === "upcoming" ? "text-text-muted" : "text-text")}>
                  {step.label}
                  <span className="sr-only">{step.state === "done" ? ", done" : step.state === "current" ? ", current step" : ""}</span>
                </span>
                {step.detail && (
                  <span className={cn("text-xs leading-xs", step.state === "current" ? "font-semibold text-brand" : "text-text-muted")}>
                    {step.compactDetail ? (
                      <>
                        <span className="xl:hidden">{step.compactDetail}</span>
                        <span className="hidden xl:inline">{step.detail}</span>
                      </>
                    ) : (
                      step.detail
                    )}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
