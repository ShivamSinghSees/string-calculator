import { useState } from "react";
import { add } from "../utils/stringCalculator";

export function useStringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    try {
      const sum = add(input);
      setResult(sum);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setError(null);
  };

  return {
    input,
    result,
    error,
    handleInputChange,
    calculate,
  };
}
