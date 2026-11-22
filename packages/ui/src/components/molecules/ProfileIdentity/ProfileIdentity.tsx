"use client";

import { useEffect, useId, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, initialsOf } from "../../atoms";

/**
 * ProfileIdentity (molecule): who is signed in, at the top of My profile (Paper Jofak - Admin →
 * My profile): a large avatar (photo or initials) with a camera badge, the name and role, and
 * when they joined and last signed in. Change photo picks an image (`photo` file field) and
 * previews it before saving; Remove submits `intent=remove-photo`.
 */
export interface ProfileIdentityProps extends Omit<ComponentProps<"section">, "children"> {
  name: string;
  role: string;
  photo?: string;
  /** "abena@jofak.com · joined 2 Sep 2026 · last signed in today 07:58 from Osu". */
  meta: ReactNode;
  /** Tablet line. */
  tabletMeta?: ReactNode;
  /** Mobile line. */
  compactMeta?: ReactNode;
  /** Name of the file input. */
  photoName?: string;
}

export function ProfileIdentity({ name, role, photo, meta, tabletMeta, compactMeta, photoName = "photo", className, ...props }: ProfileIdentityProps) {
  const id = useId();
  const [preview, setPreview] = useState<string>();
  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);
  const shown = preview ?? photo;

  return (
    <section data-slot="profile-identity" aria-label="Your photo and name" className={cn("flex items-center gap-3.5 rounded-18 bg-sage-50 p-4 font-sans md:gap-4.5 md:rounded-xl md:px-5.5 md:py-5 xl:gap-6 xl:px-7 xl:py-6", className)} {...props}>
      <div className="relative shrink-0">
        {shown ? (
          <img src={shown} alt="" className="size-15 rounded-full object-cover md:size-18 xl:size-22" />
        ) : (
          <span aria-hidden className="flex size-15 items-center justify-center rounded-full bg-sage-200 text-xl leading-6.5 font-bold tracking-snug text-primary md:size-18 md:text-2xl md:leading-7.5 xl:size-22 xl:text-30 xl:leading-8.5 dark:text-text">
            {initialsOf(name)}
          </span>
        )}
        <label htmlFor={id} className="absolute -right-0.75 -bottom-0.75 flex size-6.5 cursor-pointer items-center justify-center rounded-full bg-bg text-text ring-2 ring-sage-50 hover:bg-surface md:size-8 md:ring-3 dark:bg-surface">
          <span className="sr-only">Change photo</span>
          <Icon name="camera" size={14} strokeWidth={1.4} />
        </label>
      </div>
      <input
        id={id}
        type="file"
        name={photoName}
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          setPreview(file ? URL.createObjectURL(file) : undefined);
        }}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1 xl:gap-1.5">
        <p className="flex flex-wrap items-center gap-2 xl:gap-2.5">
          <span className="text-19 leading-6 font-semibold tracking-snug text-text md:text-24 md:leading-7.5 xl:text-28 xl:leading-8.5 xl:tracking-tight">{name}</span>
          <span className="rounded-full bg-primary px-2 py-0.5 text-11 leading-3.75 font-semibold text-on-primary xl:px-2.5 xl:text-xs xl:leading-xs">{role}</span>
        </p>
        <p className="text-sm leading-4.5 text-text-secondary md:hidden">{compactMeta ?? meta}</p>
        <p className="hidden text-14 leading-5 text-text-secondary md:block xl:hidden">{tabletMeta ?? meta}</p>
        <p className="hidden text-14 leading-5 text-text-secondary xl:block">{meta}</p>
      </div>
      <div className="hidden shrink-0 items-center gap-2 xl:flex">
        <label htmlFor={id} className="flex h-10 cursor-pointer items-center rounded-full border border-border bg-bg px-4 text-sm leading-4.5 font-semibold text-text hover:bg-surface dark:bg-surface">
          {preview ? "Choose another" : "Change photo"}
        </label>
        {(photo || preview) && (
          <button
            type={preview ? "button" : "submit"}
            name={preview ? undefined : "intent"}
            value={preview ? undefined : "remove-photo"}
            onClick={preview ? () => setPreview(undefined) : undefined}
            className="h-10 px-3 text-sm leading-4.5 font-semibold text-text-muted hover:text-text"
          >
            Remove
          </button>
        )}
      </div>
    </section>
  );
}
