"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, StatusChip, Switch, type IconName, type StatusChipProps } from "../../atoms";

export type FlowChannel = "whatsapp" | "sms" | "email";

export interface FlowCondition {
  key: string;
  /** "Idle for", "Cart value at least", "We have a phone or email". */
  label: string;
  /** Mobile summary, with {value}: "Cart ≥ {value}". Leave out to skip it there. */
  short?: string;
  /** Editable conditions pick from options; fixed ones have none. */
  options?: { value: string; label: string }[];
}

export interface FlowSettings {
  enabled: boolean;
  /** Condition key → chosen option value. */
  conditions: Record<string, string>;
  headline: string;
  /** With {first_name}, {items}, {area}: filled from the preview sample. */
  body: string;
  button: string;
  /** Channels allowed, in send order. */
  channels: FlowChannel[];
  quietHours: string;
  frequency: string;
  credit: string;
}

export interface FlowEditorProps extends Omit<ComponentProps<"div">, "defaultValue" | "title"> {
  linkAs?: LinkComponent;
  backHref: string;
  backLabel?: string;
  title: string;
  status: { label: string; tone: NonNullable<StatusChipProps["tone"]> };
  /** Mobile, under the title: "Live · 27 orders · GHS 6,840 in 30 days". */
  summary: string;
  defaultValue: FlowSettings;
  trigger: {
    icon?: IconName;
    title: string;
    /** Mobile title with {condition-key} placeholders: "A cart goes quiet for {idle}". */
    mobileTitle: string;
    conditions: FlowCondition[];
  };
  /** "Send right away · held during quiet hours". */
  timing: string;
  /** Steps after the first message: coming soon. */
  laterSteps?: { wait: string; title: string; note: string }[];
  /** Mobile card for the later steps: "Steps 2 and 3". */
  laterSummary?: { title: string; note: string };
  stops: string[];
  /** Mobile summary of `stops`. */
  stopsSummary: string;
  options: { quietHours: { value: string; label: string }[]; frequency: { value: string; label: string }[]; credit: { value: string; label: string }[] };
  preview: {
    sample: Record<string, string>;
    cart: { title: string; note: string; image?: ReactNode };
    time: string;
    /** "The link restores this exact cart…". */
    footnote: string;
  };
  stats: { steps: { label: string; value: number; goal?: boolean }[]; recovered: string; note: string };
}

const CHANNELS: Record<FlowChannel, { label: string; note: string }> = {
  whatsapp: { label: "WhatsApp", note: "needs marketing consent" },
  sms: { label: "SMS", note: "needs marketing consent" },
  email: { label: "Email", note: "unless they opted out" },
};
const ORDER: FlowChannel[] = ["whatsapp", "sms", "email"];

const OVERLINE = "text-11 leading-3.5 font-semibold tracking-overline text-text-muted uppercase";
const BAR_FILL = ["bg-primary", "bg-brand", "bg-evergreen-500", "bg-accent"];
const FIELD = "w-full rounded-sm border border-border bg-bg px-3 py-2 text-14 leading-5 text-text outline-none focus:border-primary dark:bg-surface";

function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

