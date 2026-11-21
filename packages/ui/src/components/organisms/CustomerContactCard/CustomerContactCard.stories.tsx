import type { Meta, StoryObj } from "@storybook/react-vite";

import { CustomerContactCard } from "./CustomerContactCard";

const meta = {
  title: "Organisms/CustomerContactCard",
  component: CustomerContactCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="grid max-w-90 gap-4 md:max-w-none md:grid-cols-2 xl:max-w-90 xl:grid-cols-1">
        <Story />
      </div>
    ),
  ],
  args: {
    phone: { masked: "024 ••• 4521", full: "024 555 4521" },
    email: { masked: "ef•••@gmail.com", full: "efua.boateng@gmail.com" },
    address: {
      lines: ["Blue gate opposite Koala, Oxford St", "Osu, Accra · Greater Accra"],
      compact: "Blue gate opposite Koala, Oxford St, Osu, Accra",
      ghanaPost: "GA-039-5521",
      mapsHref: "#",
      more: { label: "+1 more", compactLabel: "+1", href: "#" },
    },
    addNoteHref: "#notes",
  },
} satisfies Meta<typeof CustomerContactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const WithoutAddress: Story = { args: { address: undefined } };
/** Contact and address side by side (the page grid). */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
