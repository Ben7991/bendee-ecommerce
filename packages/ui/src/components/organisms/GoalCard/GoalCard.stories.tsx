import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, Icon, Illustration } from "../../atoms";
import { GoalCard } from "./GoalCard";

const meta = {
  title: "Organisms/GoalCard",
  component: GoalCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { href: "#", title: "Gut & Digestion", description: "Probiotics and fibre for a happy, balanced belly." },
} satisfies Meta<typeof GoalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTones: Story = {
  render: () => (
    <div className="flex h-110 gap-3">
      <GoalCard
        tone="feature"
        size="feature"
        href="#"
        className="w-108 shrink-0"
        title="Sleep & Stress Recovery"
        description="Magnesium, ashwagandha and chamomile to quiet the mind and wake up restored."
        top={<Badge variant="glass" size="lg">8 products</Badge>}
        art={<Illustration name="moon" className="absolute -top-7.5 -right-10 size-75" />}
        footer={
          <div className="flex gap-2 pt-2">
            <Badge variant="accent" size="lg">Deeper sleep</Badge>
            <Badge variant="outline" size="lg">Less stress</Badge>
          </div>
        }
      />
      <GoalCard
        className="flex-1"
        href="#"
        title="Focus & Energy"
        description="Lion's mane, B12 and green tea for clean, steady energy."
        media={
          <div className="relative size-full overflow-hidden rounded-lg bg-gradient-sun">
            <Illustration name="sun" className="absolute top-1/2 left-1/2 size-45 -translate-x-1/2 -translate-y-1/2" />
          </div>
        }
      />
      <GoalCard
        tone="accent"
        className="flex-1"
        href="#"
        title="Gut & Digestion"
        description="Probiotics and fibre for a happy, balanced belly."
        top={
          <span className="flex size-12 items-center justify-center rounded-full bg-primary text-accent">
            <Icon name="arrowUpRight" />
          </span>
        }
        art={<Illustration name="leaf" className="absolute -top-10 -right-15 h-65 w-60" />}
      />
      <GoalCard
        tone="citrus"
        className="flex-1"
        href="#"
        title="Immunity"
        description="Vitamin C, zinc & elderberry for every season."
        top={<p className="text-xs leading-xs font-semibold tracking-caps text-citrus-800 dark:text-error">NEW</p>}
        art={<Illustration name="orange" className="absolute top-1/2 left-1/2 -mt-4.5 size-50 -translate-x-1/2 -translate-y-1/2" />}
      />
    </div>
  ),
};
