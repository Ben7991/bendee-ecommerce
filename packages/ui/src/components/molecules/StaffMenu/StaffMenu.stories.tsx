import type { Meta, StoryObj } from "@storybook/react-vite";

import { Initials } from "../../atoms";
import { StaffMenu } from "./StaffMenu";

const meta = {
  title: "Molecules/StaffMenu",
  component: StaffMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    name: "Abena Mensah",
    detail: "abena@jofak.com · Owner",
    trigger: (
      <button type="button" aria-label="Account" className="rounded-full">
        <Initials name="Abena Mensah" size="staff" />
      </button>
    ),
    items: [
      { label: "My profile & sign-in", icon: "user", href: "#" },
      { label: "Sign out", icon: "signOut", href: "#" },
    ],
  },
} satisfies Meta<typeof StaffMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Desktop: a popover above the sidebar staff card. Click the avatar. */
export const Default: Story = {};

/** Mobile: a bottom sheet from the top-bar avatar, with Settings added. */
export const Sheet: Story = {
  args: {
    presentation: "sheet",
    items: [
      { label: "My profile & sign-in", icon: "user", href: "#" },
      { label: "Settings", icon: "settings", href: "#" },
      { label: "Sign out", icon: "signOut", href: "#" },
    ],
  },
  globals: { viewport: { value: "mobile", isRotated: false } },
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