/** A native select drawn as bold inline text (trigger chips, settings values). */
function InlineSelect({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cn("cursor-pointer appearance-none bg-transparent font-semibold text-text outline-none field-sizing-content focus-visible:underline", className)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

/**
 * FlowEditor (organism): one marketing automation (Paper Jofak - Admin → Abandoned cart flow):
 * header (back, name, status, On switch; from 1440px Send test and Save), the trigger with its
 * conditions as editable chips, the first message with its channel order and inline editing,
 * coming-soon later steps, what stops it and the quiet hours / frequency / credit settings; beside
 * it a WhatsApp, SMS or email preview and the last 30 days' funnel. Tablet puts the preview and
 * funnel under the flow; mobile shows a compact trigger and message (each with an Edit link) and
 * settings rows. Every value is a hidden input: put it in a form (ProductEditorForm); Send test
 * submits `intent=test`.
 */
export function FlowEditor({
  linkAs: LinkAs = "a",
  backHref,
  backLabel = "Marketing",
  title,
  status,
  summary,
  defaultValue,
  trigger,
  timing,
  laterSteps = [],
  laterSummary,
  stops,
  stopsSummary,
  options,
  preview,
  stats,
  className,
  ...props
}: FlowEditorProps) {
  const id = useId();
  const [flow, setFlow] = useState<FlowSettings>(defaultValue);
  const [editingMessage, setEditingMessage] = useState(false);
  const [editingTrigger, setEditingTrigger] = useState(false);
  const [channel, setChannel] = useState<FlowChannel>(defaultValue.channels[0] ?? "whatsapp");
  const set = <K extends keyof FlowSettings>(key: K, value: FlowSettings[K]) => setFlow((current) => ({ ...current, [key]: value }));
  const setCondition = (key: string, value: string) => setFlow((current) => ({ ...current, conditions: { ...current.conditions, [key]: value } }));

  const optionLabel = (condition: FlowCondition) =>
    condition.options?.find((option) => option.value === flow.conditions[condition.key])?.label ?? flow.conditions[condition.key] ?? "";
  const labels = Object.fromEntries(trigger.conditions.map((condition) => [condition.key, optionLabel(condition)]));
  const mobileTitle = fill(trigger.mobileTitle, labels);
  const mobileConditions = trigger.conditions
    .filter((condition) => condition.short)
    .map((condition) => fill(condition.short!, { value: optionLabel(condition) }))
    .join(" · ");
  const body = fill(flow.body, preview.sample);
  const ordered = ORDER.map((key, index) => ({ key, index, on: flow.channels.includes(key) }));
  const toggleChannel = (key: FlowChannel) =>
    set(
      "channels",
      flow.channels.includes(key) ? flow.channels.filter((item) => item !== key) : ORDER.filter((item) => item === key || flow.channels.includes(item)),
    );
  const top = Math.max(1, stats.steps[0]?.value ?? 1);

  const chips = (
    <div className="flex flex-wrap gap-2">
      {trigger.conditions.map((condition) => (
        <span key={condition.key} className="flex items-center gap-1.5 rounded-full border border-border bg-bg px-3 py-1.5 text-sm leading-xs dark:bg-surface">
          <span className="text-text-secondary">{condition.label}</span>
          {condition.options && (
            <InlineSelect label={condition.label} value={flow.conditions[condition.key] ?? ""} options={condition.options} onChange={(value) => setCondition(condition.key, value)} />
          )}
        </span>
      ))}
    </div>
  );

  const messageFields = editingMessage && (
    <div className="flex flex-col gap-2.5 rounded-14 bg-surface-subtle p-3">
      <label className="flex flex-col gap-1 text-xs leading-xs font-semibold text-text-secondary">
        Headline
        <input value={flow.headline} onChange={(event) => set("headline", event.target.value)} className={FIELD} />
      </label>
      <label className="flex flex-col gap-1 text-xs leading-xs font-semibold text-text-secondary">
        Message
        <textarea rows={4} value={flow.body} onChange={(event) => set("body", event.target.value)} className={cn(FIELD, "resize-y")} />
      </label>
      <label className="flex flex-col gap-1 text-xs leading-xs font-semibold text-text-secondary">
        Button
        <input value={flow.button} onChange={(event) => set("button", event.target.value)} className={FIELD} />
      </label>
      <p className="text-xs leading-xs text-text-muted">
        Fills in for each customer:{" "}
        {Object.keys(preview.sample).map((key, index) => (
          <span key={key}>
            {index > 0 && ", "}
            <code className="font-mono text-text-secondary">{`{${key}}`}</code>
          </span>
        ))}
      </p>
    </div>
  );

  const editLink = (label: string, open: boolean, toggle: () => void) => (
    <button type="button" aria-expanded={open} onClick={toggle} className="w-fit text-sm leading-4.5 font-semibold text-brand hover:underline">
      {open ? "Done" : label}
    </button>
  );

  const switchControl = (
    <Switch
      checked={flow.enabled}
      onCheckedChange={(checked) => set("enabled", checked)}
      aria-label={flow.enabled ? "Flow on" : "Flow off"}
      className="data-[state=checked]:bg-primary"
    />
  );

  return (
    <div data-slot="flow-editor" className={cn("flex flex-col gap-3.5 font-sans md:gap-5 xl:gap-6", className)} {...props}>
      <input type="hidden" name="enabled" value={String(flow.enabled)} />
      <input type="hidden" name="conditions" value={JSON.stringify(flow.conditions)} />
      <input type="hidden" name="headline" value={flow.headline} />
      <input type="hidden" name="body" value={flow.body} />
      <input type="hidden" name="button" value={flow.button} />
      <input type="hidden" name="channels" value={JSON.stringify(flow.channels)} />
      <input type="hidden" name="quietHours" value={flow.quietHours} />
      <input type="hidden" name="frequency" value={flow.frequency} />
      <input type="hidden" name="credit" value={flow.credit} />

      {/* Header. */}
      <header className="flex items-end justify-between gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 md:gap-2">
          <LinkAs href={backHref} className="flex w-fit items-center gap-1.5 text-sm leading-4.5 font-medium text-text-muted hover:text-text">
            <Icon name="chevronLeft" size={14} strokeWidth={1.6} />
            {backLabel}
          </LinkAs>
          <div className="flex items-center justify-between gap-3">
            <h1 className="flex flex-wrap items-center gap-3 text-24 leading-2xl font-semibold tracking-snug text-text md:text-30 md:leading-9 md:tracking-tight xl:text-34 xl:leading-10">
              {title}
              <StatusChip tone={status.tone} className="hidden px-2.5 py-0.5 text-sm leading-5 tracking-normal xl:inline-flex">
                {status.label}
              </StatusChip>
            </h1>
            <span className="flex shrink-0 items-center gap-2.5 xl:hidden">
              <span className="hidden text-sm leading-4.5 font-semibold text-brand md:inline">{flow.enabled ? "On" : "Off"}</span>
              {switchControl}
            </span>
          </div>
          <p className={cn("text-xs leading-xs font-semibold md:hidden", flow.enabled ? "text-brand" : "text-text-muted")}>{summary}</p>
        </div>
        <div className="hidden shrink-0 items-center gap-2.5 xl:flex">
          <label className="flex h-11 cursor-pointer items-center gap-2.5 rounded-full border border-border px-4 text-14 leading-4.5 font-semibold text-text">
            {flow.enabled ? "On" : "Off"}
            {switchControl}
          </label>
          <button type="submit" name="intent" value="test" className="flex h-11 items-center rounded-full border border-border px-4.5 text-14 leading-4.5 font-semibold text-text hover:bg-surface-subtle">
            Send test
          </button>
          <button type="submit" className="flex h-11 items-center rounded-full bg-primary px-5.5 text-14 leading-4.5 font-semibold text-on-primary hover:bg-primary-hover">
            Save changes
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-start xl:gap-6">
        <div className="contents xl:flex xl:min-w-0 xl:flex-1 xl:flex-col">
          {/* The flow. */}
          <ol aria-label="Flow steps" className="order-1 flex flex-col xl:order-none">
            {/* Trigger. */}
            <li className="flex flex-col gap-2.5 rounded-18 border border-border-subtle bg-surface-subtle p-4 md:gap-3.5 md:rounded-lg md:px-5.5 md:py-5">
              <div className="flex items-center gap-3">
                <span className="hidden size-9 shrink-0 items-center justify-center rounded-sm border border-border bg-bg text-text md:flex dark:bg-surface">
                  <Icon name={trigger.icon ?? "bolt"} size={18} strokeWidth={1.7} />
                </span>
                <span className="flex flex-col gap-2.5 md:gap-0">
                  <span className={OVERLINE}>When</span>
                  <span className="hidden text-md leading-5.5 font-semibold text-text md:block">{trigger.title}</span>
                  <span className="text-base leading-5 font-semibold text-text md:hidden">{mobileTitle}</span>
                </span>
              </div>
              <p className="text-sm leading-4.75 text-text-secondary md:hidden">{mobileConditions}</p>
              <div className={cn(editingTrigger ? "block" : "hidden", "md:block")}>{chips}</div>
              <div className="md:hidden">{editLink("Edit trigger", editingTrigger, () => setEditingTrigger(!editingTrigger))}</div>
            </li>

            {/* Timing. */}
            <li aria-hidden className="flex h-7 shrink-0 items-center gap-3 pl-7 md:h-12 md:pl-9.75">
              <span className="h-full w-0.5 shrink-0 bg-border" />
              <span className="hidden items-center gap-1.5 rounded-full border border-border bg-bg px-2.5 py-1 text-xs leading-xs font-semibold text-text-secondary md:flex dark:bg-surface">
                <Icon name="clock" size={12} strokeWidth={1.5} className="text-text-muted" />
                {timing}
              </span>
            </li>

            {/* First message. */}
            <li id="message" className="flex scroll-mt-24 flex-col gap-3 rounded-18 border-field border-primary bg-bg p-4 md:gap-4 md:rounded-lg md:px-5.5 md:py-5 dark:bg-surface">
              <div className="flex items-center gap-2.5 md:gap-3">
                <span className="flex size-7.5 shrink-0 items-center justify-center rounded-10 bg-primary text-sm leading-xs font-bold text-on-primary md:size-9 md:rounded-sm md:text-base md:leading-4.5">
                  1
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className={cn(OVERLINE, "hidden md:block")}>Message</span>
                  <span className="text-base leading-5 font-semibold text-text md:text-md md:leading-5.5">“{flow.headline}”</span>
                </span>
                <span className="hidden md:block">{editLink("Edit message", editingMessage, () => setEditingMessage(!editingMessage))}</span>
              </div>
              {messageFields}
              <div className="flex flex-col gap-2">
                <p className="hidden text-sm leading-4.5 font-semibold text-text-secondary md:block">Send by the first channel we’re allowed to use</p>
                <div role="group" aria-label="Channels in order" className="flex gap-1.5 md:gap-2">
                  {ordered.map(({ key, index, on }) => (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleChannel(key)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-full px-2.5 py-1.25 text-left md:flex-1 md:basis-0 md:rounded-sm md:px-3 md:py-2.5",
                        on ? "bg-surface md:border md:border-border md:bg-transparent" : "bg-surface-subtle opacity-muted md:border md:border-dashed md:border-border",
                      )}
                    >
                      <span className="text-xs leading-xs font-bold text-text md:text-text-muted">{index + 1}</span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-xs leading-xs font-semibold text-text md:text-14 md:leading-4.5">{CHANNELS[key].label}</span>
                        <span className="hidden text-xs leading-xs text-text-muted md:block">{on ? CHANNELS[key].note : "off for this flow"}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Mobile: a small preview. */}
              <div className="flex flex-col gap-1.5 rounded-14 bg-sage-100 p-2.5 md:hidden">
                <div className="flex flex-col gap-1.5 rounded-14 rounded-tl-sm bg-bg p-2.5 dark:bg-surface">
                  <p className="line-clamp-3 text-sm leading-4.75 text-text">{body}</p>
                  <p className="flex justify-center border-t border-border-subtle pt-2 text-sm leading-4.5 font-semibold text-info">{flow.button}</p>
                </div>
              </div>
              <div className="md:hidden">{editLink("Edit message", editingMessage, () => setEditingMessage(!editingMessage))}</div>
            </li>

            {/* Later steps. */}
            {laterSteps.map((step, index) => (
              <li key={step.title} className="hidden flex-col md:flex">
                <span className="flex h-10 shrink-0 items-center gap-3 pl-9.75">
                  <span className="h-full w-0.5 shrink-0 border-l-2 border-dashed border-border" />
                  <span className="text-xs leading-xs font-semibold text-text-muted">{step.wait}</span>
                </span>
                <span className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-surface-subtle px-5.5 py-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-dashed border-border text-base leading-4.5 font-bold text-text-muted">
                    {index + 2}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-base leading-5 font-semibold text-text-secondary">{step.title}</span>
                    <span className="text-xs leading-xs text-text-muted">{step.note}</span>
                  </span>
                </span>
              </li>
            ))}
            {laterSummary && (
              <li className="flex flex-col md:hidden">
                <span aria-hidden className="flex h-7 shrink-0 pl-7">
                  <span className="h-full w-0.5 shrink-0 border-l-2 border-dashed border-border" />
                </span>
                <span className="flex flex-col rounded-18 border border-dashed border-border bg-surface-subtle px-4 py-3.5">
                  <span className="text-14 leading-5 font-semibold text-text-secondary">{laterSummary.title}</span>
                  <span className="text-xs leading-xs text-text-muted">{laterSummary.note}</span>
                </span>
              </li>
            )}
          </ol>

          {/* Stops and settings: card from 768px. */}
          <section aria-labelledby={`${id}-stops`} className="order-3 hidden flex-col gap-3 rounded-lg border border-border-subtle px-5.5 py-5 md:flex xl:order-none xl:mt-6">
            <h2 id={`${id}-stops`} className="text-md leading-5.5 font-semibold text-text">
              Stops automatically when
            </h2>
            <ul className="flex flex-wrap gap-2">
              {stops.map((stop, index) => (
                <li
                  key={stop}
                  className={cn("rounded-full px-3 py-1.5 text-sm leading-xs font-semibold", index === 0 ? "bg-sage-100 text-brand" : "bg-surface text-text-secondary")}
                >
                  {stop}
                </li>
              ))}
            </ul>
            <dl className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border-subtle pt-3">
              {(
                [
                  ["quietHours", "Quiet hours"],
                  ["frequency", "Frequency cap"],
                  ["credit", "Credit order to flow"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="flex flex-col gap-0.5">
                  <dt className="text-xs leading-xs text-text-muted">{label}</dt>
                  <dd className="text-14 leading-5">
                    <InlineSelect label={label} value={flow[key]} options={options[key]} onChange={(value) => set(key, value)} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Mobile: settings rows. */}
          <ul className="order-3 flex flex-col overflow-clip rounded-18 border border-border-subtle md:hidden">
            <li className="flex flex-col gap-0.5 px-4 py-3.25">
              <span className="text-xs leading-xs text-text-muted">Stops when</span>
              <span className="text-14 leading-5 font-semibold text-text">{stopsSummary}</span>
            </li>
            {(
              [
                ["quietHours", "Quiet hours"],
                ["frequency", "Frequency cap"],
              ] as const
            ).map(([key, label]) => (
              <li key={key} className="relative flex items-center gap-2.5 border-t border-border-subtle px-4 py-3.25">
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-xs leading-xs text-text-muted">{label}</span>
                  <span className="text-14 leading-5 font-semibold text-text">{options[key].find((option) => option.value === flow[key])?.label}</span>
                </span>
                <Icon name="chevronRight" size={14} strokeWidth={1.6} className="shrink-0 text-text-muted" />
                <select
                  aria-label={label}
                  value={flow[key]}
                  onChange={(event) => set(key, event.target.value)}
                  className="absolute inset-0 cursor-pointer appearance-none opacity-0"
                >
                  {options[key].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>

        {/* Preview and results. */}
        <div className="order-2 hidden gap-4 md:grid md:grid-cols-2 md:items-start xl:order-none xl:flex xl:w-90 xl:shrink-0 xl:flex-col">
          <section aria-label="Preview" className="flex flex-col gap-3.5 rounded-lg bg-surface p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xs leading-xs font-semibold tracking-overline text-text-muted uppercase">Preview</h2>
              <div role="tablist" aria-label="Preview channel" className="flex gap-0.5 rounded-full bg-bg p-0.75 dark:bg-surface-subtle">
                {ORDER.map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={channel === key}
                    onClick={() => setChannel(key)}
                    className={cn("rounded-full px-2.5 py-1 text-xs leading-xs", channel === key ? "bg-primary font-semibold text-on-primary" : "font-medium text-text-secondary hover:text-text")}
                  >
                    {CHANNELS[key].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2.5 rounded-18 bg-sage-100 p-3.5">
              {channel === "email" ? (
                <div className="flex flex-col gap-2.5 rounded-md bg-bg p-3.5 shadow-xs dark:bg-surface">
                  <p className="text-xs leading-xs text-text-muted">
                    Subject: <span className="font-semibold text-text">{flow.headline}</span>
                  </p>
                  <p className="text-14 leading-5 text-text">{body}</p>
                  <span className="flex h-10 items-center justify-center rounded-full bg-primary text-sm leading-xs font-semibold text-on-primary">{flow.button}</span>
                </div>
              ) : (
                <div className="flex flex-col gap-2 rounded-md rounded-tl-sm bg-bg p-2 shadow-xs dark:bg-surface">
                  {channel === "whatsapp" && (
                    <div className="flex gap-2 rounded-10 bg-surface-subtle p-2">
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-8 bg-sage-100">{preview.cart.image}</span>
                      <span className="flex flex-col justify-center">
                        <span className="text-sm leading-4.5 font-semibold text-text">{preview.cart.title}</span>
                        <span className="text-xs leading-xs text-text-muted">{preview.cart.note}</span>
                      </span>
                    </div>
                  )}
                  <p className="px-1 text-14 leading-5 text-text">
                    {body}
                    {channel === "sms" && <span className="text-info"> jofak.com/r/8KQ2</span>}
                  </p>
                  <p className="px-1 text-right text-11 leading-3.5 text-text-muted">{preview.time}</p>
                  {channel === "whatsapp" && (
                    <p className="flex justify-center border-t border-border-subtle p-2.5 text-14 leading-4.5 font-semibold text-info">{flow.button}</p>
                  )}
                </div>
              )}
              <p className="text-center text-11 leading-3.5 text-text-muted">{channel === "email" ? "Unsubscribe link in the footer" : "Reply STOP to opt out"}</p>
            </div>
            <p className="text-xs leading-4.25 text-text-secondary">{preview.footnote}</p>
          </section>

          <section aria-label="Last 30 days" className="flex flex-col gap-3 rounded-lg border border-border-subtle p-5">
            <h2 className="text-xs leading-xs font-semibold tracking-overline text-text-muted uppercase">Last 30 days</h2>
            <dl className="flex flex-col gap-2">
              {stats.steps.map((step, index) => (
                <div key={step.label} className="flex items-center gap-2.5">
                  <dt className={cn("w-18 shrink-0 text-xs leading-xs", step.goal ? "font-semibold text-brand" : "text-text-secondary")}>{step.label}</dt>
                  <span aria-hidden className="flex flex-1">
                    <span className={cn("h-2.5 rounded-full", BAR_FILL[index] ?? "bg-brand")} style={{ width: `${Math.max(2, (step.value / top) * 100)}%` }} />
                  </span>
                  <dd className={cn("w-8 shrink-0 text-right text-sm leading-xs font-semibold", step.goal ? "text-brand" : "text-text")}>{step.value}</dd>
                </div>
              ))}
            </dl>
            <p className="flex justify-between border-t border-border-subtle pt-2.5">
              <span className="text-sm leading-4.5 text-text-secondary">Recovered</span>
              <span className="text-base leading-4.5 font-semibold text-text">{stats.recovered}</span>
            </p>
            <p className="text-xs leading-xs text-text-muted">{stats.note}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
