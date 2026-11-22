import type { Meta, StoryObj } from "@storybook/react-vite";

import { TEMPLATE_ARGS } from "./data";
import { TemplateEditor } from "./TemplateEditor";

const meta = {
  title: "Organisms/TemplateEditor",
  component: TemplateEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: TEMPLATE_ARGS,
} satisfies Meta<typeof TemplateEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** Email: a subject line and an inbox preview instead of the SMS count. */
export const Email: Story = { args: { channel: "email", defaultValue: { enabled: true, subject: "Your order {order_number} is on its way", body: "Hi {first_name},\n\nYour order is with {courier}." } } };
