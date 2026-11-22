import type { Meta, StoryObj } from "@storybook/react-vite";

import { AuthIntro } from "./AuthIntro";

const meta = {
  title: "Organisms/AuthIntro",
  component: AuthIntro,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="flex max-w-105 flex-col gap-6"><Story /></div>],
  args: {
    title: (
      <>
        Sign in or <em>join</em>
      </>
    ),
    description: "Use your phone number — we'll text you a code. No password needed.",
  },
} satisfies Meta<typeof AuthIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {};

export const WithBackLink: Story = {
  args: {
    back: { href: "#", label: "Back" },
    title: "Enter your code",
    descriptionSize: "md",
    description: (
      <>
        We texted a 6-digit code to <strong>+233 24 412 7781</strong>.
      </>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    back: { href: "#", label: "Back to sign in" },
    icon: "key",
    title: (
      <>
        Forgot your <em>password?</em>
      </>
    ),
    description: "Enter the email on your account and we'll send you a link to reset it. The link expires in 30 minutes.",
  },
};

export const WithStatus: Story = {
  args: {
    status: "Account created · you're signed in",
    icon: "mailCheck",
    iconSize: 30,
    title: (
      <>
        Verify your <em>email</em>
      </>
    ),
    description: (
      <>
        We sent a link to <strong>ama.mensah@gmail.com</strong>. Tap it to confirm it&apos;s you. The link works for 24 hours.
      </>
    ),
  },
};
