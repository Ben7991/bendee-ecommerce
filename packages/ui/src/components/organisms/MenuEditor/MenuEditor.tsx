"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";

import { cn, useAutosave, useDragSort } from "../../../lib";
import { Checkbox, Icon, Switch } from "../../atoms";

export interface MenuTarget {
  kind: "Page" | "Collection" | "Category" | "Brand";
  label: string;
  /** "/collections" — the key items link by. */
  url: string;
}

export interface HeaderMenuItem {
  id: string;
  label: string;
  url: string;
  /** Filled from the category tree ("Shop by need"): its entries, not editable here. */
  auto?: string[];
  children?: HeaderMenuItem[];
  display?: "cards" | "list";
  computer: boolean;
  phone: boolean;
  /** Hidden until (datetime-local). */
  showFrom?: string;
}

export interface MenuLink {
  id: string;
  label: string;
  url: string;
}

export interface MenuColumn {
  id: string;
  title: string;
  links: MenuLink[];
}

export interface MenuFooterExtras {
  newsletter: boolean;
  payments: boolean;
  socials: { instagram: string; tiktok: string; facebook: string };
}

export type MenuValue = { kind: "header"; items: HeaderMenuItem[] } | { kind: "footer"; columns: MenuColumn[]; extras: MenuFooterExtras };

/**
 * MenuEditor (organism): the storefront menus (Paper Jofak - Admin → Menus, Footer menu). The
 * header menu is a tree (drag or Alt + ↑/↓ to reorder; the category tree fills itself) with
 * badges for edits, schedules and phone-only items; the footer is up to four columns of links
 * plus newsletter, payment logos and social links. Picking an item opens its editor (label with
 * what it was, where it links, sub-item style and devices — or its footer column) and a small
 * storefront preview. Edits save as drafts on their own (`onSave` with the menu as JSON).
 * Mobile opens the editor under the list once you tap an item.
 */
export interface MenuEditorProps extends Omit<ComponentProps<"div">, "defaultValue"> {
  defaultValue: MenuValue;
  /** Item id → label as published, for "Edited" and "Was …". */
  published: Record<string, string>;
  targets: MenuTarget[];
  onSave: (menu: string) => void | Promise<void>;
  /** Item to open first (desktop and tablet). */
  selectedId?: string;
  domain?: string;
}

const CHIP = "shrink-0 rounded-full px-2 py-0.5 text-11 leading-3.75 font-semibold";
const LABEL = "text-sm leading-4.5 font-semibold text-text-secondary";
const CARD = "flex flex-col rounded-lg border border-border-subtle p-5";
const TITLE = "text-17 leading-6 font-semibold tracking-compact text-text";
const OUTLINE_BUTTON = "flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-border px-3.5 text-sm leading-4.5 font-semibold text-text hover:bg-surface-subtle";

