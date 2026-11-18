import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, TextLink } from "../../atoms";

/**
 * StepCard (molecule): a checkout step that isn't the one you're on.
 *   done:    tick, what you entered, and Edit (mobile: compact caps label)
 *   pending: greyed number and title (hidden on mobile, where only done + current show)
 */
export interface StepCardProps extends Omit<ComponentProps<"div">, "title"> {
  status: "done" | "pending";
  number: number;
  title: string;
  /** Done: the saved details, e.g. "Ama Mensah · +233 24 412 7781 · ama@…". */
  detail?: ReactNode;
  /** Shorter detail for mobile. */
  compactDetail?: ReactNode;
  /** Green line under the detail, e.g. "Standard · arrives tomorrow · Free". */
  meta?: ReactNode;
  /** Shorter meta for mobile. */
  compactMeta?: ReactNode;
  /** Before the detail, e.g. an MTN badge. */
  leading?: ReactNode;
  /** Pending: hint on the right, e.g. "MoMo, card or pay on delivery". */
  hint?: string;
  editHref?: string;
  linkAs?: LinkComponent;
}

export function StepCard({
  status,
  number,
  title,
  detail,
  compactDetail,
  meta,
  compactMeta,
  leading,
  hint,
  editHref,
  linkAs: Link = "a",
  className,
  ...props
}: StepCardProps) {
  if (status === "pending") {
    return (
      <div
        data-slot="step-card"
        data-status="pending"
        className={cn("hidden items-center gap-4 rounded-lg border border-border-subtle bg-bg px-6 py-5 font-sans md:flex", className)}
        {...props}
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-sm leading-xs font-semibold text-text-muted">
          {number}
        </span>
        <h2 className="flex-1 text-lg leading-base font-semibold text-text-muted">{title}</h2>
        {hint && <p className="text-sm leading-xs text-text-muted">{hint}</p>}
      </div>
    );
  }

  const edit = editHref && (
    <TextLink asChild className="text-sm leading-xs md:leading-lg">
      <Link href={editHref} aria-label={`Edit ${title.toLowerCase()}`}>
        Edit
      </Link>
    </TextLink>
  );

  return (
    <div
      data-slot="step-card"
      data-status="done"
      className={cn(
        "flex items-start gap-3 rounded-md border border-border-subtle bg-bg p-4 font-sans md:gap-4 md:rounded-lg md:px-6 md:py-5",
        className,
      )}
      {...props}
    >
      <span className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-brand text-text-inverse md:size-7">
        <Icon name="check" size={14} strokeWidth={3} className="size-2.75 md:size-3.5" label="Done" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 md:gap-1">
        <h2 className="text-xs leading-xs font-semibold -tracking-numeral text-text-muted uppercase md:text-lg md:leading-base md:font-semibold md:tracking-normal md:text-text md:normal-case">
          {title}
        </h2>
        {detail && (
          <div className="flex items-center gap-2 text-sm leading-sm text-text md:text-base md:text-text-secondary">
            {leading && <span className="hidden md:inline-flex">{leading}</span>}
            {compactDetail ? (
              <>
                <span className="md:hidden">{compactDetail}</span>
                <span className="hidden md:inline">{detail}</span>
              </>
            ) : (
              <span>{detail}</span>
            )}
          </div>
        )}
        {meta && (
          <p className="text-xs leading-xs font-semibold text-brand md:text-sm">
            {compactMeta ? (
              <>
                <span className="md:hidden">{compactMeta}</span>
                <span className="hidden md:inline">{meta}</span>
              </>
            ) : (
              meta
            )}
          </p>
        )}
      </div>
      {edit}
    </div>
  );
}
