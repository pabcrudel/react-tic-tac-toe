import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Footer from "../src/footer";

describe('Footer', () => {
  it('should render', () => {
    render(<Footer />)
  })
})