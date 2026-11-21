"use client";

import { useId, useState, type ComponentProps, type KeyboardEvent } from "react";

import { cn, collectionMatches, type CollectionMode, type CollectionRule, type LinkComponent, type RuleField, type RuleProduct } from "../../../lib";
import { Checkbox, Icon } from "../../atoms";

const FIELDS: { value: RuleField; label: string; operator: string }[] = [
  { value: "tag", label: "Tag", operator: "is" },
  { value: "category", label: "Category", operator: "is" },
  { value: "price", label: "Price", operator: "up to" },
  { value: "added", label: "Added", operator: "in last" },
  { value: "sale", label: "On sale", operator: "is" },
];
const DEFAULT_VALUE: Record<RuleField, string[]> = { tag: [], category: [""], price: ["150"], added: ["30"], sale: ["yes"] };

/**
 * CollectionProductsCard (organism): what goes in a collection (Paper Jofak - Admin → Collection
 * editor → Products). Pick by hand (tick products) or use rules: match any / all of tag, category,
 * price up to, added in the last N days, on sale. Tags are chips (type and Enter, × to remove).
 * Shows how many products match as you edit. Posts `mode`, `match`, `rules` (JSON) and `product`
 * per picked product.
 */
export interface CollectionProductsCardProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  products: RuleProduct[];
  categories: string[];
  defaultMode?: CollectionMode;
  defaultMatch?: "any" | "all";
  defaultRules?: CollectionRule[];
  defaultPicked?: string[];
  /** All matches ("See all"). */
  matchesHref?: string;
}

const box = "h-10.5 rounded-10 border border-border bg-bg px-3 text-14 leading-4.5 font-medium text-text outline-none focus-within:border-primary dark:bg-surface dark:focus-within:border-brand";

