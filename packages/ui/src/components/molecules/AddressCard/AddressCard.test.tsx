import { render, screen } from "@testing-library/react";

import { AddressCard } from "./AddressCard";

describe("AddressCard", () => {
  it("marks the default address", () => {
    render(<AddressCard label="Home" isDefault lines={["14 Lagos Avenue"]} note="Blue gate" className="mt-4" />);
    const card = screen.getByRole("article", { name: "Home" });
    expect(card).toHaveClass("bg-sage-50", "mt-4");
    expect(screen.getByText("Default")).toBeInTheDocument();
    expect(screen.getByText("Blue gate")).toHaveClass("text-text-muted");
  });

  it("offers set-as-default on the others", () => {
    render(<AddressCard label="Work" lines={["Airport City"]} setDefault={<a href="#">Set as default</a>} actions={<a href="#">Edit</a>} />);
    expect(screen.queryByText("Default")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Set as default" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Edit" })).toBeInTheDocument();
  });
});
