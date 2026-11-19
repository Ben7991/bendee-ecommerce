import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * SubscriptionCard variants (Paper Account → Subscriptions):
 *   full:    the active subscription, outlined in evergreen, with settings, upcoming deliveries and actions
 *   compact: a paused one in a single row with one action
 */
export const subscriptionCardVariants = cva("flex flex-col overflow-hidden rounded-xl font-sans", {
  variants: {
    variant: {
      full: "border-field border-primary",
      compact: "border border-border-subtle",
    },
  },
  defaultVariants: { variant: "full" },
});

export type SubscriptionCardVariantProps = VariantProps<typeof subscriptionCardVariants>;
