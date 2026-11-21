"use client";

import { useId, useRef, useState, type ComponentProps } from "react";

import { cn, useAutosave, type LinkComponent } from "../../../lib";
import { Icon, Switch } from "../../atoms";

export interface ContentPageLink {
  slug: string;
  title: string;
  /** Pills on tablet and mobile: "About", "Privacy". */
  shortTitle: string;
  /** "/pages/about · edited 2 Oct". */
  note: string;
  /** Has unpublished edits. */
  draft?: boolean;
}

export interface ContentPageDraft {
  title: string;
  /** The part after /pages/. */
  address: string;
  /** Body HTML. */
  body: string;
  visible: boolean;
  seoTitle: string;
  seoDescription: string;
}

/**
 * PageEditor (organism): the store's info pages (Paper Jofak - Admin → Page editor): the page
 * list (a column from 1440px, pills below), title and web address, a body editor with heading,
 * bold, italic, list, link, table and Q&A tools, whether it shows on the store, and how it looks
 * in search (Edit opens the SEO fields). Edits save as drafts on their own (`onSave` with JSON);
 * publishing is the page's job. Mobile folds the address and SEO into one row.
 */
export interface PageEditorProps extends Omit<ComponentProps<"div">, "defaultValue"> {
  linkAs?: LinkComponent;
  pages: ContentPageLink[];
  currentSlug: string;
  pageHref: (slug: string) => string;
  defaultValue: ContentPageDraft;
  /** "Live version from 2 Oct stays up until you publish. Linked from the footer menu and checkout." */
  liveNote: string;
  /** "Check before publishing" box. */
  warning?: { title: string; text: string };
  onSave: (draft: string) => void | Promise<void>;
  /** "+ New page" (a form action). */
  newPageAction?: () => void | Promise<void>;
  domain?: string;
}

const INPUT = "flex h-11 items-center rounded-sm border border-border bg-bg px-3 focus-within:border-primary dark:bg-surface";
const LABEL = "text-sm leading-4.5 font-semibold text-text-secondary";
const TOOL = "rounded-6 px-1 py-0.5 text-sm leading-xs font-semibold text-text hover:bg-bg";

const TABLE = `<table><thead><tr><th>Area</th><th>Arrives</th><th>Fee</th></tr></thead><tbody><tr><td>Greater Accra</td><td>Next day</td><td>GHS 25</td></tr></tbody></table><p></p>`;
const QA = `<details open><summary>Question</summary><p>Answer</p></details><p></p>`;

interface Tool {
  label: string;
  title: string;
  command: string;
  value?: string;
  className?: string;
}

const TOOLS: Tool[] = [
  { label: "Heading ▾", title: "Heading", command: "formatBlock", value: "h2" },
  { label: "B", title: "Bold", command: "bold", className: "font-bold text-14" },
  { label: "I", title: "Italic", command: "italic", className: "font-serif text-md font-regular italic" },
  { label: "• List", title: "Bulleted list", command: "insertUnorderedList" },
  { label: "Link", title: "Link", command: "createLink" },
  { label: "Table", title: "Insert table", command: "insertHTML", value: TABLE },
  { label: "Q&A", title: "Insert question and answer", command: "insertHTML", value: QA },
];

