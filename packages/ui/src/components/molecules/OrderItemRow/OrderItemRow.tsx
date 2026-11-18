import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

const TINTS = { sage: "bg-sage-100", amber: "bg-tint-amber", lavender: "bg-tint-lavender", sun: "bg-tint-sun" } as const;

/** OrderItemRow (molecule): a product line in an order summary: packshot with quantity, name, detail, price. */
export interface OrderItemRowProps extends Omit<ComponentProps<"div">, "children"> {
  name: string;
  detail?: string;
  /** Pre-formatted, e.g. "GHS 640". */
  price: string;
  quantity: number;
  tint?: keyof typeof TINTS;
  image?: ReactNode;
}

export function OrderItemRow({ name, detail, price, quantity, tint = "sage", image, className, ...props }: OrderItemRowProps) {
  return (
    <div data-slot="order-item-row" className={cn("flex items-center gap-4 font-sans", className)} {...props}>
      <span className={cn("relative flex h-17 w-15 shrink-0 items-center justify-center rounded-sm", TINTS[tint])}>
        <span className="relative h-12.25 w-10">{image}</span>
        <span className="absolute -top-1.5 -right-1.5 flex size-5.5 items-center justify-center rounded-full bg-primary text-11 leading-3 font-bold text-text-inverse">
          <span className="sr-only">Quantity </span>
          {quantity}
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-base leading-sm font-semibold text-text">{name}</span>
        {detail && <span className="text-xs leading-xs text-text-muted">{detail}</span>}
      </span>
      <span className="text-base leading-sm font-semibold whitespace-pre text-text">{price}</span>
    </div>
  );
}
