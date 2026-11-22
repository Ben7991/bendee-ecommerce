import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { headingVariants, Icon, IconButton, Logo } from "../../atoms";

/**
 * AuthShell (template): page frame for sign in, sign up and password screens.
 *   mobile 390:   logo bar with a close button, then the form
 *   tablet 768:   300px brand banner across the top, form centred below (440px column)
 *   desktop 1440: 600px brand panel on the left, form centred on the right (420px column)
 * The form column is a flex column: put the page's pieces straight in it, and give a closing
 * note `mt-auto` to pin it to the bottom on mobile and tablet (Paper's phone screen).
 */
export interface AuthShellProps extends ComponentProps<"div"> {
  /** Brand headline; wrap the accent word in <em>. */
  headline: ReactNode;
  /** Desktop-only list under the headline. */
  benefits?: ReactNode[];
  /** Two packshots (next/image with `fill` works); sized by the shell. */
  products?: [ReactNode, ReactNode];
  /** Mobile logo bar. Paper hides it on the code screen. */
  mobileHeader?: boolean;
  homeHref?: string;
  /** Where the mobile close button goes. */
  closeHref?: string;
  /** Classes for the form column (gap, extra padding). */
  columnClassName?: string;
  linkAs?: LinkComponent;
}

export function AuthShell({
  headline,
  benefits = [],
  products,
  mobileHeader = true,
  homeHref = "/",
  closeHref = "/",
  columnClassName,
  linkAs: Link = "a",
  className,
  children,
  ...props
}: AuthShellProps) {
  const logo = (tone: "default" | "inverse") => (
    <Logo asChild tone={tone} size="auth" className="w-fit">
      <Link href={homeHref} aria-label="Jofak home" />
    </Logo>
  );
  const headlineClass = headingVariants({ size: "auth", tone: "inverse" });

  return (
    <div
      data-slot="auth-shell"
      className={cn("flex min-h-dvh flex-col bg-bg xl:flex-row", className)}
      {...props}
    >
      {mobileHeader && (
        <header className="flex items-center justify-between px-5 py-2 md:hidden">
          {logo("default")}
          <IconButton asChild label="Close" size="md" className="size-10">
            <Link href={closeHref}>
              <Icon name="close" size={16} />
            </Link>
          </IconButton>
        </header>
      )}

      {/* Tablet banner */}
      <aside className="m-4 hidden h-75 shrink-0 justify-between overflow-hidden rounded-3xl bg-gradient-feature px-8 pt-8 md:flex xl:hidden">
        <div className="flex flex-col justify-between pb-8">
          {logo("inverse")}
          <p className={headlineClass}>{headline}</p>
        </div>
        {products && (
          <div aria-hidden className="flex items-end gap-2">
            <span className="relative h-36.75 w-30 shrink-0">{products[0]}</span>
            <span className="relative h-54.75 w-44.5 shrink-0">{products[1]}</span>
          </div>
        )}
      </aside>

      {/* Desktop panel */}
      <aside className="m-4 hidden w-150 shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-feature p-10 xl:flex">
        {logo("inverse")}
        {products && (
          <div aria-hidden className="flex h-85 shrink-0 items-end justify-center gap-4">
            <span className="relative h-52 w-42.5 shrink-0">{products[0]}</span>
            <span className="relative h-72.5 w-59 shrink-0">{products[1]}</span>
          </div>
        )}
        <div className="flex flex-col gap-5">
          <p className={headlineClass}>{headline}</p>
          {benefits.length > 0 && (
            <ul className="flex flex-col gap-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 font-sans text-base leading-sm text-text-inverse-muted">
                  <Icon name="check" size={16} strokeWidth={2.6} className="text-accent" />
                  {benefit}
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      <main
        id="main"
        className="flex flex-1 flex-col px-5 pt-4 pb-8 md:items-center md:px-10 md:pt-10 xl:justify-center xl:p-10"
      >
        <div className={cn("flex w-full flex-1 flex-col gap-6 md:w-110 xl:w-105 xl:flex-none", columnClassName)}>
          {children}
        </div>
      </main>
    </div>
  );
}
