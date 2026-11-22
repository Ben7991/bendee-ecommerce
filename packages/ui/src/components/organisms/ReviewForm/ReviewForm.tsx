import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";
import { CheckboxField, TextAreaField } from "../../molecules";
import type { CheckoutSummaryTotals } from "../CheckoutSummary";

/**
 * ReviewForm (organism): the last step before paying (Paper: Checkout — Review & pay): a
 * delivery note, the SMS updates opt-in and a "keep your phone close" notice. Mobile also shows
 * the totals here (there's no sidebar); the pay button is the page's (a button from 768px, the
 * StickyActionBar on mobile), passed as `payAction`.
 */
export interface ReviewFormProps extends Omit<ComponentProps<"div">, "children"> {
  totals?: CheckoutSummaryTotals;
  smsLabel: string;
  compactSmsLabel?: string;
  notice: { title: string; text: ReactNode; compactText?: ReactNode };
  /** 768px up: the pay button. */
  payAction?: ReactNode;
  /** 768px up: legal line under the pay button. */
  legal?: ReactNode;
  notePlaceholder?: string;
}

export function ReviewForm({
  totals,
  smsLabel,
  compactSmsLabel,
  notice,
  payAction,
  legal,
  notePlaceholder = "e.g. Call when you reach the junction",
  className,
  ...props
}: ReviewFormProps) {
  const row = "flex justify-between gap-3 text-sm leading-sm";
  return (
    <div data-slot="review-form" className={cn("flex flex-col gap-4 font-sans md:gap-5", className)} {...props}>
      {totals && (
        <dl className="flex flex-col gap-2 md:hidden">
          <div className={row}>
            <dt className="text-text-secondary">{totals.subtotalLabel}</dt>
            <dd className="text-text">{totals.subtotal}</dd>
          </div>
          {totals.discount && (
            <div className={row}>
              <dt className="text-text-secondary">{totals.discountLabel}</dt>
              <dd className="font-semibold text-brand">{totals.discount}</dd>
            </div>
          )}
          <div className={row}>
            <dt className="text-text-secondary">{totals.deliveryLabel}</dt>
            <dd className={cn("font-semibold", totals.delivery === "Free" ? "text-brand" : "text-text")}>{totals.delivery}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-t border-border pt-3">
            <dt className="text-md leading-sm font-semibold text-text">Total</dt>
            <dd className="text-2xl leading-2xl font-medium tracking-snug text-text">{totals.total}</dd>
          </div>
          <p className="text-xs leading-xs text-text-muted">{totals.taxNote}</p>
        </dl>
      )}
      <TextAreaField
        label="Delivery note (optional)"
        name="note"
        placeholder={notePlaceholder}
        textareaClassName="h-12.5 px-3 md:h-20 md:px-4"
      />
      <CheckboxField
        name="sms"
        defaultChecked
        className="items-center [&_label]:text-text md:[&_label]:text-base"
        label={
          compactSmsLabel ? (
            <>
              <span className="md:hidden">{compactSmsLabel}</span>
              <span className="hidden md:inline">{smsLabel}</span>
            </>
          ) : (
            smsLabel
          )
        }
      />
      <div className="flex items-start gap-3 rounded-sm bg-tint-sun px-4 py-3 md:rounded-md md:p-4">
        <Icon name="phone" size={20} strokeWidth={2} className="size-4.5 text-warning-text md:size-5" />
        <p className="flex flex-1 flex-col gap-0.5 text-sm leading-sm text-text-secondary">
          <span className="hidden text-base font-semibold text-text md:block">{notice.title}</span>
          <span className="md:hidden">
            <strong className="font-semibold text-text">{notice.title}.</strong> {notice.compactText ?? notice.text}
          </span>
          <span className="hidden md:block">{notice.text}</span>
        </p>
      </div>
      {(payAction || legal) && (
        <div className="hidden flex-col gap-3 pt-2 md:flex">
          {payAction}
          {legal && <p className="text-center text-xs leading-xs text-text-muted">{legal}</p>}
        </div>
      )}
    </div>
  );
}
