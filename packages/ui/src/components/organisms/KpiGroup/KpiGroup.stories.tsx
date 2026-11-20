import type { Meta, StoryObj } from "@storybook/react-vite";

import { KpiTile } from "../../molecules";
import { KpiGroup } from "./KpiGroup";

const meta = {
  title: "Organisms/KpiGroup",
  component: KpiGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "Today at a glance",
    children: (
      <>
        <KpiTile
          tone="feature"
          label="Revenue today"
          currency="GHS"
          value="4,820.00"
          delta={{ label: "+12.4%", tone: "up" }}
          comparison="vs last Sunday"
          trend={[5, 8, 6, 13, 11, 16, 14, 20, 21]}
        />
        <KpiTile label="Orders" value="37" delta={{ label: "+8.8%", tone: "up" }} comparison="34 last Sunday" trend={[6, 5, 10, 8, 13, 11, 16, 14, 18]} />
        <KpiTile label="Average order" currency="GHS" value="130.27" delta={{ label: "+3.3%", tone: "up" }} comparison="vs last Sunday" trend={[10, 12, 9, 11, 10, 14, 12, 15, 15]} />
        <KpiTile label="Conversion rate" value="2.8%" delta={{ label: "−0.4 pts", tone: "down" }} comparison="1,322 sessions" trend={[16, 18, 15, 16, 12, 14, 10, 11, 9]} />
      </>
    ),
  },
} satisfies Meta<typeof KpiGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One row from 1440px. */
export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
