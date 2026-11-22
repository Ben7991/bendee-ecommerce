import { useId, type ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

export interface ReadyCheck {
  label: string;
  done: boolean;
}

/**
 * ProductReadyCard (organism): "Ready to sell · 4 of 4", the checks a product must pass before it
 * can go live (Paper Jofak - Admin → Product editor → Ready check). Sage when everything passes,
 * sun while something is missing.
 */
export interface ProductReadyCardProps extends Omit<ComponentProps<"section">, "children"> {
  checks: ReadyCheck[];
}

export function ProductReadyCard({ checks, className, ...props }: ProductReadyCardProps) {
  const titleId = useId();
  const done = checks.filter((check) => check.done).length;
  const ready = done === checks.length;
  return (
    <section
      data-slot="product-ready-card"
      aria-labelledby={titleId}
      className={cn("flex flex-col gap-2.5 rounded-lg px-5 py-4.5 font-sans", ready ? "bg-sage-50" : "bg-tint-sun", className)}
      {...props}
    >
      <div className={cn("flex items-center justify-between text-xs leading-xs font-semibold", ready ? "text-brand" : "text-warning-text")}>
        <h2 id={titleId} className="tracking-eyebrow uppercase">
          {ready ? "Ready to sell" : "Not ready to sell"}
        </h2>
        <p>
          {done} of {checks.length}
        </p>
      </div>
      <ul className="flex flex-col gap-1.5">
        {checks.map((check) => (
          <li key={check.label} className="flex items-center gap-2 text-sm leading-4.5 text-text">
            {check.done ? (
              <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-brand text-text-inverse dark:text-bg">
                <Icon name="check" size={9} strokeWidth={3.2} />
              </span>
            ) : (
              <span className="size-3.5 shrink-0 rounded-full border-field border-warning" />
            )}
            {check.label}
            <span className="sr-only">{check.done ? ", done" : ", missing"}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
