import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * ContentLayout (template): the skeleton of a content page (About, FAQ, policies, Contact).
 *   mobile and tablet: hero, the ContentNav pills, then the article
 *   desktop:           hero, then a 240px sticky sidebar and a 680px article
 * Use inside StorefrontShell (framed="page").
 */
export interface ContentLayoutProps extends ComponentProps<"div"> {
  /** ContentHero. */
  hero: ReactNode;
  /** ContentNav. */
  nav: ReactNode;
  /** Classes for the article column, e.g. a tighter gap for policy clauses. */
  articleClassName?: string;
}

export function ContentLayout({ hero, nav, articleClassName, className, children, ...props }: ContentLayoutProps) {
  return (
    <div data-slot="content-layout" className={cn("flex flex-col", className)} {...props}>
      {hero}
      <div className="flex flex-col gap-7 px-5 pt-5 pb-12 md:gap-8 md:px-7 md:pt-6 md:pb-16 xl:flex-row xl:items-start xl:gap-24 xl:px-14 xl:pt-12 xl:pb-24">
        <div className="xl:sticky xl:top-6 xl:w-60 xl:shrink-0">{nav}</div>
        <article className={cn("flex min-w-0 flex-col gap-8 md:gap-10 xl:w-170 xl:shrink-0", articleClassName)}>{children}</article>
      </div>
    </div>
  );
}
