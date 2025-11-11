import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as ReactRouter from "react-router";
import userEvent from "@testing-library/user-event";
import Cart from "./Cart";

const mockSetCartItems = vi.fn();

vi.spyOn(ReactRouter, "useOutletContext").mockReturnValue({
  cartItems: [
    { id: 1, title: "item1", image: "url", amount: 2, price: 10 },
    { id: 2, title: "item2", image: "url", amount: 1, price: 30 },
  ],
  setCartItems: mockSetCartItems,
});

describe("renders Your Cart heading", () => {
  it("exists", async () => {
    render(<Cart />);
    expect(
      screen.getByRole("heading", { name: "Your Cart:" })
    ).toBeInTheDocument();
  });
});

describe("Cart renders all cards", () => {
  it("renders titles", () => {
    render(<Cart />);
    expect(screen.getByRole("heading", { name: "item1" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "item2" })).toBeInTheDocument();
  });
  it("renders images", () => {
    render(<Cart />);
    expect(screen.getByRole("img", { name: "item1" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "item2" })).toBeInTheDocument();
  });
  it("renders prices", () => {
    render(<Cart />);
    expect(screen.getByRole("heading", { name: "$20.00" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "$30.00" })).toBeInTheDocument();
  });
});

describe("renders Total heading", () => {
  it("with correct sum", async () => {
    render(<Cart />);
    expect(
      screen.getByRole("heading", { name: "Total: $50.00" })
    ).toBeInTheDocument();
  });
});
