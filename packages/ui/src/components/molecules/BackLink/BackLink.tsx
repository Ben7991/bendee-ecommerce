import type { ComponentProps } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * BackLink (molecule): "‹ Back" / "‹ Back to sign in" above a page title. Pass the app's link
 * with `asChild`: <BackLink asChild><Link href="/auth/sign-in">Back to sign in</Link></BackLink>.
 */
export interface BackLinkProps extends ComponentProps<"a">, AsChildProps {
  /** muted: small grey link above a title (auth). brand: underlined green link ("Continue shopping"). */
  tone?: "muted" | "brand";
}

export function BackLink({ className, tone = "muted", asChild = false, children, ...props }: BackLinkProps) {
  const Comp = asChild ? Slot : "a";
  const brand = tone === "brand";
  return (
    <Comp
      data-slot="back-link"
      className={cn(
        "inline-flex w-fit items-center font-sans transition-colors",
        brand
          ? "gap-2 text-base leading-4.5 font-semibold text-brand underline decoration-1 hover:text-primary dark:hover:text-text"
          : "gap-1.5 text-sm leading-xs text-text-muted hover:text-text",
        className,
      )}
      {...props}
    >
      <Icon name="chevronLeft" size={brand ? 16 : 14} />
      <Slottable>{children}</Slottable>
    </Comp>
  );
}
