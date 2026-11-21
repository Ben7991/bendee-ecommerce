"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { BrandMark, Icon, type BrandMarkProps } from "../../atoms";
import { AdminCard } from "../../molecules";

export interface OrgOption {
  value: string;
  label: string;
}

export interface BrandOption extends OrgOption {
  mark: Omit<BrandMarkProps, "size">;
}

/**
 * ProductOrganisationCard (organism): where the product lives (Paper Jofak - Admin → Product
 * editor → Organisation): main category, extra categories it also shows in (remove with ×, add
 * from a list), brand, tags (type and press Enter; × removes) and tax class. Posts `category`,
 * `alsoIn`, `brand`, `tags` and `tax`.
 */
export interface ProductOrganisationCardProps extends Omit<ComponentProps<"section">, "children" | "title"> {
  linkAs?: LinkComponent;
  categories: OrgOption[];
  category: string;
  alsoIn: string[];
  brands: BrandOption[];
  brand: string;
  tags: string[];
  taxes: OrgOption[];
  tax: string;
  manageCategoriesHref?: string;
  manageBrandsHref?: string;
}

const label = "text-sm leading-4.5 font-semibold text-text";
const select = "h-10 w-full cursor-pointer appearance-none rounded-sm border border-border bg-bg pr-8 pl-3 text-14 leading-4.5 text-text outline-none focus:border-brand";

function Select({ id, name, value, onChange, options, leading }: { id: string; name: string; value: string; onChange: (value: string) => void; options: OrgOption[]; leading?: ReactNode }) {
  return (
    <span className="relative flex items-center">
      {leading && <span className="pointer-events-none absolute left-2">{leading}</span>}
      <select id={id} name={name} value={value} onChange={(event) => onChange(event.target.value)} className={cn(select, leading && "pl-11.5")}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevronDown" size={12} strokeWidth={2} className="pointer-events-none absolute right-3 text-text-muted" />
    </span>
  );
}

export function ProductOrganisationCard({
  linkAs: LinkAs = "a",
  categories,
  category: initialCategory,
  alsoIn: initialAlsoIn,
  brands,
  brand: initialBrand,
  tags: initialTags,
  taxes,
  tax: initialTax,
  manageCategoriesHref,
  manageBrandsHref,
  ...props
}: ProductOrganisationCardProps) {
  const id = useId();
  const [category, setCategory] = useState(initialCategory);
  const [alsoIn, setAlsoIn] = useState(initialAlsoIn);
  const [brand, setBrand] = useState(initialBrand);
  const [tags, setTags] = useState(initialTags);
  const [tax, setTax] = useState(initialTax);
  const [draft, setDraft] = useState("");
  const [adding, setAdding] = useState(false);
  const chosenBrand = brands.find((option) => option.value === brand);
  const labelOf = (value: string) => categories.find((option) => option.value === value)?.label ?? value;
  const manage = "text-xs leading-xs font-semibold text-brand hover:underline";

  return (
    <AdminCard data-slot="product-organisation-card" title="Organisation" variant="eyebrow" className="gap-3.5" {...props}>
      <span className="flex flex-col gap-1.5">
        <span className="flex items-center justify-between">
          <label htmlFor={`${id}-category`} className={label}>
            Main category
          </label>
          {manageCategoriesHref && (
            <LinkAs href={manageCategoriesHref} className={manage}>
              Manage categories ›
            </LinkAs>
          )}
        </span>
        <Select id={`${id}-category`} name="category" value={category} onChange={setCategory} options={categories} />
      </span>

      <div className="flex flex-col gap-1.5">
        <p id={`${id}-also`} className={label}>
          Also show in
        </p>
        <input type="hidden" name="alsoIn" value={alsoIn.join(",")} />
        <ul aria-labelledby={`${id}-also`} className="flex flex-wrap items-center gap-1.5">
          {alsoIn.map((value) => (
            <li key={value} className="flex items-center gap-1 rounded-full bg-surface py-1.25 pr-2 pl-2.5 text-xs leading-xs font-medium text-text">
              {labelOf(value)}
              <button type="button" aria-label={`Remove ${labelOf(value)}`} onClick={() => setAlsoIn(alsoIn.filter((item) => item !== value))} className="text-text-muted hover:text-text">
                <Icon name="close" size={12} strokeWidth={2} />
              </button>
            </li>
          ))}
          <li>
            {adding ? (
              <select
                autoFocus
                aria-label="Add a category"
                defaultValue=""
                onBlur={() => setAdding(false)}
                onChange={(event) => {
                  if (event.target.value && !alsoIn.includes(event.target.value)) setAlsoIn([...alsoIn, event.target.value]);
                  setAdding(false);
                }}
                className="h-7 rounded-full border border-border bg-bg px-2 text-xs text-text outline-none"
              >
                <option value="" disabled>
                  Choose…
                </option>
                {categories
                  .filter((option) => option.value !== category && !alsoIn.includes(option.value))
                  .map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            ) : (
              <button type="button" onClick={() => setAdding(true)} className="px-2.5 py-1.25 text-xs leading-xs font-semibold text-brand hover:underline">
                + Add
              </button>
            )}
          </li>
        </ul>
      </div>

      <span className="flex flex-col gap-1.5">
        <span className="flex items-center justify-between">
          <label htmlFor={`${id}-brand`} className={label}>
            Brand
          </label>
          {manageBrandsHref && (
            <LinkAs href={manageBrandsHref} className={manage}>
              Manage brands ›
            </LinkAs>
          )}
        </span>
        <Select
          id={`${id}-brand`}
          name="brand"
          value={brand}
          onChange={setBrand}
          options={brands}
          leading={chosenBrand && <BrandMark {...chosenBrand.mark} className="size-6.5 rounded-6 *:text-xs" />}
        />
      </span>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-tag`} className={label}>
          Tags
        </label>
        <input type="hidden" name="tags" value={tags.join(",")} />
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="group flex items-center gap-1 rounded-full border border-border px-2.5 py-1.25 text-xs leading-xs font-medium text-text">
              {tag}
              <button type="button" aria-label={`Remove tag ${tag}`} onClick={() => setTags(tags.filter((item) => item !== tag))} className="text-text-muted hover:text-text">
                <Icon name="close" size={10} strokeWidth={2.2} />
              </button>
            </span>
          ))}
          <input
            id={`${id}-tag`}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === ",") {
                event.preventDefault();
                const tag = draft.trim().toLowerCase();
                if (tag && !tags.includes(tag)) setTags([...tags, tag]);
                setDraft("");
              }
            }}
            placeholder="Add tag"
            className="h-7 w-20 min-w-0 flex-1 bg-transparent text-xs leading-xs text-text outline-none placeholder:text-text-muted"
          />
        </div>
      </div>

      <span className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-tax`} className={label}>
          Tax
        </label>
        <Select id={`${id}-tax`} name="tax" value={tax} onChange={setTax} options={taxes} />
      </span>
    </AdminCard>
  );
}
