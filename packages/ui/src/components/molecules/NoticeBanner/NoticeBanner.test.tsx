import { render, screen } from "@testing-library/react";

import { NoticeBanner } from "./NoticeBanner";

describe("NoticeBanner", () => {
  it("announces the notice with its action", () => {
    render(<NoticeBanner title="This sale ended on Sat 31 Jan" description="Prices are back to normal." action={<a href="/collections">See current offers</a>} className="mt-4" />);
    const notice = screen.getByRole("status");
    expect(notice).toHaveClass("bg-tint-sun", "mt-4");
    expect(notice).toHaveTextContent("This sale ended on Sat 31 Jan");
    expect(screen.getByRole("link", { name: "See current offers" })).toHaveAttribute("href", "/collections");
  });
});
