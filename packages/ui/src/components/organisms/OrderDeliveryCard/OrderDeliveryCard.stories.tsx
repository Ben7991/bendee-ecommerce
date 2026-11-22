import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderDeliveryCard } from "./OrderDeliveryCard";

const meta = {
  title: "Organisms/OrderDeliveryCard",
  component: OrderDeliveryCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    method: "Same day",
    compactMethod: "Same day · by 18:00",
    street: "House 14, Firestone Road",
    area: "Madina, Accra · Greater Accra",
    compactArea: "Madina, Accra · Behind the Total station",
    gps: { code: "GM-071-4472", mapsHref: "#" },
    landmark: "Behind the Total station, Zongo junction",
    note: "Please call when you reach the gate.",
    tracking: { action: "#" },
    className: "xl:w-90",
  },
} satisfies Meta<typeof OrderDeliveryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Pickup: Story = { args: { method: "Pickup", street: "Osu store", area: "Oxford Street, Osu", gps: undefined, landmark: undefined, note: undefined, tracking: undefined } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
