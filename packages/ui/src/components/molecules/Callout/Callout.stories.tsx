import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "../../atoms";
import { Callout } from "./Callout";

const meta = {
  title: "Molecules/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-105"><Story /></div>],
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  args: {
    icon: "phone",
    children: (
      <>
        Signed up with your phone? You don&apos;t need a password. <TextLink href="#">Get a code instead</TextLink>
      </>
    ),
  },
};

export const DottedList: Story = {
  args: {
    title: "Can't find it?",
    items: [
      "Check your spam or promotions folder",
      <>
        Wrong address? <TextLink href="#">Try another email</TextLink>
      </>,
    ],
  },
};

export const CheckedList: Story = {
  args: {
    title: "Once verified, you can",
    marker: "check",
    items: [
      "Sign in with your email and password",
      "Get receipts and order updates by email",
      "Link past guest orders to your account",
    ],
  },
};
