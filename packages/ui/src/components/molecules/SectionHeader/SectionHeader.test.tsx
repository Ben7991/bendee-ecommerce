import { render, screen } from "@testing-library/react";

import { Heading } from "../../atoms";
import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
  it("renders eyebrow, title and aside", () => {
    render(<SectionHeader eyebrow="Bestsellers" title={<Heading>Loved by 50,000+ routines</Heading>} aside={<a href="/shop">Shop all</a>} />);
    expect(screen.getByText("Bestsellers")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Loved by 50,000+ routines" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop all" })).toBeInTheDocument();
  });
});
