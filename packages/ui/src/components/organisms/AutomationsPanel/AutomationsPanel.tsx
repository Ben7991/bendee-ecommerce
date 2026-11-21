import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, StatusChip, type IconName, type StatusChipProps } from "../../atoms";

export interface AutomationStep {
  label: string;
  value: string;
  /** Muted after the value ("34%"). */
  note?: string;
  /** The goal step ("Ordered"): green tile. */
  goal?: boolean;
  /** Tablet: the label and value swap detail ("Ordered · GHS 6,840" over "27"). */
  compactLabel?: string;
  compactValue?: string;
}

export interface Automation {
  href: string;
  name: string;
  icon: IconName;
  /** Icon tile: lime (cart) or sun (payment). */
  tint: "accent" | "sun";
  status: { label: string; tone: NonNullable<StatusChipProps["tone"]> };
  description: string;
  /** Mobile row: "Live · 27 orders · GHS 6,840". */
  summary: string;
  /** The featured flow shows its funnel and an Edit flow button. */
  funnel?: AutomationStep[];
  /** Compact flows: the outcome on the right ("31 of 64 paid", "GHS 4,120 recovered"). */
  result?: { value: string; note: string };
}

/**
 * AutomationsPanel (organism): the marketing automations (Paper Jofak - Admin → Marketing). The
 * featured flow is outlined with its funnel (enrolled → delivered → clicked → ordered) and Edit
 * flow; other flows are compact rows with their outcome; from 1440px coming-soon flows sit in a
 * row of dashed cards. Mobile is a list of flows with a coming-soon footer. Every flow links to
 * its editor.
 */
export interface AutomationsPanelProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  automations: Automation[];
  /** "Quiet hours 21:00–08:00 · max 1 message per customer per day". */
  rules?: string;
  comingSoon?: { name: string; note: string }[];
  /** Mobile footer: "Back in stock, win-back and review requests are coming soon". */
  comingSoonNote?: string;
}

const TINT = { accent: "bg-accent text-on-accent", sun: "bg-tint-sun text-warning-text" } as const;

function Chip({ status }: { status: Automation["status"] }) {
  return (
    <StatusChip tone={status.tone} className="px-2 py-px text-xs leading-4.5">
      {status.label}
    </StatusChip>
  );
}

export function AutomationsPanel({
  linkAs: LinkAs = "a",
  automations,
  rules,
  comingSoon = [],
  comingSoonNote,
  className,
  ...props
}: AutomationsPanelProps) {
  return (
    <section data-slot="automations-panel" aria-label="Automations" className={cn("flex flex-col gap-2.5 font-sans md:gap-4", className)} {...props}>
      <div className="flex items-baseline justify-between gap-4 pt-1 md:pt-0">
        <h2
          className="text-xs leading-xs font-semibold tracking-overline text-text-muted uppercase md:text-xl md:leading-6.5 md:tracking-compact md:text-text md:normal-case"
        >
          Automations
        </h2>
        {rules && <p className="hidden text-right text-sm leading-4.5 text-text-muted md:block">{rules}</p>}
      </div>

      {/* Mobile: a list. */}
      <ul className="flex flex-col overflow-clip rounded-18 border border-border-subtle md:hidden">
        {automations.map((automation) => (
          <li key={automation.href} className="border-t border-border-subtle first:border-t-0">
            <LinkAs href={automation.href} className="flex items-center gap-3 p-3.5">
              <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-sm", TINT[automation.tint])}>
                <Icon name={automation.icon} size={20} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-14 leading-5 font-semibold text-text">{automation.name}</span>
                <span className={cn("text-xs leading-xs font-semibold", automation.status.tone === "success" ? "text-brand" : "text-text-muted")}>
                  {automation.summary}
                </span>
              </span>
              <Icon name="chevronRight" size={14} strokeWidth={1.6} className="shrink-0 text-text-muted" />
            </LinkAs>
          </li>
        ))}
        {comingSoonNote && <li className="border-t border-border-subtle bg-surface-subtle px-3.5 py-3 text-xs leading-xs text-text-muted">{comingSoonNote}</li>}
      </ul>

      {/* Tablet and desktop: cards. */}
      {automations.map((automation) =>
        automation.funnel ? (
          <article key={automation.href} className="hidden flex-col gap-4 rounded-lg border-field border-primary px-5.5 py-5 md:flex">
            <div className="flex items-center gap-3.5">
              <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-14", TINT[automation.tint])}>
                <Icon name={automation.icon} size={22} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <h3 className="flex items-center gap-2 text-md leading-5.5 font-semibold text-text">
                  {automation.name} <Chip status={automation.status} />
                </h3>
                <p className="text-sm leading-4.5 text-text-muted">{automation.description}</p>
              </div>
              <LinkAs
                href={automation.href}
                className="flex h-9.5 shrink-0 items-center rounded-full bg-primary px-4 text-sm leading-xs font-semibold text-on-primary hover:bg-primary-hover"
              >
                Edit flow
              </LinkAs>
            </div>
            <dl className="flex gap-0.5 overflow-clip rounded-14">
              {automation.funnel.map((step) => (
                <div key={step.label} className={cn("flex min-w-0 flex-1 basis-0 flex-col gap-0.5 px-3.5 py-3", step.goal ? "bg-sage-100" : "bg-surface-subtle")}>
                  <dt className={cn("text-xs leading-xs", step.goal ? "font-semibold text-brand" : "text-text-muted")}>
                    {step.compactLabel ? (
                      <>
                        <span className="xl:hidden">{step.compactLabel}</span>
                        <span className="hidden xl:inline">{step.label}</span>
                      </>
                    ) : (
                      step.label
                    )}
                  </dt>
                  <dd className={cn("text-xl leading-6.5 font-semibold", step.goal ? "text-brand" : "text-text")}>
                    {step.compactValue ? (
                      <>
                        <span className="xl:hidden">{step.compactValue}</span>
                        <span className="hidden xl:inline">{step.value}</span>
                      </>
                    ) : (
                      step.value
                    )}
                    {step.note && <span className="text-sm font-medium text-text-muted"> {step.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ) : (
          <article
            key={automation.href}
            className="relative hidden items-center gap-3.5 rounded-lg border border-border-subtle px-5.5 py-4.5 hover:bg-surface-subtle md:flex"
          >
            <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-14", TINT[automation.tint])}>
              <Icon name={automation.icon} size={22} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <h3 className="flex items-center gap-2 text-md leading-5.5 font-semibold text-text">
                <LinkAs href={automation.href} className="after:absolute after:inset-0">
                  {automation.name}
                </LinkAs>
                <Chip status={automation.status} />
              </h3>
              <p className="text-sm leading-4.5 text-text-muted">{automation.description}</p>
            </div>
            {automation.result && (
              <div className="flex shrink-0 flex-col items-end gap-0.5">
                <p className="text-md leading-5.5 font-semibold text-text">{automation.result.value}</p>
                <p className="text-xs leading-xs font-semibold text-brand">{automation.result.note}</p>
              </div>
            )}
          </article>
        ),
      )}

      {comingSoon.length > 0 && (
        <ul aria-label="Coming soon" className="hidden gap-2.5 xl:flex">
          {comingSoon.map((flow) => (
            <li key={flow.name} className="flex min-w-0 flex-1 basis-0 flex-col gap-1 rounded-md border border-dashed border-border bg-surface-subtle px-4 py-3.5">
              <span className="text-14 leading-5 font-semibold text-text-secondary">{flow.name}</span>
              <span className="text-xs leading-xs text-text-muted">{flow.note}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
