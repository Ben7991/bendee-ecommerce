import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

/**
 * AddressCard (molecule): one saved address. The default sits on sage with an evergreen edge
 * and a "Default" pill; the others offer `setDefault` (a TextLink) in its place. `lines` are
 * the name/phone and address lines, `note` the landmark (muted). `actions`: Edit / Remove
 * TextLinks.
 */
export interface AddressCardProps extends Omit<ComponentProps<"article">, "children"> {
  label: string;
  icon?: IconName;
  isDefault?: boolean;
  defaultLabel?: string;
  setDefault?: ReactNode;
  lines: ReactNode[];
  note?: ReactNode;
  actions?: ReactNode;
}

export function AddressCard({
  label,
  icon = "mapPin",
  isDefault = false,
  defaultLabel = "Default",
  setDefault,
  lines,
  note,
  actions,
  className,
  ...props
}: AddressCardProps) {
  const titleId = useId();
  return (
    <article
      data-slot="address-card"
      aria-labelledby={titleId}
      className={cn(
        "flex flex-col gap-4 rounded-lg p-5 font-sans md:p-6",
        isDefault ? "border-field border-primary bg-sage-50" : "border border-border-subtle",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 id={titleId} className="flex items-center gap-2 text-lg leading-base font-semibold text-text">
          <Icon name={icon} size={18} className={isDefault ? "text-primary dark:text-text" : "text-text-secondary"} />
          {label}
        </h3>
        {isDefault ? (
          <span className="rounded-full bg-primary px-2.5 py-0.75 text-xs leading-xs font-semibold text-text-inverse">{defaultLabel}</span>
        ) : (
          setDefault && <div className="text-sm leading-xs">{setDefault}</div>
        )}
      </div>
      <address className="text-base leading-base text-text not-italic">
        {lines.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
        {note && <span className="block text-text-muted">{note}</span>}
      </address>
      {actions && <div className="flex gap-5 text-sm leading-xs">{actions}</div>}
    </article>
  );
}
