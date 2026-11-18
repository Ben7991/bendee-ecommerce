import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Button, Icon } from "../../atoms";

const TINTS = {
  sage: "bg-sage-100",
  amber: "bg-tint-amber",
  lavender: "bg-tint-lavender",
  sun: "bg-tint-sun",
} as const;

/** SuggestionRow (molecule): a one-line product suggestion with an Add button (empty mini-cart). */
export interface SuggestionRowProps extends Omit<ComponentProps<"div">, "children"> {
  name: string;
  href: string;
  /** e.g. "★ 4.8 · GHS 380". */
  meta: string;
  tint?: keyof typeof TINTS;
  image?: ReactNode;
  onAdd?: () => void;
  linkAs?: LinkComponent;
}

export function SuggestionRow({ name, href, meta, tint = "sage", image, onAdd, linkAs: Link = "a", className, ...props }: SuggestionRowProps) {
  return (
    <div data-slot="suggestion-row" className={cn("flex items-center gap-3.5 font-sans", className)} {...props}>
      <span className={cn("relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-sm", TINTS[tint])}>
        <span className="relative h-12 w-10">{image}</span>
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Link href={href} className="text-sm leading-sm font-medium text-text hover:underline">
          {name}
        </Link>
        <p className="text-xs leading-xs text-text-muted">{meta}</p>
      </div>
      <Button
        type="button"
        size="xs"
        variant="outline"
        onClick={onAdd}
        aria-label={`Add ${name} to bag`}
        className="shrink-0 gap-1.5 px-3.5 py-2 text-xs leading-xs font-semibold"
      >
        <Icon name="plus" size={12} strokeWidth={2.4} />
        Add
      </Button>
    </div>
  );
}
