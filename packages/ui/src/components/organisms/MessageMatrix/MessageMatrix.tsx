import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, Switch } from "../../atoms";

export interface CustomerMessage {
  id: string;
  title: string;
  description: string;
  /** SMS on, off, or always on (login codes). */
  sms: boolean | "always";
  /** Email on or off; null when the message has no email version. */
  email: boolean | null;
  /** "98.6%". */
  delivered: string;
  /** The line under the title on tablet ("Link to try again · 97.2% delivered"). */
  summary?: string;
  href: string;
  /** The message open in the editor. */
  selected?: boolean;
}

/**
 * MessageMatrix (organism): which automatic messages go out by SMS and email (Paper Jofak -
 * Admin → Settings → Notifications → Messages to customers): each message with what triggers it,
 * a switch per channel, how many were delivered and a link to edit its template. Switches submit
 * `sms:<id>` / `email:<id>`; login codes are always on. Mobile drops the delivery rate and shows
 * "Edit template ›" under each message.
 */
export interface MessageMatrixProps extends Omit<ComponentProps<"section">, "title"> {
  linkAs?: LinkComponent;
  title?: ReactNode;
  description?: ReactNode;
  messages: CustomerMessage[];
}

export function MessageMatrix({ linkAs: LinkAs = "a", title = "Messages to customers", description, messages, className, ...props }: MessageMatrixProps) {
  const head = "text-11 leading-3.5 font-semibold tracking-eyebrow text-text-muted uppercase";
  const switchFor = (message: CustomerMessage, channel: "sms" | "email") => {
    const value = message[channel];
    if (value === null) return <span className="w-10 text-center text-text-muted">—</span>;
    return (
      <Switch
        name={value === "always" ? undefined : `${channel}:${message.id}`}
        defaultChecked={value !== false}
        disabled={value === "always"}
        aria-label={`${message.title} by ${channel === "sms" ? "SMS" : "email"}`}
        className="data-[state=checked]:bg-primary disabled:opacity-muted"
      />
    );
  };

  return (
    <section data-slot="message-matrix" className={cn("flex min-w-0 flex-col gap-2 rounded-18 border border-border-subtle p-4 font-sans md:rounded-lg md:px-6 md:pt-5.5 md:pb-3", className)} {...props}>
      <div className="flex items-end justify-between gap-3 pb-1 md:pb-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base leading-5 font-semibold tracking-compact text-text md:text-17 md:leading-6">
            <span className="md:hidden">To customers</span>
            <span className="hidden md:inline">{title}</span>
          </h2>
          {description && <p className="hidden text-sm leading-4.5 text-text-muted md:block">{description}</p>}
        </div>
        <span aria-hidden className={cn(head, "flex gap-5 md:hidden")}>
          <span className="w-10 text-center">SMS</span>
          <span className="w-10 text-center">Email</span>
        </span>
      </div>
      <div aria-hidden className="hidden items-center gap-4 border-b border-border-subtle py-2 md:flex">
        <span className={cn(head, "flex-1")}>Message</span>
        <span className={cn(head, "w-12 text-center")}>SMS</span>
        <span className={cn(head, "w-12 text-center")}>Email</span>
        <span className={cn(head, "hidden w-24 text-right xl:block")}>Delivered</span>
        <span className="w-4" />
      </div>
      <ul className="flex flex-col">
        {messages.map((message) => (
          <li
            key={message.id}
            className={cn(
              "flex items-center gap-4 border-t border-border-subtle py-3 first:border-t-0 md:border-t-0 md:border-b md:last:border-b-0",
              message.selected && "md:-mx-2.5 md:rounded-sm md:border-b-0 md:border-l-3 md:border-l-primary md:bg-sage-50 md:px-2.5",
            )}
          >
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="flex flex-wrap items-center gap-2 text-14 leading-5 font-semibold text-text">
                {message.title}
                {message.sms === "always" && <span className="hidden rounded-6 bg-tint-sun px-1.5 text-10 leading-4 font-bold tracking-label text-warning-text uppercase md:inline">Always on</span>}
              </span>
              <span className="hidden text-xs leading-xs text-text-muted md:block xl:hidden">{message.summary ?? `${message.delivered} delivered`}</span>
              <span className="hidden text-xs leading-xs text-text-muted xl:block">{message.description}</span>
              {message.sms === "always" ? (
                <span className="text-xs leading-xs font-semibold text-warning-text md:hidden">Always on</span>
              ) : (
                <LinkAs href={message.href} className="text-xs leading-xs font-semibold text-brand md:hidden">
                  Edit template ›
                </LinkAs>
              )}
            </span>
            <span className="flex w-10 justify-center md:w-12">{switchFor(message, "sms")}</span>
            <span className="flex w-10 justify-center md:w-12">{switchFor(message, "email")}</span>
            <span className="hidden w-24 text-right text-sm leading-4.5 font-semibold text-text xl:block">{message.delivered}</span>
            <LinkAs href={message.href} aria-label={`Edit ${message.title} template`} className="hidden w-4 text-text-muted hover:text-text md:block">
              <Icon name="chevronRight" size={14} strokeWidth={1.6} />
            </LinkAs>
          </li>
        ))}
      </ul>
    </section>
  );
}
