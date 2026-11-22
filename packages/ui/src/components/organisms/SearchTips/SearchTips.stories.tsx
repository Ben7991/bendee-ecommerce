import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchTips } from "./SearchTips";

const link = (label: string) => (
  <a href="#" className="font-sans text-sm leading-xs font-semibold text-brand underline">
    {label}
  </a>
);

const meta = {
  title: "Organisms/SearchTips",
  component: SearchTips,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    tips: [
      { icon: "searchTip", title: "Search tips", text: "Check the spelling, use fewer words, or search by goal like “sleep”, “energy” or “gut health”." },
      { icon: "heartSoft", title: "Not sure what you need?", text: "Take our 60-second quiz and get a routine matched to your goals.", action: link("Take the wellness quiz") },
      { icon: "chatBubble", title: "Looking for something we don't stock?", text: "Tell us on WhatsApp and we'll let you know if it's coming.", action: link("Request a product") },
    ],
    compactTips: [
      "Check the spelling or use fewer words",
      "Search by goal: “sleep”, “energy”, “gut”",
      <>
        <a href="#">Take the wellness quiz</a> for a matched routine
      </>,
    ],
  },
} satisfies Meta<typeof SearchTips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
