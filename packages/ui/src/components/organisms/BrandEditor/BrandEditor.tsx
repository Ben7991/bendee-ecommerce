"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useId, type ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { BrandMark, type BrandMarkProps } from "../../atoms";

/**
 * BrandEditor (organism): edit one brand (Paper Jofak - Admin → Brands → details): logo with
 * Replace / Remove, name and web address (old addresses redirect), how many products use it,
 * Save, and Delete (only once no products use it). A card beside the table from 1440px (under it
 * on tablet); `presentation="sheet"` is the mobile bottom sheet. Posts `name`, `slug` and a
 * `logo` file to `action`; Remove posts `intent=remove-logo`, Delete `intent=delete`.
 */
export interface BrandEditorProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  name: string;
  slug: string;
  mark: Omit<BrandMarkProps, "size">;
  hasLogo?: boolean;
  count: number;
  productsHref: string;
  addressPrefix?: string;
  action?: string | ((formData: FormData) => void | Promise<void>);
  fields?: Record<string, string>;
  presentation?: "panel" | "sheet";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function BrandEditor({
  linkAs: LinkAs = "a",
  name,
  slug,
  mark,
  hasLogo = true,
  count,
  productsHref,
  addressPrefix = "jofak.com/b/",
  action,
  fields = {},
  presentation = "panel",
  open,
  onOpenChange,
  className,
  ...props
}: BrandEditorProps) {
  const id = useId();
  const sheet = presentation === "sheet";
  const label = "text-sm leading-4.5 font-semibold text-text-secondary";
  const field = "h-11 w-full rounded-sm border border-border bg-bg px-3 text-14 leading-4.5 font-medium text-text outline-none";

  const title = sheet ? (
    <Dialog.Title className="text-xl leading-6.5 font-semibold tracking-snug text-text">{name}</Dialog.Title>
  ) : (
    <h2 className="text-xl leading-6.5 font-semibold tracking-snug text-text">{name}</h2>
  );

  const form = (
    <form action={action} className="flex flex-col gap-4">
      {Object.entries(fields).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      {title}
      <div className="flex items-center gap-3.5">
        <BrandMark {...mark} size="lg" />
        <div className="flex flex-col gap-1">
          <p className="text-sm leading-4.5 font-semibold text-text">Logo</p>
          <p className="text-xs leading-xs text-text-muted">Square PNG or SVG, at least 256 px. Shown on product pages.</p>
          <div className="flex gap-3.5">
            <label className="cursor-pointer text-sm leading-4.5 font-semibold text-brand hover:underline">
              {hasLogo ? "Replace" : "Upload"}
              <input type="file" name="logo" accept="image/png,image/svg+xml" className="sr-only" />
            </label>
            {hasLogo && (
              <button type="submit" name="intent" value="remove-logo" className="text-sm leading-4.5 font-semibold text-text-secondary hover:text-text">
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
      <span className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-name`} className={label}>
          Name
        </label>
        <input id={`${id}-name`} name="name" defaultValue={name} className={cn(field, "text-base leading-sm focus:border-field focus:border-primary dark:focus:border-brand")} />
      </span>
      <span className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-slug`} className={label}>
          Web address
        </label>
        <span className={cn(field, "flex items-center focus-within:border-field focus-within:border-primary dark:focus-within:border-brand")}>
          <span className="font-regular text-text-muted">{addressPrefix}</span>
          <input id={`${id}-slug`} name="slug" defaultValue={slug} aria-describedby={`${id}-slug-hint`} className="min-w-0 flex-1 bg-transparent outline-none" />
        </span>
        <span id={`${id}-slug-hint`} className="text-xs leading-xs text-text-muted">
          Changing it redirects the old address automatically.
        </span>
      </span>
      <p className="flex items-center justify-between gap-3 rounded-sm bg-surface-subtle px-3.5 py-3 text-sm leading-4.5 text-text-secondary">
        <span>
          Used by{" "}
          <strong className="font-semibold text-text">
            {count} {count === 1 ? "product" : "products"}
          </strong>
        </span>
        {count > 0 && (
          <LinkAs href={productsHref} className="font-semibold text-text hover:underline">
            View
          </LinkAs>
        )}
      </p>
      <div className="flex gap-2.5">
        <button type="submit" name="intent" value="save" className="flex h-11 flex-1 items-center justify-center rounded-full bg-primary text-14 leading-4.5 font-semibold text-on-primary hover:bg-primary-hover">
          Save
        </button>
        <button
          type="submit"
          name="intent"
          value="delete"
          disabled={count > 0}
          aria-describedby={count > 0 ? `${id}-delete-hint` : undefined}
          className="flex h-11 items-center justify-center rounded-full border border-border px-4.5 text-14 leading-4.5 font-semibold text-error hover:bg-tint-citrus disabled:text-text-muted disabled:hover:bg-transparent"
        >
          Delete
        </button>
      </div>
      {count > 0 && (
        <p id={`${id}-delete-hint`} className="text-xs leading-4.25 text-text-muted">
          Delete is available once no products use this brand.
        </p>
      )}
    </form>
  );

  if (sheet) {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-evergreen-950/45 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65" />
          <Dialog.Content
            data-slot="brand-editor"
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
    <section data-slot="brand-editor" aria-label={`Edit ${name}`} className={cn("rounded-lg border border-border-subtle p-5.5 font-sans", className)} {...props}>
      {form}
    </section>
  );
}
