import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderMoreMenu } from "./OrderMoreMenu";

const meta = {
  title: "Organisms/OrderMoreMenu",
  component: OrderMoreMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    items: [
      { label: "Customer profile", href: "#", icon: "user" },
      { label: "Print invoice", href: "#", icon: "receipt" },
      { label: "All orders from Ama", href: "#", icon: "box" },
    ],
  },
} satisfies Meta<typeof OrderMoreMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the ⋯ button. */
export const Default: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
