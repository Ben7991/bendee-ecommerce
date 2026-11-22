import type { Meta, StoryObj } from "@storybook/react-vite";

import { QuizCard } from "./QuizCard";

const meta = {
  title: "Organisms/QuizCard",
  component: QuizCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-110",
    step: 4,
    totalSteps: 12,
    question: "How do you usually feel when you wake up?",
    defaultValue: "groggy",
    choices: [
      { value: "rested", label: "Rested and ready to go" },
      { value: "groggy", label: "Groggy until my second coffee" },
      { value: "tired", label: "Tired, even after a full night" },
    ],
  },
} satisfies Meta<typeof QuizCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
