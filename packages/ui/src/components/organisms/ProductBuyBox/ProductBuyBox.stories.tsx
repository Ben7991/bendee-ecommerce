import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms";
import { ChoiceCards, DeliveryEstimator, NotifyForm, OptionPicker, ShareLinks, StockStatus } from "../../molecules";
import { ProductBuyBox } from "./ProductBuyBox";

const meta = {
  title: "Organisms/ProductBuyBox",
  component: ProductBuyBox,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    eyebrow: "Daily Essentials · Powder",
    sku: "JFK-GRN-LL25",
    name: "Daily Greens Powder",
    title: (
      <>
        Daily Greens <em>Powder</em>
      </>
    ),
    rating: { value: 4.9, count: 3214, href: "#reviews" },
    socialProof: "12k+ sold this year",
    description: "38 whole-food greens, adaptogens and probiotics in one scoop.",
    price: 450,
    compareAt: 520,
    priceNote: "Price includes VAT · or 3 payments of GHS 150 with MoMo",
    compactPriceNote: "Price includes VAT",
    options: (
      <>
        <OptionPicker
          label="Flavour"
          defaultValue="lemon-lime"
          options={[
            {
              value: "lemon-lime",
              label: "Lemon lime",
              // eslint-disable-next-line no-restricted-syntax -- flavour colours are catalog data, not design values
              swatch: "linear-gradient(135deg, #e8f27a, #9bd45a)",
            },
            {
              value: "mixed-berry",
              label: "Mixed berry",
              // eslint-disable-next-line no-restricted-syntax -- flavour colours are catalog data, not design values
              swatch: "linear-gradient(135deg, #e37a9b, #8e3b6a)",
            },
          ]}
        />
        <OptionPicker
          label="Size"
          variant="card"
          defaultValue="25"
          options={[
            { value: "25", label: "25 servings", detail: "GHS 18 / serving" },
            {
              value: "50",
              label: "50 servings",
              detail: "GHS 16 / serving",
              badge: "Best value",
            },
          ]}
        />
      </>
    ),
    purchase: (
      <ChoiceCards
        aria-label="Purchase type"
        defaultValue="once"
        className="gap-2"
        options={[
          { value: "once", title: "One-time purchase", aside: "GHS 450" },
          {
            value: "subscribe",
            title: "Subscribe & save 20%",
            description: "Delivered every 30 days · skip or cancel anytime",
            aside: "GHS 360",
          },
        ]}
      />
    ),
    stock: <StockStatus label="In stock" note="Order in the next 3h 20m for same-day dispatch" />,
    buyNow: (
      <Button variant="accent" size="lg" className="w-full">
        Buy now with MoMo
      </Button>
    ),
    delivery: (
      <DeliveryEstimator
        location="Accra · East Legon"
        options={[
          { label: "Standard delivery", value: "Tomorrow · GHS 25" },
          { label: "Pickup · Osu store", value: "Today · Free" },
        ]}
        note="Add GHS 50 more for free delivery"
      />
    ),
    share: <ShareLinks url="https://jofak.com/products/daily-greens-powder" note="FDA disclaimer applies*" />,
    className: "max-w-135",
  },
} satisfies Meta<typeof ProductBuyBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoSale: Story = { args: { compareAt: undefined } };
export const SoldOut: Story = {
  args: {
    soldOut: true,
    stock: <StockStatus tone="error" label="Sold out" note="Back in about 2 weeks" />,
    soldOutAction: <NotifyForm label="Get a text when it's back" className="md:items-stretch" />,
  },
};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
