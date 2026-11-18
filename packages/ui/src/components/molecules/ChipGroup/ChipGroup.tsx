"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { chipVariants, type ChipVariantProps } from "./ChipGroup.variants";

export interface ChipOption {
  value: string;
  label: string;
}

type RootProps = Omit<ComponentProps<"div">, "defaultValue" | "dir" | "onChange">;

interface SingleProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Keep one chip selected (Sort by). Without it, pressing the selected chip clears it. */
  required?: boolean;
}

interface MultipleProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  required?: never;
}

/**
 * ChipGroup (molecule): a wrapping row of pill chips on Radix ToggleGroup. `type="multiple"` for
 * facets (Dietary), `type="single"` for one choice (price presets, Sort by). Arrow keys move
 * between chips. For exclusive tabs that always have a value, use FilterTabs.
 */
export type ChipGroupProps = RootProps &
  ChipVariantProps &
  (SingleProps | MultipleProps) & {
    options: ChipOption[];
    /** Describes the group, e.g. "Dietary". */
    "aria-label": string;
  };

export function ChipGroup({ options, variant, size, className, ...props }: ChipGroupProps) {
  const items = options.map((option) => (
    <ToggleGroup.Item key={option.value} value={option.value} className={chipVariants({ variant, size })}>
      {option.label}
    </ToggleGroup.Item>
  ));
  const rootClassName = cn("flex flex-wrap gap-2", className);

  if (props.type === "multiple") {
    return (
      <ToggleGroup.Root data-slot="chip-group" className={rootClassName} {...props}>
        {items}
      </ToggleGroup.Root>
    );
  }

  const { required, onValueChange, ...single } = props;
  return (
    <ToggleGroup.Root
      data-slot="chip-group"
      className={rootClassName}
      {...single}
      // Radix sends "" when the selected chip is pressed again; a required group keeps its value.
      onValueChange={(next: string) => {
        if (required && !next) return;
        onValueChange?.(next);
      }}
    >
      {items}
    </ToggleGroup.Root>
  );
}
