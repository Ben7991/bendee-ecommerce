import { render, screen } from "@testing-library/react";

import { ReportTable } from "./ReportTable";

describe("ReportTable", () => {
  it("renders heads, cells with bars and tinted rows", () => {
    render(<ReportTable title="Product performance" columns={[{ key: "product", label: "Product" }, { key: "views", label: "Views", width: "w-20", align: "right" as const }, { key: "atc", label: "Add-to-cart", width: "w-37.5" }, { key: "returns", label: "Returns", width: "w-20", align: "right" as const, wide: true }]} rows={[{ id: "g", lead: { title: "Greens Daily · 30 servings", sub: "Greens & superfoods", thumb: "sage" }, cells: { views: "3,120", atc: { bar: 85, text: "14.2%", tone: "strong" as const }, returns: "0.7%" }, mobile: { value: "GHS 9,940", meta: [{ text: "3,120 views" }, { text: "14.2% add to cart", tone: "strong" as const }] } }, { id: "c", tone: "error" as const, lead: { title: "Collagen Glow · 30 sachets", sub: "Collagen", thumb: "citrus" }, cells: { views: "2,610", atc: { bar: 30, barTone: "error" as const, text: "5.0%", tone: "error" as const }, returns: { text: "3.4%", tone: "error" as const } } }]} />);
    expect(screen.getByRole("columnheader", { name: "Returns" })).toHaveClass("hidden", "xl:table-cell");
    expect(screen.getAllByText("Collagen Glow · 30 sachets")).toHaveLength(2);
    expect(screen.getByRole("table").querySelector("tbody tr:last-child")).toHaveClass("bg-tint-citrus/40");
    expect(screen.getByText("14.2% add to cart")).toHaveClass("font-semibold");
  });

  it("shows an empty message", () => {
    render(<ReportTable title="Empty" columns={[{ key: "product", label: "Product" }, { key: "views", label: "Views", width: "w-20", align: "right" as const }, { key: "atc", label: "Add-to-cart", width: "w-37.5" }, { key: "returns", label: "Returns", width: "w-20", align: "right" as const, wide: true }]} rows={[]} emptyMessage="No sales yet" />);
    expect(screen.getByText("No sales yet")).toBeInTheDocument();
  });
});
