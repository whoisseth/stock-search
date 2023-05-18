/** @format */
"use client";
import { useState } from "react";
import axios from "axios";
import StockCard from "./StockCard";
import { favoriteStocksAtom } from "../store/atom";
import { useAtom } from "jotai";
import clsx from "clsx";

export interface StockData {
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

const StockSearch2 = () => {
  const [favoriteStocks, setFavoriteStocks] = useAtom(favoriteStocksAtom);

  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState<StockData | null>(null);

  const fetchStockData = async () => {
    try {
      const API = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.STOCK_API}`;
      const response = await axios.get(API);
      const data = response.data;

      if (data["Error Message"]) {
        throw new Error(data["Error Message"]);
      }

      setStockData(data);
    } catch (error) {
      setStockData(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (symbol.trim() !== "") {
      fetchStockData();
    }
  };

  const favoriteTrue = favoriteStocks.some(
    (d) =>
      stockData?.["Global Quote"]?.["01. symbol"] ==
      d?.["Global Quote"]?.["01. symbol"]
  );

  function handleAddFavorites() {
    favoriteStocks.some((d) => stockData?.["Global Quote"]?.["01. symbol"]);

    if (stockData?.["Global Quote"]?.["01. symbol"] && !favoriteTrue) {
      setFavoriteStocks((p) => [...p, stockData]);
      localStorage.setItem(
        "favoriteStocks",
        JSON.stringify([...favoriteStocks, stockData])
      );
    }
  }
  console.log("favoriteStocks-", favoriteStocks);

  console.log("stockData", stockData);
  console.log("find", favoriteTrue);

  return (
    <div className="  w-[360px] ">
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

      {!(stockData == null) && !stockData?.["Global Quote"]?.["01. symbol"] && (
        <p className="mt-2 text-red-500">
          The requested input does not exist in this free API or you may have
          entered incorrect information!
        </p>
      )}

      {stockData?.["Global Quote"]?.["01. symbol"] ? (
        <div className="mt-4">
          <StockCard
            symbol={stockData?.["Global Quote"]?.["01. symbol"]}
            price={stockData?.["Global Quote"]?.["05. price"]}
            high={stockData?.["Global Quote"]?.["03. high"]}
            low={stockData?.["Global Quote"]?.["04. low"]}
            open={stockData?.["Global Quote"]?.["02. open"]}
            close={stockData?.["Global Quote"]?.["08. previous close"]}
          />

          <button
            onClick={handleAddFavorites}
            disabled={favoriteTrue}
            className={clsx(
              "px-4 py-2 mt-2 font-bold text-white rounded ",
              !favoriteTrue && "hover:bg-blue-600",
              favoriteTrue ? "cursor-not-allowed  bg-blue-300" : "bg-blue-500"
            )}
          >
            Add to Favorites
          </button>
        </div>
      ) : null}

      <section>
        <h2 className="mt-2 text-lg font-semibold">Test by </h2>
        <p> IBM, FSD, RELIANCE.BSE, TSCO.LON etc ... </p>
      </section>

      {/* <div>{JSON.stringify(favoriteStocks)}</div> */}
    </div>
  );
};

export default StockSearch2;
