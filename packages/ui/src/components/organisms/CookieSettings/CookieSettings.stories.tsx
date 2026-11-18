import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { CookieSettings, type CookieChoices, type CookieSettingsProps } from "./CookieSettings";

const categories = [
  { id: "necessary", title: "Necessary", description: "Cart, sign-in, checkout and security. Can't be switched off.", required: true },
  { id: "analytics", title: "Analytics", description: "Google Analytics. Helps us see which pages are slow or confusing. No ads." },
  { id: "marketing", title: "Marketing", description: "Meta, TikTok and Google Ads. Lets us show you Jofak offers on other sites and measure our ads." },
];

function Demo(props: Partial<CookieSettingsProps>) {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState<CookieChoices>({ analytics: true, marketing: false });
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="font-sans text-sm underline">
        Cookie settings
      </button>
      <CookieSettings
        open={open}
        onOpenChange={setOpen}
        categories={categories}
        value={value}
        onSave={(choices) => {
          setValue(choices);
          setOpen(false);
        }}
        onAcceptAll={() => {
          setValue({ analytics: true, marketing: true });
          setOpen(false);
        }}
        description="Choose which cookies Jofak can use. Necessary cookies are always on because the shop doesn't work without them."
        privacyLink={<a href="#">Privacy policy</a>}
        {...props}
      />
    </>
  );
}

const meta = {
  title: "Organisms/CookieSettings",
  component: CookieSettings,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  render: (args) => <Demo {...args} />,
  args: {
    open: true,
    onOpenChange: () => {},
    categories,
    value: { analytics: true, marketing: false },
    onSave: () => {},
    onAcceptAll: () => {},
  },
} satisfies Meta<typeof CookieSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
