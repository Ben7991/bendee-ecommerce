import type { ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Heading, Icon, IconBadge, type IconName } from "../../atoms";
import { BackLink } from "../../molecules";

/**
 * AuthIntro (organism): the top of every auth screen: optional back link, status pill and icon
 * badge, then the title and lede. It renders its pieces straight into the form column (no
 * wrapper box), so they take the column's gap like the rest of the form, as in Paper.
 * Wrap the accent word of `title` in <em>, and key values in `description` in <strong>.
 */
export interface AuthIntroProps {
  title: ReactNode;
  description: ReactNode;
  back?: { href: string; label: string };
  /** Green pill above everything, e.g. "Account created · you're signed in". */
  status?: string;
  icon?: IconName;
  iconSize?: number;
  /** Lede size: 15/20 (default) or 16/24 (the code screen). */
  descriptionSize?: "sm" | "md";
  titleClassName?: string;
  linkAs?: LinkComponent;
}

export function AuthIntro({
  title,
  description,
  back,
  status,
  icon,
  iconSize,
  descriptionSize = "sm",
  titleClassName,
  linkAs: Link = "a",
}: AuthIntroProps) {
  return (
    <div data-slot="auth-intro" className="contents">
      {back && (
        <BackLink asChild>
          <Link href={back.href}>{back.label}</Link>
        </BackLink>
      )}
      {status && (
        <p
          role="status"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-sage-100 py-1.5 pr-3 pl-2 font-sans text-xs leading-xs font-semibold text-primary dark:text-brand"
        >
          <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-brand text-text-inverse dark:text-bg">
            <Icon name="check" size={10} strokeWidth={3.2} />
          </span>
          {status}
        </p>
      )}
      {icon && <IconBadge icon={icon} iconSize={iconSize} />}
      <div className="flex flex-col gap-2">
        <Heading as="h1" size="auth" className={titleClassName}>
          {title}
        </Heading>
        <p
          className={cn(
            "font-sans text-text-secondary [&_strong]:font-semibold [&_strong]:text-text",
            descriptionSize === "md" ? "text-md leading-base" : "text-base leading-sm",
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
