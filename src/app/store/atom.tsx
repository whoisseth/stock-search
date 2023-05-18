/** @format */

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { StockData } from "../components/StockSearch2";

// const darkModeAtom = atomWithStorage('darkMode', false)
// export const favoriteStocksAtom = atomWithStorage<StockData[]>("stockData", []);
export const favoriteStocksAtom = atom<StockData[]>([]);
