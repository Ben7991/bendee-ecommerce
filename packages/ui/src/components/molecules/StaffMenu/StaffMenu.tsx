"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useId, type ComponentProps, type ReactElement } from "react";

import { cn, useTheme, type ThemeMode } from "../../../lib";
import { Icon, Initials, type IconName } from "../../atoms";

const MODES: { value: ThemeMode; label: string; icon: IconName }[] = [
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "system", label: "System", icon: "monitor" },
];

export interface StaffMenuItem {
  label: string;
  icon: IconName;
  href: string;
}

/**
 * StaffMenu (molecule): the signed-in staff member's menu in the admin (name, appearance
 * Light / Dark / System, profile, sign out). A popover above the sidebar card on desktop, a
 * bottom sheet from the avatar on mobile. Needs <ThemeProvider> above it.
 */
export interface StaffMenuProps extends Omit<ComponentProps<"div">, "children"> {
  /** The button that opens the menu (the staff card or avatar). */
  trigger: ReactElement;
  name: string;
  /** "abena@jofak.com · Owner". */
  detail: string;
  items: StaffMenuItem[];
  presentation?: "popover" | "sheet";
  /** Under the appearance switch. */
  appearanceNote?: string;
}

function StaffMenuBody({
  name,
  detail,
  items,
  appearanceNote,
  sheet,
}: Pick<StaffMenuProps, "name" | "detail" | "items" | "appearanceNote"> & { sheet: boolean }) {
  const { mode, setMode } = useTheme();
  const labelId = useId();
  return (
    <>
      <div className={cn("flex items-center gap-2.5", sheet ? "pb-4.5" : "px-2.5 pt-2.5 pb-3")}>
        <Initials name={name} size="staff" className={cn(sheet && "size-12 text-base")} />
        <div className="flex min-w-0 flex-col">
          <p className={cn("font-semibold text-text", sheet ? "text-lg leading-base" : "text-14 leading-sm")}>{name}</p>
          <p className={cn("text-text-muted", sheet ? "text-sm leading-sm" : "text-xs leading-xs")}>{detail}</p>
        </div>
      </div>
      <div className={cn("flex flex-col gap-2 border-t border-border-subtle", sheet ? "py-4.5" : "px-2.5 py-3")}>
        <p id={labelId} className="text-11 leading-xs font-semibold tracking-wide text-text-muted uppercase">
          Appearance
        </p>
        <ToggleGroup.Root
          type="single"
          value={mode}
          onValueChange={(next) => next && setMode(next as ThemeMode)}
          aria-labelledby={labelId}
          className={cn("flex gap-0.5 bg-surface p-0.75", sheet ? "rounded-md" : "rounded-sm")}
        >
          {MODES.map((option) => (
            <ToggleGroup.Item
              key={option.value}
              value={option.value}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 font-medium text-text-secondary transition-colors hover:text-text",
                "data-[state=on]:bg-bg data-[state=on]:font-semibold data-[state=on]:text-text data-[state=on]:shadow-xs",
                sheet ? "rounded-sm py-3 text-base leading-5" : "rounded-10 py-1.75 text-sm leading-4.5",
              )}
            >
              <Icon name={option.icon} size={sheet ? 16 : 14} />
              {option.label}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
        {appearanceNote && <p className="text-xs leading-4.25 text-text-muted">{appearanceNote}</p>}
      </div>
      <ul className={cn("flex flex-col border-t border-border-subtle", sheet ? "pt-2" : "py-1")}>
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-10 text-text transition-colors hover:bg-surface-subtle",
                sheet ? "-mx-2.5 px-2.5 py-3 text-md leading-base" : "px-2.5 py-2.25 text-14 leading-sm",
              )}
            >
              <Icon name={item.icon} size={sheet ? 18 : 16} className="text-text-muted" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export function StaffMenu({
  trigger,
  name,
  detail,
  items,
  presentation = "popover",
  appearanceNote = "System follows your device’s setting. Saved to this account.",
  className,
  ...props
}: StaffMenuProps) {
  const body = { name, detail, items, appearanceNote };

  if (presentation === "sheet") {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-evergreen-950/55 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65" />
          <Dialog.Content
            data-slot="staff-menu"
            aria-describedby={undefined}
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 flex max-h-dvh flex-col overflow-y-auto rounded-t-2xl bg-bg px-5 pt-3 pb-8 font-sans outline-none dark:bg-surface",
              "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
              className,
            )}
            {...props}
          >
            <span aria-hidden className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-border" />
            <Dialog.Title className="sr-only">Account</Dialog.Title>
            <StaffMenuBody {...body} sheet />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          data-slot="staff-menu"
          side="top"
          align="start"
          sideOffset={8}
          aria-label="Account"
          className={cn(
            "z-50 flex w-75 flex-col rounded-18 border border-border-subtle bg-bg p-1.5 font-sans shadow-card outline-none dark:bg-surface",
            "data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
            className,
          )}
          {...props}
        >
          <StaffMenuBody {...body} sheet={false} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
