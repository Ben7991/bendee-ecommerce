import { render, screen } from "@testing-library/react";

import { DetailRows } from "./DetailRows";

describe("DetailRows", () => {
  it("pairs labels with values, badges and actions", () => {
    render(
      <DetailRows
        className="mt-4"
        rows={[
          { label: "Phone", value: "+233 24 412 7781", badge: <span>Verified</span> },
          { label: "Date of birth", value: "Not added", muted: true, action: <a href="#dob">Add</a> },
        ]}
      />,
    );
    expect(screen.getAllByRole("term").map((dt) => dt.textContent)).toEqual(["Phone", "Date of birth"]);
    expect(screen.getByText("Not added")).toHaveClass("text-text-muted");
    expect(screen.getByRole("link", { name: "Add" })).toBeInTheDocument();
    expect(screen.getByText("Verified")).toBeInTheDocument();
    expect(screen.getByText("Phone").closest("dl")).toHaveClass("mt-4");
  });
});
