import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon } from "../../atoms";
import { LoadMore } from "./LoadMore";

const meta = {
  title: "Molecules/LoadMore",
  component: LoadMore,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    shown: 24,
    total: 41,
    className: "max-w-87.5",
    action: (
      <Button variant="secondary" size="md" className="w-full">
        Load more
        <Icon name="chevronDown" size={16} />
      </Button>
    ),
  },
} satisfies Meta<typeof LoadMore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllShown: Story = { args: { shown: 41, action: undefined } };
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
