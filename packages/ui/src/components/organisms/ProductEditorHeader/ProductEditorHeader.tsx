import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, StatusChip, type StatusChipProps } from "../../atoms";

/**
 * ProductEditorHeader (organism): the top of the admin product editor (Paper Jofak - Admin →
 * Product editor): breadcrumb (from 768px), packshot, name, status and when it was last edited,
 * with Preview, Duplicate and `more`. On mobile a sticky back bar ("Products · Edit product")
 * with a preview button replaces the admin top bar.
 */
export interface ProductEditorHeaderProps extends Omit<ComponentProps<"header">, "children"> {
  linkAs?: LinkComponent;
  backHref: string;
  name: string;
  image?: ReactNode;
  status: { label: string; tone: NonNullable<StatusChipProps["tone"]> };
  /** "Live since 2 Sep · last edited by Abena, today 09:14". */
  meta: ReactNode;
  previewHref: string;
  duplicateHref?: string;
  more?: ReactNode;
}

export function ProductEditorHeader({
  linkAs: LinkAs = "a",
  backHref,
  name,
  image,
  status,
  meta,
  previewHref,
  duplicateHref,
  more,
  className,
  ...props
}: ProductEditorHeaderProps) {
  const pill = "flex h-11 items-center gap-2 rounded-full border border-border px-4.5 text-14 leading-4.5 font-semibold text-text transition-colors hover:bg-surface-subtle";
  return (
    <header data-slot="product-editor-header" className={cn("flex flex-col gap-3.5 font-sans md:gap-5", className)} {...props}>
      <div className="sticky top-0 z-20 -mx-4 -mt-5 flex h-15 items-center gap-2 border-b border-border-subtle bg-bg px-3 md:hidden">
        <LinkAs href={backHref} aria-label="Back to Products" className="flex size-10 shrink-0 items-center justify-center rounded-full text-text hover:bg-surface-subtle">
          <Icon name="chevronLeft" size={20} strokeWidth={1.8} />
        </LinkAs>
        <p className="flex min-w-0 flex-1 flex-col">
          <span className="text-xs leading-xs text-text-muted">Products</span>
          <span className="text-md leading-5.5 font-semibold text-text">Edit product</span>
        </p>
        <a href={previewHref} target="_blank" rel="noreferrer" aria-label="Preview on the store" className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-text">
          <Icon name="arrowUpRight" size={14} strokeWidth={1.5} />
        </a>
      </div>
      <nav aria-label="Breadcrumb" className="hidden md:block">
        <ol className="flex items-center gap-2 text-sm leading-sm">
          <li>
            <LinkAs href={backHref} className="flex items-center gap-2 font-semibold text-text-secondary hover:text-text">
              <Icon name="chevronLeft" size={14} strokeWidth={1.5} className="text-text-muted" />
              Products
            </LinkAs>
          </li>
          <li aria-hidden className="text-text-muted">
            /
          </li>
          <li aria-current="page" className="text-text-muted">
            {name}
          </li>
        </ol>
      </nav>
      <div className="flex flex-col items-start gap-3.5 md:gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
        <div className="flex items-center gap-4">
          <span className="relative size-14 shrink-0 overflow-hidden rounded-14 bg-tint-sun">{image}</span>
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-24 leading-2xl font-semibold tracking-tight text-text md:text-30 md:leading-9">{name}</h1>
              <StatusChip tone={status.tone} size="lg">
                {status.label}
              </StatusChip>
            </div>
            <p className="text-sm leading-sm text-text-muted">{meta}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <a href={previewHref} target="_blank" rel="noreferrer" className={pill}>
            Preview <Icon name="arrowUpRight" size={14} strokeWidth={1.5} />
          </a>
          {duplicateHref && (
            <LinkAs href={duplicateHref} className={pill}>
              Duplicate
            </LinkAs>
          )}
          {more}
        </div>
      </div>
    </header>
  );
}
