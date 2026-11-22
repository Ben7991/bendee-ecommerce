import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CookieSettings } from "./CookieSettings";

const categories = [
  { id: "necessary", title: "Necessary", description: "Cart and sign-in.", required: true },
  { id: "analytics", title: "Analytics", description: "Google Analytics." },
  { id: "marketing", title: "Marketing", description: "Ads." },
];

describe("CookieSettings", () => {
  it("starts from the saved choices and saves the new ones", async () => {
    const onSave = vi.fn();
    render(
      <CookieSettings
        open
        onOpenChange={() => {}}
        categories={categories}
        value={{ analytics: true, marketing: false }}
        onSave={onSave}
        onAcceptAll={() => {}}
        privacyLink={<a href="/pages/privacy">Privacy policy</a>}
      />,
    );
    expect(screen.getByRole("dialog", { name: "Cookie settings" })).toBeInTheDocument();
    expect(screen.getByText("Always on")).toBeInTheDocument();
    const analytics = screen.getByRole("switch", { name: "Analytics" });
    const marketing = screen.getByRole("switch", { name: "Marketing" });
    expect(analytics).toBeChecked();
    expect(marketing).not.toBeChecked();

    await userEvent.click(marketing);
    await userEvent.click(screen.getByRole("button", { name: "Save choices" }));
    expect(onSave).toHaveBeenCalledWith({ analytics: true, marketing: true });
  });

  it("accepts all and closes", async () => {
    const onAcceptAll = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CookieSettings open onOpenChange={onOpenChange} categories={categories} value={{}} onSave={() => {}} onAcceptAll={onAcceptAll} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Accept all" }));
    expect(onAcceptAll).toHaveBeenCalledOnce();
    await userEvent.click(screen.getByRole("button", { name: "Close cookie settings" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
