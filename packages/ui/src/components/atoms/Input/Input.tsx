import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { inputVariants, type InputVariantProps } from "./Input.variants";

/** Input (atom): a text field without chrome. Always pair it with a label (visible or sr-only). */
export interface InputProps extends Omit<ComponentProps<"input">, "size">, InputVariantProps {}

export function Input({ className, tone, size, type = "text", ...props }: InputProps) {
  return <input data-slot="input" type={type} className={cn(inputVariants({ tone, size }), className)} {...props} />;
}
