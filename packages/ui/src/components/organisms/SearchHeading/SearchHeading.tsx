import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * SearchHeading (organism): the top of the search page (Paper Search → Search Header): the search
 * field, "8 results for “stress”" (or "No results for …"), a line under it and related links.
 *   mobile:  one sage gradient behind the header, field, heading and related chips
 *   tablet+: everything on white under the header
 */
export interface SearchHeadingProps extends Omit<ComponentProps<"section">, "title"> {
  /** The site header (StorefrontHeader). */
  header?: ReactNode;
  /** SearchField. */
  search: ReactNode;
  /** Wrap the query in <em>, e.g. 8 results for <em>“stress”</em>. */
  title: ReactNode;
  /** "Matching product names…" or "Did you mean <a>…</a>?". */
  description?: ReactNode;
  /** RelatedLinks. */
  related?: ReactNode;
}

export function SearchHeading({ header, search, title, description, related, className, ...props }: SearchHeadingProps) {
  return (
    <section
      data-slot="search-heading"
      aria-labelledby="search-heading-title"
      className={cn("flex flex-col gap-5 rounded-b-2xl bg-gradient-hero pb-6 md:gap-0 md:rounded-none md:bg-none md:pb-0", className)}
      {...props}
    >
      {header}
      <div className="flex flex-col gap-5 md:gap-6 md:px-8 md:pt-6 md:pb-2 xl:px-14 xl:pt-10">
        <div className="mx-5 md:mx-0">{search}</div>
        <div className="flex flex-col gap-1 px-5 md:gap-1.5 md:px-0">
          <h1
            id="search-heading-title"
            className="font-sans text-3xl leading-3xl font-medium tracking-tight text-text md:text-4xl md:leading-4xl [&_em]:font-serif [&_em]:font-regular [&_em]:text-brand [&_em]:italic"
          >
            {title}
          </h1>
          {description && (
            <p className="font-sans text-sm leading-sm text-text-secondary md:text-base [&_a]:font-semibold [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2">
              {description}
            </p>
          )}
        </div>
        {related && <div className="pl-5 md:pl-0">{related}</div>}
      </div>
    </section>
  );
}
