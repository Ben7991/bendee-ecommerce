import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon } from "../../atoms";
import { DeliveryBanner } from "./DeliveryBanner";

const meta = {
  title: "Molecules/DeliveryBanner",
  component: DeliveryBanner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    eyebrow: "With our delivery partner",
    title: "Arriving today, 11:00–13:00",
    compactTitle: "By 13:00 today",
    className: "max-w-155",
    action: (
      <Button asChild size="sm" variant="secondary" className="gap-2 border-0">
        <a href="#">
          <Icon name="arrowUpRight" size={14} /> Track parcel
        </a>
      </Button>
    ),
  },
} satisfies Meta<typeof DeliveryBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
