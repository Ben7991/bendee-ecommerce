import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { ChoiceCards, SelectField, SwitchField, TextField, type ChoiceCardOption } from "../../molecules";

type Options = Array<{ value: string; label: string }>;

const optional = (label: string) => (
  <>
    {label} <span className="font-regular text-text-muted">(optional)</span>
  </>
);

/**
 * DeliveryForm (organism): the delivery step's fields (Paper: Checkout — Delivery).
 *   mobile:  region + city, area, landmark, one optional address/GPS field, then methods
 *   768 up:  region · city · area, house + GhanaPost GPS, landmark, then methods
 * Uncontrolled: pass `defaults`; read the values from the surrounding <form>.
 */
export interface DeliveryFormProps extends Omit<ComponentProps<"div">, "defaultValue"> {
  regions: Options;
  cities: Options;
  areas: Options;
  methods: ChoiceCardOption[];
  defaults?: {
    region?: string;
    city?: string;
    area?: string;
    street?: string;
    gps?: string;
    landmark?: string;
    method?: string;
  };
  landmarkHint?: ReactNode;
  compactLandmarkHint?: ReactNode;
}

export function DeliveryForm({
  regions,
  cities,
  areas,
  methods,
  defaults = {},
  landmarkHint = "Helps the courier find you — a nearby shop, church, school or junction.",
  compactLandmarkHint = "A nearby shop, church, school or junction",
  className,
  ...props
}: DeliveryFormProps) {
  return (
    <div data-slot="delivery-form" className={cn("flex flex-col gap-4 md:gap-6", className)} {...props}>
      <div className="flex flex-col gap-4">
        <div className="order-1 flex flex-wrap gap-3 md:flex-nowrap md:gap-4">
          <SelectField label="Region" name="region" options={regions} defaultValue={defaults.region} className="flex-1 md:basis-0" />
          <SelectField label={<><span className="md:hidden">City</span><span className="hidden md:inline">City / town</span></>} name="city" options={cities} defaultValue={defaults.city} className="w-30 md:w-auto md:flex-1 md:basis-0" />
          <SelectField label="Area" name="area" options={areas} defaultValue={defaults.area} className="basis-full md:flex-1 md:basis-0" />
        </div>
        <div className="order-2 hidden gap-4 md:flex">
          <TextField label={optional("House no. & street")} name="street" autoComplete="address-line1" defaultValue={defaults.street} className="flex-2 basis-0" />
          <TextField label={optional("GhanaPost GPS")} name="gps" placeholder="GA-000-0000" defaultValue={defaults.gps} className="flex-1 basis-0" />
        </div>
        <TextField
          label="Landmark"
          name="landmark"
          defaultValue={defaults.landmark}
          className="order-2 md:order-3"
          hint={
            <>
              <span className="md:hidden">{compactLandmarkHint}</span>
              <span className="hidden md:inline">{landmarkHint}</span>
            </>
          }
        />
        <TextField
          label={optional("House no., street or GhanaPost GPS")}
          name="address"
          autoComplete="address-line1"
          defaultValue={defaults.street}
          className="order-3 md:hidden"
        />
        <SwitchField label="Delivering to someone else?" name="gift" className="order-4 md:pt-1" />
      </div>
      <div className="flex flex-col gap-4 border-t border-border-subtle pt-4 md:border-0 md:gap-3 md:pt-0">
        <p id="delivery-method-label" className="font-sans text-sm leading-xs font-semibold text-text">
          Delivery method
        </p>
        <ChoiceCards aria-labelledby="delivery-method-label" name="method" options={methods} defaultValue={defaults.method} size="sm" className="gap-4 md:gap-3" />
      </div>
    </div>
  );
}
