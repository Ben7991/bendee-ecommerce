import type { ComponentProps } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { logoMarkVariants, logoVariants, type LogoVariantProps } from "./Logo.variants";

/**
 * Logo (atom): the Jofak leaf mark and wordmark.
 * Use `tone="inverse"` on feature surfaces (footer). To make it a link, pass an empty link
 * element with `asChild`: <Logo asChild><a href="/" aria-label="Jofak home" /></Logo>.
 */
export interface LogoProps extends ComponentProps<"span">, LogoVariantProps, AsChildProps {}

export function Logo({ className, tone, size, asChild = false, children, ...props }: LogoProps) {
  const Comp = asChild ? Slot : "span";
  const inverse = tone === "inverse";
  const detailed = size !== "compact";

  return (
    <Comp data-slot="logo" className={cn(logoVariants({ tone, size }), className)} {...props}>
      <svg
        viewBox="0 0 34 34"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        focusable="false"
        className={logoMarkVariants({ size })}
      >
        <path
          d="M17 30C17 30 6 25 6 15C6 9 10 5 10 5C10 5 17 9 17 18C17 9 24 5 24 5C24 5 28 9 28 15C28 25 17 30 17 30Z"
          className={inverse ? "fill-accent" : "fill-brand"}
        />
        {detailed && (
          <path
            d="M17 30V14"
            fill="none"
            strokeWidth="1.6"
            strokeLinecap="round"
            className={inverse ? "stroke-evergreen-900 dark:stroke-text" : "stroke-white"}
          />
        )}
        {detailed && !inverse && <circle cx="17" cy="7" r="3" className="fill-accent" />}
      </svg>
      <Slottable>{children}</Slottable>
      <span>Jofak</span>
    </Comp>
  );
}
