import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "./TextLink";

const meta = {
  title: "Atoms/TextLink",
  component: TextLink,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { href: "#", children: "Sign in with email and password" },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {
  render: (args) => (
    <p className="font-sans text-sm leading-sm text-text-secondary">
      Prefer email? <TextLink {...args} />
    </p>
  ),
};

export const Muted: Story = {
  args: { tone: "muted", children: "Terms" },
  render: (args) => (
    <p className="font-sans text-xs leading-xs text-text-muted">
      By continuing you agree to our <TextLink {...args} /> and <TextLink tone="muted" href="#">Privacy policy</TextLink>.
    </p>
  ),
};
