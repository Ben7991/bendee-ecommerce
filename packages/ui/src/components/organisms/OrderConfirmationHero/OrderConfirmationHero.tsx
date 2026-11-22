import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Eyebrow, Heading, Icon } from "../../atoms";

/**
 * OrderConfirmationHero (organism): the top of the order confirmation: a green tick, the order
 * number, "Thank you, <em>Ama</em>" and when it arrives. White band on mobile.
 */
export interface OrderConfirmationHeroProps extends Omit<ComponentProps<"div">, "title"> {
  eyebrow: string;
  /** Wrap the name in <em>. */
  title: ReactNode;
  description: ReactNode;
  compactDescription?: ReactNode;
}

export function OrderConfirmationHero({ eyebrow, title, description, compactDescription, className, ...props }: OrderConfirmationHeroProps) {
  return (
    <div
      data-slot="order-confirmation-hero"
      className={cn("flex flex-col items-center gap-3 bg-bg px-5 pt-6 pb-8 text-center font-sans md:w-220 md:gap-4 md:bg-transparent md:p-0", className)}
      {...props}
    >
      <span aria-hidden className="flex size-15 items-center justify-center rounded-full bg-brand text-text-inverse md:size-18">
        <Icon name="check" size={34} strokeWidth={2.6} className="size-7 md:size-8.5" />
      </span>
      <Eyebrow size="responsive">{eyebrow}</Eyebrow>
      <Heading as="h1" className="text-38 leading-10.5 md:text-4xl md:leading-4xl xl:text-5xl xl:leading-5xl">
        {title}
      </Heading>
      <p className="text-base leading-sm text-text-secondary md:text-lg md:leading-lg [&_strong]:font-semibold [&_strong]:text-text">
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
  );
}
