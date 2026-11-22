import type { Meta, StoryObj } from "@storybook/react-vite";

import { DefinitionTable } from "./DefinitionTable";

const meta = {
  title: "Molecules/DefinitionTable",
  component: DefinitionTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-170",
    items: [
      { term: "Contact details", description: "Name, phone number and, if you give it, email." },
      { term: "Delivery details", description: "Addresses, landmarks, GhanaPost GPS codes and recipient phone numbers." },
      { term: "Browsing", description: "Pages viewed and device type, only if you allow analytics cookies." },
    ],
  },
} satisfies Meta<typeof DefinitionTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Paper mobile artboard width (390): terms stack above their descriptions. */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