export function PageEditor({
  linkAs: LinkAs = "a",
  pages,
  currentSlug,
  pageHref,
  defaultValue,
  liveNote,
  warning,
  onSave,
  newPageAction,
  domain = "jofak.com",
  className,
  ...props
}: PageEditorProps) {
  const id = useId();
  const [page, setPage] = useState(defaultValue);
  const [seoOpen, setSeoOpen] = useState(false);
  const body = useRef<HTMLDivElement>(null);

  const status = useAutosave(page, onSave);

  const set = <K extends keyof ContentPageDraft>(key: K, value: ContentPageDraft[K]) => setPage((current) => ({ ...current, [key]: value }));
  const readBody = () => body.current && set("body", body.current.innerHTML);
  const run = (command: string, value?: string) => {
    body.current?.focus();
    document.execCommand(command, false, value);
    readBody();
  };
  const apply = (tool: Tool) => {
    if (tool.command === "createLink") {
      const url = window.prompt("Link to (e.g. /pages/returns or https://…)");
      if (url) run("createLink", url);
      return;
    }
    run(tool.command, tool.value);
  };
  const saving = status === "saving" ? "Saving draft…" : status === "saved" ? "Saved as draft" : undefined;

  const address = (inputId?: string) => (
    <div className={INPUT}>
      <span className="text-14 leading-4.5 text-text-muted">/pages/</span>
      <input
        id={inputId}
        aria-label={inputId ? undefined : "Web address"}
        value={page.address}
        onChange={(event) => set("address", event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
        className="min-w-0 flex-1 bg-transparent text-14 leading-4.5 font-medium text-text outline-none"
      />
    </div>
  );
  const seoFields = (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1 text-xs leading-xs font-semibold text-text-secondary">
        Search title
        <input value={page.seoTitle} onChange={(event) => set("seoTitle", event.target.value)} className="h-9.5 rounded-sm border border-border bg-bg px-2.5 text-sm text-text outline-none focus:border-primary dark:bg-surface" />
      </label>
      <label className="flex flex-col gap-1 text-xs leading-xs font-semibold text-text-secondary">
        Search description
        <textarea
          rows={3}
          value={page.seoDescription}
          onChange={(event) => set("seoDescription", event.target.value)}
          className="resize-y rounded-sm border border-border bg-bg px-2.5 py-2 text-sm text-text outline-none focus:border-primary dark:bg-surface"
        />
      </label>
    </div>
  );
  const visibleSwitch = <Switch size="field" checked={page.visible} onCheckedChange={(visible) => set("visible", visible)} aria-label="Visible on store" className="data-[state=checked]:bg-primary" />;

  return (
    <div data-slot="page-editor" className={cn("flex flex-col gap-3.5 font-sans md:gap-4 xl:flex-row xl:items-start xl:gap-5", className)} {...props}>
      {/* Pages: column from 1440px, pills below. */}
      <nav aria-label="Pages" className="hidden w-70 shrink-0 flex-col overflow-clip rounded-lg border border-border-subtle xl:flex">
        <div className="flex items-center justify-between px-4 py-3.5">
          <h2 className="text-base leading-5 font-semibold text-text">Pages</h2>
          {newPageAction && (
            <form action={newPageAction}>
              <button type="submit" className="text-sm leading-4.5 font-semibold text-brand hover:underline">
                + New page
              </button>
            </form>
          )}
        </div>
        <ul>
          {pages.map((item) => {
            const active = item.slug === currentSlug;
            return (
              <li key={item.slug} className="border-t border-border-subtle">
                <LinkAs
                  href={pageHref(item.slug)}
                  aria-current={active ? "page" : undefined}
                  className={cn("flex flex-col gap-0.5 px-4 py-3", active ? "border-l-3 border-l-brand bg-sage-50 pl-3.25" : "hover:bg-surface-subtle")}
                >
                  <span className="flex items-center gap-1.5 text-14 leading-5 font-semibold text-text">
                    {item.title}
                    {item.draft && <span className="rounded-full bg-tint-sun px-1.5 text-11 leading-4 font-semibold text-warning-text">Draft changes</span>}
                  </span>
                  <span className="text-xs leading-xs text-text-muted">{active ? `/pages/${page.address} · editing now` : item.note}</span>
                </LinkAs>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav aria-label="Pages" className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-none md:mx-0 md:flex-wrap md:px-0 xl:hidden">
        {pages.map((item) => {
          const active = item.slug === currentSlug;
          return (
            <LinkAs
              key={item.slug}
              href={pageHref(item.slug)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-sm leading-4 whitespace-nowrap",
                active ? "bg-primary font-semibold text-on-primary" : "border border-border px-3.25 py-1.75 font-medium text-text hover:bg-surface-subtle",
              )}
            >
              {item.shortTitle}
              {item.draft && " •"}
            </LinkAs>
          );
        })}
        {newPageAction && (
          <form action={newPageAction} className="hidden shrink-0 md:block">
            <button type="submit" className="px-2 py-2 text-sm leading-4 font-semibold text-brand hover:underline">
              + New page
            </button>
          </form>
        )}
      </nav>

      {/* Editor. */}
      <section aria-label="Page content" className="flex min-w-0 flex-1 flex-col gap-3.5 rounded-18 border border-border-subtle p-4 md:rounded-lg md:px-6 md:py-5.5">
        <div className="flex gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <label htmlFor={`${id}-title`} className={LABEL}>
              Title
            </label>
            <div className={INPUT}>
              <input id={`${id}-title`} value={page.title} onChange={(event) => set("title", event.target.value)} className="min-w-0 flex-1 bg-transparent text-base leading-5 font-medium text-text outline-none" />
            </div>
          </div>
          <div className="hidden w-55 shrink-0 flex-col gap-1.5 md:flex">
            <label htmlFor={`${id}-address`} className={LABEL}>
              Web address
            </label>
            {address(`${id}-address`)}
          </div>
        </div>
        <div className="flex flex-col overflow-clip rounded-14 border border-border">
          <div role="toolbar" aria-label="Formatting" className="flex items-center gap-3 border-b border-border-subtle bg-surface-subtle px-3.5 py-2">
            {TOOLS.map((tool) => (
              <button
                key={tool.title}
                type="button"
                title={tool.title}
                aria-label={tool.title}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => apply(tool)}
                className={cn(TOOL, tool.className, tool.title === "Insert question and answer" && "hidden md:inline")}
              >
                {tool.label === "Heading ▾" ? (
                  <>
                    <span className="md:hidden">Aa ▾</span>
                    <span className="hidden md:inline">Heading ▾</span>
                  </>
                ) : tool.label === "• List" ? (
                  <>
                    <span className="md:hidden">List</span>
                    <span className="hidden md:inline">• List</span>
                  </>
                ) : (
                  tool.label
                )}
              </button>
            ))}
          </div>
          <div
            ref={body}
            role="textbox"
            aria-multiline
            aria-label="Page body"
            contentEditable
            suppressContentEditableWarning
            onInput={readBody}
            onBlur={readBody}
            className="rich-text px-3.5 py-3.5 md:px-5 md:py-4.5"
            dangerouslySetInnerHTML={{ __html: defaultValue.body }}
          />
        </div>
        <p aria-live="polite" className="text-xs leading-xs text-text-muted">
          {saving ?? "Edits save as a draft; shoppers see them when you publish."}
        </p>
      </section>

      {/* Status, search and checks. */}
      <div className="flex flex-col gap-3.5 md:grid md:grid-cols-2 md:items-start md:gap-4 xl:flex xl:w-75 xl:shrink-0">
        <section aria-label="Status" className="hidden flex-col gap-3 rounded-lg border border-border-subtle p-5 md:flex">
          <h2 className="text-xs leading-xs font-semibold tracking-overline text-text-muted uppercase">Status</h2>
          <div className="flex items-center justify-between gap-3">
            <p className="text-14 leading-5 font-semibold text-text">Visible on store</p>
            {visibleSwitch}
          </div>
          <p className="text-xs leading-4.25 text-text-muted">{page.visible ? liveNote : "Hidden: the address shows “Page not found” once you publish."}</p>
        </section>
        <section aria-label="Search preview" className="hidden flex-col gap-2.5 rounded-lg border border-border-subtle p-5 md:flex">
          <div className="flex justify-between gap-3">
            <h2 className="text-xs leading-xs font-semibold tracking-overline text-text-muted uppercase">Search preview</h2>
            <button type="button" aria-expanded={seoOpen} onClick={() => setSeoOpen(!seoOpen)} className="text-sm leading-xs font-semibold text-brand hover:underline">
              {seoOpen ? "Done" : "Edit"}
            </button>
          </div>
          <div className="flex flex-col gap-0.75 rounded-sm bg-surface-subtle p-3">
            <p className="text-11 leading-3.5 text-text-muted">
              {domain} › pages › {page.address}
            </p>
            <p className="text-14 leading-4.75 font-semibold text-info">{page.seoTitle || page.title}</p>
            <p className="text-xs leading-xs text-text-secondary">{page.seoDescription}</p>
          </div>
          {seoOpen && seoFields}
        </section>
        {warning && (
          <aside className="hidden flex-col gap-2 rounded-md bg-tint-sun px-4.5 py-4 md:col-span-2 md:flex xl:col-span-1">
            <p className="text-sm leading-4.5 font-semibold text-text">{warning.title}</p>
            <p className="text-xs leading-4.25 text-warning-text">{warning.text}</p>
          </aside>
        )}

        {/* Mobile: status and address rows. */}
        <ul className="order-first flex flex-col overflow-clip rounded-18 border border-border-subtle md:hidden">
          <li className="flex items-center gap-3 px-4 py-3.5">
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-14 leading-5 font-semibold text-text">Visible on store</span>
              <span className="text-xs leading-xs text-text-muted">Live version stays until you publish</span>
            </span>
            {visibleSwitch}
          </li>
          <li className="border-t border-border-subtle">
            <button type="button" aria-expanded={seoOpen} onClick={() => setSeoOpen(!seoOpen)} className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-xs leading-xs text-text-muted">Web address &amp; SEO</span>
                <span className="text-14 leading-5 font-semibold text-text">/pages/{page.address}</span>
              </span>
              <Icon name={seoOpen ? "chevronDown" : "chevronRight"} size={14} strokeWidth={1.6} className="shrink-0 text-text-muted" />
            </button>
            {seoOpen && (
              <div className="flex flex-col gap-2 px-4 pb-4">
                <div className="flex flex-col gap-1 text-xs leading-xs font-semibold text-text-secondary">
                  Web address
                  {address()}
                </div>
                {seoFields}
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
