import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as ReactRouter from "react-router";
import userEvent from "@testing-library/user-event";
import CartCard from "./CartCard";

const mockSetCartItems = vi.fn();

vi.spyOn(ReactRouter, "useOutletContext").mockReturnValue({
  cartItems: [{ id: 1, title: "item", image: "url", amount: 2, price: 10 }],
  setCartItems: mockSetCartItems,
});

describe("CartCard renders correctly", () => {
  it("renders the title", () => {
    render(
      <CartCard id={1} title={"item"} image={"url"} amount={2} price={10} />
    );
    expect(screen.getByRole("heading", { name: /item/i })).toBeInTheDocument();
  });
  it("renders the image", () => {
    render(
      <CartCard id={1} title={"item"} image={"url"} amount={2} price={10} />
    );
    expect(screen.getByRole("img", { name: "item" })).toBeInTheDocument();
  });
  it("renders the price", () => {
    render(
      <CartCard id={1} title={"item"} image={"url"} amount={2} price={10} />
    );
    expect(screen.getByRole("heading", { name: "$20.00" })).toBeInTheDocument();
  });
  it("renders the decrement btn", () => {
    render(
      <CartCard id={1} title={"item"} image={"url"} amount={2} price={10} />
    );
    expect(screen.getByRole("button", { name: /-/i })).toBeInTheDocument();
  });
  it("renders the input", () => {
    render(
      <CartCard id={1} title={"item"} image={"url"} amount={2} price={10} />
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  it("renders the increment btn", () => {
    render(
      <CartCard id={1} title={"item"} image={"url"} amount={2} price={10} />
    );
    expect(screen.getByRole("button", { name: /\+/i })).toBeInTheDocument();
  });
});

describe("decrement btn works as expected", () => {
  beforeEach(() => {
    mockSetCartItems.mockClear();
  });
  it("decreases the amount", async () => {
    const user = userEvent.setup();

    render(
      <CartCard id={1} title={"item"} image={"url"} amount={2} price={10} />
    );

    const button = screen.getByRole("button", { name: "-" });

    await user.click(button);

    expect(mockSetCartItems.mock.calls[0][0]).toEqual([
      { id: 1, title: "item", image: "url", amount: 1, price: 10 },
    ]);
  });
  it("deletes from the cart when amount is less than 1", async () => {
    const user = userEvent.setup();

    render(
      <CartCard id={1} title={"item"} image={"url"} amount={1} price={10} />
    );

    const button = screen.getByRole("button", { name: "-" });

    await user.click(button);

    expect(mockSetCartItems.mock.calls[0][0]).toEqual([]);
  });
});

describe("increment btn works as expected", () => {
  beforeEach(() => {
    mockSetCartItems.mockClear();
  });
  it("increases the amount", async () => {
    const user = userEvent.setup();

    render(
      <CartCard id={1} title={"item"} image={"url"} amount={2} price={10} />
    );

    const button = screen.getByRole("button", { name: "+" });

    await user.click(button);

    expect(mockSetCartItems.mock.calls[0][0]).toEqual([
      { id: 1, title: "item", image: "url", amount: 3, price: 10 },
    ]);
  });
});

describe("input works as expected", () => {
  beforeEach(() => {
    mockSetCartItems.mockClear();
  });
  it("the amount is empty when cleared", async () => {
    const user = userEvent.setup();

    render(
      <CartCard id={1} title={"item"} image={"url"} amount={2} price={10} />
    );

    const input = screen.getByRole("textbox");

    await user.clear(input);

    expect(mockSetCartItems.mock.calls[0][0]).toEqual([
      { id: 1, title: "item", image: "url", amount: "", price: 10 },
    ]);
  });
  it("updates amount when user types a value", async () => {
    const user = userEvent.setup();

    render(
      <CartCard id={1} title={"item"} image={"url"} amount={""} price={10} />
    );

    const input = screen.getByRole("textbox");

    await user.type(input, "5");

    expect(mockSetCartItems.mock.calls[0][0]).toEqual([
      { id: 1, title: "item", image: "url", amount: 5, price: 10 },
    ]);
  });
});

describe("delete btn works as expected", () => {
  beforeEach(() => {
    mockSetCartItems.mockClear();
  });
  it("deletes item from cart", async () => {
    const user = userEvent.setup();

    render(
      <CartCard id={1} title={"item"} image={"url"} amount={2} price={10} />
    );

    const button = screen.getByRole("button", { name: "delete" });
    await user.click(button);

    expect(mockSetCartItems.mock.calls[0][0]).toEqual([]);
  });
});
