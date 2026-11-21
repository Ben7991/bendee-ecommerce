"use client";

import { useId, useState, type ComponentProps } from "react";

import { cn } from "../../../lib";
import { AdminCard } from "../../molecules";

/**
 * ProductSeoCard (organism): how the product shows in search results and shares (Paper Jofak -
 * Admin → Product editor → Search and sharing). A live preview above the page title (60
 * characters), URL and description (160); counters turn red past the limit. Posts `seoTitle`,
 * `slug` and `seoDescription`.
 */
export interface ProductSeoCardProps extends Omit<ComponentProps<"section">, "children" | "title"> {
  title: string;
  slug: string;
  description: string;
  /** "jofak.com". */
  domain?: string;
  /** Appended in the preview: " | Jofak Ghana". */
  titleSuffix?: string;
}

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;

export function ProductSeoCard({ title: initialTitle, slug: initialSlug, description: initialDescription, domain = "jofak.com", titleSuffix = " | Jofak Ghana", ...props }: ProductSeoCardProps) {
  const id = useId();
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [description, setDescription] = useState(initialDescription);
  const label = "text-sm leading-4.5 font-semibold text-text";
  const field = "rounded-sm border border-border bg-bg px-3 text-14 leading-4.5 text-text outline-none focus-within:border-brand focus:border-brand";
  const counter = (length: number, limit: number) => (
    <span className={cn("text-sm leading-4.5 font-semibold", length > limit ? "text-error" : "text-brand")}>
      {length} / {limit}
    </span>
  );

  return (
    <AdminCard data-slot="product-seo-card" title="Search and sharing" {...props}>
      <div aria-label="Search result preview" className="flex flex-col gap-0.5 rounded-14 bg-surface-subtle px-4 py-3.5">
        <p className="text-xs leading-xs text-text-secondary">
          {domain} › products › {slug}
        </p>
        <p className="text-lg leading-base text-info">
          {title}
          {titleSuffix}
        </p>
        <p className="text-sm leading-4.5 text-text-secondary">{description}</p>
      </div>
      <div className="flex flex-col gap-3.5 md:flex-row">
        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="flex justify-between">
            <label htmlFor={`${id}-title`} className={label}>
              Page title
            </label>
            {counter(title.length + titleSuffix.length, TITLE_LIMIT)}
          </span>
          <input id={`${id}-title`} name="seoTitle" value={title} onChange={(event) => setTitle(event.target.value)} className={cn(field, "h-10")} />
        </span>
        <span className="flex flex-col gap-1.5 md:w-60 md:shrink-0">
          <label htmlFor={`${id}-slug`} className={label}>
            URL
          </label>
          <span className={cn(field, "flex h-10 items-center")}>
            <span className="text-text-muted">/products/</span>
            <input id={`${id}-slug`} name="slug" value={slug} onChange={(event) => setSlug(event.target.value)} className="min-w-0 flex-1 bg-transparent outline-none" />
          </span>
        </span>
      </div>
      <span className="flex flex-col gap-1.5">
        <span className="flex justify-between">
          <label htmlFor={`${id}-description`} className={label}>
            Description
          </label>
          {counter(description.length, DESCRIPTION_LIMIT)}
        </span>
        <textarea
          id={`${id}-description`}
          name="seoDescription"
          rows={2}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={cn(field, "field-sizing-content min-h-14 resize-none py-2.5 leading-sm")}
        />
      </span>
    </AdminCard>
  );
}
