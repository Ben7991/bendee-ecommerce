import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

export interface NotificationChannel {
  id: string;
  name: string;
  /** Mobile: "SMS · Arkesel". */
  compactName: string;
  icon: IconName;
  /** "Arkesel · sender JOFAK". */
  detail: ReactNode;
  /** Mobile line: "JOFAK · GHS 412.60 credit". */
  compactDetail: ReactNode;
  /** The list line on tablet ("Sender JOFAK · GHS 412.60 credit (~13,700 SMS)"). */
  tabletDetail?: ReactNode;
  /** Bottom row: "Credit left" — "GHS 412.60 · ~13,700 SMS". */
  row?: { label: string; value: ReactNode; tone?: "brand" };
  /** Not available yet: dashed, muted, "Coming soon". */
  soon?: boolean;
}

/**
 * NotificationChannels (organism): the messaging providers (Paper Jofak - Admin → Settings →
 * Notifications): one card per channel from 1280px — provider, sender, connection and credit or
 * domain — with coming-soon channels dashed; smaller screens list them in one card.
 */
export interface NotificationChannelsProps extends Omit<ComponentProps<"section">, "children"> {
  channels: NotificationChannel[];
}

export function NotificationChannels({ channels, className, ...props }: NotificationChannelsProps) {
  return (
    <section data-slot="notification-channels" aria-label="Channels" className={cn("font-sans", className)} {...props}>
      <ul className="flex flex-col overflow-clip rounded-18 border border-border-subtle md:rounded-lg md:px-5 xl:hidden">
        {channels.map((channel) => (
          <li key={channel.id} className="flex items-center gap-3 border-t border-border-subtle px-4 py-3 first:border-t-0 md:px-0 md:py-3.5">
            <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-10", channel.soon ? "bg-surface-subtle text-text-muted" : channel.id === "email" ? "bg-tint-lavender text-lavender-text" : "bg-sage-100 text-brand")}>
              <Icon name={channel.icon} size={16} strokeWidth={1.5} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className={cn("text-14 leading-5 font-semibold", channel.soon ? "text-text-muted" : "text-text")}>{channel.compactName}</span>
              <span className="truncate text-xs leading-xs text-text-muted md:hidden">{channel.compactDetail}</span>
              <span className="hidden truncate text-xs leading-xs text-text-muted md:block">{channel.tabletDetail ?? channel.compactDetail}</span>
            </span>
            {channel.soon ? (
              <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-11 leading-4 font-semibold text-text-muted">
                <span className="md:hidden">Soon</span>
                <span className="hidden md:inline">Coming soon</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs leading-xs font-semibold text-brand">
                <span aria-hidden className="size-2 rounded-full bg-success md:size-1.5" />
                <span className="sr-only md:not-sr-only">Connected</span>
              </span>
            )}
          </li>
        ))}
      </ul>
      <ul className="hidden gap-3 xl:flex">
        {channels.map((channel) => (
          <li
            key={channel.id}
            className={cn("flex min-w-0 flex-1 basis-0 flex-col gap-3 rounded-lg p-4.5", channel.soon ? "border border-dashed border-border bg-surface-subtle" : "border border-border-subtle")}
          >
            <div className="flex items-center gap-2.5">
              <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-10", channel.soon ? "bg-bg text-text-muted dark:bg-surface" : channel.id === "email" ? "bg-tint-lavender text-lavender-text" : "bg-sage-100 text-brand")}>
                <Icon name={channel.icon} size={15} strokeWidth={1.5} />
              </span>
              <span className={cn("flex-1 text-base leading-5 font-semibold", channel.soon ? "text-text-muted" : "text-text")}>{channel.name}</span>
              {channel.soon ? (
                <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-11 leading-4 font-semibold text-text-muted">Coming soon</span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs leading-xs font-semibold text-brand">
                  <span aria-hidden className="size-1.5 rounded-full bg-success" />
                  Connected
                </span>
              )}
            </div>
            <p className={cn("text-sm leading-4.5", channel.soon ? "text-text-muted" : "text-text-secondary")}>{channel.detail}</p>
            {channel.row && (
              <p className="flex justify-between gap-2 border-t border-border-subtle pt-2.5 text-xs leading-xs">
                <span className="text-text-muted">{channel.row.label}</span>
                <span className={cn("font-semibold", channel.row.tone === "brand" ? "text-brand" : "text-text")}>{channel.row.value}</span>
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
