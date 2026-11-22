import type { Meta, StoryObj } from "@storybook/react-vite";

import { CustomerNotesCard } from "./CustomerNotesCard";

const strong = (text: string) => <strong className="font-semibold text-text">{text}</strong>;

const meta = {
  title: "Organisms/CustomerNotesCard",
  component: CustomerNotesCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    id: "notes",
    events: [
      {
        id: "1",
        kind: "note",
        author: "Abena M.",
        time: "6 Nov",
        body: "Prefers delivery after 4pm. Gate is the blue one opposite Koala, Osu.",
        compactBody: "Prefers delivery after 4pm. Blue gate opposite Koala, Osu.",
      },
      { id: "2", kind: "tag", time: "1 Nov", body: <>Tagged {strong("VIP")} automatically after spending over GHS 3,000</>, compactBody: <>Tagged {strong("VIP")} automatically</> },
      { id: "3", kind: "refund", time: "5 Oct", body: <>Refund of {strong("GHS 70")} on JFK-251188 to MoMo by Kofi A.</>, wideOnly: true },
    ],
  },
} satisfies Meta<typeof CustomerNotesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** The latest note only; the composer opens when the card is the URL target (#notes). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
