"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useId, type ComponentProps } from "react";

import { cn, useTheme, type ThemeMode } from "../../../lib";
import { Icon, type IconName } from "../../atoms";
import {
  themeSwitchGroupVariants,
  themeSwitchItemVariants,
  themeSwitchLabelVariants,
  type ThemeSwitchVariantProps,
} from "./ThemeSwitch.variants";

const OPTIONS: { value: ThemeMode; label: string; icon: IconName }[] = [
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "system", label: "System", icon: "monitor" },
];

/**
 * ThemeSwitch (molecule): Light / Dark / System, wired to ThemeProvider.
 * Needs <ThemeProvider> from @repo/ui/lib above it.
 */
export interface ThemeSwitchProps extends ComponentProps<"div">, ThemeSwitchVariantProps {
  /** Visible label before the control. */
  label?: string;
}

export function ThemeSwitch({ className, tone, label = "Theme", ...props }: ThemeSwitchProps) {
  const { mode, setMode } = useTheme();
  const labelId = useId();
  const iconSize = tone === "feature" ? 14 : 15;

  return (
    <div data-slot="theme-switch" className={cn("flex items-center gap-2.5", className)} {...props}>
      <span id={labelId} className={themeSwitchLabelVariants({ tone })}>
        {label}
      </span>
      <ToggleGroup.Root
        type="single"
        value={mode}
        onValueChange={(next) => next && setMode(next as ThemeMode)}
        aria-labelledby={labelId}
        className={themeSwitchGroupVariants({ tone })}
      >
        {OPTIONS.map((option) => {
          const selected = option.value === mode;
          return (
            <ToggleGroup.Item
              key={option.value}
              value={option.value}
              aria-label={option.label}
              className={themeSwitchItemVariants({ tone })}
            >
              <Icon name={option.icon} size={iconSize} />
              {selected && <span aria-hidden>{option.label}</span>}
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>
    </div>
  );
}
