import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Heading, Icon } from "../../atoms";
import { NumberedSteps } from "../../molecules";

/**
 * PaymentStatusCard (organism): the MoMo screens after "Pay" (Paper: MoMo Approval, Payment
 * Failed): a status emblem, title, what's happening, a status pill, numbered tips, a hint, two
 * actions and a footnote.
 *   pending: evergreen phone emblem, spinner pill ("Waiting for approval · 2:41 left")
 *   error:   orange "!" emblem, plain pill ("No money was taken from your wallet")
 * A centred 560px card from 768px; full width on mobile.
 */
export interface PaymentStatusCardProps extends Omit<ComponentProps<"section">, "title"> {
  tone: "pending" | "error";
  /** Wrap the accent word in <em>. */
  title: ReactNode;
  description: ReactNode;
  compactDescription?: ReactNode;
  status: { label: string; detail?: string };
  steps: { title?: string; items: ReactNode[]; compactItems?: ReactNode[] };
  hint?: ReactNode;
  compactHint?: ReactNode;
  /** Two actions: a Button and a TextLink-styled link. */
  actions: ReactNode;
  footnote?: ReactNode;
  compactFootnote?: ReactNode;
}

const responsive = (full: ReactNode, compact?: ReactNode) =>
  compact ? (
    <>
      <span className="md:hidden">{compact}</span>
      <span className="hidden md:inline">{full}</span>
    </>
  ) : (
    full
  );

export function PaymentStatusCard({
  tone,
  title,
  description,
  compactDescription,
  status,
  steps,
  hint,
  compactHint,
  actions,
  footnote,
  compactFootnote,
  className,
  ...props
}: PaymentStatusCardProps) {
  const pending = tone === "pending";
  return (
    <section
      data-slot="payment-status-card"
      aria-labelledby="payment-status-title"
      aria-live="polite"
      className={cn(
        "flex w-full flex-col items-center gap-5 bg-bg px-10 py-8 text-center font-sans",
        "md:w-140 md:gap-6 md:rounded-2xl md:border md:border-border-subtle md:px-10 md:pt-10 md:pb-8",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn("flex size-34 shrink-0 items-center justify-center rounded-full", pending ? "bg-sage-50" : "bg-error/6")}
      >
        <span className={cn("flex size-25 items-center justify-center rounded-full", pending ? "bg-sage-100" : "bg-error/14")}>
          <span
            className={cn(
              "flex size-17 items-center justify-center rounded-full",
              pending ? "bg-primary text-accent" : "bg-error text-text-inverse dark:text-bg",
            )}
          >
            {pending ? (
              <Icon name="phone" size={30} strokeWidth={2} />
            ) : (
              <svg viewBox="0 0 24 24" width={30} height={30} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
                <path d="M12 7v6" />
                <circle cx="12" cy="17" r="1.4" fill="currentColor" stroke="none" />
              </svg>
            )}
          </span>
        </span>
      </span>

      <div className="flex flex-col items-center gap-2">
        <Heading as="h1" id="payment-status-title" size="dialog">
          {title}
        </Heading>
        <p className="text-base leading-base text-text-secondary md:text-md [&_strong]:font-semibold [&_strong]:text-text">
          {responsive(description, compactDescription)}
        </p>
      </div>

      <p
        role="status"
        className={cn(
          "flex items-center gap-3 rounded-full px-4.5 py-2.5 text-sm leading-xs",
          pending ? "bg-sage-50" : "bg-surface font-semibold text-text",
        )}
      >
        {pending && (
          <svg aria-hidden viewBox="0 0 24 24" width={16} height={16} fill="none" strokeWidth={3} strokeLinecap="round" className="animate-spin">
            <circle cx="12" cy="12" r="9" className="stroke-sage-200" />
            <path d="M12 3a9 9 0 0 1 9 9" className="stroke-brand" />
          </svg>
        )}
        <span className={pending ? "font-semibold text-brand" : undefined}>{status.label}</span>
        {status.detail && (
          <>
            <span aria-hidden className="h-3.5 w-px shrink-0 bg-sage-200" />
            <span className="text-text-secondary">{status.detail}</span>
          </>
        )}
      </p>

      <NumberedSteps title={steps.title} items={steps.items} className="hidden self-stretch text-left md:flex" />
      <NumberedSteps title={steps.title} items={steps.compactItems ?? steps.items} compact className="self-stretch text-left md:hidden" />

      {hint && (
        <p className="self-stretch text-sm leading-sm text-text-muted [&_strong]:font-semibold [&_strong]:text-text">
          {responsive(hint, compactHint)}
        </p>
      )}

      <div className="flex flex-col gap-2 self-stretch md:flex-row md:gap-3 md:[&>*]:flex-1 md:[&>*]:basis-0">{actions}</div>

      {footnote && <p className="text-xs leading-xs text-text-muted">{responsive(footnote, compactFootnote)}</p>}
    </section>
  );
}
