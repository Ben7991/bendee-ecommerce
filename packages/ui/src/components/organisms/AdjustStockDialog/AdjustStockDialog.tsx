"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useId, useMemo, useRef, useState, type ComponentProps, type KeyboardEvent, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, ProductThumb, StatusChip, type ProductThumbProps, type StatusChipProps } from "../../atoms";
import { QuantityStepper, ReasonPicker, type ReasonOption } from "../../molecules";

export type AdjustMode = "remove" | "add" | "count";

export interface AdjustableVariant {
  id: string;
  /** "Greens Daily · 30 servings". */
  name: string;
  /** Mobile and the order search heading: "Greens Daily". */
  compactName?: string;
  image?: ReactNode;
  tint?: ProductThumbProps["tint"];
  onHand: number;
  reserved: number;
  /** Average unit cost, for valuing added stock. */
  averageCost: number;
}

export interface LinkableOrder {
  number: string;
  status: { label: string; tone: NonNullable<StatusChipProps["tone"]> };
  /** "Efua Boateng · 3 × Greens Daily · today 09:40". */
  summary: string;
  /** Mobile: "Efua Boateng · 3 × Greens Daily". */
  compactSummary?: string;
}

/**
 * AdjustStockDialog (organism): correct one variant's stock (Paper Jofak - Admin → Adjust stock).
 * Remove or Add units with a reason (and an optional linked order, found by number or customer
 * with ↑ ↓ and ↵), or Set count from a shelf count, which works out the difference. Shows on hand
 * now → after. The note is required for the reasons in `noteRequiredFor`. A centred dialog from
 * 768px, a bottom sheet on mobile. Pass `variants` to let staff pick the product first. Posts `variant`, `mode`, `quantity` (or `counted`), `reason`,
 * `order` and `note` to `action`.
 */
export interface AdjustStockDialogProps extends Omit<ComponentProps<"div">, "children"> {
  linkAs?: LinkComponent;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant: AdjustableVariant;
  /** Opened without a row (the page's Adjust stock): a product picker over these variants. */
  variants?: AdjustableVariant[];
  defaultMode?: AdjustMode;
  defaultQuantity?: number;
  reasons: { remove: ReasonOption[]; add: ReasonOption[] };
  /** Reason values whose note is required ("damaged"). */
  noteRequiredFor?: string[];
  /** Recent orders containing this variant, for linking (or per variant id, with `variants`). */
  orders?: LinkableOrder[] | Record<string, LinkableOrder[]>;
  defaultOrder?: string;
  searchAllOrdersHref?: string;
  /** "Abena M.": shown as who the change is logged to. */
  staffName: string;
  action?: string | ((formData: FormData) => void | Promise<void>);
  fields?: Record<string, string>;
  currency?: string;
}

const MODES: { value: AdjustMode; label: string }[] = [
  { value: "remove", label: "Remove" },
  { value: "add", label: "Add" },
  { value: "count", label: "Set count" },
];

const signed = (value: number) => (value > 0 ? `+${value}` : value < 0 ? `−${Math.abs(value)}` : "0");

/** "JFK-251490" with the typed part in bold. */
function highlight(text: string, query: string) {
  const at = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <strong className="font-bold">{text.slice(at, at + query.length)}</strong>
      {text.slice(at + query.length)}
    </>
  );
}

