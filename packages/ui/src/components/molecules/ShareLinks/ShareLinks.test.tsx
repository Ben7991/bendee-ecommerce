import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ShareLinks } from "./ShareLinks";

describe("ShareLinks", () => {
  it("links to WhatsApp with the message and url", () => {
    render(<ShareLinks url="https://jofak.com/p" message="Look:" className="mt-4" />);
    const link = screen.getByRole("link", { name: "Share on WhatsApp" });
    expect(link).toHaveAttribute("href", "https://wa.me/?text=Look%3A%20https%3A%2F%2Fjofak.com%2Fp");
    expect(link.closest("[data-slot=share-links]")).toHaveClass("mt-4");
  });

  it("copies the link", async () => {
    const user = userEvent.setup();
    render(<ShareLinks url="https://jofak.com/p" />);
    await user.click(screen.getByRole("button", { name: "Copy link" }));
    await expect(navigator.clipboard.readText()).resolves.toBe("https://jofak.com/p");
    expect(screen.getByRole("button", { name: "Link copied" })).toBeInTheDocument();
  });
});
