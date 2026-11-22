import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * AppliedCode (molecule): the discount code that's on the order, with a Remove button and a
 * confirmation line. (Entering a code is a separate form.)
 */
export interface AppliedCodeProps extends Omit<ComponentProps<"div">, "children"> {
  code: string;
  /** e.g. "10% off order". */
  description?: string;
  label?: string;
  note?: string;
  onRemove?: () => void;
}

export function AppliedCode({
  code,
  description,
  label = "Discount code",
  note = "Code applied — one code per order",
  onRemove,
  className,
  ...props
}: AppliedCodeProps) {
  return (
    <div data-slot="applied-code" className={cn("flex flex-col gap-2 font-sans", className)} {...props}>
      <p className="text-sm leading-xs font-semibold text-text">{label}</p>
      <div className="flex items-center justify-between gap-3 rounded-md border-field border-dashed border-brand bg-sage-50 py-2.5 pr-2.5 pl-4">
        <p className="flex min-w-0 items-center gap-2">
          <Icon name="tag" size={16} className="text-brand" />
          <span className="text-base leading-4.5 font-semibold -tracking-tight text-primary dark:text-brand">{code}</span>
          {description && <span className="truncate text-sm leading-xs text-text-muted">· {description}</span>}
        </p>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove code ${code}`}
          className="shrink-0 rounded-full bg-bg px-3 py-1.5 text-sm leading-xs font-medium text-text transition-colors hover:bg-surface"
        >
          Remove
        </button>
      </div>
      <p className="flex items-center gap-1 text-xs leading-xs text-success">
        <Icon name="check" size={10} strokeWidth={3} />
        {note}
      </p>
    </div>
  );
}
