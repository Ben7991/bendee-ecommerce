import { render, screen } from "@testing-library/react";

import { StorefrontShell } from "./StorefrontShell";

describe("StorefrontShell", () => {
  it("wraps content in main with a skip link and renders the footer", () => {
    render(<StorefrontShell footer={<footer>Footer</footer>}>Content</StorefrontShell>);
    expect(screen.getByRole("main")).toHaveTextContent("Content");
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Footer");
  });
});