export function CollectionProductsCard({
  linkAs: LinkAs = "a",
  products,
  categories,
  defaultMode = "rules",
  defaultMatch = "any",
  defaultRules = [],
  defaultPicked = [],
  matchesHref,
  className,
  ...props
}: CollectionProductsCardProps) {
  const id = useId();
  const [mode, setMode] = useState<CollectionMode>(defaultMode);
  const [match, setMatch] = useState(defaultMatch);
  const [rules, setRules] = useState(defaultRules);
  const [picked, setPicked] = useState(defaultPicked);
  const [drafts, setDrafts] = useState<Record<number, string>>({});

  const count = collectionMatches(products, mode, match, rules, picked).length;
  const update = (index: number, rule: CollectionRule) => setRules((current) => current.map((item, at) => (at === index ? rule : item)));
  const addTag = (index: number) => {
    const tag = (drafts[index] ?? "").trim().toLowerCase();
    const rule = rules[index];
    if (!tag || !rule || rule.value.includes(tag)) return;
    update(index, { ...rule, value: [...rule.value.filter(Boolean), tag] });
    setDrafts((current) => ({ ...current, [index]: "" }));
  };
  const onTagKey = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(index);
    }
  };

  const value = (rule: CollectionRule, index: number) => {
    switch (rule.field) {
      case "tag":
        return (
          <span className={cn(box, "flex h-auto min-h-10.5 w-full min-w-0 flex-wrap items-center gap-1.5 px-2 py-1.5 md:w-auto md:flex-1")}>
            {rule.value.filter(Boolean).map((tag) => (
              <span key={tag} className="flex items-center gap-1 rounded-full bg-sage-100 py-0.75 pr-1.5 pl-2.25 text-xs leading-xs font-semibold text-brand">
                {tag}
                <button type="button" aria-label={`Remove tag ${tag}`} onClick={() => update(index, { ...rule, value: rule.value.filter((item) => item !== tag) })}>
                  <Icon name="close" size={10} strokeWidth={2} />
                </button>
              </span>
            ))}
            <input
              value={drafts[index] ?? ""}
              onChange={(event) => setDrafts((current) => ({ ...current, [index]: event.target.value }))}
              onKeyDown={onTagKey(index)}
              onBlur={() => addTag(index)}
              placeholder={rule.value.length ? "" : "Type a tag, Enter"}
              aria-label="Add a tag"
              className="min-w-16 flex-1 bg-transparent px-1 text-14 leading-4.5 outline-none placeholder:text-text-muted"
            />
          </span>
        );
      case "category":
        return (
          <select aria-label="Category" value={rule.value[0] ?? ""} onChange={(event) => update(index, { ...rule, value: [event.target.value] })} className={cn(box, "w-full min-w-0 appearance-none md:w-auto md:flex-1")}>
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        );
      case "sale":
        return (
          <select aria-label="On sale" value={rule.value[0] ?? "yes"} onChange={(event) => update(index, { ...rule, value: [event.target.value] })} className={cn(box, "w-full min-w-0 appearance-none md:w-auto md:flex-1")}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        );
      default:
        return (
          <span className={cn(box, "flex w-full min-w-0 items-center gap-2 md:w-auto md:flex-1")}>
            {rule.field === "price" && <span className="text-text-muted">GHS</span>}
            <input
              inputMode="numeric"
              aria-label={rule.field === "price" ? "Maximum price" : "Days"}
              value={rule.value[0] ?? ""}
              onChange={(event) => update(index, { ...rule, value: [event.target.value.replace(/\D/g, "")] })}
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
            {rule.field === "added" && <span className="text-text-muted">days</span>}
          </span>
        );
    }
  };

  return (
    <section
      data-slot="collection-products-card"
      aria-labelledby={`${id}-title`}
      className={cn("flex flex-col gap-4 rounded-lg border border-border-subtle p-4 font-sans max-md:rounded-18 md:px-6 md:py-5.5", className)}
      {...props}
    >
      <input type="hidden" name="mode" value={mode} />
      <input type="hidden" name="match" value={match} />
      <input type="hidden" name="rules" value={JSON.stringify(rules.map((rule) => ({ ...rule, value: rule.value.filter(Boolean) })))} />
      {mode === "manual" && picked.map((product) => <input key={product} type="hidden" name="product" value={product} />)}

      <div className="flex items-center justify-between gap-3">
        <h2 id={`${id}-title`} className="sr-only text-md leading-5.5 font-semibold text-text md:not-sr-only">
          Products
        </h2>
        <div role="radiogroup" aria-label="How products are chosen" className="flex flex-1 gap-0.5 rounded-full bg-surface-subtle p-0.75 md:flex-none">
          {(
            [
              ["manual", "Pick by hand"],
              ["rules", "Use rules"],
            ] as const
          ).map(([key, text]) => (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={mode === key}
              onClick={() => setMode(key)}
              className={cn(
                "flex-1 rounded-full px-3.5 py-2 text-14 leading-4.5 whitespace-nowrap md:py-1.5 md:text-sm md:leading-4",
                mode === key ? "bg-bg font-semibold text-text shadow-xs dark:bg-surface" : "font-medium text-text-secondary hover:text-text",
              )}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {mode === "rules" ? (
        <>
          <p className="flex flex-wrap items-center gap-2 text-sm leading-5 text-text-secondary md:text-14">
            <span className="md:hidden">Match</span>
            <span className="hidden md:inline">Include products that match</span>
            <span className="relative">
              <select
                aria-label="Match"
                value={match}
                onChange={(event) => setMatch(event.target.value as "any" | "all")}
                className="h-8 appearance-none rounded-full border border-border bg-bg pr-7 pl-3 text-sm leading-4 font-semibold text-text outline-none focus:border-primary dark:bg-surface"
              >
                <option value="any">any</option>
                <option value="all">all</option>
              </select>
              <Icon name="chevronDown" size={10} strokeWidth={1.6} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-muted" />
            </span>
            of these rules
          </p>

          <ul className="flex flex-col gap-2.5 md:gap-2">
            {rules.map((rule, index) => {
              const field = FIELDS.find((item) => item.value === rule.field)!;
              return (
                <li key={index} className="flex flex-col gap-2 rounded-14 bg-surface-subtle p-3 md:flex-row md:items-center md:rounded-none md:bg-transparent md:p-0">
                  <span className="flex items-center gap-2">
                    <span className="relative md:w-37.5">
                      <select
                        aria-label={`Rule ${index + 1} field`}
                        value={rule.field}
                        onChange={(event) => {
                          const next = event.target.value as RuleField;
                          update(index, { field: next, value: DEFAULT_VALUE[next] });
                        }}
                        className={cn(box, "w-full appearance-none pr-8")}
                      >
                        {FIELDS.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                      <Icon name="chevronDown" size={10} strokeWidth={1.6} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-muted" />
                    </span>
                    <span className={cn(box, "flex flex-1 items-center md:w-27.5 md:flex-none")}>{field.operator}</span>
                    <button
                      type="button"
                      aria-label={`Remove rule ${index + 1}`}
                      onClick={() => setRules((current) => current.filter((_, at) => at !== index))}
                      className="flex size-7 shrink-0 items-center justify-center text-text-muted hover:text-error md:hidden"
                    >
                      <Icon name="close" size={14} strokeWidth={1.5} />
                    </button>
                  </span>
                  {value(rule, index)}
                  <button
                    type="button"
                    aria-label={`Remove rule ${index + 1}`}
                    onClick={() => setRules((current) => current.filter((_, at) => at !== index))}
                    className="hidden size-7 shrink-0 items-center justify-center text-text-muted hover:text-error md:flex"
                  >
                    <Icon name="close" size={14} strokeWidth={1.5} />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-1.5 text-sm leading-4.5">
              <button
                type="button"
                onClick={() => {
                  const unused = FIELDS.find((item) => !rules.some((rule) => rule.field === item.value)) ?? FIELDS[0]!;
                  setRules((current) => [...current, { field: unused.value, value: DEFAULT_VALUE[unused.value] }]);
                }}
                className="flex items-center gap-1.5 font-semibold text-brand hover:underline"
              >
                <Icon name="plus" size={14} strokeWidth={1.8} />
                Add rule
              </button>
              <span className="hidden text-text-muted md:inline">· tag, category, price range, added in last N days, on sale</span>
            </p>
            <p className="text-sm leading-4.5 font-semibold text-text md:hidden">
              {count} match
              {matchesHref && (
                <>
                  {" · "}
                  <LinkAs href={matchesHref} className="hover:underline">
                    see all
                  </LinkAs>
                </>
              )}
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm leading-5 text-text-secondary">
            {picked.length} of {products.length} picked · shoppers see them in this order
          </p>
          <ul className="flex max-h-90 flex-col overflow-y-auto rounded-14 border border-border-subtle">
            {products.map((product) => {
              const checked = picked.includes(product.id);
              return (
                <li key={product.id} className="border-border-subtle not-first:border-t">
                  <label className="flex cursor-pointer items-center gap-3 px-3.5 py-2.5 hover:bg-surface-subtle">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(next) => setPicked((current) => (next === true ? [...current, product.id] : current.filter((item) => item !== product.id)))}
                      aria-label={product.name}
                    />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-14 leading-5 font-semibold text-text">{product.name}</span>
                      <span className="truncate text-xs leading-xs text-text-muted">
                        GHS {product.price} · {product.category}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
