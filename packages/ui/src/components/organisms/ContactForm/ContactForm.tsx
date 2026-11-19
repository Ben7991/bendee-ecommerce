import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Button } from "../../atoms";
import { PhoneField, SelectField, TextAreaField, TextField } from "../../molecules";

/**
 * ContactForm (organism): "Send us a message" on the Contact page: name, phone, topic, an
 * optional order number and the message. Two columns from 768px; on mobile the button comes
 * before the privacy note. Fields post as `name`, `phone`, `topic`, `order` and `message`.
 */
export interface ContactFormProps extends Omit<ComponentProps<"form">, "title" | "children"> {
  title?: ReactNode;
  description?: ReactNode;
  topics: Array<{ value: string; label: string }>;
  /** Small print next to the button, e.g. with a Privacy policy link. */
  note?: ReactNode;
  submitLabel?: string;
}

export function ContactForm({
  title = "Send us a message",
  description = "We'll reply by SMS or email, whichever you prefer.",
  topics,
  note,
  submitLabel = "Send message",
  className,
  ...props
}: ContactFormProps) {
  return (
    <form
      data-slot="contact-form"
      aria-label={typeof title === "string" ? title : undefined}
      className={cn("flex flex-col gap-5 rounded-xl bg-surface-subtle p-5 font-sans md:p-7", className)}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-22 leading-lg font-medium tracking-snug text-text md:text-2xl md:leading-2xl">{title}</h2>
        {description && <p className="text-base leading-sm text-text-secondary">{description}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Your name" name="name" autoComplete="name" placeholder="Ama Mensah" required />
        <PhoneField name="phone" placeholder="24 000 0000" required />
        <SelectField label="What's it about?" name="topic" options={topics} />
        <TextField
          label={
            <>
              Order number <span className="font-regular text-text-muted">(optional)</span>
            </>
          }
          name="order"
          placeholder="JF-10482"
        />
      </div>
      <TextAreaField
        label="Message"
        name="message"
        required
        placeholder="Tell us what's happening and we'll take it from there."
        textareaClassName="h-30"
      />
      <div className="flex flex-col-reverse gap-3.5 md:flex-row md:items-center md:justify-between md:gap-4">
        {note && (
          <p className="text-sm leading-sm text-text-muted [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-2 dark:[&_a]:text-brand">
            {note}
          </p>
        )}
        <Button type="submit" size="sm" className="w-full md:w-auto md:shrink-0 md:px-6">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
