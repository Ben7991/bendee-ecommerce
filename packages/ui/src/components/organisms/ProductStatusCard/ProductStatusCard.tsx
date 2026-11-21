"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState, type ComponentProps } from "react";

import { type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";
import { AdminCard } from "../../molecules";

export type ProductStatus = "active" | "draft" | "archived";

const OPTIONS: { value: ProductStatus; label: string; help: string }[] = [
  { value: "active", label: "Active", help: "Visible on the store and in search." },
  { value: "draft", label: "Draft", help: "Hidden from the store until you set it active." },
  { value: "archived", label: "Archived", help: "Hidden everywhere; its address redirects to a similar product." },
];

/**
 * ProductStatusCard (organism): Active · Draft · Archived as a segmented choice with what it
 * means, and a link to schedule a change (Paper Jofak - Admin → Product editor → Status). Posts
 * `status`.
 */
export interface ProductStatusCardProps extends Omit<ComponentProps<"section">, "children" | "title"> {
  linkAs?: LinkComponent;
  status: ProductStatus;
  scheduleHref?: string;
}

export function ProductStatusCard({ linkAs: LinkAs = "a", status: initial, scheduleHref, ...props }: ProductStatusCardProps) {
  const [status, setStatus] = useState<ProductStatus>(initial);
  return (
    <AdminCard data-slot="product-status-card" title="Status" variant="eyebrow" {...props}>
      <RadioGroup.Root
        name="status"
        value={status}
        onValueChange={(value) => setStatus(value as ProductStatus)}
        aria-label="Product status"
        className="flex gap-0.5 rounded-full bg-surface-subtle p-1"
      >
        {OPTIONS.map((option) => (
          <RadioGroup.Item
            key={option.value}
            value={option.value}
            className="flex-1 rounded-full py-1.75 text-center text-sm leading-xs font-medium text-text-secondary transition-colors hover:text-text data-[state=checked]:bg-bg data-[state=checked]:font-semibold data-[state=checked]:text-brand data-[state=checked]:shadow-xs"
          >
            {option.label}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
      <p className="text-sm leading-4.5 text-text-secondary">{OPTIONS.find((option) => option.value === status)?.help}</p>
      {scheduleHref && (
        <LinkAs href={scheduleHref} className="flex items-center gap-2 text-sm leading-xs font-semibold text-brand hover:underline">
          <Icon name="calendar" size={14} />
          Schedule a change
        </LinkAs>
      )}
    </AdminCard>
  );
}
