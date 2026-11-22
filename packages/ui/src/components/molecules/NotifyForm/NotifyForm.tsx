import { useId, type ComponentProps } from "react";

import { cn } from "../../../lib";
import { Button, Flag } from "../../atoms";

/**
 * NotifyForm (molecule): "Get a text when we're back": a Ghana phone number and a submit
 * button. Mobile stacks a field and a full-width button; from 768px it's one 520px pill.
 * Without `action` the button doesn't submit (so a number never ends up in a GET URL).
 */
export interface NotifyFormProps extends Omit<ComponentProps<"form">, "children"> {
  label?: string;
  submitLabel?: string;
  dialCode?: string;
  name?: string;
}

export function NotifyForm({
  label = "Get a text when we're back",
  submitLabel = "Notify me",
  dialCode = "+233",
  name = "phone",
  action,
  className,
  ...props
}: NotifyFormProps) {
  const id = useId();
  return (
    <form
      data-slot="notify-form"
      action={action}
      method={typeof action === "string" ? "post" : undefined}
      className={cn("flex flex-col gap-2.5 font-sans md:items-center", className)}
      {...props}
    >
      <label htmlFor={id} className="text-left text-sm leading-sm font-semibold text-text md:text-center">
        {label}
      </label>
      <div className="flex flex-col gap-2.5 md:h-14 md:w-130 md:flex-row md:items-center md:rounded-full md:border-field md:border-border md:pr-1.5 md:pl-4 md:focus-within:border-brand">
        <div className="flex h-13 items-center gap-2.5 rounded-sm border-field border-border px-4 focus-within:border-brand md:h-auto md:flex-1 md:border-0 md:px-0 md:focus-within:border-0">
          <Flag country="GH" />
          <span className="text-md leading-sm text-text-secondary">{dialCode}</span>
          <span aria-hidden className="h-5.5 w-px shrink-0 bg-border" />
          <input
            id={id}
            name={name}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="Phone number"
            className="h-full w-0 min-w-0 flex-1 bg-transparent text-md leading-sm text-text outline-none placeholder:text-text-muted"
          />
        </div>
        <Button
          type={action ? "submit" : "button"}
          size="md"
          className="h-12 w-full md:h-auto md:w-auto md:px-5 md:py-3 md:text-sm md:leading-xs"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
