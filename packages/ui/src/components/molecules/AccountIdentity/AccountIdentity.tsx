import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Initials } from "../../atoms";

/** AccountIdentity (molecule): initials on a sage disc with the customer's name and phone (sidebar top). */
export interface AccountIdentityProps extends Omit<ComponentProps<"div">, "children"> {
  name: string;
  detail?: string;
}

export function AccountIdentity({ name, detail, className, ...props }: AccountIdentityProps) {
  return (
    <div data-slot="account-identity" className={cn("flex items-center gap-3 font-sans", className)} {...props}>
      <Initials name={name} />
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="text-md leading-sm font-semibold text-text">{name}</p>
        {detail && <p className="text-sm leading-xs text-text-muted">{detail}</p>}
      </div>
    </div>
  );
}
