import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CookieBanner } from "./CookieBanner";

describe("CookieBanner", () => {
  it("offers accept, necessary-only and customise", async () => {
    const onAcceptAll = vi.fn();
    const onNecessaryOnly = vi.fn();
    const onCustomise = vi.fn();
    render(
      <CookieBanner
        text={
          <>
            We use cookies. <a href="/pages/privacy">Privacy policy</a>
          </>
        }
        onAcceptAll={onAcceptAll}
        onNecessaryOnly={onNecessaryOnly}
        onCustomise={onCustomise}
        className="mt-4"
      />,
    );
    expect(screen.getByRole("region", { name: "We use cookies" })).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "Privacy policy" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Accept all" }));
    await userEvent.click(screen.getByRole("button", { name: "Necessary only" }));
    await userEvent.click(screen.getByRole("button", { name: "Customise" }));
    expect(onAcceptAll).toHaveBeenCalledOnce();
    expect(onNecessaryOnly).toHaveBeenCalledOnce();
    expect(onCustomise).toHaveBeenCalledOnce();
  });
});
