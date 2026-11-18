import type { Meta, StoryObj } from "@storybook/react-vite";

import { OptionPicker } from "./OptionPicker";

const meta = {
  title: "Molecules/OptionPicker",
  component: OptionPicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Flavour",
    variant: "swatch",
    defaultValue: "lemon-lime",
    options: [
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
      {
        value: "unflavoured",
        label: "Unflavoured",
        // eslint-disable-next-line no-restricted-syntax -- flavour colours are catalog data, not design values
        swatch: "#dcd6c8",
        disabled: true,
      },
    ],
  },
} satisfies Meta<typeof OptionPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Swatches: Story = {};

export const Cards: Story = {
  args: {
    label: "Size",
    variant: "card",
    defaultValue: "25",
    className: "max-w-135",
    options: [
      { value: "25", label: "25 servings", detail: "GHS 18 / serving" },
      {
        value: "50",
        label: "50 servings",
        detail: "GHS 16 / serving",
        badge: "Best value",
      },
    ],
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
