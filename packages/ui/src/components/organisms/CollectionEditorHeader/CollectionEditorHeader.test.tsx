import { render, screen } from "@testing-library/react";

import { CollectionEditorHeader } from "./CollectionEditorHeader";

describe("CollectionEditorHeader", () => {
  it("names the collection with its status, address and actions", () => {
    render(
      <form>
        <CollectionEditorHeader className="mt-4" backHref="/c" name="Harmattan glow" status={{ label: "Live", tone: "success" }} featured urlPrefix="jofak.com/collections/" slug="harmattan-glow" viewHref="/collections/harmattan-glow" />
      </form>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Harmattan glow" })).toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "Collections" })).toHaveAttribute("href", "/c");
    expect(screen.getByRole("link", { name: /View on store/ })).toHaveAttribute("href", "/collections/harmattan-glow");
    expect(screen.getByRole("button", { name: "Save changes" })).toHaveAttribute("type", "submit");
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });
});
