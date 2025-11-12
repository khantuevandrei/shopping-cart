import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Home from "./Home";

describe("Home component", () => {
  it("matches the snapshot", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
