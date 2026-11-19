import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";
import { noticeBannerVariants, type NoticeBannerVariantProps } from "./NoticeBanner.variants";

/**
 * NoticeBanner (molecule): a tinted page-level notice with an icon disc, a title, a line and one
 * action ("This sale ended on Sat 31 Jan · See current offers"). The action goes full width on
 * mobile. Not dismissible; for dismissible tips use Notice.
 */
export interface NoticeBannerProps extends Omit<ComponentProps<"div">, "title" | "children">, NoticeBannerVariantProps {
  icon?: IconName;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export function NoticeBanner({ icon = "clock", title, description, action, tone, className, ...props }: NoticeBannerProps) {
  return (
    <div data-slot="notice-banner" role="status" className={cn(noticeBannerVariants({ tone }), className)} {...props}>
      <div className="flex min-w-0 flex-1 items-start gap-3 md:items-center md:gap-4">
        <span data-slot="notice-banner-icon" aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bg">
          <Icon name={icon} size={18} />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-sm leading-sm font-semibold text-text md:text-base">{title}</p>
          {description && <p className="text-sm leading-sm text-text-secondary">{description}</p>}
        </div>
      </div>
      {action && <div className="flex shrink-0 flex-col *:w-full md:*:w-auto">{action}</div>}
    </div>
  );
}
