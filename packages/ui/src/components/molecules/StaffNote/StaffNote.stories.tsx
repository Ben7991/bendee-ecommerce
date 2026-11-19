import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon } from "../../atoms";
import { StaffNote } from "./StaffNote";

const meta = {
  title: "Molecules/StaffNote",
  component: StaffNote,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    quote: "Start with the greens and a probiotic for immunity, add magnesium if the cold mornings are wrecking your sleep.",
    compactQuote: "Start with greens and a probiotic, add magnesium if cold mornings wreck your sleep.",
    author: "Efua A.",
    role: "Jofak nutritionist",
    action: (
      <Button size="sm" className="gap-2">
        Get the 3-pack · save 25% <Icon name="arrowRight" size={14} />
      </Button>
    ),
  },
} satisfies Meta<typeof StaffNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
