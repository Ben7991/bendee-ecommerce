"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Badge, Icon, IconButton } from "../../atoms";

export interface GalleryItem {
  id: string;
  /** Accessible name of the view, e.g. "Front of the tub". */
  label: string;
  /**
   * packshot: a cut-out, centred on the sage gradient (default)
   * photo:    fills the frame
   * video:    a photo with a play badge
   * howto:    the "How to use" tile, with `caption`
   */
  kind?: "packshot" | "photo" | "video" | "howto";
  /** next/image with `fill` (object-contain for packshots, object-cover for photos). */
  image?: ReactNode;
  /** Thumbnail, if different from `image`. */
  thumb?: ReactNode;
  /** howto: the steps shown in the main view. */
  caption?: ReactNode;
}

/**
 * ProductGallery (organism): the PDP images (Paper PDP → Gallery).
 *   mobile:  edge to edge under the header (`toolbar`), swipe between views, dots and "1 / 5"
 *   tablet:  big rounded frame with the thumbnails in a row under it
 *   desktop: thumbnails in a column on the left
 * One scroll-snap track drives every size, so swiping, thumbs and dots stay in sync. The zoom
 * button (from 768px) opens the current view large in a dialog.
 */
export interface ProductGalleryProps extends Omit<ComponentProps<"section">, "children"> {
  items: GalleryItem[];
  badges?: { label: string; variant: "solid" | "light" }[];
  /** Mobile header over the gallery (back, favourite, bag). */
  toolbar?: ReactNode;
  /** Accessible name, e.g. "Daily Greens Powder images". */
  label: string;
}

