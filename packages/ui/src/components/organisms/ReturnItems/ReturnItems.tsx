"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Checkbox, Icon, ProductThumb, type ProductThumbProps } from "../../atoms";
import { SelectField } from "../../molecules";

/**
 * ReturnItems (organism): step 1 of a return, "What are you returning?" (Paper Account →
 * Return request). Each item is a card with a checkbox; a ticked card opens up with its reason
 * and photo slots. Posts `items` (ids), `reason-<id>` and `photos-<id>` files with the
 * surrounding form.
 */
export interface ReturnItem {
  id: string;
  name: string;
  /** "Lemon lime · paid GHS 405.00 after discount". */
  detail: ReactNode;
  compactDetail?: ReactNode;
  tint?: ProductThumbProps["tint"];
  image?: ReactNode;
  /** "Qty 1 of 1" chip while ticked. */
  quantity?: ReactNode;
  compactQuantity?: ReactNode;
  /** Photos already added (ProductThumb images). */
  photos?: ReactNode[];
}

export interface ReturnItemsProps extends Omit<ComponentProps<"section">, "title"> {
  items: ReturnItem[];
  reasons: Array<{ value: string; label: string }>;
  defaultSelected?: string[];
  defaultReason?: string;
  title?: ReactNode;
  /** "Photos · required for damaged items". */
  photosLabel?: ReactNode;
  compactPhotosLabel?: ReactNode;
  maxPhotos?: number;
}

export function ReturnItems({
  items,
  reasons,
  defaultSelected = [],
  defaultReason,
  title = "1 · What are you returning?",
  photosLabel = (
    <>
      Photos <span className="font-regular text-text-muted">· required for damaged items</span>
    </>
  ),
  compactPhotosLabel = (
    <>
      Photos <span className="font-regular text-text-muted">· required</span>
    </>
  ),
  maxPhotos = 4,
  className,
  ...props
}: ReturnItemsProps) {
  const titleId = useId();
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const toggle = (id: string, on: boolean) => setSelected((current) => (on ? [...current, id] : current.filter((item) => item !== id)));

  return (
    <section data-slot="return-items" aria-labelledby={titleId} className={cn("flex flex-col gap-3 font-sans md:gap-4", className)} {...props}>
      <h2 id={titleId} className="text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase">
        {title}
      </h2>
      {items.map((item) => {
        const checked = selected.includes(item.id);
        const checkboxId = `${titleId}-${item.id}`;
        const photos = item.photos ?? [];
        return (
          <div
            key={item.id}
            data-state={checked ? "checked" : "unchecked"}
            className={cn("flex flex-col gap-4 rounded-lg p-4 md:p-5", checked ? "border-field border-primary" : "border border-border-subtle")}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <Checkbox
                id={checkboxId}
                name="items"
                value={item.id}
                checked={checked}
                onCheckedChange={(state) => toggle(item.id, state === true)}
                className="size-5.5 rounded-6"
              />
              <ProductThumb size="md" tint={item.tint} image={item.image} />
              <label htmlFor={checkboxId} className="flex min-w-0 flex-1 cursor-pointer flex-col gap-0.5">
                <span className="text-base leading-sm font-semibold text-text">{item.name}</span>
                <span className="text-sm leading-xs text-text-muted">
                  {item.compactDetail ? (
                    <>
                      <span className="md:hidden">{item.compactDetail}</span>
                      <span className="hidden md:inline">{item.detail}</span>
                    </>
                  ) : (
                    item.detail
                  )}
                </span>
              </label>
              {checked && item.quantity && (
                <span className="shrink-0 rounded-full bg-surface px-2.5 py-1.5 text-sm leading-xs font-semibold text-text md:px-3.5 md:py-2">
                  {item.compactQuantity ? (
                    <>
                      <span className="md:hidden">{item.compactQuantity}</span>
                      <span className="hidden md:inline">{item.quantity}</span>
                    </>
                  ) : (
                    item.quantity
                  )}
                </span>
              )}
            </div>
            {checked && (
              <div className="flex flex-col gap-4 md:pl-9.5">
                <SelectField label="Reason" name={`reason-${item.id}`} options={reasons} defaultValue={defaultReason} />
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm leading-xs font-semibold text-text">
                    <span className="md:hidden">{compactPhotosLabel}</span>
                    <span className="hidden md:inline">{photosLabel}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {photos.map((photo, index) => (
                      <ProductThumb key={index} size="photo" tint={index % 2 ? "amber" : "sage"} image={photo} />
                    ))}
                    {photos.length < maxPhotos && (
                      <label className="flex size-18 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-sm border-field border-dashed border-border text-primary transition-colors hover:border-brand dark:text-text">
                        <Icon name="plus" size={18} strokeWidth={2.2} />
                        <span className="text-11 leading-3.5 text-text-muted">
                          {photos.length} of {maxPhotos}
                        </span>
                        <input type="file" accept="image/*" multiple name={`photos-${item.id}`} className="sr-only" aria-label={`Add photos of ${item.name}`} />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
