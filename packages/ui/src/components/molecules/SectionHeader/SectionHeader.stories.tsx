import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Heading } from "../../atoms";
import { SectionHeader } from "./SectionHeader";

const meta = {
  title: "Molecules/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    eyebrow: "Shop by goal",
    title: (
      <Heading className="max-w-155">
        Gentle support for every part of <em>your day.</em>
      </Heading>
    ),
    aside: (
      <Button arrow variant="outline" size="md">
        View all products
      </Button>
    ),
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
