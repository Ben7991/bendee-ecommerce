"use client";

import { useId, useState, type ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, Switch } from "../../atoms";
import type { CustomerTag } from "../CustomerTable";

export interface ConsentChannel {
  /** Posted name: "sms", "whatsapp", "email". */
  channel: string;
  /** From 1440px: "SMS offers". */
  label: string;
  /** Tablet: "SMS". */
  compactLabel?: string;
  /** Mobile badge: "SMS", "WhatsApp". */
  badge?: string;
  on: boolean;
}

export interface AccountAction {
  label: string;
  /** Tablet: "Export data". */
  compactLabel?: string;
  href: string;
  /** Disable, delete: red. */
  danger?: boolean;
}

/**
 * CustomerPreferences (organism): a customer's marketing consent, tags and account actions
 * (Paper Jofak - Admin → Customer detail). Staff can switch a channel off but only the customer
 * can turn one on, so off switches are disabled; switching off calls `onConsentChange`. Tags
 * remove with × (posting `tag` to `removeTag`) and add from `addTagHref`. From 1440px three
 * cards; on tablet Marketing consent beside Tags with the account actions folded in; on mobile
 * one card of Marketing and Tags rows and a note. Renders as `display: contents`, so the page
 * grid places the cards.
 */
export interface CustomerPreferencesProps extends Omit<ComponentProps<"div">, "children"> {
  linkAs?: LinkComponent;
  consent: ConsentChannel[];
  /** From 1440px: "Opted in at checkout, 4 Mar 2025. Only the customer can turn consent on." */
  consentNote?: string;
  onConsentChange?: (channel: string, on: boolean) => void | Promise<void>;
  tags: CustomerTag[];
  removeTag?: string | ((formData: FormData) => void | Promise<void>);
  /** Hidden fields sent with a tag removal (the customer). */
  fields?: Record<string, string>;
  addTagHref?: string;
  account?: AccountAction[];
  /** Mobile, under the card: "Export, disable or delete data from the ⋯ menu." */
  mobileNote?: string;
  marketingClassName?: string;
  tagsClassName?: string;
  accountClassName?: string;
}

const CHIP = { accent: "bg-accent text-on-accent", neutral: "bg-surface text-text-secondary" } as const;
const chipTone = (tone: CustomerTag["tone"]) => (tone === "accent" ? CHIP.accent : CHIP.neutral);

