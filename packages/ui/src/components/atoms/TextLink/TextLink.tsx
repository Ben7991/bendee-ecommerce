import type { ComponentProps } from "react";

import { cn, Slot, type AsChildProps } from "../../../lib";
import { textLinkVariants, type TextLinkVariantProps } from "./TextLink.variants";

/**
 * TextLink (atom): an underlined link inside running text. For standalone actions use Button;
 * for "‹ Back" links use BackLink. Pass the app's link with `asChild`:
 *   <TextLink asChild><Link href="/auth/sign-in">Sign in</Link></TextLink>
 */
export interface TextLinkProps extends ComponentProps<"a">, TextLinkVariantProps, AsChildProps {}

export function TextLink({ className, tone, asChild = false, ...props }: TextLinkProps) {
  const Comp = asChild ? Slot : "a";
  return <Comp data-slot="text-link" className={cn(textLinkVariants({ tone }), className)} {...props} />;
}
