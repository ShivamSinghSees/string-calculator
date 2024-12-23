import { Calculator } from "lucide-react";
import { useStringCalculator } from "./hooks/useStringCalculator";

function App() {
  const { input, result, error, handleInputChange, calculate } =
    useStringCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            String Calculator
          </h1>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="numbers"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter numbers
            </label>
            <input
              id="numbers"
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 1,2,3"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Calculate Sum
          </button>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md animate-fade-in-down">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {result !== null && !error && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md animate-fade-in-down">
              <p className="text-sm text-green-800">
                Result: <span className="font-bold">{result}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
