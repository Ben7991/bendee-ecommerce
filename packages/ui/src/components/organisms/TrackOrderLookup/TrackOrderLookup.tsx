import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Button, Heading, Icon, IconBadge } from "../../atoms";
import { PhoneField, TextField } from "../../molecules";

/**
 * TrackOrderLookup (organism): the public "Where's my order?" lookup (Paper Track order →
 * Lookup / Not found). A lime truck badge, the title, then a card with the order number and
 * phone, the Track order button and a sign-in line, over a sage wash. Pass `error` when the
 * lookup failed (it shows a citrus alert) and `orderError` to flag the order number. Posts
 * `order` and `phone` (a GET form by default, so the result has a shareable URL).
 */
export interface TrackOrderLookupProps extends Omit<ComponentProps<"section">, "title"> {
  action?: string | ((formData: FormData) => void | Promise<void>);
  method?: "get" | "post";
  defaultOrder?: string;
  defaultPhone?: string;
  error?: { title: ReactNode; description: ReactNode };
  orderError?: ReactNode;
  eyebrow?: ReactNode;
  /** Wrap the accent word in <em>. */
  title?: ReactNode;
  description?: ReactNode;
  /** "Have an account? Sign in to see all your orders." */
  footer?: ReactNode;
  /** The line under the card ("Got a tracking link by SMS?…"). */
  hint?: ReactNode;
}

export function TrackOrderLookup({
  action,
  method = "get",
  defaultOrder,
  defaultPhone,
  error,
  orderError,
  eyebrow = "Track an order",
  title = (
    <>
      Where&apos;s my <em>order?</em>
    </>
  ),
  description = "Enter your order number and the phone number you used at checkout. No account needed.",
  footer,
  hint,
  className,
  ...props
}: TrackOrderLookupProps) {
  const titleId = useId();
  return (
    <section
      data-slot="track-order-lookup"
      aria-labelledby={titleId}
      className={cn("flex flex-col items-center gap-6 bg-linear-to-b from-bg to-sage-50 px-5 pt-6 pb-10 font-sans md:gap-7 md:px-14 md:pt-18 md:pb-24", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-3 text-center md:gap-3.5">
        <IconBadge icon="truck" tone="accent" size="lg" iconSize={34} className="size-15 md:size-18" />
        <p className="text-xs leading-xs font-semibold tracking-wide text-brand uppercase">{eyebrow}</p>
        <Heading id={titleId} as="h1" size="section">
          {title}
        </Heading>
        <p className="max-w-130 text-sm leading-sm text-text-secondary md:text-lg md:leading-lg">{description}</p>
      </div>

      <form
        action={action}
        method={typeof action === "string" ? method : undefined}
        className="flex w-full max-w-120 flex-col gap-5 rounded-xl border border-border-subtle bg-bg p-5 shadow-card md:rounded-2xl md:p-8"
      >
        {error && (
          <div role="alert" className="flex items-start gap-3 rounded-md bg-tint-citrus px-4 py-3.5 text-sm leading-sm">
            <span aria-hidden className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-error text-text-inverse">
              <Icon name="exclamation" size={12} />
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold text-text">{error.title}</p>
              <p className="text-text-secondary">{error.description}</p>
            </div>
          </div>
        )}
        <TextField
          label="Order number"
          name="order"
          required
          autoComplete="off"
          autoCapitalize="characters"
          placeholder="JFK-250184"
          defaultValue={defaultOrder}
          aria-invalid={orderError ? true : undefined}
          hint={orderError ?? "It's in your confirmation SMS and email."}
          hintTone={orderError ? "error" : "muted"}
        />
        <PhoneField name="phone" required placeholder="24 412 7781" defaultValue={defaultPhone} />
        <Button type="submit" size="xl" className="w-full">
          Track order <Icon name="arrowRight" size={16} strokeWidth={2.2} />
        </Button>
        {footer && <p className="border-t border-border-subtle pt-5 text-center text-sm leading-sm text-text-secondary">{footer}</p>}
      </form>

      {hint && (
        <p className="flex items-center gap-2.5 text-center text-sm leading-sm text-text-muted">
          <Icon name="phone" size={16} className="shrink-0" />
          {hint}
        </p>
      )}
    </section>
  );
}
