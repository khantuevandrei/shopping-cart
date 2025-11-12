import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("renders Home link", () => {
    render(
      <MemoryRouter>
        <NavBar cartAmount={3} />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });
  it("renders Shop link", () => {
    render(
      <MemoryRouter>
        <NavBar cartAmount={3} />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
  });
  it("renders Cart link with correct number", () => {
    render(
      <MemoryRouter>
        <NavBar cartAmount={3} />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("link", { name: /shopping cart/i })
    ).toBeInTheDocument();
  });
});
