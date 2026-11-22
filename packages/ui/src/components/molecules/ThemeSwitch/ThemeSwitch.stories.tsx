import type { Meta, StoryObj } from "@storybook/react-vite";

import { ThemeProvider } from "../../../lib";
import { ThemeSwitch } from "./ThemeSwitch";

/**
 * Wired to the real ThemeProvider, so it changes the whole Storybook canvas (and overrides the
 * toolbar theme until you pick System again).
 */
const meta = {
  title: "Molecules/ThemeSwitch",
  component: ThemeSwitch,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <ThemeProvider><Story /></ThemeProvider>],
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnFeature: Story = {
  args: { tone: "feature" },
  render: (args) => (
    <div className="rounded-2xl bg-feature p-8">
      <ThemeSwitch {...args} />
    </div>
  ),
};

/** Settings field: full width with every label (My profile → Appearance). */
export const Field: Story = { args: { tone: "field", label: "Appearance" } };
