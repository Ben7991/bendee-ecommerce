import type { ElementType, ReactNode } from "react";
import type { VariantProps as CvaVariantProps } from "class-variance-authority";

/** Variant props of a cva() definition, with every key optional and `null` removed. */
export type VariantProps<T extends (...args: any) => any> = {
  [K in keyof CvaVariantProps<T>]?: Exclude<CvaVariantProps<T>[K], null>;
};

/** Props for components that support rendering their child via Radix Slot. */
export interface AsChildProps {
  /** Render the single child element instead of the default tag, merging props onto it. */
  asChild?: boolean;
}

/** Breakpoints the designs are produced at (Paper: desktop 1440, tablet 768, mobile 390). */
export const DESIGN_VIEWPORTS = {
  mobile: 390,
  tablet: 768,
  desktop: 1440,
} as const;

export type DesignViewport = keyof typeof DESIGN_VIEWPORTS;

/**
 * A link component an app passes to organisms (`linkAs`), e.g. next/link. @repo/ui never imports
 * a router; organisms default to a plain <a>.
 */
export type LinkComponent = ElementType<{
  href: string;
  className?: string;
  children?: ReactNode;
  "aria-label"?: string;
  "aria-current"?: "page";
}>;
