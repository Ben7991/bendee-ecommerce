import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { StatusChip, type StatusChipProps } from "../../atoms";

export interface MarketingMessage {
  id: string;
  customer: string;
  /** "Cart · Greens Daily, Ashwagandha Calm". */
  detail: string;
  /** Mobile: "WhatsApp · GHS 236". */
  compactDetail: string;
  channel: string;
  amount: string;
  /** "Ordered · JFK-251502"; mobile shows `compactLabel` ("Ordered"). */
  status: {
    label: string;
    compactLabel: string;
    tone: NonNullable<StatusChipProps["tone"]>;
  };
  /** Links the order a message recovered. */
  href?: string;
  /** Leave out of the short mobile list. */
  hideOnMobile?: boolean;
}

/**
 * RecentMessages (organism): the latest recovery messages (Paper Jofak - Admin → Marketing): who,
 * what they left, channel, cart value and what happened (ordered, clicked, delivered, waiting for
 * quiet hours to end, stopped). From 768px a card with columns; mobile a compact list of the
 * first `mobileLimit` under a small heading.
 */
export interface RecentMessagesProps extends Omit<
  ComponentProps<"section">,
  "children"
> {
  linkAs?: LinkComponent;
  messages: MarketingMessage[];
  viewAll?: { href: string; label?: string };
  mobileLimit?: number;
  emptyMessage?: string;
}

/** "Stopped" reads secondary rather than muted. */
const chip = (tone: MarketingMessage["status"]["tone"]) =>
  tone === "neutral" ? "text-text-secondary" : undefined;

export function RecentMessages({
  linkAs: LinkAs = "a",
  messages,
  viewAll,
  mobileLimit = 3,
  emptyMessage = "No messages sent yet.",
  className,
  ...props
}: RecentMessagesProps) {
  const more = viewAll && (
    <LinkAs
      href={viewAll.href}
      className="text-sm leading-4.5 font-semibold text-text hover:underline"
    >
      {viewAll.label ?? "View all"}
    </LinkAs>
  );
  const name = (message: MarketingMessage) =>
    message.href ? (
      <LinkAs href={message.href} className="hover:underline">
        {message.customer}
      </LinkAs>
    ) : (
      message.customer
    );

  return (
    <section
      data-slot="recent-messages"
      aria-label="Recent messages"
      className={cn("flex flex-col gap-2.5 font-sans md:gap-0", className)}
      {...props}
    >
      {/* Mobile. */}
      <div className="flex items-center justify-between pt-1 md:hidden">
        <h2 className="text-xs leading-xs font-semibold tracking-overline text-text-muted uppercase">
          Recent messages
        </h2>
        {more}
      </div>
      <ul className="flex flex-col overflow-clip rounded-18 border border-border-subtle md:hidden">
        {messages.length === 0 && (
          <li className="px-3.5 py-6 text-center text-sm leading-4.5 text-text-muted">
            {emptyMessage}
          </li>
        )}
        {messages
          .filter((message) => !message.hideOnMobile)
          .slice(0, mobileLimit)
          .map((message) => (
            <li
              key={message.id}
              className="flex items-center gap-2.5 border-t border-border-subtle px-3.5 py-3 first:border-t-0"
            >
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-14 leading-5 font-semibold text-text">
                  {name(message)}
                </span>
                <span className="truncate text-xs leading-xs text-text-muted">
                  {message.compactDetail}
                </span>
              </span>
              <StatusChip
                tone={message.status.tone}
                className={cn(
                  "shrink-0 px-2 py-0.5 text-xs leading-xs",
                  chip(message.status.tone),
                )}
              >
                {message.status.compactLabel}
              </StatusChip>
            </li>
          ))}
      </ul>

      {/* Tablet and desktop. */}
      <div className="hidden flex-col overflow-clip rounded-lg border border-border-subtle md:flex">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-md leading-5.5 font-semibold text-text">
            Recent messages
          </h2>
          {more}
        </div>
        {messages.length === 0 && (
          <p className="border-t border-border-subtle px-5 py-8 text-center text-sm leading-4.5 text-text-muted">
            {emptyMessage}
          </p>
        )}
        <ul className="flex flex-col">
          {messages.map((message) => (
            <li
              key={message.id}
              className="flex items-center gap-3.5 border-t border-border-subtle px-5 py-3"
            >
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-14 leading-5 font-semibold text-text">
                  {name(message)}
                </span>
                <span className="truncate text-xs leading-xs text-text-muted">
                  {message.detail}
                </span>
              </span>
              <span className="w-22.5 shrink-0 text-sm leading-4.5 text-text-secondary">
                {message.channel}
              </span>
              <span className="w-20 shrink-0 text-right text-14 leading-5 font-semibold text-text">
                {message.amount}
              </span>
              <span className="flex w-37.5 shrink-0 justify-end">
                <StatusChip
                  tone={message.status.tone}
                  className={cn(
                    "px-2.25 py-0.5 text-xs leading-4.5",
                    chip(message.status.tone),
                  )}
                >
                  {message.status.label}
                </StatusChip>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
