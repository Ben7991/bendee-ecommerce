import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * AdminPageHeader (organism): the top of an admin page: a small context line, the title with an
 * optional serif-italic word ("Good morning, *Abena*") and the page actions. Actions sit under
 * the title on mobile and tablet, to its right from 1440px.
 */
export interface AdminPageHeaderProps extends Omit<ComponentProps<"div">, "title"> {
  /** "Sunday, 15 November · Accra". */
  eyebrow?: ReactNode;
  title: string;
  /** Set in Instrument Serif italic after the title. One per view. */
  highlight?: string;
  actions?: ReactNode;
}

export function AdminPageHeader({ eyebrow, title, highlight, actions, className, ...props }: AdminPageHeaderProps) {
  return (
    <div
      data-slot="admin-page-header"
      className={cn("flex flex-col gap-4.5 font-sans xl:flex-row xl:items-end xl:justify-between xl:gap-6", className)}
      {...props}
    >
      <div className="flex flex-col gap-1.5">
        {eyebrow && <p className="text-sm leading-sm font-medium text-text-muted">{eyebrow}</p>}
        <h1 className="text-28 leading-3xl font-semibold tracking-tight text-text xl:text-36 xl:leading-10.5">
          {title}
          {highlight && (
            <>
              {" "}
              <em className="font-serif font-regular tracking-subtle italic">{highlight}</em>
            </>
          )}
        </h1>
      </div>
      {actions && <div className="flex items-center justify-between gap-2.5">{actions}</div>}
    </div>
  );
}
