/** @format */
"use client";

import { useState } from "react";
import axios from "axios";

interface StockData {
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  };
}

const StockSearch = () => {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [error, setError] = useState("");

  //   https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
  const API_ENDPOINT = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.STOCK_API}`;
  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        API_ENDPOINT // Replace with the actual API endpoint
      );
      const data = response.data;

      setStockData(data);
      setError("");
    } catch (error) {
      setStockData(null);
      setError("Failed to fetch stock data.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (symbol.trim() !== "") {
      fetchStockData();
    }
  };
  console.log("stockData", stockData);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter stock symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 ml-2 font-semibold text-white bg-blue-500 rounded-lg focus:outline-none hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {stockData && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">
            {stockData["Global Quote"]["01. symbol"]}
          </h2>
          <p>Current Price: {stockData["Global Quote"]["05. price"]}</p>
          <p>Current Price: {stockData["Global Quote"]["03. high"]}</p>
          <p>High Price: {stockData["Global Quote"]["04. low"]}</p>
          <p>Low Price: {stockData["Global Quote"]["02. open"]}</p>
          <p>
            Opening Price: {stockData["Global Quote"]["08. previous close"]}
          </p>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
