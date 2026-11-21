import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

export interface ReturnStep {
  label: string;
  state: "done" | "current" | "upcoming";
}

/**
 * ReturnProgress (organism): where a return is: Requested → Approved → Item back → Inspected →
 * Refunded (Paper Jofak - Admin → Return detail). Numbered steps joined by lines on tablet and
 * desktop (done steps get a tick, the current one is amber); on mobile five bars and "Step 1 of
 * 5 · next: approve or reject". Tablet numbers only the current step.
 */
export interface ReturnProgressProps extends Omit<ComponentProps<"section">, "children"> {
  steps: ReturnStep[];
  /** Mobile: what happens next ("approve or reject"). */
  next?: string;
}

export function ReturnProgress({ steps, next, className, ...props }: ReturnProgressProps) {
  const current = Math.max(
    0,
    steps.findIndex((step) => step.state === "current") >= 0 ? steps.findIndex((step) => step.state === "current") : steps.map((step) => step.state).lastIndexOf("done"),
  );
  return (
    <section data-slot="return-progress" aria-label="Return progress" className={cn("font-sans", className)} {...props}>
      <div className="flex flex-col gap-1.5 md:hidden">
        <span aria-hidden className="flex gap-1">
          {steps.map((step) => (
            <span
              key={step.label}
              className={cn("h-1 flex-1 basis-0 rounded-full", step.state === "current" ? "bg-warning" : step.state === "done" ? "bg-brand" : "bg-border")}
            />
          ))}
        </span>
        <p className="text-11 leading-3.5 text-text-muted">
          Step {current + 1} of {steps.length}
          {next && ` · next: ${next}`}
        </p>
      </div>
      <ol className="hidden items-center gap-2.5 rounded-18 bg-surface-subtle px-4 py-3 md:flex xl:px-5 xl:py-3.5">
        {steps.map((step, index) => (
          <li key={step.label} className={cn("flex items-center gap-2.5", index > 0 && "flex-1")} aria-current={step.state === "current" ? "step" : undefined}>
            {index > 0 && <span aria-hidden className={cn("h-0.5 flex-1", step.state === "upcoming" ? "bg-border" : "bg-brand")} />}
            <span className="flex shrink-0 items-center gap-2">
              <span
                aria-hidden
                className={cn(
                  "size-6 items-center justify-center rounded-full text-xs leading-xs font-bold",
                  step.state === "current" ? "flex bg-warning text-text-inverse" : "hidden xl:flex",
                  step.state === "done" && "bg-brand text-text-inverse",
                  step.state === "upcoming" && "border-field border-border font-semibold text-text-muted",
                )}
              >
                {step.state === "done" ? <Icon name="check" size={12} /> : index + 1}
              </span>
              <span
                className={cn(
                  "text-sm leading-4",
                  step.state === "current" ? "font-semibold text-text" : step.state === "done" ? "text-text-secondary" : "text-text-muted",
                )}
              >
                {step.label}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
