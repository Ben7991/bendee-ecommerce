"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import {
  Icon,
  Initials,
  PaymentBadge,
  StatusChip,
  Switch,
  type IconName,
  type InitialsProps,
  type PaymentBrand,
  type StatusChipProps,
} from "../../atoms";

export interface ReturnMethod {
  /** Posted as `method`: "dropoff", "pickup", "none". */
  value: string;
  /** "Drop-off". */
  label: string;
  /** Mobile row: "Drop-off at Osu store". */
  mobileLabel?: string;
  /** "Customer brings it to Main store, Osu". */
  description: string;
  /** Tablet: "At Main store, Osu". */
  compactDescription?: string;
  /** Mobile, under the chosen row: "Logged as Damaged · refund now". */
  mobileDescription?: string;
  /** Amber note when chosen: "No stock comes back, so 1 unit is logged as Damaged…". */
  note?: string;
  /** Tablet: a shorter note. */
  compactNote?: string;
}

export interface ReturnTimelineEvent {
  id: string;
  title: string;
  /** "Today 08:12 · by customer". */
  detail: string;
  /** The latest event is amber. */
  current?: boolean;
}

export interface ReturnAction {
  /** "Approve & refund {amount}": `{amount}` becomes the refund total. */
  label: string;
  /** Posted as `intent`. */
  intent: string;
  icon?: IconName;
}

/**
 * ReturnReview (organism): the working part of a return (Paper Jofak - Admin → Return detail),
 * as one form: the header with Reject / Approve, the progress and request (slots), how the item
 * comes back (drop-off, partner pickup or no return, with a message to the customer), the refund
 * preview with the delivery-fee switch (not for exchanges), and from 1440px the customer and timeline beside it.
 * Tablet puts the actions under the refund; mobile pins them to the bottom. Posts `method`,
 * `message`, `deliveryFee` ("on" | "off"), `intent` and `fields` to `action`.
 */
export interface ReturnReviewProps extends Omit<
  ComponentProps<"form">,
  "children" | "action"
> {
  linkAs?: LinkComponent;
  backHref: string;
  backLabel?: string;
  /** "RTN-0418". */
  number: string;
  status: {
    label: string;
    compactLabel?: string;
    tone: NonNullable<StatusChipProps["tone"]>;
  };
  meta: ReactNode;
  compactMeta?: ReactNode;
  mobileMeta?: ReactNode;
  /** ReturnProgress. */
  progress?: ReactNode;
  /** ReturnRequestCard. */
  request?: ReactNode;
  /** Only while a decision is open. */
  decision?: {
    methods: ReturnMethod[];
    defaultMethod?: string;
    /** "Customer is told by SMS". */
    hint?: string;
    defaultMessage?: string;
    /** Mobile title differs: "How does the item come back?". */
    title?: string;
  };
  /** Leave out for exchanges (nothing is refunded). */
  refund?: {
    lines: { label: string; amount: number }[];
    deliveryFee?: number;
    defaultIncludeFee?: boolean;
    /** Locked once refunded. */
    locked?: boolean;
    /** "MTN 024 ••• 4521 via Paystack". */
    method: string;
    /** Tablet: "MoMo". Mobile: "MoMo · 024 ••• 4521". */
    shortMethod?: string;
    compactMethod?: string;
    brand?: PaymentBrand;
  };
  customer?: {
    name: string;
    tone?: InitialsProps["tone"];
    tag?: string;
    /** "14 orders · GHS 3,940 lifetime". */
    stats: string;
    profileHref: string;
    /** "1 in 14 orders". */
    pastReturns?: string;
  };
  timeline?: ReturnTimelineEvent[];
  primary?: ReturnAction;
  secondary?: ReturnAction;
  action?: string | ((formData: FormData) => void | Promise<void>);
  fields?: Record<string, string>;
  currency?: string;
}

const money = (value: number) =>
  value.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const whole = (value: number) =>
  value.toLocaleString("en-GH", { maximumFractionDigits: 2 });

