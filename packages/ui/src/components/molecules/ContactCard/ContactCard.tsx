import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";
import {
  contactCardDetailVariants,
  contactCardIconVariants,
  contactCardTitleVariants,
  contactCardVariants,
  type ContactCardVariantProps,
} from "./ContactCard.variants";

/**
 * ContactCard (molecule): one way to reach us (WhatsApp, phone, email, the store): an icon
 * disc, the channel, its number or address, and a note or a button. `badge` sits top right on
 * the feature card ("Replies in ~1 hour").
 */
export interface ContactCardProps extends Omit<ComponentProps<"div">, "title" | "children">, ContactCardVariantProps {
  icon: IconName;
  title: ReactNode;
  /** The number, address or email. */
  detail: ReactNode;
  /** Small muted line ("Standard network rates apply."). */
  note?: ReactNode;
  badge?: ReactNode;
  /** A Button ("Start a chat"). */
  action?: ReactNode;
}

export function ContactCard({ icon, title, detail, note, badge, action, tone, className, ...props }: ContactCardProps) {
  return (
    <div data-slot="contact-card" className={cn(contactCardVariants({ tone }), className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        <span className={contactCardIconVariants({ tone })}>
          <Icon name={icon} size={20} />
        </span>
        {badge && <span className="rounded-full bg-accent/18 px-2.5 py-1.5 text-xs leading-xs font-semibold text-accent">{badge}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className={contactCardTitleVariants({ tone })}>{title}</h2>
        <p className={contactCardDetailVariants({ tone })}>{detail}</p>
      </div>
      {note && <p className="text-sm leading-sm text-text-muted">{note}</p>}
      {action && <div className="flex">{action}</div>}
    </div>
  );
}
