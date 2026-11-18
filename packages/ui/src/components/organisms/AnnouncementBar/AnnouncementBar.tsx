import { Fragment, type ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

export interface AnnouncementItem {
  icon: IconName;
  label: string;
}

/**
 * AnnouncementBar (organism): the evergreen strip of store promises above the header
 * ("Delivery in Accra within 24h · Pay with MoMo or card · …"). Tablet and desktop only.
 */
export interface AnnouncementBarProps extends ComponentProps<"div"> {
  items: AnnouncementItem[];
}

export function AnnouncementBar({ items, className, ...props }: AnnouncementBarProps) {
  return (
    <div
      data-slot="announcement-bar"
      className={cn("hidden items-center justify-center gap-5 bg-primary px-5 py-2.5 md:flex xl:gap-10 xl:px-14", className)}
      {...props}
    >
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && <span aria-hidden className="size-1 shrink-0 rounded-full bg-evergreen-300" />}
          <p className="flex items-center gap-2 font-sans text-sm leading-xs font-medium text-text-inverse">
            <Icon name={item.icon} size={14} strokeWidth={2.2} className="text-accent" />
            {item.label}
          </p>
        </Fragment>
      ))}
    </div>
  );
}
