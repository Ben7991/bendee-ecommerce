import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon, PaymentBadge, type PaymentBrand } from "../../atoms";

/** PaymentMethods (molecule): accepted payment badges and the secure-payment note under a checkout button. */
export interface PaymentMethodsProps extends Omit<ComponentProps<"div">, "children"> {
  brands?: PaymentBrand[];
  note?: string;
}

export function PaymentMethods({
  brands = ["mtn", "telecel", "airteltigo", "visa", "mastercard"],
  note = "Secure payments by Paystack · Pay on delivery available",
  className,
  ...props
}: PaymentMethodsProps) {
  return (
    <div data-slot="payment-methods" className={cn("flex flex-col items-center gap-3", className)} {...props}>
      <ul aria-label="Accepted payment methods" className="flex flex-wrap justify-center gap-1.5">
        {brands.map((brand) => (
          <li key={brand}>
            <PaymentBadge brand={brand} />
          </li>
        ))}
      </ul>
      <p className="flex items-center gap-1.5 text-center font-sans text-xs leading-xs text-text-muted">
        <Icon name="shield" size={12} strokeWidth={2.2} />
        {note}
      </p>
    </div>
  );
}
