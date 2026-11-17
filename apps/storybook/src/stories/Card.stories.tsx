import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "@repo/ui/card";

/**
 * `Card` from `@repo/ui/card`: an external link (opens in a new tab) with a title,
 * an arrow and body text. It appends create-turbo UTM parameters to `href`.
 *
 * Styled variants use example `jofak-card*` classes (Storybook only).
 */
const meta = {
  title: "Components/Card",
  component: Card,
  args: {
    title: "Delivery & returns",
    children:
      "Free delivery in Accra on orders over GHS 300. Returns within 14 days.",
    href: "https://example.com/pages/delivery-returns",
    className: "jofak-card",
  },
  argTypes: {
    className: {
      control: "select",
      options: ["jofak-card", "jofak-card jofak-card--outline", ""],
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Outline: Story = {
  args: {
    className: "jofak-card jofak-card--outline",
  },
};

export const LongContent: Story = {
  args: {
    title: "Magnesium glycinate for calmer evenings and deeper sleep",
    children:
      "Gentle on the stomach and easy to take with dinner. Pair it with our evening tea for a wind-down ritual that sticks, and track how you feel over the first four weeks.",
  },
};

export const Grid: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gap: "var(--spacing-4)",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      }}
    >
      <Card {...args} title="Shop by need">
        Sleep, stress, energy and gut health picks.
      </Card>
      <Card {...args} title="Track an order">
        Enter your order number and phone to see where it is.
      </Card>
      <Card {...args} title="Help">
        Questions about MoMo payments or delivery? We reply within a day.
      </Card>
    </div>
  ),
};

/** No `className`: the component's own (browser default) rendering. */
export const Unstyled: Story = {
  args: {
    className: undefined,
  },
};
