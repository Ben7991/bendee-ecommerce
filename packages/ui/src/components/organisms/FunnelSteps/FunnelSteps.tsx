import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

export interface FunnelStep {
  name: string;
  sessions: string;
  /** "56.0%". */
  rate: string;
  /** Share of all sessions that reached this step, 0–100. */
  reached: number;
  /** Share of all sessions lost since the previous step, 0–100. */
  dropped: number;
  /** "−6,470 · 44.0%"; mobile: "6,470 dropped · 44.0%". */
  drop?: { text: string; compact: string };
  /** The step that loses the most: tinted, with a chip. */
  biggest?: boolean;
}

/**
 * FunnelSteps (organism): the purchase funnel (Paper Jofak - Admin → Reports → Funnel): each step
 * with sessions reaching it (green) and those lost since the step before (peach) as a share of
 * all sessions, its rate and drop-off. The step that loses the most is tinted and flagged; the
 * last step is dark. Mobile stacks each step's name, figures, bar and drop-off.
 */
export interface FunnelStepsProps extends Omit<ComponentProps<"section">, "title"> {
  title: ReactNode;
  description?: ReactNode;
  steps: FunnelStep[];
}

export function FunnelSteps({ title, description, steps, className, ...props }: FunnelStepsProps) {
  const head = "text-11 leading-3.5 font-semibold tracking-eyebrow text-text-muted uppercase";
  const last = steps.length - 1;
  const bar = (step: FunnelStep, index: number, size: string) => (
    <span aria-hidden className={cn("flex min-w-0 overflow-clip rounded-6 bg-surface-subtle", size)}>
      <span className={index === last ? "bg-primary" : "bg-brand"} style={{ width: `${step.reached}%` }} />
      <span className="bg-tint-citrus" style={{ width: `${step.dropped}%` }} />
    </span>
  );

  return (
    <section data-slot="funnel-steps" className={cn("flex min-w-0 flex-col gap-3 rounded-18 border border-border-subtle p-4 font-sans md:gap-0 md:rounded-lg md:px-6 md:pt-5 md:pb-2", className)} {...props}>
      <div className="flex items-start justify-between gap-4 md:pb-4">
        <div className="flex min-w-0 flex-col gap-0.5 md:gap-1">
          <h2 className="text-base leading-5 font-semibold tracking-compact text-text md:text-17 md:leading-6">{title}</h2>
          {description && <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5">{description}</p>}
        </div>
        <ul className="hidden shrink-0 gap-4 text-xs leading-xs text-text-secondary md:flex">
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="size-2.5 rounded-3 bg-brand" />
            Reached step
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="size-2.5 rounded-3 bg-tint-citrus" />
            Dropped from previous
          </li>
        </ul>
      </div>

      {/* Mobile. */}
      <ol className="flex flex-col gap-3 md:hidden">
        {steps.map((step, index) => (
          <li key={step.name} className={cn("flex flex-col gap-1.5", step.biggest && "-mx-2.5 rounded-sm bg-tint-citrus/40 px-2.5 py-2.5")}>
            <span className="flex justify-between gap-3 text-14 leading-5 text-text">
              <span className={index === last ? "font-semibold" : "font-medium"}>
                {index + 1} · {step.name}
              </span>
              <span className="font-semibold">
                {step.sessions} · {step.rate}
              </span>
            </span>
            {bar(step, index, "h-2.5")}
            {step.drop && <span className={cn("text-xs leading-xs", step.biggest ? "font-semibold text-error" : "text-text-muted")}>{step.drop.compact}</span>}
          </li>
        ))}
      </ol>

      {/* Tablet and desktop. */}
      <table className="hidden w-full border-collapse md:table">
        <thead>
          <tr className="border-b border-border-subtle">
            <th scope="col" className={cn(head, "w-50 py-2 text-left")}>
              Step
            </th>
            <th scope="col" className={cn(head, "py-2 pl-4 text-left")}>
              Share of sessions
            </th>
            <th scope="col" className={cn(head, "w-20 py-2 pl-4 text-right")}>
              Sessions
            </th>
            <th scope="col" className={cn(head, "w-16 py-2 pl-4 text-right")}>
              Rate
            </th>
            <th scope="col" className={cn(head, "w-30 py-2 pl-4 text-right")}>
              Drop-off
            </th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step, index) => (
            <tr key={step.name} className={cn("border-b border-border-subtle last:border-b-0", step.biggest && "bg-tint-citrus/30")}>
              <th scope="row" className="py-3 text-left">
                <span className="flex items-center gap-2.5">
                  <span className={cn("flex size-5.5 shrink-0 items-center justify-center rounded-full text-11 leading-3.5 font-semibold", index === last ? "bg-primary text-on-primary" : "bg-sage-100 text-primary dark:text-text")}>
                    {index + 1}
                  </span>
                  <span className={cn("text-14 leading-5 text-text", index === last ? "font-semibold" : "font-medium")}>{step.name}</span>
                </span>
              </th>
              <td className="py-3 pl-4">{bar(step, index, "h-6")}</td>
              <td className="py-3 pl-4 text-right text-14 leading-5 font-semibold text-text">{step.sessions}</td>
              <td className={cn("py-3 pl-4 text-right text-14 leading-5", index === last ? "font-semibold text-text" : "text-text-secondary")}>{step.rate}</td>
              <td className="py-3 pl-4 text-right text-sm leading-4.5 text-text-secondary">
                {step.biggest && step.drop ? (
                  <span className="rounded-full bg-tint-citrus px-2 py-0.5 text-xs leading-xs font-semibold text-error">{step.drop.text} biggest</span>
                ) : (
                  (step.drop?.text ?? "—")
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
