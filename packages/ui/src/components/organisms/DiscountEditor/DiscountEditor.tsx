"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";

import {
  checkoutPreview,
  cn,
  describeDiscount,
  discountDay,
  discountTarget,
  ELIGIBILITY_LABELS,
  type DiscountEligibility,
  type DiscountRules,
  type DiscountScope,
  type DiscountType,
  type LinkComponent,
} from "../../../lib";
import { Checkbox, Icon, ProgressBar, StatusChip, Switch, type StatusChipProps } from "../../atoms";

export interface DiscountProductOption {
  /** The name saved in `targets` ("Greens Daily"). */
  name: string;
  /** "All 2 variants · GHS 140 – 260". */
  note: string;
  image?: ReactNode;
}

/**
 * DiscountEditor (organism): the whole discount editor (Paper Jofak - Admin → Discount editor):
 * header (back, code in mono, status; from 1440px Pause, Duplicate and Save), how customers get
 * it (code or automatic), the discount type and value, what it applies to, who and how often,
 * and active dates, beside "In plain words" (rewritten as you edit), an "At checkout" sample and
 * performance from 1440px. Tablet stacks the cards under the summary; mobile shows the method and
 * value cards, then rows (Applies to, Who, Limits, Active dates) that open their card (#applies,
 * #who, #dates) and the combine switch. Every value is a hidden input, so put it inside a form
 * (ProductEditorForm); Pause and Duplicate submit `intent=pause|duplicate`.
 */
export interface DiscountEditorProps extends Omit<ComponentProps<"div">, "defaultValue" | "title"> {
  linkAs?: LinkComponent;
  backHref: string;
  backLabel?: string;
  /** The saved code or name, for the header. */
  title: string;
  status: { label: string; tone: NonNullable<StatusChipProps["tone"]> };
  defaultValue: DiscountRules;
  /** Shown after the code help: "Greens Daily launch push". */
  internalNote?: string;
  /** Paused discounts show Resume. */
  paused?: boolean;
  products: DiscountProductOption[];
  collections: string[];
  categories: string[];
  /** The "At checkout" sample cart. */
  preview: { item: { label: string; price: number }; delivery: { label: string; fee: number } };
  /** Uses so far, for "136 left" and the mobile progress line. */
  usage: { uses: number; revenue: string };
  performance?: { revenue: string; cost: string; newCustomers: number; rejected: number; ordersHref: string };
}

const TYPES: { type: DiscountType; label: string; short: string; symbol?: string }[] = [
  { type: "percentage", label: "Percentage", short: "Percentage", symbol: "%" },
  { type: "fixed", label: "Fixed amount", short: "Fixed", symbol: "₵" },
  { type: "delivery", label: "Free delivery", short: "Free delivery" },
];

const SCOPES: { scope: DiscountScope; label: string }[] = [
  { scope: "order", label: "Whole order" },
  { scope: "products", label: "Specific products" },
  { scope: "collections", label: "Collections" },
  { scope: "categories", label: "Categories" },
];

const CARD = "flex flex-col gap-3 rounded-18 border border-border-subtle p-4 md:gap-4 md:rounded-lg md:px-6 md:py-5.5";
const CARD_TITLE = "text-base leading-5 font-semibold text-text md:text-md md:leading-5.5";
const LABEL = "text-xs leading-xs font-semibold text-text-secondary md:text-sm md:leading-4.5";
const BOX =
  "flex h-11 items-center gap-2 rounded-sm border border-border bg-bg px-3 focus-within:border-primary md:h-11.5 md:px-3.5 dark:bg-surface";
