/** @format */
"use client";
import { favoriteStocksAtom } from "../store/atom";
import { useAtom } from "jotai";
import React from "react";
import StockCard from "./StockCard";
import { StockData } from "./StockSearch2";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {};

export default function Favorites({}: Props) {
  const [animationParent] = useAutoAnimate();
  const [favoriteStocks, setFavoriteStocks] = useAtom(favoriteStocksAtom);

  function handleRemoveFavorite(data: StockData) {
    const updatedData = favoriteStocks.filter((item) => item !== data);
    setFavoriteStocks(updatedData);
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Favorites</h2>

      <section ref={animationParent} className="flex flex-wrap gap-2">
        {favoriteStocks.map((stockData, index) => (
          <div key={index}>
            <StockCard
              className="p-2 border rounded-md"
              symbol={stockData?.["Global Quote"]?.["01. symbol"]}
              price={stockData?.["Global Quote"]?.["05. price"]}
              high={stockData?.["Global Quote"]?.["03. high"]}
              low={stockData?.["Global Quote"]?.["04. low"]}
              open={stockData?.["Global Quote"]?.["02. open"]}
              close={stockData?.["Global Quote"]?.["08. previous close"]}
            />
            <button
              onClick={() => handleRemoveFavorite(stockData)}
              className="px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
