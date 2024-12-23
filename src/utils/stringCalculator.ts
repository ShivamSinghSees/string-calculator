export function add(numbers: string) {
  // If empty string or invalid input, return 0
  if (!numbers) return 0;

  // Normalize input
  numbers = numbers.trim(); // Remove leading/trailing spaces
  numbers = numbers.replace(/\\n/g, "\n");

  let delimiter = ",";
  let numbersToProcess = numbers;

  // Check for custom delimiter
  if (numbers.startsWith("//")) {
    const firstNewLine = numbers.indexOf("\n");
    // If no newline found or it's immediately after //, treat as invalid format
    // and process the entire string after // as numbers
    if (firstNewLine === -1 || firstNewLine === 2) {
      numbersToProcess = numbers.substring(2);
    } else {
      let customDelimiter = numbers.substring(2, firstNewLine);

      // Handle delimiter with multiple characters enclosed in square brackets
      if (customDelimiter.startsWith("[") && customDelimiter.endsWith("]")) {
        customDelimiter = customDelimiter.slice(1, -1);
        // Escape special characters for regex
        delimiter = customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      } else {
        delimiter = customDelimiter;
      }

      numbersToProcess = numbers.substring(firstNewLine + 1);
    }
  }

  // Create regex pattern that matches both the delimiter and newline
  const pattern = new RegExp(`${delimiter}|\n`);

  // Split string using the pattern and convert to numbers
  const nums = numbersToProcess
    .split(pattern)
    .map((num) => parseInt(num.trim()))
    .filter((num) => !isNaN(num));

  // Check for negative numbers
  const negativeNumbers = nums.filter((num) => num < 0);

  if (negativeNumbers.length > 0) {
    throw new Error(
      `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
    );
  }

  return nums.reduce((sum, num) => sum + num, 0);
}
