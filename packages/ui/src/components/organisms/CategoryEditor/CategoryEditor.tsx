"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useId, useState, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, Switch } from "../../atoms";

export interface CategoryEditorValue {
  name: string;
  slug: string;
  parent: string;
  description?: string;
  active: boolean;
}

/**
 * CategoryEditor (organism): edit one category (Paper Jofak - Admin → Categories → details):
 * active switch, name, slug, parent, description, banner and SEO, with Save and Add subcategory,
 * plus an optional note on why it can't be deleted. A card beside the tree from 1440px (under
 * it on tablet); `presentation="sheet"` is the mobile bottom sheet, where the parent and the
 * rest fold into rows. Posts `name`, `slug`, `parent`, `description` and `active` to `action`.
 */
export interface CategoryEditorProps extends Omit<ComponentProps<"section">, "children" | "defaultValue"> {
  linkAs?: LinkComponent;
  /** "Beauty from within ›". */
  trail?: string;
  defaultValue: CategoryEditorValue;
  parents: { value: string; label: string }[];
  slugPrefix?: string;
  banner?: { image?: ReactNode; uploadName?: string };
  seo?: { title: string; href: string };
  addSubcategoryHref?: string;
  deleteNote?: { title: string; body: ReactNode; action?: { label: string; href: string } };
  action?: string | ((formData: FormData) => void | Promise<void>);
  fields?: Record<string, string>;
  presentation?: "panel" | "sheet";
  /** Sheet only. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const label = "text-sm leading-4.5 font-semibold text-text-secondary";
const field = "h-11 w-full rounded-sm border border-border bg-bg px-3 text-14 leading-4.5 font-medium text-text outline-none focus:border-field focus:border-primary dark:focus:border-brand";

export function CategoryEditor({
  linkAs: LinkAs = "a",
  trail,
  defaultValue,
  parents,
  slugPrefix = "/c/",
  banner,
  seo,
  addSubcategoryHref,
  deleteNote,
  action,
  fields = {},
  presentation = "panel",
  open,
  onOpenChange,
  className,
  ...props
}: CategoryEditorProps) {
  const id = useId();
  const sheet = presentation === "sheet";
  const [showParent, setShowParent] = useState(!sheet);
  const [showMore, setShowMore] = useState(!sheet);
  const parentLabel = parents.find((option) => option.value === defaultValue.parent)?.label ?? "Top level";

  const header = (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-1">
        {trail && <p className="text-xs leading-xs text-text-muted">{trail}</p>}
        {sheet ? (
          <Dialog.Title className="text-22 leading-lg font-semibold tracking-snug text-text">{defaultValue.name}</Dialog.Title>
        ) : (
          <h2 className="text-22 leading-lg font-semibold tracking-snug text-text">{defaultValue.name}</h2>
        )}
      </div>
      <span className="flex items-center gap-2">
        <label htmlFor={`${id}-active`} className="text-sm leading-4.5 font-semibold text-text-secondary">
          Active
        </label>
        <Switch id={`${id}-active`} name="active" size="lg" defaultChecked={defaultValue.active} className="data-[state=checked]:bg-primary" />
      </span>
    </div>
  );

  const row = (title: string, value: string, expanded: boolean, toggle: () => void) => (
    <button type="button" onClick={toggle} aria-expanded={expanded} className="flex w-full items-center gap-2.5 px-3.5 py-3 text-left">
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-xs leading-xs text-text-muted">{title}</span>
        <span className="text-14 leading-sm font-semibold text-text">{value}</span>
      </span>
      <Icon name={expanded ? "chevronDown" : "chevronRight"} size={14} strokeWidth={1.6} className="text-evergreen-300" />
    </button>
  );

  const parentField = (
    <span className="flex min-w-0 flex-1 basis-0 flex-col gap-1.5">
      <label htmlFor={`${id}-parent`} className={label}>
        Parent
      </label>
      <span className="relative">
        <select id={`${id}-parent`} name="parent" defaultValue={defaultValue.parent} className={cn(field, "appearance-none pr-8")}>
          {parents.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size={10} strokeWidth={2} className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-text-muted" />
      </span>
    </span>
  );

  const slugField = (
    <span className="flex min-w-0 flex-1 basis-0 flex-col gap-1.5">
      <label htmlFor={`${id}-slug`} className={label}>
        Slug
      </label>
      <span className={cn(field, "flex items-center focus-within:border-field focus-within:border-primary")}>
        <span className="font-regular text-text-muted">{slugPrefix}</span>
        <input id={`${id}-slug`} name="slug" defaultValue={defaultValue.slug} className="min-w-0 flex-1 bg-transparent outline-none" />
      </span>
    </span>
  );

  const more = (
    <>
      <span className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-description`} className={label}>
          Description
        </label>
        <textarea
          id={`${id}-description`}
          name="description"
          rows={2}
          defaultValue={defaultValue.description}
          className="field-sizing-content min-h-16 resize-none rounded-sm border border-border bg-bg px-3 py-2.5 text-14 leading-sm text-text outline-none focus:border-primary dark:focus:border-brand"
        />
      </span>
      {banner && (
        <div className="flex items-center gap-3">
          <span className="relative flex h-14 w-24 shrink-0 items-end justify-center overflow-hidden rounded-10 bg-tint-amber">{banner.image}</span>
          <span className="flex flex-1 flex-col gap-0.5">
            <span className="text-sm leading-4.5 font-semibold text-text">Banner</span>
            <span className="text-xs leading-xs text-text-muted">Top of the category page</span>
          </span>
          <label className="cursor-pointer text-sm leading-4.5 font-semibold text-brand hover:underline">
            Replace
            <input type="file" name={banner.uploadName ?? "banner"} accept="image/*" className="sr-only" />
          </label>
        </div>
      )}
      {seo && (
        <LinkAs href={seo.href} className="flex items-center justify-between gap-3 rounded-sm bg-surface-subtle px-3.5 py-3 hover:bg-surface">
          <span className="flex flex-col gap-0.5">
            <span className="text-sm leading-4.5 font-semibold text-text">SEO</span>
            <span className="text-xs leading-xs text-text-muted">{seo.title}</span>
          </span>
          <Icon name="chevronRight" size={14} strokeWidth={1.6} className="text-text-muted" />
        </LinkAs>
      )}
    </>
  );

  const form = (
    <form action={action} className="flex flex-col gap-4">
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {header}
      <span className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-name`} className={label}>
          Name
        </label>
        <input id={`${id}-name`} name="name" defaultValue={defaultValue.name} className={cn(field, "text-base leading-sm")} />
      </span>
      {sheet ? (
        <div className="flex flex-col overflow-clip rounded-14 border border-border-subtle">
          {row("Parent", parentLabel, showParent, () => setShowParent(!showParent))}
          {showParent && <div className="flex flex-col gap-4 px-3.5 pb-3.5">{parentField}</div>}
          <div className="border-t border-border-subtle">
            {row("Slug, description, banner, SEO", `${slugPrefix}${defaultValue.slug}`, showMore, () => setShowMore(!showMore))}
          </div>
          {showMore && (
            <div className="flex flex-col gap-4 px-3.5 pb-3.5">
              {slugField}
              {more}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex gap-2.5">
            {slugField}
            {parentField}
          </div>
          {more}
        </>
      )}
      <div className={cn("flex gap-2.5 pt-1", sheet && "flex-row-reverse")}>
        <button type="submit" className="flex h-11 flex-1 items-center justify-center rounded-full bg-primary text-14 leading-4.5 font-semibold text-on-primary hover:bg-primary-hover max-md:h-12 max-md:text-base">
          Save
        </button>
        {addSubcategoryHref && (
          <LinkAs
            href={addSubcategoryHref}
            className="flex h-11 items-center justify-center rounded-full border border-border px-4 text-14 leading-4.5 font-semibold text-text hover:bg-surface-subtle max-md:h-12 max-md:text-base"
          >
            {sheet ? "+ Subcategory" : "Add subcategory"}
          </LinkAs>
        )}
      </div>
    </form>
  );

  const note = deleteNote && (
    <div className="hidden gap-3 rounded-md bg-tint-citrus px-4.5 py-4 xl:flex">
      <Icon name="alertCircle" size={18} className="text-error" />
      <div className="flex flex-col gap-1">
        <p className="text-sm leading-4.5 font-semibold text-text">{deleteNote.title}</p>
        <p className="text-xs leading-4.25 text-text-secondary">{deleteNote.body}</p>
        {deleteNote.action && (
          <LinkAs href={deleteNote.action.href} className="pt-0.5 text-sm leading-4.5 font-semibold text-error hover:underline">
            {deleteNote.action.label}
          </LinkAs>
        )}
      </div>
    </div>
  );

  if (sheet) {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-evergreen-950/45 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65" />
          <Dialog.Content
            data-slot="category-editor"
            aria-describedby={undefined}
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 flex max-h-dvh flex-col overflow-y-auto rounded-t-2xl bg-bg px-4 pt-3 pb-8 font-sans outline-none dark:bg-surface",
              "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
              className,
            )}
          >
            <span aria-hidden className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-sage-200" />
            {form}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <section data-slot="category-editor" aria-label={`Edit ${defaultValue.name}`} className={cn("flex flex-col gap-4 font-sans", className)} {...props}>
      <div className="rounded-lg border border-border-subtle p-5.5">{form}</div>
      {note}
    </section>
  );
}
