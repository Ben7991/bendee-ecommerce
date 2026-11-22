import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button, Icon, TextLink } from "../../atoms";
import { SuccessDialog } from "./SuccessDialog";

const meta = {
  title: "Organisms/SuccessDialog",
  component: SuccessDialog,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    open: true,
    onOpenChange: () => {},
    title: (
      <>
        Password <em>updated</em>
      </>
    ),
    description:
      "You can now sign in with your new password. We've signed you out of your other devices to keep your account safe.",
    action: (
      <Button size="xl" className="w-full">
        Continue to sign in <Icon name="arrowRight" size={16} />
      </Button>
    ),
    footer: (
      <>
        Didn&apos;t make this change? <TextLink href="#">Contact support</TextLink>
      </>
    ),
  },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open);
    return (
      <div className="p-6">
        <Button onClick={() => setOpen(true)}>Open</Button>
        <SuccessDialog {...args} open={open} onOpenChange={setOpen} />
      </div>
    );
  },
} satisfies Meta<typeof SuccessDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tablet and desktop: centred card. */
export const Modal: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };

/** Mobile: bottom sheet. */
export const Sheet: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
