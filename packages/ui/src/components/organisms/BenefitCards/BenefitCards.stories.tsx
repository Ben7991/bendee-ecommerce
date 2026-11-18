import type { Meta, StoryObj } from "@storybook/react-vite";

import { BenefitCards } from "./BenefitCards";

const meta = {
  title: "Organisms/BenefitCards",
  component: BenefitCards,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    benefits: [
      {
        icon: "sprout",
        title: "38 whole foods",
        text: "Spirulina, wheatgrass, moringa and more — no fillers.",
      },
      {
        icon: "gut",
        title: "Gut-friendly",
        text: "7 billion CFU probiotics plus prebiotic fibre.",
      },
      {
        icon: "bolt",
        title: "Steady energy",
        text: "No caffeine crash — adaptogens do the work.",
      },
      {
        icon: "shieldTick",
        title: "Lab tested",
        featured: true,
        text: (
          <>
            Every batch third-party tested. <a href="#">View certificate</a>
          </>
        ),
      },
    ],
  },
} satisfies Meta<typeof BenefitCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};
