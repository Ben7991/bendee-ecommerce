import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms";
import { QuizCard } from "../QuizCard";
import { QuizBanner } from "./QuizBanner";

const meta = {
  title: "Organisms/QuizBanner",
  component: QuizBanner,
  tags: ["autodocs"],
  args: {
    eyebrow: "Personalised for you",
    title: (
      <>
        Not sure where to start? <em>Ask your body.</em>
      </>
    ),
    lede: {
      short: "12 quick questions. One personalised routine, reviewed by our nutritionists.",
      full: "Answer 12 quick questions about sleep, energy and stress. We'll build your wellness score and a routine that fits — reviewed by our in-house nutritionists.",
    },
    action: <Button arrow variant="accent">Start the Free Quiz</Button>,
    compactAction: <Button arrow variant="accent" className="w-full justify-between">Start the free quiz</Button>,
    note: "Takes about 2 minutes",
    card: (
      <QuizCard
        step={4}
        totalSteps={12}
        question="How do you usually feel when you wake up?"
        defaultValue="groggy"
        choices={[
          { value: "rested", label: "Rested and ready to go" },
          { value: "groggy", label: "Groggy until my second coffee" },
          { value: "tired", label: "Tired, even after a full night" },
        ]}
      />
    ),
  },
} satisfies Meta<typeof QuizBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
