import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";
import { settingCardIconVariants, settingCardVariants, type SettingCardVariantProps } from "./SettingCard.variants";

/**
 * SettingCard (molecule): one account control with an icon tile, a title, a line about it and
 * its action ("Download your data · Request export"). The action sits on the right from 768px
 * and goes full width under the text on mobile; `compactAction` replaces it there (e.g. a
 * chevron link), `compactDescription` shortens the line. `note` adds small print underneath.
 */
export interface SettingCardProps extends Omit<ComponentProps<"section">, "title" | "children">, SettingCardVariantProps {
  icon: IconName;
  title: ReactNode;
  description: ReactNode;
  compactDescription?: ReactNode;
  action?: ReactNode;
  compactAction?: ReactNode;
  note?: ReactNode;
}

export function SettingCard({ icon, title, description, compactDescription, action, compactAction, note, tone, className, ...props }: SettingCardProps) {
  const titleId = useId();
  const danger = tone === "danger";
  return (
    <section data-slot="setting-card" aria-labelledby={titleId} className={cn(settingCardVariants({ tone }), className)} {...props}>
      <div className="flex items-center gap-4 md:gap-5">
        <span aria-hidden className={settingCardIconVariants({ tone })}>
          <Icon name={icon} size={20} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h2 id={titleId} className="text-md leading-base font-semibold text-text md:text-lg">
            {title}
          </h2>
          <p className={cn("text-sm leading-sm", danger ? "text-text-secondary" : "text-text-muted")}>
            {compactDescription ? (
              <>
                <span className="md:hidden">{compactDescription}</span>
                <span className="hidden md:inline">{description}</span>
              </>
            ) : (
              description
            )}
          </p>
        </div>
        {compactAction && <div className="shrink-0 md:hidden">{compactAction}</div>}
        {action && <div className="hidden shrink-0 md:block">{action}</div>}
      </div>
      {action && !compactAction && <div className="flex flex-col *:w-full md:hidden">{action}</div>}
      {note && <p className="hidden text-xs leading-sm text-text-muted md:block md:pl-16">{note}</p>}
    </section>
  );
}
