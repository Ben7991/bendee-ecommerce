import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChoiceGroup } from "./ChoiceGroup";

const meta = {
  title: "Molecules/ChoiceGroup",
  component: ChoiceGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "How do you usually feel when you wake up?",
    defaultValue: "groggy",
    className: "max-w-96",
    choices: [
      { value: "rested", label: "Rested and ready to go" },
      { value: "groggy", label: "Groggy until my second coffee" },
      { value: "tired", label: "Tired, even after a full night" },
    ],
  },
} satisfies Meta<typeof ChoiceGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
