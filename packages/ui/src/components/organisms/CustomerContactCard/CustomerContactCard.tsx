"use client";

import { useState, useTransition, type ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

export interface CustomerAddress {
  /** From 1440px, one string per line: ["Blue gate opposite Koala, Oxford St", "Osu, Accra · Greater Accra"]. */
  lines: string[];
  /** Tablet and mobile: one line ("Blue gate opposite Koala, Oxford St, Osu, Accra"). */
  compact: string;
  /** GhanaPost digital address: "GA-039-5521". */
  ghanaPost?: string;
  /** External map link; opens in a new tab. */
  mapsHref?: string;
  /** Other saved addresses: { label: "+1 more", compactLabel: "+1", href }. */
  more?: { label: string; compactLabel?: string; href: string };
}

/**
 * CustomerContactCard (organism): a customer's phone, email and default address (Paper Jofak -
 * Admin → Customer detail → Contact, Default address). Phone and email come masked; Show reveals
 * them and calls `onReveal` so the reveal is logged with the staff member's name. From 768px it
 * renders two cards (Contact, Default address) as `display: contents`, so the page grid places
 * them; on mobile one card of rows under Add note and Show contact buttons.
 */
export interface CustomerContactCardProps extends Omit<ComponentProps<"div">, "children"> {
  linkAs?: LinkComponent;
  phone: { label?: string; masked: string; full: string };
  email?: { masked: string; full: string };
  address?: CustomerAddress;
  /** Log the reveal (a server action). */
  onReveal?: () => void | Promise<void>;
  /** Mobile: where Add note goes ("#notes"). */
  addNoteHref?: string;
  /** Classes for the Contact card (768px+). */
  contactClassName?: string;
  /** Classes for the Default address card (768px+). */
  addressClassName?: string;
}

export function CustomerContactCard({
  linkAs: LinkAs = "a",
  phone,
  email,
  address,
  onReveal,
  addNoteHref,
  contactClassName,
  addressClassName,
  className,
  ...props
}: CustomerContactCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [, startTransition] = useTransition();
  const phoneLabel = phone.label ?? "Phone · MoMo";

  const toggle = () => {
    const next = !revealed;
    setRevealed(next);
    if (next && onReveal) startTransition(() => void onReveal());
  };

  const phoneValue = revealed ? phone.full : phone.masked;
  const emailValue = email && (revealed ? email.full : email.masked);
  const card = "flex-col rounded-18 border border-border-subtle font-sans xl:rounded-lg";
  const title = "text-base leading-4.5 font-semibold text-text";

  const maps = (label: string) =>
    address?.mapsHref && (
      <a href={address.mapsHref} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs leading-xs font-semibold text-brand hover:underline">
        {label}
        <Icon name="arrowUpRight" size={10} strokeWidth={2.2} />
      </a>
    );

  return (
    <div data-slot="customer-contact-card" className="contents" {...props}>
      {/* Mobile: buttons, then one card of rows. */}
      <div className={cn("flex flex-col gap-3.5 font-sans md:hidden", className)}>
        <div className="flex gap-2">
          {addNoteHref && (
            // A plain anchor: a same-page hash must set :target, which router links don't.
            <a
              href={addNoteHref}
              className="flex h-11 flex-1 basis-0 items-center justify-center gap-2 rounded-full border border-border text-14 leading-4.5 font-semibold text-text active:bg-surface-subtle"
            >
              <Icon name="note" size={15} />
              Add note
            </a>
          )}
          <button
            type="button"
            onClick={toggle}
            aria-pressed={revealed}
            className="flex h-11 flex-1 basis-0 items-center justify-center gap-2 rounded-full border border-border text-14 leading-4.5 font-semibold text-text active:bg-surface-subtle"
          >
            <Icon name="eye" size={15} strokeWidth={1.4} />
            {revealed ? "Hide contact" : "Show contact"}
          </button>
        </div>
        <dl className="flex flex-col overflow-clip rounded-md border border-border-subtle">
          <div className="flex justify-between gap-3 px-3.5 py-3">
            <dt className="text-sm leading-4 text-text-muted">{phoneLabel}</dt>
            <dd className="text-14 leading-4.5 font-semibold text-text">{phoneValue}</dd>
          </div>
          {email && (
            <div className="flex justify-between gap-3 border-t border-border-subtle px-3.5 py-3">
              <dt className="text-sm leading-4 text-text-muted">Email</dt>
              <dd className="min-w-0 truncate text-14 leading-4.5 font-semibold text-text">{emailValue}</dd>
            </div>
          )}
          {address && (
            <div className="flex flex-col gap-1.5 border-t border-border-subtle px-3.5 py-3">
              <div className="flex justify-between gap-3">
                <dt className="text-sm leading-4 text-text-muted">Default address</dt>
                {maps("Maps")}
              </div>
              <dd className="text-14 leading-5 text-text">
                {address.compact}
                {address.ghanaPost && <span className="block text-text-muted">GhanaPost {address.ghanaPost}</span>}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Tablet and desktop: Contact. */}
      <section aria-label="Contact" className={cn(card, "hidden gap-2.5 px-4.5 py-4 md:flex xl:gap-3.5 xl:px-5 xl:py-4.5", contactClassName)}>
        <h2 className={title}>Contact</h2>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <p className="text-xs leading-xs text-text-muted">{phoneLabel}</p>
            <p className="text-14 leading-5 font-semibold text-text">{phoneValue}</p>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={revealed}
            aria-label={revealed ? "Hide contact details" : "Show contact details"}
            className="flex h-7 shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 text-xs leading-xs font-semibold text-text hover:bg-surface-subtle xl:h-7.5 xl:px-3"
          >
            <Icon name="eye" size={12} strokeWidth={1.4} className="hidden xl:inline-block" />
            {revealed ? "Hide" : "Show"}
          </button>
        </div>
        {email && (
          <div className="flex flex-col">
            <p className="text-xs leading-xs text-text-muted">Email</p>
            <p className="truncate text-14 leading-5 font-semibold text-text">{emailValue}</p>
          </div>
        )}
        <p className="text-11 leading-3.75 text-text-muted xl:hidden">Revealing details is logged</p>
        <p className="hidden items-center gap-2 rounded-10 bg-surface-subtle px-2.5 py-2 text-xs leading-xs text-text-muted xl:flex">
          <Icon name="padlock" size={13} strokeWidth={1.4} />
          Revealing contact details is logged with your name
        </p>
      </section>

      {/* Tablet and desktop: Default address. */}
      {address && (
        <section aria-label="Default address" className={cn(card, "hidden gap-2.5 px-4.5 py-4 md:flex xl:px-5 xl:py-4.5", addressClassName)}>
          <div className="flex items-center justify-between gap-3">
            <h2 className={title}>Default address</h2>
            {address.more && (
              <LinkAs href={address.more.href} className="text-xs leading-xs font-semibold text-brand hover:underline">
                {address.more.compactLabel ? (
                  <>
                    <span className="xl:hidden">{address.more.compactLabel}</span>
                    <span className="hidden xl:inline">{address.more.label}</span>
                  </>
                ) : (
                  address.more.label
                )}
              </LinkAs>
            )}
          </div>
          <p className="text-14 leading-5.25 text-text-secondary">
            <span className="xl:hidden">{address.compact}</span>
            {address.lines.map((line) => (
              <span key={line} className="hidden xl:block">
                {line}
              </span>
            ))}
          </p>
          <div className="flex items-center justify-between gap-3">
            {address.ghanaPost && <span className="rounded-8 bg-surface px-2.25 py-0.75 text-xs leading-xs font-semibold text-text-secondary">{address.ghanaPost}</span>}
            <span className="xl:hidden">{maps("Maps")}</span>
            <span className="hidden xl:inline">{maps("Open in Maps")}</span>
          </div>
        </section>
      )}
    </div>
  );
}
