"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { useId, useState, type ComponentProps } from "react";

import { cn } from "../../../lib";
import { Icon, PaymentBadge, PaymentBrandDot, type PaymentBrand } from "../../atoms";
import { ChoiceCards, SelectField, TextField } from "../../molecules";

type Network = Extract<PaymentBrand, "mtn" | "telecel" | "airteltigo">;

const NETWORKS: Array<{ value: Network; label: string; short: string }> = [
  { value: "mtn", label: "MTN MoMo", short: "MTN" },
  { value: "telecel", label: "Telecel Cash", short: "Telecel" },
  { value: "airteltigo", label: "AT Money", short: "AT" },
];

/**
 * PaymentForm (organism): the payment step's choices (Paper: Checkout — Payment): Mobile Money
 * (wallet number + network), card, or pay on delivery.
 *   mobile: network as three pills above the wallet number
 *   768 up: wallet number and a network select side by side, brand badges on each card
 */
export interface PaymentFormProps extends Omit<ComponentProps<"div">, "defaultValue"> {
  defaultMethod?: "momo" | "card" | "cod";
  defaultNetwork?: Network;
  /** National number, e.g. "24 412 7781". */
  defaultWallet?: string;
  /** Under the wallet field, e.g. { full: "MTN number detected · same as your contact number", short: "MTN number detected" }. */
  detected?: { full: string; short: string };
}

export function PaymentForm({ defaultMethod = "momo", defaultNetwork = "mtn", defaultWallet, detected, className, ...props }: PaymentFormProps) {
  const [network, setNetwork] = useState<Network>(defaultNetwork);
  const networkLabelId = useId();

  const momo = (
    <div className="flex flex-col gap-4 md:flex-row md:gap-4 md:pl-9">
      <div className="md:hidden">
        <span id={networkLabelId} className="sr-only">
          Network
        </span>
        <RadioGroup.Root
          aria-labelledby={networkLabelId}
          value={network}
          onValueChange={(value) => setNetwork(value as Network)}
          className="flex gap-2"
        >
          {NETWORKS.map((option) => (
            <RadioGroup.Item
              key={option.value}
              value={option.value}
              className={cn(
                "flex flex-1 basis-0 items-center justify-center gap-1.5 rounded-full border border-border bg-bg py-2.5 text-sm leading-xs text-text-secondary outline-none",
                "focus-visible:ring-2 focus-visible:ring-brand",
                "data-[state=checked]:border-primary data-[state=checked]:font-semibold data-[state=checked]:text-text data-[state=checked]:ring-1 data-[state=checked]:ring-primary",
              )}
            >
              <PaymentBrandDot brand={option.value} />
              {option.short}
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </div>
      <TextField
        label="Wallet number"
        name="wallet"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        defaultValue={defaultWallet}
        inputClassName="tracking-compact"
        className="md:grow-13 md:basis-0"
        leading={
          <>
            <span className="font-sans text-md leading-sm text-text-muted md:text-base">+233</span>
            <span aria-hidden className="h-5 w-px shrink-0 bg-border" />
          </>
        }
        hintTone="success"
        hint={
          detected && (
            <span className="flex items-center gap-1.5">
              <Icon name="check" size={12} strokeWidth={3} />
              <span className="md:hidden">{detected.short}</span>
              <span className="hidden md:inline">{detected.full}</span>
            </span>
          )
        }
      />
      <SelectField
        label="Network"
        name="network"
        value={network}
        onChange={(event) => setNetwork(event.target.value as Network)}
        options={NETWORKS.map(({ value, label }) => ({ value, label }))}
        leading={<PaymentBrandDot brand={network} className="size-2.5" />}
        className="hidden flex-1 basis-0 md:flex md:grow-10"
      />
    </div>
  );

  return (
    <div data-slot="payment-form" className={cn("flex flex-col", className)} {...props}>
      <ChoiceCards
        aria-label="Payment method"
        className="gap-4 md:gap-3"
        name="method"
        defaultValue={defaultMethod}
        options={[
          {
            value: "momo",
            title: "Mobile Money",
            description: "Approve a prompt on your phone — no card needed",
            compactDescription: null,
            aside: (
              <span className="flex gap-1.5">
                <PaymentBadge brand="mtn" size="sm" />
                <PaymentBadge brand="telecel" size="sm" />
                <PaymentBadge brand="airteltigo" size="sm" />
              </span>
            ),
            compactAside: null,
            content: momo,
          },
          {
            value: "card",
            title: "Debit or credit card",
            compactTitle: "Card",
            description: "You'll enter card details securely with Paystack",
            compactDescription: "Visa or Mastercard via Paystack",
            aside: (
              <span className="flex gap-1.5">
                <PaymentBadge brand="visa" size="sm" />
                <PaymentBadge brand="mastercard" size="sm" />
              </span>
            ),
            compactAside: null,
          },
          {
            value: "cod",
            title: "Pay on delivery",
            description: "Cash or MoMo on delivery · we'll text you a code to confirm",
            compactDescription: "Cash or MoMo on delivery",
            aside: <Icon name="cash" size={22} className="text-text-muted" />,
            compactAside: null,
          },
        ]}
      />
    </div>
  );
}
