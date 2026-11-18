"use client";

import { useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * Notice (molecule): a dismissible info line above a list ("Good news — a price dropped").
 * Not for errors that block the user; those belong next to what they're about.
 * Dismissing hides it; `onDismiss` lets the app remember that.
 */
export interface NoticeProps extends Omit<ComponentProps<"div">, "title"> {
  title: ReactNode;
  children: ReactNode;
  /** Shorter title for mobile. */
  compactTitle?: ReactNode;
  /** Shorter text for mobile. */
  compactText?: ReactNode;
  dismissLabel?: string;
  onDismiss?: () => void;
}

export function Notice({
  title,
  children,
  compactTitle,
  compactText,
  dismissLabel = "Dismiss",
  onDismiss,
  className,
  ...props
}: NoticeProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  const responsive = (full: ReactNode, compact?: ReactNode) =>
    compact ? (
      <>
        <span className="md:hidden">{compact}</span>
        <span className="hidden md:inline">{full}</span>
      </>
    ) : (
      full
    );

  return (
    <div
      data-slot="notice"
      role="status"
      className={cn("flex items-start gap-3 rounded-md border border-transparent px-4 py-3 md:px-5 md:py-4", className)}
      {...props}
    >
      <Icon name="info" className="text-info" />
      <div className="flex flex-1 flex-col gap-0.5 font-sans">
        <p className="text-base leading-4.5 font-semibold text-text">{responsive(title, compactTitle)}</p>
        <p className="text-sm leading-xs text-text-secondary">{responsive(children, compactText)}</p>
      </div>
      <button
        type="button"
        aria-label={dismissLabel}
        onClick={() => {
          setOpen(false);
          onDismiss?.();
        }}
        className="-m-1 flex size-6 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text"
      >
        <Icon name="close" size={16} strokeWidth={2.2} />
      </button>
    </div>
  );
}
