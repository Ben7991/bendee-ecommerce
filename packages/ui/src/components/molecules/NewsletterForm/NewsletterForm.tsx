import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Button, Input } from "../../atoms";
import { newsletterFieldVariants, type NewsletterFormVariantProps } from "./NewsletterForm.variants";

/**
 * NewsletterForm (molecule): email field + submit in one pill. Pass `action` (a server action
 * or URL) like any <form>; the field is named "email".
 */
export interface NewsletterFormProps extends ComponentProps<"form">, NewsletterFormVariantProps {
  placeholder?: string;
  submitLabel?: string;
  /** Small print under the field. */
  hint?: ReactNode;
}

export function NewsletterForm({
  className,
  tone,
  placeholder = "Your email address",
  submitLabel = "Subscribe",
  hint,
  ...props
}: NewsletterFormProps) {
  const inputId = useId();
  const hintId = useId();
  const feature = tone === "feature";

  return (
    <form data-slot="newsletter-form" className={cn("flex flex-col gap-3.5", className)} {...props}>
      <div className={newsletterFieldVariants({ tone })}>
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <Input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          aria-describedby={hint ? hintId : undefined}
          tone={feature ? "inverse" : "default"}
          size={feature ? "md" : "sm"}
        />
        <Button type="submit" variant={feature ? "accent" : "primary"} size={feature ? "md" : "sm"}>
          {submitLabel}
        </Button>
      </div>
      {hint && (
        <p id={hintId} className={cn("pl-6 font-sans text-sm leading-xs", feature ? "text-on-feature-muted" : "text-text-muted")}>
          {hint}
        </p>
      )}
    </form>
  );
}
