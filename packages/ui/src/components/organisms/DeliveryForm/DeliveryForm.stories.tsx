import type { Meta, StoryObj } from "@storybook/react-vite";

import { DeliveryForm } from "./DeliveryForm";

const meta = {
  title: "Organisms/DeliveryForm",
  component: DeliveryForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-186"><Story /></div>],
  args: {
    regions: [{ value: "greater-accra", label: "Greater Accra" }],
    cities: [{ value: "accra", label: "Accra" }],
    areas: [{ value: "east-legon", label: "East Legon" }],
    defaults: { street: "14 Lagos Avenue", landmark: "Opposite the Shell filling station, blue gate", method: "standard" },
    methods: [
      { value: "standard", title: "Standard delivery", compactTitle: "Standard", description: "Arrives tomorrow, Sat 14 Nov · Pay on delivery available", compactDescription: "Tomorrow, Sat 14 Nov", aside: <span className="font-sans text-sm font-semibold text-brand md:text-base">Free</span> },
      { value: "express", title: "Express · same day", description: "Arrives today by 7pm · order before 12:00", aside: <span className="font-sans text-sm font-semibold text-text md:text-base">GHS 40</span> },
    ],
  },
} satisfies Meta<typeof DeliveryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
