import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { contentSectionTitleVariants, contentSectionVariants, type ContentSectionVariantProps } from "./ContentSection.variants";

/**
 * ContentSection (molecule): one titled block of a content page's article: a heading and the
 * copy under it (paragraphs, a BulletList, a RateTable…). Paragraphs and links inside pick up
 * the body style; tables and lists bring their own.
 */
export interface ContentSectionProps extends Omit<ComponentProps<"section">, "title">, ContentSectionVariantProps {
  title: ReactNode;
}

export function ContentSection({ title, size, className, children, ...props }: ContentSectionProps) {
  const titleId = useId();
  return (
    <section data-slot="content-section" aria-labelledby={titleId} className={cn(contentSectionVariants({ size }), className)} {...props}>
      <h2 id={titleId} className={contentSectionTitleVariants({ size })}>
        {title}
      </h2>
      {children}
    </section>
  );
}