const INPUT = "w-full min-w-0 bg-transparent text-base leading-5 font-semibold text-text outline-none placeholder:font-regular placeholder:text-text-muted";
const OVERLINE = "text-xs leading-xs font-semibold tracking-overline uppercase";
const BUTTON = "flex h-11.5 shrink-0 items-center rounded-sm border border-border px-3.5 text-14 leading-4.5 font-semibold text-text hover:bg-surface-subtle md:px-4";
const HEADER_BUTTON = "flex h-11 items-center rounded-full border border-border px-4.5 text-14 leading-4.5 font-semibold text-text hover:bg-surface-subtle";
/** Mobile: a card opened from its settings row (#applies…). */
const DISCLOSE = "hidden scroll-mt-24 target:flex md:flex";

const number = (value: string) => (value.trim() === "" ? null : Math.max(0, Number(value)));
const ghs = (amount: number) => `GHS ${Math.abs(amount).toLocaleString("en-GB")}`;

function randomCode() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const pick = () => letters[Math.floor(Math.random() * letters.length)];
  return `${pick()}${pick()}${pick()}${pick()}${Math.floor(10 + Math.random() * 90)}`;
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("flex gap-0.5 rounded-full bg-surface-subtle p-0.75", className)}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex flex-1 basis-0 justify-center rounded-full px-3.5 py-1.75 text-sm leading-4 md:flex-none md:py-1.5",
              active ? "bg-bg font-semibold text-text shadow-xs dark:bg-surface" : "font-medium text-text-secondary hover:text-text",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, htmlFor, children, className }: { label: ReactNode; htmlFor?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-1 basis-0 flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className={LABEL}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function DiscountEditor({
  linkAs: LinkAs = "a",
  backHref,
  backLabel = "Discounts",
  title,
  status,
  defaultValue,
  internalNote,
  paused = false,
  products,
  collections,
  categories,
  preview,
  usage,
  performance,
  className,
  ...props
}: DiscountEditorProps) {
  const id = useId();
  const [rules, setRules] = useState<DiscountRules>(defaultValue);
  const set = <K extends keyof DiscountRules>(key: K, value: DiscountRules[K]) => setRules((current) => ({ ...current, [key]: value }));

  const code = rules.method === "code";
  const summary = describeDiscount(rules);
  const short = describeDiscount(rules, { short: true });
  const checkout = checkoutPreview(rules, preview.item, preview.delivery);
  const limit = rules.batch ?? rules.totalUses;
  const left = limit ? Math.max(0, limit - usage.uses) : null;
  const options = rules.scope === "collections" ? collections : rules.scope === "categories" ? categories : [];
  const unpicked = products.filter((product) => !rules.targets.includes(product.name));
  const toggleTarget = (name: string) =>
    set("targets", rules.targets.includes(name) ? rules.targets.filter((target) => target !== name) : [...rules.targets, name]);

  const appliesLabel = rules.scope === "order" ? "Whole order" : discountTarget(rules).replace(/^the /, "").replace(/^\w/, (letter) => letter.toUpperCase());
  const who = `${ELIGIBILITY_LABELS[rules.eligibility]} · ${rules.minSpend ? `over ${ghs(rules.minSpend)}` : "no minimum spend"}`;
  const limits = `${limit ? `${limit} total` : "No total limit"} · ${rules.perCustomer ? `${rules.perCustomer} per customer` : "no limit per customer"}`;
  const dates = rules.endsAt
    ? `${discountDay(rules.startsAt)} – ${discountDay(rules.endsAt, true)}`
    : `From ${discountDay(rules.startsAt, true)} · no end`;

  const combine = (
    <Switch
      size="field"
      checked={rules.combine}
      onCheckedChange={(checked) => set("combine", checked)}
      aria-label="Combine with other discounts"
    />
  );

  return (
    <div data-slot="discount-editor" className={cn("flex flex-col gap-3.5 font-sans md:gap-5 xl:gap-6", className)} {...props}>
      {/* Every value, for the form. */}
      <input type="hidden" name="method" value={rules.method} />
      <input type="hidden" name="code" value={rules.code} />
      <input type="hidden" name="name" value={rules.name} />
      <input type="hidden" name="batch" value={rules.batch ?? ""} />
      <input type="hidden" name="type" value={rules.type} />
      <input type="hidden" name="value" value={rules.value} />
      <input type="hidden" name="cap" value={rules.cap ?? ""} />
      <input type="hidden" name="scope" value={rules.scope} />
      <input type="hidden" name="targets" value={JSON.stringify(rules.targets)} />
      <input type="hidden" name="excludeSale" value={String(rules.excludeSale)} />
      <input type="hidden" name="minSpend" value={rules.minSpend ?? ""} />
      <input type="hidden" name="eligibility" value={rules.eligibility} />
      <input type="hidden" name="totalUses" value={rules.totalUses ?? ""} />
      <input type="hidden" name="perCustomer" value={rules.perCustomer ?? ""} />
      <input type="hidden" name="combine" value={String(rules.combine)} />
      <input type="hidden" name="startsAt" value={rules.startsAt} />
      <input type="hidden" name="endsAt" value={rules.endsAt ?? ""} />

      {/* Header. */}
      <header className="flex items-end justify-between gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 md:gap-2">
          <LinkAs href={backHref} className="flex w-fit items-center gap-1.5 text-sm leading-4.5 font-medium text-text-muted hover:text-text">
            <Icon name="chevronLeft" size={14} strokeWidth={1.6} />
            {backLabel}
          </LinkAs>
          <div className="flex items-center justify-between gap-3 md:justify-start">
            <h1
              className={cn(
                "truncate font-semibold tracking-compact text-text",
                code ? "font-mono text-24 leading-8 md:text-28 md:leading-9 xl:text-3xl xl:leading-10" : "text-24 leading-8 md:text-28 md:leading-9 xl:text-3xl xl:leading-10",
              )}
            >
              {title}
            </h1>
            <StatusChip tone={status.tone} className="shrink-0 px-2.5 py-0.5 text-xs leading-5 md:text-sm">
              {status.label}
            </StatusChip>
          </div>
        </div>
        <div className="hidden shrink-0 items-center gap-2.5 xl:flex">
          <button type="submit" name="intent" value="pause" className={HEADER_BUTTON}>
            {paused ? "Resume" : "Pause"}
          </button>
          <button type="submit" name="intent" value="duplicate" className={HEADER_BUTTON}>
            Duplicate
          </button>
          <button type="submit" className="flex h-11 items-center rounded-full bg-primary px-5.5 text-14 leading-4.5 font-semibold text-on-primary hover:bg-primary-hover">
            Save changes
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-start xl:gap-6">
        <div className="contents xl:flex xl:min-w-0 xl:flex-1 xl:flex-col xl:gap-4">
          {/* How customers get it. */}
          <section aria-labelledby={`${id}-method`} className={CARD}>
            <div className="flex items-center justify-between gap-3">
              <h2 id={`${id}-method`} className={cn(CARD_TITLE, "sr-only md:not-sr-only")}>
                How customers get it
              </h2>
              <Segmented
                label="How customers get it"
                value={rules.method}
                options={[
                  { value: "code", label: "Code" },
                  { value: "automatic", label: "Automatic" },
                ]}
                onChange={(method) => set("method", method)}
                className="flex-1 md:flex-none"
              />
            </div>
            {code ? (
              <div className="flex gap-2 md:gap-2.5">
                <div className="flex h-11.5 min-w-0 flex-1 items-center gap-2 rounded-sm border-field border-primary bg-bg px-3.5 dark:bg-surface">
                  <input
                    aria-label={rules.batch ? "Code prefix" : "Discount code"}
                    value={rules.code}
                    onChange={(event) => set("code", event.target.value.toUpperCase().replace(/\s/g, ""))}
                    placeholder="SUMMER15"
                    className={cn(INPUT, "font-mono tracking-label uppercase")}
                  />
                  {rules.batch && <span className="shrink-0 font-mono text-base leading-5 text-text-muted">••••</span>}
                </div>
                {rules.batch ? (
                  <label className="flex h-11.5 w-28 shrink-0 items-center gap-2 rounded-sm border border-border px-3.5 focus-within:border-primary">
                    <span className="sr-only">Number of codes</span>
                    <input
                      type="number"
                      min={1}
                      value={rules.batch}
                      onChange={(event) => set("batch", number(event.target.value) || 1)}
                      className={INPUT}
                    />
                    <span className="text-sm leading-4.5 text-text-muted">codes</span>
                  </label>
                ) : (
                  <button type="button" onClick={() => set("code", randomCode())} className={BUTTON}>
                    Generate
                  </button>
                )}
                <button
                  type="button"
                  aria-pressed={rules.batch !== null}
                  onClick={() => set("batch", rules.batch ? null : 40)}
                  className={cn(BUTTON, "hidden md:flex", rules.batch && "border-primary bg-sage-50")}
                >
                  Bulk codes
                </button>
              </div>
            ) : (
              <div className={cn(BOX, "h-11.5 border-field border-primary")}>
                <input
                  aria-label="Offer name"
                  value={rules.name}
                  onChange={(event) => set("name", event.target.value)}
                  placeholder="Free delivery over GHS 300"
                  className={INPUT}
                />
              </div>
            )}
            <p className="hidden text-sm leading-4.5 text-text-muted md:block">
              {code
                ? rules.batch
                  ? `${rules.batch} single-use codes, each starting ${rules.code || "with the prefix"}. `
                  : "Customers type this at checkout. Not case-sensitive. "
                : "Applies by itself at checkout when the cart qualifies; customers see the name. "}
              {internalNote && (
                <>
                  Internal note: <span className="font-medium text-text-secondary">{internalNote}</span>
                </>
              )}
            </p>
          </section>

          {/* Discount type and value. */}
          <section aria-labelledby={`${id}-value`} className={CARD}>
            <h2 id={`${id}-value`} className={CARD_TITLE}>
              Discount
            </h2>
            <div role="radiogroup" aria-label="Discount type" className="grid grid-cols-2 gap-2 md:flex md:gap-2.5">
              {TYPES.map((option) => {
                const active = rules.type === option.type;
                return (
                  <button
                    key={option.type}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={option.label}
                    onClick={() => set("type", option.type)}
                    className={cn(
                      "flex items-center gap-2 rounded-sm p-3 text-left md:flex-1 md:basis-0 md:flex-col md:items-start md:gap-1 md:rounded-14 md:p-3.5",
                      active ? "border-field border-primary bg-sage-50" : "border border-border hover:bg-surface-subtle",
                    )}
                  >
                    {option.symbol ? (
                      <span aria-hidden className={cn("text-md leading-5 font-semibold md:text-xl md:leading-6", active ? "text-text" : "text-text-secondary")}>
                        {option.symbol}
                      </span>
                    ) : (
                      <Icon name="truck" size={18} strokeWidth={1.7} className="text-text-secondary md:size-6" />
                    )}
                    <span className="text-sm leading-4.5 font-semibold text-text md:text-14">
                      <span className="md:hidden">{option.short}</span>
                      <span className="hidden md:inline">{option.label}</span>
                    </span>
                  </button>
                );
              })}
              <span
                role="radio"
                aria-checked={false}
                aria-disabled
                aria-label="Buy X get Y (coming soon)"
                className="flex items-center gap-2 rounded-sm border border-dashed border-border bg-surface-subtle p-3 md:flex-1 md:basis-0 md:flex-col md:items-start md:gap-1 md:rounded-14 md:p-3.5"
              >
                <span aria-hidden className="hidden text-xl leading-6 font-semibold text-text-muted md:block">
                  2+1
                </span>
                <span className="flex items-center gap-1.5 text-sm leading-4.5 font-semibold text-text-muted md:text-14">
                  Buy X get Y <span className="md:hidden">· Soon</span>
                  <span className="hidden text-11 leading-3.5 md:inline">Soon</span>
                </span>
              </span>
            </div>
            {rules.type === "delivery" ? (
              <p className="text-sm leading-4.5 text-text-muted">Delivery is free when the cart qualifies. Set a minimum spend under Who and how often.</p>
            ) : (
              <div className="flex gap-2 md:gap-4">
                <Field
                  htmlFor={`${id}-amount`}
                  label={rules.type === "percentage" ? <><span className="md:hidden">Percent off</span><span className="hidden md:inline">Percentage off</span></> : "Amount off"}
                  className="md:w-50 md:flex-none"
                >
                  <div className={BOX}>
                    {rules.type === "fixed" && <span className="text-14 leading-5 text-text-muted md:text-base">GHS</span>}
                    <input
                      id={`${id}-amount`}
                      type="number"
                      min={0}
                      max={rules.type === "percentage" ? 100 : undefined}
                      value={rules.value}
                      onChange={(event) => set("value", number(event.target.value) ?? 0)}
                      className={INPUT}
                    />
                    {rules.type === "percentage" && <span className="text-14 leading-5 text-text-muted md:text-base">%</span>}
                  </div>
                </Field>
                {rules.type === "percentage" && (
                  <Field htmlFor={`${id}-cap`} label={<><span className="md:hidden">Cap at</span><span className="hidden md:inline">Cap the discount at</span></>}>
                    <div className={BOX}>
                      <span className="text-14 leading-5 text-text-muted md:text-base">GHS</span>
                      <input
                        id={`${id}-cap`}
                        type="number"
                        min={0}
                        value={rules.cap ?? ""}
                        placeholder="No cap"
                        onChange={(event) => set("cap", number(event.target.value))}
                        className={cn(INPUT, "field-sizing-content w-auto min-w-6 flex-none")}
                      />
                      <span className="hidden text-sm leading-4.5 text-text-muted md:inline">· optional</span>
                    </div>
                  </Field>
                )}
              </div>
            )}
          </section>

          {/* Mobile: settings rows that open their cards. */}
          <ul className="flex flex-col overflow-clip rounded-18 border border-border-subtle md:hidden">
            {[
              { href: "#applies", label: "Applies to", value: appliesLabel },
              { href: "#who", label: "Who", value: who },
              { href: "#who", label: "Limits", value: limits },
              { href: "#dates", label: "Active dates", value: dates },
            ].map((row) => (
              <li key={row.label} className="border-b border-border-subtle">
                <a href={row.href} className="flex items-center gap-3 px-4 py-3.5">
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-xs leading-xs text-text-muted">{row.label}</span>
                    <span className="truncate text-14 leading-5 font-semibold text-text">{row.value}</span>
                  </span>
                  <Icon name="chevronRight" size={14} strokeWidth={1.6} className="shrink-0 text-text-muted" />
                </a>
              </li>
            ))}
            <li className="flex items-center gap-3 px-4 py-3.5">
              <span className="flex flex-1 flex-col gap-0.5">
                <span className="text-14 leading-5 font-semibold text-text">Combine with others</span>
                <span className="text-xs leading-xs text-text-muted">{rules.combine ? "On: stacks with other discounts" : "Off: best single discount wins"}</span>
              </span>
              {combine}
            </li>
          </ul>

          {/* Applies to. */}
          <section id="applies" aria-labelledby={`${id}-applies`} className={cn(CARD, DISCLOSE)}>
            <h2 id={`${id}-applies`} className={CARD_TITLE}>
              Applies to
            </h2>
            <div role="radiogroup" aria-label="Applies to" className="flex flex-wrap gap-2">
              {SCOPES.map((option) => {
                const active = rules.scope === option.scope;
                return (
                  <button
                    key={option.scope}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setRules((current) => ({ ...current, scope: option.scope, targets: option.scope === current.scope ? current.targets : [] }))}
                    className={cn(
                      "rounded-full px-3.5 py-1.75 text-sm leading-4",
                      active ? "bg-primary font-semibold text-on-primary" : "border border-border py-1.5 font-medium text-text-secondary hover:text-text",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            {rules.scope === "order" && <p className="text-sm leading-4.5 text-text-muted">Applies to everything in the cart.</p>}
            {rules.scope === "products" && (
              <>
                {rules.targets.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {rules.targets.map((name) => {
                      const product = products.find((item) => item.name === name);
                      return (
                        <li key={name} className="flex items-center gap-3 rounded-14 bg-surface-subtle px-3 py-2.5">
                          <span className="relative size-10 shrink-0 overflow-hidden rounded-10 bg-bg">{product?.image}</span>
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-14 leading-5 font-semibold text-text">{name}</span>
                            {product && <span className="truncate text-xs leading-xs text-text-muted">{product.note}</span>}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleTarget(name)}
                            aria-label={`Remove ${name}`}
                            className="text-sm leading-4.5 font-semibold text-text-secondary hover:text-text"
                          >
                            Remove
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {unpicked.length > 0 && (
                  <label className="relative flex h-10.5 items-center gap-2 rounded-sm border border-dashed border-border px-3.5 text-sm leading-4 text-text-muted focus-within:border-primary">
                    <Icon name="search" size={15} strokeWidth={1.5} className="shrink-0" />
                    <span className="sr-only">Add products</span>
                    <select
                      value=""
                      onChange={(event) => event.target.value && toggleTarget(event.target.value)}
                      className="absolute inset-0 cursor-pointer appearance-none opacity-0"
                    >
                      <option value="">Add products</option>
                      {unpicked.map((product) => (
                        <option key={product.name} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    <span aria-hidden>Add products</span>
                  </label>
                )}
              </>
            )}
            {(rules.scope === "collections" || rules.scope === "categories") && (
              <ul aria-label={rules.scope === "collections" ? "Collections" : "Categories"} className="flex flex-wrap gap-2">
                {options.map((name) => {
                  const picked = rules.targets.includes(name);
                  return (
                    <li key={name}>
                      <button
                        type="button"
                        aria-pressed={picked}
                        onClick={() => toggleTarget(name)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm leading-4",
                          picked ? "bg-sage-100 font-semibold text-brand" : "border border-border py-1.25 font-medium text-text-secondary hover:text-text",
                        )}
                      >
                        {picked && <Icon name="check" size={12} strokeWidth={2.2} />}
                        {name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {rules.type !== "delivery" && (
              <label className="flex w-fit items-center gap-2 text-sm leading-4.5 text-text-secondary">
                <Checkbox checked={rules.excludeSale} onCheckedChange={(checked) => set("excludeSale", checked === true)} />
                Exclude items already on sale
              </label>
            )}
          </section>

          {/* Who and how often. */}
          <section id="who" aria-labelledby={`${id}-who`} className={cn(CARD, DISCLOSE, "md:gap-4.5")}>
            <h2 id={`${id}-who`} className={CARD_TITLE}>
              Who and how often
            </h2>
            <div className="flex flex-col gap-3 md:flex-row md:gap-4">
              <Field htmlFor={`${id}-min`} label="Minimum spend">
                <div className={BOX}>
                  <span className="text-base leading-5 text-text-muted">GHS</span>
                  <input
                    id={`${id}-min`}
                    type="number"
                    min={0}
                    value={rules.minSpend ?? ""}
                    placeholder="None"
                    onChange={(event) => set("minSpend", number(event.target.value))}
                    className={INPUT}
                  />
                </div>
              </Field>
              <Field htmlFor={`${id}-who-select`} label="Eligible customers">
                <div className={cn(BOX, "relative justify-between")}>
                  <select
                    id={`${id}-who-select`}
                    value={rules.eligibility}
                    onChange={(event) => set("eligibility", event.target.value as DiscountEligibility)}
                    className={cn(INPUT, "appearance-none font-medium")}
                  >
                    {Object.entries(ELIGIBILITY_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevronDown" size={12} strokeWidth={1.4} className="pointer-events-none shrink-0 text-text-muted" />
                </div>
              </Field>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:gap-4">
              <Field htmlFor={`${id}-total`} label="Total uses">
                <div className={cn(BOX, "justify-between")}>
                  <input
                    id={`${id}-total`}
                    type="number"
                    min={1}
                    value={rules.batch ?? rules.totalUses ?? ""}
                    disabled={rules.batch !== null}
                    placeholder="No limit"
                    onChange={(event) => set("totalUses", number(event.target.value))}
                    className={cn(INPUT, "disabled:text-text-secondary")}
                  />
                  {left !== null && <span className="shrink-0 text-sm leading-4.5 text-text-muted">{left} left</span>}
                </div>
              </Field>
              <Field htmlFor={`${id}-per`} label="Per customer">
                <div className={BOX}>
                  <input
                    id={`${id}-per`}
                    type="number"
                    min={1}
                    value={rules.perCustomer ?? ""}
                    placeholder="No limit"
                    onChange={(event) => set("perCustomer", number(event.target.value))}
                    className={cn(INPUT, "field-sizing-content w-auto min-w-6 flex-none")}
                  />
                  {rules.perCustomer !== null && <span className="text-base leading-5 font-semibold text-text">{rules.perCustomer === 1 ? "use" : "uses"}</span>}
                </div>
              </Field>
            </div>
            <div className="hidden items-center justify-between gap-4 border-t border-border-subtle pt-4 md:flex">
              <div className="flex flex-col gap-0.5">
                <p className="text-14 leading-5 font-semibold text-text">Combine with other discounts</p>
                <p className="text-sm leading-4.5 text-text-muted">
                  {rules.combine ? "On: stacks with other discounts at checkout" : "Off: only the best single discount applies"}
                </p>
              </div>
              {combine}
            </div>
          </section>

          {/* Active dates. */}
          <section id="dates" aria-labelledby={`${id}-dates`} className={cn(CARD, DISCLOSE)}>
            <h2 id={`${id}-dates`} className={CARD_TITLE}>
              Active dates
            </h2>
            <div className="flex flex-col gap-3 md:flex-row md:gap-4">
              {(
                [
                  ["startsAt", "Starts"],
                  ["endsAt", "Ends"],
                ] as const
              ).map(([key, label]) => (
                <Field key={key} htmlFor={`${id}-${key}`} label={label}>
                  <div className={cn(BOX, "gap-2.5")}>
                    <Icon name="calendar" size={16} strokeWidth={1.4} className="shrink-0 text-text-muted" />
                    <input
                      id={`${id}-${key}`}
                      type="datetime-local"
                      value={rules[key] ?? ""}
                      required={key === "startsAt"}
                      onChange={(event) => set(key, (event.target.value || (key === "endsAt" ? null : rules.startsAt)) as string)}
                      className={cn(INPUT, "font-medium")}
                    />
                  </div>
                </Field>
              ))}
            </div>
            <p className="text-sm leading-4.5 text-text-muted">
              Times are Accra time (GMT). {code ? "The code stops working at checkout the moment it ends." : "The offer stops at checkout the moment it ends."}
              {!rules.endsAt && " Leave Ends empty to run it until you pause it."}
            </p>
          </section>
        </div>

        <aside aria-label="Summary" className="contents xl:flex xl:w-85 xl:shrink-0 xl:flex-col xl:gap-4">
          {/* In plain words. */}
          <section className="order-first flex flex-col gap-2 rounded-18 bg-primary p-4 md:gap-3 md:rounded-lg md:p-5 xl:order-none">
            <h2 className={cn(OVERLINE, "text-11 leading-3.5 text-text-inverse-muted md:text-xs md:leading-xs")}>In plain words</h2>
            <p aria-live="polite" className="text-base leading-5.5 font-medium text-text-inverse md:text-17 md:leading-6.25">
              <span className="md:hidden">{short.before}</span>
              <span className="hidden md:inline">
                {summary.before}
                {summary.code && <span className="font-mono font-semibold text-accent">{summary.code}</span>}
                {summary.after}
              </span>
            </p>
            <p className="hidden text-sm leading-4.5 text-text-inverse-muted md:block">{summary.note}</p>
            <div className="flex items-center gap-2 pt-1 md:hidden">
              {limit ? (
                <ProgressBar value={(usage.uses / limit) * 100} label="Uses so far" tone="accent" size="xs" className="w-24 shrink-0 bg-white/15" />
              ) : null}
              <span className="text-xs leading-xs text-text-inverse-muted">
                {limit ? `${usage.uses} / ${limit} used` : `${usage.uses} used`} · {usage.revenue}
              </span>
            </div>
          </section>

          {/* At checkout. */}
          <section className="hidden flex-col gap-3 rounded-lg border border-border-subtle p-5 xl:flex">
            <h2 className={cn(OVERLINE, "text-text-muted")}>At checkout</h2>
            <div className="flex flex-col gap-2 rounded-14 bg-surface-subtle p-3.5">
              {checkout.lines.map((line) => (
                <div key={line.label + line.amount} className="flex items-center justify-between gap-3 text-sm leading-4.5">
                  {line.discount ? (
                    <span className={cn("rounded-6 bg-sage-100 px-1.5 text-11 leading-4.5 font-semibold text-brand", code && "font-mono")}>{line.label}</span>
                  ) : (
                    <span className="text-text-secondary">{line.label}</span>
                  )}
                  <span className={line.discount ? "font-semibold text-brand" : "font-medium text-text"}>
                    {line.discount ? `− ${ghs(line.amount)}` : ghs(line.amount)}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-border-subtle pt-2 text-14 leading-5 font-semibold text-text">
                <span>Total</span>
                <span>{ghs(checkout.total)}</span>
              </div>
            </div>
            <p className="text-xs leading-xs text-text-muted">
              Shows on cart and checkout.
              {code && rules.scope !== "order" && rules.targets.length > 0 && (
                <>
                  {" "}
                  Wrong cart? Customer sees “{rules.code} only applies to {discountTarget(rules).replace(/^the /, "")}”.
                </>
              )}
            </p>
          </section>

          {/* Performance so far. */}
          {performance && (
            <section className="hidden flex-col gap-3.5 rounded-lg border border-border-subtle p-5 xl:flex">
              <h2 className={cn(OVERLINE, "text-text-muted")}>Performance so far</h2>
              <div className="flex flex-col gap-2">
                <p className="flex items-baseline gap-1.5">
                  <span className="text-28 leading-8.5 font-semibold tracking-snug text-text">{usage.uses}</span>
                  <span className="text-14 leading-5 text-text-muted">{limit ? `of ${limit} uses` : "uses"}</span>
                </p>
                {limit ? <ProgressBar value={(usage.uses / limit) * 100} label="Uses so far" className="bg-surface-subtle" /> : null}
              </div>
              <dl className="grid grid-cols-2 gap-x-2.5 gap-y-3.5">
                {[
                  ["Revenue", performance.revenue],
                  ["Discount cost", performance.cost],
                  ["New customers", performance.newCustomers],
                  ["Rejected at checkout", performance.rejected],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-xs leading-xs text-text-muted">{label}</dt>
                    <dd className="text-md leading-5.5 font-semibold text-text">{value}</dd>
                  </div>
                ))}
              </dl>
              <LinkAs href={performance.ordersHref} className="w-fit text-sm leading-4.5 font-semibold text-text hover:underline">
                See orders that used it
              </LinkAs>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
