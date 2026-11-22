import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * AdminCard (molecule): the outlined card admin editors are built from (Paper Jofak - Admin →
 * Product editor). `heading` is an 18px title ("Details"); `eyebrow` a small caps label
 * ("STATUS") for side cards. `meta` sits opposite the title (a hint or a link). `flush` drops
 * the padding so tables can run edge to edge.
 */
export interface AdminCardProps extends Omit<ComponentProps<"section">, "title"> {
  title: ReactNode;
  variant?: "heading" | "eyebrow";
  meta?: ReactNode;
  flush?: boolean;
}

export function AdminCard({ title, variant = "heading", meta, flush = false, className, children, ...props }: AdminCardProps) {
  const titleId = useId();
  const eyebrow = variant === "eyebrow";
  return (
    <section
      data-slot="admin-card"
      aria-labelledby={titleId}
      className={cn(
        "flex flex-col rounded-lg border border-border-subtle font-sans",
        flush ? "overflow-clip" : eyebrow ? "gap-3 p-4.5 md:p-5" : "gap-4 p-4.5 md:px-6 md:pt-5.5 md:pb-6",
        className,
      )}
      {...props}
    >
      <div className={cn("flex items-baseline justify-between gap-3", flush && "px-4.5 pt-4.5 md:px-6 md:pt-5.5")}>
        <h2
          id={titleId}
          className={eyebrow ? "text-xs leading-xs font-semibold tracking-eyebrow text-text-muted uppercase" : "text-lg leading-base font-semibold tracking-compact text-text"}
        >
          {title}
        </h2>
        {meta && <div className="text-sm leading-sm">{meta}</div>}
      </div>
      {children}
    </section>
  );
}
