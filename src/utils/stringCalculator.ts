import {
  CUSTOM_DELIMITER_PREFIX,
  DEFAULT_DELIMITER,
  ESCAPED_NEWLINE,
  MULTIPLY_DELIMITER,
} from "./constants";

function hasCustomDelimiter(input: string): boolean {
  return input.startsWith(CUSTOM_DELIMITER_PREFIX);
}

function getDefaultDelimiterResult(
  input: string,
  shouldTrimPrefix: boolean = false
): { delimiter: string; numbersToCalculate: string } {
  return {
    delimiter: DEFAULT_DELIMITER,
    numbersToCalculate: shouldTrimPrefix ? input.substring(2) : input,
  };
}

function extractCustomDelimiterInfo(input: string) {
  const newLineIndex = input.indexOf(ESCAPED_NEWLINE);
  const isInvalidDelimiterFormat = newLineIndex === -1 || newLineIndex === 2;

  return {
    newLineIndex,
    isInvalidDelimiterFormat,
  };
}

function escapeRegex(delimiter: string): string {
  return delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeSpecialCharactersInDelimiter(delimiter: string): string {
  if (delimiter === "*") {
    return MULTIPLY_DELIMITER;
  }

  if (delimiter.startsWith("[") && delimiter.endsWith("]")) {
    return escapeRegex(delimiter.slice(1, -1));
  }

  return delimiter;
}

function getCustomDelimiterResult(
  input: string,
  newLineIndex: number
): { delimiter: string; numbersToCalculate: string } {
  const rawDelimiter = input.substring(2, newLineIndex);

  return {
    delimiter: escapeSpecialCharactersInDelimiter(rawDelimiter),
    numbersToCalculate: input.substring(newLineIndex + 1),
  };
}

function getDelimiterAndNumbersToCalculate(input: string) {
  if (!hasCustomDelimiter(input)) {
    return getDefaultDelimiterResult(input);
  }

  const { newLineIndex, isInvalidDelimiterFormat } =
    extractCustomDelimiterInfo(input);

  if (isInvalidDelimiterFormat) {
    return getDefaultDelimiterResult(input, true);
  }

  return getCustomDelimiterResult(input, newLineIndex);
}

function normalizeInputValue(value: string): string {
  value = value.trim();
  value = value.replace(/\\n/g, ESCAPED_NEWLINE);
  return value;
}

function parsedStringifyNumberIntoCalculableFormat(
  numbersToProcess: string,
  delimiter: string
) {
  const pattern = new RegExp(`${delimiter}|\n`);
  const numbers = numbersToProcess
    .split(pattern)
    .map((num) => parseInt(num.trim()))
    .filter((num) => !isNaN(num));

  return numbers;
}

function throwErrorIfNegativeNumberInList(numbers: number[]) {
  const negativeNumbers = numbers.filter((num) => num < 0);

  if (negativeNumbers.length > 0) {
    throw new Error(
      `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
    );
  }
}

function calculateResult(numbers: number[], delimiter: string): number {
  if (!numbers.length) return 0;

  return numbers.reduce((sum, num) =>
    delimiter === "\\*" ? sum * num : sum + num
  );
}

export function stringCalculator(numbers: string) {
  if (!numbers) return 0;

  numbers = normalizeInputValue(numbers);

  let { delimiter, numbersToCalculate } =
    getDelimiterAndNumbersToCalculate(numbers);

  const parsedNumbers = parsedStringifyNumberIntoCalculableFormat(
    numbersToCalculate,
    delimiter
  );

  throwErrorIfNegativeNumberInList(parsedNumbers);

  return calculateResult(parsedNumbers, delimiter);
}
