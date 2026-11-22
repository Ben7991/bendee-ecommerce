"use client";

import type { ComponentProps } from "react";

import { cn } from "../../../lib";

/**
 * RoleOptions (molecule): pick a staff member's role (Paper Jofak - Admin → Settings → Staff
 * member): one card per role with what it can do; the chosen one is tinted. A `disabled` option
 * is dashed (Owner: "Use Transfer ownership"). `autoSubmit` saves the form as soon as the choice
 * changes ("Takes effect on their next page load").
 */
export interface RoleOptionsProps extends Omit<ComponentProps<"div">, "defaultValue" | "onChange"> {
  name: string;
  options: { value: string; label: string; description: string; disabled?: boolean }[];
  defaultValue?: string;
  autoSubmit?: boolean;
}

export function RoleOptions({ name, options, defaultValue, autoSubmit = false, className, ...props }: RoleOptionsProps) {
  return (
    <div data-slot="role-options" role="radiogroup" className={cn("flex flex-col gap-2.5 font-sans", className)} {...props}>
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex gap-3 rounded-14 border px-4 py-3 md:gap-3.5 md:px-5",
            option.disabled ? "cursor-not-allowed border-dashed border-border" : "cursor-pointer border-border-subtle hover:border-border has-checked:border-primary has-checked:bg-sage-50",
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={option.value === defaultValue}
            disabled={option.disabled}
            onChange={autoSubmit ? (event) => event.currentTarget.form?.requestSubmit() : undefined}
            className="peer mt-0.5 size-4.5 shrink-0 cursor-pointer appearance-none rounded-full border-field border-border bg-bg checked:border-5 checked:border-primary disabled:cursor-not-allowed dark:bg-surface"
          />
          <span className="flex min-w-0 flex-col">
            <span className={cn("text-14 leading-5 font-semibold md:text-base", option.disabled ? "text-text-muted" : "text-text")}>{option.label}</span>
            <span className="text-xs leading-4.25 text-text-muted md:text-sm md:leading-4.5">{option.description}</span>
          </span>
        </label>
      ))}
    </div>
  );
}
