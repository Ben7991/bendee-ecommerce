import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, IconButton, Logo } from "../../atoms";
import { BackLink, CheckoutSteps } from "../../molecules";

/**
 * CheckoutHeader (organism): the checkout's own header (no shop navigation).
 *   checkout: logo, "Back to cart", steps, "Secure checkout". Mobile: back · logo · lock, then
 *             "Step 2 of 4 · Delivery" and a 4-segment bar.
 *   payment:  same from 768px without the back link; mobile shows only "Secure payment · Jofak".
 *   done:     logo and a help line; nothing on mobile.
 */
export interface CheckoutHeaderProps extends ComponentProps<"header"> {
  mode?: "checkout" | "payment" | "done";
  steps: string[];
  /** Zero-based index of the active step (steps.length when all are done). */
  current: number;
  /** Mobile, right of the step label, e.g. "Next: Payment" or "Last step". */
  nextLabel?: string;
  backHref?: string;
  backLabel?: string;
  /** Mobile back button target (previous step). */
  mobileBackHref?: string;
  /** done mode: e.g. "Need help? <TextLink>Chat on WhatsApp</TextLink>". */
  help?: ReactNode;
  homeHref?: string;
  linkAs?: LinkComponent;
}

export function CheckoutHeader({
  mode = "checkout",
  steps,
  current,
  nextLabel,
  backHref = "/cart",
  backLabel = "Back to cart",
  mobileBackHref = backHref,
  help,
  homeHref = "/",
  linkAs: Link = "a",
  className,
  ...props
}: CheckoutHeaderProps) {
  const logo = (
    <Logo asChild size="auth" className="w-fit">
      <Link href={homeHref} aria-label="Jofak home" />
    </Logo>
  );
  const secure = (
    <p className="flex items-center gap-2 font-sans text-sm leading-xs font-semibold text-brand">
      <Icon name="padlock" size={16} className="size-3.75 xl:size-4" />
      Secure checkout
    </p>
  );

  if (mode === "done") {
    return (
      <header
        data-slot="checkout-header"
        className={cn("hidden items-center justify-between border-b border-border-subtle bg-bg px-10 py-5 md:flex xl:px-14", className)}
        {...props}
      >
        {logo}
        {help && <p className="font-sans text-sm leading-xs text-text-muted">{help}</p>}
      </header>
    );
  }

  const step = Math.min(current, steps.length - 1);

  return (
    <header data-slot="checkout-header" className={cn("bg-bg md:border-b md:border-border-subtle", className)} {...props}>
      {/* Mobile */}
      {mode === "payment" ? (
        <p className="flex items-center justify-center gap-2 px-5 pt-2 pb-3 font-sans text-sm leading-xs font-semibold text-brand md:hidden">
          <Icon name="padlock" size={18} />
          Secure payment · Jofak
        </p>
      ) : (
        <div className="md:hidden">
          <div className="flex items-center justify-between px-5 pt-1 pb-3">
            <IconButton asChild label="Back" size="md" className="size-10">
              <Link href={mobileBackHref}>
                <Icon name="chevronLeft" size={16} />
              </Link>
            </IconButton>
            {logo}
            <span className="flex size-10 items-center justify-center text-brand">
              <Icon name="padlock" size={18} label="Secure checkout" />
            </span>
          </div>
          <div className="flex flex-col gap-2 px-5 pb-4 font-sans text-xs leading-xs">
            <p className="flex justify-between gap-3">
              <span className="font-semibold text-text">
                Step {step + 1} of {steps.length} · {steps[step]}
              </span>
              {nextLabel && <span className="text-text-muted">{nextLabel}</span>}
            </p>
            <div aria-hidden className="flex gap-1">
              {steps.map((name, index) => (
                <span
                  key={name}
                  className={cn("h-1 flex-1 rounded-full", index < current ? "bg-brand" : index === current ? "bg-primary" : "bg-border")}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tablet and desktop */}
      <div className="hidden flex-wrap items-center justify-between gap-y-4 px-10 pt-5 pb-4 md:flex xl:flex-nowrap xl:px-14 xl:py-5">
        <div className="order-1 flex items-center gap-5 xl:w-80 xl:shrink-0 xl:gap-6">
          {logo}
          {mode === "checkout" && (
            <BackLink asChild>
              <Link href={backHref}>{backLabel}</Link>
            </BackLink>
          )}
        </div>
        <CheckoutSteps steps={steps} current={current} className="order-3 w-full justify-center xl:order-2 xl:w-auto" />
        <div className="order-2 flex justify-end xl:order-3 xl:w-80 xl:shrink-0">{secure}</div>
      </div>
    </header>
  );
}
