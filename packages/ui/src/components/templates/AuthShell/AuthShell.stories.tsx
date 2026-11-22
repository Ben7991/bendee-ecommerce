import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, TextLink } from "../../atoms";
import { PhoneField } from "../../molecules";
import { AuthIntro } from "../../organisms";
import { AuthShell } from "./AuthShell";

const meta = {
  title: "Templates/AuthShell",
  component: AuthShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    headline: (
      <>
        Your wellness,
        <br />
        one tap <em>away</em>
      </>
    ),
    benefits: ["Track every order to your door", "Reorder your routine in one tap", "Manage subscriptions and addresses"],
    products: [
      <span key="a" className="block size-full rounded-xl bg-white/10" />,
      <span key="b" className="block size-full rounded-xl bg-white/10" />,
    ],
    columnClassName: "md:px-5",
    children: (
      <>
        <AuthIntro
          title={
            <>
              Sign in or <em>join</em>
            </>
          }
          description="Use your phone number — we'll text you a code. No password needed."
        />
        <PhoneField defaultValue="24 412 7781" />
        <Button size="xl" className="h-14 w-full">Send me a code</Button>
        <p className="mt-auto pt-4 text-center font-sans text-xs leading-xs text-text-muted xl:mt-0">
          By continuing you agree to our <TextLink tone="muted" href="#">Terms</TextLink>.
        </p>
      </>
    ),
  },
} satisfies Meta<typeof AuthShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const MobileWithoutLogoBar: Story = {
  args: { mobileHeader: false },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
