import { stringCalculator } from "./stringCalculator";

describe("String Calculator", () => {
  // Basic functionality tests
  describe("basic functionality", () => {
    it("should return 0 for empty string", () => {
      expect(stringCalculator("")).toBe(0);
    });

    it("should handle single number", () => {
      expect(stringCalculator("1")).toBe(1);
      expect(stringCalculator("42")).toBe(42);
    });

    it("should handle two numbers", () => {
      expect(stringCalculator("1,2")).toBe(3);
      expect(stringCalculator("10,20")).toBe(30);
    });

    it("should handle multiple numbers", () => {
      expect(stringCalculator("1,2,3")).toBe(6);
      expect(stringCalculator("1,2,3,4,5")).toBe(15);
    });
    it("should throw error for negative numbers", () => {
      expect(() => stringCalculator("1,-2")).toThrow(
        "Negative numbers not allowed: -2"
      );
      expect(() => stringCalculator("-1,2,-3")).toThrow(
        "Negative numbers not allowed: -1, -3"
      );
    });
  });

  // Delimiter tests
  describe("delimiter handling", () => {
    it("should handle newline as delimiter", () => {
      expect(stringCalculator("1\n2")).toBe(3);
      expect(stringCalculator("1\n2\n3")).toBe(6);
    });

    it("should handle mixed delimiters (comma and newline)", () => {
      expect(stringCalculator("1\n2,3")).toBe(6);
      expect(stringCalculator("1,2\n3")).toBe(6);
      expect(stringCalculator("1\n2,3\n4")).toBe(10);
    });

    it("should handle custom delimiters", () => {
      expect(stringCalculator("//;\n1;2")).toBe(3);
      expect(stringCalculator("//;\n1;2;3")).toBe(6);
      expect(stringCalculator("//#\n1#2#3")).toBe(6);
    });

    it("should handle custom delimiters with multiple characters", () => {
      expect(stringCalculator("//[***]\n1***2***3")).toBe(6);
      expect(stringCalculator("//[;]\n1;2;3")).toBe(6);
    });
    it("should multiply when custom delimiters is *", () => {
      expect(stringCalculator("//*\n2*3")).toBe(6);
    });
  });

  // Edge cases and input handling
  describe("edge cases and input handling", () => {
    it("should handle whitespace in numbers", () => {
      expect(stringCalculator("1, 2, 3")).toBe(6);
      expect(stringCalculator("1,\n2,\n3")).toBe(6);
      expect(stringCalculator("  1,  2,  3  ")).toBe(6);
    });

    it("should handle zero values", () => {
      expect(stringCalculator("0")).toBe(0);
      expect(stringCalculator("0,0,0")).toBe(0);
      expect(stringCalculator("1,0,2")).toBe(3);
    });

    it("should ignore non-numeric values", () => {
      expect(stringCalculator("1,a,2")).toBe(3);
      expect(stringCalculator("1,b,c,3")).toBe(4);
      expect(stringCalculator("a,b,c")).toBe(0);
    });

    it("should handle larger numbers", () => {
      expect(stringCalculator("100,200,300")).toBe(600);
      expect(stringCalculator("1000\n2000,3000")).toBe(6000);
    });
  });

  // Input validation and error cases
  describe("input validation", () => {
    it("should handle null or undefined input", () => {
      expect(stringCalculator(null as unknown as string)).toBe(0);
      expect(stringCalculator(undefined as unknown as string)).toBe(0);
    });

    it("should handle invalid custom delimiter format", () => {
      expect(stringCalculator("//\n1,2")).toBe(3);
      expect(stringCalculator("//")).toBe(0);
    });
  });

  // Specific requirements tests
  describe("specific requirements", () => {
    it("should match example test cases", () => {
      expect(stringCalculator("")).toBe(0);
      expect(stringCalculator("1")).toBe(1);
      expect(stringCalculator("1,5")).toBe(6);
      expect(stringCalculator("1\n2,3")).toBe(6);
      expect(stringCalculator("//;\n1;2")).toBe(3);
    });
  });
});
