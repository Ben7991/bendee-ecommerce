import { render, screen } from "@testing-library/react";

import { ProfileIdentity } from "./ProfileIdentity";

describe("ProfileIdentity", () => {
  it("shows initials, the role and a photo picker", () => {
    const { container } = render(<ProfileIdentity name="Abena Mensah" role="Owner" meta="abena@jofak.com" />);
    expect(screen.getByText("AM")).toBeInTheDocument();
    expect(screen.getByText("Owner")).toBeInTheDocument();
    expect(container.querySelector('input[type="file"][name="photo"]')).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Remove" })).not.toBeInTheDocument();
  });

  it("shows the photo and offers Remove", () => {
    const { container } = render(<ProfileIdentity name="Abena Mensah" role="Owner" meta="m" photo="data:image/png;base64,AA==" />);
    expect(container.querySelector("img")).toHaveAttribute("src", "data:image/png;base64,AA==");
    expect(screen.getByRole("button", { name: "Remove" })).toHaveAttribute("value", "remove-photo");
  });
});
