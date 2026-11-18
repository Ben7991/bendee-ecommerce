import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChoiceCards } from "./ChoiceCards";

const meta = {
  title: "Molecules/ChoiceCards",
  component: ChoiceCards,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "Delivery method",
    defaultValue: "standard",
    className: "max-w-186",
    options: [
      { value: "standard", title: "Standard delivery", compactTitle: "Standard", description: "Arrives tomorrow, Sat 14 Nov · Pay on delivery available", compactDescription: "Tomorrow, Sat 14 Nov", aside: <span className="font-sans text-base font-semibold text-brand">Free</span> },
      { value: "express", title: "Express · same day", description: "Arrives today by 7pm · order before 12:00", aside: <span className="font-sans text-base font-semibold text-text">GHS 40</span> },
      { value: "pickup", title: "Pick up · Jofak Osu store", compactTitle: "Pick up · Osu store", description: "Ready today from 2pm · Oxford Street, Mon–Sat 9am–7pm", compactDescription: "Ready today from 2pm", aside: <span className="font-sans text-base font-semibold text-text">Free</span> },
    ],
  },
} satisfies Meta<typeof ChoiceCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { args: { size: "sm" }, globals: { viewport: { value: "mobile", isRotated: false } } };
