import type { Meta, StoryObj } from "@storybook/react-vite";

import { DiscountTable } from "./DiscountTable";
import { sampleDiscounts } from "./fixtures";

const meta = {
  title: "Organisms/DiscountTable",
  component: DiscountTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    discounts: sampleDiscounts,
    footer: (
      <>
        <span>
          Next up: <span className="font-semibold text-text">DECEMBER</span> · GHS 50 off over GHS 400 · starts 1 Dec
        </span>
        <a href="#scheduled" className="font-semibold text-text">
          View scheduled
        </a>
      </>
    ),
    extend: () => (
      <button type="button" className="flex h-8 items-center rounded-full border border-border bg-bg px-3.5 text-xs leading-xs font-semibold text-text">
        Extend
      </button>
    ),
  },
} satisfies Meta<typeof DiscountTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };

/** Paper mobile artboard width (390): the ending-soon discount leads as a card. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

export const Empty: Story = { args: { discounts: [], emptyMessage: "No discounts match “SUMMER”." } };
