import { render, screen } from "@testing-library/react";

import { MEMBERS } from "./data";
import { StaffTable } from "./StaffTable";

describe("StaffTable", () => {
  it("links each member and offers to resend pending invites", () => {
    render(<StaffTable members={MEMBERS} />);
    expect(screen.getAllByRole("link", { name: "Open Akosua Owusu" })[0]).toHaveAttribute("href", "/staff/akosua");
    expect(screen.getByRole("button", { name: "Resend invite" })).toHaveAttribute("value", "nana");
    expect(screen.getByText("Not set up")).toBeInTheDocument();
    expect(screen.getAllByText("Refunds up to GHS 200").length).toBeGreaterThan(0);
  });
});
