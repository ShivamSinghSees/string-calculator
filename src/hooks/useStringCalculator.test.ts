import { renderHook, act } from "@testing-library/react";
import { useStringCalculator } from "./useStringCalculator";

describe("useStringCalculator", () => {
  it("should initialize with empty state", () => {
    const { result } = renderHook(() => useStringCalculator());

    expect(result.current.input).toBe("");
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should update input value", () => {
    const { result } = renderHook(() => useStringCalculator());

    act(() => {
      result.current.handleInputChange("1,2");
    });

    expect(result.current.input).toBe("1,2");
  });

  it("should calculate sum for valid input", () => {
    const { result } = renderHook(() => useStringCalculator());

    act(() => {
      result.current.handleInputChange("1,2");
      result.current.calculate();
    });

    expect(result.current.result).toBe(3);
    expect(result.current.error).toBeNull();
  });
});
