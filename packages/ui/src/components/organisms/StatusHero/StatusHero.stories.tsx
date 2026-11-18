import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Eyebrow, Icon, StatusPill } from "../../atoms";
import { NotifyForm, StatusCard } from "../../molecules";
import { StatusHero } from "./StatusHero";

const meta = {
  title: "Organisms/StatusHero",
  component: StatusHero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    emblem: { icon: "refreshLeaf", tone: "sage" },
    label: (
      <Eyebrow size="sm">
        <span className="md:hidden">Error 500</span>
        <span className="hidden md:inline">Error 500 · Something went wrong</span>
      </Eyebrow>
    ),
    title: (
      <>
        We&apos;re having a <em>moment</em>
      </>
    ),
    description: {
      short: "Something broke on our side, not yours. Your cart and account are safe. Please try again in a minute.",
      full: "Something broke on our side, not yours. Your cart and account are safe. Please try again in a minute.",
    },
    actions: (
      <>
        <Button size="md" className="w-full py-4 md:w-auto md:px-7">
          <Icon name="refresh" size={16} /> Try again
        </Button>
        <Button size="md" variant="outline" className="w-full py-4 md:w-auto md:px-7">
          Go to homepage
        </Button>
      </>
    ),
    notes: [
      { icon: "truck", title: "Already placed an order?", text: "It's safe and on its way. We'll keep texting you updates.", compactTitle: "Already ordered?", compactText: "It's safe and on its way." },
      {
        icon: "receipt",
        title: "Still not working?",
        text: (
          <>
            WhatsApp us and quote ref <strong>7F3A-21C9</strong>.
          </>
        ),
        compactTitle: "Still stuck?",
        compactText: (
          <>
            WhatsApp us with ref <strong>7F3A-21C9</strong>.
          </>
        ),
      },
    ],
  },
} satisfies Meta<typeof StatusHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ServerError: Story = {};
export const ServerErrorMobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

export const Maintenance: Story = {
  args: {
    emblem: { icon: "wrench", tone: "accent" },
    measure: "wide",
    label: <StatusPill label="Scheduled maintenance · in progress" compactLabel="Maintenance in progress" />,
    title: (
      <>
        Taking a short <em>breather</em>
      </>
    ),
    actions: undefined,
    children: (
      <>
        <StatusCard
          value="6:00 AM GMT · Sat 15 Nov"
          remaining={{ full: "about 2h 15m left", short: "~2h 15m" }}
          progress={45}
          started="Started 2:00 AM"
          updated={{ full: "Last updated 3:45 AM", short: "updated 3:45 AM" }}
          className="self-stretch md:w-130 md:self-auto"
        />
        <NotifyForm className="self-stretch md:self-auto" />
      </>
    ),
  },
};
