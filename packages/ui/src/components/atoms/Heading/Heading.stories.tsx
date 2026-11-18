import type { Meta, StoryObj } from "@storybook/react-vite";

import { Heading } from "./Heading";

const meta = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hero: Story = {
  args: {
    as: "h1",
    size: "hero",
    className: "max-w-150",
    children: (
      <>
        Daily rituals for a body that feels <em>naturally</em> well.
      </>
    ),
  },
};

export const Section: Story = {
  args: {
    children: (
      <>
        Gentle support for every part of <em>your day.</em>
      </>
    ),
  },
};

export const Feature: Story = {
  args: {
    size: "feature",
    tone: "inverse",
    children: (
      <>
        Not sure where to start? <em>Ask your body.</em>
      </>
    ),
  },
  render: (args) => (
    <div className="rounded-3xl bg-gradient-feature-wide p-12">
      <Heading {...args} />
    </div>
  ),
};

export const Auth: Story = {
  args: {
    as: "h1",
    size: "auth",
    children: (
      <>
        Sign in or <em>join</em>
      </>
    ),
  },
};

export const Dialog: Story = {
  args: {
    size: "dialog",
    children: (
      <>
        Password <em>updated</em>
      </>
    ),
  },
};
