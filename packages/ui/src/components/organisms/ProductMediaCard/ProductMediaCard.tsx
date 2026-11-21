"use client";

import { useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";
import { AdminCard } from "../../molecules";

export interface ProductImage {
  id: string;
  /** next/image with `fill`. */
  image: ReactNode;
  tint?: "sage" | "amber" | "lavender" | "sun" | "citrus";
  alt?: string;
}

const TINT = { sage: "bg-sage-100", amber: "bg-tint-amber", lavender: "bg-tint-lavender", sun: "bg-tint-sun", citrus: "bg-tint-citrus" } as const;

/**
 * ProductMediaCard (organism): the product's images (Paper Jofak - Admin → Product editor →
 * Media). The first is the cover; drag a thumbnail onto another to reorder (mouse). "Add" picks
 * files; new ones show as "New" until saved. Posts `media` (ids in order) and `images` (files).
 */
export interface ProductMediaCardProps extends Omit<ComponentProps<"section">, "children" | "title"> {
  images: ProductImage[];
}

export function ProductMediaCard({ images: initial, ...props }: ProductMediaCardProps) {
  const [images, setImages] = useState(initial);
  const [added, setAdded] = useState<{ id: string; url: string }[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);

  const move = (from: string, to: string) => {
    if (from === to) return;
    const next = [...images];
    const [item] = next.splice(next.findIndex((image) => image.id === from), 1);
    next.splice(next.findIndex((image) => image.id === to), 0, item!);
    setImages(next);
  };

  const tile = (image: ProductImage, index: number) => (
    <li
      key={image.id}
      draggable
      onDragStart={() => setDragging(image.id)}
      onDragEnd={() => setDragging(null)}
      onDragOver={(event) => dragging && dragging !== image.id && event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        if (dragging) move(dragging, image.id);
        setDragging(null);
      }}
      className={cn(
        "relative shrink-0 cursor-grab overflow-hidden",
        index === 0 ? "col-span-3 aspect-square w-full rounded-md md:col-span-1 md:size-50" : "aspect-square w-full rounded-14 md:size-23.5",
        TINT[image.tint ?? "sage"],
        dragging === image.id && "opacity-muted",
      )}
    >
      {image.image}
      {index === 0 && <span className="absolute top-2.5 left-2.5 rounded-full bg-bg px-2 py-0.75 text-11 leading-3.5 font-bold text-text">Cover</span>}
      <span className="sr-only">{image.alt ?? `Image ${index + 1}`}</span>
    </li>
  );

  return (
    <AdminCard
      data-slot="product-media-card"
      title="Media"
      meta={<span className="hidden text-text-muted md:inline">Drag to reorder · the first image is the cover</span>}
      {...props}
    >
      <p className="-mt-3 text-sm leading-sm text-text-muted md:hidden">Drag to reorder · the first image is the cover</p>
      <input type="hidden" name="media" value={images.map((image) => image.id).join(",")} />
      <ul className="grid grid-cols-3 gap-3 md:flex md:flex-wrap md:items-start">
        {images.map(tile)}
        {added.map((file) => (
          <li key={file.id} className="relative aspect-square w-full shrink-0 overflow-hidden rounded-14 bg-sage-100 outline-2 outline-offset-2 outline-accent md:size-23.5">
            <img src={file.url} alt="" className="size-full object-cover" />
            <span className="absolute bottom-1.5 left-1.5 rounded-full bg-accent px-1.5 py-0.5 text-10 leading-3.5 font-bold text-on-accent">New</span>
          </li>
        ))}
        <li>
          <label className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-14 border-field border-dashed border-border text-text-secondary hover:bg-surface-subtle md:size-23.5">
            <Icon name="plus" size={18} strokeWidth={1.6} />
            <span className="text-xs leading-xs font-semibold">Add</span>
            <input
              type="file"
              name="images"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="sr-only"
              onChange={(event) =>
                setAdded(Array.from(event.target.files ?? []).map((file, index) => ({ id: `${file.name}-${index}`, url: URL.createObjectURL(file) })))
              }
            />
          </label>
        </li>
      </ul>
      <p className="text-xs leading-xs text-text-muted">JPG, PNG or WebP up to 10 MB. Add alt text to each image for screen readers and search.</p>
    </AdminCard>
  );
}
