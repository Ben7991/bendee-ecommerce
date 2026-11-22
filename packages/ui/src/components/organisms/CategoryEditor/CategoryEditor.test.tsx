import { fireEvent, render, screen } from "@testing-library/react";

import { CategoryEditor } from "./CategoryEditor";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const props = {
  trail: "Beauty from within ›",
  defaultValue: { name: "Collagen", slug: "collagen", parent: "beauty", description: "Marine collagen.", active: true },
  parents: [
    { value: "", label: "Top level" },
    { value: "beauty", label: "Beauty from within" },
  ],
  action: "/save",
  fields: { category: "collagen" },
};

describe("CategoryEditor", () => {
  it("edits the category's fields", () => {
    const { container } = render(<CategoryEditor {...props} className="mt-4" deleteNote={{ title: "Delete Collagen?", body: "Move its products first." }} />);
    expect(screen.getByRole("region", { name: "Edit Collagen" })).toHaveClass("mt-4");
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Collagen");
    expect(screen.getByRole("textbox", { name: "Slug" })).toHaveValue("collagen");
    expect(screen.getByRole("combobox", { name: "Parent" })).toHaveValue("beauty");
    expect(screen.getByRole("switch", { name: "Active" })).toBeChecked();
    expect(container.querySelector('input[type=hidden][name=category]')).toHaveValue("collagen");
    expect(screen.getByText("Delete Collagen?")).toBeInTheDocument();
  });

  it("folds details into rows in the sheet", () => {
    render(<CategoryEditor {...props} presentation="sheet" open />);
    expect(screen.getByRole("dialog", { name: "Collagen" })).toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: "Slug" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Slug, description, banner, SEO/ }));
    expect(screen.getByRole("textbox", { name: "Slug" })).toBeInTheDocument();
  });
});