export function ReturnReview({
  linkAs: LinkAs = "a",
  backHref,
  backLabel = "Returns",
  number,
  status,
  meta,
  compactMeta,
  mobileMeta,
  progress,
  request,
  decision,
  refund,
  customer,
  timeline = [],
  primary,
  secondary,
  action,
  fields = {},
  currency = "GHS",
  className,
  ...props
}: ReturnReviewProps) {
  const id = useId();
  const [method, setMethod] = useState(
    decision?.defaultMethod ?? decision?.methods[0]?.value ?? "",
  );
  const [includeFee, setIncludeFee] = useState(
    Boolean(refund?.defaultIncludeFee),
  );
  const [message, setMessage] = useState(decision?.defaultMessage ?? "");

  const items = refund?.lines.reduce((sum, line) => sum + line.amount, 0) ?? 0;
  const fee = refund?.deliveryFee ?? 0;
  const total = items + (includeFee ? fee : 0);
  const chosen = decision?.methods.find((item) => item.value === method);
  const label = (entry: ReturnAction) =>
    entry.label.replace("{amount}", `${currency} ${whole(total)}`);

  const feeSwitch = (labelled: string) =>
    refund?.deliveryFee !== undefined && (
      <Switch
        size="admin"
        aria-label={labelled}
        checked={includeFee}
        disabled={refund?.locked}
        onCheckedChange={setIncludeFee}
        className="data-[state=checked]:bg-primary dark:data-[state=checked]:bg-brand"
      />
    );

  const buttons = (place: "header" | "inline" | "bar") => (
    <>
      {secondary && (
        <button
          type="submit"
          name="intent"
          value={secondary.intent}
          formNoValidate
          className={cn(
            "flex shrink-0 items-center justify-center gap-2 rounded-full border border-error px-4.5 font-semibold text-error hover:bg-tint-citrus/50",
            place === "header"
              ? "h-11 text-14 leading-4.5"
              : "h-12 px-5.5 text-base leading-5",
          )}
        >
          {secondary.icon && <Icon name={secondary.icon} size={14} />}
          {label(secondary)}
        </button>
      )}
      {primary && (
        <button
          type="submit"
          name="intent"
          value={primary.intent}
          className={cn(
            "flex items-center justify-center gap-2 rounded-full bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover",
            place === "header"
              ? "h-11 text-14 leading-4.5"
              : "h-12 flex-1 text-base leading-5",
          )}
        >
          {primary.icon && place === "header" && (
            <Icon name={primary.icon} size={14} strokeWidth={2.4} />
          )}
          {label(primary)}
        </button>
      )}
    </>
  );

  const card = "rounded-lg border border-border-subtle";

  return (
    <form
      data-slot="return-review"
      action={action}
      className={cn(
        "flex flex-col gap-4 pb-24 font-sans md:gap-5 md:pb-0 xl:gap-6",
        className,
      )}
      {...props}
    >
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {decision && <input type="hidden" name="method" value={method} />}
      {refund && (
        <input
          type="hidden"
          name="deliveryFee"
          value={includeFee ? "on" : "off"}
        />
      )}

      <header className="flex flex-col gap-3.5 md:gap-4">
        <LinkAs
          href={backHref}
          className="flex w-fit items-center gap-1 text-14 leading-4.5 font-semibold text-text-muted hover:text-text md:gap-1.5 md:text-sm md:leading-4"
        >
          <Icon
            name="chevronLeft"
            size={16}
            strokeWidth={1.8}
            className="md:size-3.5"
          />
          {backLabel}
        </LinkAs>
        <div className="flex items-end justify-between gap-5">
          <div className="flex min-w-0 flex-col gap-1 xl:gap-1.5">
            <div className="flex flex-wrap items-center gap-2 xl:gap-3">
              <h1 className="text-24 leading-7.5 font-semibold tracking-tight text-text md:text-28 md:leading-8.5 xl:text-3xl xl:leading-9.5">
                {number}
              </h1>
              <StatusChip
                tone={status.tone}
                className="px-2.5 py-0.75 text-xs leading-xs xl:text-sm xl:leading-4"
              >
                {status.compactLabel ? (
                  <>
                    <span className="xl:hidden">{status.compactLabel}</span>
                    <span className="hidden xl:inline">{status.label}</span>
                  </>
                ) : (
                  status.label
                )}
              </StatusChip>
            </div>
            <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5 xl:text-14 xl:leading-5">
              {mobileMeta && <span className="md:hidden">{mobileMeta}</span>}
              {compactMeta && (
                <span
                  className={cn("xl:hidden", mobileMeta && "hidden md:inline")}
                >
                  {compactMeta}
                </span>
              )}
              <span
                className={cn(
                  compactMeta
                    ? "hidden xl:inline"
                    : mobileMeta
                      ? "hidden md:inline"
                      : "",
                )}
              >
                {meta}
              </span>
            </p>
          </div>
          {(primary || secondary) && (
            <div className="hidden shrink-0 gap-2.5 xl:flex">
              {buttons("header")}
            </div>
          )}
        </div>
      </header>

      {progress}

      <div className="flex flex-col gap-4 md:gap-5 xl:flex-row xl:items-start xl:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-4 md:gap-5 xl:gap-6">
          {request}

          {decision && (
            <>
              {/* Tablet and desktop: method cards and a message. */}
              <fieldset className="hidden flex-col gap-3.5 rounded-lg border-field border-primary px-4.5 py-4.5 md:flex xl:px-5 dark:border-brand">
                <legend className="sr-only">
                  {decision.title ??
                    "If you approve, how does the item come back?"}
                </legend>
                <div
                  aria-hidden
                  className="flex items-center justify-between gap-3"
                >
                  <p className="text-base leading-5 font-semibold text-text xl:text-md">
                    {decision.title ??
                      "If you approve, how does the item come back?"}
                  </p>
                  {decision.hint && (
                    <span className="hidden text-xs leading-xs text-text-muted xl:inline">
                      {decision.hint}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {decision.methods.map((item) => {
                    const checked = item.value === method;
                    return (
                      <label
                        key={item.value}
                        className={cn(
                          "flex cursor-pointer flex-col gap-1 rounded-14 p-3 xl:p-3.5",
                          checked
                            ? "border-field border-primary bg-sage-50 dark:border-brand"
                            : "border border-border hover:bg-surface-subtle",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`${id}-method`}
                            value={item.value}
                            checked={checked}
                            onChange={() => setMethod(item.value)}
                            className="peer sr-only"
                          />
                          <span
                            aria-hidden
                            className={cn(
                              "size-4.5 shrink-0 rounded-full bg-bg peer-focus-visible:outline-2 peer-focus-visible:outline-brand",
                              checked
                                ? "border-5 border-primary dark:border-brand"
                                : "border-field border-border",
                            )}
                          />
                          <span className="text-14 leading-4.5 font-semibold text-text">
                            <span className="xl:hidden">
                              {item.mobileLabel && item.value === "none"
                                ? "No return"
                                : item.label}
                            </span>
                            <span className="hidden xl:inline">
                              {item.label}
                            </span>
                          </span>
                        </span>
                        <span className="pl-6.5 text-xs leading-4.25 text-text-muted">
                          <span className="xl:hidden">
                            {item.compactDescription ?? item.description}
                          </span>
                          <span className="hidden xl:inline">
                            {item.description}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                {chosen?.note && (
                  <p className="flex items-center gap-2.5 rounded-sm bg-tint-sun px-3 py-2.5 text-sm leading-4.5 text-warning-text">
                    <Icon
                      name="warning"
                      size={16}
                      className="hidden shrink-0 xl:inline-block"
                    />
                    <span className="xl:hidden">
                      {chosen.compactNote ?? chosen.note}
                    </span>
                    <span className="hidden xl:inline">{chosen.note}</span>
                  </p>
                )}
                <span className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`${id}-message`}
                    className="text-sm leading-4 font-semibold text-text max-xl:sr-only"
                  >
                    Message to customer{" "}
                    <span className="font-regular text-text-muted">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id={`${id}-message`}
                    name="message"
                    rows={2}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Message to the customer (optional)"
                    className="min-h-12 resize-none rounded-sm border border-border bg-bg p-3 text-14 leading-5 text-text outline-none field-sizing-content focus:border-primary xl:min-h-14 dark:focus:border-brand"
                  />
                </span>
              </fieldset>

              {/* Mobile: rows. */}
              <fieldset className="flex flex-col gap-2 md:hidden">
                <legend className="mb-2 text-14 leading-4.5 font-semibold text-text">
                  How does the item come back?
                </legend>
                <div className="flex flex-col overflow-clip rounded-md border border-border-subtle">
                  {decision.methods.map((item) => {
                    const checked = item.value === method;
                    return (
                      <label
                        key={item.value}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 border-border-subtle px-3.5 py-3 not-first:border-t",
                          checked && "bg-sage-50",
                        )}
                      >
                        <input
                          type="radio"
                          name={`${id}-mobile`}
                          value={item.value}
                          checked={checked}
                          onChange={() => setMethod(item.value)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden
                          className={cn(
                            "size-4.5 shrink-0 rounded-full bg-bg",
                            checked
                              ? "border-5 border-primary dark:border-brand"
                              : "border-field border-border",
                          )}
                        />
                        <span className="flex flex-col">
                          <span className="text-14 leading-4.5 font-semibold text-text">
                            {item.mobileLabel ?? item.label}
                          </span>
                          {checked && item.mobileDescription && (
                            <span className="text-xs leading-xs text-text-muted">
                              {item.mobileDescription}
                            </span>
                          )}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </>
          )}

          {/* Tablet: refund rows. */}
          {refund && (
            <dl
              className={cn(
                card,
                "hidden flex-col gap-2.5 px-4.5 py-4 md:flex xl:hidden",
              )}
            >
              {refund.lines.map((line) => (
                <div
                  key={line.label}
                  className="flex justify-between gap-3 text-14 leading-4.5"
                >
                  <dt className="text-text-secondary">{line.label}</dt>
                  <dd className="text-text">
                    {currency} {money(line.amount)}
                  </dd>
                </div>
              ))}
              {refund.deliveryFee !== undefined && (
                <div className="flex items-center justify-between gap-3 text-14 leading-4.5">
                  <dt className="text-text-secondary">
                    Delivery fee{" "}
                    <span className="text-xs text-text-muted">
                      · only if our fault
                    </span>
                  </dt>
                  <dd>{feeSwitch("Refund the delivery fee")}</dd>
                </div>
              )}
              <div className="flex justify-between gap-3 border-t border-border-subtle pt-2.5 text-base leading-5 font-semibold text-text">
                <dt>To refund · {refund.shortMethod ?? refund.method}</dt>
                <dd>
                  {currency} {money(total)}
                </dd>
              </div>
            </dl>
          )}

          {/* Mobile: refund summary. */}
          {refund && (
            <div className="flex items-center justify-between gap-3 rounded-md bg-surface-subtle p-3.5 md:hidden">
              <p className="flex flex-col text-xs leading-xs text-text-muted">
                <span>Refund to {refund.compactMethod ?? refund.method}</span>
                {refund.deliveryFee !== undefined && (
                  <span>
                    Delivery fee {includeFee ? "refunded" : "not refunded"}
                  </span>
                )}
              </p>
              <p className="shrink-0 text-lg leading-5.5 font-semibold text-text">
                {currency} {whole(total)}
              </p>
            </div>
          )}

          {(primary || secondary) && (
            <div className="hidden gap-2.5 md:flex xl:hidden">
              {buttons("inline")}
            </div>
          )}
        </div>

        {/* Desktop: customer, refund preview, timeline. */}
        <aside className="hidden w-90 shrink-0 flex-col gap-4 xl:flex">
          {customer && (
            <section
              aria-label="Customer"
              className={cn(card, "flex flex-col gap-3 px-5 py-4.5")}
            >
              <div className="flex items-center gap-3">
                <Initials
                  name={customer.name}
                  size="row"
                  tone={customer.tone ?? "sage"}
                  className="md:size-10"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-base leading-4.5 font-semibold text-text">
                    {customer.name}
                    {customer.tag && (
                      <span className="ml-1 text-11 leading-3.5 font-bold text-brand">
                        {customer.tag}
                      </span>
                    )}
                  </p>
                  <p className="text-xs leading-xs text-text-muted">
                    {customer.stats}
                  </p>
                </div>
                <LinkAs
                  href={customer.profileHref}
                  className="text-xs leading-xs font-semibold text-brand hover:underline"
                >
                  Profile
                </LinkAs>
              </div>
              {customer.pastReturns && (
                <p className="flex justify-between border-t border-border-subtle pt-2.5 text-sm leading-4">
                  <span className="text-text-secondary">Past returns</span>
                  <span className="font-semibold text-text">
                    {customer.pastReturns}
                  </span>
                </p>
              )}
            </section>
          )}

          {refund && (
            <section
              aria-labelledby={`${id}-refund`}
              className={cn(card, "flex flex-col gap-2.5 px-5 py-4.5")}
            >
              <h2
                id={`${id}-refund`}
                className="text-base leading-4.5 font-semibold text-text"
              >
                Refund preview
              </h2>
              {refund.lines.map((line) => (
                <p
                  key={line.label}
                  className="flex justify-between gap-3 text-14 leading-4.5"
                >
                  <span className="text-text-secondary">{line.label}</span>
                  <span className="text-text">
                    {currency} {money(line.amount)}
                  </span>
                </p>
              ))}
              {refund.deliveryFee !== undefined && (
                <div className="flex items-center justify-between gap-3">
                  <p className="flex flex-col">
                    <span className="text-14 leading-4.5 text-text-secondary">
                      Delivery fee
                    </span>
                    <span className="text-11 leading-3.5 text-text-muted">
                      Refund only if it was our fault
                    </span>
                  </p>
                  <span className="flex items-center gap-2">
                    <span className="text-sm leading-4 text-text-muted">
                      {currency} {whole(refund.deliveryFee)}
                    </span>
                    {feeSwitch("Refund the delivery fee")}
                  </span>
                </div>
              )}
              <p className="flex justify-between gap-3 border-t border-border-subtle pt-2.5 text-md leading-5 font-semibold text-text">
                <span>To refund</span>
                <span>
                  {currency} {money(total)}
                </span>
              </p>
              <p className="flex items-center gap-2 text-xs leading-xs text-text-muted">
                {refund.brand && (
                  <PaymentBadge brand={refund.brand} size="xs" />
                )}
                {refund.method}
              </p>
            </section>
          )}

          {timeline.length > 0 && (
            <section
              aria-labelledby={`${id}-timeline`}
              className={cn(card, "flex flex-col gap-3 px-5 py-4.5")}
            >
              <h2
                id={`${id}-timeline`}
                className="text-base leading-4.5 font-semibold text-text"
              >
                Timeline
              </h2>
              <ol className="flex flex-col gap-3">
                {timeline.map((event) => (
                  <li key={event.id} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1.5 size-2 shrink-0 rounded-full",
                        event.current ? "bg-warning" : "bg-border",
                      )}
                    />
                    <span className="flex flex-col">
                      <span className="text-sm leading-4.5 text-text">
                        {event.title}
                      </span>
                      <span className="text-xs leading-xs text-text-muted">
                        {event.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </aside>
      </div>

      {/* Mobile: actions pinned to the bottom. */}
      {(primary || secondary) && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-border-subtle bg-bg px-4 pt-3 pb-6 md:hidden dark:bg-surface">
          {buttons("bar")}
        </div>
      )}
    </form>
  );
}
