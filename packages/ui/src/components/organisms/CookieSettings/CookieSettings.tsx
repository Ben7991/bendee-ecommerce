"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Button, Icon, IconButton, Switch } from "../../atoms";

export interface CookieCategory {
  id: string;
  title: string;
  description: string;
  /** Strictly necessary: shown as "Always on", no switch. */
  required?: boolean;
}

export type CookieChoices = Record<string, boolean>;

/**
 * CookieSettings (organism): the "Cookie settings" dialog (Paper Cookie consent → Cookie
 * settings), on Radix Dialog. One row per category: required ones say "Always on", the rest have
 * a switch. Centred on tablet and desktop, a bottom sheet on mobile. Controlled: the app owns
 * `open` and the saved `value`; the switches start from `value` each time it opens.
 */
export interface CookieSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CookieCategory[];
  /** The saved choice per optional category. */
  value: CookieChoices;
  onSave: (choices: CookieChoices) => void;
  onAcceptAll: () => void;
  title?: string;
  description?: ReactNode;
  /** The privacy policy link. */
  privacyLink?: ReactNode;
}

export function CookieSettings({
  open,
  onOpenChange,
  categories,
  value,
  onSave,
  onAcceptAll,
  title = "Cookie settings",
  description,
  privacyLink,
}: CookieSettingsProps) {
  const [choices, setChoices] = useState<CookieChoices>(value);
  // Start from the saved choices every time the dialog opens.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setChoices(value);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-evergreen-950/55 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65" />
        <Dialog.Content
          data-slot="cookie-settings"
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex max-h-dvh flex-col overflow-y-auto rounded-t-2xl bg-bg font-sans text-text shadow-modal outline-none dark:bg-surface",
            "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
            "md:top-1/2 md:right-auto md:bottom-auto md:left-1/2 md:w-140 md:-translate-1/2 md:rounded-2xl",
            "md:data-[state=closed]:animate-dialog-out md:data-[state=open]:animate-dialog-in",
          )}
        >
          <div className="flex items-start justify-between gap-4 px-5 pt-6 pb-2 md:px-7 md:pt-7">
            <div className="flex flex-col gap-1.5">
              <Dialog.Title className="text-22 leading-lg font-medium tracking-snug md:text-2xl md:leading-2xl">{title}</Dialog.Title>
              {description && <Dialog.Description className="text-sm leading-sm text-text-secondary">{description}</Dialog.Description>}
            </div>
            <Dialog.Close asChild>
              <IconButton label="Close cookie settings" className="size-10">
                <Icon name="close" size={16} />
              </IconButton>
            </Dialog.Close>
          </div>

          <ul className="flex flex-col px-5 md:px-7 md:py-2">
            {categories.map((category) => (
              <li key={category.id} className="flex items-center gap-4 border-b border-border-subtle py-3.5 last:border-b-0 md:gap-5 md:py-4.5">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h3 id={`cookie-${category.id}`} className="text-base leading-sm font-semibold">
                    {category.title}
                  </h3>
                  <p id={`cookie-${category.id}-description`} className="text-sm leading-sm text-text-secondary">
                    {category.description}
                  </p>
                </div>
                <div className="flex w-18 shrink-0 justify-end md:w-24">
                  {category.required ? (
                    <span className="text-sm leading-xs font-semibold text-success">Always on</span>
                  ) : (
                    <Switch
                      size="lg"
                      aria-labelledby={`cookie-${category.id}`}
                      aria-describedby={`cookie-${category.id}-description`}
                      checked={choices[category.id] ?? false}
                      onCheckedChange={(checked) => setChoices((current) => ({ ...current, [category.id]: checked }))}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col-reverse gap-3.5 border-t border-border-subtle bg-surface-subtle px-5 pt-4 pb-7 md:flex-row md:items-center md:justify-between md:gap-3 md:py-5 md:px-7">
            <div className="text-center text-sm leading-xs font-semibold text-primary md:text-left dark:text-brand [&_a]:underline [&_a]:underline-offset-2">
              {privacyLink}
            </div>
            <div className="flex gap-2">
              <Button
                size="xs"
                variant="outline"
                onClick={onAcceptAll}
                className="flex-1 border-primary px-5 py-3 text-primary md:flex-none dark:border-brand dark:text-brand"
              >
                Accept all
              </Button>
              <Button size="xs" onClick={() => onSave(choices)} className="flex-1 px-5 py-3 md:flex-none">
                Save choices
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
