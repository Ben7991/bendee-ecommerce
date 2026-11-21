import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * AdminPageHeader (organism): the top of an admin page: an optional context line, the title
 * with an optional serif-italic word ("Good morning, *Abena*"), a line under it ("1,284 orders ·
 * **25 need action today**") and the page actions.
 * - `stacked` (dashboard): actions under the title until 1440px, to its right from there.
 * - `inline` (list pages): actions always to the right; pass compact (icon-only) actions for mobile.
 */
export interface AdminPageHeaderProps extends Omit<ComponentProps<"div">, "title"> {
  /** "Sunday, 15 November · Accra". */
  eyebrow?: ReactNode;
  title: string;
  /** Set in Instrument Serif italic after the title. One per view. */
  highlight?: string;
  /** Under the title. */
  description?: ReactNode;
  actions?: ReactNode;
  layout?: "stacked" | "inline";
}

export function AdminPageHeader({
  eyebrow,
  title,
  highlight,
  description,
  actions,
  layout = "stacked",
  className,
  ...props
}: AdminPageHeaderProps) {
  const inline = layout === "inline";
  return (
    <div
      data-slot="admin-page-header"
      className={cn(
        "flex font-sans",
        inline ? "items-center justify-between gap-4 md:items-end md:gap-6" : "flex-col gap-4.5 xl:flex-row xl:items-end xl:justify-between xl:gap-6",
        className,
      )}
      {...props}
    >
      <div className={cn("flex min-w-0 flex-col", inline ? "gap-0.5 md:gap-1.5" : "gap-1.5")}>
        {eyebrow && <p className="text-sm leading-sm font-medium text-text-muted">{eyebrow}</p>}
        <h1
          className={cn(
            "text-28 leading-3xl font-semibold tracking-tight text-text xl:text-36 xl:leading-10.5",
            inline && "md:text-3xl md:leading-9.5",
          )}
        >
          {title}
          {highlight && (
            <>
              {" "}
              <em className="font-serif font-regular tracking-subtle italic">{highlight}</em>
            </>
          )}
        </h1>
        {description && <p className="text-sm leading-4.5 text-text-muted md:text-14 md:leading-sm">{description}</p>}
      </div>
      {actions && <div className={cn("flex items-center gap-2.5", inline ? "shrink-0" : "justify-between")}>{actions}</div>}
    </div>
  );
}
