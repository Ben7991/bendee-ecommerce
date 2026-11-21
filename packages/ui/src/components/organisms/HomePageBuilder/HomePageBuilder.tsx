"use client";

import { useId, useState, useTransition, type ComponentProps, type ReactNode } from "react";

import { cn, useAutosave, useDragSort, type LinkComponent } from "../../../lib";
import { Icon, Switch } from "../../atoms";

export type HomeBlockKind = "announcement" | "carousel" | "why" | "categories" | "rail" | "promo" | "banner";

export interface HeroSlide {
  id: string;
  name: string;
  /** Thumbnail style: packshots on green, a code chip, or a word in serif. */
  look: "image" | "code" | "text";
  /** Code or word on the thumbnail ("GREENS20", "Gifting"). */
  mark?: string;
  eyebrow: string;
  headline: string;
  button: string;
  collection: string;
  alt: string;
  showFrom: string;
  hideAfter: string;
  /** Packshots (fill images) for the thumbnail, the image slots and the preview. */
  media?: ReactNode[];
}

export interface HomeBlock {
  id: string;
  kind: HomeBlockKind;
  title: string;
  /** Under the title: "3 slides · 1 starts 1 Dec". Mobile uses `compactSummary`. */
  summary: string;
  compactSummary?: string;
  /** Live, has unpublished edits, or ended (hidden on mobile). */
  state: "live" | "unpublished" | "ended";
  visible: boolean;
  text?: string;
  items?: string[];
  collection?: string;
  count?: number;
  showFrom?: string;
  hideAfter?: string;
  slides?: HeroSlide[];
}

/**
 * HomePageBuilder (organism): the home page editor (Paper Jofak - Admin → Home page builder):
 * the blocks in order (drag or Alt + ↑/↓ to reorder; each links to its editor), the selected
 * block's editor — the hero carousel with its slides and slide form, or the fields for simpler
 * blocks — and a phone or desktop live preview that follows your edits. Edits save as drafts
 * on their own (`onSave` with the block as JSON); publishing is the page's job. Tablet puts the
 * preview beside the list and the editor under them; mobile shows the list, and the editor only
 * when `editorOnMobile` (a block was opened).
 */
export interface HomePageBuilderProps extends Omit<ComponentProps<"div">, "onSubmit"> {
  linkAs?: LinkComponent;
  blocks: HomeBlock[];
  selectedId: string;
  blockHref: (id: string) => string;
  collections: string[];
  /** Saves one block's draft (JSON). */
  onSave: (block: string) => void | Promise<void>;
  /** Saves the block order. */
  onReorder: (ids: string[]) => void | Promise<void>;
  /** Adds a block (a form action). */
  addAction?: () => void | Promise<void>;
  editorOnMobile?: boolean;
}

const INPUT =
  "h-10.5 w-full rounded-sm border border-border bg-bg px-3 text-14 leading-4.5 text-text outline-none focus:border-primary dark:bg-surface";
const LABEL = "text-sm leading-4.5 font-semibold text-text-secondary";
const TINTS = ["bg-sage-100", "bg-tint-amber"];

function Field({ label, aside, htmlFor, children, className }: { label: string; aside?: ReactNode; htmlFor: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-1 basis-0 flex-col gap-1.5", className)}>
      <span className="flex justify-between gap-2">
        <label htmlFor={htmlFor} className={LABEL}>
          {label}
        </label>
        {aside}
      </span>
      {children}
    </div>
  );
}

function Packs({ media, sizes }: { media?: ReactNode[]; sizes: string[] }) {
  return (
    <>
      {(media ?? []).slice(0, sizes.length).map((node, index) => (
        <span key={index} className={cn("relative shrink-0 overflow-hidden", sizes[index], TINTS[index % 2])}>
          {node}
        </span>
      ))}
    </>
  );
}

function SlideThumb({ slide }: { slide: HeroSlide }) {
  if (slide.look === "code") {
    return <span className="flex h-12 w-21 shrink-0 items-center justify-center rounded-8 bg-tint-sun text-11 leading-3.5 font-bold text-warning-text">{slide.mark}</span>;
  }
  if (slide.look === "text") {
    return <span className="flex h-12 w-21 shrink-0 items-center justify-center rounded-8 bg-surface font-serif text-base leading-4.5 text-text-secondary italic">{slide.mark}</span>;
  }
  return (
    <span className="flex h-12 w-21 shrink-0 items-end justify-center gap-0.75 overflow-hidden rounded-8 bg-primary">
      <Packs media={slide.media} sizes={["h-9.5 w-5.5 rounded-t-4", "h-10.5 w-5.5 rounded-t-4"]} />
    </span>
  );
}

