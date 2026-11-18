import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: "Shop Bestsellers" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithArrow: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} arrow>Shop Bestsellers</Button>
      <Button {...args} arrow variant="secondary">Take the 2-min Quiz</Button>
      <Button {...args} arrow variant="outline" size="md">View all products</Button>
      <div className="rounded-xl bg-feature p-6">
        <Button {...args} arrow variant="accent">Start the Free Quiz</Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="xs">Add</Button>
      <Button {...args} size="sm">Join</Button>
      <Button {...args} size="md" variant="accent">Subscribe</Button>
      <Button {...args} size="sm" arrow>Shop now</Button>
      <Button {...args} size="lg" arrow>Shop Bestsellers</Button>
    </div>
  ),
};

/** Full-width form actions (auth pages). */
export const ExtraLarge: Story = {
  render: (args) => (
    <div className="flex max-w-105 flex-col gap-3">
      <Button {...args} size="xl">Sign in</Button>
      <Button {...args} size="xl" variant="secondary" className="text-base">Continue with email</Button>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
