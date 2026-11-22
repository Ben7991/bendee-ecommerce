"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { useId, type ComponentProps, type ReactNode } from "react";

import { cn, useTheme, type ThemeMode } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * ThemePicker (organism): "Appearance" on Profile & preferences: Light, Dark and System as
 * preview cards (Paper Account → Appearance). Wired to ThemeProvider like ThemeSwitch; the
 * previews render in their own theme (data-theme), so they look right whatever is showing.
 * `onModeChange` lets the app also save the choice to the account.
 */
export interface ThemePickerProps extends Omit<ComponentProps<"section">, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  compactDescription?: ReactNode;
  note?: ReactNode;
  onModeChange?: (mode: ThemeMode) => void;
}

const LABELS: Record<ThemeMode, string> = { light: "Light", dark: "Dark", system: "System" };

function Screen({ className }: { className?: string }) {
  return (
    <span className={cn("flex h-full flex-col gap-2 bg-bg p-2.5", className)}>
      <span className="flex items-center justify-between">
        <span className="h-1.5 w-8.5 rounded-full bg-primary dark:bg-brand" />
        <span className="size-3 rounded-full bg-primary" />
      </span>
      <span className="h-2 w-7/10 rounded-full bg-text" />
      <span className="flex gap-1.5">
        <span className="h-8.5 flex-1 rounded-6 bg-sage-100" />
        <span className="h-8.5 flex-1 rounded-6 bg-tint-sun" />
        <span className="h-8.5 flex-1 rounded-6 bg-accent" />
      </span>
    </span>
  );
}

function Preview({ mode }: { mode: ThemeMode }) {
  if (mode === "system") {
    return (
      <span className="flex h-16 overflow-hidden rounded-sm border border-border-subtle md:h-24">
        <span data-theme="light" className="w-1/2 overflow-hidden">
          <Screen className="w-2/1" />
        </span>
        <span data-theme="dark" className="relative w-1/2 overflow-hidden">
          <Screen className="absolute inset-y-0 right-0 w-2/1" />
        </span>
      </span>
    );
  }
  return (
    <span data-theme={mode} className="block h-16 overflow-hidden rounded-sm border border-border-subtle md:h-24">
      <Screen />
    </span>
  );
}

export function ThemePicker({
  title = "Appearance",
  description = "Choose how Jofak looks. Saved to your account, so it follows you to every device.",
  compactDescription = "Saved to your account, on every device.",
  note,
  onModeChange,
  className,
  ...props
}: ThemePickerProps) {
  const { mode, resolvedTheme, setMode } = useTheme();
  const titleId = useId();
  return (
    <section data-slot="theme-picker" aria-labelledby={titleId} className={cn("flex flex-col gap-4 rounded-lg border border-border-subtle bg-bg p-4.5 font-sans md:px-6 md:pt-5 md:pb-6", className)} {...props}>
      <div className="flex flex-col gap-0.5">
        <h2 id={titleId} className="text-lg leading-base font-semibold text-text">
          {title}
        </h2>
        <p className="text-sm leading-sm text-text-muted">
          <span className="md:hidden">{compactDescription}</span>
          <span className="hidden md:inline">{description}</span>
        </p>
      </div>
      <RadioGroup.Root
        aria-labelledby={titleId}
        value={mode}
        onValueChange={(next) => {
          setMode(next as ThemeMode);
          onModeChange?.(next as ThemeMode);
        }}
        className="flex gap-2 md:gap-3"
      >
        {(["light", "dark", "system"] as const).map((option) => (
          <RadioGroup.Item
            key={option}
            value={option}
            className={cn(
              "group flex flex-1 flex-col gap-2.5 rounded-md border border-border p-1.5 pb-2.5 text-left transition-colors hover:border-brand md:gap-3 md:px-2.5 md:pt-2.5 md:pb-3.5",
              "data-[state=checked]:border-primary data-[state=checked]:bg-sage-50 data-[state=checked]:ring-1 data-[state=checked]:ring-primary",
            )}
          >
            <Preview mode={option} />
            <span className="flex items-center justify-center gap-2 px-1 md:justify-start">
              <span aria-hidden className="size-3.5 shrink-0 rounded-full border-field border-border bg-bg group-data-[state=checked]:border-4 group-data-[state=checked]:border-primary" />
              <span className="text-sm leading-xs text-text-secondary group-data-[state=checked]:font-semibold group-data-[state=checked]:text-text">{LABELS[option]}</span>
              {option === "system" && (
                <span className="hidden text-xs leading-xs text-text-muted group-data-[state=checked]:md:inline">· {LABELS[resolvedTheme]} right now</span>
              )}
            </span>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
      {note && (
        <p className="flex items-start gap-2 text-xs leading-xs text-text-muted">
          <Icon name="info" size={14} className="mt-px hidden shrink-0 md:block" />
          <span>{note}</span>
        </p>
      )}
    </section>
  );
}
