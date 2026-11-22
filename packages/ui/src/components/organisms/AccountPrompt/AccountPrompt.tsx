import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/** AccountPrompt (organism): evergreen banner inviting a guest to save their details ("Create account"). */
export interface AccountPromptProps extends Omit<ComponentProps<"section">, "title"> {
  title: string;
  description: ReactNode;
  compactDescription?: ReactNode;
  /** Usually an accent Button. */
  action: ReactNode;
}

export function AccountPrompt({ title, description, compactDescription, action, className, ...props }: AccountPromptProps) {
  return (
    <section
      data-slot="account-prompt"
      aria-label={title}
      className={cn(
        "flex flex-col items-start gap-3 rounded-md bg-primary p-5 font-sans md:gap-4 md:rounded-lg md:px-8 md:py-6 xl:flex-row xl:items-center xl:gap-6",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col gap-3 md:gap-1">
        <h2 className="text-lg leading-base font-semibold text-text-inverse md:text-xl md:leading-lg">{title}</h2>
        <p className="text-sm leading-sm text-text-inverse-muted md:text-base">
          {compactDescription ? (
            <>
              <span className="md:hidden">{compactDescription}</span>
              <span className="hidden md:inline">{description}</span>
            </>
          ) : (
            description
          )}
        </p>
      </div>
      {action}
    </section>
  );
}
