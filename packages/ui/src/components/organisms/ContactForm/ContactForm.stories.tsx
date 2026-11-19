import type { Meta, StoryObj } from "@storybook/react-vite";

import { ContactForm } from "./ContactForm";

const meta = {
  title: "Organisms/ContactForm",
  component: ContactForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-170",
    topics: [
      { value: "order", label: "An existing order" },
      { value: "product", label: "A product question" },
      { value: "other", label: "Something else" },
    ],
    note: (
      <>
        We only use these details to answer you. <a href="#">Privacy policy</a>
      </>
    ),
  },
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Paper mobile artboard width (390): one column, button above the note. */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