export function AdjustStockDialog({
  linkAs: LinkAs = "a",
  open,
  onOpenChange,
  variant: initialVariant,
  variants,
  defaultMode = "remove",
  defaultQuantity = 1,
  reasons,
  noteRequiredFor = [],
  orders = [],
  defaultOrder,
  searchAllOrdersHref,
  staffName,
  action,
  fields = {},
  currency = "GHS",
  className,
  ...props
}: AdjustStockDialogProps) {
  const id = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const [variantId, setVariantId] = useState(initialVariant.id);
  const variant = variants?.find((item) => item.id === variantId) ?? initialVariant;
  const [mode, setMode] = useState<AdjustMode>(defaultMode);
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [counted, setCounted] = useState(initialVariant.onHand);
  const [reason, setReason] = useState<Record<"remove" | "add", string>>({
    remove: reasons.remove[0]?.value ?? "",
    add: reasons.add[0]?.value ?? "",
  });
  const [linked, setLinked] = useState(defaultOrder);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [active, setActive] = useState(0);
  const [note, setNote] = useState("");

  const remove = mode === "remove";
  const count = mode === "count";
  const after = count ? counted : remove ? variant.onHand - quantity : variant.onHand + quantity;
  const difference = counted - variant.onHand;
  const currentReason = count ? "recount" : reason[mode];
  const noteRequired = !count && noteRequiredFor.includes(currentReason);
  const orderList = useMemo(() => (Array.isArray(orders) ? orders : (orders[variant.id] ?? [])), [orders, variant.id]);
  const linkedOrder = orderList.find((order) => order.number === linked);
  const short = variant.compactName ?? variant.name;

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return orderList.slice(0, 4);
    return orderList.filter((order) => order.number.toLowerCase().includes(term) || order.summary.toLowerCase().includes(term)).slice(0, 4);
  }, [orderList, query]);

  const link = (order: LinkableOrder) => {
    setLinked(order.number);
    setSearching(false);
    setQuery("");
  };

  const onSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => Math.min(results.length - 1, current + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(0, current - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const pick = results[active];
      if (pick) link(pick);
    } else if (event.key === "Escape") {
      // Close the results, not the dialog.
      event.preventDefault();
      event.stopPropagation();
      setSearching(false);
      setQuery("");
    }
  };

  const submitLabel = count
    ? difference === 0
      ? "Save count"
      : `Save count · ${signed(difference)}`
    : `${remove ? "Remove" : "Add"} ${quantity} ${quantity === 1 ? "unit" : "units"}`;

  const label = "text-sm leading-4.5 font-semibold text-text";
  const optional = <span className="font-regular text-text-muted">(optional)</span>;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-evergreen-950/45 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65" />
        <Dialog.Content
          data-slot="adjust-stock-dialog"
          aria-describedby={`${id}-subtitle`}
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex max-h-dvh flex-col overflow-hidden rounded-t-2xl bg-bg font-sans text-text shadow-panel-up outline-none md:overflow-visible dark:bg-surface",
            "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
            "md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:w-125 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:shadow-modal",
            "md:data-[state=closed]:animate-dialog-out md:data-[state=open]:animate-dialog-in",
            className,
          )}
          {...props}
        >
          <form action={action} className="flex min-h-0 flex-1 flex-col">
            {Object.entries(fields).map(([name, value]) => (
              <input key={name} type="hidden" name={name} value={value} />
            ))}
            <input type="hidden" name="variant" value={variant.id} />
            <input type="hidden" name="mode" value={mode} />
            <input type="hidden" name="reason" value={currentReason} />
            {linked && !count && <input type="hidden" name="order" value={linked} />}

            <span aria-hidden className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-sage-200 md:hidden" />
            <header className="flex shrink-0 items-center gap-3.5 border-b border-border-subtle px-5 pt-3 pb-3.5 md:px-6 md:pt-5.5 md:pb-4.5">
              <ProductThumb size="stock" bleed tint={variant.tint ?? "surface"} image={variant.image} className="md:size-12" />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <Dialog.Title className="text-lg leading-6 font-semibold tracking-compact text-text md:text-19">Adjust stock</Dialog.Title>
                <p id={`${id}-subtitle`} className="text-sm leading-4.5 text-text-muted">
                  <span className="md:hidden">
                    {short} · {variant.onHand} on hand
                  </span>
                  <span className="hidden md:inline">
                    {variant.name} · {variant.onHand} on hand, {variant.onHand - variant.reserved} available
                  </span>
                </p>
              </div>
              <Dialog.Close
                aria-label="Close"
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-surface-subtle max-md:size-9 max-md:bg-surface max-md:text-text"
              >
                <Icon name="close" size={16} strokeWidth={1.6} />
              </Dialog.Close>
            </header>

            {/* From 768px the body doesn't scroll, so the order results can hang over the dialog's edge. */}
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-4 md:gap-4.5 md:overflow-visible md:px-6 md:py-5">
              {variants && variants.length > 1 && (
                <span className="flex flex-col gap-1.5">
                  <label htmlFor={`${id}-variant`} className={label}>
                    Product
                  </label>
                  <span className="relative">
                    <select
                      id={`${id}-variant`}
                      value={variantId}
                      onChange={(event) => {
                        const next = variants.find((item) => item.id === event.target.value);
                        setVariantId(event.target.value);
                        if (next) setCounted(next.onHand);
                        setLinked(undefined);
                        setQuantity(1);
                      }}
                      className="h-10.5 w-full appearance-none rounded-sm border border-border bg-bg pr-8 pl-3 text-14 leading-4.5 text-text outline-none focus:border-primary dark:focus:border-brand"
                    >
                      {variants.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} · {item.onHand} on hand
                        </option>
                      ))}
                    </select>
                    <Icon name="chevronDown" size={12} strokeWidth={1.6} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-muted" />
                  </span>
                </span>
              )}
              <div role="radiogroup" aria-label="Adjustment" className="flex gap-1 rounded-full bg-surface p-1">
                {MODES.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    role="radio"
                    aria-checked={mode === item.value}
                    onClick={() => setMode(item.value)}
                    className={cn(
                      "flex h-9.5 flex-1 basis-0 items-center justify-center rounded-full text-14 leading-4.5",
                      mode === item.value ? "bg-bg font-semibold text-text shadow-xs dark:bg-surface-subtle" : "font-medium text-text-muted hover:text-text",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {count ? (
                <>
                  <p className="text-sm leading-4.5 text-text-secondary">
                    Enter what you physically counted on the shelf. We&apos;ll work out the difference and log it as a recount.
                  </p>
                  <div className="flex flex-col gap-3 md:flex-row md:gap-4">
                    <span className="flex flex-col gap-1.5 md:w-42.5 md:shrink-0">
                      <label htmlFor={`${id}-counted`} className={label}>
                        Counted on shelf
                      </label>
                      <span className="flex h-16 items-center justify-between rounded-md border-field border-primary px-4 focus-within:shadow-xs dark:border-brand">
                        <input
                          id={`${id}-counted`}
                          name="counted"
                          type="text"
                          inputMode="numeric"
                          value={String(counted)}
                          onChange={(event) => setCounted(Number(event.target.value.replace(/\D/g, "")) || 0)}
                          onFocus={(event) => event.target.select()}
                          className="w-0 min-w-0 flex-1 bg-transparent text-28 leading-8.5 font-semibold tracking-compact text-text outline-none"
                        />
                        <span className="text-sm leading-4 text-text-muted">units</span>
                      </span>
                    </span>
                    <dl
                      className={cn(
                        "flex flex-1 flex-col justify-center gap-2 rounded-md px-4 py-3 text-sm leading-4.5",
                        difference < 0 ? "bg-tint-sun" : difference > 0 ? "bg-sage-50" : "bg-surface-subtle",
                      )}
                    >
                      <div className="flex justify-between">
                        <dt className="text-text-secondary">System on hand</dt>
                        <dd className="font-semibold text-text">{variant.onHand}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-text-secondary">Counted</dt>
                        <dd className="font-semibold text-text">{counted}</dd>
                      </div>
                      <div
                        className={cn(
                          "flex justify-between border-t pt-2 text-14 leading-5 font-bold",
                          difference < 0 ? "border-warning/20 text-warning-text" : difference > 0 ? "border-brand/20 text-brand" : "border-border-subtle text-text",
                        )}
                      >
                        <dt>Difference</dt>
                        <dd>
                          {signed(difference)} {Math.abs(difference) === 1 ? "unit" : "units"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  {variant.reserved > 0 && (
                    <p className="flex gap-2.5 rounded-14 bg-surface-subtle px-3.5 py-3 text-sm leading-4.5 text-text-secondary">
                      <Icon name="info" size={16} className="mt-0.5 shrink-0" />
                      <span>
                        {variant.reserved} units are reserved for open orders, so available stock becomes{" "}
                        <strong className="font-bold text-text">{Math.max(0, counted - variant.reserved)}</strong>. Packed orders still in the store count as on
                        the shelf.
                      </span>
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-end gap-3 md:items-center md:gap-4">
                    <span className="flex flex-col gap-1.5">
                      <span id={`${id}-units`} className={cn(label, "hidden md:block")}>
                        Units to {remove ? "remove" : "add"}
                      </span>
                      <QuantityStepper
                        variant="outline"
                        size="lg"
                        value={quantity}
                        min={1}
                        max={remove ? Math.max(1, variant.onHand) : 9999}
                        label={`Units to ${remove ? "remove" : "add"}`}
                        name="quantity"
                        onValueChange={setQuantity}
                        onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
                        onIncrement={() => setQuantity(remove ? Math.min(variant.onHand, quantity + 1) : quantity + 1)}
                        className="max-md:h-13 max-md:w-38"
                      />
                    </span>
                    <div className="flex h-13 flex-1 items-center justify-center gap-3 rounded-md bg-surface-subtle px-4 md:h-19 md:justify-around">
                      <span className="flex flex-col items-center">
                        <span className="hidden text-xs leading-xs text-text-muted md:block">On hand now</span>
                        <span className="text-lg leading-6 font-semibold text-text md:text-22 md:leading-7.5">{variant.onHand}</span>
                      </span>
                      <Icon name="arrowRight" size={18} strokeWidth={1.6} className="text-text-muted" />
                      <span className="flex flex-col items-center">
                        <span className="hidden text-xs leading-xs text-text-muted md:block">After</span>
                        <span className={cn("text-lg leading-6 font-semibold md:text-22 md:leading-7.5", remove ? "text-error" : "text-brand")}>{after}</span>
                      </span>
                    </div>
                  </div>

                  <ReasonPicker
                    key={mode}
                    label="Reason"
                    required={false}
                    options={reasons[mode]}
                    value={reason[mode]}
                    onValueChange={(value) => setReason((current) => ({ ...current, [mode]: value }))}
                  />

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between">
                      <span id={`${id}-order`} className={label}>
                        Linked order {optional}
                      </span>
                      {linkedOrder && !searching && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearching(true);
                            requestAnimationFrame(() => searchRef.current?.focus());
                          }}
                          className="text-xs leading-xs font-semibold text-brand hover:underline"
                        >
                          Change
                        </button>
                      )}
                    </div>
                    {linkedOrder && !searching ? (
                      <div className="flex items-center gap-3 rounded-14 border border-border px-3 py-2.5">
                        <span aria-hidden className="hidden size-9 shrink-0 items-center justify-center rounded-10 bg-surface text-text-secondary md:flex">
                          <Icon name="box" size={18} />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="flex items-center gap-2">
                            <span className="text-14 leading-5 font-semibold text-brand">{linkedOrder.number}</span>
                            <StatusChip tone={linkedOrder.status.tone} size="sm" className="px-2 py-px leading-4">
                              {linkedOrder.status.label}
                            </StatusChip>
                          </span>
                          <span className="truncate text-xs leading-xs text-text-muted">
                            <span className="md:hidden">{linkedOrder.compactSummary ?? linkedOrder.summary}</span>
                            <span className="hidden md:inline">{linkedOrder.summary}</span>
                          </span>
                        </span>
                        <button type="button" aria-label={`Unlink ${linkedOrder.number}`} onClick={() => setLinked(undefined)} className="shrink-0 text-evergreen-300 hover:text-error">
                          <Icon name="close" size={14} strokeWidth={1.6} />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <span className="flex h-11 items-center gap-2.5 rounded-sm border border-border pr-3 pl-3.5 focus-within:border-field focus-within:border-primary focus-within:shadow-xs dark:focus-within:border-brand">
                          <Icon name="search" size={15} strokeWidth={1.5} className="text-text-muted" />
                          <input
                            ref={searchRef}
                            type="text"
                            role="combobox"
                            aria-labelledby={`${id}-order`}
                            aria-controls={`${id}-orders`}
                            aria-expanded={searching && results.length > 0}
                            aria-activedescendant={searching && results[active] ? `${id}-order-${active}` : undefined}
                            value={query}
                            onChange={(event) => {
                              setQuery(event.target.value);
                              setActive(0);
                              setSearching(true);
                            }}
                            onFocus={() => setSearching(true)}
                            onKeyDown={onSearchKey}
                            placeholder="Search order number or customer"
                            autoComplete="off"
                            className="min-w-0 flex-1 bg-transparent text-14 leading-4.5 text-text outline-none placeholder:text-text-muted"
                          />
                          {searching && <span className="hidden rounded-6 bg-surface px-1.5 py-0.5 text-11 leading-3.5 font-semibold text-text-muted md:inline">Esc</span>}
                        </span>
                        {searching && (
                          <div className="absolute inset-x-0 top-full z-10 mt-2 overflow-clip rounded-md border border-border-subtle bg-bg shadow-card max-md:relative max-md:shadow-none dark:bg-surface">
                            <p className="px-3.5 pt-2.5 pb-1.5 text-11 leading-4 font-semibold tracking-label text-text-muted uppercase">Orders with {short}</p>
                            {results.length === 0 ? (
                              <p className="px-3.5 pb-3 text-sm leading-4.5 text-text-muted">No recent orders match “{query}”.</p>
                            ) : (
                              <ul id={`${id}-orders`} role="listbox" aria-labelledby={`${id}-order`}>
                                {results.map((order, index) => (
                                  <li
                                    key={order.number}
                                    id={`${id}-order-${index}`}
                                    role="option"
                                    aria-selected={index === active}
                                    onMouseEnter={() => setActive(index)}
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => link(order)}
                                    className={cn("flex cursor-pointer items-center gap-3 border-border-subtle px-3.5 py-2.5 not-first:border-t", index === active && "bg-sage-50")}
                                  >
                                    <span className="flex min-w-0 flex-1 flex-col">
                                      <span className="flex items-center gap-2">
                                        <span className="text-14 leading-5 text-text">{highlight(order.number, query.trim())}</span>
                                        <StatusChip tone={order.status.tone} size="sm" className="px-2 py-px leading-4">
                                          {order.status.label}
                                        </StatusChip>
                                      </span>
                                      <span className="truncate text-xs leading-xs text-text-muted">{order.summary}</span>
                                    </span>
                                    {index === active && (
                                      <span aria-hidden className="hidden rounded-6 border border-border bg-bg px-1.5 py-0.5 text-11 leading-3.5 font-semibold text-text-muted md:inline">
                                        ↵
                                      </span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                            <div className="flex items-center justify-between border-t border-border-subtle bg-surface-subtle px-3.5 py-2.5 text-xs leading-xs">
                              <span className="hidden text-text-muted md:inline">↑ ↓ to move · ↵ to link</span>
                              {searchAllOrdersHref && (
                                <LinkAs href={searchAllOrdersHref} className="font-semibold text-brand hover:underline">
                                  Search all orders
                                </LinkAs>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {!remove && (
                    <p className="flex items-center gap-2 text-xs leading-xs text-text-muted">
                      <Icon name="info" size={14} />
                      Valued at the current average cost, {currency} {variant.averageCost.toFixed(2)} per unit
                    </p>
                  )}
                </>
              )}

              <span className="flex flex-col gap-1.5">
                <label htmlFor={`${id}-note`} className={label}>
                  Note{" "}
                  {noteRequired ? (
                    <span className="font-regular text-text-muted">
                      (required for {[...reasons.remove, ...reasons.add].find((item) => item.value === currentReason)?.label.toLowerCase()})
                    </span>
                  ) : (
                    optional
                  )}
                </label>
                <textarea
                  id={`${id}-note`}
                  name="note"
                  rows={2}
                  required={noteRequired}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  className="min-h-14 resize-none rounded-sm border border-border bg-bg p-3 text-14 leading-5 text-text outline-none field-sizing-content focus:border-primary md:min-h-16 dark:focus:border-brand"
                />
              </span>
            </div>

            <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-border-subtle px-5 pt-3.5 pb-6 md:rounded-b-xl md:bg-surface-subtle md:px-6 md:pt-4 md:pb-5">
              <p className="hidden text-sm leading-4.5 text-text-muted md:block">Logged to history as {staffName}</p>
              <div className="flex flex-1 gap-2.5 md:flex-none">
                <Dialog.Close className="hidden h-11 items-center rounded-full border border-border bg-bg px-4.5 text-14 leading-4.5 font-semibold text-text hover:bg-surface-subtle md:flex">
                  Cancel
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={count ? false : remove && quantity > variant.onHand}
                  className="flex h-13 flex-1 items-center justify-center rounded-full bg-primary px-5 text-base leading-5 font-semibold text-on-primary hover:bg-primary-hover disabled:opacity-muted md:h-11 md:flex-none md:text-14 md:leading-4.5"
                >
                  {submitLabel}
                </button>
              </div>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
