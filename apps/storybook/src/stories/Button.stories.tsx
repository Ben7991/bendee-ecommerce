import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@repo/ui/button";

/**
 * `Button` from `@repo/ui/button`. It is unstyled: pass a `className` to style it.
 * Clicking it calls `alert()` with the `appName` prop.
 *
 * The styled variants below use example `jofak-button*` classes (Storybook only)
 * built on the Jofak tokens.
 */
const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    appName: "Jofak",
    children: "Add to cart",
    className: "jofak-button jofak-button--primary",
  },
  argTypes: {
    className: {
      control: "select",
      options: [
        "jofak-button jofak-button--primary",
        "jofak-button jofak-button--accent",
        "jofak-button jofak-button--secondary",
        "jofak-button jofak-button--primary jofak-button--sm",
        "",
      ],
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Accent: Story = {
  args: {
    className: "jofak-button jofak-button--accent",
    children: "Shop the reset",
  },
};

export const Secondary: Story = {
  args: {
    className: "jofak-button jofak-button--secondary",
    children: "View details",
  },
};

export const Small: Story = {
  args: {
    className: "jofak-button jofak-button--primary jofak-button--sm",
    children: "Add",
  },
};

export const LongLabel: Story = {
  args: {
    children: "Add 3 in-stock favourites to cart · GHS 486.00",
  },
};

/** No `className`: the component's own (browser default) rendering. */
export const Unstyled: Story = {
  args: {
    className: undefined,
    children: "Click me",
  },
};