const day = (value: string) => (value ? new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "");

export function HomePageBuilder({
  linkAs: LinkAs = "a",
  blocks,
  selectedId,
  blockHref,
  collections,
  onSave,
  onReorder,
  addAction,
  editorOnMobile = false,
  className,
  ...props
}: HomePageBuilderProps) {
  const id = useId();
  const initial = blocks.find((block) => block.id === selectedId) ?? blocks[0];
  const [draft, setDraft] = useState<HomeBlock | undefined>(initial);
  const [slideId, setSlideId] = useState(initial?.slides?.[0]?.id);
  const [device, setDevice] = useState<"phone" | "desktop">("phone");
  const [, startTransition] = useTransition();

  const order = useDragSort(blocks, (block) => block.id, (next) => startTransition(() => void onReorder(next.map((block) => block.id))));

  const status = useAutosave(draft, onSave);

  const update = (changes: Partial<HomeBlock>) => setDraft((current) => (current ? { ...current, ...changes } : current));
  const slide = draft?.slides?.find((item) => item.id === slideId) ?? draft?.slides?.[0];
  const slideIndex = draft?.slides?.findIndex((item) => item.id === slide?.id) ?? 0;
  const updateSlide = (changes: Partial<HeroSlide>) =>
    setDraft((current) =>
      current?.slides ? { ...current, slides: current.slides.map((item) => (item.id === slide?.id ? { ...item, ...changes } : item)) } : current,
    );
  const addSlide = () => {
    if (!draft?.slides || draft.slides.length >= 5) return;
    const next: HeroSlide = {
      id: `slide-${Date.now()}`,
      name: "New slide",
      look: "text",
      mark: "New",
      eyebrow: "",
      headline: "New slide",
      button: "Shop now",
      collection: collections[0] ?? "",
      alt: "",
      showFrom: "",
      hideAfter: "",
    };
    update({ slides: [...draft.slides, next] });
    setSlideId(next.id);
  };

  // The preview shows saved blocks with the open one swapped for its draft.
  const live = (kind: HomeBlockKind) => {
    const block = blocks.find((item) => item.kind === kind);
    return block && draft?.id === block.id ? draft : block;
  };
  const announcement = live("announcement");
  const hero = live("carousel");
  const heroSlide = hero?.id === draft?.id ? slide : hero?.slides?.[0];
  const why = live("why");
  const ring = (kind: HomeBlockKind) => (draft?.kind === kind ? "outline-2 -outline-offset-2 outline-accent" : undefined);
  const saving = status === "saving" ? "Saving draft…" : status === "saved" ? "Saved as draft" : undefined;

  const list = (
    <section aria-label="Home page blocks" className="flex flex-col gap-2.5 md:min-w-0 md:flex-1 xl:w-85 xl:flex-none">
      <div className="hidden items-baseline justify-between pb-0.5 md:flex">
        <h2 className="text-md leading-5.5 font-semibold text-text">Home page blocks</h2>
        <p className="text-xs leading-xs text-text-muted">Drag to reorder</p>
      </div>
      <ul className="flex flex-col overflow-clip rounded-18 border border-border-subtle md:gap-2 md:overflow-visible md:rounded-none md:border-0">
        {order.list.map((block) => {
          const active = block.id === draft?.id;
          const ended = block.state === "ended";
          return (
            <li
              key={block.id}
              {...order.item(block.id)}
              className={cn(
                "group relative flex items-center gap-2.5 border-t border-border-subtle px-4 py-3 first:border-t-0 data-dragging:opacity-muted",
                "md:rounded-14 md:border md:px-3 md:py-2.5 md:first:border-t",
                active ? "border-l-3 border-l-brand bg-sage-50 md:border-field md:border-primary" : ended ? "hidden md:flex md:border-dashed md:border-border md:opacity-72" : "md:border-border-subtle",
              )}
            >
              <button
                type="button"
                {...order.handle(block.id)}
                aria-label={`Move ${block.title}`}
                className="relative z-10 cursor-grab text-text-muted active:cursor-grabbing"
              >
                <Icon name="dragLines" size={14} className="md:hidden" />
                <Icon name="grip" size={14} className="hidden opacity-muted md:block" />
              </button>
              <span className="flex min-w-0 flex-1 flex-col">
                <LinkAs href={blockHref(block.id)} aria-current={active ? "page" : undefined} className={cn("truncate text-14 leading-5 font-semibold after:absolute after:inset-0", ended ? "text-text-secondary" : "text-text")}>
                  {block.title}
                </LinkAs>
                <span className="truncate text-xs leading-xs text-text-muted">
                  {block.compactSummary ? (
                    <>
                      <span className="md:hidden">{block.compactSummary}</span>
                      <span className="hidden md:inline">{block.summary}</span>
                    </>
                  ) : (
                    block.summary
                  )}
                </span>
              </span>
              {block.state === "unpublished" ? (
                <span className="shrink-0 rounded-full bg-tint-sun px-1.75 py-px text-11 leading-4 font-semibold text-warning-text">Unpublished</span>
              ) : ended ? (
                <span className="shrink-0 rounded-full bg-surface px-1.75 py-px text-11 leading-4 font-semibold text-text-secondary">Ended</span>
              ) : (
                <span aria-label={block.visible ? "Live" : "Hidden"} className={cn("size-2 shrink-0 rounded-full", block.visible ? "bg-brand" : "bg-border")} />
              )}
            </li>
          );
        })}
        {addAction && (
          <li className="border-t border-border-subtle md:border-0">
            <form action={addAction}>
              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 text-sm leading-4.5 font-semibold text-brand hover:bg-surface-subtle md:rounded-14 md:border md:border-dashed md:border-border"
              >
                <Icon name="plus" size={14} strokeWidth={1.8} />
                Add block
              </button>
            </form>
          </li>
        )}
      </ul>
    </section>
  );

  const editor = draft && (
    <section
      aria-labelledby={`${id}-editor`}
      className={cn("flex-col gap-4 rounded-lg border border-border-subtle p-5 md:order-3 md:flex md:basis-full xl:order-none xl:min-w-0 xl:flex-1 xl:basis-auto", editorOnMobile ? "flex" : "hidden")}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <h2 id={`${id}-editor`} className="text-lg leading-6 font-semibold tracking-compact text-text">
            {draft.title}
          </h2>
          <p aria-live="polite" className="text-xs leading-xs text-text-muted">
            {saving ?? (draft.kind === "carousel" ? "Up to 5 slides · rotates every 6 s" : draft.summary)}
          </p>
        </div>
        {draft.kind === "carousel" ? (
          <button type="button" onClick={addSlide} disabled={(draft.slides?.length ?? 0) >= 5} className="text-sm leading-4.5 font-semibold text-brand hover:underline disabled:opacity-muted">
            + Slide
          </button>
        ) : (
          draft.kind !== "banner" && (
            <label className="flex items-center gap-2 text-sm leading-4.5 font-semibold text-text-secondary">
              Show on store
              <Switch size="admin" checked={draft.visible} onCheckedChange={(visible) => update({ visible })} />
            </label>
          )
        )}
      </div>

      {draft.kind === "carousel" && draft.slides && slide && (
        <>
          <ul className="flex flex-col gap-2">
            {draft.slides.map((item, index) => {
              const active = item.id === slide.id;
              const scheduled = item.showFrom && new Date(item.showFrom) > new Date();
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSlideId(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-14 p-2.5 text-left",
                      active ? "border-field border-primary" : scheduled ? "border border-dashed border-border" : "border border-border-subtle hover:bg-surface-subtle",
                    )}
                  >
                    <SlideThumb slide={item} />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-14 leading-5 font-semibold text-text">{item.name}</span>
                      <span className={cn("truncate text-xs leading-xs", scheduled ? "font-semibold text-info" : "text-text-muted")}>
                        {scheduled ? `Scheduled · shows from ${day(item.showFrom)}` : `Links to ${item.collection}${item.hideAfter ? ` · until ${day(item.hideAfter)}` : ""}`}
                      </span>
                    </span>
                    {active && <span className="shrink-0 text-xs leading-xs font-semibold text-brand">Editing</span>}
                    <span className="sr-only">Slide {index + 1}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-3 border-t border-border-subtle pt-4">
            <p className={LABEL}>
              Slide {slideIndex + 1} · {slide.name}
            </p>
            <div className="flex gap-2.5">
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="text-xs leading-xs font-semibold text-text-muted">Desktop image · 1600 × 600</span>
                <span className="flex h-18 items-end justify-center gap-1.5 overflow-hidden rounded-sm bg-primary">
                  <Packs media={slide.media} sizes={["h-14.5 w-8.5 rounded-t-6", "h-16 w-8.5 rounded-t-6"]} />
                </span>
              </div>
              <div className="flex w-27.5 shrink-0 flex-col gap-1.5">
                <span className="text-xs leading-xs font-semibold text-text-muted">Mobile · 800×1000</span>
                <span className="flex h-18 items-end justify-center overflow-hidden rounded-sm bg-primary">
                  <Packs media={slide.media} sizes={["h-15 w-9 rounded-t-6"]} />
                </span>
              </div>
            </div>
            <Field label="Headline" htmlFor={`${id}-headline`}>
              <input id={`${id}-headline`} value={slide.headline} onChange={(event) => updateSlide({ headline: event.target.value })} className={INPUT} />
            </Field>
            <div className="flex gap-2.5">
              <Field label="Button" htmlFor={`${id}-button`}>
                <input id={`${id}-button`} value={slide.button} onChange={(event) => updateSlide({ button: event.target.value })} className={INPUT} />
              </Field>
              <Field label="Links to collection" htmlFor={`${id}-collection`}>
                <span className="relative flex">
                  <select id={`${id}-collection`} value={slide.collection} onChange={(event) => updateSlide({ collection: event.target.value })} className={cn(INPUT, "appearance-none pr-8")}>
                    {collections.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                  <Icon name="chevronDown" size={10} strokeWidth={1.4} className="pointer-events-none absolute top-4 right-3 text-text-muted" />
                </span>
              </Field>
            </div>
            <Field
              label="Image description (alt text)"
              htmlFor={`${id}-alt`}
              aside={!slide.alt.trim() && <span className="text-xs leading-xs font-semibold text-error">Required</span>}
            >
              <input
                id={`${id}-alt`}
                value={slide.alt}
                placeholder="Describe the image for screen readers"
                aria-invalid={!slide.alt.trim()}
                onChange={(event) => updateSlide({ alt: event.target.value })}
                className={cn(INPUT, !slide.alt.trim() && "border-field border-error bg-tint-citrus/30")}
              />
            </Field>
            <div className="flex gap-2.5">
              <Field label="Show from" htmlFor={`${id}-from`}>
                <input id={`${id}-from`} type="datetime-local" value={slide.showFrom} onChange={(event) => updateSlide({ showFrom: event.target.value })} className={INPUT} />
              </Field>
              <Field label="Hide after" htmlFor={`${id}-until`}>
                <input id={`${id}-until`} type="datetime-local" value={slide.hideAfter} onChange={(event) => updateSlide({ hideAfter: event.target.value })} className={INPUT} />
              </Field>
            </div>
          </div>
        </>
      )}

      {draft.kind !== "carousel" && (
        <div className="flex flex-col gap-3">
          <Field label="Name in this list" htmlFor={`${id}-title`}>
            <input id={`${id}-title`} value={draft.title} onChange={(event) => update({ title: event.target.value })} className={INPUT} />
          </Field>
          {(draft.kind === "announcement" || draft.kind === "promo" || draft.kind === "banner") && (
            <Field label="Text shoppers see" htmlFor={`${id}-text`}>
              <input id={`${id}-text`} value={draft.text ?? ""} onChange={(event) => update({ text: event.target.value })} className={INPUT} />
            </Field>
          )}
          {draft.kind === "why" &&
            (draft.items ?? []).map((item, index) => (
              <Field key={index} label={`Reason ${index + 1}`} htmlFor={`${id}-item-${index}`}>
                <input
                  id={`${id}-item-${index}`}
                  value={item}
                  onChange={(event) => update({ items: (draft.items ?? []).map((value, at) => (at === index ? event.target.value : value)) })}
                  className={INPUT}
                />
              </Field>
            ))}
          {draft.kind === "rail" && (
            <div className="flex gap-2.5">
              <Field label="Collection" htmlFor={`${id}-rail`}>
                <select id={`${id}-rail`} value={draft.collection} onChange={(event) => update({ collection: event.target.value })} className={INPUT}>
                  {collections.map((name) => (
                    <option key={name}>{name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Products shown" htmlFor={`${id}-count`}>
                <select id={`${id}-count`} value={draft.count} onChange={(event) => update({ count: Number(event.target.value) })} className={INPUT}>
                  {[4, 8, 12].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          )}
          {draft.kind === "categories" && (
            <Field label="Tiles shown" htmlFor={`${id}-tiles`}>
              <select id={`${id}-tiles`} value={draft.count} onChange={(event) => update({ count: Number(event.target.value) })} className={INPUT}>
                {[3, 6].map((count) => (
                  <option key={count} value={count}>
                    {count} top-level categories
                  </option>
                ))}
              </select>
            </Field>
          )}
          {draft.kind === "banner" && (
            <div className="flex gap-2.5">
              <Field label="Show from" htmlFor={`${id}-bfrom`}>
                <input id={`${id}-bfrom`} type="datetime-local" value={draft.showFrom ?? ""} onChange={(event) => update({ showFrom: event.target.value })} className={INPUT} />
              </Field>
              <Field label="Hide after" htmlFor={`${id}-buntil`}>
                <input id={`${id}-buntil`} type="datetime-local" value={draft.hideAfter ?? ""} onChange={(event) => update({ hideAfter: event.target.value })} className={INPUT} />
              </Field>
            </div>
          )}
          {draft.kind === "categories" && <p className="text-xs leading-xs text-text-muted">Tiles fill themselves from your categories and follow their order.</p>}
        </div>
      )}
    </section>
  );

  const heroBody = heroSlide && (
    <>
      <div className="flex flex-col gap-1.5">
        {heroSlide.eyebrow && <p className="text-10 leading-3 font-bold tracking-eyebrow text-accent uppercase">{heroSlide.eyebrow}</p>}
        <p className="text-22 leading-6.25 font-semibold tracking-snug text-text-inverse">{heroSlide.headline}</p>
        <p className="flex pt-1">
          <span className="rounded-full bg-accent px-3 py-1.75 text-11 leading-3.5 font-bold text-on-accent">{heroSlide.button}</span>
        </p>
      </div>
    </>
  );

  const preview = (
    <aside aria-label="Live preview" className="hidden flex-col gap-2.5 md:order-2 md:flex md:w-62.5 xl:order-none xl:w-75">
      <div className="flex items-center justify-between">
        <h2 className="text-xs leading-xs font-semibold tracking-overline text-text-muted uppercase">Live preview</h2>
        <div role="radiogroup" aria-label="Preview size" className="flex gap-0.5 rounded-full bg-surface-subtle p-0.75">
          {(["phone", "desktop"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={device === value}
              onClick={() => setDevice(value)}
              className={cn("rounded-full px-2.5 py-1 text-xs leading-xs capitalize", device === value ? "bg-bg font-semibold text-text shadow-xs dark:bg-surface" : "font-medium text-text-secondary")}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <div className={cn("flex flex-col overflow-clip bg-bg", device === "phone" ? "rounded-2xl border-6 border-text" : "rounded-md border-4 border-text")}>
        {announcement?.visible && (
          <p className={cn("bg-primary px-2.5 py-1.75 text-center text-10 leading-3.25 font-semibold text-text-inverse", ring("announcement"))}>{announcement.text}</p>
        )}
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="text-base leading-4.5 font-bold tracking-snug text-primary dark:text-text">Jofak</span>
          {device === "desktop" ? (
            <span className="flex gap-2 text-9 leading-3 text-text-secondary">
              <span>Shop by need</span>
              <span>Collections</span>
              <span>Brands</span>
            </span>
          ) : (
            <span aria-hidden className="flex gap-2">
              <span className="size-4 rounded-full border-field border-text" />
              <span className="size-4 rounded-4 border-field border-text" />
            </span>
          )}
        </div>
        {hero?.visible !== false && heroSlide && (
          <div className={cn("relative flex shrink-0 bg-primary p-4", device === "phone" ? "h-62.5 flex-col justify-between" : "h-36 items-center justify-between gap-3", ring("carousel"))}>
            {heroBody}
            <div className="flex items-end justify-center gap-2">
              <Packs media={heroSlide.media} sizes={device === "phone" ? ["h-24 w-16 rounded-10", "h-27 w-16 rounded-10"] : ["h-20 w-12 rounded-10", "h-24 w-12 rounded-10"]} />
            </div>
            {draft?.kind === "carousel" && <span className="absolute top-2 right-2 rounded-6 bg-accent px-1.75 py-0.5 text-9 leading-3 font-bold text-on-accent">Hero carousel</span>}
          </div>
        )}
        {why?.visible && (
          <p className={cn("flex gap-2.5 bg-surface-subtle px-3 py-2.5 text-9 leading-3 font-semibold text-text-secondary", ring("why"))}>
            {(why.items ?? []).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        )}
        <div className={cn("flex flex-col gap-2 p-3", ring("categories"))}>
          <p className="text-xs leading-xs font-semibold text-text">Shop by need</p>
          <span aria-hidden className="flex gap-1.5">
            {["bg-sage-100", "bg-tint-amber", "bg-tint-lavender", ...(device === "desktop" ? ["bg-tint-sun", "bg-tint-info", "bg-sage-50"] : [])].map((tint) => (
              <span key={tint} className={cn("h-11.5 flex-1 rounded-8", tint)} />
            ))}
          </span>
        </div>
      </div>
    </aside>
  );

  return (
    <div data-slot="home-page-builder" className={cn("flex flex-col gap-4 font-sans md:flex-row md:flex-wrap md:items-start xl:flex-nowrap xl:gap-5", className)} {...props}>
      {list}
      {editor}
      {preview}
    </div>
  );
}
