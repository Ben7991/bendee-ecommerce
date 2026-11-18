import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * Flag (atom): a small country flag (22×15) for phone and address fields. Decorative unless
 * given a `label`. Flag colours are fixed by the country, so they are the one exception to the
 * token rule (disabled per line).
 */
export interface FlagProps extends Omit<ComponentProps<"svg">, "children"> {
  country: "GH";
  label?: string;
}

export function Flag({ country, label, className, ...props }: FlagProps) {
  return (
    <svg
      data-slot="flag"
      data-country={country}
      viewBox="0 0 22 15"
      width={22}
      height={15}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={cn("inline-block shrink-0 overflow-hidden rounded-2", className)}
      {...props}
    >
      {/* eslint-disable no-restricted-syntax -- Ghana flag colours */}
      <rect width="22" height="5" fill="#CE1126" />
      <rect y="5" width="22" height="5" fill="#FCD116" />
      <rect y="10" width="22" height="5" fill="#006B3F" />
      <rect x="9" y="5.5" width="4" height="4" rx="1" fill="#000000" />
      {/* eslint-enable no-restricted-syntax */}
    </svg>
  );
}
