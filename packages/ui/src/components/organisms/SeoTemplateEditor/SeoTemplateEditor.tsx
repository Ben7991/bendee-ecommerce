"use client";

import { useId, useRef, useState, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * SeoTemplateEditor (organism): how pages without their own title appear in search and when
 * shared (Paper Jofak - Admin → Settings → SEO defaults): a tab per page type (links; a menu on
 * mobile), the page title template with details inserted at the cursor, where the description
 * and share image come from, and a Google and WhatsApp preview filled from a sample. Fields
 * submit `title`, `description`, `image`.
 */
export interface SeoTemplateEditorProps extends Omit<ComponentProps<"section">, "defaultValue"> {
  linkAs?: LinkComponent;
  tabs: { label: string; href: string; active?: boolean }[];
  defaultValue: { title: string; description: string; image: string };
  tokens: string[];
  descriptionOptions: { value: string; label: string }[];
  imageOptions: { value: string; label: string }[];
  sample: {
    values: Record<string, string>;
    path: string;
    description: string;
    /** What the share image shows: a label ("Product photo · 1200 × 630") or a node (a logo tile). */
    image: ReactNode;
    imageTone?: "sage" | "lavender" | "sun" | "brand";
    /** WhatsApp card title; defaults to the filled title without " | Jofak". */
    shareTitle?: string;
    price?: string;
  };
  /** Small print under the description select. */
  descriptionHint?: ReactNode;
  /** Extra settings under the fields (a toggle, hidden pages). */
  extra?: ReactNode;
  /** "41 of 48 products use this template…". */
  note?: string;
  domain?: string;
}

const IMAGE_TONE = {
  sage: "bg-sage-200 text-text-secondary",
  lavender: "bg-tint-lavender text-lavender-text",
  sun: "bg-tint-sun text-warning-text",
  brand: "bg-primary text-on-primary",
} as const;

const fill = (text: string, values: Record<string, string>) => text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);

