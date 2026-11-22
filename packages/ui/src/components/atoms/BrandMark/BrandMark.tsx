import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../Icon";
import { brandMarkVariants, type BrandMarkVariantProps } from "./BrandMark.variants";

/**
 * BrandMark (atom): a brand's logo tile: the uploaded `image`, or a `monogram` ("A", "CL") in
 * serif or bold sans, or an `icon`, on a tint. `tone="empty"` is the dashed tile for a brand
 * with no logo. Decorative: show the brand name beside it.
 */
export interface BrandMarkProps extends Omit<ComponentProps<"span">, "children">, BrandMarkVariantProps {
  image?: ReactNode;
  monogram?: string;
  /** Instrument Serif (italic with `italic`) instead of bold sans. */
  serif?: boolean;
  italic?: boolean;
  icon?: IconName;
}

export function BrandMark({ image, monogram, serif = false, italic = false, icon, tone, size, round, className, ...props }: BrandMarkProps) {
  const lg = size === "lg";
  const empty = tone === "empty";
  return (
    <span data-slot="brand-mark" aria-hidden className={cn(brandMarkVariants({ tone: image ? "plain" : tone, size, round }), className)} {...props}>
      {image ? (
        image
      ) : empty ? (
        <Icon name="image" size={lg ? 28 : 16} strokeWidth={1.4} />
      ) : icon ? (
        <Icon name={icon} size={lg ? 44 : 20} />
      ) : monogram ? (
        <span
          className={cn(
            serif ? cn("font-serif font-regular", italic && "italic", lg ? "text-5xl leading-5xl" : "text-22 leading-base") : cn("font-sans font-bold tracking-compact", lg ? "text-3xl leading-3xl" : "text-14 leading-xs"),
          )}
        >
          {monogram}
        </span>
      ) : null}
    </span>
  );
}
