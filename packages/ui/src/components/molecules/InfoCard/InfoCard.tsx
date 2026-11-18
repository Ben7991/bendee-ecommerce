import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

/** InfoCard (molecule): icon, short title and a sentence on a soft surface ("Already placed an order?"). */
export interface InfoCardProps extends Omit<ComponentProps<"div">, "title"> {
  icon: IconName;
  title: ReactNode;
  children: ReactNode;
}

export function InfoCard({ icon, title, children, className, ...props }: InfoCardProps) {
  return (
    <div
      data-slot="info-card"
      className={cn("flex items-start gap-3.5 rounded-lg bg-surface-subtle p-5 text-left font-sans text-sm leading-sm", className)}
      {...props}
    >
      <Icon name={icon} size={20} className="text-brand" />
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-text">{title}</p>
        <p className="text-text-secondary [&_strong]:font-semibold [&_strong]:text-text">{children}</p>
      </div>
    </div>
  );
}
