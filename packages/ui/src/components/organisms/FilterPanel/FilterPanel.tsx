"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Checkbox, Icon, Switch } from "../../atoms";
import { ChipGroup, PriceRange, type ChipOption, type PriceRangeValue } from "../../molecules";

export interface FacetOption {
  value: string;
  label: string;
  /** Matching products, right-aligned. */
  count?: number;
}

/** One block of the panel. Every facet is uncontrolled; read the values from `onFacetChange`. */
export type FilterFacet =
  | {
      kind: "checkboxes";
      id: string;
      label: string;
      options: FacetOption[];
      defaultValue?: string[];
    }
  | {
      kind: "chips";
      id: string;
      label: string;
      options: ChipOption[];
      defaultValue?: string[];
    }
  | {
      kind: "price";
      id: string;
      label: string;
      min: number;
      max: number;
      step?: number;
      defaultValue?: PriceRangeValue;
      /** "Under 200", "200 – 400", "400+": values are "min-max" ("400-" for open-ended). */
      presets?: ChipOption[];
    }
  /** On/off rows ("In stock only", "On sale"), no heading. */
  | {
      kind: "switches";
      id: string;
      options: ChipOption[];
      defaultValue?: string[];
    };

export type FacetValue = string[] | PriceRangeValue;

/**
 * FilterPanel (organism): the PLP facets (Paper PLP → Filters). Titled facets collapse (native
 * <details>, open by default); the price facet pairs PriceRange with preset chips. Used as the
 * desktop sidebar (with `title` and `clearAction`) and inside FilterDialog (without).
 */
export interface FilterPanelProps extends Omit<ComponentProps<"div">, "title"> {
  facets: FilterFacet[];
  /** Heading row, e.g. "Filters" (desktop sidebar). */
  title?: ReactNode;
  /** "Clear all" next to the title. */
  clearAction?: ReactNode;
  onFacetChange?: (id: string, value: FacetValue) => void;
}

export function FilterPanel({ facets, title, clearAction, onFacetChange, className, ...props }: FilterPanelProps) {
  return (
    <div data-slot="filter-panel" className={cn("flex flex-col font-sans", className)} {...props}>
      {title && (
        <div className="flex items-center justify-between border-b border-border-subtle pb-5">
          <h2 className="flex items-center gap-2 text-xl leading-base font-semibold text-text">
            <Icon name="sliders" />
            {title}
          </h2>
          {clearAction}
        </div>
      )}
      {facets.map((facet) => (
        <Facet key={facet.id} facet={facet} onChange={(value) => onFacetChange?.(facet.id, value)} />
      ))}
    </div>
  );
}

function Facet({ facet, onChange }: { facet: FilterFacet; onChange: (value: FacetValue) => void }) {
  const id = useId();
  // Options ticked so far (checkboxes and switches).
  const [selected, setSelected] = useState<string[]>(facet.kind === "price" ? [] : (facet.defaultValue ?? []));
  const toggle = (value: string, on: boolean) => {
    const next = on ? [...selected, value] : selected.filter((item) => item !== value);
    setSelected(next);
    onChange(next);
  };

  if (facet.kind === "switches") {
    return (
      <div className="flex flex-col gap-4 border-b border-border-subtle py-6 last:border-b-0">
        {facet.options.map((option) => (
          <div key={option.value} className="flex items-center justify-between gap-3">
            <label htmlFor={`${id}-${option.value}`} className="text-base leading-4.5 font-medium text-text">
              {option.label}
            </label>
            <Switch
              id={`${id}-${option.value}`}
              checked={selected.includes(option.value)}
              onCheckedChange={(checked) => toggle(option.value, checked)}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <details open className="group/facet border-b border-border-subtle py-6 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm text-base leading-4.5 font-semibold text-text [&::-webkit-details-marker]:hidden">
        <span id={`${id}-label`}>{facet.label}</span>
        <Icon name="chevronUp" size={16} className="rotate-180 transition-transform group-open/facet:rotate-0" />
      </summary>
      <FacetBody facet={facet} labelId={`${id}-label`} selected={selected} onToggle={toggle} onChange={onChange} />
    </details>
  );
}

function FacetBody({
  facet,
  labelId,
  selected,
  onToggle,
  onChange,
}: {
  facet: Exclude<FilterFacet, { kind: "switches" }>;
  labelId: string;
  selected: string[];
  onToggle: (value: string, on: boolean) => void;
  onChange: (value: FacetValue) => void;
}) {
  const id = useId();

  if (facet.kind === "checkboxes") {
    return (
      <ul aria-labelledby={labelId} className="flex flex-col gap-3 pt-4">
        {facet.options.map((option) => (
          <li key={option.value} className="flex items-center gap-3">
            <Checkbox
              id={`${id}-${option.value}`}
              checked={selected.includes(option.value)}
              onCheckedChange={(checked) => onToggle(option.value, checked === true)}
              className="size-5 rounded-6"
            />
            <label htmlFor={`${id}-${option.value}`} className="flex-1 cursor-pointer text-base leading-4.5 text-text">
              {option.label}
            </label>
            {option.count !== undefined && (
              <span className="w-8 shrink-0 text-right text-sm leading-xs text-text-muted">
                <span className="sr-only">(</span>
                {option.count}
                <span className="sr-only"> products)</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  if (facet.kind === "chips") {
    return (
      <ChipGroup
        type="multiple"
        aria-label={facet.label}
        options={facet.options}
        defaultValue={facet.defaultValue}
        onValueChange={onChange}
        className="pt-4"
      />
    );
  }

  return <PriceFacet facet={facet} onChange={onChange} />;
}

function PriceFacet({ facet, onChange }: { facet: Extract<FilterFacet, { kind: "price" }>; onChange: (value: FacetValue) => void }) {
  const [value, setValue] = useState<PriceRangeValue>(facet.defaultValue ?? [facet.min, facet.max]);
  const presetFor = ([low, high]: PriceRangeValue) =>
    facet.presets?.find((preset) => {
      const [from, to] = preset.value.split("-");
      return Number(from || facet.min) === low && Number(to || facet.max) === high;
    })?.value ?? "";

  return (
    <div className="flex flex-col gap-5 pt-5">
      <PriceRange
        min={facet.min}
        max={facet.max}
        step={facet.step}
        value={value}
        onValueChange={setValue}
        onValueCommit={onChange}
        label={facet.label.toLowerCase()}
      />
      {facet.presets && (
        <ChipGroup
          type="single"
          size="sm"
          aria-label={`${facet.label} presets`}
          options={facet.presets}
          value={presetFor(value)}
          onValueChange={(preset) => {
            const [from, to] = preset ? preset.split("-") : [];
            const next: PriceRangeValue = [Number(from || facet.min), Number(to || facet.max)];
            setValue(next);
            onChange(next);
          }}
        />
      )}
    </div>
  );
}
