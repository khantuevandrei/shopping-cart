import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as ReactRouter from "react-router";
import userEvent from "@testing-library/user-event";
import ShopCard from "./ShopCard";

const mockSetCartItems = vi.fn();

vi.spyOn(ReactRouter, "useOutletContext").mockReturnValue({
  cartItems: [],
  setCartItems: mockSetCartItems,
});

describe("ShopCard renders correctly", () => {
  it("renders the title", () => {
    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);
    expect(screen.getByRole("heading", { name: /item/i })).toBeInTheDocument();
  });
  it("renders the image", () => {
    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
  it("renders the price", () => {
    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);
    expect(screen.getByRole("heading", { name: /10/i })).toBeInTheDocument();
  });
  it("renders the decrement btn", () => {
    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);
    expect(screen.getByRole("button", { name: /-/i })).toBeInTheDocument();
  });
  it("renders the input", () => {
    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  it("renders the increment btn", () => {
    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);
    expect(screen.getByRole("button", { name: /\+/i })).toBeInTheDocument();
  });
  it("renders the Add btn", () => {
    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);
    expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
  });
});

describe("decrement btn works as expected", () => {
  it("decreases the amount", async () => {
    const user = userEvent.setup();

    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "-" });

    expect(input).toHaveValue("1");
    await user.click(button);
    expect(input).toHaveValue("0");
  });
  it("doesnt decrease value beyond 0", async () => {
    const user = userEvent.setup();

    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "-" });

    expect(input).toHaveValue("1");

    await user.click(button);
    await user.click(button);

    expect(input).toHaveValue("0");
  });
});

describe("increment btn works as expected", () => {
  it("increment btn increases the amount", async () => {
    const user = userEvent.setup();

    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "+" });

    expect(input).toHaveValue("1");

    await user.click(button);

    expect(input).toHaveValue("2");
  });
});

describe("input works as expected", () => {
  it("the amount is empty when cleared", async () => {
    const user = userEvent.setup();

    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("1");

    await user.clear(input);

    expect(input).toHaveValue("");
  });
  it("updates amount when user types a value", async () => {
    const user = userEvent.setup();

    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("1");

    await user.clear(input);
    await user.type(input, "5");

    expect(input).toHaveValue("5");
  });
});

describe("Add btn works as expected", () => {
  beforeEach(() => {
    mockSetCartItems.mockClear();
  });
  it("calls setCartItems when clicked", async () => {
    const user = userEvent.setup();

    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);

    const button = screen.getByRole("button", { name: "Add" });

    await user.click(button);

    expect(mockSetCartItems).toHaveBeenCalled();
  });
  it("adds item to cart when clicked", async () => {
    const user = userEvent.setup();

    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);

    const button = screen.getByRole("button", { name: "Add" });

    await user.click(button);

    const callback = mockSetCartItems.mock.calls[0][0];
    const newCart = callback([]);

    expect(newCart).toEqual([
      { id: 1, title: "item", image: "url", price: 10, amount: 1 },
    ]);
  });
  it("updates the amount when clicked again", async () => {
    const user = userEvent.setup();

    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);

    const button = screen.getByRole("button", { name: "Add" });

    await user.click(button);

    const firstCallback = mockSetCartItems.mock.calls[0][0];
    const firstCart = firstCallback([]);

    await user.click(button);

    const secondCallback = mockSetCartItems.mock.calls[1][0];
    const secondCart = secondCallback(firstCart);

    expect(secondCart).toEqual([
      { id: 1, title: "item", image: "url", price: 10, amount: 2 },
    ]);
  });
  it("does not call setCartItems when input value is 0", async () => {
    const user = userEvent.setup();

    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "Add" });

    await user.clear(input);
    await user.type(input, "0");
    await user.click(button);

    expect(mockSetCartItems).not.toHaveBeenCalled();
  });
  it("does not call setCartItems when input value is empty", async () => {
    const user = userEvent.setup();

    render(<ShopCard id={1} title={"item"} image={"url"} price={10} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "Add" });

    await user.clear(input);
    await user.click(button);

    expect(mockSetCartItems).not.toHaveBeenCalled();
  });
});
