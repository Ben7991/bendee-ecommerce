import type { Meta, StoryObj } from "@storybook/react-vite";

import { CookieBanner } from "./CookieBanner";

const meta = {
  title: "Organisms/CookieBanner",
  component: CookieBanner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    text: (
      <>
        Some keep the shop working, like your cart and sign-in. With your OK we&apos;d also use analytics and ad cookies to see
        what&apos;s working and show you relevant offers. You can change this any time from &quot;Cookie settings&quot; in the
        footer. <a href="#">Privacy policy</a>
      </>
    ),
    compactText: (
      <>
        Some keep the shop working, like your cart. With your OK we&apos;d also use analytics and ad cookies. Change this any time
        in &quot;Cookie settings&quot;. <a href="#">Privacy policy</a>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="h-150 bg-surface-subtle">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CookieBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
