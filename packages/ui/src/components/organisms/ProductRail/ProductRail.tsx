"use client";

import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Eyebrow, Icon, IconButton } from "../../atoms";
import { ProductCard, type ProductCardData } from "../ProductCard";

/**
 * ProductRail (organism): a titled row of ProductCards that scrolls sideways, with prev/next
 * buttons from 768px ("Start with a bestseller" on the 404 page).
 *   mobile: 2 compact cards; tablet: 2 full cards; desktop: 4 columns, then scroll.
 */
export interface ProductRailProps extends Omit<ComponentProps<"section">, "title"> {
  eyebrow?: string;
  /** Wrap the accent word in <em>. */
  title: ReactNode;
  /** Accessible name for the section when `title` has markup. */
  label?: string;
  products: ProductCardData[];
  /** Packshots keyed by product id. */
  images?: Record<string, ReactNode>;
  linkAs?: LinkComponent;
}

export function ProductRail({ eyebrow, title, label, products, images = {}, linkAs, className, ...props }: ProductRailProps) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () =>
      setEdges({
        start: element.scrollLeft <= 1,
        end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 1,
      });
    update();
    element.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      element.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByPage = (direction: 1 | -1) => {
    const element = track.current;
    if (element) element.scrollBy({ left: direction * element.clientWidth, behavior: "smooth" });
  };

  return (
    <section
      data-slot="product-rail"
      aria-label={label ?? (typeof title === "string" ? title : undefined)}
      className={cn("flex flex-col gap-5 px-5 pb-8 md:gap-8 md:px-8 md:pt-14 md:pb-12 xl:px-14 xl:pt-18 xl:pb-14", className)}
      {...props}
    >
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-3">
          {eyebrow && (
            <Eyebrow size="md" className="hidden md:block">
              {eyebrow}
            </Eyebrow>
          )}
          <h2 className="font-sans text-3xl leading-3xl font-medium tracking-tight text-text md:text-5xl md:leading-5xl [&_em]:font-serif [&_em]:font-regular [&_em]:text-brand [&_em]:italic">
            {title}
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <IconButton label="Previous products" disabled={edges.start} onClick={() => scrollByPage(-1)} className="size-11 disabled:opacity-50">
            <Icon name="chevronLeft" size={16} />
          </IconButton>
          <IconButton label="Next products" variant="solid" disabled={edges.end} onClick={() => scrollByPage(1)} className="size-11 disabled:opacity-50">
            <Icon name="chevronRight" size={16} />
          </IconButton>
        </div>
      </div>

      <ul
        ref={track}
        className="scrollbar-none flex snap-x snap-mandatory gap-2.5 overflow-x-auto md:gap-4 xl:grid xl:auto-cols-quarter xl:grid-flow-col"
      >
        {products.map((product) => (
          <li key={product.id} className="w-42.5 shrink-0 snap-start md:w-86 xl:w-auto">
            <ProductCard product={product} image={images[product.id]} linkAs={linkAs} />
          </li>
        ))}
      </ul>
    </section>
  );
}
