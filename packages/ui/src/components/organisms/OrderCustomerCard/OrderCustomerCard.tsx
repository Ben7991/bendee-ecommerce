"use client";

import { useId, useState, type ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, Initials } from "../../atoms";

/**
 * OrderCustomerCard (organism): who placed the order (Paper Jofak - Admin → Order detail →
 * Customer). Contact details are masked; "Show" reveals them and calls `onReveal` so the app can
 * log it. On mobile: name, masked phone and a Call button.
 */
export interface OrderCustomerCardProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  name: string;
  /** "4 orders · GHS 1,820 spent · since Mar 2026". */
  stats: string;
  /** Mobile: "4 orders". */
  compactStats?: string;
  phone: { masked: string; full: string };
  email?: { masked: string; full: string };
  profileHref?: string;
  onReveal?: () => void;
}

export function OrderCustomerCard({
  linkAs: LinkAs = "a",
  name,
  stats,
  compactStats,
  phone,
  email,
  profileHref,
  onReveal,
  className,
  ...props
}: OrderCustomerCardProps) {
  const titleId = useId();
  const [revealed, setRevealed] = useState(false);
  const eyebrow = "text-xs leading-xs font-semibold tracking-eyebrow text-text-muted uppercase";

  return (
    <section
      data-slot="order-customer-card"
      aria-labelledby={titleId}
      className={cn("flex flex-col gap-3 rounded-lg border border-border-subtle p-4 font-sans md:gap-3.5 md:p-5", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h2 id={titleId} className={eyebrow}>
          Customer
        </h2>
        {profileHref && (
          <LinkAs href={profileHref} className="hidden text-sm leading-sm font-semibold text-brand hover:underline md:block">
            View profile
          </LinkAs>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Initials name={name} size="customer" />
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-base leading-sm font-semibold text-text md:text-md md:leading-5.5">{name}</p>
          <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5">
            <span className="md:hidden">
              {phone.masked}
              {compactStats && ` · ${compactStats}`}
            </span>
            <span className="hidden md:inline">{stats}</span>
          </p>
        </div>
        <a
          href={`tel:${phone.full.replace(/\s+/g, "")}`}
          className="flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-border px-3.5 text-sm leading-xs font-semibold text-text hover:bg-surface-subtle md:hidden"
        >
          <Icon name="call" size={14} />
          Call
        </a>
      </div>
      <div className="hidden flex-col gap-2 border-t border-border-subtle pt-3 md:flex">
        <p className="flex items-center justify-between gap-3 text-14 leading-sm text-text">
          <span>{revealed ? phone.full : phone.masked}</span>
          {!revealed && (
            <button
              type="button"
              onClick={() => {
                setRevealed(true);
                onReveal?.();
              }}
              aria-label="Show full contact details"
              className="flex items-center gap-1.5 text-sm leading-sm font-semibold text-brand hover:underline"
            >
              <Icon name="eye" size={14} strokeWidth={2} />
              Show
            </button>
          )}
        </p>
        {email && <p className="text-14 leading-sm text-text">{revealed ? email.full : email.masked}</p>}
        <p className="text-xs leading-xs text-text-muted">
          {revealed ? "You viewed the full contact details; this is logged." : "Showing full contact details is logged."}
        </p>
      </div>
    </section>
  );
}
