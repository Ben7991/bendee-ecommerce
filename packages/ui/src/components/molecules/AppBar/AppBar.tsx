import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * AppBar (molecule): the compact mobile top bar of deeper account pages (Addresses, Order
 * tracking, Returns): a round back (or close) button, a centred title and an optional action.
 * Pass IconButtons (with your router's link through `asChild`) as `back` and `action`.
 */
export interface AppBarProps extends Omit<ComponentProps<"header">, "title"> {
  title: ReactNode;
  back?: ReactNode;
  action?: ReactNode;
}

export function AppBar({ title, back, action, className, ...props }: AppBarProps) {
  return (
    <header data-slot="app-bar" className={cn("flex items-center gap-3 px-5 py-2", className)} {...props}>
      <div className="flex w-10 shrink-0">{back}</div>
      <p className="min-w-0 flex-1 truncate text-center font-sans text-md leading-sm font-semibold text-text">{title}</p>
      <div className="flex w-10 shrink-0 justify-end">{action}</div>
    </header>
  );
}
