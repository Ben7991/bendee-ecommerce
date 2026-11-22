import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "../../atoms";
import { AddressCard } from "./AddressCard";

const actions = (
  <>
    <TextLink href="#">Edit</TextLink>
    <TextLink href="#" tone="subtle">Remove</TextLink>
  </>
);

const meta = {
  title: "Molecules/AddressCard",
  component: AddressCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Home",
    icon: "home",
    isDefault: true,
    lines: ["Ama Mensah · +233 24 412 7781", "14 Lagos Avenue, East Legon", "Accra, Greater Accra"],
    note: "Opposite the Shell filling station, blue gate",
    actions,
    className: "max-w-125",
  },
} satisfies Meta<typeof AddressCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Not the default: "Set as default" instead of the pill. */
export const Other: Story = {
  args: {
    label: "Work",
    icon: "briefcase",
    isDefault: false,
    setDefault: <TextLink href="#">Set as default</TextLink>,
    lines: ["Ama Mensah · +233 24 412 7781", "Airport City, Ridge Tower, 4th floor", "Accra, Greater Accra"],
    note: "Ask for reception · GA-145-2290",
  },
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
