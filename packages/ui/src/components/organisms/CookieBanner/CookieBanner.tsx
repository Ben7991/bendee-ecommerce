import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Button } from "../../atoms";

/**
 * CookieBanner (organism): the first-visit cookie notice (Paper Cookie consent → Cookie banner).
 * It floats over the page without blocking it: bottom-left card on desktop, full-width card on
 * tablet and mobile. "Accept all" and "Necessary only" weigh the same (no nudging); "Customise"
 * opens CookieSettings. The app decides when to show it.
 */
export interface CookieBannerProps extends Omit<ComponentProps<"section">, "title"> {
  title?: string;
  /** Explanation from 768px; put the privacy link in it. */
  text: ReactNode;
  /** Shorter explanation on mobile. */
  compactText?: ReactNode;
  onAcceptAll?: () => void;
  onNecessaryOnly?: () => void;
  onCustomise?: () => void;
}

export function CookieBanner({
  title = "We use cookies",
  text,
  compactText,
  onAcceptAll,
  onNecessaryOnly,
  onCustomise,
  className,
  ...props
}: CookieBannerProps) {
  return (
    <section
      data-slot="cookie-banner"
      aria-labelledby="cookie-banner-title"
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 flex flex-col gap-4 rounded-xl border border-border-subtle bg-bg p-5 font-sans shadow-card dark:bg-surface",
        "md:inset-x-10 md:bottom-8 md:gap-4.5 md:p-6 xl:right-auto xl:bottom-6 xl:left-6 xl:w-140",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-1.5">
        <h2 id="cookie-banner-title" className="text-lg leading-lg font-semibold text-text">
          {title}
        </h2>
        <p className="text-sm leading-sm text-text-secondary [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 dark:[&_a]:text-brand">
          {compactText ? (
            <>
              <span className="md:hidden">{compactText}</span>
              <span className="hidden md:inline">{text}</span>
            </>
          ) : (
            text
          )}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
        <Button size="xs" className="flex-1 px-5 py-3 md:flex-none" onClick={onAcceptAll}>
          Accept all
        </Button>
        <Button size="xs" className="flex-1 px-5 py-3 md:flex-none" onClick={onNecessaryOnly}>
          Necessary only
        </Button>
        <button
          type="button"
          onClick={onCustomise}
          className="basis-full rounded-full px-4 pt-1 text-sm leading-xs font-semibold text-primary underline underline-offset-2 md:basis-auto md:py-3 dark:text-brand"
        >
          Customise
        </button>
      </div>
    </section>
  );
}
