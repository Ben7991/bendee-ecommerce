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

/** The account tones: subtle ("Remove"), danger ("Cancel subscription"), inverse (on evergreen). */
export const AccountTones: Story = {
  render: () => (
    <div className="flex flex-col gap-3 font-sans text-sm">
      <p className="flex gap-5">
        <TextLink href="#">Edit</TextLink>
        <TextLink href="#" tone="subtle">Remove</TextLink>
        <TextLink href="#" tone="danger">Cancel subscription</TextLink>
      </p>
      <p className="w-fit rounded-lg bg-feature p-4">
        <TextLink href="#" tone="inverse">Manage</TextLink>
      </p>
    </div>
  ),
};
