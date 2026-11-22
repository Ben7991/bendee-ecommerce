import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, Button, Icon } from "../../atoms";
import { BreadcrumbItem, Breadcrumbs, NoticeBanner, StaffNote } from "../../molecules";
import { CollectionHero } from "./CollectionHero";

const chips = (
  <>
    <Badge variant="accent" size="lg" className="font-bold">
      Up to 20% off
    </Badge>
    <Badge variant="outline" size="lg" className="font-semibold">
      <Icon name="clock" size={14} /> Ends Sat 31 Jan
    </Badge>
  </>
);

const meta = {
  title: "Organisms/CollectionHero",
  component: CollectionHero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    breadcrumbs: (
      <Breadcrumbs>
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Collections</BreadcrumbItem>
        <BreadcrumbItem current>Harmattan reset</BreadcrumbItem>
      </Breadcrumbs>
    ),
    eyebrow: "Dry season collection",
    title: (
      <>
        The Harmattan <em>reset</em>
      </>
    ),
    description: "Dry air, dust and cold mornings take it out of you. Twelve picks for skin, immunity and steady energy until the rains come back.",
    compactDescription: "Twelve picks for skin, immunity and steady energy through the dry season.",
    chips,
    products: [
      { id: "a", tint: "amber" },
      { id: "b", tint: "sage" },
      { id: "c", tint: "lavender" },
    ],
    children: (
      <StaffNote
        quote="Start with the greens and a probiotic for immunity."
        author="Efua A."
        role="Jofak nutritionist"
        action={<Button size="sm">Get the 3-pack · save 25%</Button>}
      />
    ),
  },
} satisfies Meta<typeof CollectionHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** After the deal: the ended notice above the staff note. */
export const Ended: Story = {
  args: {
    chips: (
      <Badge variant="outline" size="lg" className="font-semibold">
        <Icon name="clock" size={14} /> Sale ended Sat 31 Jan
      </Badge>
    ),
    children: <NoticeBanner title="This sale ended on Sat 31 Jan" description="Prices are back to normal." action={<Button size="xs" variant="secondary">See current offers</Button>} />,
  },
};

/** The hub's featured banner with its own page heading. */
export const Featured: Story = {
  args: {
    variant: "featured",
    breadcrumbs: undefined,
    heading: { title: "Offers & collections", description: "Seasonal sales, staff picks and everyday edits." },
    eyebrow: "Featured · Dry season sale",
    action: <Button size="sm" variant="secondary">Shop the collection</Button>,
    children: undefined,
  },
};

export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
