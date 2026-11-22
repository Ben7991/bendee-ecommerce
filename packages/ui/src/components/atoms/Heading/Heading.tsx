import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { headingVariants, type HeadingVariantProps } from "./Heading.variants";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

/**
 * Heading (atom). Pick the visual `size` independently of the semantic level (`as`).
 *   <Heading as="h1" size="hero">Daily rituals for a body that feels <em>naturally</em> well.</Heading>
 */
export interface HeadingProps extends ComponentProps<"h2">, HeadingVariantProps {
  as?: HeadingLevel;
}

export function Heading({ as: Tag = "h2", className, size, tone, ...props }: HeadingProps) {
  return <Tag data-slot="heading" className={cn(headingVariants({ size, tone }), className)} {...props} />;
}
