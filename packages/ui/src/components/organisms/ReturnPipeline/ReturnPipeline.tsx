import { Fragment, type ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

export interface ReturnStage {
  /** "requested", "awaiting", "received", "inspected", "closed". */
  key: string;
  /** "Awaiting item". */
  label: string;
  /** Mobile chip: "Awaiting". */
  compactLabel?: string;
  count: number;
  /** From 1440px, under the count: "1 drop-off · 1 partner pickup". */
  note?: string;
  /** Beside the label from 1440px: "Needs decision". */
  badge?: string;
  /** Filters the list to this stage. */
  href: string;
  /** `attention`: amber, needs a decision. `closed`: quiet, desktop only. */
  tone?: "attention" | "closed";
}

/**
 * ReturnPipeline (organism): how many returns sit at each step, left to right (Paper Jofak -
 * Admin → Returns): Requested → Awaiting item → To inspect → To refund → Closed. Cards with
 * notes from 1440px; four cards without notes or Closed on tablet; a scrolling row of chips on
 * mobile. Each stage links to the list filtered to it; the stage being shown is marked.
 */
export interface ReturnPipelineProps extends Omit<ComponentProps<"nav">, "children"> {
  linkAs?: LinkComponent;
  stages: ReturnStage[];
  activeHref?: string;
  "aria-label"?: string;
}

export function ReturnPipeline({ linkAs: LinkAs = "a", stages, activeHref, "aria-label": ariaLabel = "Return stages", className, ...props }: ReturnPipelineProps) {
  const open = stages.filter((stage) => stage.tone !== "closed");
  return (
    <nav data-slot="return-pipeline" aria-label={ariaLabel} className={cn("font-sans", className)} {...props}>
      {/* Mobile: chips (open stages only). */}
      <ul className="-mr-4 flex gap-2 overflow-x-auto pr-4 scrollbar-none md:hidden">
        {open.map((stage) => {
          const attention = stage.tone === "attention";
          const active = stage.href === activeHref;
          return (
            <li key={stage.key} className="shrink-0">
              <LinkAs
                href={stage.href}
                aria-label={`${stage.label}, ${stage.count}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm leading-4 whitespace-nowrap",
                  attention ? "border-field border-warning bg-tint-sun text-warning-text" : "border border-border text-text",
                  active && !attention && "border-primary bg-primary text-text-inverse",
                  attention ? "font-semibold" : "font-regular",
                )}
              >
                {stage.compactLabel ?? stage.label}
                <span className="font-bold">{stage.count}</span>
              </LinkAs>
            </li>
          );
        })}
      </ul>

      {/* Tablet and desktop: cards. */}
      <ol className="hidden gap-2.5 md:grid md:grid-cols-4 xl:flex">
        {stages.map((stage, index) => {
          const attention = stage.tone === "attention";
          const closed = stage.tone === "closed";
          const active = stage.href === activeHref;
          return (
            <Fragment key={stage.key}>
              {index > 0 && (
                <li aria-hidden className="hidden items-center text-evergreen-300 xl:flex">
                  <Icon name="chevronRight" size={16} strokeWidth={1.6} />
                </li>
              )}
              <li className={cn("min-w-0 xl:flex-1 xl:basis-0", closed && "hidden xl:block")}>
                <LinkAs
                  href={stage.href}
                  aria-label={`${stage.label}, ${stage.count}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-full flex-col gap-1 rounded-18 px-3.5 py-3 transition-colors xl:gap-1.5 xl:px-4.5 xl:py-4",
                    attention
                      ? "border-field border-warning bg-tint-sun text-warning-text"
                      : closed
                        ? "bg-surface-subtle hover:bg-surface"
                        : "border border-border-subtle hover:bg-surface-subtle",
                    active && !attention && "border-primary dark:border-brand",
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className={cn("truncate text-sm leading-4.5 font-semibold", !attention && "text-text-secondary")}>{stage.label}</span>
                    {stage.badge && <span className="hidden text-11 leading-3.5 font-semibold xl:inline">{stage.badge}</span>}
                  </span>
                  <span className={cn("text-2xl leading-7 font-semibold tracking-snug xl:text-30 xl:leading-9", !attention && "text-text")}>{stage.count}</span>
                  {stage.note && <span className={cn("hidden truncate text-xs leading-xs xl:block", !attention && "text-text-muted")}>{stage.note}</span>}
                </LinkAs>
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
