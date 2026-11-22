"use client";

import { useId, useState, type ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * CollectionSeoCard (organism): how a collection looks in search results (Paper Jofak - Admin →
 * Collection editor → Search preview): the address, title and description, with Edit SEO to
 * change them (and the slug). The preview follows what you type. Posts `slug`, `seoTitle`,
 * `seoDescription`. From 1440px; on mobile it opens when it is the URL target (the "SEO" row).
 */
export interface CollectionSeoCardProps extends Omit<ComponentProps<"section">, "children" | "defaultValue"> {
  /** "jofak.com". */
  domain: string;
  defaultValue: { slug: string; title: string; description: string };
}

const field =
  "w-full rounded-sm border border-border bg-bg px-3 text-14 leading-4.5 text-text outline-none focus:border-primary dark:bg-surface dark:focus:border-brand";

export function CollectionSeoCard({ domain, defaultValue, className, ...props }: CollectionSeoCardProps) {
  const id = useId();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);

  return (
    <section
      data-slot="collection-seo-card"
      aria-labelledby={`${id}-title`}
      className={cn("hidden scroll-mt-24 flex-col gap-2.5 rounded-lg border border-border-subtle p-5 font-sans target:flex xl:flex", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id={`${id}-title`} className="text-xs leading-xs font-semibold tracking-label text-text-muted uppercase">
          Search preview
        </h2>
        <button type="button" aria-expanded={editing} onClick={() => setEditing(!editing)} className="text-sm leading-4.5 font-semibold text-brand hover:underline">
          {editing ? "Done" : "Edit SEO"}
        </button>
      </div>
      <div className="flex flex-col gap-0.75 rounded-14 bg-surface-subtle p-3.5">
        <p className="truncate text-xs leading-xs text-text-muted">
          {domain} › collections › {value.slug || "…"}
        </p>
        <p className="text-base leading-5 font-semibold text-info">{value.title || "Add a title"}</p>
        <p className="text-xs leading-4.25 text-text-secondary">{value.description || "Add a description shoppers see in search results."}</p>
      </div>
      <div className={cn("flex-col gap-3", editing ? "flex" : "hidden")}>
        <label className="flex flex-col gap-1.5 text-sm leading-4.5 font-semibold text-text-secondary">
          Slug
          <span className={cn(field, "flex h-10.5 items-center gap-0.5 font-regular focus-within:border-primary")}>
            <span className="text-text-muted">/collections/</span>
            <input
              name="slug"
              value={value.slug}
              onChange={(event) => setValue({ ...value, slug: event.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") })}
              className="min-w-0 flex-1 bg-transparent font-medium text-text outline-none"
            />
          </span>
        </label>
        <label className="flex flex-col gap-1.5 text-sm leading-4.5 font-semibold text-text-secondary">
          Title
          <input name="seoTitle" value={value.title} onChange={(event) => setValue({ ...value, title: event.target.value })} className={cn(field, "h-10.5 font-regular")} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm leading-4.5 font-semibold text-text-secondary">
          Description
          <textarea
            name="seoDescription"
            rows={2}
            value={value.description}
            onChange={(event) => setValue({ ...value, description: event.target.value })}
            className={cn(field, "resize-none py-2.5 font-regular field-sizing-content")}
          />
        </label>
      </div>
      {!editing && (
        <>
          <input type="hidden" name="slug" value={value.slug} />
          <input type="hidden" name="seoTitle" value={value.title} />
          <input type="hidden" name="seoDescription" value={value.description} />
        </>
      )}
    </section>
  );
}