export function CustomerPreferences({
  linkAs: LinkAs = "a",
  consent,
  consentNote,
  onConsentChange,
  tags,
  removeTag,
  fields = {},
  addTagHref,
  account = [],
  mobileNote,
  marketingClassName,
  tagsClassName,
  accountClassName,
  className,
  ...props
}: CustomerPreferencesProps) {
  const id = useId();
  const [channels, setChannels] = useState(consent);
  const card = "flex-col rounded-18 border border-border-subtle font-sans xl:rounded-lg";
  const title = "text-base leading-4.5 font-semibold text-text";

  const change = (channel: string, on: boolean) => {
    setChannels((current) => current.map((item) => (item.channel === channel ? { ...item, on } : item)));
    void onConsentChange?.(channel, on);
  };

  const tagList = (compact: boolean) => (
    <form action={removeTag} className="flex flex-wrap gap-1.5">
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {tags.map((tag) => (
        <span key={tag.label} className={cn("flex h-6.5 items-center gap-1.5 rounded-full px-2.5 text-xs leading-xs font-semibold xl:h-7", chipTone(tag.tone))}>
          {tag.label}
          {removeTag && (
            <button type="submit" name="tag" value={tag.label} aria-label={`Remove ${tag.label}`} className="opacity-muted hover:opacity-100">
              ×
            </button>
          )}
        </span>
      ))}
      {addTagHref && (
        <LinkAs
          href={addTagHref}
          className="flex h-6.5 items-center rounded-full border border-dashed border-border px-2.5 text-xs leading-xs font-semibold text-text-muted hover:text-text xl:h-7"
        >
          {compact ? "+ Add" : "+ Add tag"}
        </LinkAs>
      )}
    </form>
  );

  return (
    <div data-slot="customer-preferences" className="contents" {...props}>
      {/* Mobile: Marketing and Tags rows, then a note. */}
      <div className={cn("flex flex-col gap-3.5 font-sans md:hidden", className)}>
        <dl className="flex flex-col overflow-clip rounded-md border border-border-subtle">
          <div className="flex items-center justify-between gap-3 px-3.5 py-3">
            <dt className="text-sm leading-4 text-text-muted">Marketing</dt>
            <dd className="flex flex-wrap justify-end gap-1">
              {channels.map((item) => (
                <span
                  key={item.channel}
                  className={cn(
                    "rounded-6 px-1.75 py-px text-11 leading-3.5 font-semibold",
                    item.on ? "bg-sage-100 text-brand" : "bg-surface text-text-muted line-through",
                  )}
                >
                  <span className="sr-only">{item.on ? "Opted in: " : "Opted out: "}</span>
                  {item.badge ?? item.compactLabel ?? item.label}
                </span>
              ))}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border-subtle px-3.5 py-3">
            <dt className="text-sm leading-4 text-text-muted">Tags</dt>
            <dd className="flex flex-wrap justify-end gap-1">
              {tags.map((tag) => (
                <span key={tag.label} className={cn("rounded-full px-2 py-px text-11 leading-3.5 font-semibold", chipTone(tag.tone))}>
                  {tag.label}
                </span>
              ))}
              {addTagHref && (
                <LinkAs href={addTagHref} aria-label="Add tag" className="rounded-full border border-dashed border-border px-2 py-px text-11 leading-3.5 font-semibold text-text-muted">
                  +
                </LinkAs>
              )}
            </dd>
          </div>
        </dl>
        {mobileNote && <p className="text-center text-xs leading-xs text-text-muted">{mobileNote}</p>}
      </div>

      {/* Tablet and desktop: Marketing consent. */}
      <section aria-labelledby={`${id}-marketing`} className={cn(card, "hidden gap-2.5 self-start px-4.5 py-4 md:flex xl:gap-3 xl:self-auto xl:px-5 xl:py-4.5", marketingClassName)}>
        <h2 id={`${id}-marketing`} className={title}>
          Marketing consent
        </h2>
        {channels.map((item) => (
          <div key={item.channel} className="flex items-center justify-between gap-3">
            <label htmlFor={`${id}-${item.channel}`} className="text-14 leading-4.5 text-text">
              {item.compactLabel ? (
                <>
                  <span className="xl:hidden">{item.compactLabel}</span>
                  <span className="hidden xl:inline">{item.label}</span>
                </>
              ) : (
                item.label
              )}
            </label>
            <Switch
              id={`${id}-${item.channel}`}
              size="admin"
              checked={item.on}
              disabled={!item.on}
              title={item.on ? undefined : "Only the customer can turn this on"}
              onCheckedChange={(on) => change(item.channel, on)}
              className="disabled:opacity-100"
            />
          </div>
        ))}
        {consentNote && <p className="hidden text-xs leading-xs text-text-muted xl:block">{consentNote}</p>}
      </section>

      {/* Tablet and desktop: Tags (tablet folds the account actions in). */}
      <section aria-labelledby={`${id}-tags`} className={cn(card, "hidden gap-2.5 px-4.5 py-4 md:flex xl:px-5 xl:py-4.5", tagsClassName)}>
        <h2 id={`${id}-tags`} className={title}>
          Tags
        </h2>
        <div className="xl:hidden">{tagList(true)}</div>
        <div className="hidden xl:block">{tagList(false)}</div>
        {account.length > 0 && (
          <div className="flex flex-col gap-2.5 border-t border-border-subtle pt-2.5 xl:hidden">
            {[account.filter((item) => !item.danger), account.filter((item) => item.danger)].map(
              (group, index) =>
                group.length > 0 && (
                  <p key={index} className="text-sm leading-4.5">
                    {group.map((item, itemIndex) => (
                      <span key={item.href}>
                        {itemIndex > 0 && <span className={item.danger ? "text-error" : "text-text-secondary"}> · </span>}
                        <LinkAs href={item.href} className={cn("hover:underline", item.danger ? "text-error" : "text-text-secondary")}>
                          {item.compactLabel ?? item.label}
                        </LinkAs>
                      </span>
                    ))}
                  </p>
                ),
            )}
          </div>
        )}
      </section>

      {/* Desktop: Account & privacy. */}
      {account.length > 0 && (
        <section aria-labelledby={`${id}-account`} className={cn(card, "hidden gap-1 px-5 py-3.5 xl:flex", accountClassName)}>
          <h2 id={`${id}-account`} className={cn(title, "pt-1 pb-1.5")}>
            Account &amp; privacy
          </h2>
          <ul>
            {account.map((item) => (
              <li key={item.href} className="border-border-subtle not-first:border-t">
                <LinkAs
                  href={item.href}
                  className={cn("flex items-center justify-between py-2 text-14 leading-4.5 hover:underline", item.danger ? "text-error" : "text-text")}
                >
                  {item.label}
                  <Icon name="chevronRight" size={12} strokeWidth={1.8} className={item.danger ? "text-error" : "text-text-muted"} />
                </LinkAs>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
