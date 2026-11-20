import type { Meta, StoryObj } from "@storybook/react-vite";

import { TaskTile } from "../../molecules";
import { AttentionPanel } from "./AttentionPanel";

const meta = {
  title: "Organisms/AttentionPanel",
  component: AttentionPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    meta: "Updated 2 min ago",
    children: (
      <>
        <TaskTile href="#" icon="box" value="9" label="Orders to pack" />
        <TaskTile href="#" icon="pickup" value="5" label="Waiting for pickup" />
        <TaskTile href="#" icon="scooter" value="11" label="Out for delivery" />
        <TaskTile href="#" tone="citrus" icon="card" value="3" label="Failed payments, 24 h" />
        <TaskTile
          href="#"
          tone="sun"
          icon="banknote"
          value={
            <>
              <span className="text-14 text-text-secondary">GHS </span>1,240
            </>
          }
          label="Cash on delivery to remit"
        />
      </>
    ),
  },
} satisfies Meta<typeof AttentionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One row of five from 1440px. */
export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
/** Three, then two. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Two per row; the fifth spans the row. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
