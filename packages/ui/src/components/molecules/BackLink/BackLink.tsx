import type { ComponentProps } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * BackLink (molecule): "‹ Back" / "‹ Back to sign in" above a page title. Pass the app's link
 * with `asChild`: <BackLink asChild><Link href="/auth/sign-in">Back to sign in</Link></BackLink>.
 */
export interface BackLinkProps extends ComponentProps<"a">, AsChildProps {}

export function BackLink({ className, asChild = false, children, ...props }: BackLinkProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      data-slot="back-link"
      className={cn(
        "inline-flex w-fit items-center gap-1.5 font-sans text-sm leading-xs text-text-muted transition-colors hover:text-text",
        className,
      )}
      {...props}
    >
      <Icon name="chevronLeft" size={14} />
      <Slottable>{children}</Slottable>
    </Comp>
  );
}
