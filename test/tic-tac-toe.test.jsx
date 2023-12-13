import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import TicTacToe from "../src/components/TicTacToe";

describe('TicTacToe', () => {
  it('should render', () => {
    render(<TicTacToe />)
  })
})