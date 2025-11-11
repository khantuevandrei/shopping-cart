import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import * as ReactRouter from "react-router";
import Shop from "./Shop";

const mockResponse = [
  { id: 1, title: "item1", image: "url1", price: 10 },
  { id: 2, title: "item2", image: "url2", price: 30 },
];

let mockItemList = [];
let mockSetItemList;

beforeEach(() => {
  mockItemList = [];
  mockSetItemList = vi.fn((newList) => {
    mockItemList = newList;
  });

  vi.spyOn(ReactRouter, "useOutletContext").mockImplementation(() => ({
    itemList: mockItemList,
    setItemList: mockSetItemList,
  }));

  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })
  ) as any;
});

describe("Loading", () => {
  it("is shown while fetching", () => {
    render(<Shop />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("disappears when done fetching", async () => {
    render(<Shop />);

    await waitFor(() => {
      expect(mockSetItemList).toHaveBeenCalledWith(mockResponse);
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});

describe("Error", () => {
  it("is shown when fetch fails", async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: false })) as any;

    render(<Shop />);

    const errorMsg = await screen.findByText(/error: failed to fetch items/i);
    expect(errorMsg).toBeInTheDocument();
  });
});

describe("Shop renders all cards", () => {
  it("renders titles", async () => {
    render(<Shop />);
    await waitFor(() =>
      expect(mockSetItemList).toHaveBeenCalledWith(mockResponse)
    );

    expect(screen.getByRole("heading", { name: "item1" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "item2" })).toBeInTheDocument();
  });

  it("renders images", async () => {
    render(<Shop />);
    await waitFor(() =>
      expect(mockSetItemList).toHaveBeenCalledWith(mockResponse)
    );

    expect(screen.getByRole("img", { name: "item1" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "item2" })).toBeInTheDocument();
  });

  it("renders prices", async () => {
    render(<Shop />);
    await waitFor(() =>
      expect(mockSetItemList).toHaveBeenCalledWith(mockResponse)
    );

    expect(screen.getByRole("heading", { name: "$10" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "$30" })).toBeInTheDocument();
  });
});
