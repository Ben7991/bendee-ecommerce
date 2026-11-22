import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";
import { progressMarkerVariants, progressStepsVariants, type ProgressStepsVariantProps } from "./ProgressSteps.variants";

/**
 * ProgressSteps (molecule): a vertical timeline of where an order or return is ("Order placed
 * & paid · Packed · Out for delivery · Delivered"). Done steps get a green check and a green
 * line, the current one a lime-ringed dot and a brand time, upcoming ones stay grey.
 */
export interface ProgressStep {
  title: ReactNode;
  detail?: ReactNode;
  time?: ReactNode;
  state: "done" | "current" | "upcoming";
}

export interface ProgressStepsProps extends Omit<ComponentProps<"ol">, "children">, ProgressStepsVariantProps {
  steps: ProgressStep[];
}

export function ProgressSteps({ steps, size, className, ...props }: ProgressStepsProps) {
  const sm = size === "sm";
  return (
    <ol data-slot="progress-steps" className={cn(progressStepsVariants({ size }), className)} {...props}>
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        const upcoming = step.state === "upcoming";
        return (
          <li
            key={index}
            aria-current={step.state === "current" ? "step" : undefined}
            className={cn("flex", sm ? "gap-3" : "gap-4", !last && (sm ? "min-h-14" : step.detail ? "min-h-20" : "min-h-16"))}
          >
            <div aria-hidden className={cn("flex shrink-0 flex-col items-center", sm ? "w-5.5" : "w-6")}>
              <span className={progressMarkerVariants({ state: step.state, size })}>
                {step.state === "done" && <Icon name="check" size={sm ? 11 : 12} strokeWidth={3} />}
              </span>
              {!last && <span className={cn("w-0.5 flex-1", step.state === "done" ? "bg-brand" : "bg-border")} />}
            </div>
            <div className={cn("flex min-w-0 flex-1 justify-between gap-3", !sm && "pt-0.5", sm && "pt-px")}>
              <div className="flex min-w-0 flex-col gap-0.5">
                <p
                  className={cn(
                    sm ? "text-sm leading-sm" : "text-base leading-sm font-semibold",
                    sm && !upcoming && "font-semibold",
                    upcoming ? "text-text-muted" : "text-text",
                  )}
                >
                  {step.title}
                </p>
                {step.detail && <p className="text-sm leading-sm text-text-secondary">{step.detail}</p>}
              </div>
              {step.time && (
                <p className={cn("shrink-0 text-right text-sm leading-sm", step.state === "current" ? "font-semibold text-brand" : "text-text-muted")}>
                  {step.time}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
