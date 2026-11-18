import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { ProgressBar } from "../../atoms";

/**
 * LoadMore (molecule): "You've seen 24 of 41 products", a short progress bar and the
 * Load more button (mobile PLP). Pass the button as `action`, e.g.
 *   <Button asChild variant="secondary" size="md" className="w-full"><Link href="?page=2">Load more</Link></Button>
 */
export interface LoadMoreProps extends ComponentProps<"div"> {
  shown: number;
  total: number;
  /** "products" in "You've seen 24 of 41 products". */
  noun?: string;
  action?: ReactNode;
}

export function LoadMore({ shown, total, noun = "products", action, className, ...props }: LoadMoreProps) {
  return (
    <div data-slot="load-more" className={cn("flex flex-col items-center gap-4", className)} {...props}>
      <p className="font-sans text-sm leading-xs text-text-muted">
        You&apos;ve seen <strong className="font-semibold text-text">{shown}</strong> of {total} {noun}
      </p>
      <ProgressBar value={total ? (shown / total) * 100 : 0} label={`${shown} of ${total} ${noun} shown`} className="h-1 w-40" />
      {action}
    </div>
  );
}
