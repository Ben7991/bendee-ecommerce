import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import {
  helpCalloutTextVariants,
  helpCalloutTitleVariants,
  helpCalloutVariants,
  type HelpCalloutVariantProps,
} from "./HelpCallout.variants";

/**
 * HelpCallout (molecule): the panel that closes a content page with a next step ("Still need
 * help? · Chat on WhatsApp", "Not sure where to start? · Take the quiz"). Pass a Button as
 * `action`; it goes full width on mobile.
 */
export interface HelpCalloutProps extends Omit<ComponentProps<"aside">, "title" | "children">, HelpCalloutVariantProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export function HelpCallout({ title, description, action, tone, className, ...props }: HelpCalloutProps) {
  return (
    <aside data-slot="help-callout" className={cn(helpCalloutVariants({ tone }), className)} {...props}>
      <div className="flex flex-col gap-1">
        <p className={helpCalloutTitleVariants({ tone })}>{title}</p>
        {description && <p className={helpCalloutTextVariants({ tone })}>{description}</p>}
      </div>
      {action && <div className="flex shrink-0 flex-col *:w-full md:*:w-auto">{action}</div>}
    </aside>
  );
}
