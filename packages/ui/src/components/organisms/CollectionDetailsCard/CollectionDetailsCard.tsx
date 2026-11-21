"use client";

import { useId, useRef, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * CollectionDetailsCard (organism): a collection's name, deal label, description and banner
 * (Paper Jofak - Admin → Collection editor → Details). Replace picks a new banner (`banner` file);
 * Remove clears it (`removeBanner` = "on"). On mobile only the banner shows, full width with
 * Replace banner on it; the fields open when the card is the URL target (link a row to `#<id>`).
 * Posts `name`, `deal`, `description`.
 */
export interface CollectionDetailsCardProps extends Omit<ComponentProps<"section">, "children" | "defaultValue"> {
  defaultValue: { name: string; deal: string; description: string };
  /** The current banner (packshots on evergreen, or an image). */
  banner?: ReactNode;
  /** "1600 × 600 · used on the hub and the collection page". */
  bannerHint?: string;
}

const label = "text-sm leading-4.5 font-semibold text-text-secondary";
const field = "rounded-sm border border-border bg-bg px-3.5 text-base leading-5 font-medium text-text outline-none focus:border-primary dark:bg-surface dark:focus:border-brand";

export function CollectionDetailsCard({
  defaultValue,
  banner,
  bannerHint = "1600 × 600 · used on the hub and the collection page",
  className,
  ...props
}: CollectionDetailsCardProps) {
  const id = useId();
  const file = useRef<HTMLInputElement>(null);
  const [removed, setRemoved] = useState(false);
  const [picked, setPicked] = useState<string>();
  const showBanner = !removed && (banner || picked);

  const preview = (size: string) => (
    <div className={cn("relative flex shrink-0 items-end justify-center overflow-hidden bg-primary", size)}>
      {showBanner ? (picked ? <span className="self-center px-3 text-center text-sm leading-4.5 text-text-inverse">{picked}</span> : banner) : null}
      {!showBanner && <span className="self-center text-sm leading-4.5 font-semibold text-text-inverse-muted">No banner</span>}
    </div>
  );

  return (
    <section
      data-slot="collection-details-card"
      aria-labelledby={`${id}-title`}
      className={cn("group flex scroll-mt-24 flex-col gap-4 font-sans md:rounded-lg md:border md:border-border-subtle md:px-6 md:py-5.5", className)}
      {...props}
    >
      <input type="hidden" name="removeBanner" value={removed ? "on" : "off"} />
      <input
        ref={file}
        type="file"
        name="banner"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={(event) => {
          const name = event.target.files?.[0]?.name;
          if (name) {
            setPicked(name);
            setRemoved(false);
          }
        }}
      />

      {/* Mobile: the banner, full width. */}
      <div className="relative md:hidden">
        {preview("h-37.5 w-full rounded-2xl")}
        <button
          type="button"
          onClick={() => file.current?.click()}
          className="absolute top-2.5 right-2.5 flex h-8.5 items-center rounded-full bg-bg px-3.5 text-sm leading-4 font-semibold text-text shadow-xs dark:bg-surface"
        >
          Replace banner
        </button>
      </div>

      <div className="hidden flex-col gap-4 group-target:flex md:flex">
        <h2 id={`${id}-title`} className="text-md leading-5.5 font-semibold text-text">
          Details
        </h2>
        <div className="flex flex-col gap-4 md:flex-row">
          <span className="flex min-w-0 flex-1 flex-col gap-1.5">
            <label htmlFor={`${id}-name`} className={label}>
              Name
            </label>
            <input id={`${id}-name`} name="name" required defaultValue={defaultValue.name} className={cn(field, "h-11.5")} />
          </span>
          <span className="flex flex-col gap-1.5 md:w-55 md:shrink-0">
            <label htmlFor={`${id}-deal`} className={label}>
              Deal label
            </label>
            <input id={`${id}-deal`} name="deal" defaultValue={defaultValue.deal} placeholder="Up to 20% off" className={cn(field, "h-11.5")} />
          </span>
        </div>
        <span className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-description`} className={label}>
            Description
          </label>
          <textarea
            id={`${id}-description`}
            name="description"
            rows={2}
            defaultValue={defaultValue.description}
            className={cn(field, "min-h-19 resize-none py-3 text-14 leading-5.25 font-regular field-sizing-content")}
          />
        </span>
        <div className="hidden items-center gap-4 md:flex">
          {preview("h-27.5 w-55 rounded-14")}
          <div className="flex flex-col gap-1.5">
            <p className="text-14 leading-5 font-semibold text-text">Banner image</p>
            <p className="text-sm leading-4.5 text-text-muted">{picked ? `New: ${picked}` : bannerHint}</p>
            <p className="flex gap-3.5 text-sm leading-4.5 font-semibold">
              <button type="button" onClick={() => file.current?.click()} className="text-brand hover:underline">
                {showBanner ? "Replace" : "Upload"}
              </button>
              {showBanner && (
                <button
                  type="button"
                  onClick={() => {
                    setRemoved(true);
                    setPicked(undefined);
                    if (file.current) file.current.value = "";
                  }}
                  className="text-text-secondary hover:underline"
                >
                  Remove
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
