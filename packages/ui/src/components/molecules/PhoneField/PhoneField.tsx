import { cn } from "../../../lib";
import { Flag } from "../../atoms";
import { TextField, type TextFieldProps } from "../TextField";

/**
 * PhoneField (molecule): a 56px TextField for a Ghana mobile number, with the flag and +233
 * fixed in front. The input holds the national number only.
 */
export interface PhoneFieldProps extends Omit<TextFieldProps, "type" | "leading" | "label" | "boxSize"> {
  label?: string;
  dialCode?: string;
}

export function PhoneField({ label = "Phone number", dialCode = "+233", inputClassName, ...props }: PhoneFieldProps) {
  return (
    <TextField
      label={label}
      type="tel"
      inputMode="tel"
      autoComplete="tel-national"
      boxSize="lg"
      inputClassName={cn("tracking-compact", inputClassName)}
      leading={
        <>
          <span className="flex shrink-0 items-center gap-1.5">
            <Flag country="GH" />
            <span className="font-sans text-md leading-sm text-text-secondary">{dialCode}</span>
          </span>
          <span aria-hidden className="h-5.5 w-px shrink-0 bg-border" />
        </>
      }
      {...props}
    />
  );
}
