import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon } from "../../atoms";
import { PillSelect } from "../../molecules";
import { SavedToolbar } from "./SavedToolbar";

const sorts = [
  { value: "recent", label: "Recently saved" },
  { value: "price-asc", label: "Price: low to high" },
];

const meta = {
  title: "Organisms/SavedToolbar",
  component: SavedToolbar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    summary: (
      <>
        <strong>6</strong> saved · 5 in stock · <strong>GHS 2,280</strong> together
      </>
    ),
    compactSummary: "5 in stock · GHS 2,280 together",
    sort: <PillSelect label="Sort favourites" prefix="Sort:" options={sorts} />,
    compactSort: <PillSelect label="Sort favourites" variant="block" options={sorts} />,
    action: (
      <Button size="xs" className="h-11 w-full gap-2 md:h-auto md:w-auto md:px-4.5 md:py-2.75">
        <Icon name="bag" size={14} />
        <span className="md:hidden">Add 5 to cart</span>
        <span className="hidden md:inline">Add 5 in stock to cart</span>
      </Button>
    ),
  },
} satisfies Meta<typeof SavedToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { parameters: { layout: "fullscreen" }, globals: { viewport: { value: "mobile", isRotated: false } } };
