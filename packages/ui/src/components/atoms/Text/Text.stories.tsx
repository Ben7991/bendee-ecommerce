import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "../TextLink";
import { Text } from "./Text";

const meta = {
  title: "Atoms/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: "New here? We'll create your account automatically." },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
  args: {
    align: "center",
    children: (
      <>
        Already have an account? <TextLink href="#">Sign in</TextLink>
      </>
    ),
  },
};
export const Legal: Story = { args: { size: "xs", tone: "muted", align: "center" } };
export const Timer: Story = {
  args: {
    size: "sm",
    tone: "muted",
    children: (
      <>
        Didn&apos;t get it? Resend in <strong>0:42</strong>
      </>
    ),
  },
};
