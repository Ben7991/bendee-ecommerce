import type { Meta, StoryObj } from "@storybook/react-vite";
import { Code } from "@repo/ui/code";

/**
 * `Code` from `@repo/ui/code`: an inline `<code>` element.
 *
 * Styled variants use example `jofak-code*` classes (Storybook only).
 */
const meta = {
  title: "Components/Code",
  component: Code,
  args: {
    children: "JOFAK-10",
    className: "jofak-code",
  },
  argTypes: {
    className: {
      control: "select",
      options: ["jofak-code", "jofak-code jofak-code--accent", ""],
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Accent: Story = {
  args: {
    className: "jofak-code jofak-code--accent",
  },
};

export const InText: Story = {
  render: (args) => (
    <p
      style={{
        margin: 0,
        fontSize: "var(--text-base)",
        lineHeight: "var(--leading-base)",
      }}
    >
      Use code <Code {...args} /> at checkout for 10% off your first order.
    </p>
  ),
};

/** No `className`: the component's own (browser default) rendering. */
export const Unstyled: Story = {
  args: {
    className: undefined,
  },
};