const isFuture = (value?: string) => Boolean(value && new Date(value) > new Date());
const day = (value: string) => new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}`;

function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (value: T) => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-1 rounded-full bg-surface-subtle p-0.75">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex flex-1 basis-0 justify-center rounded-full px-2.5 py-1.5 text-xs leading-xs",
            value === option.value ? "bg-bg font-semibold text-text shadow-xs dark:bg-surface" : "font-medium text-text-muted hover:text-text",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/** A reorderable list of rows: one drag-sort per list. */
function Sortable<T>({
  items,
  keyOf,
  onChange,
  render,
  gripSize = 14,
  className,
}: {
  items: T[];
  keyOf: (item: T) => string;
  onChange: (items: T[]) => void;
  render: (item: T, grip: ReactNode) => ReactNode;
  gripSize?: number;
  className?: string;
}) {
  const sort = useDragSort(items, keyOf, onChange);
  return (
    <ul className={className}>
      {sort.list.map((item) => (
        <li key={keyOf(item)} {...sort.item(keyOf(item))} className="data-dragging:opacity-muted">
          {render(
            item,
            <button type="button" {...sort.handle(keyOf(item))} aria-label="Drag to reorder" className="relative z-10 shrink-0 cursor-grab text-evergreen-300 group-data-active:text-brand active:cursor-grabbing">
              <Icon name="grip" size={gripSize} />
            </button>,
          )}
        </li>
      ))}
    </ul>
  );
}

export function MenuEditor({ defaultValue, published, targets, onSave, selectedId, domain = "jofak.com", className, ...props }: MenuEditorProps) {
  const id = useId();
  const [menu, setMenu] = useState<MenuValue>(defaultValue);
  const firstId = defaultValue.kind === "header" ? defaultValue.items[0]?.id : defaultValue.columns[0]?.links[0]?.id;
  const [selected, setSelected] = useState<string | undefined>(selectedId ?? firstId);
  const [openOnMobile, setOpenOnMobile] = useState(false);

  const status = useAutosave(menu, onSave);

  const pick = (itemId: string) => {
    setSelected(itemId);
    setOpenOnMobile(true);
  };
  const targetOf = (url: string) => targets.find((target) => target.url === url);
  const edited = (item: { id: string; label: string }) => published[item.id] !== undefined && published[item.id] !== item.label;
  const saving = status === "saving" ? "Saving draft…" : status === "saved" ? "Saved as draft" : undefined;

  /* ---------- Header menu ---------- */
  const header = menu.kind === "header" ? menu : undefined;
  const setItems = (items: HeaderMenuItem[]) => setMenu({ kind: "header", items });
  const findItem = (items: HeaderMenuItem[], itemId?: string): HeaderMenuItem | undefined => {
    for (const item of items) {
      if (item.id === itemId) return item;
      const child = item.children && findItem(item.children, itemId);
      if (child) return child;
    }
    return undefined;
  };
  const mapItems = (items: HeaderMenuItem[], fn: (item: HeaderMenuItem) => HeaderMenuItem | null): HeaderMenuItem[] =>
    items.flatMap((item) => {
      const next = fn(item);
      if (!next) return [];
      return [{ ...next, children: next.children ? mapItems(next.children, fn) : undefined }];
    });
  const updateItem = (changes: Partial<HeaderMenuItem>) => header && setItems(mapItems(header.items, (item) => (item.id === selected ? { ...item, ...changes } : item)));

  const headerRow = (item: HeaderMenuItem, grip: ReactNode, child = false) => {
    const active = item.id === selected;
    const target = targetOf(item.url);
    const phoneOnly = item.phone && !item.computer;
    return (
      <div
        data-active={active ? "" : undefined}
        className={cn(
          "group relative flex items-center gap-2.5 rounded-sm px-3",
          child ? "py-2.25" : "py-2.75",
          active ? "border-field border-primary bg-sage-50" : phoneOnly ? "border border-dashed border-border" : "border border-border-subtle hover:bg-surface-subtle",
        )}
      >
        {grip}
        {!child &&
          (item.children || item.auto ? (
            <Icon name="chevronDown" size={12} strokeWidth={1.5} className="shrink-0 text-text-secondary" />
          ) : (
            <span aria-hidden className="w-3 shrink-0" />
          ))}
        <button
          type="button"
          onClick={() => pick(item.id)}
          aria-pressed={active}
          className={cn("min-w-0 flex-1 truncate text-left after:absolute after:inset-0", child ? "text-sm leading-4.5 font-medium text-text" : "text-14 leading-5 font-semibold text-text")}
        >
          {item.label}
        </button>
        {item.auto && <span className={cn(CHIP, "bg-tint-lavender text-lavender-text")}>Category tree · auto</span>}
        {edited(item) && (
          <span className={cn(CHIP, "flex items-center gap-1.25 bg-tint-sun text-warning-text")}>
            <span aria-hidden className="size-1.5 rounded-full bg-warning" /> Edited
          </span>
        )}
        {isFuture(item.showFrom) && <span className={cn(CHIP, "bg-tint-citrus text-error")}>Shows from {day(item.showFrom!)}</span>}
        {phoneOnly && <span className={cn(CHIP, "bg-tint-amber text-warning-text")}>Phone menu only</span>}
        {!item.auto && target && (
          <span className={cn(CHIP, "hidden bg-surface text-text-secondary md:inline", child && "inline")}>
            {child ? target.kind : target.kind === "Page" && target.label.startsWith(item.label) ? "Page" : target.label}
          </span>
        )}
      </div>
    );
  };

  /* ---------- Footer menu ---------- */
  const footer = menu.kind === "footer" ? menu : undefined;
  const setFooter = (changes: Partial<Omit<Extract<MenuValue, { kind: "footer" }>, "kind">>) => footer && setMenu({ ...footer, ...changes });
  const footerLink = footer?.columns.flatMap((column) => column.links.map((link) => ({ link, column }))).find((entry) => entry.link.id === selected);
  const updateLink = (changes: Partial<MenuLink>) =>
    footer && setFooter({ columns: footer.columns.map((column) => ({ ...column, links: column.links.map((link) => (link.id === selected ? { ...link, ...changes } : link)) })) });
  const moveLink = (columnId: string) => {
    if (!footer || !footerLink || footerLink.column.id === columnId) return;
    setFooter({
      columns: footer.columns.map((column) =>
        column.id === columnId ? { ...column, links: [...column.links, footerLink.link] } : { ...column, links: column.links.filter((link) => link.id !== selected) },
      ),
    });
  };

  /* ---------- Shared editor bits ---------- */
  const current = header ? findItem(header.items, selected) : footerLink?.link;
  const remove = () => {
    if (header) setItems(mapItems(header.items, (item) => (item.id === selected ? null : item)));
    if (footer) setFooter({ columns: footer.columns.map((column) => ({ ...column, links: column.links.filter((link) => link.id !== selected) })) });
    setSelected(undefined);
  };
  const update = (changes: { label?: string; url?: string }) => (header ? updateItem(changes) : updateLink(changes));
  const target = current && targetOf(current.url);
  const headerItem = header ? findItem(header.items, selected) : undefined;
  const kinds = [...new Set(targets.map((item) => item.kind))];

  const itemEditor = (where: string) => current && (
    <section aria-labelledby={`${id}-${where}-edit`} className={cn(CARD, "gap-3.5", openOnMobile ? "flex" : "hidden md:flex")}>
      <div className="flex items-center justify-between gap-3">
        <h2 id={`${id}-${where}-edit`} className="truncate text-md leading-5.5 font-semibold tracking-compact text-text">
          {header ? `Edit “${current.label}”` : "Edit link"}
        </h2>
        <button type="button" onClick={remove} className="shrink-0 text-sm leading-4.5 font-semibold text-error hover:underline">
          Remove
        </button>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-${where}-label`} className={LABEL}>
          Label
        </label>
        <input
          id={`${id}-${where}-label`}
          value={current.label}
          onChange={(event) => update({ label: event.target.value })}
          className="h-10.5 rounded-sm border-field border-primary bg-bg px-3 text-14 leading-5 text-text ring-3 ring-sage-100 outline-none dark:bg-surface"
        />
        {edited(current) && <p className="text-xs leading-xs text-warning">Was “{published[current.id]}”</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-${where}-link`} className={LABEL}>
          Links to
        </label>
        <span className="relative flex h-10.5 items-center gap-2 rounded-sm border border-border px-3">
          {target && <span className="rounded-6 bg-surface px-1.75 py-px text-11 leading-3.75 font-semibold text-text-secondary">{target.kind}</span>}
          <span className="min-w-0 flex-1 truncate text-14 leading-5 text-text">{target?.label ?? current.url}</span>
          <Icon name="chevronDown" size={10} strokeWidth={1.4} className="shrink-0 text-text-muted" />
          <select id={`${id}-${where}-link`} value={current.url} onChange={(event) => update({ url: event.target.value })} className="absolute inset-0 cursor-pointer appearance-none opacity-0">
            {kinds.map((kind) => (
              <optgroup key={kind} label={kind}>
                {targets
                  .filter((item) => item.kind === kind)
                  .map((item) => (
                    <option key={item.url} value={item.url}>
                      {item.label}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </span>
        <p className="font-mono text-11 leading-3.75 text-text-muted">
          {domain}
          {current.url}
        </p>
      </div>
      {headerItem && (
        <>
          {headerItem.children && (
            <div className="flex flex-col gap-1.5">
              <p className={LABEL}>Show sub-items as</p>
              <Segmented
                label="Show sub-items as"
                value={headerItem.display ?? "list"}
                options={[
                  { value: "cards", label: "Cards with images" },
                  { value: "list", label: "Simple list" },
                ]}
                onChange={(display) => updateItem({ display })}
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p className={LABEL}>Show on</p>
            <div className="flex gap-4">
              {(["computer", "phone"] as const).map((device) => (
                <label key={device} className="flex items-center gap-2 text-sm leading-4.5 text-text capitalize">
                  <Checkbox checked={headerItem[device]} onCheckedChange={(checked) => updateItem({ [device]: checked === true })} />
                  {device}
                </label>
              ))}
            </div>
          </div>
        </>
      )}
      {footer && footerLink && (
        <div className="flex flex-col gap-1.5">
          <p className={LABEL}>Column</p>
          <Segmented label="Column" value={footerLink.column.id} options={footer.columns.map((column) => ({ value: column.id, label: column.title }))} onChange={moveLink} />
        </div>
      )}
    </section>
  );

  /* ---------- Previews ---------- */
  const previewItem = header && (findItem(header.items, selected)?.children ? findItem(header.items, selected) : header.items.find((item) => item.children));
  const preview = header ? (
    <section aria-label="Header preview" className="hidden flex-col gap-2.5 rounded-lg bg-surface-subtle p-4 md:flex">
      <h2 className="text-11 leading-3.5 font-semibold tracking-wide text-text-muted uppercase">Preview · storefront header</h2>
      <div className="flex flex-col overflow-clip rounded-sm border border-border-subtle bg-bg">
        <div className="flex items-center gap-3 overflow-hidden border-b border-border-subtle px-3 py-2.5">
          <span className="text-sm leading-xs font-bold text-primary dark:text-text">Jofak</span>
          {header.items
            .filter((item) => item.computer && !isFuture(item.showFrom))
            .map((item) => (
              <span
                key={item.id}
                className={cn(
                  "text-10 leading-3.5 whitespace-nowrap",
                  item.id === previewItem?.id ? "border-b-2 border-primary pb-px font-semibold text-text" : "text-text-secondary",
                )}
              >
                {item.label}
              </span>
            ))}
        </div>
        {previewItem?.children && (
          <div className={cn("flex gap-2 px-3 py-2.5", previewItem.display === "list" && "flex-col gap-1")}>
            {previewItem.children.map((child, index) =>
              previewItem.display === "list" ? (
                <span key={child.id} className="text-9 leading-3 font-semibold text-text">
                  {child.label}
                </span>
              ) : (
                <span key={child.id} className="flex flex-1 basis-0 flex-col gap-1">
                  <span aria-hidden className={cn("h-11 rounded-8", ["bg-tint-amber", "bg-sage-100", "bg-tint-sun"][index % 3])} />
                  <span className="text-9 leading-3 font-semibold text-text">{child.label}</span>
                </span>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  ) : (
    footer && (
      <section aria-label="Footer preview" className="hidden flex-col gap-2.5 rounded-lg bg-surface-subtle p-4 md:flex">
        <h2 className="text-11 leading-3.5 font-semibold tracking-wide text-text-muted uppercase">Preview · storefront footer</h2>
        <div className="flex flex-col gap-3 rounded-sm bg-primary p-3.5">
          <div className="flex gap-2.5">
            {footer.columns.map((column) => (
              <div key={column.id} className="flex min-w-0 flex-1 basis-0 flex-col gap-1">
                <span className="text-9 leading-3 font-bold tracking-eyebrow text-accent uppercase">{column.title}</span>
                {column.links.map((link) => (
                  <span key={link.id} className={cn("truncate text-9 leading-3.25", link.id === selected ? "font-semibold text-text-inverse" : "text-text-inverse-muted")}>
                    {link.label}
                  </span>
                ))}
              </div>
            ))}
          </div>
          {footer.extras.newsletter && (
            <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1.5">
              <span className="flex-1 text-9 leading-3 text-text-inverse-muted">Your email for offers</span>
              <span className="rounded-full bg-accent px-2 py-0.5 text-8 leading-2.75 font-bold text-on-accent">Join</span>
            </div>
          )}
          {footer.extras.payments && (
            <div className="flex gap-1">
              {[
                ["MTN", "text-warning-text"],
                ["Telecel", "text-error"],
                ["AT", "text-lavender-text"],
                ["VISA", "text-text"],
              ].map(([name, tone]) => (
                <span key={name} className={cn("rounded-4 bg-white px-1.25 py-0.5 text-7 leading-2.25 font-bold", tone)}>
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  );

  return (
    <div data-slot="menu-editor" className={cn("flex min-w-0 flex-1 flex-col gap-4 font-sans xl:flex-row xl:items-start", className)} {...props}>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {header && (
          <section aria-labelledby={`${id}-tree`} className={cn(CARD, "gap-1.5 rounded-18 p-4 md:rounded-lg md:p-5")}>
            <div className="flex items-center justify-between gap-3 pb-2">
              <div className="flex flex-col gap-0.5">
                <h2 id={`${id}-tree`} className={TITLE}>
                  <span className="md:hidden">{header.items.length} items</span>
                  <span className="hidden md:inline">Header menu</span>
                </h2>
                <p aria-live="polite" className="text-sm leading-4.5 text-text-muted">
                  {saving ?? (
                    <>
                      <span className="md:hidden">Hold to drag · tap to edit</span>
                      <span className="hidden md:inline">Drag to reorder · drop onto an item to nest (2 levels)</span>
                    </>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const item: HeaderMenuItem = { id: newId("item"), label: "New item", url: targets[0]?.url ?? "/", computer: true, phone: true };
                  setItems([...header.items, item]);
                  pick(item.id);
                }}
                className={OUTLINE_BUTTON}
              >
                <Icon name="plus" size={12} strokeWidth={1.6} />
                Add item
              </button>
            </div>
            <Sortable
              items={header.items}
              keyOf={(item) => item.id}
              onChange={setItems}
              className="flex flex-col gap-1.5"
              render={(item, grip) => (
                <div className="flex flex-col gap-1.5">
                  {headerRow(item, grip)}
                  {item.auto && (
                    <ul aria-label={`${item.label} entries`} className="flex flex-wrap gap-1.5 pt-1 pr-3 pb-2 pl-3 md:pl-14.5">
                      {item.auto.map((entry) => (
                        <li key={entry} className="rounded-full bg-surface-subtle px-2.5 py-0.75 text-xs leading-xs text-text-secondary">
                          {entry}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.children && (
                    <Sortable
                      items={item.children}
                      keyOf={(child) => child.id}
                      onChange={(children) => setItems(header.items.map((entry) => (entry.id === item.id ? { ...entry, children } : entry)))}
                      className="flex flex-col gap-1.5 pl-5 md:pl-9"
                      render={(child, childGrip) => headerRow(child, childGrip, true)}
                    />
                  )}
                </div>
              )}
            />
          </section>
        )}

        {footer && (
          <>
            <section aria-labelledby={`${id}-columns`} className={cn(CARD, "gap-3.5 rounded-18 p-4 md:rounded-lg md:p-5")}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <h2 id={`${id}-columns`} className={TITLE}>
                    Footer links
                  </h2>
                  <p aria-live="polite" className="text-sm leading-4.5 text-text-muted">
                    {saving ?? (
                      <>
                        <span className="md:hidden">Hold to drag · tap a link to edit</span>
                        <span className="hidden md:inline">Up to 4 columns · drag links between columns</span>
                      </>
                    )}
                  </p>
                </div>
                {footer.columns.length < 4 && (
                  <button
                    type="button"
                    onClick={() => setFooter({ columns: [...footer.columns, { id: newId("col"), title: "New column", links: [] }] })}
                    className={cn(OUTLINE_BUTTON, "hidden md:flex")}
                  >
                    <Icon name="plus" size={12} strokeWidth={1.6} />
                    Add column
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2.5 md:flex-row md:items-start">
                {footer.columns.map((column) => (
                  <div key={column.id} className="flex min-w-0 flex-1 basis-0 flex-col gap-1.5 rounded-14 bg-surface-subtle p-3">
                    <div className="flex items-center justify-between pb-1">
                      <h3 className="text-sm leading-4.5 font-bold tracking-label text-text uppercase">{column.title}</h3>
                      <span className="text-xs leading-xs text-text-muted">{column.links.length}</span>
                    </div>
                    <Sortable
                      items={column.links}
                      keyOf={(link) => link.id}
                      onChange={(links) => setFooter({ columns: footer.columns.map((entry) => (entry.id === column.id ? { ...entry, links } : entry)) })}
                      gripSize={10}
                      className="flex flex-col gap-1.5"
                      render={(link, grip) => {
                        const active = link.id === selected;
                        return (
                          <div data-active={active ? "" : undefined} className={cn("group relative flex items-center gap-2 rounded-10 px-2.5 py-2", active ? "border-field border-primary bg-sage-50" : "border border-border-subtle bg-bg dark:bg-surface")}>
                            {grip}
                            <button
                              type="button"
                              aria-pressed={active}
                              onClick={() => pick(link.id)}
                              className={cn("min-w-0 flex-1 truncate text-left text-sm leading-4.5 text-text after:absolute after:inset-0", active && "font-semibold")}
                            >
                              {link.label}
                            </button>
                            {edited(link) && <span aria-label="Edited" className="size-1.5 shrink-0 rounded-full bg-warning" />}
                          </div>
                        );
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const link: MenuLink = { id: newId("link"), label: "New link", url: targets[0]?.url ?? "/" };
                        setFooter({ columns: footer.columns.map((entry) => (entry.id === column.id ? { ...entry, links: [...entry.links, link] } : entry)) });
                        pick(link.id);
                      }}
                      className="w-fit px-0.5 pt-1 text-xs leading-xs font-semibold text-brand hover:underline"
                    >
                      + Add link
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div className={cn("flex-col gap-4 md:flex xl:hidden", openOnMobile ? "flex" : "hidden")}>{itemEditor("footer")}</div>

            <section aria-labelledby={`${id}-extras`} className={cn(CARD, "gap-3.5 rounded-18 p-4 md:rounded-lg md:p-5")}>
              <h2 id={`${id}-extras`} className={TITLE}>
                Also in the footer
              </h2>
              {(
                [
                  ["newsletter", "Newsletter sign-up", "Email box with marketing consent tick"],
                  ["payments", "Payment logos", "MTN MoMo, Telecel Cash, AT Money, Visa, Mastercard"],
                ] as const
              ).map(([key, label, note]) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-14 leading-5 font-semibold text-text">{label}</p>
                    <p className="text-xs leading-xs text-text-muted">{note}</p>
                  </div>
                  <Switch
                    checked={footer.extras[key]}
                    onCheckedChange={(checked) => setFooter({ extras: { ...footer.extras, [key]: checked } })}
                    aria-label={label}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <p className="text-14 leading-5 font-semibold text-text">Social links</p>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["instagram", "IG"],
                      ["tiktok", "TikTok"],
                      ["facebook", "Facebook"],
                    ] as const
                  ).map(([key, prefix]) => {
                    const value = footer.extras.socials[key];
                    return (
                      <label
                        key={key}
                        className={cn(
                          "flex h-9.5 min-w-0 flex-1 basis-36 items-center gap-2 rounded-10 border px-2.5 focus-within:border-primary md:basis-0",
                          value ? "border-border" : "basis-full border-dashed border-border md:basis-0",
                        )}
                      >
                        {value ? <span className="text-xs leading-xs font-semibold text-text-muted">{prefix}</span> : <span className="sr-only">{prefix}</span>}
                        <input
                          value={value}
                          placeholder={`+ ${prefix}`}
                          onChange={(event) => setFooter({ extras: { ...footer.extras, socials: { ...footer.extras.socials, [key]: event.target.value } } })}
                          className="min-w-0 flex-1 bg-transparent text-sm leading-4.5 text-text outline-none placeholder:text-xs placeholder:text-text-muted"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
              <p className="text-xs leading-4.25 text-text-muted">Address, phone and WhatsApp number come from Settings › Store profile.</p>
            </section>
          </>
        )}

        {header && <div className={cn("flex-col gap-4 md:flex xl:hidden", openOnMobile ? "flex" : "hidden")}>{itemEditor("below")}</div>}
        <div className="xl:hidden">{preview}</div>
      </div>

      <div className="hidden w-80 shrink-0 flex-col gap-3.5 xl:flex">
        {itemEditor("side")}
        {preview}
      </div>
    </div>
  );
}