export function ProductGallery({ items, badges = [], toolbar, label, className, ...props }: ProductGalleryProps) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => setIndex(Math.round(element.scrollLeft / Math.max(1, element.clientWidth)));
    element.addEventListener("scroll", update, { passive: true });
    return () => element.removeEventListener("scroll", update);
  }, []);

  const show = (next: number) => {
    const element = track.current;
    if (element)
      element.scrollTo({
        left: next * element.clientWidth,
        behavior: "smooth",
      });
    setIndex(next);
  };
  const current = items[index] ?? items[0];

  return (
    <section
      data-slot="product-gallery"
      aria-label={label}
      aria-roledescription="carousel"
      className={cn(
        "relative flex flex-col overflow-hidden rounded-b-2xl bg-radial from-bg via-sage-100 via-55% to-sage-200",
        "md:gap-3 md:overflow-visible md:rounded-none md:bg-none xl:flex-row",
        className,
      )}
      {...props}
    >
      {toolbar && <div className="relative z-10 px-5 pt-3 md:hidden">{toolbar}</div>}

      <div className="relative min-w-0 md:h-130 md:overflow-hidden md:rounded-2xl md:bg-radial md:from-bg md:via-sage-100 md:via-55% md:to-sage-200 xl:order-2 xl:h-150 xl:flex-1">
        <div ref={track} className="scrollbar-none flex h-82.5 snap-x snap-mandatory overflow-x-auto md:h-full">
          {items.map((item, position) => (
            <div
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${position + 1} of ${items.length}: ${item.label}`}
              className="relative flex w-full shrink-0 snap-center items-center justify-center"
            >
              <Slide item={item} />
            </div>
          ))}
        </div>

        {badges.length > 0 && (
          <div className="absolute top-4 left-5 flex flex-col items-start gap-1.5 md:top-5 md:flex-row md:gap-2">
            {badges.map((badge) => (
              <span key={badge.label}>
                <Badge variant={badge.variant} size="sm" className="md:hidden">
                  {badge.label}
                </Badge>
                <Badge variant={badge.variant} className="hidden md:inline-flex">
                  {badge.label}
                </Badge>
              </span>
            ))}
          </div>
        )}

        <IconButton
          label="Zoom image"
          variant="plain"
          onClick={() => setZoomed(true)}
          className="absolute top-5 right-5 hidden size-11 md:inline-flex"
        >
          <Icon name="zoomIn" />
        </IconButton>

        <Dots
          count={items.length}
          index={index}
          onSelect={show}
          className="hidden md:absolute md:bottom-5 md:left-1/2 md:flex md:-translate-x-1/2"
        />
      </div>

      <Dots count={items.length} index={index} onSelect={show} className="flex justify-center pt-0 pb-5 md:hidden" />
      <p
        aria-hidden
        className="absolute right-5 bottom-4 rounded-full bg-bg/80 px-2.5 py-1 font-sans text-xs leading-xs font-semibold text-text md:hidden"
      >
        {index + 1} / {items.length}
      </p>

      <ul className="hidden gap-3 md:flex md:justify-between xl:order-1 xl:w-22 xl:shrink-0 xl:flex-col xl:justify-start">
        {items.map((item, position) => (
          <li key={item.id}>
            <button
              type="button"
              aria-label={`Show ${item.label}`}
              aria-current={position === index ? "true" : undefined}
              onClick={() => show(position)}
              className={cn(
                "relative flex h-25 w-22 flex-col items-center justify-center gap-1 overflow-hidden rounded-md font-sans transition-colors",
                item.kind === "video"
                  ? "bg-primary"
                  : item.kind === "howto"
                    ? "bg-tint-sun"
                    : position === index
                      ? "bg-sage-100"
                      : "bg-surface",
                position === index && "ring-2 ring-primary ring-inset",
              )}
            >
              <Thumb item={item} />
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={zoomed} onOpenChange={setZoomed}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-evergreen-950/55 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed inset-4 z-50 flex items-center justify-center overflow-hidden rounded-2xl bg-radial from-bg via-sage-100 via-55% to-sage-200 outline-none data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in xl:inset-10"
          >
            <Dialog.Title className="sr-only">{current?.label}</Dialog.Title>
            {current && <Slide item={current} large />}
            <Dialog.Close asChild>
              <IconButton label="Close zoom" variant="plain" className="absolute top-5 right-5 size-11">
                <Icon name="close" />
              </IconButton>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

function Slide({ item, large = false }: { item: GalleryItem; large?: boolean }) {
  const kind = item.kind ?? "packshot";
  if (kind === "howto") {
    return (
      <div className="flex size-full flex-col items-center justify-center gap-4 bg-tint-sun p-8 text-center font-sans text-primary dark:text-brand">
        <Icon name="scoop" size={48} />
        <div className="max-w-80 text-base leading-base text-text">{item.caption}</div>
      </div>
    );
  }
  if (kind === "photo" || kind === "video") {
    return (
      <div className="absolute inset-0">
        {item.image}
        {kind === "video" && (
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 flex size-16 -translate-1/2 items-center justify-center rounded-full bg-bg text-primary"
          >
            <Icon name="play" size={20} />
          </span>
        )}
      </div>
    );
  }
  return (
    <div className={cn("relative", large ? "size-full max-h-180 max-w-150" : "h-70.75 w-57.5 md:h-107.5 md:w-87.5")}>{item.image}</div>
  );
}

function Thumb({ item }: { item: GalleryItem }) {
  const kind = item.kind ?? "packshot";
  const visual = item.thumb ?? item.image;
  if (kind === "howto") {
    return (
      <>
        <Icon name="scoop" size={26} className="text-primary dark:text-brand" />
        <span className="text-xs leading-xs font-semibold text-primary dark:text-brand">How to use</span>
      </>
    );
  }
  if (kind === "photo" || kind === "video") {
    return (
      <>
        <span className={cn("absolute inset-0", kind === "video" && "opacity-70")}>{visual}</span>
        {kind === "video" && (
          <span className="relative flex size-8 items-center justify-center rounded-full bg-bg text-primary">
            <Icon name="play" size={12} />
          </span>
        )}
      </>
    );
  }
  return <span className="relative h-19 w-15.5">{visual}</span>;
}

function Dots({
  count,
  index,
  onSelect,
  className,
}: {
  count: number;
  index: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("gap-1.5", className)}>
      {Array.from({ length: count }, (_, position) => (
        <button
          key={position}
          type="button"
          aria-label={`Show image ${position + 1} of ${count}`}
          aria-current={position === index ? "true" : undefined}
          onClick={() => onSelect(position)}
          className={cn("h-1.5 rounded-full transition-all", position === index ? "w-5 bg-primary" : "w-1.5 bg-evergreen-300")}
        />
      ))}
    </div>
  );
}
