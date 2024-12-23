import { add } from "./stringCalculator";

describe("String Calculator", () => {
  it("should return 0 for empty string", () => {
    expect(add("")).toBe(0);
  });

  it("should return the number for a single number", () => {
    expect(add("1")).toBe(1);
    expect(add("5")).toBe(5);
  });

  it("should return sum for two comma-separated numbers", () => {
    expect(add("1,5")).toBe(6);
    expect(add("2,3")).toBe(5);
  });
});