export function SeoTemplateEditor({
  linkAs: LinkAs = "a",
  tabs,
  defaultValue,
  tokens,
  descriptionOptions,
  imageOptions,
  sample,
  descriptionHint,
  extra,
  note,
  domain = "jofak.com",
  className,
  ...props
}: SeoTemplateEditorProps) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(defaultValue.title);
  const filled = fill(title, sample.values);
  const active = tabs.find((tab) => tab.active) ?? tabs[0];
  const select = "h-11 w-full cursor-pointer appearance-none rounded-sm border border-border bg-bg px-3.5 pr-9 text-14 leading-5 text-text outline-none focus:border-primary dark:bg-surface";

  const insert = (token: string) => {
    const element = input.current;
    const text = `{${token}}`;
    const start = element?.selectionStart ?? title.length;
    const end = element?.selectionEnd ?? title.length;
    setTitle(`${title.slice(0, start)}${text}${title.slice(end)}`);
    requestAnimationFrame(() => {
      element?.focus();
      element?.setSelectionRange(start + text.length, start + text.length);
      element?.dispatchEvent(new Event("input", { bubbles: true }));
    });
  };

  return (
    <section data-slot="seo-template-editor" className={cn("flex min-w-0 flex-col gap-3.5 rounded-18 border border-border-subtle p-4 font-sans md:gap-4 md:rounded-lg md:px-6 md:py-5.5", className)} {...props}>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-base leading-5 font-semibold tracking-compact text-text md:text-17 md:leading-6">How pages appear in Google</h2>
        <p className="text-xs leading-xs text-text-muted md:text-sm md:leading-4.5">
          <span className="md:hidden">When a page has no title of its own</span>
          <span className="hidden md:inline">Used when a page has no title or description of its own</span>
        </p>
      </div>
      <nav aria-label="Page type" className="hidden w-fit gap-0.5 rounded-full bg-surface-subtle p-0.75 md:flex">
        {tabs.map((tab) => (
          <LinkAs
            key={tab.href}
            href={tab.href}
            aria-current={tab === active ? "page" : undefined}
            className={cn("rounded-full px-3.5 py-1.75 text-sm leading-4", tab === active ? "bg-primary font-semibold text-on-primary" : "font-medium text-text-secondary hover:text-text")}
          >
            {tab.label}
          </LinkAs>
        ))}
      </nav>
      <details className="group relative md:hidden">
        <summary className="flex h-11 cursor-pointer list-none items-center justify-between rounded-sm border border-border px-3.5 text-14 leading-5 font-semibold text-text">
          {active?.label}
          <Icon name="chevronDown" size={10} strokeWidth={1.4} className="text-text-muted" />
        </summary>
        <div className="absolute inset-x-0 z-10 mt-1 flex flex-col rounded-sm border border-border-subtle bg-bg p-1 shadow-chip dark:bg-surface">
          {tabs.map((tab) => (
            <LinkAs key={tab.href} href={tab.href} className={cn("rounded-8 px-3 py-2 text-sm leading-4.5", tab === active ? "bg-surface-subtle font-semibold text-text" : "text-text-secondary")}>
              {tab.label}
            </LinkAs>
          ))}
        </div>
      </details>

      <div className="flex flex-col gap-3.5 xl:flex-row xl:items-start xl:gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-3.5 md:gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="flex justify-between gap-3">
              <label htmlFor={`${id}-title`} className="text-sm leading-4.5 font-semibold text-text-secondary">
                Page title
              </label>
              <span className={cn("hidden text-xs leading-xs md:inline", filled.length > 60 ? "font-semibold text-warning-text" : "text-text-muted")}>
                {filled.length > 60 ? (
                  `${filled.length} characters · over 60`
                ) : (
                  <>
                    <span className="xl:hidden">Under 60 characters</span>
                    <span className="hidden xl:inline">Keep under 60 characters</span>
                  </>
                )}
              </span>
            </span>
            <input
              id={`${id}-title`}
              ref={input}
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="h-11 rounded-sm border-field border-primary bg-bg px-3.5 font-mono text-sm leading-4.5 text-text outline-none dark:bg-surface"
            />
            <div className="hidden flex-wrap gap-1.5 xl:flex">
              {tokens.map((token) => (
                <button key={token} type="button" onClick={() => insert(token)} className="rounded-6 border border-border-subtle px-2 py-0.5 font-mono text-11 leading-4 text-text-secondary hover:bg-surface-subtle">
                  {`{${token}}`}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3.5 md:grid md:grid-cols-2 md:gap-3 xl:flex xl:gap-4">
          <label className="flex flex-col gap-1.5 text-sm leading-4.5 font-semibold text-text-secondary">
            Description
            <span className="relative flex">
              <select name="description" defaultValue={defaultValue.description} className={cn(select, "font-regular")}>
                {descriptionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={10} strokeWidth={1.4} className="pointer-events-none absolute top-4.5 right-3.5 text-text-muted" />
            </span>
            {descriptionHint && <span className="hidden text-xs leading-xs font-regular text-text-muted xl:block">{descriptionHint}</span>}
          </label>
          <label className="hidden flex-col gap-1.5 text-sm leading-4.5 font-semibold text-text-secondary md:flex">
            Share image
            <span className="relative flex">
              <select name="image" defaultValue={defaultValue.image} className={cn(select, "font-regular")}>
                {imageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={10} strokeWidth={1.4} className="pointer-events-none absolute top-4.5 right-3.5 text-text-muted" />
            </span>
          </label>
          </div>
          {extra && <div className="hidden xl:block">{extra}</div>}
        </div>

        <div className="flex flex-col gap-3.5 rounded-14 bg-surface-subtle p-3 md:p-4 xl:w-82.5 xl:shrink-0">
          <p className="hidden text-11 leading-3.5 font-semibold tracking-overline text-text-muted uppercase md:block">Google preview</p>
          <div className="flex flex-col gap-0.5 xl:rounded-sm xl:bg-bg xl:p-3.5 dark:xl:bg-surface">
            <p className="text-11 leading-3.5 text-text-muted md:text-xs md:leading-xs">
              {domain} › {sample.path}
            </p>
            <p className="text-base leading-5.5 text-info md:text-17">{filled}</p>
            <p className="line-clamp-2 text-xs leading-4.25 text-text-secondary md:text-sm md:leading-4.75 xl:line-clamp-4">{sample.description}</p>
          </div>
          <p className="hidden text-11 leading-3.5 font-semibold tracking-overline text-text-muted uppercase xl:block">WhatsApp share</p>
          <div className="hidden flex-col overflow-clip rounded-sm bg-bg xl:flex dark:bg-surface">
            <span className={cn("flex h-27 items-center justify-center text-xs leading-xs font-semibold", IMAGE_TONE[sample.imageTone ?? "sage"])}>{sample.image}</span>
            <span className="flex flex-col px-3 py-2.5">
              <span className="text-sm leading-4.5 font-semibold text-text">{sample.shareTitle ?? fill(title.replace(/\s*\|.*$/, ""), sample.values)}</span>
              <span className="text-xs leading-xs text-text-muted">
                {domain}
                {sample.price && ` · ${sample.price}`}
              </span>
            </span>
          </div>
        </div>
      </div>
      {note && <p className="hidden rounded-sm bg-surface-subtle px-3 py-2.5 text-xs leading-xs text-text-secondary xl:block">{note}</p>}
    </section>
  );
}
